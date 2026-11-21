"use client";

import * as React from "react";
import { Send, Sparkles, FileSearch } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { demoProjects, demoChatThreads, type DemoMessage, type DemoCitation } from "@/lib/demo-data";

function CitationPill({ c }: { c: DemoCitation }) {
  return (
    <div className="rounded-lg border border-border/60 bg-background/50 p-2.5">
      <p className="text-xs font-medium text-foreground">
        {c.documentName} · chunk {c.chunkIndex}
      </p>
      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{c.snippet}</p>
    </div>
  );
}

export function ChatInterfaceDemo() {
  const initial = demoChatThreads[0];
  const [projectId, setProjectId] = React.useState(initial.projectId);
  const [messages, setMessages] = React.useState<DemoMessage[]>(initial.messages);
  const [input, setInput] = React.useState("");
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function onSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const userMsg: DemoMessage = {
      id: `m_${Date.now()}`,
      role: "user",
      content: text,
      createdAt: "Now",
    };
    const assistantMsg: DemoMessage = {
      id: `m_${Date.now()}_a`,
      role: "assistant",
      content:
        "Demo response: in the live app this answer would be generated from retrieved chunks for the selected project and include verifiable source citations. Connect the chat API to replace this placeholder.",
      createdAt: "Now",
      citations: demoChatThreads[0].messages[1]?.citations?.slice(0, 1),
    };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      <Card className="flex min-h-[560px] flex-col border-border/60 bg-card/45 backdrop-blur-sm">
        <CardHeader className="border-b border-border/60 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg">Ask your knowledge base</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Demo chat · responses are static placeholders</p>
            </div>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="h-9 rounded-md border border-input bg-background/50 px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Select project scope"
            >
              {demoProjects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </CardHeader>
        <CardContent className="flex min-h-0 flex-1 flex-col p-0">
          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <Sparkles className="mb-3 h-8 w-8 text-[#f6ca83] light:text-[#8a6524]" />
                <p className="font-medium text-foreground">Start a conversation</p>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">Ask a question about your selected project and get answers with citations.</p>
              </div>
            ) : (
              messages.map((m) => (
                <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl border px-4 py-3 text-sm",
                      m.role === "user"
                        ? "border-[#d0d38f]/30 bg-[image:var(--gradient-primary)] text-[color:var(--primary-foreground)]"
                        : "border-border/60 bg-background/55 text-foreground backdrop-blur-sm",
                    )}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                    {m.citations && m.citations.length > 0 ? (
                      <div className={cn("mt-3 space-y-2 border-t pt-3", m.role === "user" ? "border-black/10" : "border-border/60")}>
                        <p className={cn("text-xs font-medium uppercase tracking-wide", m.role === "user" ? "opacity-80" : "text-muted-foreground")}>
                          Sources
                        </p>
                        <div className="grid gap-2">
                          {m.citations.map((c) => <CitationPill key={c.id} c={c} />)}
                        </div>
                      </div>
                    ) : null}
                    <p className={cn("mt-2 text-[11px]", m.role === "user" ? "opacity-75" : "text-muted-foreground")}>{m.createdAt}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <form onSubmit={onSend} className="border-t border-border/60 p-3 sm:p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about your docs..."
                className="bg-background/50"
              />
              <Button type="submit" className="shrink-0 rounded-xl bg-[image:var(--gradient-primary)] px-4 text-[color:var(--primary-foreground)] hover:bg-[image:var(--gradient-primary-hover)]">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card className="border-border/60 bg-card/45 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base"><FileSearch className="h-4 w-4 text-[#f6ca83] light:text-[#8a6524]" /> Suggested prompts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            {[
              "Summarize the getting started guide",
              "What is the escalation path for SEV1?",
              "Which docs are still indexing?",
            ].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setInput(q)}
                className="w-full rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-left text-sm text-muted-foreground hover:border-[#d0d38f]/30 hover:text-foreground"
              >
                {q}
              </button>
            ))}
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-card/45 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Retrieval context</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-0 text-sm text-muted-foreground">
            <p><span className="font-medium text-foreground">Scope:</span> {demoProjects.find((p) => p.id === projectId)?.name}</p>
            <p><span className="font-medium text-foreground">Citations:</span> enabled (demo)</p>
            <p><span className="font-medium text-foreground">Mode:</span> static preview, no API calls</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
