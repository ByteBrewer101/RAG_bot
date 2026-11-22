import { AppTopbar } from "@/components/layout/app-topbar";
import { ChatInterfaceDemo } from "@/components/chat/chat-interface-demo";
import { BlurFadeSection } from "@/components/motion/blur-fade-section";

export default function ChatPage() {
  return (
    <div className="space-y-6">
      <BlurFadeSection index={0}>
        <AppTopbar
          eyebrow="Retrieval augmented chat"
          title="Chat"
          description="Ask questions against your project knowledge and review cited source snippets. This demo runs entirely on local mock data."
        />
      </BlurFadeSection>
      <BlurFadeSection index={1}>
        <ChatInterfaceDemo />
      </BlurFadeSection>
    </div>
  );
}
