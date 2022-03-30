// [[file:Notebook.org::*Color Element Setup][Color Element Setup:1]]
import {
  ColorContrast,
  ColorDefn,
  ColorDict,
  ColorIlluminant,
  ColorToken,
  ColorVision,
  PaletteToken,
} from "./lib/color.js";

customElements.define("color-token", ColorToken);
customElements.define("palette-token", PaletteToken);

// Export components for custom naming

// Add init function to invoke internals when setting custom names
export function init() {
  customElements.define("color-token", ColorToken);
  customElements.define("palette-token", PaletteToken);
}

export { ColorContrast, ColorDefn, ColorDict, ColorIlluminant, ColorVision };
// Color Element Setup:1 ends here

// [[file:Notebook.org::*=<color-defn>= Implementation][=<color-defn>= Implementation:1]]
customElements.define("color-defn", ColorDefn);
// =<color-defn>= Implementation:1 ends here

// [[file:Notebook.org::*=<color-vision>= Implementation][=<color-vision>= Implementation:1]]
customElements.define("color-vision", ColorVision);
// =<color-vision>= Implementation:1 ends here

// [[file:Notebook.org::*=<color-contrast>= Implementation][=<color-contrast>= Implementation:1]]
customElements.define("color-contrast", ColorContrast);
// =<color-contrast>= Implementation:1 ends here

// [[file:Notebook.org::*=<color-illuminant>= Implementation][=<color-illuminant>= Implementation:1]]
customElements.define("color-illuminant", ColorIlluminant);
// =<color-illuminant>= Implementation:1 ends here

// [[file:Notebook.org::*=<color-dict>= Implementation][=<color-dict>= Implementation:1]]
customElements.define("color-dict", ColorDict);
// =<color-dict>= Implementation:1 ends here
