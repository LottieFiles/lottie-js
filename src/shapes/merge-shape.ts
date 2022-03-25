import { ShapeType } from '../constants';
import { Shape } from './shape';

/**
 * Merge shape type.
 */
export class MergeShape extends Shape {
  /**
   * RoundedCorners shape type: rp
   */
  public readonly type = ShapeType.MERGE;

  public mergeMode = 1;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       GroupShape instance
   */
  public fromJSON(json: Record<string, any>): MergeShape {
    // Base shape
    super.fromJSON(json);

    // This shape
    this.mergeMode = json.mm;

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
    const json = super.toJSON();

    return Object.assign(json, {
      mm: this.mergeMode,
    });
  }
}
