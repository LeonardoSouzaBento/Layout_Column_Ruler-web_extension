import { gridLayouts, deviceLabels } from "@/data/gridLayouts";
import type { GridLayout } from "@/data/gridLayouts";
import GridButton from "./GridButton";

interface GridConfigPanelProps {
  selections: Record<string, string>;
  onSelect: (device: string, layout: GridLayout) => void;
}

const GridConfigPanel = ({ selections, onSelect }: GridConfigPanelProps) => (
  <div className="flex flex-col gap-3 p-3">
    {Object.entries(gridLayouts).map(([device, layouts]) => (
      <div key={device} className="flex flex-col gap-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {deviceLabels[device]}
        </span>
        <div className="flex flex-wrap gap-1">
          {layouts.map((layout) => (
            <GridButton
              key={layout.alias}
              label={layout.alias}
              selected={selections[device] === layout.alias}
              onClick={() => onSelect(device, layout)}
            />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default GridConfigPanel;
