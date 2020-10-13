import fetch from 'cross-fetch';

import { Asset, createAssetFromJSON } from '../assets';
import { LayerType, PropertyType } from '../constants';
import { createLayerFromJSON, Layer } from '../layers';
import { Property } from '../properties';
import { KeyFrame } from '../timeline';
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
   * Returns all the colors used in the animation.
   *
   * @returns Array of colors.
   */
  public get colors(): string[] {
    const colors: Set<string> = new Set();

    [...useRegistry().keys()]
      // Filter color properties
      .filter((p: Property) => p.type === PropertyType.COLOR)
      .forEach((cp: Property) => {
        cp.values.forEach((v: KeyFrame) => {
          colors.add(JSON.stringify(v.value));
        });
      });

    return Array.from(colors).map(c => JSON.parse(c));
  }

  /**
   * Returns the running time of the animation in seconds.
   *
   * @returns Number of seconds.
   */
  public get duration(): number {
    return this.totalFrames / this.frameRate;
  }

  /**
   * Returns the size of the Lottie JSON in bytes.
   *
   * @returns Number of bytes.
   */
  public get fileSize(): number {
    return new TextEncoder().encode(JSON.stringify(this)).length;
  }

  /**
   * Returns the total number of frames in the animation.
   *
   * @returns Number of frames.
   */
  public get totalFrames(): number {
    return this.outPoint - this.inPoint;
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
   * Returns the layer with the given ID.
   *
   * @param id    Layer ID string.
   * @returns     Layer instance.
   */
  public getLayerById(id: string): Layer | undefined {
    // Validate argument type
    if (typeof id !== 'string') {
      throw new Error(`ID value must be a string`);
    }

    return this.layers.find((layer: Layer) => layer.id === id);
  }

  /**
   * Returns the layers with the given class.
   *
   * @param className    Layer class name string.
   * @returns            Array of layer instances.
   */
  public getLayersByClassName(className: string): Layer[] {
    // Validate argument type
    if (typeof className !== 'string') {
      throw new Error(`Class name value must be a string`);
    }

    return this.layers.filter((layer: Layer) => layer.classNames.includes(className));
  }

  /**
   * Returns the layers of the given type.
   *
   * @param type    LayerType value.
   * @returns       Layer instance.
   */
  public getLayersByType(type: LayerType): Layer[] {
    // Validate argument type
    if (type in LayerType === false) {
      throw new Error(`Type value must be a valid LayerType value`);
    }

    return this.layers.filter((layer: Layer) => layer.type === type);
  }
}
