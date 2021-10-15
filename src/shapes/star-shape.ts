import { PropertyType, ShapeType, StarType } from '../constants';
import { Property } from '../properties';
import { Shape } from './shape';

/**
 * Star shape type.
 */
export class StarShape extends Shape {
  /**
   * Shape type
   */
  public readonly type = ShapeType.STAR;

  public position: Property = new Property(this, PropertyType.POSITION);

  public innerRadius: Property = new Property(this, PropertyType.NUMBER);

  public innerRoundness: Property = new Property(this, PropertyType.NUMBER);

  public outerRadius: Property = new Property(this, PropertyType.NUMBER);

  public outerRoundness: Property = new Property(this, PropertyType.NUMBER);

  public rotation: Property = new Property(this, PropertyType.ROTATION);

  public points: Property = new Property(this, PropertyType.NUMBER);

  public starType: StarType = StarType.STAR;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       StarShape instance
   */
  public fromJSON(json: Record<string, any>): StarShape {
    // Base shape
    this.classNames = json.cl;
    this.id = json.ln;
    this.isHidden = json.hd;
    this.matchName = json.mn;
    this.name = json.nm;

    // This shape
    this.position.fromJSON(json.p);
    this.innerRadius.fromJSON(json.ir);
    this.innerRoundness.fromJSON(json.is);
    this.outerRadius.fromJSON(json.or);
    this.outerRoundness.fromJSON(json.os);
    this.rotation.fromJSON(json.r);
    this.points.fromJSON(json.pt);
    this.starType = json.sy;

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
      ty: this.type,

      // Base shape
      cl: this.classNames,
      hd: this.isHidden,
      ln: this.id,
      mn: this.matchName,
      nm: this.name,

      // This shape
      p: this.position,
      ir: this.innerRadius,
      is: this.innerRoundness,
      or: this.outerRadius,
      os: this.outerRoundness,
      r: this.rotation,
      pt: this.points,
      sy: this.starType,
    };
  }
}
