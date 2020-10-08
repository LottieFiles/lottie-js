import { BlendMode } from '../constants/BlendMode';
import { FillRuleType } from '../constants/FillRuleType';
import { PropertyType } from '../constants/PropertyType';
import { ShapeType } from '../constants/ShapeType';
import { Property } from '../properties/Property';
import { Shape } from './Shape';

export class FillShape extends Shape {
  /**
   * Fill shape type: fl
   */
  public readonly type = ShapeType.FILL;

  public blendMode: BlendMode = BlendMode.NORMAL;

  public direction?: number;

  public color: Property = new Property(PropertyType.COLOR);

  public fillRule: FillRuleType = FillRuleType.EVEN_ODD;

  public opacity: Property = new Property(PropertyType.OPACITY);

  public static fromJSON(json: Record<string, any>): FillShape {
    const shape = new FillShape();

    // Base shape
    shape.classNames = json.cl;
    shape.id = json.ln;
    shape.isHidden = json.hd;
    shape.matchName = json.mn;
    shape.name = json.nm;

    // This shape
    shape.blendMode = json.bm;
    shape.color = Property.fromJSON(PropertyType.COLOR, json.c);
    shape.fillRule = json.r in FillRuleType ? json.r : FillRuleType.EVEN_ODD;
    shape.opacity = Property.fromJSON(PropertyType.OPACITY, json.o);

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
      c: this.color,
      r: this.fillRule,
      o: this.opacity,
    };
  }
}
