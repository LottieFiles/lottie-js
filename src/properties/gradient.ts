import { PropertyType } from '../constants';
import { KeyFrame } from '../timeline/key-frame';
import { Property } from './property';

export class GradientStop {
  public offset: number;
  public color: number[];

  constructor(offset = 0, color: number[] = []) {
    this.offset = offset;
    this.color = color;
  }

  get hasAlpha(): boolean {
    return this.color.length > 3;
  }

  get red(): number {
    return this.color[0];
  }

  get green(): number {
    return this.color[1];
  }

  get blue(): number {
    return this.color[2];
  }

  get alpha(): number | undefined {
    return this.color[3];
  }
}

class GradientColorsProperty extends Property {
  public colorCount = 0;

  private keyframeValue(index: number): number[] {
    if (index >= this.values.length) return [];
    return this.values[index].value as number[];
  }

  public keyframeHasAlpha(index: number): boolean {
    return this.keyframeValue(index).length == this.colorCount * 6;
  }

  public keframeStops(index: number): GradientStop[] {
    const values = this.keyframeValue(index);
    const stops: GradientStop[] = [];
    const hasAlpha = this.keyframeHasAlpha(index);
    for (let i = 0; i < this.colorCount; i++) {
      const color = values.slice(i, 3);
      if (hasAlpha) color.push(values[this.colorCount * 4 + i * 2]);
      stops.push(new GradientStop(values[i * 4], color));
    }
    return stops;
  }

  public setKeyframeStops(index: number, stops: GradientStop[]) {
    if (index >= this.values.length) return;
    if (stops.length > this.colorCount) this.colorCount = stops.length;
    this.values[index].value = this.stopsToArray(stops);
  }

  public addKeyframe(frame: number, stops: GradientStop[]) {
    const keyframe: KeyFrame = new KeyFrame(frame, this.stopsToArray(stops));
    if (stops.length > this.colorCount) this.colorCount = stops.length;
    this.values.push(keyframe);
    return keyframe;
  }

  private stopsToArray(stops: GradientStop[]): number[] {
    let hasAlpha = false;
    const result: number[] = [];
    for (const color of stops) {
      result.push(color.offset);
      result.push(color.red);
      result.push(color.green);
      result.push(color.blue);
      if (color.hasAlpha) hasAlpha = true;
    }

    if (hasAlpha) {
      for (const color of stops) {
        result.push(color.offset);
        result.push(color.alpha !== undefined ? color.alpha : 1);
      }
    }

    return result;
  }
}

export class Gradient {
  public gradientColors: GradientColorsProperty = new GradientColorsProperty(this, PropertyType.COLOR);

  public get colorCount(): number {
    return this.gradientColors.colorCount;
  }

  public set colorCount(count: number) {
    this.gradientColors.colorCount = count;
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
      p: this.colorCount,
      k: this.gradientColors,
    };
  }

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       Gradient instance
   */
  public fromJSON(json: Record<string, any>): Gradient {
    this.gradientColors.fromJSON(json.k);
    this.colorCount = json.p;
    return this;
  }
}
