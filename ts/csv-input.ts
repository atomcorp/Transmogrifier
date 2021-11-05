import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("csv-input")
class CsvInput extends LitElement {
  @property()
  csvString?: string = "";

  override render() {
    return html` <p>Hello</p> `;
  }
}

export default CsvInput;
