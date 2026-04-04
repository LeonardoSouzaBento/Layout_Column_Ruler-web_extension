import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { GridLayout } from "@/data/gridLayouts";
import { gridLayouts } from "@/data/gridLayouts";
import GridConfigPanel from "./GridConfigPanel";
import GridOverlay from "./GridOverlay";

const LayoutGrid = () => {
  const [open, setOpen] = useState(false);
  const defaultLayout = gridLayouts.desktop[4]; // "airy"
  const [activeLayout, setActiveLayout] = useState<GridLayout>(defaultLayout);
  const [selections, setSelections] = useState<Record<string, string>>({
    desktop: "airy",
    tablet: "",
    mobile: "",
  });

  const handleSelect = (device: string, layout: GridLayout) => {
    setSelections((prev) => ({ ...prev, [device]: layout.alias }));
    setActiveLayout(layout);
  };

  return (
    <>
      <GridOverlay layout={activeLayout} />

      <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2">
        <div
          className="overflow-hidden rounded-xl border shadow-lg"
          style={{
            background: "hsl(var(--glass-bg))",
            borderColor: "hsl(var(--glass-border))",
            backdropFilter: `blur(var(--glass-blur))`,
            WebkitBackdropFilter: `blur(var(--glass-blur))`,
          }}
        >
          <Button
            variant="ghost"
            onClick={() => setOpen((v) => !v)}
            className="w-full justify-between gap-2 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent/50"
          >
            Configurar grid
            <ChevronDown
              size={16}
              className={cn(
                "transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </Button>

          <div
            className={cn(
              "grid transition-all duration-200 ease-out",
              open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <div className="border-t" style={{ borderColor: "hsl(var(--glass-border))" }}>
                <GridConfigPanel selections={selections} onSelect={handleSelect} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutGrid;
