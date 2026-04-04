import type { GridLayout } from "@/data/gridLayouts";

interface GridOverlayProps {
  layout: GridLayout;
}

const GridOverlay = ({ layout }: GridOverlayProps) => {
  const { columns, gutter, margin, width, type } = layout;

  const containerStyle: React.CSSProperties =
    type === "stretch"
      ? {
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: gutter,
          padding: `0 ${margin}`,
        }
      : {
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, ${width})`,
          gap: gutter,
          justifyContent: "center",
        };

  return (
    <div className="pointer-events-none fixed inset-0 z-10 h-full w-full" style={containerStyle}>
      {Array.from({ length: columns }, (_, i) => (
        <div
          key={i}
          className="h-full rounded-sm bg-grid-column/10"
        />
      ))}
    </div>
  );
};

export default GridOverlay;
