frontend/web/                       # new Next.js app
├── app/
│   ├── layout.tsx                  # Root layout: providers, fonts, theme
│   ├── page.tsx                    # Landing page (/)
│   ├── login/
│   │   └── page.tsx                # /login
│   ├── signup/
│   │   └── page.tsx                # /signup
│   ├── (app)/                      # route group = protected dashboard
│   │   ├── layout.tsx              # Shell layout: Sidebar + Topbar + {children}
│   │   ├── page.tsx                # redirect to /app/dashboard
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx            # list + create
│   │   │   └── [projectId]/
│   │   │       ├── page.tsx        # project dashboard
│   │   │       └── documents/
│   │   │           └── page.tsx    # docs inside project + upload
│   │   ├── documents/
│   │   │   ├── page.tsx            # all documents
│   │   │   └── [documentId]/
│   │   │       └── page.tsx        # document detail / chunks
│   │   ├── chat/
│   │   │   └── page.tsx            # RAG chat interface
│   │   ├── users/
│   │   │   └── page.tsx            # tenant user management
│   │   └── settings/
│   │       └── page.tsx            # tenant settings
│   └── api/                        # optional Next.js route handlers (webhooks, proxy)
├── components/
│   ├── ui/                         # shadcn base (button, input, card, dialog, drawer, popover, etc.)
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   ├── topbar.tsx
│   │   └── mobile-menu.tsx
│   ├── auth/
│   │   ├── login-form.tsx
│   │   └── signup-form.tsx
│   ├── projects/
│   │   ├── project-card.tsx
│   │   └── project-form.tsx
│   ├── documents/
│   │   ├── upload-dropzone.tsx
│   │   ├── document-list.tsx
│   │   └── document-row.tsx
│   ├── chat/
│   │   ├── chat-interface.tsx
│   │   ├── message.tsx
│   │   └── source-citations.tsx
│   └── dashboard/
│       └── stat-card.tsx
├── lib/
│   ├── api.ts                      # fetch client with bearer-token interceptor
│   ├── auth.ts                     # token get/set/remove, JWT decode helper
│   ├── utils.ts                    # cn() tailwind-merge helper
│   └── validations/                # zod schemas for each form
├── hooks/
│   ├── use-auth.tsx                # auth state + login/logout
│   ├── use-projects.tsx
│   ├── use-documents.tsx
│   └── use-chat.tsx                # streaming chat hook
├── store/
│   └── auth-store.ts               # zustand: user, tenant, token
├── types/
│   └── index.ts                    # TS types mirroring backend schemas (User, Tenant, Project, Document, etc.)
├── middleware.ts                   # auth protection + redirect logic
├── tailwind.config.ts
└── tsconfig.json