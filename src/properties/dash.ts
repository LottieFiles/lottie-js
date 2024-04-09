import { DashType, PropertyType } from '../constants';
import { Property } from './property';
export class Dash {
  public type: DashType = DashType.DASH;
  public name = '';
  public value: Property = new Property(this, PropertyType.NUMBER);

  /**
   * Parent instance.
   */
  public parent: any;

  /**
   * Constructor.
   *
   * @param parent   Parent instance.
   */
  constructor(parent: any) {
    this.parent = parent;
  }

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       Dash instance
   */
  public fromJSON(json: Record<string, any>): Dash {
    // Base shape
    this.type = json.n;
    this.name = json.nm;
    this.value.fromJSON(json.v);
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
      n: this.type,
      nm: this.name,
      v: this.value,
    };
  }
}

export class Dashes {
  public value: Dash[] = [];

  /**
   * Parent instance.
   */
  public parent: any;

  /**
   * Constructor.
   *
   * @param parent   Parent instance.
   */
  constructor(parent: any) {
    this.parent = parent;
  }

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    Array
   * @returns       Dashes instance
   */
  public fromJSON(json: Array<Record<string, any>>): Dashes {
    // Base shape
    this.value = (json || []).map((dash: Record<string, any>) => new Dash(this).fromJSON(dash));
    return this;
  }

  /**
   * Convert the class instance to Lottie JSON object.
   *
   * Called by Javascript when serializing object with JSON.stringify()
   *
   * @returns       JSON object
   */
  public toJSON(): Array<Record<string, any>> | undefined {
    return this.value.length ? this.value.map((dash: Dash) => dash.toJSON()) : undefined;
  }
}
