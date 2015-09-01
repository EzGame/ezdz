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

    private _$anchor: JQuery;
    private _$container: JQuery;
    private _$cover: JQuery;
    private _$date: JQuery;
    private _$tags: JQuery
    private _$title: JQuery;

    private _entrance: any;

    createdCallback() {
      if (!this._element)
        PostPreview.call(this, this)

      this._element.innerHTML = '';
      this._element.appendChild(
        ez.createDocumentFragment(this._template({})));

      this._$anchor = getChild(this._element, '[name=anchor]');
      this._$container = getChild(this._element, '[name=container]');
      this._$cover = getChild(this._element, '[name=cover]');
      this._$date = getChild(this._element, '[name=date]');
      this._$tags = getChild(this._element, '[name=tags]');
      this._$title = getChild(this._element, '[name=title]');
    }

    // todo:
    // try to shrink image to a reasonable size, then let css position
    attachedCallback() {
      this._$container.on('mouseenter', () => {
        this._$cover.velocity({ opacity: 0.5 }, 300);
        this._$title.velocity('fadeIn', 300);
      });
      this._$container.on('mouseleave', () => {
        this._$cover.velocity({ opacity: 1 }, 300);
        this._$title.velocity('fadeOut', 300);
      });
    }

    set id(newId: string) {
      this._$anchor.attr('href', '/p/' + newId);
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

    set rowHeight(newRowHeight: number) {
      this._element.setAttribute('rowHeight', newRowHeight.toString());
      this._resize();
    }

    get rowHeight(): number {
      var rowHeight = this._element.getAttribute('rowHeight');
      return (rowHeight == "") ? undefined : parseInt(rowHeight);
    }

    public load(model: PostPreviewModel): void {
      this.id = model.id;
      this.tags = model.tags;
      this._$title.text(model.title);
      this._$date.text(model.date);
      this._$cover.attr('src', model.cover);

      this._$cover.on('load', () => {
        this._resize();
      });
    }

    private _createTags(tags: Array<string>) {
      this._$tags.html('');
      for (var i = 0; i < tags.length; i++) {
        var tag = '<a name="tag" href="/?q=' +
                    tags[i] + '">' + tags[i] + '</a>'
        this._$tags.append(tag);
      };
    }

    private _resize() {
      var height = this._$cover.height();
      var width = this._$cover.width();
      var aspect = width / height;

      if (aspect < 0.75 || aspect > 2.25) {
        var size = (this.rowHeight / 2).toString();
        this._element.style.width = size;
        this._element.style.height = size;
      } else if (aspect >= 0.75 && aspect < 1.5) {
        var size = this.rowHeight.toString();
        this._element.style.width = size;
        this._element.style.height = size;
      } else {
        this._element.style.width = (this.rowHeight * 1.5).toString();
        this._element.style.height = this.rowHeight.toString();
      }
    }
  }

  export interface EzPostPreviewElement extends HTMLElement {
    id: string;
    tags: string;
    rowHeight: number;
    load(model: PostPreviewModel): void
  }

  if (!ez.registered('ez-post-preview'))
    export var EzPostPreviewElement = ez.registerElement(
      'ez-post-preview', HTMLElement, PostPreview);

}
