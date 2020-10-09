import { ShapeType } from '../constants';

/**
 * Shape base class.
 */
export abstract class Shape {
  // ---------------------------------------------------------------------
  // Public Properties
  // ---------------------------------------------------------------------

  /**
   * Shape type
   */
  public abstract readonly type: ShapeType;

  public classNames?: string;

  public matchName?: string;

  public name?: string;

  public id?: string;

  public isHidden = false;
}
