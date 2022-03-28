import { LayerType, ShapeType } from '../constants';
import { Shape } from '../shapes';
import { createShapeFromType } from '../utils/shape';
import { Layer } from './layer';

/**
 * Shape layer type.
 */
export class ShapeLayer extends Layer {
  // Shape layer type = 4
  public readonly type = LayerType.SHAPE;

  public shapes: Shape[] = [];

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
   * Creates and returns a new shape instance from given JSON.
   *
   * @param json  JSON object.
   */
  public createShapeFromJSON(json: Record<string, any>): Shape {
    try {
      const shape = this.createShape(json.ty);

      return shape.fromJSON(json);
    } catch (e) {
      throw new Error(`Unable to create shape from JSON: ${json.ty}`);
    }
  }

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       ShapeLayer instance
   */
  public fromJSON(json: Record<string, any>): ShapeLayer {
    super.fromJSON(json);

    // This layer props
    this.shapes = json.shapes.map((jShape: Record<string, any>) => this.createShapeFromJSON(jShape)).filter(Boolean);

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
      shapes: this.shapes.map(shape => shape.toJSON()),
    });
  }
}
