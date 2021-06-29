/**
 * Marker.
 */
export class Marker {
  public comment = '';
  public duration = 0;
  public time = 0;

  /**
   * Convert the Lottie JSON object to class instance.
   *
   * @param json    JSON object
   * @returns       Marker instance
   */
  public fromJSON(json: Record<string, any>): Marker {
    this.comment = json.cm;
    this.duration = json.dr;
    this.time = json.tm;

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
      cm: this.comment,
      dr: this.duration,
      tm: this.time,
    };
  }
}
