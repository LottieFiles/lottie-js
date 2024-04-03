import { BlendMode, FillRuleType, GradientFillType, PropertyType, ShapeType } from '../constants';
import { Gradient, Property } from '../properties';
import { Shape } from './shape';

/**
 * Gradient fill shape type.
 */
export class GradientFillShape extends Shape {
  /**
   * Gradient shape type: gf
   */
  public readonly type = ShapeType.GRADIENT_FILL;

  public blendMode: BlendMode = BlendMode.NORMAL;

  public endPoint: Property = new Property(this, PropertyType.POSITION);

  public gradientColors: Gradient = new Gradient();

  public gradientType: GradientFillType = GradientFillType.LINEAR;

  public highlightAngle: Property = new Property(this, PropertyType.NUMBER);

  public highlightLength: Property = new Property(this, PropertyType.NUMBER);

  public opacity: Property = new Property(this, PropertyType.OPACITY);

  public startPoint: Property = new Property(this, PropertyType.POSITION);

  public fillRule: FillRuleType = FillRuleType.EVEN_ODD;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       GradientFillShape instance
   */
  public fromJSON(json: Record<string, any>): GradientFillShape {
    // Base shape
    super.fromJSON(json);

    // This shape
    this.blendMode = json.bm;
    this.endPoint.fromJSON(json.e);
    this.gradientColors.fromJSON(json.g);
    this.gradientType = json.t;
    this.opacity.fromJSON(json.o);
    this.startPoint.fromJSON(json.s);
    this.fillRule = json.r;

    if (this.gradientType === GradientFillType.RADIAL) {
      if ('a' in json) {
        this.highlightAngle.fromJSON(json.a);
      }
      if ('h' in json) {
        this.highlightLength.fromJSON(json.h);
      }
    }

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
      e: this.endPoint,
      g: this.gradientColors,
      t: this.gradientType,
      a: this.highlightAngle,
      h: this.highlightLength,
      o: this.opacity,
      r: this.fillRule,
      s: this.startPoint,
    });
  }
}
