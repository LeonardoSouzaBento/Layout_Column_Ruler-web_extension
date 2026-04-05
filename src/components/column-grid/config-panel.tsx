import type { GridLayout } from "@/data/gridLayouts";
import { gridLayouts } from "@/data/gridLayouts";
import { GridInfoTooltip } from "./config-panel/grid-info";
import { Button } from "../ui/button";

interface ConfigPanelProps {
  selectedDevice: string;
  selectedAlias: string;
  onSelect: (device: string, layout: GridLayout) => void;
}

export const ConfigPanel = ({
  selectedDevice,
  selectedAlias,
  onSelect,
}: ConfigPanelProps) => {
  const selectedGroup = gridLayouts[selectedDevice as keyof typeof gridLayouts];
  const selectedLayout = selectedGroup?.layouts.find(
    (l) => l.alias === selectedAlias,
  );

  const breakpoint = `${selectedGroup?.maxWidth ? "<=" : ">="} ${selectedGroup?.maxWidth || 1024}px`;

  const configs = [
    {
      label: "Gap",
      value: selectedLayout?.gutter || "-",
    },
    {
      label: "Margin",
      value: selectedLayout?.margin || "0",
    },
    {
      label: "Columns",
      value: selectedLayout?.columns || "-",
    },
    { label: "Screen", value: breakpoint },
  ];

  if (selectedLayout?.width && !selectedLayout?.margin) {
    configs.push({
      label: "Width",
      value: selectedLayout.width,
    });
  }

  return (
    <div className="flex pt-2 px-1.5 gap-1 pb-2 border-b border-border/50 relative">
      {Object.entries(gridLayouts).map(([device, group]) => {
        const Icon = group.icon;
        const iconClasses =
          device === "mobile"
            ? "scale-x-[0.94] size-[13px]"
            : device === "desktop"
              ? "size-[15px]"
              : "size-[13px]";

        const groupTitle = (
          <span
            className="flex items-center gap-1.5 text-xs font-semibold 
          uppercase tracking-wider text-muted-foreground pb-3"
          >
            <Icon
              className={iconClasses}
              strokeWidth={device === "desktop" ? 2.1 : 2.3}
              fill="hsla(0,0%,0%,0.05)"
            />
            {group.label}
          </span>
        );

        return (
          <div key={device} className="px-1.5 flex flex-col pt-1">
            {groupTitle}

            <div className="flex flex-col gap-0.75 overflow-y-scroll scrollbar-hidden">
              {group.layouts.map((layout) => {
                const selectedBtn =
                  selectedDevice === device && selectedAlias === layout.alias;
                return (
                  <Button
                    key={layout.alias}
                    selected={selectedBtn}
                    onClick={() => onSelect(device, layout)}
                    variant="ghost"
                    size="sm"
                    className="rounded-full px-3 py-1.5 text-sm justify-start max-w-max"
                  >
                    {layout.alias}
                  </Button>
                );
              })}
            </div>
          </div>
        );
      })}

      <GridInfoTooltip
        selectedDevice={selectedDevice}
        selectedAlias={selectedAlias}
        configs={configs}
      />
    </div>
  );
};
