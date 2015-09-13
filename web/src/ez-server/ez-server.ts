/* Be sure to include dependencies here */
/// <reference path="../ez.ts"/>
/* TODO: caching */
/* TODO: ajax backing */

interface ApiParams {
  limit?: number,
  offset?: number,
  sort?: string
}

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

    public search(q: string, options?: ApiParams): Promise<any> {
      options = (options === undefined) ? {} : options;
      options['q'] = q;

      return new Promise<any>((resolve, reject) => {
        $.ajax({
          url: this._constructUrl('search', options),
          success: function(r) { resolve(r); },
          error: function(e) { reject(e); }
        })
      })
    }

    public index(options?: ApiParams): Promise<any> {
      return new Promise<any>((resolve, reject) => {
        $.ajax({
          url: this._constructUrl('index', options),
          success: function(r) { resolve(r); },
          error: function(e) { reject(e); }
        })
      })
    }

    public show(id: string): Promise<any> {
      return new Promise<any>((resolve, reject) => {
        $.ajax({
          url: this._constructUrl('show', { 'id': id }),
          success: function(r) { resolve(r); },
          error: function(e) { reject(e); }
        })
      })
    }

    public get(url: string): Promise<any> {
      return new Promise<any>((resolve, reject) => {
        $.ajax({
          url: url,
          success: function(r) { resolve(r); },
          error: function(e) { reject(e); }
        })
      });
    }

    private _constructUrl(action: string, params: any) :string {
      var base_uri = '/api/' + action + '?'
      if (action == 'show') {
        return base_uri + this._serialize(params);
      } else if (action == 'index') {
        return base_uri + this._serialize(params);
      } else if (action == 'search') {
        return base_uri + this._serialize(params);
      } else {
        return '/'
      }
    }

    private _serialize(params: any) {
      var str = [];
      for (var p in params)
        if (params.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
        }
      return str.join("&");
    }
  }

  export interface EzServerElement extends HTMLElement {
    search(
      q: string,
      options?: ApiParams
    ): Promise<any>;

    index(
      options?: ApiParams
    ): Promise<any>;

    show(
      id: string
    ): Promise<any>;

    get(
      url: string
    ): Promise<any>;
  }

  /* Export Component */
  if (!ez.registered('ez-server'))
    export var EzServerElement = ez.registerElement(
      'ez-server', HTMLElement, EzServer);
}
