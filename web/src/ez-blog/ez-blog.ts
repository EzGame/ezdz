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
    private _tagsElement: HTMLDivElement;

    private _server: EzServerElement;

    createdCallback() {
      /* Called when component is created */
      if (!this._element)
        EzBlog.call(this, this);

      this._render();
      this._server = <EzServerElement>document.
          querySelector('#' + this.serverId);
    }

    attachedCallback() {
      /* Called when component is attached to DOM */
    }

    attributeChangedCallback(attr: string, old: string, value: string) {
    }

    detachedCallback() {
      /* Called when component is removed from DOM */
    }

    set serverId(newServerId: string) {
      this._element.setAttribute('serverId', newServerId);
      this._server = <EzServerElement>document.
          querySelector('#' + newServerId);
    }

    get serverId() :string {
      return this._element.getAttribute('serverId');
    }

    set model(newModel: any) {
      this._model = newModel;
      this._render();

      this._titleElement.innerHTML = this._model.title;
      this._dateElement.innerHTML = this._model.date;
      this._bodyElement.innerHTML = this._model.body;

      if (this._firstPhotoElement) {
        this._firstPhotoElement.src = this._model.first_photo;
      }

      if (this._model.photos) {
        for (var i = 0; i < this._model.photos.length; i++) {
          var el = document.createElement('img');
          el.src = this._model.photos[i];
          this._photosElement.appendChild(el);
        }
      }

      if (this._model.tags) {
        this._tagsElement.innerHTML = "TAGS: ";
        for (var i = 0; i < this._model.tags.length; i++) {
          var newEl = document.createElement('a');
          newEl.setAttribute('name','tag');
          newEl.innerHTML = this._model.tags[i];
          newEl.onclick = () :void => {
            console.log("hi");
          };
          this._tagsElement.appendChild(newEl);
        }
      }

      if (this._model.preview) {
        var link = getChild(this._element, '[name=read]');
        link.onclick = () :void => {
          this._server.find('blogs', this._model.id).
              then((result) => { this.model = result; })
        };
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
        this._photosElement = getChild(this._element, '[name=photos]');
        this._tagsElement = getChild(this._element, '[name=tags]');
      }
    }
  }

  export interface EzBlogElement extends HTMLElement {
    /* Component public interfaces in here */
    serverId: number,
    model: any
  }

  /* Export Component */
  export var EzBlogElement = ez.registerElement('ez-blog', HTMLElement, EzBlog);
}
