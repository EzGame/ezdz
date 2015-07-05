/* Be sure to include dependencies here */
/// <reference path="../ez.ts"/>
/// <reference path="../ez-server/ez-server.ts"/>

module ez {
  class EzPagnationServer extends EzServer {
    constructor(private _serverElement: EzPagnationServerElement) {
      super(_serverElement);
    }

    private _results: any;
    private _resource: string;
    private _resultsPerPage: number;
    private _numOfPages: number;
    private _initialized: boolean;

    createdCallback() {
      /* Called when component is created */
      if (!this._serverElement)
        EzPagnationServer.call(this, this);

      this._results = [];
      this._resource = this._serverElement.getAttribute('resource');
      this._resultsPerPage = parseInt(
          this._serverElement.getAttribute('resultsPerPage'));
      this._numOfPages = 0;
      this._initialized = false;
    }

    set resource(newResource: string) {
      this._resource = newResource;
      this._serverElement.setAttribute('resource', newResource);
    }

    get resource() {
      return this._resource
    }

    set resultsPerPage(newResultsPerPage: number) {
      this._resultsPerPage = newResultsPerPage;
      this._serverElement.setAttribute(
          'resultsPerPage', newResultsPerPage.toString());
    }

    get resultsPerPage(): number {
      return this._resultsPerPage;
    }

    get numOfPages(): number {
      return this._numOfPages;
    }

    get initialized(): boolean {
      return this._initialized;
    }

    public fetch(): Promise<boolean> {
      if (this.resultsPerPage == null) {
        this.resultsPerPage = 5;
      }

      if (this.resource == null) {
        console.warn('Warning! ez-pagnation-server has no resource');
        return Promise.resolve(false);
      }

      return super.index(this.resource).then((results) => {
        this._results = results;
        this._numOfPages = Math.ceil(results.length / this.resultsPerPage);
        this._initialized = true;
        return true;
      }, (error) => {
        return false;
      });
    }

    public getPage(pageNum: number): Array<any> {
      if (pageNum > 0 && pageNum <= this.numOfPages) {
        return this._findResultsByPage(pageNum);
      }
      return null;
    }

    private _findResultsByPage(page: number): Array<any>{
      return this._results.slice(
          (page - 1) * this._resultsPerPage,
          (page - 1) * this._resultsPerPage + this._resultsPerPage
      );
    }
  }

  export interface EzPagnationServerElement extends EzServerElement {
    /* Component public interfaces in here */
    resource: string,
    resultsPerPage: number,
    numOfPages: number,     // readonly
    initialized: boolean,    // readonly
    fetch(): Promise<boolean>,
    getPage(pageNum: number): Array<any>
  }

  /* Export Component */
  if (!ez.registered('ez-pagnation-server'))
    export var EzPagnationServerElement = ez.registerElement(
        'ez-pagnation-server', HTMLElement, EzPagnationServer);
}
