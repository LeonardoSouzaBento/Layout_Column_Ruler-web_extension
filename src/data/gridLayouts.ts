export interface GridLayout {
  alias: string;
  type: "stretch" | "center";
  columns: number;
  margin?: string;
  gutter: string;
  width?: string;
}

export interface GridLayouts {
  [key: string]: GridLayout[];
}

export const gridLayouts: GridLayouts = {
  desktop: [
    { alias: "compact", type: "stretch", columns: 12, margin: "16px", gutter: "16px" },
    { alias: "balanced", type: "stretch", columns: 12, margin: "32px", gutter: "32px" },
    { alias: "wide", type: "center", columns: 12, width: "72px", gutter: "24px" },
    { alias: "container", type: "center", columns: 12, width: "88px", gutter: "16px" },
    { alias: "airy", type: "stretch", columns: 12, margin: "100px", gutter: "20px" },
  ],
  tablet: [
    { alias: "compact", type: "stretch", columns: 8, margin: "32px", gutter: "20px" },
    { alias: "default", type: "stretch", columns: 8, margin: "64px", gutter: "16px" },
    { alias: "wide", type: "stretch", columns: 8, margin: "88px", gutter: "24px" },
  ],
  mobile: [
    { alias: "tight", type: "stretch", columns: 4, margin: "16px", gutter: "16px" },
    { alias: "compact", type: "stretch", columns: 4, margin: "12px", gutter: "12px" },
    { alias: "default", type: "stretch", columns: 4, margin: "24px", gutter: "16px" },
    { alias: "comfort", type: "stretch", columns: 4, margin: "24px", gutter: "20px" },
  ],
};

export const deviceLabels: Record<string, string> = {
  desktop: "Desktop",
  tablet: "Tablet",
  mobile: "Mobile",
};
