/* Be sure to include dependencies here */
/// <reference path="../ez.ts"/>
/* TODO: caching */
/* TODO: ajax backing */
module ez {
  class EzServer {
    constructor(private _element: EzServerElement) {}

    _template = Handlebars.templates['ez-server'];

    createdCallback() {
      /* Called when component is created */
      if (!this._element)
        EzServer.call(this, this);
    }

    attachedCallback() {
      /* Called when component is attached to DOM */
    }

    attributeChangedCallback(attr: string, old: string, value: string) {
    }

    detachedCallback() {
      /* Called when component is removed from DOM */
    }

    set id(newId: string) {
      this._element.setAttribute('id', newId);
    }

    get id() :string {
      return this._element.getAttribute('id');
    }

    set resource(newResource: string) {
      this._element.setAttribute('resource', newResource);
    }

    get resource() :string {
      return this._element.getAttribute('resource');
    }

    public find(id: number) :Promise<any> {
      return new Promise<any>((resolve, reject) => {
        $.ajax({
          url: this._constructUrl('show', {id: id}),
          success: function(response) {
            resolve(response);
          },
          error: function(error) {
            reject(error);
          }
        });
      });
    }

    public index() :Promise<any> {
      return new Promise<any>((resolve, reject) => {
        $.ajax({
          url: this._constructUrl('index'),
          success: function(response) {
            resolve(response);
          },
          error: function(error) {
            reject(error);
          }
        });
      });
    }

    public search() :Promise<any> {
      // TODO
      return undefined
    }

    private _constructUrl(action: string, params?: any) :string {
      /* TODO: Auto params appending */
      if (action == 'show') {
        return '/' + this.resource + '/' + params.id;
      } else if (action == 'index') {
        return '/' + this.resource;
      }
    }
  }

  export interface EzServerElement extends HTMLElement {
    resource: string,
    find(id: number): Promise<any>,
    index(): Promise<any>
  }

  /* Export Component */
  export var EzServerElement = ez.registerElement('ez-server', HTMLElement, EzServer);
}
