import { Save, KeyRound, SlidersHorizontal, Building2 } from "lucide-react";
import { AppTopbar } from "@/components/layout/app-topbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { demoSettings, demoProjects } from "@/lib/demo-data";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  );
}

function ToggleRow({ label, hint, defaultChecked }: { label: string; hint: string; defaultChecked?: boolean }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-border/60 bg-background/30 p-4">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      </div>
      <input type="checkbox" defaultChecked={defaultChecked} className="mt-1 h-4 w-4 accent-[#949d6a]" />
    </label>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <AppTopbar
        eyebrow="Workspace"
        title="Settings"
        description="Configure tenant defaults and retrieval preferences. All controls are demo-only and not persisted."
        actions={<Button className="gap-2 rounded-xl bg-[image:var(--gradient-primary)] text-[color:var(--primary-foreground)] hover:bg-[image:var(--gradient-primary-hover)]"><Save className="h-4 w-4" /> Save changes</Button>}
      />

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="border-border/60 bg-card/45 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><Building2 className="h-4 w-4 text-[#f6ca83] light:text-[#8a6524]" /> Workspace profile</CardTitle>
            <CardDescription>Basic information shown across the dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Workspace name">
              <Input defaultValue={demoSettings.workspaceName} className="bg-background/50" />
            </Field>
            <Field label="Support email">
              <Input type="email" defaultValue={demoSettings.supportEmail} className="bg-background/50" />
            </Field>
            <Field label="Default project" hint="Used as the initial scope for chat and uploads in demos.">
              <select defaultValue={demoSettings.defaultProjectId} className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {demoProjects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </Field>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/45 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><SlidersHorizontal className="h-4 w-4 text-[#f6ca83] light:text-[#8a6524]" /> Retrieval defaults</CardTitle>
            <CardDescription>Demo values for chunking and answer behavior.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Top K"><Input type="number" defaultValue={demoSettings.retrievalTopK} className="bg-background/50" /></Field>
              <Field label="Chunk size"><Input type="number" defaultValue={demoSettings.chunkSize} className="bg-background/50" /></Field>
              <Field label="Overlap"><Input type="number" defaultValue={demoSettings.chunkOverlap} className="bg-background/50" /></Field>
            </div>
            <Field label="Answer style">
              <select defaultValue={demoSettings.answerStyle} className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="concise">Concise</option>
                <option value="balanced">Balanced</option>
                <option value="detailed">Detailed</option>
              </select>
            </Field>
            <div className="space-y-3">
              <ToggleRow label="Require citations" hint="Prefer answers that include source references when available." defaultChecked={demoSettings.citationsRequired} />
              <ToggleRow label="Auto-reindex on update" hint="Reprocess documents when source content changes (demo)." defaultChecked={demoSettings.autoReindex} />
              <ToggleRow label="Notify on ingestion failure" hint="Show alerts when a document fails processing." defaultChecked={demoSettings.notifyOnFailure} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/45 backdrop-blur-sm xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><KeyRound className="h-4 w-4 text-[#f6ca83] light:text-[#8a6524]" /> API & integration</CardTitle>
            <CardDescription>Placeholder credentials for the future backend connection.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Field label="API base URL" hint="Will be wired when API integration is added.">
              <Input defaultValue={demoSettings.apiBaseUrl} className="bg-background/50 font-mono text-xs sm:text-sm" />
            </Field>
            <Field label="API key" hint="Masked demo value — never expose real keys in UI.">
              <Input defaultValue={demoSettings.apiKeyMasked} readOnly className="bg-background/50 font-mono text-xs sm:text-sm" />
            </Field>
            <div className="space-y-2 rounded-xl border border-border/60 bg-background/30 p-4 md:col-span-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Skeleton preview</p>
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
