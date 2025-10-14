/**
 * Example: Basic Usage of the Input Representer System
 *
 * This file demonstrates various ways to use the refactored Input Representer
 * following SOLID principles and the plugin architecture.
 */

import React, { useState } from "react";
import { InputRepresenter } from "../components/InputRepresenter";
import type { InputProperties, InputValue, ObjectValue } from "../types";

// ============================================================================
// Example 1: Simple Form
// ============================================================================

export const SimpleFormExample: React.FC = () => {
  const [values, setValues] = useState<ObjectValue>({});

  const properties: InputProperties = {
    name: {
      type: "string",
      title: "Full Name",
      description: "Enter your full name",
      placeholder: "John Doe",
    },
    email: {
      type: "string",
      title: "Email Address",
      description: "We'll never share your email",
      placeholder: "john@example.com",
    },
    age: {
      type: "number",
      title: "Age",
      description: "How old are you?",
    },
    newsletter: {
      type: "boolean",
      title: "Subscribe to Newsletter",
      description: "Get updates about new features",
    },
  };

  return (
    <div>
      <h2>Simple Form Example</h2>
      <InputRepresenter properties={properties} value={values} onChange={setValues} />
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
};

// ============================================================================
// Example 2: Conditional Fields
// ============================================================================

export const ConditionalFieldsExample: React.FC = () => {
  const [values, setValues] = useState<ObjectValue>({
    hasAddress: false,
  });

  const properties: InputProperties = {
    hasAddress: {
      type: "boolean",
      title: "Do you have an address?",
    },
    street: {
      type: "string",
      title: "Street Address",
      renderCondition: {
        field: "hasAddress",
        equals: true,
      },
    },
    city: {
      type: "string",
      title: "City",
      renderCondition: {
        field: "hasAddress",
        equals: true,
      },
    },
    country: {
      type: "string",
      title: "Country",
      enum: ["USA", "Canada", "UK", "Germany", "France"],
      renderCondition: {
        field: "hasAddress",
        equals: true,
      },
    },
  };

  return (
    <div>
      <h2>Conditional Fields Example</h2>
      <InputRepresenter properties={properties} value={values} onChange={setValues} />
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
};

// ============================================================================
// Example 3: Nested Objects
// ============================================================================

export const NestedObjectsExample: React.FC = () => {
  const [values, setValues] = useState<ObjectValue>({});

  const properties: InputProperties = {
    user: {
      type: "object",
      title: "User Information",
      description: "Basic user details",
      properties: {
        firstName: {
          type: "string",
          title: "First Name",
        },
        lastName: {
          type: "string",
          title: "Last Name",
        },
        email: {
          type: "string",
          title: "Email",
        },
      },
    },
    preferences: {
      type: "object",
      title: "Preferences",
      properties: {
        theme: {
          type: "select",
          title: "Theme",
          enum: ["light", "dark", "auto"],
        },
        notifications: {
          type: "boolean",
          title: "Enable Notifications",
        },
      },
    },
  };

  return (
    <div>
      <h2>Nested Objects Example</h2>
      <InputRepresenter properties={properties} value={values} onChange={setValues} />
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
};

// ============================================================================
// Example 4: Arrays and Lists
// ============================================================================

export const ArraysExample: React.FC = () => {
  const [values, setValues] = useState<ObjectValue>({});

  const properties: InputProperties = {
    tags: {
      type: "chip",
      title: "Tags",
      description: "Add tags (press enter after each tag)",
      valueType: "string",
    },
    skills: {
      type: "multiselect",
      title: "Skills",
      enum: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "Go"],
    },
  };

  return (
    <div>
      <h2>Arrays Example</h2>
      <InputRepresenter properties={properties} value={values} onChange={setValues} />
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
};

// ============================================================================
// Example 5: Rich Inputs
// ============================================================================

export const RichInputsExample: React.FC = () => {
  const [values, setValues] = useState<ObjectValue>({});

  const properties: InputProperties = {
    bio: {
      type: "richtext",
      title: "Biography",
      description: "Tell us about yourself",
    },
    description: {
      type: "textarea",
      title: "Short Description",
      placeholder: "A brief description...",
      icon: "description",
    },
    favoriteColor: {
      type: "color",
      title: "Favorite Color",
    },
    birthDate: {
      type: "date",
      title: "Birth Date",
    },
  };

  return (
    <div>
      <h2>Rich Inputs Example</h2>
      <InputRepresenter properties={properties} value={values} onChange={setValues} />
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
};

// ============================================================================
// Example 6: With Validation Errors
// ============================================================================

export const ValidationExample: React.FC = () => {
  const [values, setValues] = useState<ObjectValue>({
    email: "invalid-email",
    age: 15,
  });

  const properties: InputProperties = {
    email: {
      type: "string",
      title: "Email",
      error: "Invalid email format",
    },
    age: {
      type: "number",
      title: "Age",
      error: "Must be 18 or older",
    },
    password: {
      type: "string",
      title: "Password",
      error: "Password must be at least 8 characters",
    },
  };

  return (
    <div>
      <h2>Validation Example</h2>
      <InputRepresenter properties={properties} value={values} onChange={setValues} />
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
};

// ============================================================================
// Example 7: Using Legacy Hook (Backward Compatibility)
// ============================================================================

import useInputRepresenter from "../../custom-hooks/useInputRepresenter";

export const LegacyHookExample: React.FC = () => {
  const [values, setValues] = useState<any>({});

  const inputs = useInputRepresenter({
    properties: {
      username: {
        type: "string",
        title: "Username",
      },
      active: {
        type: "boolean",
        title: "Active",
      },
    },
    value: values,
    onChange: setValues,
  });

  return (
    <div>
      <h2>Legacy Hook Example (Backward Compatible)</h2>
      {inputs}
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
};

// ============================================================================
// Example 8: Custom Registry
// ============================================================================

import { InputRegistry } from "../core/registry/InputRegistry";
import { getDefaultPlugins } from "../plugins";

export const CustomRegistryExample: React.FC = () => {
  const [values, setValues] = useState<ObjectValue>({});

  // Create a custom registry
  const customRegistry = React.useMemo(() => {
    const registry = new InputRegistry();
    const plugins = getDefaultPlugins();
    registry.registerMany(plugins);
    return registry;
  }, []);

  const properties: InputProperties = {
    name: {
      type: "string",
      title: "Name",
    },
  };

  return (
    <div>
      <h2>Custom Registry Example</h2>
      <InputRepresenter
        properties={properties}
        value={values}
        onChange={setValues}
        registry={customRegistry}
      />
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
};

// ============================================================================
// All Examples Component
// ============================================================================

export const AllExamples: React.FC = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Input Representer Examples</h1>

      <section style={{ marginBottom: "40px" }}>
        <SimpleFormExample />
      </section>

      <section style={{ marginBottom: "40px" }}>
        <ConditionalFieldsExample />
      </section>

      <section style={{ marginBottom: "40px" }}>
        <NestedObjectsExample />
      </section>

      <section style={{ marginBottom: "40px" }}>
        <ArraysExample />
      </section>

      <section style={{ marginBottom: "40px" }}>
        <RichInputsExample />
      </section>

      <section style={{ marginBottom: "40px" }}>
        <ValidationExample />
      </section>

      <section style={{ marginBottom: "40px" }}>
        <LegacyHookExample />
      </section>

      <section style={{ marginBottom: "40px" }}>
        <CustomRegistryExample />
      </section>
    </div>
  );
};

export default AllExamples;
