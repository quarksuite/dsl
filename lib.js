// [[file:Notebook.org::*Core v2 Setup][Core v2 Setup:1]]
import {
  delegate,
  pipeline,
  preset,
  process,
  propagate,
} from "https://x.nest.land/quarksuite:core@2.0.0-11/v2/fn.js";
import {
  accessibility,
  adjust,
  contrast,
  convert,
  harmony,
  illuminant,
  mix,
  palette,
  tokens,
  vision,
} from "https://x.nest.land/quarksuite:core@2.0.0-11/v2/color.js";
// Core v2 Setup:1 ends here

// [[file:Notebook.org::*Mixins][Mixins:1]]
function reflected(Element) {
  return class extends Element {
    reflect(name, value) {
      if (value) {
        this.setAttribute(name, value);
      } else {
        this.removeAttribute(name);
      }
    }
  };
}

function observed(attrs, Element) {
  return class extends Element {
    static get observedAttributes() {
      return attrs;
    }
  };
}

function definitions(Element) {
  return class extends Element {
    set as(value) {
      this.reflect("as", value);
    }

    get as() {
      return this.getAttribute("as");
    }

    set from(value) {
      this.reflect("from", value);
    }

    get from() {
      return this.getAttribute("from");
    }
  };
}

function initColorActions(Element) {
  return class extends Element {
    constructor() {
      super();

      this.action = this.action;

      if (this.action === "convert") {
        this.to = this.to;
      }

      if (this.action === "adjust" || this.action === "mix") {
        this.steps = this.steps;
      }

      if (this.action === "adjust") {
        this.lightness = this.lightness;
        this.chroma = this.chroma;
        this.hue = this.hue;
        this.alpha = this.alpha;
      }

      if (this.action === "mix") {
        this.target = this.target;
        this.strength = this.strength;
      }

      if (this.action === "harmony") {
        this.configuration = this.configuration;
      }
    }

    // Action accessor
    set action(value) {
      this.reflect("action", value);
    }

    get action() {
      return this.getAttribute("action");
    }

    // Conversion accessor
    set to(value) {
      this.reflect("to", value);
    }

    get to() {
      return this.getAttribute("to");
    }

    // Adjustment accessors
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

    // Mixture accessors
    set target(value) {
      this.reflect("target", value);
    }

    get target() {
      return this.getAttribute("target");
    }

    set strength(value) {
      this.reflect("strength", value);
    }

    get strength() {
      return this.getAttribute("strength");
    }

    // Interpolation accessor
    set steps(value) {
      this.reflect("steps", value);
    }

    get steps() {
      return this.getAttribute("steps");
    }

    // Color harmony accessors
    set configuration(value) {
      this.reflect("configuration", value);
    }

    get configuration() {
      return this.getAttribute("configuration");
    }

    set accented(value) {
      this.setAttribute("accented", "");
    }

    get accented() {
      return this.getAttribute("accented");
    }
  };
}

function color_actions(Element) {
  return class extends Element {
    constructor() {
      super();

      this.scale = this.scale;
    }

    convert() {
      this.swatch = convert(this.to, this.swatch);
    }

    adjust() {
      const [lightness, chroma, hue, alpha, steps] = [
        this.lightness,
        this.chroma,
        this.hue,
        this.alpha,
        this.steps,
      ].map((prop) => (prop ? parseFloat(prop) : 0));

      // Propagated adjustment
      if (this.scale && this.scale.length) {
        this.scale = propagate(
          preset(adjust, { lightness, chroma, hue, alpha }),
          this.scale,
        );
      }

      // Interpolated adjustment
      if (steps) {
        this.scale = adjust(
          { lightness, chroma, hue, alpha, steps },
          this.swatch,
        );
      }

      this.swatch = adjust({ lightness, chroma, hue, alpha }, this.swatch);
    }

    mix() {
      const target = this.target;
      const strength = parseFloat(this.strength);
      const steps = parseFloat(this.steps);

      // Propagated mixture
      if (this.scale && this.scale.length) {
        this.scale = propagate(preset(mix, { target, strength }), this.scale);
      }

      // Interpolated mixture
      if (steps) {
        this.scale = mix({ target, strength, steps }, this.swatch);
      }

      this.swatch = mix({ target, strength }, this.swatch);
    }

    harmony() {
      const configuration = this.configuration;
      const accented = this.accented === "" ? true : false;

      this.scale = harmony({ configuration, accented }, this.swatch);
    }
  };
}
// Mixins:1 ends here

