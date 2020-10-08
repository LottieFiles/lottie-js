import { BlendMode } from '../constants/BlendMode';
import { LineCapType } from '../constants/LineCapType';
import { LineJoinType } from '../constants/LineJoinType';
import { PropertyType } from '../constants/PropertyType';
import { ShapeType } from '../constants/ShapeType';
import { Property } from '../properties/Property';
import { Shape } from './Shape';

export class StrokeShape extends Shape {
  /**
   * Shape type
   */
  public readonly type = ShapeType.STROKE;

  public blendMode: BlendMode = BlendMode.NORMAL;

  public color: Property = new Property(PropertyType.COLOR);

  /**
   * Line cap.
   *
   * Mapped field: lc
   */
  public lineCapType: LineCapType = LineCapType.ROUND;

  /**
   * Line join.
   *
   * Mapped field: lj
   */
  public lineJoinType: LineJoinType = LineJoinType.ROUND;

  /**
   * Miter limit.
   *
   * Mapped field: ml
   */
  public miterLimit!: number;

  public opacity: Property = new Property(PropertyType.OPACITY);

  public width: Property = new Property(PropertyType.STROKE_WIDTH);

  public static fromJSON(json: Record<string, any>): StrokeShape {
    const shape = new StrokeShape();

    // Base shape
    shape.classNames = json.cl;
    shape.id = json.ln;
    shape.isHidden = json.hd;
    shape.matchName = json.mn;
    shape.name = json.nm;

    // This shape
    shape.blendMode = json.bm in BlendMode ? json.bm : BlendMode.NORMAL;
    shape.color = Property.fromJSON(PropertyType.COLOR, json.c);
    shape.lineCapType = json.lc in LineCapType ? json.lc : LineCapType.ROUND;
    shape.lineJoinType = json.lj in LineJoinType ? json.lj : LineJoinType.ROUND;
    shape.miterLimit = json.ml;
    shape.opacity = Property.fromJSON(PropertyType.OPACITY, json.o);
    shape.width = Property.fromJSON(PropertyType.STROKE_WIDTH, json.w);

    return shape;
  }

  public toJSON(): Record<string, any> {
    return {
      ty: this.type,

      // Base shape
      cl: this.classNames,
      hd: this.isHidden,
      ln: this.id,
      mn: this.matchName,
      nm: this.name,

      // This shape
      bm: this.blendMode,
      c: this.color,
      lc: this.lineCapType,
      lj: this.lineJoinType,
      ml: this.miterLimit,
      o: this.opacity,
      w: this.width,
    };
  }
}
