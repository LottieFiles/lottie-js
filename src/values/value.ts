/**
 * Represents a property value
 * Derived classes should serialize / deserialize from json
 */
export interface Value {
  toJSON(): any;
}
