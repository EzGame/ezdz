/// <reference path="../ez.ts"/>

module ez {
  class Isotope {
    constructor(private _element: EzIsotope) { }

    private _template = Handlebars.templates['ez-isotope'];

    private _$container: JQuery;
    private _$controls: JQuery;

    createdCallback() {
      if (!this._element)
        Isotope.call(this, this);

      this._element.innerHTML = '';
      this._element.appendChild(
        ez.createDocumentFragment(this._template({})));

      this._$container = getChild(this._element, '[name=container]');
      this._$controls = getChild(this._element, '[name=controls]');
    }

    set target(newTarget: string) {
      this._element.setAttribute('target', newTarget);
    }

    get target(): string {
      return this._element.getAttribute('target');
    }

    set selector(newSelector: string) {
      this._element.setAttribute('selector', newSelector);
    }

    get selector(): string {
      return this._element.getAttribute('selector');
    }

    public load(categories: Array<string>): void {
      // this._$controls.html('');

      for (var i = 0; i < categories.length; i++) {
        this._$controls.append(
          '<div name="c" status="on">' +
            categories[i].toUpperCase() +
            '<div name="under"></div>' +
          '</div>'
        );
      }

      // manual lexical scoping says lol to code readability
      var __this = this;
      $('[name=c]').on('click', function() {
        var _this = this;

        if (_this.getAttribute('status') == 'on') {
          _this.setAttribute('status', 'off');
          __this._turn('off', _this);

          $(__this.target + ' > *').each(function() {
            if ($(this).data(__this.selector).toUpperCase() ==
              $(_this).text().toUpperCase()) {
              if (this.hide === 'function') this.hide();
              else $(this).hide(300);
            }
          });

        } else {
          _this.setAttribute('status', 'on');
          __this._turn('on', _this);

          $(__this.target + ' > *').each(function() {
            if ($(this).data(__this.selector).toUpperCase() ==
              $(_this).text().toUpperCase())
              if (this.show === 'function') this.show();
              else $(this).show(300);
          });
        }
      });
    }

    public categories(): Array<string> {
      return $.map(this._$controls.children(), (el: HTMLElement) => {
        return el.innerHTML;
      });
    }

    // use velocity to animate
    private _turn(status: string, el: HTMLElement) {
      if (status == 'on') {
        $(el).velocity({ color: '#000' }, 300);
        $(el).children().velocity({ width: '100%' }, 300);
      } else if (status == 'off') {
        $(el).velocity({ color: '#ccc' }, 300);
        $(el).children().velocity({ width: '0%' }, 300);
      }
    }
  }

  export interface EzIsotope extends HTMLElement {
    target: string;
    selector: string;
    load(categories: Array<string>): void;
    categories(): Array<string>;
  }

  if (!ez.registered('ez-isotope'))
    export var EzIsotopeElement = ez.registerElement(
      'ez-isotope', HTMLElement, Isotope);
}
