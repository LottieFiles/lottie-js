import { BlendMode, PropertyType, ShapeType } from '../constants';
import { Property } from '../properties';
import { Shape } from './shape';

/**
 * Trim shape type.
 */
export class TrimShape extends Shape {
  // ---------------------------------------------------------------------
  // Public Properties
  // ---------------------------------------------------------------------

  /**
   * Shape type
   */
  public readonly type = ShapeType.TRIM;

  public blendMode: BlendMode = BlendMode.NORMAL;

  public trimEnd: Property = new Property(PropertyType.NUMBER);

  public trimOffset: Property = new Property(PropertyType.NUMBER);

  public trimStart: Property = new Property(PropertyType.NUMBER);

  // ---------------------------------------------------------------------
  // Public Static Methods
  // ---------------------------------------------------------------------

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       TrimShape instance
   */
  public static fromJSON(json: Record<string, any>): TrimShape {
    const shape = new TrimShape();

    // Base shape
    shape.classNames = json.cl;
    shape.id = json.ln;
    shape.isHidden = json.hd;
    shape.matchName = json.mn;
    shape.name = json.nm;

    // This shape
    shape.blendMode = json.bm in BlendMode ? json.bm : BlendMode.NORMAL;
    shape.trimEnd = Property.fromJSON(PropertyType.NUMBER, json.e);
    shape.trimOffset = Property.fromJSON(PropertyType.NUMBER, json.o);
    shape.trimStart = Property.fromJSON(PropertyType.NUMBER, json.s);

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
      e: this.trimEnd,
      o: this.trimOffset,
      s: this.trimStart,
    };
  }
}
