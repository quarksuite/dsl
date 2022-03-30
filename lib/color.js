// [[file:../Notebook.org::*Color][Color:1]]
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
// Color:1 ends here

// [[file:../Notebook.org::*Mixins][Mixins:1]]
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
        this.accented = this.accented;
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
      value !== null
        ? this.setAttribute("accented", "")
        : this.removeAttribute("accented");
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

function initPalette(Element) {
  return class extends Element {
    constructor() {
      super();

      this.palette = this.palette;

      this.configuration = this.configuration;

      if (
        this.configuration === "material" ||
        this.configuration === "artistic"
      ) {
        this.contrast = this.contrast;
        this.stated = this.stated;
      }

      if (this.configuration === "material") {
        this.accented = this.accented;
      }

      if (this.configuration === "artistic") {
        this.tints = this.tints;
        this.tones = this.tones;
        this.shades = this.shades;
      }
    }

    // Palette configuration accessor
    set configuration(value) {
      this.reflect("configuration", value);
    }

    get configuration() {
      return this.getAttribute("configuration");
    }

    // Shared configuration accessors
    set contrast(value) {
      this.reflect("contrast", value);
    }

    get contrast() {
      return this.getAttribute("contrast");
    }

    set stated(value) {
      value !== null
        ? this.setAttribute("stated", "")
        : this.removeAttribute("stated");
    }

    get stated() {
      return this.getAttribute("stated");
    }

    // Material configuration accessor
    set accented(value) {
      value !== null
        ? this.setAttribute("accented", "")
        : this.removeAttribute("accented");
    }

    get accented() {
      return this.getAttribute("accented");
    }

    // Artistic configuration accessors
    set tints(value) {
      this.reflect("tints", value);
    }

    get tints() {
      return this.getAttribute("tints");
    }

    set tones(value) {
      this.reflect("tones", "");
    }

    get tones() {
      return this.getAttribute("tones");
    }

    set shades(value) {
      this.reflect("shades", "");
    }

    get shades() {
      return this.getAttribute("shades");
    }
  };
}

function palette_actions(Element) {
  return class extends Element {
    constructor() {
      super();

      this.action = this.action;

      // Accessibility action
      if (this.action === "a11y") {
        // Mode
        this.mode = this.mode;

        if (this.mode === "standard" || this.mode === "custom") {
          this.dark = this.dark;
        }

        if (this.mode === "standard") {
          this.rating = this.rating;
          this.large = this.large;
        }

        if (this.mode === "custom") {
          this.min = this.min;
          this.max = this.max;
        }
      }
    }

    // Action accessor
    set action(value) {
      this.reflect("action", value);
    }

    get action() {
      return this.getAttribute("action");
    }

    // Mode accessor
    set mode(value) {
      this.reflect("mode", value);
    }

    get mode() {
      return this.getAttribute("mode");
    }

    // Dark toggle accessor
    set dark(value) {
      value !== null
        ? this.setAttribute("dark", "")
        : this.removeAttribute("dark");
    }

    get dark() {
      return this.getAttribute("dark");
    }

    // Standard (WCAG) mode accessors
    set rating(value) {
      this.reflect("rating", value);
    }

    get rating() {
      return this.getAttribute("rating");
    }

    set large(value) {
      value !== null
        ? this.setAttribute("large", "")
        : this.removeAttribute("large");
    }

    get large() {
      return this.getAttribute("large");
    }

    // Custom mode accessors
    set min(value) {
      this.reflect("min", value);
    }

    get min() {
      return this.getAttribute("min");
    }

    set max(value) {
      this.reflect("max", value);
    }

    get max() {
      return this.getAttribute("max");
    }
  };
}
// Mixins:1 ends here

// [[file:../Notebook.org::*ColorToken][ColorToken:1]]
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

export class ColorToken extends color_token(HTMLElement) {
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
  --swatch-size: 32vh;
  flex: 1;
  min-width: var(--swatch-size);
  min-height: var(--swatch-size);
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
// ColorToken:1 ends here

// [[file:../Notebook.org::*PaletteToken][PaletteToken:1]]
export class PaletteToken extends observed(["label"], ColorToken) {
  constructor() {
    super();

    this.label = this.label;
  }

  set label(value) {
    this.reflect("label", value);
  }

  get label() {
    return this.getAttribute("label");
  }

  template() {
    const tmpl = document.createElement("template");

    tmpl.innerHTML = `
${this.styles()}
<div class="color"></div>
<div class="data"><span class="value">${this.label}: <code>${this.swatch}</code></span></div>
`;

    return tmpl.content.cloneNode(true);
  }

