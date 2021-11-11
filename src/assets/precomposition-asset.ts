import { AssetType } from '../constants/asset-type';
import { Layer } from '../layers';
import { Asset } from './asset';

/**
 * Precomposition asset type.
 */
export class PrecompositionAsset extends Asset {
  public readonly type = AssetType.PRECOMPOSITION;

  public layers: Layer[] = [];

  public id = '';

  public timeRemap: any;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       PrecompositionAsset instance
   */
  public fromJSON(json: Record<string, any>): PrecompositionAsset {
    // This asset props
    this.id = json.id;
    this.timeRemap = json.tm;

    this.layers = this.parent.createLayersFromJSONArray(json.layers);

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
      id: this.id,
      layers: this.layers.map(layer => layer.toJSON()),
      tm: this.timeRemap,
    };
  }
}
