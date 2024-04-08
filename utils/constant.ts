export interface Option {
  label: string;
  value: string;
}

export const resizeOptions: Option[] = [
  { label: "Crop", value: "crop" },
  { label: "Fit And Fill", value: "fitandfill" },
];

export const flipOptions: Option[] = [
  { label: "Horizontal", value: "horizontal" },
  { label: "Vertical", value: "vertical" },
];

export const filterOptions: Option[] = [
  { label: "Contrast", value: "contrast" },
  { label: "Grayscale", value: "grayscale" },
  { label: "Hue, Saturation , Lightness ", value: "hue-saturation-light" },
  { label: "Opacity", value: "opacity" },
];