// [[file:Notebook.org::*ColorToken][ColorToken:1]]
function initColorToken(Element) {
  return class extends Element {
    constructor() {
      super();

      this.swatch = this.swatch;
      this.format = this.format;
    }

    set swatch(value) {
      this.reflect("swatch", value);
    }

    get swatch() {
      return this.getAttribute("swatch");
    }

    set format(value) {
      this.reflect("format", value);
    }

    get format() {
      return this.getAttribute("format");
    }
  };
}

const observedColorToken = preset(observed, ["swatch", "format"]);
const color_token = process(reflected, observedColorToken, initColorToken);

class ColorToken extends color_token(HTMLElement) {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
  }

  #swatch = "gray";
  #format = "hex rgb hsl";

  // Formatting
  formats() {
    const swatch = this.swatch || this.#swatch;
    const splitFormats = (this.format || this.#format).split(" ");

    return splitFormats
      .map((format) => {
        return `<span class="value ${
          this.swatch === convert(format, swatch) && "actual"
        }">${format}: <code>${convert(format, swatch)}</code></span>`;
      })
      .join("");
  }

  template() {
    const tmpl = document.createElement("template");

    tmpl.innerHTML = `
${this.styles()}
<div class="color"></div>
<div class="data">
${this.formats()}
</div>
`;

    return tmpl.content.cloneNode(true);
  }

  compatible(swatch) {
    return convert("hex", swatch || this.#swatch);
  }

  styles() {
    return `
<style>
:host {
  display: flex;
  flex-flow: row wrap;
  background-color: ${this.compatible(this.swatch)};
}

:host[hidden] {
  display: none;
}

code {
  font-family: var(--code-family, monospace);
  text-transform: lowercase;
}

.color {
  flex: 1;
  flex-basis: var(--swatch-basis, 22ch);
  min-height: var(--swatch-height, 32vh);
}

.data {
  --data-padding: 1ex;
  flex: 1;
  flex-basis: var(--data-basis, 45ch);
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  background-color: rgba(255, 255, 255, var(--data-opacity, 0.7));
  font-family: var(--data-family, sans-serif);
  font-size: var(--data-font-size, 1.125rem);
  padding: var(--data-padding);
}

.value {
  padding: var(--value-padding, var(--data-padding));
  text-transform: uppercase;
}

.value.actual {
  font-weight: 700;
}
</style>
`;
  }

  connectedCallback() {
    this.shadow.append(this.template());
  }
}

customElements.define("color-token", ColorToken);
// ColorToken:1 ends here

// [[file:Notebook.org::*ColorDefn][ColorDefn:1]]
function initColorDefn(Element) {
  return class extends Element {
    constructor() {
      super();

      this.as = this.as;
      this.from = this.from;
    }
  };
}

const observedColorDefn = preset(observed, [
  "as",
  "from",
  "action",
  "swatch",
  "format",
]);
const observedConversion = preset(observed, ["to"]);
const observedAdjustment = preset(observed, [
  "lightness",
  "chroma",
  "hue",
  "alpha",
]);
const observedMixture = preset(observed, ["target", "strength"]);
const observedInterpolation = preset(observed, ["steps"]);
const observedHarmony = preset(observed, ["configuration", "accented"]);
const color_defn = process(
  reflected,
  definitions,
  observedColorDefn,
  initColorDefn,
  initColorToken,
  observedConversion,
  observedAdjustment,
  observedMixture,
  observedInterpolation,
  observedHarmony,
  initColorActions,
  color_actions,
);

export class ColorDefn extends color_defn(ColorToken) {
  #as = "";
  #swatch = "gray";
  #format = "hex rgb hsl";

  // Referencing
  referenced() {
    const indexedRef = this.from.split(".");
    let ref = document.querySelector(
      `${
        this.from.includes(".")
          ? `[as^="${indexedRef[0]}"]` // scale index
          : `[as="${this.from}"]` // scale or value
      }`,
    );

    // Scale reference
    if (ref.scale) {
      // Index reference
      if (indexedRef.length > 1) {
        const [, index] = indexedRef;
        this.reference = ref.scale[index];
        console.log(this.reference);
      } else {
        this.referenceScale = ref.scale;
        this.scale = this.referenceScale;
        this.reference = ref.getAttribute("swatch");
      }
    } else {
      let ref = document.querySelector(`[as="${this.from}"]`);
      this.reference = ref.getAttribute("swatch");
    }

    this.swatch = this.reference;
  }

  // Labeling
  label() {
    if (this.scale && this.scale.length) {
      const swatches = (scale) =>
        scale.map(
          (color) =>
            `<span class="ref-swatch scale" style="background-color: ${color};"></span>`,
        );
      return `<span class="as"><span class="ref-scale">${
        swatches(
          this.scale,
        ).join("")
      }</span> ${this.as || this.#as}</span>
${
        this.from && this.referenceScale
          ? `<span class="from"><span class="ref-scale">${
            swatches(
              this.referenceScale,
            ).join("")
          }</span> ${this.from}</span>`
          : `<span class="from"><span class="ref-swatch ref-from"></span> ${this.from}</span>`
      }
`;
    } else {
      return `
<span class="as"><span class="ref-swatch ref-as"></span> ${
        this.as || this.#as
      }</span>
${
        this.from
          ? `<span class="from"><span class="ref-swatch ref-from"></span> ${this.from}</span>`
          : ""
      }
`;
    }
  }

  template() {
    const tmpl = document.createElement("template");

    if (this.scale && this.scale.length) {
      const swatches = this.scale.map(
        (swatch) =>
          `<color-token swatch="${swatch}" format="${
            this.format || this.#format
          }"></color-token>`,
      );
      tmpl.innerHTML = `
${this.styles()}
<div class="label">
${this.label()}
</div>
<div class="collected">
${swatches.join("")}
</div>
`;
    } else {
      tmpl.innerHTML = `
${this.styles()}
<div class="label">
${this.label()}
</div>
<color-token swatch="${this.swatch}" format="${
        this.format || this.#format
      }"></color-token>
`;
    }

    return tmpl.content.cloneNode(true);
  }

  styles() {
    return `
<style>
:host {
  display: block;
  background: ${convert("hex", this.scale ? this.scale[0] : this.swatch)};
}

:host[hidden] {
  display: none;
}

span {
  display: block;
}

.collected, .label, .ref-index {
  background-color: rgba(255, 255, 255, var(--collection-opacity, 0.9));
}

.collected {
  display: flex;
  flex-flow: row wrap;
}

color-token {
  flex: 1;
  flex-basis: var(--color-scale-basis, 24ch);
}

.label {
  --label-font-size: 1.25rem;
  background-color: rgba(255, 255, 255, var(--label-opacity, 0.9));
  font-family: var(--label-family, sans-serif);
  font-size: var(--label-font-size);
  padding: var(--label-padding, 1.25ex);
  text-transform: uppercase;
}

.as, .from, .ref-scale {
  --ref-margin: 1ex;
  margin: var(--ref-margin) 0;
}

.ref-swatch {
  --ref-swatch-size: calc(var(--label-font-size) * 0.8);
  display: inline-block;
  border-radius: var(--ref-swatch-size);
  min-width: var(--ref-swatch-size);
  min-height: var(--ref-swatch-size);
}

.ref-scale {
  display: inline-flex;
  flex-flow: row wrap;
  gap: 0.5ex;
}

.ref-swatch.scale {
  --ref-swatch-scale-size: calc(var(--ref-swatch-size) * 1.2);
  --ref-swatch-scale-padding: 0.35ex;
  --ref-swatch-scale-basis: 1ch;
  flex-basis: var(--ref-swatch-scale-basis);
  text-align: center;
}

.ref-index {
  border-radius: var(--ref-swatch-scale-size);
  font-size: var(--ref-swatch-size);
  padding: var(--ref-swatch-scale-padding);
}

.ref-as {
  background: ${convert("hex", this.swatch)};
}

.ref-from {
  background: ${convert("hex", this.reference || "gray")};
}
</style>
`;
  }

  connectedCallback() {
    // Referencing setup
    if (this.from) {
      this.referenced();
    }

    // Action invocations
    if (this.action === "convert") {
      this.convert();
    }

    if (this.action === "adjust") {
      this.adjust();
    }

    if (this.action === "mix") {
      this.mix();
    }

    if (this.action === "harmony") {
      this.harmony();
    }

    this.shadow.append(this.template());
  }
}

customElements.define("color-defn", ColorDefn);
// ColorDefn:1 ends here

// [[file:Notebook.org::*ColorDict][ColorDict:1]]

// ColorDict:1 ends here
