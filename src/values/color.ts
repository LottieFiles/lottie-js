import { Value } from './value';

export abstract class Color implements Value {
  protected abstract toRgbArray(): number[];
  protected abstract toRgbArrayWebsafe(): number[];
  public abstract websafeColors(): void;

  toJSON(): number[] {
    return this.toRgbArray();
  }

  toJSONWebsafe(): number[] {
    return this.toRgbArrayWebsafe();
  }

  static fromJSON(json: number[]): Color {
    if (json.length > 3) return ColorRgba.fromJSON(json);
    else if (json.length == 3) return ColorRgb.fromJSON(json);
    else return new ColorRgb(0, 0, 0);
  }
}

export class ColorRgb extends Color {
  public r: number;
  public g: number;
  public b: number;

  constructor(r: number, g: number, b: number) {
    super();
    this.r = r;
    this.g = g;
    this.b = b;
  }

  public websafeColors() {
    this.r = Math.round(this.r * 255);
    this.g = Math.round(this.g * 255);
    this.b = Math.round(this.b * 255);
  }

  protected toRgbArray(): number[] {
    return [this.r, this.g, this.b];
  }

  protected toRgbArrayWebsafe(): number[] {
    return [this.r * 255, this.g * 255, this.b * 255];
  }

  static fromJSON(json: number[]): ColorRgb {
    return new ColorRgb(json[0], json[1], json[2]);
  }
}

export class ColorRgba extends ColorRgb {
  public a: number;

  constructor(r: number, g: number, b: number, a = 1) {
    super(r, g, b);
    this.a = a;
  }

  public websafeColors() {
    this.r = Math.round(this.r * 255);
    this.g = Math.round(this.g * 255);
    this.b = Math.round(this.b * 255);
  }

  protected toRgbArray(): number[] {
    return [this.r, this.g, this.b, this.a];
  }

  protected toRgbArrayWebsafe(): number[] {
    return [this.r * 255, this.g * 255, this.b * 255, this.a];
  }

  static fromJSON(json: number[]): ColorRgba {
    return new ColorRgba(json[0], json[1], json[2], json[3]);
  }
}
