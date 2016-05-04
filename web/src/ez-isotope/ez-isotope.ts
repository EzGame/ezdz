/// <reference path="../ez.ts"/>

module ez {
  class Isotope {
    constructor(private _element: EzIsotope) { }

    private _template = Handlebars.templates['ez-isotope'];

    private _$container: JQuery;
    private _$controls: JQuery;
    public oncontentchange: Function;

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

    public load(categories: Object): void {
      var keys = Object.keys(categories);
      this._$controls.html('');

      for (var i = 0; i < keys.length; i++) {
        var status = categories[keys[i]];
        this._$controls.append(
          '<div name="c" status="' + status + '">' +
            keys[i].toUpperCase() +
            '<div name="under"></div>' +
          '</div>'
        );
        this._turn(status, this._$controls.children().last()[0]);
      }

      // manual lexical scoping says lol to code readability
      var _this = this;
      $('[name=c]').on('click', function() {
        var children = document.querySelectorAll(_this.target + ' > *');
        var targets = [];
        var total = 0;
        var selector = 'data-' + _this.selector;

        _this._turn(
          (this.getAttribute('status') == 'on') ? 'off' : 'on', this);

        for (var i = 0; i < children.length; i++) {
          var child: any = children[i];
          var match = _this._strCmp(
            child.getAttribute(selector), this.textContent);
          if (match) { targets.push(child); } else { total++; }
        }

        // Closure
        var onFinish: jquery.velocity.ElementCallback =
          function(elements: NodeListOf<HTMLElement>): void {
            debugger;
            if (typeof _this.oncontentchange == 'function') {
              _this.oncontentchange(targets, this.getAttribute('status'), total);
            }
            $(this).remove();
          }

        $(targets).velocity("transition.slideRightOut", {
          stagger: 250, complete: onFinish
        });
      });
    }

    public categories(): Array<string> {
      return $.map(this._$controls.children(), (el: HTMLElement) => {
        if (el.getAttribute('status') == 'on') {
          return el.textContent;
        } else {
          return null;
        }
      });
    }

    // use velocity to animate
    private _turn(status: string, el: HTMLElement) {
      el.setAttribute('status', status);
      if (status == 'on') {
        $(el).velocity({ color: '#000' }, 300);
        $(el).children().velocity({ width: '100%' }, 300);
      } else if (status == 'off') {
        $(el).velocity({ color: '#ccc' }, 300);
        $(el).children().velocity({ width: '0%' }, 300);
      }
    }

    private _strCmp(str1: string, str2: string) {
      return str1.toUpperCase() == str2.toUpperCase();
    }
  }

  export interface EzIsotope extends HTMLElement {
    target: string;
    selector: string;
    oncontentchange( total: number ): Function;
    load(categories: Array<string>): void;
    categories(): Array<string>;
  }

  if (!ez.registered('ez-isotope'))
    export var EzIsotopeElement = ez.registerElement(
      'ez-isotope', HTMLElement, Isotope);
}
