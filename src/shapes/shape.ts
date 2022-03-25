import { ShapeType } from '../constants';

/**
 * Shape base class.
 */
export abstract class Shape {
  /**
   * Shape type
   */
  public abstract readonly type: ShapeType;

  public classNames?: string;

  public matchName?: string;

  public name?: string;

  public id?: string;

  public itemIndex?: number;
  public shapeIndex?: number;

  public isHidden = false;

  /**
   * Parent instance.
   */
  public parent: any;

  /**
   * Constructor.
   *
   * @param parent   Parent instance.
   */
  constructor(parent: any) {
    this.parent = parent;
  }

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       EllipseShape instance
   */
  public fromJSON(json: Record<string, any>): Shape {
    // Base shape
    this.classNames = json.cl;
    this.id = json.ln;
    this.isHidden = json.hd;
    this.matchName = json.mn;
    this.name = json.nm;

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
    };
  }
}
