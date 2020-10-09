import { Property } from '../properties';

/**
 * Global store to keep track of properties and values
 */
const registry: Map<Property, any> = new Map();

/**
 * Returns the instance of registry.
 */
export function useRegistry(): Map<Property, any> {
  return registry;
}
