import { MaskMode } from '../constants/MaskMode';

export class Mask {
  public isInverted = false;
  public name = '';
  public opacity: any;
  public points: any;
  public mode: MaskMode = MaskMode.Add;

  public static fromJSON(json: Record<string, any>): Mask {
    const mask = new Mask();

    mask.isInverted = json.inv;
    mask.mode = json.mode;
    mask.name = json.nm;
    mask.points = json.pt;
    mask.opacity = json.o;

    return mask;
  }

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
