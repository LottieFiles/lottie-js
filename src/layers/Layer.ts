import { BlendMode, PropertyType } from '../constants';
import { LayerType } from '../constants';
import { Property } from '../properties';

export abstract class Layer {
  public abstract readonly type: LayerType;

  public autoOrient = false;
  public blendMode: BlendMode = BlendMode.NORMAL;
  public classNames?: string;
  public effects: any; // Effect[] = [];
  public height = 0;
  public id?: string;
  public index?: number;
  public inPoint = 0;
  public is3D = false;
  public name = '';
  public outPoint = 0;
  public parent?: number;
  public startTime = 0;
  public timeStretch = 1;
  public width = 0;

  // Transforms
  public opacity: Property = new Property(PropertyType.OPACITY);
  public rotation: Property = new Property(PropertyType.ROTATION);
  public position: Property = new Property(PropertyType.POSITION);
  public anchor: Property = new Property(PropertyType.ANCHOR);
  public scale: Property = new Property(PropertyType.SCALE);
}
