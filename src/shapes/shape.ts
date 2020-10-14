import { ShapeType } from '../constants';

/**
 * Shape base class.
 */
export abstract class Shape {
  /**
   * Shape type
   */
  public abstract readonly type: ShapeType;

  public abstract fromJSON(json: Record<string, any>): Shape;
  public abstract toJSON(): Record<string, any>;

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
}
