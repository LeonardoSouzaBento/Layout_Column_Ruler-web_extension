import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { GridLayout } from "@/data/gridLayouts";
import { gridLayouts } from "@/data/gridLayouts";
import GridConfigPanel from "./GridConfigPanel";
import GridOverlay from "./GridOverlay";

function getInitialLayout(): GridLayout {
  const w = window.innerWidth;
  if (w >= 1024) {
    return gridLayouts.desktop.find((l) => l.alias === "balanced")!;
  } else if (w >= 768) {
    return gridLayouts.tablet.find((l) => l.alias === "default")!;
  }
  return gridLayouts.mobile.find((l) => l.alias === "default")!;
}

function getInitialDevice(): string {
  const w = window.innerWidth;
  if (w >= 1024) return "desktop";
  if (w >= 768) return "tablet";
  return "mobile";
}

const LayoutGrid = () => {
  const [open, setOpen] = useState(false);
  const [activeLayout, setActiveLayout] = useState<GridLayout>(getInitialLayout);
  const [selectedDevice, setSelectedDevice] = useState<string>(getInitialDevice);

  useEffect(() => {
    const initial = getInitialLayout();
    setActiveLayout(initial);
    setSelectedDevice(getInitialDevice());
  }, []);

  const handleSelect = (device: string, layout: GridLayout) => {
    setSelectedDevice(device);
    setActiveLayout(layout);
  };

  return (
    <>
      <GridOverlay layout={activeLayout} />

      <div className="fixed bottom-4 right-4 z-50">
        <div
          className="overflow-hidden rounded-xl shadow-sm ring-1 ring-glass-border"
          style={{
            background: "hsl(var(--glass-bg))",
            backdropFilter: `blur(var(--glass-blur))`,
            WebkitBackdropFilter: `blur(var(--glass-blur))`,
          }}
        >
          <div
            className={cn(
              "grid transition-all duration-200 ease-out",
              open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <div className="border-b border-glass-border">
                <GridConfigPanel
                  selectedDevice={selectedDevice}
                  selectedAlias={activeLayout.alias}
                  onSelect={handleSelect}
                />
              </div>
            </div>
          </div>

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
        </div>
      </div>
    </>
  );
};

export default LayoutGrid;
