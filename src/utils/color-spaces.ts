import { Color } from '../values/color';

export function rgbaToHex(rgba: number[]) {
  let r = (+rgba[0]).toString(16),
    g = (+rgba[1]).toString(16),
    b = (+rgba[2]).toString(16),
    a = Math.round(+rgba[3] * 255).toString(16);

  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;
  if (a.length == 1) a = '0' + a;

  return '#' + r + g + b + a;
}
export function hexToRgba(hex: string, alpha: number | null): number[] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return [r / 255, g / 255, b / 255, alpha];
  }

  return [r / 255, g / 255, b / 255];
}

export function websafeColors(colors: Color[]): Color[] {
  colors.forEach((color: Color) => {
    color.websafeColors();
  });
  return colors;
}
