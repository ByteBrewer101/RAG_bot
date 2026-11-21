import { AppTopbar } from "@/components/layout/app-topbar";
import { ChatInterfaceDemo } from "@/components/chat/chat-interface-demo";

export default function ChatPage() {
  return (
    <div className="space-y-6">
      <AppTopbar
        eyebrow="Retrieval augmented chat"
        title="Chat"
        description="Ask questions against your project knowledge and review cited source snippets. This demo runs entirely on local mock data."
      />
      <ChatInterfaceDemo />
    </div>
  );
}
