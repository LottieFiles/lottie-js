import { BlendMode, LineCapType, LineJoinType, PropertyType, ShapeType } from '../constants';
import { Property } from '../properties';
import { Shape } from './shape';

/**
 * Stroke shape type.
 */
export class StrokeShape extends Shape {
  /**
   * Shape type
   */
  public readonly type = ShapeType.STROKE;

  public blendMode: BlendMode = BlendMode.NORMAL;

  public color: Property = new Property(this, PropertyType.COLOR);

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

  public opacity: Property = new Property(this, PropertyType.OPACITY);

  public width: Property = new Property(this, PropertyType.STROKE_WIDTH);

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       StrokeShape instance
   */
  public fromJSON(json: Record<string, any>): StrokeShape {
    // Base shape
    this.classNames = json.cl;
    this.id = json.ln;
    this.isHidden = json.hd;
    this.matchName = json.mn;
    this.name = json.nm;

    // This shape
    this.blendMode = json.bm in BlendMode ? json.bm : BlendMode.NORMAL;
    this.color.fromJSON(json.c);
    this.lineCapType = json.lc in LineCapType ? json.lc : LineCapType.ROUND;
    this.lineJoinType = json.lj in LineJoinType ? json.lj : LineJoinType.ROUND;
    this.miterLimit = json.ml;
    this.opacity.fromJSON(json.o);
    this.width.fromJSON(json.w);

    return this;
  }

  /**
   * Convert the class instance to Lottie JSON object.
   *
   * Called by Javascript when serializing object with JSON.stringify()
   *
   * @returns       JSON object
   */
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
