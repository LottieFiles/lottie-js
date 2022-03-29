import { BlendMode, ShapeType } from '../constants';
import { Transform } from '../properties';
import { createShapeFromType } from '../utils/shape';
import { Shape } from './shape';

/**
 * Group shape type.
 */
export class GroupShape extends Shape {
  /**
   * Group shape type: gr
   */
  public readonly type = ShapeType.GROUP;

  public blendMode: BlendMode = BlendMode.NORMAL;

  public contentPropertyIndex?: number;

  public isHidden = false;

  public numProperties = 0;

  public propertyIndex?: number;

  public transform: Transform = new Transform();

  public shapes: Shape[] = [];

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       GroupShape instance
   */
  public fromJSON(json: Record<string, any>): GroupShape {
    // Base shape
    super.fromJSON(json);

    // This shape
    this.blendMode = json.bm;
    this.contentPropertyIndex = json.cix;
    this.propertyIndex = json.ix;
    this.numProperties = json.np;

    this.shapes = json.it
      .map((jShape: Record<string, any>) => {
        try {
          if (jShape.ty !== 'tr') {
            const nShape = this.createShape(jShape.ty);
            return nShape.fromJSON(jShape);
          } else {
            this.transform.fromJSON(jShape);
          }
        } catch {
          // Swallow
        }

        return false;
      })
      .filter(Boolean);
    return this;
  }
  /**
   * Creates and returns a new shape instance of given type.
   *
   * @param type  Shape type string.
   */
  public createShape(type: ShapeType): Shape {
    return createShapeFromType(type, this);
  }

  /**
   * Adds a shape to the Layer
   */
  public addShape(shape: ShapeType | Shape): Shape {
    if (!(shape instanceof Shape)) shape = this.createShape(shape);

    this.shapes.push(shape);

    return shape;
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
    const shapes = JSON.parse(JSON.stringify(this.shapes));

    shapes.push({
      ty: 'tr',
      nm: 'Transform',
      ...this.transform.toJSON(),
    });

    return Object.assign(json, {
      // This shape
      bm: this.blendMode,
      cix: this.contentPropertyIndex,
      it: shapes,
      ix: this.propertyIndex,
      np: this.numProperties,
    });
  }
}
