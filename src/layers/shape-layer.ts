import { LayerType, ShapeType } from '../constants';
import { Shape } from '../shapes';
import { EllipseShape } from '../shapes/ellipse-shape';
import { FillShape } from '../shapes/fill-shape';
import { GradientFillShape } from '../shapes/gradient-fill-shape';
import { GroupShape } from '../shapes/group-shape';
import { MergeShape } from '../shapes/merge-shape';
import { PathShape } from '../shapes/path-shape';
import { RectangleShape } from '../shapes/rectangle-shape';
import { StrokeShape } from '../shapes/stroke-shape';
import { TrimShape } from '../shapes/trim-shape';
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
    } else if (type === ShapeType.MERGE) {
      return new MergeShape(this);
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
    // Base layer props
    this.autoOrient = json.ao === 1;
    this.blendMode = json.bm;
    this.effects = json.ef;
    this.height = json.h;
    this.id = json.ln;
    this.index = json.ind;
    this.inPoint = json.ip;
    this.is3D = json.ddd;
    this.name = json.nm;
    this.outPoint = json.op;
    this.parent = json.parent;
    this.startTime = json.st;
    this.timeStretch = json.sr;
    this.width = json.w;

    // Split classnames into array
    this.classNames = 'cl' in json ? json.cl.split(' ') : [];

    // Transforms
    this.transform.fromJSON(json.ks);

    if ('tt' in json) {
      this.matteMode = json.tt;
    }

    if ('td' in json) {
      this.matteTarget = json.td;
    }

    if ('hd' in json) {
      this.isHidden = json.hd;
    }

    if ('mn' in json) {
      this.matchName = json.mn;
    }

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
    return {
      ao: this.autoOrient ? 1 : 0,
      bm: this.blendMode,
      cl: this.classNames.length ? this.classNames.join(' ') : undefined,
      ddd: this.is3D ? 1 : 0,
      ef: this.effects,
      h: this.height,
      ind: this.index,
      ip: this.inPoint,
      ks: {
        ...this.transform.toJSON(),
      },
      shapes: this.shapes.map(shape => shape.toJSON()),
      ln: this.id,
      nm: this.name,
      mn: this.matchName,
      op: this.outPoint,
      parent: this.parent?.index,
      sr: this.timeStretch,
      st: this.startTime,
      ty: this.type,
      w: this.width,
      tt: this.matteMode,
      td: this.matteTarget,
      hd: this.isHidden !== undefined ? Number(this.isHidden) : undefined,
    };
  }
}
