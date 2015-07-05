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

    private _currentPage: number;
    private _resource: string;
    private _resultsPerPage: number;
    private static _CLASSES = {
      'blogs': 'ez-blog',
    };

    createdCallback() {
      /* Called when component is created */
      if (!this._element)
        EzPagnation.call(this, this);

      // Attributes
      this._resource = this._element.getAttribute('resource');
      this._resultsPerPage =
          parseInt(this._element.getAttribute('resultsPerPage')) || 5;

      // Template
      this._element.appendChild(
          ez.createDocumentFragment(this._template({ page: true })));
      this._pageBarElement = getChild(this._element, '[name=page-bar]');
      this._pageContentElement = getChild(this._element, '[name=page-content]');

      // Server
      this._createServer();

      // Render
      if (this._resource == null) {
        console.warn('Warning! ez-pagnation initialized with no resource!');
      } else {
        this.gotoPage('1');
      }
    }

    get currentPage(): number {
      return this._currentPage;
    }

    set currentPage(newCurrentPage: number) {
      this._currentPage = newCurrentPage;
      this.gotoPage(newCurrentPage.toString());
    }

    get resource(): string {
      return this._resource;
    }

    set resource(newResource: string) {
      this._element.setAttribute('resource', newResource);
      this._createServer();
      this.gotoPage('1');
    }

    get resultsPerPage(): number {
      return this._resultsPerPage;
    }

    public gotoPage(page: string) {
      if (page == '&gt;&gt;')
        this.currentPage = this._pagnationServerElement.numOfPages;
      else if (page == '&lt;&lt;')
        this.currentPage = 1;
      else if (page == '&gt;')
        this.currentPage += 1;
      else if (page == '&lt;')
        this.currentPage -= 1;
      else if (page.match(/\d+/))
        this._render(parseInt(page));
      else
        console.error("Error! page unknown: " + page);
    }

    private _render(page: number): void {
      this._pageContentElement.innerHTML = ''
      if (this._pagnationServerElement.initialized) {
        var results = this._pagnationServerElement.getPage(page)
        for (var i = 0; i < results.length; i++) {
          var newEl: any = document.createElement(
            EzPagnation._CLASSES[this._resource]);
          newEl.model = results[i];
          newEl.serverId = this._pagnationServerElement.getAttribute('id');
          this._pageContentElement.appendChild(newEl);
        }
        this._currentPage = page;

        // scroll to top;
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this._renderPageBar(page);
      } else {
        this._pagnationServerElement.fetch().then((result) => {
          if (result) this.gotoPage('1');
        });
      }
    }

    private _renderPageBar(page: number): void {
      this._pageBarElement.innerHTML = '';

      var numOfPages = this._pagnationServerElement.numOfPages;
      var btnStrings = [];
      if (page > 1)                         // atleast 1 page before
        btnStrings.push('<');
      if (page > 3) {                       // atleast 3 pages before
        btnStrings.push('<<');
        btnStrings.push('...');
      }
      for (var i = 1; i <= numOfPages; i++) {
        if (Math.abs(i - page) < 3)         // within 3 pages before n after
          btnStrings.push(i.toString());
      }
      if ((numOfPages - page) >= 3) {        // atleast 3 pages after
        btnStrings.push('...');
        btnStrings.push('>>');
      }
      if ((numOfPages - page) >= 1)          // atleast 1 page after
        btnStrings.push('>');

      // fix array so current page always in middle
      var left = btnStrings.indexOf(page.toString());
      var right = btnStrings.length - left - 1;
      var diff = right - left;
      if (diff < 0) {
        btnStrings = btnStrings.concat(Array(-1 * diff).join('0').split('0'));
      } else {
        btnStrings = Array(diff).join('0').split('0').concat(btnStrings);
      }

      for (var i = 0; i < btnStrings.length; i++) {
        var goToEl = document.createElement('div');
        if (btnStrings[i] == '...' || btnStrings[i] == '') {
          goToEl.setAttribute('name', 'hold');
        } else if (btnStrings[i] == page.toString()) {
          goToEl.setAttribute('name', 'current');
        } else {
          goToEl.setAttribute('name', 'goto');
          goToEl.addEventListener('click', (e) => {
            this.gotoPage((<HTMLElement>e.target).innerHTML);
          });
        }
        goToEl.innerHTML = btnStrings[i];
        this._pageBarElement.appendChild(goToEl);
      }
    }

    private _createServer(): void {
      this._pagnationServerElement = <EzPagnationServerElement>document.
          createElement('ez-pagnation-server');
      this._pagnationServerElement.setAttribute('id','ez-pagnation-server')
      this._pagnationServerElement.resource = this._resource;
      this._pagnationServerElement.resultsPerPage = this._resultsPerPage;
      this._element.appendChild(this._pagnationServerElement);
    }
  }

  export interface EzPagnationElement extends HTMLElement {
    currentPage: number,
    resource: string,
    resultsPerPage: number,
    gotoPage(page: number)
    /* Component public interfaces in here */
  }

  /* Export Component */
  if (!ez.registered('ez-pagnation'))
    export var EzPagnationElement = ez.registerElement(
        'ez-pagnation', HTMLElement, EzPagnation);
}
