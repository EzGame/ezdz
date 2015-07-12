/* Be sure to include dependencies here */
/// <reference path="../ez.ts"/>

module ez {
  class EzShare {
    constructor(private _element: EzShareElement) {}

    _template = Handlebars.templates['ez-share'];
    private _href: string;
    private _title: string

    createdCallback() {
      /* Called when component is created */
      if (!this._element) EzShare.call(this, this);
    }

    get href(): string {
      return this._element.getAttribute('href')
    }

    set href(newHref: string) {
      this._element.setAttribute('href', newHref);
    }

    get title(): string {
      return this._element.getAttribute('title')
    }

    set title(newTitle: string) {
      this._element.setAttribute('title', newTitle);
    }

    attachedCallback() {
      if (this.href === null) {
        this.href = window.location.href;
      }
      if (this.title === null) {
        this.title = document.title;
      }
    }

    attributeChangedCallback(attr: string, old: string, value: string) {
      if (attr == 'href' || attr == 'title') {
        this._render()
      }
    }

    private _render() {
      this._element.innerHTML = ''

      var href = this.href;
      var title = this.title;
      var viewModel = {
        facebook: this._facebookString(href, title),
        twitter: this._twitterString(href, title),
        google: this._googlePlusString(href, title),
      }
      this._element.appendChild(
          ez.createDocumentFragment(this._template(viewModel)));

      $(this._element).find('div').click(function() {
        window.open(this.getAttribute('href'),
          '1436717872378',
          'width=700,height=500,toolbar=0,menubar=0,status=1,scrollbars=1');
      });
    }

    private _twitterString(href: string, title: string): string {
      return '//twitter.com/intent/tweet?text=' + title +
          '&url=' + href + '&via=ezdzdev';
    }

    private _facebookString(href: string, title: string): string {
      return '//www.facebook.com/sharer/sharer.php?u=' + href;
    }

    private _googlePlusString(href: string, title: string): string {
      return '//plus.google.com/share?url=' + href;
    }

  }

  export interface EzShareElement extends HTMLElement {
    /* Component public interfaces in here */
  }

  /* Export Component */
  if (!ez.registered('ez-share'))
    export var EzShareElement = ez.registerElement('ez-share', HTMLElement, EzShare);
}

// https://cdn.api.twitter.com/1/urls/count.json?url=
// https://graph.facebook.com/?id=
