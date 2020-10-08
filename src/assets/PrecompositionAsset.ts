import { AssetType } from '../constants/AssetType';
import { createLayerFromJSON } from '../layers';
import { Layer } from '../layers';
import { Asset } from './Asset';

export class PrecompositionAsset extends Asset {
  public readonly type = AssetType.PRECOMPOSITION;

  public layers: Layer[] = [];

  public id = '';

  public timeRemap: any;

  public static fromJSON(json: Record<string, any>): PrecompositionAsset {
    const layer = new PrecompositionAsset();

    // This layer props
    layer.id = json.id;
    layer.timeRemap = json.tm;

    layer.layers = json.layers.map((jLayer: Record<string, any>) => createLayerFromJSON(jLayer)).filter(Boolean);

    return layer;
  }

  public toJSON(): Record<string, any> {
    return {
      id: this.id,
      layers: this.layers,
      tm: this.timeRemap,
    };
  }
}
