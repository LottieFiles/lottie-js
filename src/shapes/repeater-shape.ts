import { PropertyType, RepeaterComposite, ShapeType } from '../constants';
import { Property } from '../properties';
import { Shape } from './shape';

/**
 * Repeater shape type.
 */
export class RepeaterShape extends Shape {
  /**
   * Repeater shape type: rp
   */
  public readonly type = ShapeType.REPEATER;

  public anchor: Property = new Property(this, PropertyType.ANCHOR);

  public startOpacity: Property = new Property(this, PropertyType.OPACITY);

  public endOpacity: Property = new Property(this, PropertyType.OPACITY);

  public position: Property = new Property(this, PropertyType.POSITION);

  public rotation: Property = new Property(this, PropertyType.ROTATION);

  public scale: Property = new Property(this, PropertyType.SCALE);

  public shapes: Shape[] = [];

  public skew: Property = new Property(this, PropertyType.SKEW);

  public skewAxis: Property = new Property(this, PropertyType.SKEW_AXIS);

  public copies: Property = new Property(this, PropertyType.NUMBER);

  public offset: Property = new Property(this, PropertyType.NUMBER);

  public composition: RepeaterComposite = RepeaterComposite.ABOVE;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       GroupShape instance
   */
  public fromJSON(json: Record<string, any>): RepeaterShape {
    // Base shape
    super.fromJSON(json);

    // This shape
    this.copies.fromJSON(json.c);
    this.composition = json.m;
    this.offset.fromJSON(json.o);

    this.anchor.fromJSON(json.tr.a);
    this.startOpacity.fromJSON(json.tr.so);
    this.endOpacity.fromJSON(json.tr.eo);
    this.position.fromJSON(json.tr.p);
    this.rotation.fromJSON(json.tr.r);
    this.scale.fromJSON(json.tr.s);

    if (json.tr.sk) {
      this.skew.fromJSON(json.tr.sk);
    }

    if (json.tr.sa) {
      this.skewAxis.fromJSON(json.tr.sa);
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
    const json = super.toJSON();

    return Object.assign(json, {
      m: this.composition,
      c: this.copies,
      o: this.offset,
      tr: {
        a: this.anchor,
        so: this.startOpacity,
        eo: this.endOpacity,
        p: this.position,
        r: this.rotation,
        s: this.scale,
        sk: this.skew,
        sa: this.skewAxis,
      },
    });
  }
}
