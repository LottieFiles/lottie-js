import { AssetType } from '../constants/asset-type';
import { Asset } from './asset';
import { ImageAsset } from './image-asset';
import { PrecompositionAsset } from './precomposition-asset';

export function createAsset(type: AssetType): Asset {
  if (type === AssetType.PRECOMPOSITION) {
    return new PrecompositionAsset();
  } else if (type === AssetType.IMAGE) {
    return new ImageAsset();
  }

  throw new Error(`Invalid or unknown asset type ${type}`);
}

export function createAssetFromJSON(json: Record<string, any>): Asset {
  if ('layers' in json) {
    return PrecompositionAsset.fromJSON(json);
  } else {
    return ImageAsset.fromJSON(json);
  }
}

export { Asset, PrecompositionAsset, ImageAsset };
