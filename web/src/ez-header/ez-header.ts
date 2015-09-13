/// <reference path="../ez.ts"/>

module ez {
  class Header {
    constructor(private _element: EzHeaderElement) { }

    private _template = Handlebars.templates['ez-header'];
    private _$img: JQuery;
    private _$text: JQuery;

    createdCallback() {
      if (!this._element)
        Header.call(this, this);

      this._element.innerHTML = '';
      this._element.appendChild(
        ez.createDocumentFragment(this._template({})));

      this._$img = getChild(this._element, '[name=img]');
      this._$text = getChild(this._element, '[name=text]');
    }

    attachedCallback() {
      this._$text.html(this.title);
      this._$img.css('background-image', 'url(' + this.src + ')');
    }

    set title(newTitle: string) {
      this._element.setAttribute('title', newTitle);
      this._$text.html(newTitle);
    }

    get title(): string {
      return this._element.getAttribute('title');
    }

    set src(newSrc: string) {
      this._element.setAttribute('src', newSrc);
      this._$img.css('background-image', 'url(' + newSrc + ')');
    }

    get src(): string {
      return this._element.getAttribute('src');
    }
  }

  export interface EzHeaderElement extends HTMLElement {
    title: string;
    src: string;
  }

  if (!ez.registered('ez-header'))
    export var EzHeaderElement = ez.registerElement(
      'ez-header', HTMLElement, Header);
}