export type CanvasLineCap = 'butt' | 'round' | 'square';
export type CanvasLineJoin = 'bevel' | 'miter' | 'round';

export interface RawImages {
  [key: string]: string | any;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface iTransform {
  a: number;
  b: number;
  c: number;
  d: number;
  tx: number;
  ty: number;
}

export const enum LINE_CAP_CODE {
  BUTT = 0,
  ROUND = 1,
  SQUARE = 2,
}

export const enum LINE_JOIN_CODE {
  MITER = 0,
  ROUND = 1,
  BEVEL = 2,
}

export interface RGBA_CODE {
  r: number;
  g: number;
  b: number;
  a: number;
}

export type RGBA = any;

export const enum SHAPE_TYPE_CODE {
  SHAPE = 0,
  RECT = 1,
  ELLIPSE = 2,
  KEEP = 3,
}

export const enum SHAPE_TYPE {
  SHAPE = 'shape',
  RECT = 'rect',
  ELLIPSE = 'ellipse',
}

export interface MovieStyles {
  fill: RGBA_CODE | null;
  stroke: RGBA_CODE | null;
  strokeWidth: number | null;
  lineCap: LINE_CAP_CODE | null;
  lineJoin: LINE_JOIN_CODE | null;
  miterLimit: number | null;
  lineDashI: number | null;
  lineDashII: number | null;
  lineDashIII: number | null;
}

export interface VideoStyles {
  fill: RGBA | null;
  stroke: RGBA | null;
  strokeWidth: number | null;
  lineCap: CanvasLineCap | null;
  lineJoin: CanvasLineJoin | null;
  miterLimit: number | null;
  lineDash: number[] | null;
}

export interface ShapePath {
  d: string;
}

export interface RectPath {
  x: number;
  y: number;
  width: number;
  height: number;
  cornerRadius: number;
}

export interface EllipsePath {
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
}

export interface MovieShape {
  type: SHAPE_TYPE_CODE | null;
  shape: ShapePath | null;
  rect: RectPath | null;
  ellipse: EllipsePath | null;
  styles: MovieStyles | null;
  transform: iTransform | null;
}

export interface VideoShapeShape {
  type: SHAPE_TYPE.SHAPE;
  path: ShapePath;
  styles: VideoStyles;
  transform: iTransform;
}

export interface VideoShapeRect {
  type: SHAPE_TYPE.RECT;
  path: RectPath;
  styles: VideoStyles;
  transform: iTransform;
}

export interface VideoShapeEllipse {
  type: SHAPE_TYPE.ELLIPSE;
  path: EllipsePath;
  styles: VideoStyles;
  transform: iTransform;
}

export interface MaskPath {
  d: string;
  transform: iTransform | undefined;
  styles: VideoStyles;
}

export interface MovieFrame {
  alpha: number;
  transform: iTransform | null;
  nx: number;
  ny: number;
  layout: Rect;
  clipPath: string;
  maskPath: MaskPath | null;
  shapes: MovieShape[];
}

export type VideoFrameShape = VideoShapeShape | VideoShapeRect | VideoShapeEllipse;

export type VideoFrameShapes = VideoFrameShape[];

export interface VideoFrame {
  alpha: number;
  transform: iTransform | null;
  nx: number;
  ny: number;
  layout: Rect;
  clipPath: string;
  maskPath: MaskPath | null;
  shapes: VideoFrameShapes;
}

export interface MovieSprite {
  imageKey: string;
  frames: MovieFrame[];
}

export interface VideoSprite {
  imageKey: string;
  frames: VideoFrame[];
}

export type Bitmap = any;

export interface BitmapsCache {
  [key: string]: Bitmap;
}

export type ReplaceElement = any;

export interface ReplaceElements {
  [key: string]: ReplaceElement;
}

export type DynamicElement = any;

export interface DynamicElements {
  [key: string]: DynamicElement;
}

export interface Movie {
  version: string;
  images: {
    [key: string]: Uint8Array;
  };
  params: {
    fps: number;
    frames: number;
    viewBoxHeight: number;
    viewBoxWidth: number;
  };
  sprites: MovieSprite[];
}

export interface Video {
  version: string;
  size: {
    width: number;
    height: number;
  };
  fps: number;
  frames: number;
  images: RawImages;
  replaceElements: ReplaceElements;
  dynamicElements: DynamicElements;
  sprites: VideoSprite[];
}
