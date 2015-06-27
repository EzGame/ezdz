/* Be sure to include dependencies here */
/// <reference path="../ez.ts"/>
/* TODO: caching */
/* TODO: ajax backing */
module ez {
  class EzServer {
    constructor(private _element: EzServerElement) {}

    _template = Handlebars.templates['ez-server'];

    private _resource: string;

    createdCallback() {
      /* Called when component is created */
      if (!this._element)
        EzServer.call(this, this);
    }

    attachedCallback() {
      /* Called when component is attached to DOM */
      if (this._element.getAttribute('resource') == null) {
        this._element.setAttribute('resource', 'blogs');
      }
    }

    attributeChangedCallback(attr: string, old: string, value: string) {
      if (attr == 'resource') {
        this.resource = value;
      }
    }

    detachedCallback() {
      /* Called when component is removed from DOM */
    }

    set resource(newResource: string) {
      this._resource = newResource;
    }

    get resource() :string {
      return this._resource;
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

    private _constructUrl(action: string, params?: any) :string {
      if (action == 'show') {
        return '/' + this._resource + '/' + params.id;
      } else if (action == 'index') {
        return '/' + this._resource + '/';
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
