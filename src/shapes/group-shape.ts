import { BlendMode, ShapeType } from '../constants';
import { Transform } from '../properties';
import { EllipseShape } from './ellipse-shape';
import { FillShape } from './fill-shape';
import { GradientFillShape } from './gradient-fill-shape';
import { PathShape } from './path-shape';
import { RectangleShape } from './rectangle-shape';
import { Shape } from './shape';
import { StrokeShape } from './stroke-shape';
import { TrimShape } from './trim-shape';

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
    this.classNames = json.cl;
    this.id = json.ln;
    this.isHidden = json.hd;
    this.matchName = json.mn;
    this.name = json.nm;

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
          }
          this.transform.fromJSON(jShape);
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
    if (type === ShapeType.PATH) {
      return new PathShape(this);
    } else if (type === ShapeType.GROUP) {
      return new GroupShape(this);
    } else if (type === ShapeType.FILL) {
      return new FillShape(this);
    } else if (type === ShapeType.RECTANGLE) {
      return new RectangleShape(this);
    } else if (type === ShapeType.ELLIPSE) {
      return new EllipseShape(this);
    } else if (type === ShapeType.STROKE) {
      return new StrokeShape(this);
    } else if (type === ShapeType.GRADIENT_FILL) {
      return new GradientFillShape(this);
    } else if (type === ShapeType.TRIM) {
      return new TrimShape(this);
    }

    throw new Error(`Invalid or unknown shape type: ${type}`);
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
    const shapes = JSON.parse(JSON.stringify(this.shapes));
    shapes.push({
      ty: 'tr',
      nm: 'Transform',
      ...this.transform.toJSON(),
    });

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
      cix: this.contentPropertyIndex,
      it: shapes,
      ix: this.propertyIndex,
      np: this.numProperties,
    };
  }
}
