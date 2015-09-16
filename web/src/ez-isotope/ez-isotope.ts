/// <reference path="../ez.ts"/>

module ez {
  class Isotope {
    constructor(private _element: EzIsotope) { }

    private _template = Handlebars.templates['ez-isotope'];

    private _$container: JQuery;
    private _$controls: JQuery;
    public onChange: Function;

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
        var delta = 0;
        var selector = 'data-' + _this.selector;
        var animation = "";
        var targets = [];

        if (this.getAttribute('status') == 'on') {
          this.setAttribute('status', 'off');
          _this._turn('off', this);
          animation = "transition.slideRightOut";

          var children = document.querySelectorAll(_this.target + ' > *');
          for (var i = children.length - 1; i >= 0; i--) {
            var child: any = children[i];
            if (child.getAttribute(selector).toUpperCase() ==
                    this.textContent.toUpperCase()) {
              targets.push(child);
              delta--;
            }
          }
        } else {
          this.setAttribute('status', 'on');
          _this._turn('on', this);
          animation = "transition.slideLeftIn";

          var children = document.querySelectorAll(_this.target + ' > *');
          for (var i = 0; i < children.length; i++) {
            var child: any = children[i];
            if (child.getAttribute(selector).toUpperCase() ==
                    this.textContent.toUpperCase()) {
              targets.push(child)
              delta++;
            }
          }
        }

        if (targets.length > 0) {
          $(targets).velocity(animation, {
            stagger: 250, complete: () => {
              if (typeof _this.onChange === 'function')
                _this.onChange(delta);
            }
          });
        } else {
          if (typeof _this.onChange === 'function')
            _this.onChange(delta);
        }
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
    onChange(delta: number): Function;
    load(categories: Array<string>): void;
    categories(): Array<string>;
  }

  if (!ez.registered('ez-isotope'))
    export var EzIsotopeElement = ez.registerElement(
      'ez-isotope', HTMLElement, Isotope);
}
