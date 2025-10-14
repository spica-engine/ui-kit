# Input Representer System

A refactored input representation system following SOLID principles, featuring a plugin architecture for maximum extensibility and maintainability.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [SOLID Principles Applied](#solid-principles-applied)
- [Quick Start](#quick-start)
- [Usage Examples](#usage-examples)
- [Creating Custom Plugins](#creating-custom-plugins)
- [API Reference](#api-reference)
- [Migration Guide](#migration-guide)

## Overview

The Input Representer system provides a flexible, type-safe way to dynamically render form inputs based on schema definitions. It has been completely refactored to follow SOLID principles and implement a plugin architecture.

### Key Features

✅ **Plugin Architecture** - Easily extend with custom input types  
✅ **Type Safe** - Full TypeScript support with discriminated unions  
✅ **SOLID Principles** - Clean, maintainable, testable code  
✅ **Backward Compatible** - Drop-in replacement for legacy code  
✅ **Validation System** - Built-in and extensible validation  
✅ **Conditional Rendering** - Show/hide fields based on other values  
✅ **Dependency Injection** - Easily swap implementations

## Architecture

### Directory Structure

```
input-representer/
├── core/
│   ├── abstractions/      # Interfaces (IInputRenderer, IInputValidator, etc.)
│   ├── factories/         # InputFactory for creating inputs
│   ├── registry/          # InputRegistry for plugin management
│   ├── services/          # ValidationService, etc.
│   └── plugin/            # Plugin interface and base class
├── plugins/               # All input type implementations
│   ├── string/
│   ├── number/
│   ├── relation/
│   └── ...
├── components/            # React components
│   ├── InputRepresenter.tsx
│   └── InputContainer.tsx
├── hooks/                 # React hooks
│   └── useInputRepresenter.tsx
├── utils/                 # Utility classes
│   ├── ConditionalRenderer.ts
│   ├── ErrorPresenter.tsx
│   └── ValueManager.ts
├── types/                 # Type definitions
│   └── index.ts
└── legacy/                # Backward compatibility layer
    ├── LegacyTypeAdapter.ts
    └── useLegacyInputRepresenter.tsx
```

### Core Concepts

#### 1. Plugin System

Each input type is implemented as a plugin that can be registered with the global registry:

```typescript
interface InputPlugin {
  type: InputType;
  renderer: IInputRenderer;
  validator?: IInputValidator;
  transformer?: IInputTransformer;
}
```

#### 2. Separation of Concerns

- **Renderers** - Only handle rendering UI
- **Validators** - Only handle validation logic
- **Transformers** - Only handle data transformation
- **ConditionalRenderer** - Only handles conditional logic
- **ErrorPresenter** - Only handles error display
- **ValueManager** - Only handles value manipulation

## SOLID Principles Applied

### Single Responsibility Principle (SRP)

Each class has one reason to change:

- `InputFactory` - Creates inputs
- `InputRegistry` - Manages plugin registration
- `ConditionalRenderer` - Evaluates render conditions
- `ErrorPresenter` - Displays errors
- `ValueManager` - Manages values

### Open/Closed Principle (OCP)

System is open for extension via plugins, closed for modification:

- Add new input types by creating plugins
- No need to modify existing code
- Plugin priority system for overriding defaults

### Liskov Substitution Principle (LSP)

All plugins implement `InputPlugin` interface and can be used interchangeably.
All renderers implement `IInputRenderer` and can be swapped.

### Interface Segregation Principle (ISP)

Focused interfaces instead of one large interface:

- `IInputRenderer` - Just rendering
- `IInputValidator` - Just validation
- `IInputTransformer` - Just transformation
- `IConditionalRenderer` - Just conditional logic
- `IErrorPresenter` - Just error presentation

### Dependency Inversion Principle (DIP)

High-level modules depend on abstractions, not concretions:

- `InputFactory` depends on `IInputRenderer`, not concrete renderers
- Components receive dependencies (can be injected)

## Quick Start

### Basic Usage

```typescript
import { InputRepresenter } from 'input-representer';
import type { InputProperties } from 'input-representer/types';

const properties: InputProperties = {
  name: {
    type: 'string',
    title: 'Full Name',
    description: 'Enter your full name',
  },
  age: {
    type: 'number',
    title: 'Age',
  },
  subscribe: {
    type: 'boolean',
    title: 'Subscribe to newsletter',
  },
};

function MyForm() {
  const [values, setValues] = useState({});

  return (
    <InputRepresenter
      properties={properties}
      value={values}
      onChange={setValues}
    />
  );
}
```

### Using the Hook (Legacy Compatible)

```typescript
import useInputRepresenter from 'custom-hooks/useInputRepresenter';

function MyForm() {
  const [values, setValues] = useState({});

  const inputs = useInputRepresenter({
    properties: {
      email: {
        type: 'string',
        title: 'Email',
      },
    },
    value: values,
    onChange: setValues,
  });

  return <>{inputs}</>;
}
```

## Usage Examples

### Conditional Rendering

```typescript
const properties: InputProperties = {
  hasAddress: {
    type: "boolean",
    title: "Do you have an address?",
  },
  address: {
    type: "string",
    title: "Address",
    renderCondition: {
      field: "hasAddress",
      equals: true,
    },
  },
};
```

### Nested Objects

```typescript
const properties: InputProperties = {
  user: {
    type: "object",
    title: "User Information",
    properties: {
      firstName: {
        type: "string",
        title: "First Name",
      },
      lastName: {
        type: "string",
        title: "Last Name",
      },
    },
  },
};
```

### Arrays

```typescript
const properties: InputProperties = {
  tags: {
    type: "array",
    title: "Tags",
    minItems: 1,
    maxItems: 10,
    items: {
      type: "string",
      properties: {},
    },
  },
};
```

### Relation Inputs

```typescript
const properties: InputProperties = {
  category: {
    type: "relation",
    title: "Category",
    relationType: "onetoone",
    getOptions: async () => {
      return await fetchCategories();
    },
    searchOptions: async (query) => {
      return await searchCategories(query);
    },
    loadMoreOptions: async () => {
      return await loadMoreCategories();
    },
    totalOptionsLength: 100,
  },
};
```

## Creating Custom Plugins

### Step 1: Create a Renderer

```typescript
import { BaseRenderer } from 'input-representer/plugins/base/BaseRenderer';
import { BaseInputProps, InputConfig } from 'input-representer/types';

export class CustomInputRenderer extends BaseRenderer<string> {
  render(props: BaseInputProps<string>) {
    return (
      <div>
        <label>{props.title}</label>
        <input
          type="text"
          value={props.value}
          onChange={(e) => props.onChange?.({
            key: props.key,
            value: e.target.value
          })}
        />
      </div>
    );
  }
}
```

### Step 2: Create a Plugin

```typescript
import { BaseInputPlugin } from "input-representer/core/plugin/InputPlugin";
import { CustomInputRenderer } from "./CustomInputRenderer";

export class CustomInputPlugin extends BaseInputPlugin<string> {
  readonly type = "custom" as const;
  readonly renderer = new CustomInputRenderer();
}
```

### Step 3: Register the Plugin

```typescript
import { globalInputRegistry } from 'input-representer';
import { CustomInputPlugin } from './CustomInputPlugin';

// Register globally
globalInputRegistry.register(new CustomInputPlugin());

// Or create a custom registry
import { InputRegistry, InputRepresenter } from 'input-representer';

const customRegistry = new InputRegistry();
customRegistry.register(new CustomInputPlugin());

<InputRepresenter registry={customRegistry} {...props} />
```

## API Reference

### Components

#### `<InputRepresenter />`

Main component for rendering inputs.

**Props:**

- `properties: InputProperties` - Schema definition
- `value?: InputValue | ObjectValue` - Current values
- `onChange?: (value: InputValue) => void` - Change handler
- `containerClassName?: string` - CSS class for containers
- `errorClassName?: string` - CSS class for errors
- `registry?: InputRegistry` - Custom plugin registry

### Hooks

#### `useInputRepresenter()`

Hook version of InputRepresenter.

**Parameters:** Same as InputRepresenter props

**Returns:** JSX elements

### Core Classes

#### `InputRegistry`

Manages plugin registration.

**Methods:**

- `register(plugin: InputPlugin): void`
- `registerMany(plugins: InputPlugin[]): void`
- `get(type: InputType): InputPlugin | undefined`
- `has(type: InputType): boolean`
- `unregister(type: InputType): void`

#### `InputFactory`

Creates input components from configuration.

**Methods:**

- `create(config, key, value, onChange): ReactNode`
- `canCreate(type: string): boolean`

#### `ValidationService`

Handles input validation.

**Methods:**

- `registerValidator(type: string, validator: IInputValidator): void`
- `validate(value, type, rules): Promise<ValidationResult>`
- `validateAll(values, configs): Promise<ValidationResult>`

## Migration Guide

### For Existing Code

**No changes required!** The refactored system is 100% backward compatible.

Your existing code:

```typescript
import useInputRepresenter from "custom-hooks/useInputRepresenter";
```

Will continue to work exactly as before, but now uses the new architecture under the hood.

### To Use New Features

Update your imports to access new features:

```typescript
import { InputRepresenter, globalInputRegistry, ValidationService } from "input-representer";
```

### Creating New Code

For new code, prefer the new `InputRepresenter` component:

```typescript
import { InputRepresenter } from 'input-representer';
import type { InputProperties } from 'input-representer/types';

const properties: InputProperties = { /* ... */ };

<InputRepresenter
  properties={properties}
  value={values}
  onChange={setValues}
/>
```

## Benefits Over Legacy Implementation

1. **Extensibility** - Add custom input types without modifying core code
2. **Type Safety** - Removed all `any` and `@ts-ignore` comments
3. **Testability** - Each component can be unit tested independently
4. **Maintainability** - Clear separation of concerns
5. **Performance** - Better memoization and optimization opportunities
6. **Documentation** - Self-documenting code with clear interfaces

## Advanced Usage

### Custom Validation

```typescript
import { ValidationService } from "input-representer";

const validationService = new ValidationService();

// Register custom validator
validationService.registerValidator("email", {
  async validate(value, rules) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof value === "string" && !emailRegex.test(value)) {
      return {
        isValid: false,
        errors: "Invalid email address",
      };
    }
    return { isValid: true };
  },
  isRequired(value) {
    return !!value;
  },
});
```

### Custom Transformers

```typescript
import { IInputTransformer } from "input-representer/core/abstractions";

class DateTransformer implements IInputTransformer<string, Date> {
  transform(value: string): Date {
    return new Date(value);
  }

  reverseTransform(value: Date): string {
    return value.toISOString();
  }
}
```

## Support

For issues, questions, or contributions, please refer to the main project repository.

---

**Version:** 2.0.0  
**Last Updated:** October 2025
