"""
Project-related Pydantic schemas
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from uuid import UUID


class ProjectBase(BaseModel):
    """Shared project fields"""
    name: str = Field(..., min_length=1, max_length=255, description="Project name")
    description: Optional[str] = Field(None, description="Project description")


class ProjectCreate(ProjectBase):
    """Schema for creating a new project"""
    pass


class ProjectResponse(ProjectBase):
    """Schema for project info response"""
    id: UUID
    tenant_id: UUID
    owner_id: Optional[UUID] = None
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
