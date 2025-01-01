import React from "react";
import { NodeViewWrapper, NodeViewContent, NodeViewProps } from "@tiptap/react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const CodeBlockComponent: React.FC<NodeViewProps> = (props) => {
  const [copied, setCopied] = React.useState(false);
  const language = props.node.attrs.language || "";

  const copyToClipboard = async () => {
    const content = document.querySelector(".code-block-content")?.textContent;
    if (content) {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <NodeViewWrapper className="relative">
      <div className="bg-primary-foreground rounded-lg">
        {language && (
          <div className="flex items-center justify-between px-4 py-2 border-b border-primary-background">
            <div className="text-sm text-slate-400">{language}</div>
            <Button
            variant={"secondary"}
              size={"icon"}
              onClick={copyToClipboard}
              className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-200"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        )}
        <div className="p-4 code-block-content overflow-x-auto">
          <NodeViewContent className="text-slate-200 font-mono" />
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export default CodeBlockComponent;
