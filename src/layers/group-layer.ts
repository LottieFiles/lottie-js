import { LayerType } from '../constants';
import { Layer } from './layer';

/**
 * Group layer type.
 */
export class GroupLayer extends Layer {
  public readonly type = LayerType.GROUP;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       GroupLayer instance
   */
  public fromJSON(json: Record<string, any>): GroupLayer {
    super.fromJSON(json);

    return this;
  }
}
