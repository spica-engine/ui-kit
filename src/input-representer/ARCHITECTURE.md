# Input Representer Architecture

## Overview

This document describes the architecture of the refactored Input Representer system, detailing how SOLID principles and design patterns have been applied.

## Design Principles

### 1. Single Responsibility Principle (SRP)

Each class has a single, well-defined responsibility:

- **InputRenderer**: Only renders UI components
- **InputValidator**: Only validates input values
- **InputTransformer**: Only transforms data between formats
- **ConditionalRenderer**: Only evaluates rendering conditions
- **ErrorPresenter**: Only displays error messages
- **ValueManager**: Only manages value access and manipulation
- **InputFactory**: Only creates input instances
- **InputRegistry**: Only manages plugin registration

### 2. Open/Closed Principle (OCP)

The system is open for extension but closed for modification:

- New input types can be added via **plugins** without modifying core code
- Plugins can override default implementations using **priority system**
- Custom validators, transformers, and renderers can be injected

**Example:**

```typescript
// Adding a new input type doesn't require modifying core code
class CustomInputPlugin extends BaseInputPlugin {
  readonly type = "custom";
  readonly renderer = new CustomInputRenderer();
}

globalInputRegistry.register(new CustomInputPlugin());
```

### 3. Liskov Substitution Principle (LSP)

Derived classes can substitute their base classes:

- All input renderers implement `IInputRenderer`
- All validators implement `IInputValidator`
- All plugins implement `InputPlugin`
- Any implementation can be swapped without breaking the system

### 4. Interface Segregation Principle (ISP)

Clients aren't forced to depend on interfaces they don't use:

- Separate interfaces for rendering, validation, transformation
- Plugins only implement what they need (validator and transformer are optional)
- Props types are specific to each input type

**Before (Violation):**

```typescript
interface InputHandler {
  render(): ReactNode;
  validate(): boolean;
  transform(): any;
  shouldRender(): boolean;
  displayError(): ReactNode;
}
```

**After (ISP Applied):**

```typescript
interface IInputRenderer {
  render(): ReactNode;
}

interface IInputValidator {
  validate(): boolean;
}

interface IInputTransformer {
  transform(): any;
}
```

### 5. Dependency Inversion Principle (DIP)

High-level modules depend on abstractions, not concretions:

- `InputFactory` depends on `IInputRenderer` interface, not concrete renderers
- `ValidationService` depends on `IInputValidator` interface
- Dependencies can be injected (registry, services)

**Example:**

```typescript
class InputFactory {
  constructor(private registry: InputRegistry) {} // Inject dependency

  create(config: InputConfig) {
    const plugin = this.registry.get(config.type); // Depend on abstraction
    return plugin.renderer.render(props); // Use interface method
  }
}
```

## Architecture Layers

```
┌─────────────────────────────────────────────┐
│          Presentation Layer                 │
│  (Components: InputRepresenter, Container)  │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│         Application Layer                   │
│   (Factories, Services, Hooks)              │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│           Domain Layer                      │
│    (Abstractions, Interfaces, Types)        │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│      Infrastructure Layer                   │
│  (Plugins, Concrete Implementations)        │
└─────────────────────────────────────────────┘
```

### Layer Responsibilities

#### 1. Presentation Layer

- React components for rendering
- No business logic
- Delegates to application layer

#### 2. Application Layer

- Orchestrates use cases
- Coordinates between domain and infrastructure
- Contains factories and services

#### 3. Domain Layer

- Core business rules
- Abstractions and interfaces
- Type definitions
- No framework dependencies

#### 4. Infrastructure Layer

- Concrete implementations
- Plugin system
- External dependencies (UI components)

## Key Design Patterns

### 1. Plugin Pattern

Allows dynamic registration of input types:

```typescript
interface InputPlugin {
  type: InputType;
  renderer: IInputRenderer;
  validator?: IInputValidator;
  transformer?: IInputTransformer;
  priority?: number;
}
```

**Benefits:**

- Easy to add new input types
- No need to modify core code
- Plugins can be loaded dynamically

### 2. Factory Pattern

Creates input instances based on configuration:

```typescript
class InputFactory {
  create(config: InputConfig, ...): ReactNode {
    const plugin = this.registry.get(config.type);
    return plugin.renderer.render(props);
  }
}
```

**Benefits:**

- Centralized creation logic
- Abstraction of construction details
- Easy to extend

### 3. Registry Pattern

Manages plugin registration and lookup:

```typescript
class InputRegistry {
  register(plugin: InputPlugin): void;
  get(type: InputType): InputPlugin;
}
```

