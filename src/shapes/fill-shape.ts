import { BlendMode, FillRuleType } from '../constants';
import { PropertyType } from '../constants/property-type';
import { ShapeType } from '../constants/shape-type';
import { Property } from '../properties';
import { Shape } from './shape';

/**
 * Fill shape type.
 */
export class FillShape extends Shape {
  // ---------------------------------------------------------------------
  // Public Properties
  // ---------------------------------------------------------------------

  /**
   * Fill shape type: fl
   */
  public readonly type = ShapeType.FILL;

  public blendMode: BlendMode = BlendMode.NORMAL;

  public direction?: number;

  public color: Property = new Property(PropertyType.COLOR);

  public fillRule: FillRuleType = FillRuleType.EVEN_ODD;

  public opacity: Property = new Property(PropertyType.OPACITY);

  // ---------------------------------------------------------------------
  // Public Static Methods
  // ---------------------------------------------------------------------

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       FillShape instance
   */
  public static fromJSON(json: Record<string, any>): FillShape {
    const shape = new FillShape();

    // Base shape
    shape.classNames = json.cl;
    shape.id = json.ln;
    shape.isHidden = json.hd;
    shape.matchName = json.mn;
    shape.name = json.nm;

    // This shape
    shape.blendMode = json.bm;
    shape.color = Property.fromJSON(PropertyType.COLOR, json.c);
    shape.fillRule = json.r in FillRuleType ? json.r : FillRuleType.EVEN_ODD;
    shape.opacity = Property.fromJSON(PropertyType.OPACITY, json.o);

    return shape;
  }

  // ---------------------------------------------------------------------
  // Public Methods
  // ---------------------------------------------------------------------

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
      r: this.fillRule,
      o: this.opacity,
    };
  }
}
