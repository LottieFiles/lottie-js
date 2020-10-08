import { LayerType } from '../constants/LayerType';
import { GroupLayer } from './GroupLayer';
import { ImageLayer } from './ImageLayer';
import { Layer } from './Layer';
import { PrecompositionLayer } from './PrecompositionLayer';
import { ShapeLayer } from './ShapeLayer';
import { SolidLayer } from './SolidLayer';
import { TextLayer } from './TextLayer';

export function createLayer(type: LayerType): Layer {
  if (type === LayerType.PRECOMPOSITION) {
    return new PrecompositionLayer();
  } else if (type === LayerType.SHAPE) {
    return new ShapeLayer();
  } else if (type === LayerType.GROUP) {
    return new GroupLayer();
  } else if (type === LayerType.SOLID) {
    return new SolidLayer();
  } else if (type === LayerType.IMAGE) {
    return new ImageLayer();
  } else if (type === LayerType.TEXT) {
    return new TextLayer();
  }

  throw new Error(`Invalid or unknown layer type: ${type}`);
}

export function createLayerFromJSON(json: Record<string, any>): Layer {
  if (json.ty === LayerType.PRECOMPOSITION) {
    return PrecompositionLayer.fromJSON(json);
  } else if (json.ty === LayerType.SHAPE) {
    return ShapeLayer.fromJSON(json);
  } else if (json.ty === LayerType.GROUP) {
    return GroupLayer.fromJSON(json);
  } else if (json.ty === LayerType.SOLID) {
    return SolidLayer.fromJSON(json);
  } else if (json.ty === LayerType.IMAGE) {
    return ImageLayer.fromJSON(json);
  } else if (json.ty === LayerType.TEXT) {
    return TextLayer.fromJSON(json);
  }

  throw new Error(`Unable to create layer type from JSON: ${json.ty}`);
}

export { PrecompositionLayer, ShapeLayer, Layer };
