import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface GridButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const GridButton = ({
  label,
  selected,
  onClick,
}: GridButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1.5 text-sm font-medium capitalize transition-all",
        selected
          ? "not-only-of-type:bg-selected text-selected-foreground shadow-sm hover:bg-selected/90 hover:text-selected-foreground"
          : "text-muted-foreground hover:bg-accent",
      )}
    >
      {label}
    </Button>
  );
};

export default GridButton;
