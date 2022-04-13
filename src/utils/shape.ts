import { ShapeType } from '../constants';
import {
  EllipseShape,
  FillShape,
  GradientFillShape,
  GradientStrokeShape,
  GroupShape,
  MergeShape,
  OffsetPathShape,
  PathShape,
  PuckerBloatShape,
  RectangleShape,
  RepeaterShape,
  RoundedCornersShape,
  StarShape,
  StrokeShape,
  TrimShape,
  TwistShape,
  ZigZagShape,
} from '../shapes';

export const createShapeFromType = (type: ShapeType, parent: any) => {
  if (type === ShapeType.PATH) {
    return new PathShape(parent);
  } else if (type === ShapeType.GROUP) {
    return new GroupShape(parent);
  } else if (type === ShapeType.FILL) {
    return new FillShape(parent);
  } else if (type === ShapeType.RECTANGLE) {
    return new RectangleShape(parent);
  } else if (type === ShapeType.ELLIPSE) {
    return new EllipseShape(parent);
  } else if (type === ShapeType.STROKE) {
    return new StrokeShape(parent);
  } else if (type === ShapeType.GRADIENT_FILL) {
    return new GradientFillShape(parent);
  } else if (type === ShapeType.GRADIENT_STROKE) {
    return new GradientStrokeShape(parent);
  } else if (type === ShapeType.TRIM) {
    return new TrimShape(parent);
  } else if (type === ShapeType.MERGE) {
    return new MergeShape(parent);
  } else if (type === ShapeType.STAR) {
    return new StarShape(parent);
  } else if (type === ShapeType.ROUNDED_CORNERS) {
    return new RoundedCornersShape(parent);
  } else if (type === ShapeType.REPEATER) {
    return new RepeaterShape(parent);
  } else if (type === ShapeType.PUCKER_BLOAT) {
    return new PuckerBloatShape(parent);
  } else if (type === ShapeType.OFFSET_PATH) {
    return new OffsetPathShape(parent);
  } else if (type === ShapeType.TWIST) {
    return new TwistShape(parent);
  } else if (type === ShapeType.ZIG_ZAG) {
    return new ZigZagShape(parent);
  }
  throw new Error(`Invalid or unknown shape type: ${type}`);
};
