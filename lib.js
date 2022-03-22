// [[file:Notebook.org::*DSL Setup][DSL Setup:2]]
export function connected(DslElement) {
  return class extends DslElement {
    constructor() {
      super();
    }

    safeSetAttribute(name, value) {
      if (this.getAttribute(name) !== value) this.setAttribute(name, value);
    }

    // Definition and referencing are constant on every DSL element
    set as(value) {
      this.safeSetAttribute("as", value);
    }

    get as() {
      return this.getAttribute("as");
    }

    set from(value) {
      this.safeSetAttribute("from", value);
    }

    get from() {
      return this.getAttribute("from");
    }
  };
}

export function reactive(props, DslElement) {
  return class extends DslElement {
    // as and from are always observed
    static get observedAttributes() {
      return ["as", "from", ...props];
    }

    // set initial update behavior
    attributeChangedCallback(name, oldValue, newValue) {
      this[name] = newValue;
    }
  };
}
// DSL Setup:2 ends here

// [[file:Notebook.org::*Color (=<color-def>=)][Color (=<color-def>=):1]]

// Color (=<color-def>=):1 ends here
