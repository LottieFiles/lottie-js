import { BlendMode, PropertyType, ShapeType } from '../constants';
import { TrimMode } from '../constants';
import { Property } from '../properties';
import { Shape } from './shape';

/**
 * Trim shape type.
 */
export class TrimShape extends Shape {
  /**
   * Shape type
   */
  public readonly type = ShapeType.TRIM;

  public blendMode: BlendMode = BlendMode.NORMAL;

  public trimEnd: Property = new Property(this, PropertyType.NUMBER);

  public trimOffset: Property = new Property(this, PropertyType.NUMBER);

  public trimStart: Property = new Property(this, PropertyType.NUMBER);

  public trimMultipleShapes: TrimMode = TrimMode.SIMULTANEOUSLY;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       TrimShape instance
   */
  public fromJSON(json: Record<string, any>): TrimShape {
    // Base shape
    this.classNames = json.cl;
    this.id = json.ln;
    this.isHidden = json.hd;
    this.matchName = json.mn;
    this.name = json.nm;

    // This shape
    this.blendMode = json.bm in BlendMode ? json.bm : BlendMode.NORMAL;
    this.trimEnd.fromJSON(json.e);
    this.trimOffset.fromJSON(json.o);
    this.trimStart.fromJSON(json.s);
    this.trimMultipleShapes = json.m in TrimMode ? json.m : TrimMode.INDIVIDUALLY;

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
      e: this.trimEnd,
      o: this.trimOffset,
      s: this.trimStart,
      m: this.trimMultipleShapes,
    };
  }
}
