import { PropertyType } from '../constants/PropertyType';
import { Layer } from '../layers';
import { Shape } from '../shapes';
import { KeyFrame } from '../timeline/KeyFrame';
import { useRegistry } from '../utils/useRegistry';

export class Property {
  public readonly type: PropertyType;

  public expression?: string;

  public isAnimated = false;

  public index = 0;

  public maxColors?: number;

  public values: Array<KeyFrame> = [];

  constructor(type: PropertyType, parent?: Layer | Shape) {
    this.type = type;

    useRegistry().set(this, parent);
  }

  public static fromJSON(type: PropertyType, json: Record<string, any>): Property {
    const shape = new Property(type);

    // This shape
    shape.expression = json?.x;
    shape.index = json.ix;
    shape.isAnimated = json.a === 1;

    if (shape.isAnimated === false) {
      shape.values = [new KeyFrame(0, json.k)];
    } else {
      shape.values = json.k.map((v: Record<string, any>) => KeyFrame.fromJSON(v));
    }

    if (type === PropertyType.COLOR && json.p) {
      shape.maxColors = json.p;
    }

    return shape;
  }

  public toJSON(): Record<string, any> {
    let value;

    if (this.isAnimated === false) {
      value = this.values.pop()?.value;
    } else {
      value = this.values;
    }

    return {
      x: this.expression,
      ix: this.index,
      a: this.isAnimated ? 1 : 0,
      k: value,
      p: this.maxColors,
    };
  }
}
