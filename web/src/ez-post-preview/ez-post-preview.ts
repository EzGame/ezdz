/// <reference path="../ez.ts"/>

interface PostPreviewModel {
  id: string,
  title: string,
  type: string,
  date: string,
  cover: string,
  tags: Array<string>
}

module ez {
  class PostPreview {
    constructor(private _element: EzPostPreviewElement) { }

    private _template = Handlebars.templates['ez-post-preview'];

    private _anchor: JQuery;
    private _container: JQuery;
    private _cover: JQuery;
    private _date: JQuery;
    private _tags: JQuery
    private _title: JQuery;

    private _entrance: any;

    createdCallback() {
      if (!this._element)
        PostPreview.call(this, this)

      this._element.innerHTML = '';
      this._element.appendChild(
        ez.createDocumentFragment(this._template({})));

      this._anchor = getChild(this._element, '[name=anchor]');
      this._container = getChild(this._element, '[name=container]');
      this._cover = getChild(this._element, '[name=cover]');
      this._date = getChild(this._element, '[name=date]');
      this._tags = getChild(this._element, '[name=tags]');
      this._title = getChild(this._element, '[name=title]');
    }

    // todo:
    // try to shrink image to a reasonable size, then let css position
    attachedCallback() {
      this._container.on('mouseenter', () => {
        this._cover.velocity({ opacity: 0.6 }, 500);
        this._title.velocity('fadeIn', 500);
      });
      this._container.on('mouseleave', () => {
        this._cover.velocity({ opacity: 1 }, 500);
        this._title.velocity('fadeOut', 500);
      });
    }

    set id(newId: string) {
      this._anchor.attr('href', '/p/' + newId);
      this._element.setAttribute('id', newId);
    }

    get id(): string {
      return this._element.getAttribute('id');
    }

    set tags(newTags: Array<string>) {
      this._createTags(newTags);
      this._element.setAttribute('tags', newTags.join(' '));
    }

    get tags(): Array<string> {
      return this._element.getAttribute('tags').split(' ');
    }

    public load(model: PostPreviewModel): void {
      this.id = model.id;
      this.tags = model.tags;
      this._title.text(model.title);
      this._date.text(model.date);
      this._cover.attr('src', model.cover);

      var _this = this
      this._cover.on('load', function() {
        if (this.clientHeight < 300) {
          this.style.maxHeight = '100%';
        }
      });
    }

    private _createTags(tags: Array<string>) {
      this._tags.html('');
      for (var i = 0; i < tags.length; i++) {
        var tag = '<a name="tag" href="/?q=' +
                    tags[i] + '">' + tags[i] + '</a>'
        this._tags.append(tag);
      };
    }
  }

  export interface EzPostPreviewElement extends HTMLElement {
    id: string;
    tags: string;
    load(model: PostPreviewModel): void
  }

  if (!ez.registered('ez-post-preview'))
    export var EzPostPreviewElement = ez.registerElement(
      'ez-post-preview', HTMLElement, PostPreview);

}
