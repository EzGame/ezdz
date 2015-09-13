/* Be sure to include dependencies here */
/// <reference path="../ez.ts"/>

module ez {
  class EzPost {
    constructor(
      private _element: EzPostElement,
      private _model: any) { }

    private _template = Handlebars.templates['ez-post'];

    createdCallback() {
      /* Called when component is created */
      if (!this._element)
        EzPost.call(this, this);
    }

    attachedCallback() {
      this.render();
    }

    public render(): void {
      var model = JSON.parse($.trim(this._element.innerHTML))
      this._element.innerHTML = '';
      this._element.appendChild(
          ez.createDocumentFragment(this._template(model)));
    }
  }

  export interface EzPostElement extends HTMLElement {
    render(): void;
  };

  /* Export Component */
  if (!ez.registered('ez-post'))
    export var EzPostElement = ez.registerElement('ez-post', HTMLElement, EzPost);
}
