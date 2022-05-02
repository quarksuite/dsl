import { mix } from "https://cdn.jsdelivr.net/gh/quarksuite/core@2.0.0-26/color.js";

const template = document.createElement("template");

template.innerHTML = `<slot></slot>`;

export class ColorMix extends HTMLElement {
  constructor() {
    super();

    // Settings
    this.strength = this.strength;
    this.target = this.target;

    this.shadow = this.attachShadow({ mode: "open" });

    this.shadow.append(template.content.cloneNode(true));
  }

  #strength = 0;
  #target = "#111111";

  set strength(value) {
    this.reflect("strength", value);
  }

  get strength() {
    return this.getAttribute("strength");
  }

  set target(value) {
    this.reflect("target", value);
  }

  get target() {
    return this.getAttribute("target");
  }

  static get observedAttributes() {
    return ["strength", "target"];
  }

  reflect(name, value) {
    if (value) {
      return this.setAttribute(name, value);
    }

    return this.removeAttribute(name);
  }

  connectedCallback() {
    const strength = Number(this.strength || this.#strength);
    const target = this.target || this.#target;

    const slotted = Array.from(
      this.shadowRoot.querySelector("slot").assignedElements(),
    );

    // Element is a color token
    slotted
      .filter((el) => Array.from(el.children).length === 0)
      .forEach((el) => {
        const swatch = el.getAttribute("color") || "#808080";

        el.setAttribute("color", mix({ strength, target }, swatch));
      });

    // Element is a color scale
    slotted
      .filter((el) => Array.from(el.children).length)
      .forEach((el) => {
        const tokens = Array.from(el.children);
        const colors = mix(
          {
            strength,
            target,
            steps: tokens.length,
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

customElements.define("color-mix", ColorMix);