  // Styles
  styles() {
    return `<style>
:host {
  display: flex;
  flex-flow: row wrap;
  background-color: ${this.compatible(this.swatch)};
}

:host[hidden] {
  display: none;
}

code {
  display: inline;
  font-family: var(--code-family, monospace);
  text-transform: lowercase;
}

.color {
  --swatch-size: 32vh;
  flex: 1;
  min-width: var(--swatch-size);
  min-height: var(--swatch-size);
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
</style>`;
  }
}
// PaletteToken:1 ends here

// [[file:../Notebook.org::*ColorDefn][ColorDefn:1]]
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
  #from = "";
  #format = "hex rgb hsl";

  // Referencing
  referenced() {
    const collected = this.from.split(" ");
    const indexedRef = this.from.split(".");
    let ref = document.querySelector(
      `${
        this.from.includes(".")
          ? `[as^="${indexedRef[0]}"]` // scale index
          : `[as="${this.from}"]` // scale or value
      }`,
    );

    if (collected.length > 1) {
      // Destrcutured reference
      this.referenceScale = collected.map((ref) => {
        const indexed = ref.split(".");
        const [, index] = indexed;

        // Indexed destructured reference
        if (index) {
          return document.querySelector(`[as^="${indexed[0]}"]`).scale[index];
        }

        // Value destructured reference
        return document.querySelector(`[as="${ref}"]`).getAttribute("swatch");
      });

      this.scale = this.referenceScale;
      this.reference = this.scale[0];
    } else if (ref.scale && ref.scale.length) {
      // Indexed scale reference

      if (indexedRef.length > 1) {
        const [, index] = indexedRef;
        this.reference = ref.scale[index];
      } else {
        // Full scale reference

        this.referenceScale = ref.scale;
        this.scale = this.referenceScale;
        this.reference = ref.getAttribute("swatch");
      }
    } else {
      // Value reference

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
<span class="from"><span class="ref-swatch ref-from"></span> ${
        this.from || this.#from
      }</span>
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
  flex-basis: var(--color-scale-basis, 45ch);
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
// ColorDefn:1 ends here

// [[file:../Notebook.org::*ColorVision][ColorVision:1]]
const observedVision = preset(observed, ["method", "type", "severity"]);

export class ColorVision extends observedVision(ColorDefn) {
  constructor() {
    super();

    this.method = this.method;
    this.type = this.type;
    this.severity = this.severity;
  }

  #method = "brettel";
  #severity = 0;

  set method(value) {
    this.reflect("method", value);
  }

  get method() {
    return this.getAttribute("method");
  }

  set type(value) {
    this.reflect("type", value);
  }

  get type() {
    return this.getAttribute("type");
  }

  set severity(value) {
    this.reflect("severity", value);
  }

  get severity() {
    return this.getAttribute("severity");
  }

  referenced() {
    super.referenced();
  }

  vision() {
    const as = this.type;
    const method = this.method || this.#method;
    const severity = parseFloat(this.severity || this.#severity);
    const steps = parseFloat(this.steps);

    // Propagated vision check
    if (this.scale && this.scale.length) {
      this.scale = propagate(
        preset(vision, { as, method, severity }),
        this.scale,
      );
    }

    // Interpolated vision check
    if (steps) {
      this.scale = vision({ as, method, severity, steps }, this.swatch);
    }

    // Set name as vision type
    if (this.from) {
      this.as = `${this.from} &bull; ${as} ${
        severity ? `(severity: ${severity})` : ""
      }`;
    } else {
      this.as = `${as} (${severity ? `severity: ${severity}` : ""})`;
    }

    this.swatch = vision({ as, method, severity }, this.swatch);
  }

  connectedCallback() {
    if (this.from) {
      this.referenced();
    }

    // Activate vision check
    this.vision();

    this.shadow.append(this.template());
  }
}
// ColorVision:1 ends here

// [[file:../Notebook.org::*ColorContrast][ColorContrast:1]]
const observedContrast = preset(observed, ["factor", "severity"]);

export class ColorContrast extends observedContrast(ColorDefn) {
  constructor() {
    super();

    this.factor = this.factor;
    this.severity = this.severity;
  }

  #severity = 0;

  set factor(value) {
    this.reflect("factor", value);
  }

  get factor() {
    return this.getAttribute("factor");
  }

  set severity(value) {
    this.reflect("severity", value);
  }

  get severity() {
    return this.getAttribute("severity");
  }

  referenced() {
    super.referenced();
  }

  contrast() {
    const factor = parseFloat(this.factor);
    const severity = parseFloat(this.severity || this.#severity);
    const steps = parseFloat(this.steps);

    // Propagated contrast check
    if (this.scale && this.scale.length) {
      this.scale = propagate(
        preset(contrast, { factor, severity }),
        this.scale,
      );
    }

    // Interpolated contrast check
    if (steps) {
      this.scale = contrast({ factor, severity, steps }, this.swatch);
    }

    // Set name as contrast factor
    if (this.from) {
      this.as =
        `${this.from} &bull contrast (factor: ${factor}% severity: ${severity}%)`;
    } else {
      this.as = `contrast: (factor: ${factor}% severity: ${severity}%)`;
    }

    this.swatch = contrast({ factor, severity }, this.swatch);
  }

  connectedCallback() {
    if (this.from) {
      this.referenced();
    }

    // Activate contrast check
    this.contrast();

    this.shadow.append(this.template());
  }
}
// ColorContrast:1 ends here

// [[file:../Notebook.org::*ColorIlluminant][ColorIlluminant:1]]
const observedIlluminant = preset(observed, ["temperature", "intensity"]);

export class ColorIlluminant extends observedIlluminant(ColorDefn) {
  constructor() {
    super();

    this.temperature = this.temperature;
    this.intensity = this.intensity;
  }

  #temperature = 1850;
  #intensity = 0;

  set temperature(value) {
    this.reflect("temperature", value);
  }

  get temperature() {
    return this.getAttribute("temperature");
  }

  set intensity(value) {
    this.reflect("intensity", value);
  }

  get intensity() {
    return this.getAttribute("intensity");
  }

  referenced() {
    super.referenced();
  }

  illuminant() {
    const K = parseFloat(this.temperature || this.#temperature);
    const intensity = parseFloat(this.intensity || this.#intensity);
    const steps = parseFloat(this.steps);

    // Propagated illuminant check
    if (this.scale && this.scale.length) {
      this.scale = propagate(preset(illuminant, { K, intensity }), this.scale);
    }

    // Interpolated illuminant check
    if (steps) {
      this.scale = illuminant({ K, intensity, steps }, this.swatch);
    }

    // Set name as illuminant temperature
    if (this.from) {
      this.as = `${this.from} &bull; ${K}k (${intensity}%)`;
    } else {
      this.as = "${K}k (${intensity}%)";
    }

    this.swatch = illuminant({ K, intensity }, this.swatch);
  }

  connectedCallback() {
    if (this.from) {
      this.referenced();
    }

    // Activate illuminant check
    this.illuminant();

    this.shadow.append(this.template());
  }
}
// ColorIlluminant:1 ends here

// [[file:../Notebook.org::*ColorDict][ColorDict:1]]
const observedPalette = preset(observed, [
  "palette",
  "configuration",
  "contrast",
  "stated",
  "accented",
  "tints",
  "tones",
  "shades",
]);

const observedPaletteAccessibility = preset(observed, [
  "mode",
  "dark",
  "rating",
  "large",
  "min",
  "max",
]);

const color_dict = process(
  reflected,
  observedPalette,
  observedPaletteAccessibility,
  initPalette,
  palette_actions,
);

export class ColorDict extends color_dict(ColorDefn) {
  constructor() {
    super();
  }

  #configuration = "material";
  #contrast = 100;

  #tints = 3;
  #tones = 3;
  #shades = 3;

  #mode = "standard";
  #rating = "AA";

  #min = 75;
  #max = 95;

  // Palette creation

  create() {
    // Shared
    const configuration = this.configuration || this.#configuration;
    const contrast = parseFloat(this.contrast || this.#contrast);
    const stated = this.stated === "" ? true : false;

    if (configuration === "artistic") {
      const [tints, tones, shades] = [
        this.tints || this.#tints,
        this.tones || this.#tones,
        this.shades || this.#shades,
      ].map((prop) => parseFloat(prop));

      this.palette = palette(
        {
          configuration: "artistic",
          contrast,
          tints,
          tones,
          shades,
          stated,
        },
        this.swatch,
      );
    }

    if (configuration === "material") {
      const accented = this.accented === "" ? true : false;

      this.palette = palette(
        {
          configuration: "material",
          contrast,
          accented,
          stated,
        },
        this.swatch,
      );
    }
  }

  // Accessibility action handler
  a11y() {
    // Shared
    const mode = this.mode || this.#mode;
    const dark = this.dark === "" ? true : false;

    if (mode === "custom") {
      const [min, max] = [this.min || this.#min, this.max || this.#max].map(
        (prop) => parseFloat(prop),
      );

      this.palette = accessibility({ mode: "custom", min, max, dark });
    }

    if (mode === "standard") {
      const rating = this.rating || this.#rating;
      const large = this.large === "" ? true : false;

      this.palette = accessibility(
        { mode: "standard", rating, large, dark },
        this.palette,
      );
    }
  }

  renderSwatch(label, swatch) {
    return `
      <palette-token label="${label}" swatch="${swatch}"></palette-token>
`;
  }

  renderPalette() {
    if (this.configuration === "material") {
      const [surface, [variants, accents], state] = this.palette;

      return `
<div class="palette material">
  <div class="surface">
${
        surface
          .map((swatch, index) => {
            const labels = ["bg", "fg"];
            return this.renderSwatch(labels[index], swatch);
          })
          .join("")
      }
  </div>
  <div class="variants">
<div class="main">
${
        variants
          .map((swatch, index) => {
            return this.renderSwatch(
              index === 0 ? 50 : String(index).concat("00"),
              swatch,
            );
          })
          .join("")
      }
</div>
${
        accents.length
          ? `<div class="accents">${
            accents
              .map((swatch, index) => {
                return this.renderSwatch(
                  "a".concat(String(++index) + "00"),
                  swatch,
                );
              })
              .join("")
          }</div>`
          : ""
      }
  </div>
  ${
        state.length
          ? `
        <div class="states">
        <div class="label">state</div>
        ${
            state
              .map((swatch, index) => {
                const labels = ["pending", "success", "warning", "error"];

                return this.renderSwatch(labels[index], swatch);
              })
              .join("")
          }
      </div>
        `
          : ""
      }
    </div>
      `;
    }

    if (this.configuration === "artistic") {
      const [surface, [tints, tones, shades], state] = this.palette;
      return `<div class="palette artistic">
  <div class="surface">
${
        surface
          .map((swatch, index) => {
            const labels = ["bg", "fg"];
            return this.renderSwatch(labels[index], swatch);
          })
          .join("")
      }
  </div>
${
        tints.length || tones.length || shades.length
          ? `
        <div class="variants">
        ${`<div class="tints">
<div class="label">tints</div>
${
            tints
              .map((swatch, index) => {
                return this.renderSwatch(String(++index).concat("00"), swatch);
              })
              .join("")
          }</div>`}
      ${`<div class="tones">
<div class="label">tones</div>
${
            tones
              .map((swatch, index) => {
                return this.renderSwatch(String(++index).concat("00"), swatch);
              })
              .join("")
          }</div>`}
      ${`<div class="shades">
<div class="label">shades</div>
${
            shades
              .map((swatch, index) => {
                return this.renderSwatch(String(++index).concat("00"), swatch);
              })
              .join("")
          }</div>`}
      </div>
        `
          : ""
      }
  ${
        state.length
          ? `
        <div class="states">
        <div class="label">state</div>
        ${
            state
              .map((swatch, index) => {
                const labels = ["pending", "success", "warning", "error"];

                return this.renderSwatch(labels[index], swatch);
              })
              .join("")
          }
      </div>
        `
          : ""
      }
    </div>`;
    }
  }

  template() {
    const tmpl = document.createElement("template");

    tmpl.innerHTML = `
    ${this.styles()}
      <div class="label">${this.label()}</div>
      <div class="tokens">
      ${this.renderPalette()}
      </div>
`;

    return tmpl.content.cloneNode(true);
  }

  styles() {
    return `<style>
:host {
  display: flex;
  flex-flow: row wrap;
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

palette-token {
  flex: 1;
  flex-basis: var(--color-scale-basis, 45ch);
}

.label {
  --label-font-size: 1.25rem;
  background-color: rgba(${
      this.dark === "" ? "0, 0, 0" : "255, 255, 255"
    }, var(--label-opacity, 0.8));
  ${
      this.dark === ""
        ? "color: rgba(255, 255, 255, var(--label-opacity, 0.9));"
        : ""
    }
  flex: 1;
  flex-basis: 100%;
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

.material, .artistic {
display: flex;
flex-flow: row wrap;
flex: 1;
}

.surface, .variants, .states {
  flex-basis: 100%;
}

.surface, .tints, .tones, .shades {
  display: flex;
  flex-flow: row wrap;
}
</style>`;
  }

  connectedCallback() {
    if (this.from) {
      this.referenced();
    }

    // Create the palette
    this.create();

    // Apply accessibility filtering where applicable
    if (this.action === "a11y") {
      this.a11y();
    }

    // Tokenize the output
    this.tokens = { [this.as ? this.as : "color"]: tokens(this.palette) };

    super.connectedCallback();
  }
}
// ColorDict:1 ends here