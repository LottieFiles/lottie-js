import { PropertyType } from '.';
import { Asset, createAssetFromJSON } from './assets';
import { createLayerFromJSON, Layer } from './layers';
import { Meta } from './Meta';
import { Property } from './properties';
import { useRegistry } from './utils/useRegistry';

export class Animation {
  public assets: Asset[] = [];
  public frameRate = 30;
  public height = 0;
  public inPoint = 0;
  public is3D = false;
  public layers: Layer[] = [];
  public meta: Meta = new Meta();
  public name = '';
  public outPoint = 0;
  public version = '';
  public width = 0;

  public static fromJSON(json: Record<string, any>): Animation {
    if (Animation.isLottie(json) === false) {
      throw new Error(`The given object is not a valid Lottie JSON structure.`);
    }

    const animation = new Animation();

    animation.frameRate = json.fr;
    animation.height = json.h;
    animation.inPoint = json.ip;
    animation.is3D = json.ddd;
    animation.name = json.nm;
    animation.outPoint = json.op;
    animation.version = json.v;
    animation.width = json.w;

    animation.assets = json.assets.map((jAsset: Record<string, any>) => createAssetFromJSON(jAsset)).filter(Boolean);

    animation.layers = json.layers.map((jLayer: Record<string, any>) => createLayerFromJSON(jLayer)).filter(Boolean);

    if ('meta' in json) {
      animation.meta = Meta.fromJSON(json.meta);
    }

    return animation;
  }

  /**
   * Returns whether the given object looks like a valid Lottie JSON structure.
   *
   * This method checks for the presense of the mandatory fields 'v', 'ip', 'op', 'layers', 'fr', 'w' and 'h' in the object.
   *
   * @param json    Object
   * @returns Boolean true if it is a valid Lottie
   */
  public static isLottie(json: Record<string, any>): boolean {
    const mandatory = ['v', 'ip', 'op', 'layers', 'fr', 'w', 'h'];

    return mandatory.every(field => Object.prototype.hasOwnProperty.call(json, field));
  }

  public toJSON(): Record<string, any> {
    return {
      assets: this.assets,
      ddd: this.is3D ? 1 : 0,
      fr: this.frameRate,
      h: this.height,
      ip: this.inPoint,
      layers: this.layers,
      meta: this.meta,
      nm: this.name,
      op: this.outPoint,
      v: this.version || '5.6.0',
      w: this.width,
    };
  }

  public getColors(): string[] {
    const colorProps = [...useRegistry().keys()]
      .filter((p: Property) => p.type === PropertyType.COLOR)
      .map((cp: Property) => cp.values);

    const result: any = [];

    for (let p = 0, pMax = colorProps.length; p < pMax; p++) {
      for (let v = 0, vMax = colorProps[p].length; v < vMax; v++) {
        result.push(colorProps[p][v].value);
      }
    }

    return result;
  }
}
