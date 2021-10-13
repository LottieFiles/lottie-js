import { Value } from './value';

export abstract class Color implements Value {
  protected abstract toRgbArray(): number[];

  toJSON(): number[] {
    return this.toRgbArray();
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

  protected toRgbArray(): number[] {
    return [this.r, this.g, this.b];
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

  protected toRgbArray(): number[] {
    return [this.r, this.g, this.b, this.a];
  }

  static fromJSON(json: number[]): ColorRgba {
    return new ColorRgba(json[0], json[1], json[2], json[3]);
  }
}
