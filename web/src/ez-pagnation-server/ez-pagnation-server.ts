/* Be sure to include dependencies here */
/// <reference path="../ez.ts"/>
/// <reference path="../ez-server/ez-server.ts"/>

module ez {
  class EzPagnationServer extends EzServer {
    constructor(private _pagnationElement: EzPagnationServerElement) {
      super(_pagnationElement);
    }

    private _results: any;
    private _currentPage: number;
    private _resultsPerPage: number;

    createdCallback() {
      /* Called when component is created */
      if (!this._pagnationElement)
        EzPagnationServer.call(this, this);

      // Initialize at 0, meaning no results have been fetched
      this._results = [];
      this._currentPage = 0;
      this._resultsPerPage = 0;
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

    /* NOTE: This double promise - r there performance issues?*/
    public index(resource: string, resultsPerPage?: number): Promise<any> {
      this._results = [];

      return new Promise<any>((resolve, reject) => {
        super.index(resource).then((results) => {
          this._results = results;
          this._currentPage = 1;
          this._resultsPerPage = resultsPerPage;
          resolve(this._findResultsByPage(1));
        });
      })
    }

    public nextPage(): Array<any> {
      if (this._currentPage > 0) {
        var results = this._findResultsByPage(this._currentPage + 1);
        if (results) this._currentPage += 1;
        return results;
      }
      return null;
    }

    public prevPage(): Array<any> {
      if (this._currentPage > 1) {
        this._currentPage -= 1;
        return this._findResultsByPage(this._currentPage);
      }
      return null;
    }

    private _findResultsByPage(page: number): Array<any>{
      return this._results.slice(
        (page - 1) * this._resultsPerPage,
        (page - 1) * this._resultsPerPage + this._resultsPerPage);
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
