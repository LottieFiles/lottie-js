/**
 * Asset base class.
 */
export abstract class Asset {
  public abstract fromJSON(json: Record<string, any>): Asset;
  public abstract toJSON(): Record<string, any>;

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
}
