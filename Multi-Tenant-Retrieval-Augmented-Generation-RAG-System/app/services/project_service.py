"""
Project service for tenant-scoped project management
"""
import uuid
import logging
from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import and_
from fastapi import HTTPException, status

from app.models.project import Project
from app.models.tenant import TenantUser


logger = logging.getLogger(__name__)


class ProjectService:
    """
    Service for managing project operations within a tenant
    """

    def __init__(self):
        pass

    @staticmethod
    def create_project(
            db: Session,
        tenant_id: str,
        owner_id: str,
        name: str,
        description: Optional[str] = None
    ) -> Project:
        """
        Create a new project for the given tenant
        """
        # Validate tenant ownership of the project name (uniqueness within tenant)
        existing = db.query(Project).filter(
            and_(
                Project.tenant_id == tenant_id,
                Project.name == name
            )
        ).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Project with name '{name}' already exists in this tenant"
            )

        project = Project(
            tenant_id=tenant_id,
            owner_id=owner_id,
            name=name,
            description=description,
            is_active=True
        )

        db.add(project)
        db.commit()
        db.refresh(project)

        logger.info(f"Project created: {project.id} for tenant {tenant_id} by owner {owner_id}")
        return project

    def get_project(
        self,
        db: Session,
        project_id: str,
        tenant_id: str
    ) -> Optional[Project]:
        """
        Get a project by ID scoped to a tenant (tenant isolation)
        Returns None if not found or not accessible by this tenant.
        """
        return db.query(Project).filter(
            and_(
                Project.id == project_id,
                Project.tenant_id == tenant_id
            )
        ).first()

    def get_project_or_404(
        self,
        db: Session,
        project_id: str,
        tenant_id: str
    ) -> Project:
        """
        Get a project by ID scoped to a tenant, raising 404 if not found.
        """
        project = self.get_project(db, project_id, tenant_id)
        if not project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found"
            )
        return project
