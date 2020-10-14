import { BlendMode, FillRuleType, GradientFillType, PropertyType, ShapeType } from '../constants';
import { Property } from '../properties';
import { Shape } from './shape';

/**
 * Gradient fill shape type.
 */
export class GradientFillShape extends Shape {
  /**
   * Gradient shape type: fl
   */
  public readonly type = ShapeType.GRADIENT_FILL;

  public blendMode: BlendMode = BlendMode.NORMAL;

  public endPoint: Property = new Property(this, PropertyType.POSITION);

  public gradientColors: Property = new Property(this, PropertyType.COLOR);

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
    this.classNames = json.cl;
    this.id = json.ln;
    this.isHidden = json.hd;
    this.matchName = json.mn;
    this.name = json.nm;

    // This shape
    this.blendMode = json.bm;
    this.endPoint.fromJSON(json.e);
    this.gradientColors.fromJSON(json.g);
    this.gradientType = json.t;
    this.opacity.fromJSON(json.o);
    this.startPoint.fromJSON(json.s);
    this.fillRule = json.r;

    if (this.gradientType === GradientFillType.LINEAR) {
      this.highlightAngle.fromJSON(json.a);
      this.highlightLength.fromJSON(json.h);
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
      e: this.endPoint,
      g: this.gradientColors,
      t: this.gradientType,
      a: this.highlightAngle,
      h: this.highlightLength,
      o: this.opacity,
      r: this.fillRule,
      s: this.startPoint,
    };
  }
}
