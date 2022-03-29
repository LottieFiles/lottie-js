import { ShapeType } from '../constants';
import { Shape } from '../shapes';
import { createShapeFromType } from '../utils/shape';

export class Character {
  public character = '';
  public fontSize = 0;
  public fontStyle = '';
  public fontWeight = 0;
  public data: Shape[] = [];
  public fontFamily = '';

  /**
   * Creates and returns a new shape instance of given type.
   *
   * @param type  Shape type string.
   */
  public createShape(type: ShapeType): Shape {
    return createShapeFromType(type, this);
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
   * @returns       Mask instance
   */
  public fromJSON(json: Record<string, any>): Character {
    this.character = json.ch;
    this.fontSize = json.size;
    this.fontStyle = json.style;
    this.fontWeight = json.w;
    this.fontFamily = json.fFamily;
    this.data = json.data.shapes.map((shapeJSON: Record<string, any>) => this.createShapeFromJSON(shapeJSON));

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
    const shapes = this.data.map(shape => shape.toJSON());
    return {
      ch: this.character,
      size: this.fontSize,
      style: this.fontStyle,
      w: this.fontWeight,
      data: { shapes },
      fFamily: this.fontFamily,
    };
  }
}
