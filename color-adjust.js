import { adjust } from "https://cdn.jsdelivr.net/gh/quarksuite/core@2.0.0-26/color.js";

const template = document.createElement("template");

template.innerHTML = `<slot></slot>`;

export class ColorAdjust extends HTMLElement {
  constructor() {
    super();

    // Properties
    this.lightness = this.lightness;
    this.chroma = this.chroma;
    this.hue = this.hue;
    this.alpha = this.alpha;

    this.shadow = this.attachShadow({ mode: "open" });

    this.shadow.append(template.content.cloneNode(true));
  }

  #lightness = 0;
  #chroma = 0;
  #hue = 0;
  #alpha = 0;

  set lightness(value) {
    this.reflect("lightness", value);
  }

  get lightness() {
    return this.getAttribute("lightness");
  }

  set chroma(value) {
    this.reflect("chroma", value);
  }

  get chroma() {
    return this.getAttribute("chroma");
  }

  set hue(value) {
    this.reflect("hue", value);
  }

  get hue() {
    return this.getAttribute("hue");
  }

  set alpha(value) {
    this.reflect("alpha", value);
  }

  get alpha() {
    return this.getAttribute("alpha");
  }

  static get observedAttributes() {
    return ["lightness", "chroma", "hue", "alpha"];
  }

  reflect(name, value) {
    if (value) {
      return this.setAttribute(name, value);
    }

    return this.removeAttribute(name);
  }

  connectedCallback() {
    const lightness = Number(this.lightness || this.#lightness);
    const chroma = Number(this.chroma || this.#chroma);
    const hue = Number(this.hue || this.#hue);
    const alpha = Number(this.alpha || this.#alpha);

    const slotted = Array.from(
      this.shadowRoot.querySelector("slot").assignedElements(),
    );

    // Element is a color token
    slotted
      .filter((el) => Array.from(el.children).length === 0)
      .forEach((el) => {
        const swatch = el.getAttribute("color") || "#808080";

        el.setAttribute(
          "color",
          adjust({ lightness, chroma, hue, alpha }, swatch),
        );
      });

    // Element is a color scale
    slotted
      .filter((el) => Array.from(el.children).length)
      .forEach((el) => {
        const tokens = Array.from(el.children);
        const colors = adjust(
          {
            lightness,
            chroma,
            hue,
            alpha,
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

customElements.define("color-adjust", ColorAdjust);
