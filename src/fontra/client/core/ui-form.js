export class Form {

  constructor(formID, fieldDescriptions) {
    this.container = document.querySelector(`#${formID}`);
    if (!this.container) {
      throw new Error(`Expecting an element with id="#${formID}"`);
    }
    if (this.container.children.length != 0) {
      throw new Error("Form container must be empty");
    }
    this.container.classList.add("ui-form");
    this.setFieldDescriptions(fieldDescriptions);
  }

  setFieldDescriptions(fieldDescriptions) {
    this.container.innerHTML = "";
    if (!fieldDescriptions) {
      return;
    }
    for (const fieldItem of fieldDescriptions) {
      if (fieldItem.type === "divider") {
        const dividerElement = document.createElement("hr");
        dividerElement.className = "ui-form-divider";
        this.container.appendChild(dividerElement);
        continue;
      }
      const labelElement = document.createElement("div");
      labelElement.classList.add("ui-form-label", fieldItem.type);
      const valueElement = document.createElement("div");
      valueElement.classList.add("ui-form-value", fieldItem.type);

      let label = fieldItem.label || fieldItem.key || "";
      if (label.length && fieldItem.type !== "header") {
        label += ":";
      };
      labelElement.innerHTML = label;
      this.container.appendChild(labelElement);
      if (fieldItem.type === "header") {
        continue;
      }
      this.container.appendChild(valueElement);

      switch (fieldItem.type) {
        case "header":
          valueElement.innerText = fieldItem.value || "";
          break;
        case "text":
          valueElement.innerText = fieldItem.value || "";
          break;
        case "number":
          if (fieldItem.value !== undefined) {
            valueElement.innerText = fieldItem.value;
          }
          break;
        case "edit-number":
          const inputElement = document.createElement("input");
          inputElement.type = "number";
          inputElement.value = fieldItem.value;
          valueElement.appendChild(inputElement);
          break;
        default:
          throw new Error(`Unknown field type: ${fieldItem.type}`);
      }
    }
  }

  get values() {

  }

  set values(values) {

  }

}
