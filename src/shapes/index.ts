import { ShapeType } from '../constants/ShapeType';
import { EllipseShape } from './EllipseShape';
import { FillShape } from './FillShape';
import { GradientFillShape } from './GradientFillShape';
import { GroupShape } from './GroupShape';
import { PathShape } from './PathShape';
import { RectangleShape } from './RectangleShape';
import { Shape } from './Shape';
import { StrokeShape } from './StrokeShape';
import { TrimShape } from './TrimShape';

export function createShape(type: string): Shape {
  if (type === ShapeType.PATH) {
    return new PathShape();
  } else if (type === ShapeType.GROUP) {
    return new GroupShape();
  } else if (type === ShapeType.FILL) {
    return new FillShape();
  } else if (type === ShapeType.RECTANGLE) {
    return new RectangleShape();
  } else if (type === ShapeType.ELLIPSE) {
    return new EllipseShape();
  } else if (type === ShapeType.STROKE) {
    return new StrokeShape();
  } else if (type === ShapeType.GRADIENT_FILL) {
    return new GradientFillShape();
  } else if (type === ShapeType.TRIM) {
    return new TrimShape();
  }

  throw new Error(`Invalid or unknown shape type: ${type}`);
}

export function createShapeFromJSON(json: Record<string, any>): Shape {
  if (json.ty === ShapeType.PATH) {
    return PathShape.fromJSON(json);
  } else if (json.ty === ShapeType.GROUP) {
    return GroupShape.fromJSON(json);
  } else if (json.ty === ShapeType.FILL) {
    return FillShape.fromJSON(json);
  } else if (json.ty === ShapeType.RECTANGLE) {
    return RectangleShape.fromJSON(json);
  } else if (json.ty === ShapeType.ELLIPSE) {
    return EllipseShape.fromJSON(json);
  } else if (json.ty === ShapeType.STROKE) {
    return StrokeShape.fromJSON(json);
  } else if (json.ty === ShapeType.GRADIENT_FILL) {
    return GradientFillShape.fromJSON(json);
  } else if (json.ty === ShapeType.TRIM) {
    return TrimShape.fromJSON(json);
  }

  throw new Error(`Unable to create shape from JSON: ${json.ty}`);
}

export {
  GroupShape,
  FillShape,
  RectangleShape,
  EllipseShape,
  StrokeShape,
  GradientFillShape,
  PathShape,
  TrimShape,
  Shape,
};
