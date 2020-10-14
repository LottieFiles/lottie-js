import { MaskMode } from '../constants';

/**
 * Mask.
 */
export class Mask {
  public isInverted = false;
  public name = '';
  public opacity: any;
  public points: any;
  public mode: MaskMode = MaskMode.Add;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       Mask instance
   */
  public fromJSON(json: Record<string, any>): Mask {
    this.isInverted = json.inv;
    this.mode = json.mode;
    this.name = json.nm;
    this.points = json.pt;
    this.opacity = json.o;

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
    };
  }
}
