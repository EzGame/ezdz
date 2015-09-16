/// <reference path="../ez.ts"/>
/// <reference path="../ez-spinner/ez-spinner.ts"/>

module ez {
  class Spotify {
    constructor(private _element: EzSpotifyElement) {}

    private _template = Handlebars.templates['ez-spotify'];

    private _$showBtn: JQuery;
    private _$mainBox: JQuery;
    private _spinner: EzSpinnerElement;

    createdCallback() {
      if (!this._element)
        Spotify.call(this, this)

      if (this.theme == null) this.theme = 'black';
      if (this.view == null) this.view = 'list';

      this._element.innerHTML = '';
      this._element.appendChild(
        ez.createDocumentFragment(this._template({})));

      this._$showBtn = getChild(this._element, '[name=show]');
      this._$mainBox = getChild(this._element, '[name=main]');
      this._spinner = getChild(this._element, 'ez-spinner')[0];
    }

    attachedCallback() {
      var that = this;
      this._$showBtn.on('click', function() {
        if ($(this).hasClass('open')) {
          $(this).removeClass('open');
          that._$mainBox.velocity('transition.slideDownOut', 300, ()=> {
            $(this).html('PLAY');
          });
        } else {
          $(this).addClass('open');
          that._$mainBox.velocity('transition.slideUpIn', 300, () => {
            $(this).html('CLOSE');
          });
        }
      });
      this._$mainBox.find('[name=playlist]').on('click', function () {
        that._spinner.start();
        that.playlist = $(this).data('id');
        that._render();
      });
    }

    get theme(): string {
      return this._element.getAttribute('theme');
    }

    set theme(newTheme: string) {
      this._element.setAttribute('theme', newTheme);
    }

    get view(): string {
      return this._element.getAttribute('view');
    }

    set view(newView: string) {
      this._element.setAttribute('view', newView);
    }

    get playlist(): string {
      return this._element.getAttribute('playlist');
    }

    set playlist(newPlaylist: string) {
      this._element.setAttribute('playlist', newPlaylist);
      this._render();
    }

    private _render() {
      var width = this._$mainBox.innerWidth();
      var height = this._$mainBox.innerHeight();

      this._$mainBox.find('[name=playlist]').velocity(
        'transition.slideLeftOut', { stagger: 100 });
      this._$mainBox.append('<iframe width=\'' + width +
        '\' height=\'' + height +
        '\' frameborder=\'0' +
        '\' src=\'' + this._construct_uri() + '\'></iframe>');
      this._$mainBox.find('iframe').on('load', () => {
        this._spinner.stop();
      })
    }

    private _construct_uri(): string {
      var base_uri = '//embed.spotify.com/?uri';
      base_uri += '=user:22ds23ddfucrcfnackgd7cj4a';
      base_uri += ':playlist:' + this.playlist;
      base_uri += '&theme=' + this.theme;
      base_uri += '&view=' + this.view;
      return base_uri;
    }
  }

  export interface EzSpotifyElement extends HTMLElement {
    theme: string;
    view: string;
    playlist: string;
  }

  if (!ez.registered('ez-spotify'))
    export var EzSpotifyElement = ez.registerElement(
      'ez-spotify', HTMLElement, Spotify);
}