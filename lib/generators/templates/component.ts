/* Be sure to include dependencies here */
/// <reference path="../ez.ts"/>

module ez {
  class XComponentX {
    constructor(private _element: XComponentXElement) {}

    _template = Handlebars.templates['XcomponentX'];

    createdCallback() {
      /* Called when component is created */
      if (!this._element)
        XComponentX.call(this, this);

      this._element.appendChild(ez.createDocumentFragment(this._template({})));
    }

    attachedCallback() {
      /* Called when component is attached to DOM */
    }

    attributeChangedCallback(attr: string, old: string, value: string) {
      /* Called when component has attribute change */
    }

    detachedCallback() {
      /* Called when component is removed from DOM */
    }
  }

  export interface XComponentXElement extends HTMLElement {
    /* Component public interfaces in here */
  }

  /* Export Component */
  if (!ez.registered('XcomponentX'))
    export var XComponentXElement = ez.registerElement('XcomponentX', HTMLElement, XComponentX);
}
