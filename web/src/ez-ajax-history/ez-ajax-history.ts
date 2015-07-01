/* Be sure to include dependencies here */
/// <reference path="../ez.ts"/>

module ez {
  class EzAjaxHistory {
    constructor(private _element: EzAjaxHistoryElement) {}

    _template = Handlebars.templates['ez-ajax-history'];
    private _history: any;

    createdCallback() {
      /* Called when component is created */
      if (!this._element)
        EzAjaxHistory.call(this, this);
    }

    attachedCallback() {
      /* Grab a pointer of window history on attach */
      this._history = window.history;
    }

    attributeChangedCallback(attr: string, old: string, value: string) {
      /* Called when component has attribute change */
    }

    detachedCallback() {
      /* Called when component is removed from DOM */
      this._history = null;
    }

    public pushState(state: any, url: string) {
      this._history.pushState(state, "", url);
      // TODO: cache images
    }
  }

  export interface EzAjaxHistoryElement extends HTMLElement {
    /* Component public interfaces in here */
    pushState(state: any, title: string, url: string): void,
    popState()
  }

  /* Export Component */
  export var EzAjaxHistoryElement = ez.registerElement('ez-ajax-history', HTMLElement, EzAjaxHistory);
}
