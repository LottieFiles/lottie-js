import { PropertyType } from '../constants';
import { KeyFrame } from '../timeline';
import { useRegistry } from '../utils/use-registry';

/**
 * Represents animated properties of layers and shapes.
 */
export class Property {
  public UID = 0;

  public readonly type: PropertyType;

  public expression?: string;

  public isAnimated = false;

  public index = 0;

  public maxColors?: number;

  public values: Array<KeyFrame> = [];

  /**
   * Parent instance.
   *
   * @protected
   */
  private _parent: any;

  public getParent(): any {
    return this._parent;
  }

  /**
   * Constructor.
   *
   * @param parent      Parent instance the property belongs to.
   * @param type        Property type.
   */
  constructor(parent: any, type: PropertyType, values: Array<KeyFrame> = []) {
    this._parent = parent;

    this.type = type;
    this.values = values;
    this.isAnimated = values.length > 1;

    useRegistry().set(this, parent);
  }

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       ShapeLayer instance
   */
  public fromJSON(json: Record<string, any>): Property {
    // This property
    this.expression = 'x' in json ? json.x : undefined;
    this.index = json.ix;
    this.isAnimated = json.a === 1;

    this.values = this.isAnimated
      ? json.k.map((v: Record<string, any>) => new KeyFrame().fromJSON(v))
      : [new KeyFrame().fromJSON({ t: 0, s: json.k })];

    if (this.type === PropertyType.COLOR) {
      this.maxColors = 'p' in json ? json.p : undefined;

      // this.values.forEach((kf: KeyFrame) => {
      //   const colorParts = kf.value as [number, number, number, number];

      //   kf.value = [colorParts[0], colorParts[1], colorParts[2], colorParts[3] || 1];
      // });
    }

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
    let value;

    if (this.isAnimated === false) {
      value = this.values.length ? this.values[0].value : 0;
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
