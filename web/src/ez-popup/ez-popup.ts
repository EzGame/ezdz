/// <reference path="../ez.ts"/>
// TODO: position
// TODO: close
module ez {
  class Popup {
    constructor(private _element: HTMLElement) {}

    private _template = Handlebars.templates['ez-popup'];

    private _$container: JQuery;

    private _animations: Array<string> = [
      'slideLeft',
      'slideDown',
      'slideRight',
      'slideUp'
    ]

    createdCallback() {
      if (!this._element)
        Popup.call(this, this)

      this._element.innerHTML = '';
      this._element.appendChild(
        ez.createDocumentFragment(this._template({})));

      this._$container = getChild(this._element, '[name=container]');
    }

    attachedCallback() {
      // some default values
      var index = this._animations.indexOf(this.animation);
      this._element.setAttribute('animation',
          (index == -1) ? 'slideUp' : this._animations[index]);
      if (this.width == null)
        this._element.setAttribute('width', '100%');
      if (this.height == null)
        this._element.setAttribute('height', '100%');

      this._element.style.width = this.width;
      this._element.style.height = this.height;
      $(this._element).velocity(this.animation, 300);
    }

    get width(): string {
      return this._element.getAttribute('width');
    }

    get height(): string {
      return this._element.getAttribute('height');
    }

    get animation(): string {
      return this._element.getAttribute('animation');
    }

    set html(newHtml: string) {
      this._$container.html(newHtml);
    }

    get html(): string {
      return this._$container.html();
    }
  }

  export interface EzPopupElement extends HTMLElement {
    width: string;
    height: string;
    animation: string;
    html: string;
  }

  if (!ez.registered('ez-popup'))
    export var EzPopupElement = ez.registerElement(
      'ez-popup', HTMLElement, Popup);
}
