/// <reference path="../ez.ts"/>

module ez {
  class Spinner {
    constructor(private _element: EzSpinnerElement) { }

    _template = Handlebars.templates['ez-spinner'];
    private _href: string;
    private _title: string
    public onStop: Function;

    createdCallback() {
      /* Called when component is created */
      if (!this._element) Spinner.call(this, this);

      this._element.innerHTML = '';
      this._element.appendChild(
        ez.createDocumentFragment(this._template({})));
    }

    public start() {
      $(this._element).velocity('fadeIn', 300);
    }

    public stop() {
      $(this._element).velocity('fadeOut', 300, () => {
        if (this.onStop) this.onStop();
      });
    }
  }

  export interface EzSpinnerElement extends HTMLElement {
    start(): void;
    stop(): void;
    onStop: Function;
  }

  if (!ez.registered('ez-spinner'))
    export var EzSpinnerElement = ez.registerElement('ez-spinner', HTMLElement, Spinner);
}
