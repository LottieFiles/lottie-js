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
    const property = new Property(type);

    // This property
    property.expression = 'x' in json ? json.x : undefined;
    property.index = json.ix;
    property.isAnimated = json.a === 1;

    if (property.isAnimated === false) {
      property.values = [new KeyFrame(0, json.k)];
    } else {
      property.values = json.k.map((v: Record<string, any>) => KeyFrame.fromJSON(v));
    }

    if (type === PropertyType.COLOR) {
      if (json.p) {
        property.maxColors = json.p;
      }

      property.values.forEach((kf: KeyFrame) => {
        const colorParts = kf.value as [number, number, number, number];

        kf.value = [
          Math.round(colorParts[0] * 255),
          Math.round(colorParts[1] * 255),
          Math.round(colorParts[2] * 255),
          colorParts[3] || 1,
        ];
      });
    }

    return property;
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
