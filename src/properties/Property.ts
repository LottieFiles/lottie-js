import { PropertyType } from '../constants';
import { KeyFrame } from '../timeline';
import { useRegistry } from '../utils/use-registry';

/**
 * Represents animated properties of layers and shapes.
 */
export class Property {
  // ---------------------------------------------------------------------
  // Public Properties
  // ---------------------------------------------------------------------

  public readonly type: PropertyType;

  public expression?: string;

  public isAnimated = false;

  public index = 0;

  public maxColors?: number;

  public values: Array<KeyFrame> = [];

  // ---------------------------------------------------------------------
  // Public Static Methods
  // ---------------------------------------------------------------------

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       ShapeLayer instance
   */
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

  // ---------------------------------------------------------------------
  // Public Methods
  // ---------------------------------------------------------------------

  /**
   * Constructor.
   *
   * @param type      Property type.
   * @param parent    Parent instance the property belongs to.
   */
  constructor(type: PropertyType, parent?: any) {
    this.type = type;

    useRegistry().set(this, parent);
  }

  /**
   * Convert the class instance to Lottie JSON object.
   *
   * Called by Javascript when serializing object with JSON.stringify()
   *
   * @returns       JSON object
   */
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
