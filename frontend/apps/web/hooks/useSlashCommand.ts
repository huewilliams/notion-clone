import {useCallback, useState} from "react";

export function useSlashCommand() {
  const [showSlashCommands, setShowSlashCommands] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [isSingle, setIsSingle] = useState(false);

  const handleSlashCommand = useCallback((isSingle: boolean) => {
    const selection = window.getSelection();
    if ((selection?.rangeCount ?? 0) < 1) return;
    const getRange = selection?.getRangeAt(0);
    const rect = getRange?.getBoundingClientRect();
    if (rect) setRect(rect);
    setShowSlashCommands(true);
    setIsSingle(isSingle);
  }, []);

  return {
    handleSlashCommand,
    showSlashCommands,
    setShowSlashCommands,
    rect,
    isSingle,
  }
}
