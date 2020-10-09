import fetch from 'cross-fetch';

import { Asset, createAssetFromJSON } from '../assets';
import { PropertyType } from '../constants';
import { createLayerFromJSON, Layer } from '../layers';
import { Property } from '../properties';
import { useRegistry } from '../utils/use-registry';
import { Meta } from './meta';

/**
 * Animation contains all the information about the Lottie animation.
 */
export class Animation {
  // ---------------------------------------------------------------------
  // Public Properties
  // ---------------------------------------------------------------------

  public assets: Asset[] = [];
  public frameRate = 30;
  public height = 0;
  public inPoint = 0;
  public is3D = false;
  public layers: Layer[] = [];
  public meta: Meta = new Meta();
  public name = '';
  public outPoint = 0;
  public version = ``;
  public width = 0;

  // ---------------------------------------------------------------------
  // Public Static Methods
  // ---------------------------------------------------------------------

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       Animation instance
   */
  public static fromJSON(json: Record<string, any>): Animation {
    if (Animation.isLottie(json) === false) {
      throw new Error(`The given object is not a valid Lottie JSON structure`);
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
   * Create a class instance from the URL to the Lottie JSON.
   *
   * @param url     URL string
   * @returns       Animation instance
   */
  public static async fromURL(url: string): Promise<Animation> {
    if (typeof url !== 'string') {
      throw new Error(`The url value must be a string`);
    }

    let json;

    try {
      // Try construct an absolute URL from the src URL
      const srcUrl: URL = new URL(url);

      // Fetch the JSON file from the URL
      const result = await fetch(srcUrl.toString());
      json = await result.json();
    } catch (err) {
      throw new Error(`An error occurred while trying to load the Lottie file from URL`);
    }

    // Parse the JSON and return animation
    return Animation.fromJSON(json);
  }

  /**
   * Returns whether the given object looks like a valid Lottie JSON structure.
   *
   * This method checks for the presense of the mandatory fields 'v', 'ip', 'op', 'layers', 'fr', 'w' and 'h' in the object.
   *
   * @param json    Object
   * @returns       Boolean true if it is a valid Lottie
   */
  public static isLottie(json: Record<string, any>): boolean {
    const mandatory = ['v', 'ip', 'op', 'layers', 'fr', 'w', 'h'];

    return mandatory.every(field => Object.prototype.hasOwnProperty.call(json, field));
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

  /**
   * Returns all the colors used in the animation.
   *
   * @returns Array of colors.
   */
  public getColors(): string[] {
    const colorProperties = [...useRegistry().keys()]
      .filter((p: Property) => p.type === PropertyType.COLOR)
      .map((cp: Property) => cp.values);

    const result: any = [];

    for (let p = 0, pMax = colorProperties.length; p < pMax; p++) {
      for (let v = 0, vMax = colorProperties[p].length; v < vMax; v++) {
        result.push(colorProperties[p][v].value);
      }
    }

    return result;
  }
}
