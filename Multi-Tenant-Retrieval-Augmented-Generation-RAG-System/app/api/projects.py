"""
Project routes for tenant-scoped project management
"""
import logging
import uuid
from fastapi import APIRouter, HTTPException, status

from app.schemas.project import ProjectCreate, ProjectResponse
from app.services.project_service import ProjectService
from app.dependencies import (
    DatabaseDep,
    CurrentTenantDep,
    TenantUserDep,
    ProjectServiceDep,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/projects", tags=["Project handler"])


def _validate_project_id(project_id: str) -> str:
    """Validate that project_id is a UUID, returning the string form."""
    try:
        uuid.UUID(project_id)
    except (ValueError, AttributeError):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid project ID format"
        )
    return project_id


@router.post(
    "/",
    response_model=ProjectResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Project handler"],
)
async def create_project(
    project_in: ProjectCreate,
    current_user: TenantUserDep,
    current_tenant: CurrentTenantDep,
    db: DatabaseDep,
    project_service: ProjectServiceDep,
) -> ProjectResponse:
    """
    Create a new project (tenant user only).

    The project is created within the authenticated user's tenant and owned by
    the current user.
    """
    try:
        project = project_service.create_project(
            db=db,
            tenant_id=str(current_tenant.id),
            owner_id=str(current_user.id),
            name=project_in.name,
            description=project_in.description,
        )
        return ProjectResponse.model_validate(project)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to create project: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create project"
        )


@router.get(
    "/{project_id}",
    response_model=ProjectResponse,
    tags=["Project handler"],
)
async def get_project_info(
    project_id: str,
    current_user: TenantUserDep,
    current_tenant: CurrentTenantDep,
    db: DatabaseDep,
    project_service: ProjectServiceDep,
) -> ProjectResponse:
    """
    Get project info by project ID (tenant user only).

    Returns 404 if the project does not exist or does not belong to the
    authenticated user's tenant (tenant isolation).
    """
    project_id = _validate_project_id(project_id)
    try:
        project = project_service.get_project_or_404(
            db=db,
            project_id=project_id,
            tenant_id=str(current_tenant.id),
        )
        return ProjectResponse.model_validate(project)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to get project info: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get project info"
        )
