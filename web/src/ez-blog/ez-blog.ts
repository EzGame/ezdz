/* Be sure to include dependencies here */
/// <reference path="../ez.ts"/>

module ez {
  class EzBlog {
    constructor(
      private _element: EzBlogElement,
      private _model: any) { }

    private _template = Handlebars.templates['ez-blog'];

    createdCallback() {
      /* Called when component is created */
      if (!this._element)
        EzBlog.call(this, this);
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

  export interface EzBlogElement extends HTMLElement {
    render(): void;
  };

  /* Export Component */
  if (!ez.registered('ez-blog'))
    export var EzBlogElement = ez.registerElement('ez-blog', HTMLElement, EzBlog);
}
