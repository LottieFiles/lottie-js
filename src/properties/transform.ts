import { PropertyType } from '../constants';
import { KeyFrame } from '../timeline/key-frame';
import { Property } from './property';

export class Transform {
  public anchor: Property = new Property(this, PropertyType.ANCHOR, [new KeyFrame(0, [0, 0])]);

  public opacity: Property = new Property(this, PropertyType.OPACITY, [new KeyFrame(0, 100)]);

  public position: Property = new Property(this, PropertyType.POSITION, [new KeyFrame(0, [0, 0])]);

  public rotation?: Property = new Property(this, PropertyType.ROTATION, [new KeyFrame(0, 0)]);

  public scale: Property = new Property(this, PropertyType.SCALE, [new KeyFrame(0, [100, 100])]);

  public skew?: Property = new Property(this, PropertyType.SKEW);

  public skewAxis?: Property = new Property(this, PropertyType.SKEW_AXIS);

  public orientation?: Property;
  public rotationX?: Property;
  public rotationY?: Property;
  public rotationZ?: Property;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       Transform instance
   */
  public fromJSON(json: Record<string, any>): this {
    this.rotation = 'r' in json ? new Property(this, PropertyType.ROTATION).fromJSON(json.r) : undefined;
    'o' in json && this.opacity.fromJSON(json.o);
    'p' in json && this.position.fromJSON(json.p);
    'a' in json && this.anchor.fromJSON(json.a);
    's' in json && this.scale.fromJSON(json.s);
    this.skew = 'sk' in json ? new Property(this, PropertyType.SKEW).fromJSON(json.sk) : undefined;
    this.skewAxis = 'sa' in json ? new Property(this, PropertyType.SKEW_AXIS).fromJSON(json.sa) : undefined;

    if ('or' in json) {
      this.orientation = new Property(this, PropertyType.ORIENTATION).fromJSON(json.or);
    }

    if ('rx' in json) {
      this.rotationX = new Property(this, PropertyType.ROTATION_X).fromJSON(json.rx);
    }

    if ('ry' in json) {
      this.rotationY = new Property(this, PropertyType.ROTATION_Y).fromJSON(json.ry);
    }

    if ('rz' in json) {
      this.rotationZ = new Property(this, PropertyType.ROTATION_Z).fromJSON(json.rz);
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
    return {
      a: this.anchor,
      o: this.opacity,
      p: this.position,
      r: this.rotation,
      s: this.scale,
      sk: this.skew,
      sa: this.skewAxis,
      rx: this.rotationX,
      ry: this.rotationY,
      rz: this.rotationZ,
      or: this.orientation,
    };
  }
}
