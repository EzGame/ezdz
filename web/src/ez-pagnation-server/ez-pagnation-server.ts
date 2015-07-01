/* Be sure to include dependencies here */
/// <reference path="../ez.ts"/>
/// <reference path="../ez-server/ez-server.ts"/>

module ez {
  class EzPagnationServer extends EzServer {
    constructor(private _pagnationElement: EzPagnationServerElement) {
      super(_pagnationElement);
    }

    private _results: any;
    private _currentPage: number

    createdCallback() {
      /* Called when component is created */
      if (!this._pagnationElement)
        EzPagnationServer.call(this, this);

      // Initialize at 0, meaning no results have been fetched
      this._currentPage = 0;
    }

    attachedCallback() {
      /* Called when component is attached to DOM */
    }

    attributeChangedCallback(attr: string, old: string, value: string) {
      /* Called when component has attribute change */
    }

    detachedCallback() {
      /* Called when component is removed from DOM */
    }

    get currentPage(): number {
      return this._currentPage;
    }

    public index(resource: string, resultsPerPage?: number): Promise<any> {
      return super.index(resource);
    }

    public nextPage(): any {
      if (this._currentPage > 0) {
      }
      return null;
    }

    public prevPage(): any {
      if (this._currentPage > 1) {
      }
      return null;
    }
  }

  export interface EzPagnationServerElement extends EzServerElement {
    /* Component public interfaces in here */
    currentPage: number,
    index(resource: string, resultsPerPage?: number) :Promise<any>,
    nextPage(): any,
    prevPage(): any
  }

  /* Export Component */
  export var EzPagnationServerElement = ez.registerElement('ez-pagnation-server', HTMLElement, EzPagnationServer);
}
