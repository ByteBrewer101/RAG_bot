"""
Database connection utilities and initialization
"""
import logging
from sqlalchemy import text
from app.database.base import Base
from app.database.session import engine

logger = logging.getLogger(__name__)


async def init_db():
    """
    Initialize database connection and create tables
    """
    try:
        # Test database connection
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            logger.info("Database connection successful")
        
        # Create all tables
        create_tables()
        logger.info("Database initialization completed")
        
    except Exception as e:
        logger.error(f"Database initialization failed: {e}")
        raise


def create_tables():
    """
    Create all database tables
    """
    try:
        # Import all models to ensure they're registered with SQLAlchemy
        from app.models import tenant, document, project, query

        # Create all tables (idempotent: only creates missing tables)
        Base.metadata.create_all(bind=engine)
        logger.info("All database tables created successfully")

        # Ensure projects table has required columns (schema drift fix for
        # databases created before the Project model was added). SQLite and
        # PostgreSQL both support checking information_schema.
        _ensure_projects_table_columns()

    except Exception as e:
        logger.error(f"Table creation failed: {e}")
        raise


def _ensure_projects_table_columns():
    """
    Add missing columns to project-related tables if the existing tables were
    created before the Project model defined them. No-op when columns exist.
    Handles: projects, documents, document_chunks.
    Also drops legacy columns that conflict with the current model.
    """
    from sqlalchemy import text

    required_columns = {
        "projects": {
            "tenant_id": "UUID",
            "owner_id": "UUID",
            "is_active": "BOOLEAN DEFAULT TRUE",
        },
        "documents": {
            "project_id": "UUID",
        },
        "document_chunks": {
            "project_id": "UUID",
        },
    }

    # Legacy columns present in old DB schema but not in the current model.
    # Dropped because they have NOT NULL constraints that conflict with model
    # inserts (e.g. projects.user_id replaced by projects.owner_id).
    legacy_columns_to_drop = {
        "projects": ["user_id"],
    }

    with engine.connect() as conn:
        dialect = conn.dialect.name

        # Drop legacy columns first
        for table_name, columns in legacy_columns_to_drop.items():
            for column_name in columns:
                check_sql = text(
                    "SELECT 1 FROM information_schema.columns "
                    "WHERE table_name = :tbl AND column_name = :col"
                )
                exists = conn.execute(
                    check_sql, {"tbl": table_name, "col": column_name}
                ).scalar()
                if not exists:
                    continue
                drop_sql = text(
                    f"ALTER TABLE {table_name} DROP COLUMN {column_name}"
                )
                conn.execute(drop_sql)
                conn.commit()
                logger.info(
                    f"Dropped legacy column '{column_name}' from {table_name} table"
                )

        # Add missing columns
        for table_name, columns in required_columns.items():
            for column_name, column_type in columns.items():
                # Check whether the column already exists
                check_sql = text(
                    "SELECT 1 FROM information_schema.columns "
                    "WHERE table_name = :tbl AND column_name = :col"
                )
                exists = conn.execute(
                    check_sql, {"tbl": table_name, "col": column_name}
                ).scalar()
                if exists:
                    continue

                # Column missing: add it
                alter_sql = text(
                    f"ALTER TABLE {table_name} ADD COLUMN {column_name} {column_type}"
                )

                conn.execute(alter_sql)
                conn.commit()
                logger.info(
                    f"Added missing column '{column_name}' to {table_name} table"
                )


def drop_tables():
    """
    Drop all database tables (use with caution!)
    """
    try:
        Base.metadata.drop_all(bind=engine)
        logger.warning("All database tables dropped")
        
    except Exception as e:
        logger.error(f"Table dropping failed: {e}")
        raise