"""
API routes for the Multi-Tenant RAG System
"""
from .auth import router as auth_router
from .documents import router as documents_router
from .queries import router as queries_router
from .tenants import router as tenants_router
from .projects import router as projects_router

__all__ = [
    "auth_router",
    "documents_router", 
    "queries_router",
    "tenants_router",
    "projects_router",
]