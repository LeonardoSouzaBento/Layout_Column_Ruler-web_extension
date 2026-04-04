import type { GridLayout } from "@/data/gridLayouts";
import { gridLayouts } from "@/data/gridLayouts";
import { CircleQuestionMark } from "lucide-react";
import GridButton from "./GridButton";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GridConfigPanelProps {
  selectedDevice: string;
  selectedAlias: string;
  onSelect: (device: string, layout: GridLayout) => void;
}

const ConfigRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center gap-4">
    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-tight">
      {label}
    </span>
    <span className="text-xs font-bold text-primary font-mono bg-primary/10 px-1 rounded-sm">
      {value}
    </span>
  </div>
);

const GridConfigPanel = ({
  selectedDevice,
  selectedAlias,
  onSelect,
}: GridConfigPanelProps) => {
  const selectedGroup = gridLayouts[selectedDevice as keyof typeof gridLayouts];
  const selectedLayout = selectedGroup?.layouts.find(
    (l) => l.alias === selectedAlias,
  );

  const breakpoint = `${selectedGroup?.maxWidth ? "<=" : ">="} ${selectedGroup?.maxWidth || 1024}px`;

  const configs = [
    { label: "Breakpoint", value: breakpoint },
    { label: "Columns", value: selectedLayout?.columns || "-" },
    { label: "Margin", value: selectedLayout?.margin || "0" },
    { label: "Gap", value: selectedLayout?.gutter || "-" },
  ];

  if (selectedLayout?.width && !selectedLayout?.margin) {
    configs.push({ label: "Width", value: selectedLayout.width });
  }

  return (
    <div className="flex pt-2 px-1.5 gap-1 pb-2 border-b border-border/50">
      {Object.entries(gridLayouts).map(([device, group]) => {
        const Icon = group.icon;
        const iconClasses =
          device === "mobile"
            ? "scale-x-[0.94] size-[12px]"
            : device === "desktop"
              ? "size-[13px]"
              : "size-[12px]";

        const labelContent = (
          <span
            className="flex items-center justify-center gap-1.5 text-xs font-semibold 
          uppercase tracking-wider text-muted-foreground pb-3"
          >
            <Icon
              className={iconClasses}
              strokeWidth={2.4}
              fill="hsla(0,0%,0%,0.05)"
            />
            {group.label}
          </span>
        );

        return (
          <div key={device} className="px-1.5 flex flex-col pt-1">
            {labelContent}

            <div className="flex flex-col gap-0.75 overflow-y-scroll scrollbar-hidden">
              {group.layouts.map((layout) => (
                <GridButton
                  key={layout.alias}
                  label={layout.alias}
                  selected={
                    selectedDevice === device && selectedAlias === layout.alias
                  }
                  onClick={() => onSelect(device, layout)}
                />
              ))}
            </div>
          </div>
        );
      })}

      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="iconSm"
              onClick={() => {
                console.log("click");
              }}
              className="absolute bottom-36 right-3 rounded-full text-base font-medium text-primary  [&_svg]:size-5.5"
            >
              <CircleQuestionMark strokeWidth={1.8} />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="flex flex-col gap-1.5 border-white/50 bg-background/95 2.5 pt-2 pb-2.5 shadow-xl min-w-[100px] animate-in zoom-in-95 duration-200"
          >
            <div className="flex flex-col gap-2.5">
              {configs.map((config) => (
                <ConfigRow
                  key={config.label}
                  label={config.label}
                  value={config.value}
                />
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default GridConfigPanel;
