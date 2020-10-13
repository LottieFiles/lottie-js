import { BlendMode, LayerType, PropertyType } from '../constants';
import { Property } from '../properties/property';
import { KeyFrame } from '../timeline/key-frame';
import { useRegistry } from '../utils/use-registry';

/**
 * Layer base class.
 */
export abstract class Layer {
  // ---------------------------------------------------------------------
  // Public Properties
  // ---------------------------------------------------------------------

  public abstract readonly type: LayerType;

  public autoOrient = false;
  public blendMode: BlendMode = BlendMode.NORMAL;
  public classNames: string[] = [];
  public effects: any; // Effect[] = [];
  public height = 0;
  public id = '';
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

  // ---------------------------------------------------------------------
  // Public Methods
  // ---------------------------------------------------------------------

  /**
   * Returns all the colors used in the layer.
   *
   * @returns Array of colors.
   */
  public get colors(): string[] {
    const colors: Set<string> = new Set();
    const registry = useRegistry();

    [...registry.keys()]
      // Filter this layer's color properties
      .filter((p: Property) => registry.get(p) === this && p.type === PropertyType.COLOR)
      .forEach((cp: Property) => {
        cp.values.forEach((v: KeyFrame) => {
          colors.add(JSON.stringify(v.value));
        });
      });

    return Array.from(colors).map(c => JSON.parse(c));
  }

  /**
   * Returns the total number of frames in the animation.
   *
   * @returns Number of frames.
   */
  public get totalFrames(): number {
    return this.outPoint - this.inPoint;
  }
}
