import { harmony } from "https://cdn.jsdelivr.net/gh/quarksuite/core@2.0.0-26/color.js";

const template = document.createElement("template");

template.innerHTML = `<slot></slot>`;

export class ColorHarmony extends HTMLElement {
  constructor() {
    super();

    // Settings
    this.configuration = this.configuration;
    this.accented = this.accented;

    this.shadow = this.attachShadow({ mode: "open" });

    this.shadow.append(template.content.cloneNode(true));
  }

  #configuration = "complementary";

  set configuration(value) {
    this.reflect("configuration", value);
  }

  get configuration() {
    return this.getAttribute("configuration");
  }

  set accented(value) {
    value !== null
      ? this.setAttribute("accented", "")
      : this.removeAttribute("accented");
  }

  get accented() {
    return this.getAttribute("accented");
  }

  static get observedAttributes() {
    return ["configuration", "accented"];
  }

  reflect(name, value) {
    if (value) {
      return this.setAttribute(name, value);
    }

    return this.removeAttribute(name);
  }

  connectedCallback() {
    const configuration = this.configuration || this.#configuration;
    const accented = this.accented === "" ? true : false;

    const slotted = Array.from(
      this.shadowRoot.querySelector("slot").assignedElements(),
    );

    // Element is a color scale
    slotted
      .filter((el) => Array.from(el.children).length)
      .forEach((el) => {
        const tokens = Array.from(el.children);
        const colors = harmony(
          {
            configuration,
            accented,
          },
          tokens[0].getAttribute("color") || "#808080",
        );

        el.replaceChildren();

        colors.forEach((color, pos) => {
          const as = tokens[pos].getAttribute("as") || pos;
          const token = document.createElement("color-token");

          token.setAttribute("as", as);
          token.setAttribute("color", color);

          el.append(token);
        });

        el.replaceWith(el);
      });
  }
}

customElements.define("color-harmony", ColorHarmony);
