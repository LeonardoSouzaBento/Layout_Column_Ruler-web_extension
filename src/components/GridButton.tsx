import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface GridButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const GridButton = ({ label, selected, onClick }: GridButtonProps) => (
  <Button
    variant="ghost"
    size="sm"
    onClick={onClick}
    className={cn(
      "rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-all",
      selected
        ? "bg-selected text-selected-foreground shadow-sm hover:bg-selected/90 hover:text-selected-foreground"
        : "text-muted-foreground hover:bg-accent"
    )}
  >
    {label}
  </Button>
);

export default GridButton;
