import { MaskMode } from '../constants';

/**
 * Mask.
 */
export class Mask {
  // ---------------------------------------------------------------------
  // Public Properties
  // ---------------------------------------------------------------------

  public isInverted = false;
  public name = '';
  public opacity: any;
  public points: any;
  public mode: MaskMode = MaskMode.Add;

  // ---------------------------------------------------------------------
  // Public Static Methods
  // ---------------------------------------------------------------------

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       Mask instance
   */
  public static fromJSON(json: Record<string, any>): Mask {
    const mask = new Mask();

    mask.isInverted = json.inv;
    mask.mode = json.mode;
    mask.name = json.nm;
    mask.points = json.pt;
    mask.opacity = json.o;

    return mask;
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
      inv: this.isInverted,
      mode: this.mode,
      nm: this.name,
      o: this.opacity,
      pt: this.points,
    };
  }
}
