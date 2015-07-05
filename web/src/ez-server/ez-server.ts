/* Be sure to include dependencies here */
/// <reference path="../ez.ts"/>
/* TODO: caching */
/* TODO: ajax backing */
module ez {
  export class EzServer {
    constructor(private _element: EzServerElement) {}

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

    public find(resource: string, id: number) :Promise<any> {
      return new Promise<any>((resolve, reject) => {
        $.ajax({
          url: this._constructUrl(resource, 'show', {id: id}),
          success: function(response) {
            resolve(response);
          },
          error: function(error) {
            reject(error);
          }
        });
      });
    }

    public index(resource: string): Promise<any> {
      return new Promise<any>((resolve, reject) => {
        $.ajax({
          url: this._constructUrl(resource, 'index'),
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

    private _constructUrl(resource: string, action: string,
      params?: any) :string {
      /* TODO: Auto params appending */
      if (action == 'show') {
        return '/api/' + resource + '/' + params.id;
      } else if (action == 'index') {
        return '/api/' + resource;
      }
    }
  }

  export interface EzServerElement extends HTMLElement {
    find(resource: string, id: number): Promise<any>,
    index(resource: string): Promise<any>
  }

  /* Export Component */
  if (!ez.registered('ez-server'))
    export var EzServerElement = ez.registerElement('ez-server', HTMLElement, EzServer);
}
