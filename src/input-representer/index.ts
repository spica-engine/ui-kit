/**
 * Main entry point for the Input Representer system
 * Exports all public APIs following SOLID principles
 */

// Imports for auto-registration (must be at top)
import { globalInputRegistry as registry } from "./core/registry/InputRegistry";
import { getDefaultPlugins as getDefaults } from "./plugins";

// Core components
export { InputRepresenter } from "./components/InputRepresenter";
export { InputContainer } from "./components/InputContainer";

// Hooks
export { useInputRepresenter } from "./hooks/useInputRepresenter";
export type { UseInputRepresenterProps } from "./hooks/useInputRepresenter";

// Types
export * from "./types";
export type { BuiltInInputType, BuiltInInputConfig, CustomInputConfig } from "./types";

// Core abstractions (for extending the system)
export * from "./core/abstractions";

// Plugin system
export type { InputPlugin } from "./core/plugin/InputPlugin";
export { BaseInputPlugin } from "./core/plugin/InputPlugin";
export { InputRegistry, globalInputRegistry } from "./core/registry/InputRegistry";
export { InputFactory } from "./core/factories/InputFactory";

// Base classes for extending
export { BaseRenderer } from "./plugins/base/BaseRenderer";

// Default plugins
export * from "./plugins";
export { getDefaultPlugins } from "./plugins";

// Services
export { ValidationService } from "./core/services";

// Utilities
export { ConditionalRenderer } from "./utils/ConditionalRenderer";
export { ErrorPresenter } from "./utils/ErrorPresenter";
export { ValueManager } from "./utils/ValueManager";

/**
 * Initialize the global registry with default plugins
 */
const defaultPlugins = getDefaults();
registry.registerMany(defaultPlugins);
