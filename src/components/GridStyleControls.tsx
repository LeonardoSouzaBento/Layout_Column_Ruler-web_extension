import { Separator } from "@/components/ui/separator";

const COLORS = [
  { name: "blue", value: "220 70% 55%" },
  { name: "red", value: "0 72% 55%" },
  { name: "green", value: "142 60% 45%" },
  { name: "purple", value: "270 60% 55%" },
  { name: "orange", value: "25 90% 55%" },
  { name: "pink", value: "330 70% 55%" },
  { name: "teal", value: "180 55% 45%" },
  { name: "gray", value: "220 10% 50%" },
];

interface GridStyleControlsProps {
  color: string;
  opacity: number;
  onColorChange: (color: string) => void;
  onOpacityChange: (opacity: number) => void;
}

const GridStyleControls = ({ color, opacity, onColorChange, onOpacityChange }: GridStyleControlsProps) => (
  <div className="flex flex-col gap-2.5">
    <Separator className="bg-glass-border" />

    <div className="flex flex-col gap-2 px-3 pb-2">
      <div className="flex flex-wrap gap-1.5">
        {COLORS.map((c) => (
          <button
            key={c.name}
            onClick={() => onColorChange(c.value)}
            className="h-5 w-5 rounded-full ring-1 ring-muted-foreground/20 transition-transform hover:scale-110"
            style={{
              background: `hsl(${c.value})`,
              outline: color === c.value ? "2px solid hsl(var(--selected))" : "none",
              outlineOffset: "2px",
            }}
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Opacidade
        </span>
        <input
          type="range"
          min={5}
          max={100}
          value={Math.round(opacity * 100)}
          onChange={(e) => onOpacityChange(Number(e.target.value) / 100)}
          className="h-1 flex-1 cursor-pointer accent-selected"
        />
        <span className="w-8 text-right text-[11px] tabular-nums text-muted-foreground">
          {Math.round(opacity * 100)}%
        </span>
      </div>
    </div>
  </div>
);

export default GridStyleControls;