**Benefits:**

- Centralized plugin management
- Priority-based plugin selection
- Runtime plugin registration

### 4. Strategy Pattern

Different rendering strategies for different input types:

```typescript
interface IInputRenderer {
  render(props: BaseInputProps): ReactNode;
}

class StringInputRenderer implements IInputRenderer { ... }
class NumberInputRenderer implements IInputRenderer { ... }
```

**Benefits:**

- Interchangeable algorithms
- Runtime strategy selection
- Easy to add new strategies

### 5. Template Method Pattern

Base renderer provides common logic:

```typescript
abstract class BaseRenderer implements IInputRenderer {
  transformConfigToProps(config, value, onChange) {
    const baseProps = {
      /* common props */
    };
    return this.extendProps(baseProps, config);
  }

  protected abstract extendProps(baseProps, config): Props;
}
```

**Benefits:**

- Code reuse
- Consistent behavior
- Customization points

### 6. Adapter Pattern

Legacy adapter for backward compatibility:

```typescript
function convertLegacyProperties(legacy: TypeProperties): InputProperties {
  // Convert old format to new format
}
```

**Benefits:**

- Backward compatibility
- Gradual migration
- Interface compatibility

## Data Flow

```
User Input
    ↓
InputContainer
    ↓
InputFactory.create()
    ↓
InputRegistry.get(type)
    ↓
Plugin.renderer.render()
    ↓
Actual Input Component
    ↓
onChange Handler
    ↓
ValueManager.setValue()
    ↓
Parent onChange
```

## Extensibility Points

### 1. Custom Input Types

```typescript
// Create renderer
class CustomRenderer extends BaseRenderer { ... }

// Create plugin
class CustomPlugin extends BaseInputPlugin {
  readonly type = "custom";
  readonly renderer = new CustomRenderer();
}

// Register
globalInputRegistry.register(new CustomPlugin());
```

### 2. Custom Validators

```typescript
class CustomValidator implements IInputValidator {
  async validate(value, rules) { ... }
}

// Register with plugin
class CustomPlugin extends BaseInputPlugin {
  readonly validator = new CustomValidator();
}
```

### 3. Custom Transformers

```typescript
class CustomTransformer implements IInputTransformer {
  transform(value) { ... }
  reverseTransform(value) { ... }
}

// Use in plugin
class CustomPlugin extends BaseInputPlugin {
  readonly transformer = new CustomTransformer();
}
```

### 4. Custom Services

```typescript
const customValidationService = new ValidationService();
customValidationService.registerValidator("email", emailValidator);
```

## Benefits of This Architecture

### Maintainability

- Clear separation of concerns
- Each class has one responsibility
- Easy to locate and fix bugs

### Testability

- Components can be unit tested in isolation
- Dependencies can be mocked
- No tight coupling

### Extensibility

- Add new features without modifying existing code
- Plugin system allows unlimited extension
- Override defaults with custom implementations

### Type Safety

- Strong typing throughout
- No `any` types (except for legacy compatibility)
- Discriminated unions for configurations

### Performance

- Lazy plugin loading possible
- Efficient registry lookups
- Memoization opportunities

### Developer Experience

- Self-documenting code
- Clear interfaces
- IntelliSense support
- Comprehensive examples

## Migration Path

### Phase 1: Backward Compatibility (Current)

- Old API still works
- New implementation under the hood
- No breaking changes

### Phase 2: Gradual Adoption

- New features available via new API
- Developers can opt-in to new system
- Both APIs coexist

### Phase 3: Full Migration

- All code uses new API
- Old API deprecated
- Legacy code removed

## Future Enhancements

### Planned Features

1. **Async Validation**: Server-side validation support
2. **Field Dependencies**: Advanced field relationships
3. **Dynamic Schemas**: Runtime schema modification
4. **Middleware System**: Intercept and modify behavior
5. **Plugin Marketplace**: Community plugins
6. **Form-Level Features**: Submit, reset, dirty checking
7. **Accessibility**: ARIA labels, keyboard navigation
8. **Performance**: Virtual scrolling for large forms

### Extensibility Opportunities

- Custom error presenters
- Custom conditional renderers
- Plugin composition
- Theme system
- Internationalization

## Conclusion

This architecture provides a solid foundation for a scalable, maintainable input system. By applying SOLID principles and proven design patterns, we've created a system that is:

- Easy to understand
- Easy to extend
- Easy to test
- Type-safe
- Backward compatible
- Future-proof

The plugin architecture ensures that the system can grow without becoming unwieldy, and the clear separation of concerns makes it easy for developers to work on specific parts without affecting others.
