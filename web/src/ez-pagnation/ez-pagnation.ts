/* Be sure to include dependencies here */
/// <reference path="../ez.ts"/>
/// <reference path="../ez-pagnation-server/ez-pagnation-server.ts"/>
/// <reference path="../ez-blog/ez-blog.ts"/>
// TODO: infinite scroll mode
// TODO: masonary mode (REALLY COOL)

module ez {
  class EzPagnation {
    constructor(private _element: EzPagnationElement) {}

    _template = Handlebars.templates['ez-pagnation'];

    private _pageBarElement: HTMLDivElement;
    private _pageContentElement: HTMLDivElement;
    private _pagnationServerElement: EzPagnationServerElement;
    private _resource: string;
    private _resultsPerPage: number;
    public static CLASSES = {
      'blogs': EzBlogElement
    };

    createdCallback() {
      /* Called when component is created */
      if (!this._element)
        EzPagnation.call(this, this);

      this._element.appendChild(
          ez.createDocumentFragment(this._template({page: true})));
      this._pageBarElement = getChild(
          this._element, '[name=page-bar]');
      this._pageContentElement = getChild(
          this._element, '[name=page-content]');
      this._pagnationServerElement = getChild(
          this._element, '[id=ez-pagnation-server]');

      this._resultsPerPage =
          parseInt(this._element.getAttribute('resultsPerPage')) || 5;

      if (this._element.getAttribute('resource')) {
        this._resource = this._element.getAttribute('resource');
        this._render();
      } else {
        console.warn('Warning! ez-pagnation initialized with no resource!');
      }
    }

    get resource(): string {
      return this._resource;
    }

    set resource(newResource: string) {
      this._element.setAttribute('resource', newResource);
    }

    get resultsPerPage(): number {
      return this._resultsPerPage;
    }

    attachedCallback() {
      /* Called when component is attached to DOM */
    }

    attributeChangedCallback(attr: string, old: string, value: string) {
      /* Called when component has attribute change */
      if (attr == 'resultsPerPage') {
        console.error('Error! ez-pagnation cannot change resultsPerPage!');
      }
    }

    detachedCallback() {
      /* Called when component is removed from DOM */
    }

    private _render() {
      this._pagnationServerElement.index(this._resource, this._resultsPerPage).
          then((results) => {
        for (var i = 0; i < results.length; i++) {
          var newEl = new EzPagnation.CLASSES[this._resource];
          newEl.model = results[i];
          newEl.serverId = this._pagnationServerElement.getAttribute('id');
          this._pageContentElement.appendChild(newEl);
        }
      });
    }
  }

  export interface EzPagnationElement extends HTMLElement {
    resource: string,
    resultsPerPage: number
    /* Component public interfaces in here */
  }

  /* Export Component */
  export var EzPagnationElement = ez.registerElement('ez-pagnation', HTMLElement, EzPagnation);
}
