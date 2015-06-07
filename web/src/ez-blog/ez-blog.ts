/* Be sure to include dependencies here */
/// <reference path="../ez.ts"/>

module ez {
  class EzBlog {
    constructor(private _element: EzBlogElement) {}

    _template = Handlebars.templates['ez-blog'];

    createdCallback() {
      /* Called when component is created */
      if (!this._element)
        EzBlog.call(this, this);

      this._element.appendChild(ez.createDocumentFragment(this._template));
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

  export interface EzBlogElement extends HTMLElement {
    /* Component public interfaces in here */
  }

  /* Export Component */
  export var EzBlogElement = ez.registerElement('ez-blog', HTMLElement, EzBlog);
}