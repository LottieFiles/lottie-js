import { LayerType } from '../constants';
import { Layer } from './layer';

/**
 * Solid layer type.
 */
export class SolidLayer extends Layer {
  public readonly type = LayerType.SOLID;

  public solidColor = '#000000';
  public solidHeight = 1;
  public solidWidth = 1;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       SolidLayer instance
   */
  public fromJSON(json: Record<string, any>): SolidLayer {
    super.fromJSON(json);

    // This layer props
    this.solidColor = json.sc;
    this.solidHeight = json.sh;
    this.solidWidth = json.sw;

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
      sc: this.solidColor,
      sh: this.solidHeight,
      sw: this.solidWidth,
    });
  }
}
