import React, { useState } from "react";
import styles from "./App.module.scss";
import useInputRepresenter, {
  TypeProperties,
  TypeRepresenterValue,
} from "./custom-hooks/useInputRepresenter";
import { TypeLabeledValue } from "./index.export";

function App() {
  return (
    <div className={styles.app}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <header
          style={{
            textAlign: "center",
            marginBottom: "40px",
            borderBottom: "1px solid #e1e5e9",
            paddingBottom: "20px",
          }}
        >
          <h1
            style={{
              color: "#2c3e50",
              marginBottom: "10px",
              fontSize: "2.5rem",
              fontWeight: "600",
            }}
          >
            useInputRepresenter Demo
          </h1>
          <p
            style={{
              color: "#7f8c8d",
              fontSize: "1.1rem",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Comprehensive showcase of all available input types and their features
          </p>
        </header>

        <InputRepresenterDemo />
        <ConditionalRenderingDemo />
      </div>
    </div>
  );
}

function InputRepresenterDemo() {
  // Sample data for relation inputs
  const mockRelationOptions = async (): Promise<TypeLabeledValue[]> => {
    return [
      { label: "Option 1", value: "opt1" },
      { label: "Option 2", value: "opt2" },
      { label: "Option 3", value: "opt3" },
    ];
  };

  const searchRelationOptions = async (searchValue: string): Promise<TypeLabeledValue[]> => {
    const options = await mockRelationOptions();
    return options.filter((opt) => opt.label.toLowerCase().includes(searchValue.toLowerCase()));
  };

  // Define comprehensive properties for all input types
  const properties: TypeProperties = {
    // Basic input types
    stringInput: {
      type: "string",
      title: "String Input",
      description: "A basic string input field",
      placeholder: "Enter some text...",
      popupClassName: "custom-popup",
    },
    stringWithEnum: {
      type: "string",
      title: "String with Options",
      description: "String input with predefined options",
      enum: ["Option A", "Option B", "Option C"],
    },
    numberInput: {
      type: "number",
      title: "Number Input",
      description: "A numeric input field",
      placeholder: "Enter a number...",
    },
    numberWithEnum: {
      type: "number",
      title: "Number with Options",
      description: "Number input with predefined options",
      enum: [10, 20, 30, 40, 50],
    },
    textareaInput: {
      type: "textarea",
      title: "Textarea Input",
      description: "Multi-line text input",
      icon: "formatSize",
      placeholder: "Enter multiple lines of text...",
    },
    dateInput: {
      type: "date",
      title: "Date Input",
      description: "Date picker input",
    },
    booleanInput: {
      type: "boolean",
      title: "Boolean Switch",
      description: "Toggle switch for boolean values",
      size: "medium",
    },
    colorInput: {
      type: "color",
      title: "Color Picker",
      description: "Color selection input",
    },

    // Advanced input types
    storageInput: {
      type: "storage",
      title: "File Storage",
      description: "File upload and storage input",
    },
    multiselectInput: {
      type: "multiselect",
      title: "Multiple Selection",
      description: "Select multiple values from options",
      enum: ["Apple", "Banana", "Cherry", "Date", "Elderberry"],
    },
    locationInput: {
      type: "location",
      title: "Location Picker",
      description: "Geographic location input with map",
    },
    richtextInput: {
      type: "richtext",
      title: "Rich Text Editor",
      description: "WYSIWYG text editor",
    },

    // Collection input types
    chipInput: {
      type: "chip",
      title: "Chip Input",
      description: "Add multiple values as chips",
      valueType: "string",
    },
    selectInput: {
      type: "select",
      title: "Select Dropdown",
      description: "Single selection dropdown",
      enum: ["Red", "Green", "Blue", "Yellow", "Purple"],
      popupClassName: "custom-popup",
    },
    relationInput: {
      type: "relation",
      title: "Relation Input",
      description: "Async searchable relation input",
      getOptions: mockRelationOptions,
      loadMoreOptions: mockRelationOptions,
      searchOptions: searchRelationOptions,
      totalOptionsLength: 3,
      relationType: "onetoone",
      popupClassName: "custom-popup",
    },

    // Complex input types
    objectInput: {
      type: "object",
      title: "Object Input",
      description: "Nested object with multiple properties",
      properties: {
        name: {
          type: "string",
          title: "Name",
          description: "Person's name",
        },
        age: {
          type: "number",
          title: "Age",
          description: "Person's age",
        },
        isActive: {
          type: "boolean",
          title: "Is Active",
          description: "Whether the person is active",
        },
        favoriteColor: {
          type: "color",
          title: "Favorite Color",
          description: "Person's favorite color",
        },
      },
    },
    arrayInput: {
      type: "array",
      title: "Array Input",
      description: "Dynamic array of items",
      minItems: 1,
      maxItems: 5,
      items: {
        title: "Item",
        type: "object",
        properties: {
          itemName: {
            type: "string",
            title: "Item Name",
            description: "Name of the item",
          },
          itemValue: {
            type: "number",
            title: "Item Value",
            description: "Value of the item",
          },
        },
      },
    },
  };

  // State management for all input values
  const [formValues, setFormValues] = useState<TypeRepresenterValue>({
    stringInput: "Sample text",
    stringWithEnum: "Option A",
    numberInput: 42,
    numberWithEnum: 20,
    textareaInput: "This is a multi-line\ntext example",
    dateInput: new Date().toISOString(),
    booleanInput: true,
    colorInput: "#3498db",
    storageInput: "",
    multiselectInput: ["Apple", "Cherry"],
    locationInput: { lat: 40.7128, lng: -74.006 }, // New York coordinates
    richtextInput: "<p>This is <strong>rich text</strong> content</p>",
    chipInput: ["tag1", "tag2", "tag3"],
    selectInput: "Blue",
    relationInput: { label: "Option 1", value: "opt1" },
    objectInput: {
      name: "John Doe",
      age: 30,
      isActive: true,
      favoriteColor: "#e74c3c",
    },
    arrayInput: [
      { itemName: "First Item", itemValue: 100 },
      { itemName: "Second Item", itemValue: 200 },
    ],
  });

  // Handle form changes
  const handleFormChange = (newValues: TypeRepresenterValue) => {
    setFormValues(newValues);
    console.log("Form values updated:", newValues);
  };

  // Use the input representer hook
  const inputElements = useInputRepresenter({
    properties,
    value: formValues,
    onChange: handleFormChange,
    containerClassName: "input-container",
  });

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        border: "2px solid #e9ecef",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ marginTop: 0, color: "#2c3e50" }}>All Input Types Demo</h2>
      <p style={{ color: "#6c757d", marginBottom: "25px" }}>
        This demo showcases all available input types with the useInputRepresenter hook. Each input
        type has been configured with appropriate properties and sample data.
      </p>

      <div
        style={{
          display: "grid",
          gap: "25px",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          marginTop: "20px",
        }}
      >
        {inputElements}
      </div>

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          border: "1px solid #e9ecef",
        }}
      >
        <h3 style={{ marginTop: 0, color: "#495057" }}>Current Form Values:</h3>
        <pre
          style={{
            fontSize: "12px",
            overflow: "auto",
            backgroundColor: "#ffffff",
            padding: "15px",
            borderRadius: "4px",
            border: "1px solid #dee2e6",
            maxHeight: "300px",
          }}
        >
          {JSON.stringify(formValues, null, 2)}
        </pre>
      </div>
    </div>
  );
}

