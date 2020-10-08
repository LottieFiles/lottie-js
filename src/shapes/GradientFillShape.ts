import { BlendMode } from '../constants/BlendMode';
import { GradientFillType } from '../constants/GradientFillType';
import { PropertyType } from '../constants/PropertyType';
import { ShapeType } from '../constants/ShapeType';
import { Property } from '../properties/Property';
import { Shape } from './Shape';

export class GradientFillShape extends Shape {
  /**
   * Gradient shape type: fl
   */
  public readonly type = ShapeType.GRADIENT_FILL;

  public blendMode: BlendMode = BlendMode.NORMAL;

  public endPoint: Property = new Property(PropertyType.POSITION);

  public gradientColors: Property = new Property(PropertyType.COLOR);

  public gradientType: GradientFillType = GradientFillType.LINEAR;

  public highlightAngle: Property = new Property(PropertyType.NUMBER);

  public highlightLength: Property = new Property(PropertyType.NUMBER);

  public opacity: Property = new Property(PropertyType.OPACITY);

  public startPoint: Property = new Property(PropertyType.POSITION);

  public static fromJSON(json: Record<string, any>): GradientFillShape {
    const shape = new GradientFillShape();

    // Base shape
    shape.classNames = json.cl;
    shape.id = json.ln;
    shape.isHidden = json.hd;
    shape.matchName = json.mn;
    shape.name = json.nm;

    // This shape
    shape.blendMode = json.bm;
    shape.endPoint = Property.fromJSON(PropertyType.POSITION, json.e);
    shape.gradientColors = Property.fromJSON(PropertyType.COLOR, json.g);
    shape.gradientType = json.t;
    shape.opacity = Property.fromJSON(PropertyType.OPACITY, json.o);
    shape.startPoint = Property.fromJSON(PropertyType.POSITION, json.s);

    if (shape.gradientType === GradientFillType.LINEAR) {
      shape.highlightAngle = Property.fromJSON(PropertyType.NUMBER, json.a);
      shape.highlightLength = Property.fromJSON(PropertyType.NUMBER, json.h);
    }

    return shape;
  }

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
      bm: this.blendMode,
      e: this.endPoint,
      g: this.gradientColors,
      t: this.gradientType,
      a: this.highlightAngle,
      h: this.highlightLength,
      o: this.opacity,
      s: this.startPoint,
    };
  }
}
