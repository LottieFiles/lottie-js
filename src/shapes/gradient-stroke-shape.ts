import { BlendMode, GradientFillType, LineCapType, LineJoinType, PropertyType, ShapeType } from '../constants';
import { Gradient, Property } from '../properties';
import { Shape } from './shape';

/**
 * Gradient stroke shape type.
 */
export class GradientStrokeShape extends Shape {
  /**
   * Gradient shape type: gs
   */
  public readonly type = ShapeType.GRADIENT_STROKE;

  public blendMode: BlendMode = BlendMode.NORMAL;

  public endPoint: Property = new Property(this, PropertyType.POSITION);

  public gradientColors: Gradient = new Gradient();

  public gradientType: GradientFillType = GradientFillType.LINEAR;

  public highlightAngle: Property = new Property(this, PropertyType.NUMBER);

  public highlightLength: Property = new Property(this, PropertyType.NUMBER);

  public opacity: Property = new Property(this, PropertyType.OPACITY);

  public startPoint: Property = new Property(this, PropertyType.POSITION);

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

  public width: Property = new Property(this, PropertyType.STROKE_WIDTH);

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       GradientFillShape instance
   */
  public fromJSON(json: Record<string, any>): GradientStrokeShape {
    // Base shape
    super.fromJSON(json);

    // This shape
    this.blendMode = json.bm;
    this.opacity.fromJSON(json.o);

    // Gradient
    this.endPoint.fromJSON(json.e);
    this.gradientColors.fromJSON(json.g);
    this.gradientType = json.t;
    this.startPoint.fromJSON(json.s);

    if (this.gradientType === GradientFillType.RADIAL) {
      this.highlightAngle.fromJSON(json.a);
      this.highlightLength.fromJSON(json.h);
    }

    // Stroke
    this.lineCapType = json.lc in LineCapType ? json.lc : LineCapType.ROUND;
    this.lineJoinType = json.lj in LineJoinType ? json.lj : LineJoinType.ROUND;
    this.miterLimit = json.ml;
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
    const json = super.toJSON();

    return Object.assign(json, {
      // This shape
      bm: this.blendMode,
      o: this.opacity,

      // Gradient
      e: this.endPoint,
      g: this.gradientColors,
      t: this.gradientType,
      a: this.highlightAngle,
      h: this.highlightLength,
      s: this.startPoint,

      // Stroke
      lc: this.lineCapType,
      lj: this.lineJoinType,
      ml: this.miterLimit,
      w: this.width,
    });
  }
}
