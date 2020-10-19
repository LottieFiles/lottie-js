import { PropertyType } from '../constants';
import { Color } from '../values/color';
import { Property } from './property';

export class ColorProperty extends Property<Color> {
  public readonly type: PropertyType = PropertyType.COLOR;

  public maxColors?: number;
}
