import { MaskMode, PropertyType } from '../constants';
import { Property } from '../properties';

/**
 * Mask.
 */
export class Mask {
  public isInverted = false;
  public name = '';
  public opacity: Property = new Property(this, PropertyType.OPACITY);
  public points: Property = new Property(this, PropertyType.POINTS);
  public mode: MaskMode = MaskMode.Add;
  public expansion: Property = new Property(this, PropertyType.EXPANSION);

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       Mask instance
   */
  public fromJSON(json: Record<string, any>): Mask {
    this.isInverted = Boolean(json.inv);
    this.mode = json.mode;
    this.name = json.nm;
    this.points.fromJSON(json.pt);
    this.opacity.fromJSON(json.o);
    this.expansion.fromJSON(json.x);

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
      inv: this.isInverted,
      mode: this.mode,
      nm: this.name,
      o: this.opacity,
      pt: this.points,
      x: this.expansion,
    };
  }
}
