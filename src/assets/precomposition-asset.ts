import { AssetType } from '../constants/asset-type';
import { createLayerFromJSON } from '../layers';
import { Layer } from '../layers';
import { Asset } from './asset';

/**
 * Precomposition asset type.
 */
export class PrecompositionAsset extends Asset {
  // ---------------------------------------------------------------------
  // Public Properties
  // ---------------------------------------------------------------------

  public readonly type = AssetType.PRECOMPOSITION;

  public layers: Layer[] = [];

  public id = '';

  public timeRemap: any;

  // ---------------------------------------------------------------------
  // Public Static Methods
  // ---------------------------------------------------------------------

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       PrecompositionAsset instance
   */
  public static fromJSON(json: Record<string, any>): PrecompositionAsset {
    const layer = new PrecompositionAsset();

    // This layer props
    layer.id = json.id;
    layer.timeRemap = json.tm;

    layer.layers = json.layers.map((jLayer: Record<string, any>) => createLayerFromJSON(jLayer)).filter(Boolean);

    return layer;
  }

  // ---------------------------------------------------------------------
  // Public Methods
  // ---------------------------------------------------------------------

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
      layers: this.layers,
      tm: this.timeRemap,
    };
  }
}