// Demo for conditional rendering features
function ConditionalRenderingDemo() {
  const [conditionalValues, setConditionalValues] = useState<TypeRepresenterValue>({
    inputType: "string",
    stringValue: "",
    numberValue: 0,
    showAdvanced: false,
    advancedSettings: {
      timeout: 5000,
      retries: 3,
    },
  });

  const conditionalProperties: TypeProperties = {
    inputType: {
      type: "select",
      title: "Input Type Selector",
      description: "Choose which input type to show",
      enum: ["string", "number", "textarea"],
    },
    stringValue: {
      type: "string",
      title: "String Value",
      description: "This appears when 'string' is selected",
      renderCondition: { field: "inputType", equals: "string" },
      placeholder: "Enter text here...",
    },
    numberValue: {
      type: "number",
      title: "Number Value",
      description: "This appears when 'number' is selected",
      renderCondition: { field: "inputType", equals: "number" },
      placeholder: "Enter number here...",
    },
    textareaValue: {
      type: "textarea",
      title: "Textarea Value",
      description: "This appears when 'textarea' is selected",
      renderCondition: { field: "inputType", equals: "textarea" },
      placeholder: "Enter multiline text...",
    },
    showAdvanced: {
      type: "boolean",
      title: "Show Advanced Settings",
      description: "Toggle advanced configuration options",
    },
    advancedSettings: {
      type: "object",
      title: "Advanced Settings",
      description: "Advanced configuration options",
      renderCondition: { field: "showAdvanced", equals: true },
      properties: {
        timeout: {
          type: "number",
          title: "Timeout (ms)",
          description: "Request timeout in milliseconds",
        },
        retries: {
          type: "number",
          title: "Retry Count",
          description: "Number of retry attempts",
          enum: [1, 2, 3, 4, 5],
        },
        enableDebug: {
          type: "boolean",
          title: "Enable Debug Mode",
          description: "Show debug information",
        },
      },
    },
  };

  const conditionalElements = useInputRepresenter({
    properties: conditionalProperties,
    value: conditionalValues,
    onChange: setConditionalValues,
    containerClassName: "conditional-input-container",
  });

  return (
    <div
      style={{
        marginTop: "60px",
        padding: "30px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        border: "2px solid #e9ecef",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ marginTop: 0, color: "#2c3e50" }}>Conditional Rendering Demo</h2>
      <p style={{ color: "#6c757d", marginBottom: "25px" }}>
        This demo shows how inputs can be conditionally rendered based on other field values using
        renderCondition.
      </p>

      <div style={{ display: "grid", gap: "25px" }}>{conditionalElements}</div>

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#f8f9fa",
          borderRadius: "6px",
          border: "1px solid #e9ecef",
        }}
      >
        <h4 style={{ marginTop: 0, color: "#495057" }}>Conditional Values:</h4>
        <pre
          style={{
            fontSize: "11px",
            margin: 0,
            backgroundColor: "#ffffff",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #dee2e6",
          }}
        >
          {JSON.stringify(conditionalValues, null, 2)}
        </pre>
      </div>
    </div>
  );
}
