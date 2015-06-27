/* Be sure to include dependencies here */
/// <reference path="../ez.ts"/>
/// <reference path="../ez-server/ez-server.ts"/>

module ez {
  class EzBlog {
    constructor(
        private _element: EzBlogElement,
        private _model: any) {}

    private _template = Handlebars.templates['ez-blog'];
    private _titleElement: HTMLHeadingElement;
    private _firstPhotoElement: HTMLImageElement;
    private _dateElement: HTMLDivElement;
    private _bodyElement: HTMLDivElement;
    private _photosElement: HTMLDivElement;
    private _server: EzServerElement;

    createdCallback() {
      /* Called when component is created */
      if (!this._element)
        EzBlog.call(this, this);

      this._render();
      this._server = <EzServerElement>document.
          querySelector('#' + this.serverId);
      this._server.find(parseInt(this.id)).
          then((model) => { this.model = model; });
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
      this._server.find(parseInt(newId)).
          then((model) => { this.model = model; });
    }

    get id(): string{
      return this._element.getAttribute('id');
    }

    set serverId(newServerId: string) {
      this._element.setAttribute('serverId', newServerId);
      this._server = <EzServerElement>document.
          querySelector('#' + newServerId);
      if (this._server.resource != 'blogs') {
        throw('ERROR: This server is not setup for blogs!');
      }
    }

    get serverId() :string {
      return this._element.getAttribute('serverId');
    }

    set model(newModel: any) {
      this._model = newModel;
      this._render();

      this._titleElement.innerHTML = this._model.title;
      this._dateElement.innerHTML = this._model.date;
      this._firstPhotoElement.src = this._model.first_photo;
      this._bodyElement.innerHTML = this._model.body;

      // could probably be its own component
      if (this._model.photos && this._photosElement) {
        for (var i = 0; i < this._model.photos.length; i++) {
          var el = document.createElement('img');
          el.src = this._model.photos[i];
          this._photosElement.appendChild(el);
        }
      }
    }

    get model(): any {
      return this._model;
    }

    private _render(): void {
      if (this._model) {
        var viewModel = this._model;

        this._element.innerHTML = '';
        this._element.appendChild(
            ez.createDocumentFragment(this._template(viewModel)));

        // grab
        this._titleElement = getChild(this._element, '[name=title]');
        this._dateElement = getChild(this._element, '[name=date]');
        this._firstPhotoElement = getChild(this._element, '[name=first-photo]');
        this._bodyElement = getChild(this._element, '[name=body]');
        // could probably be its own component
        this._photosElement = getChild(this._element, '[name=photos]');
      }
    }
  }

  export interface EzBlogElement extends HTMLElement {
    /* Component public interfaces in here */
  }

  /* Export Component */
  export var EzBlogElement = ez.registerElement('ez-blog', HTMLElement, EzBlog);
}
