import { InputPlugin } from "../plugin/InputPlugin";
import { InputType, InputValue } from "../../types";

/**
 * Registry for input plugins
 * Follows Open/Closed Principle and Single Responsibility
 */
export class InputRegistry {
  private plugins: Map<InputType, InputPlugin> = new Map();

  /**
   * Registers a new input plugin
   * @param plugin - The plugin to register
   * @throws Error if plugin type is already registered with higher priority
   */
  register(plugin: InputPlugin<InputValue>): void {
    const existing = this.plugins.get(plugin.type);

    if (existing) {
      const existingPriority = existing.priority ?? 0;
      const newPriority = plugin.priority ?? 0;

      if (newPriority <= existingPriority) {
        console.warn(
          `Plugin for type "${plugin.type}" already registered with higher or equal priority. ` +
            `Existing: ${existingPriority}, New: ${newPriority}. Skipping registration.`
        );
        return;
      }
    }

    this.plugins.set(plugin.type, plugin);
  }

  /**
   * Registers multiple plugins at once
   * @param plugins - Array of plugins to register
   */
  registerMany(plugins: InputPlugin<InputValue>[]): void {
    plugins.forEach((plugin) => this.register(plugin));
  }

  /**
   * Gets a plugin by type
   * @param type - The input type
   * @returns The plugin or undefined if not found
   */
  get(type: InputType): InputPlugin | undefined {
    return this.plugins.get(type);
  }

  /**
   * Checks if a type is registered
   * @param type - The input type to check
   * @returns True if registered
   */
  has(type: InputType): boolean {
    return this.plugins.has(type);
  }

  /**
   * Unregisters a plugin
   * @param type - The type to unregister
   */
  unregister(type: InputType): void {
    this.plugins.delete(type);
  }

  /**
   * Gets all registered types
   * @returns Array of registered input types
   */
  getRegisteredTypes(): InputType[] {
    return Array.from(this.plugins.keys());
  }

  /**
   * Clears all registered plugins
   */
  clear(): void {
    this.plugins.clear();
  }
}

/**
 * Singleton instance of the registry
 */
export const globalInputRegistry = new InputRegistry();
