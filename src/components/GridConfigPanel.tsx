import { gridLayouts } from "@/data/gridLayouts";
import type { GridLayout } from "@/data/gridLayouts";
import GridButton from "./GridButton";

interface GridConfigPanelProps {
  selectedDevice: string;
  selectedAlias: string;
  onSelect: (device: string, layout: GridLayout) => void;
}

const GridConfigPanel = ({ selectedDevice, selectedAlias, onSelect }: GridConfigPanelProps) => (
  <div className="flex flex-col gap-3 p-3">
    {Object.entries(gridLayouts).map(([device, group]) => {
      const Icon = group.icon;
      return (
        <div key={device} className="flex flex-col gap-1.5">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <Icon size={13} className={device === "mobile" ? "scale-x-[0.94]" : ""} />
            {group.label}
          </span>
          <div className="flex flex-wrap gap-1">
            {group.layouts.map((layout) => (
              <GridButton
                key={layout.alias}
                label={layout.alias}
                selected={selectedDevice === device && selectedAlias === layout.alias}
                onClick={() => onSelect(device, layout)}
              />
            ))}
          </div>
        </div>
      );
    })}
  </div>
);

export default GridConfigPanel;
