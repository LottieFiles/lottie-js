import { ShapeType } from '../constants/ShapeType';

export abstract class Shape {
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
