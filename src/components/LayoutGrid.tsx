import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { GridLayout } from "@/data/gridLayouts";
import { gridLayouts } from "@/data/gridLayouts";
import GridConfigPanel from "./GridConfigPanel";
import GridStyleControls from "./GridStyleControls";
import GridOverlay from "./GridOverlay";

function getInitialDevice(): string {
  const w = window.innerWidth;
  if (w <= 768) return "mobile";
  if (w <= 1024) return "tablet";
  return "desktop";
}

function getInitialLayout(): GridLayout {
  const device = getInitialDevice();
  const group = gridLayouts[device];
  const defaultAlias = device === "desktop" ? "balanced" : "default";
  return (
    group.layouts.find((l) => l.alias === defaultAlias) ?? group.layouts[0]
  );
}

const DEFAULT_COLOR = "220 70% 55%";
const DEFAULT_OPACITY = 0.25;

const LayoutGrid = () => {
  const [open, setOpen] = useState(false);
  const [activeLayout, setActiveLayout] =
    useState<GridLayout>(getInitialLayout);
  const [selectedDevice, setSelectedDevice] =
    useState<string>(getInitialDevice);
  const [columnColor, setColumnColor] = useState(DEFAULT_COLOR);
  const [columnOpacity, setColumnOpacity] = useState(DEFAULT_OPACITY);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveLayout(getInitialLayout());
    setSelectedDevice(getInitialDevice());
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleSelect = (device: string, layout: GridLayout) => {
    setSelectedDevice(device);
    setActiveLayout(layout);
  };

  return (
    <>
      <GridOverlay
        layout={activeLayout}
        color={columnColor}
        opacity={columnOpacity}
      />

      <div ref={containerRef} className="fixed bottom-4 right-4 z-50">
        <div
          className="rounded-xl shadow-sm ring-1 ring-glass-border"
          style={{
            background: "var(--color-glass-bg)",
            backdropFilter: `blur(var(--color-glass-blur))`,
            WebkitBackdropFilter: `blur(var(--color-glass-blur))`,
          }}
        >
          <div
            className={cn(
              "grid transition-all duration-200 ease-out",
              open
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <div className="border-b">
                <GridConfigPanel
                  selectedDevice={selectedDevice}
                  selectedAlias={activeLayout.alias}
                  onSelect={handleSelect}
                />
                <GridStyleControls
                  color={columnColor}
                  opacity={columnOpacity}
                  onColorChange={setColumnColor}
                  onOpacityChange={setColumnOpacity}
                />
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={() => setOpen((v) => !v)}
            className="w-full justify-between gap-2 px-4 py-2.5 text-sm 
            font-medium text-foreground hover:bg-accent/50"
          >
            Configurar grid
            <ChevronDown
              size={24}
              strokeWidth={2}
              className={cn(
                "transition-transform duration-200",
                open && "rotate-180",
              )}
            />
          </Button>
        </div>
      </div>
    </>
  );
};

export default LayoutGrid;
