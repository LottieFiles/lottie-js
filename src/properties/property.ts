import { PropertyType } from '../constants';
import { KeyFrame } from '../timeline';

/**
 * Represents animated properties of layers and shapes.
 */
export abstract class Property<T> {
  public readonly type!: PropertyType;

  public expression?: string;

  public index?: number;

  public keyFrames: Array<KeyFrame<T>> = [];

  /**
   * Parent instance.
   *
   * @protected
   */
  protected parent: any;

  /**
   * Constructor.
   *
   * @param type        Property type.
   */
  constructor(value?: T, index?: number);
  constructor(keyFrames?: Array<KeyFrame<T>>, index?: number);
  constructor(valueOrKeyFrames: T | Array<KeyFrame<T>>, index?: number) {
    if (valueOrKeyFrames !== undefined) {
      if (Array.isArray(valueOrKeyFrames) && valueOrKeyFrames.every(kf => kf instanceof KeyFrame)) {
        // Keyframe values:
        this.keyFrames = valueOrKeyFrames;
      } else {
        // Non animated value
        this.keyFrames = [new KeyFrame<T>(0, valueOrKeyFrames)];
      }
    }

    this.index = index;
  }

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       ShapeLayer instance
   */
  public fromJSON(json: Record<string, any>): Property<T> {
    // This property
    this.expression = 'x' in json ? json.x : undefined;
    this.index = 'ix' in json ? json.ix : undefined;

    if ('a' in json && json.a === 1) {
      this.keyFrames = json.k.map((v: Record<string, any>) => {
        const kf = new KeyFrame().fromJSON(v);

        kf.value = this.valueFromJSON(v.s);

        return kf;
      });
    } else {
      this.keyFrames = [new KeyFrame(0, this.valueFromJSON(json.k))];
    }

    return this;
  }

  protected valueFromJSON(value: any): any {
    return value;
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

    if (this.keyFrames.length > 1) {
      value = this.keyFrames.map(kf => kf.toJSON());
    } else {
      value = this.keyFrames[0].value;
    }

    return {
      x: this.expression,
      ix: this.index,
      a: this.keyFrames.length ? 1 : 0,
      k: value,
    };
  }
}
