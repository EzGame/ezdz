/// <reference path="../ez.ts"/>

module ez {
  class Logo {
    constructor(private _element: EzLogoElement) { }

    private _template = Handlebars.templates['ez-logo'];

    private _list: Array<string> = [
      "Day-Dreamer",
      "Gamer",
      "Nerd",
      "Gnome-Thief",
      "Man-Child",
      "Child-Man",
      "Night-Dreamer",
      "4K-Trash",
      "Star-Wars-Fan",
      "Kirk-Over-Picard",
      "Designer",
      "Foodie",
      "Hungry"
    ];

    private _active: Array<string> = [
      "Developer",
      "Photographer",
      "Writer"
    ];

    createdCallback() {
      if (!this._element)
        Logo.call(this, this);

      this._element.innerHTML = '';
      this._element.appendChild(
        ez.createDocumentFragment(this._template({})));

      var $logo = getChild(this._element, '[name=container]');

      $logo.append(this._insert(this._active[0]));
      $logo.append(this._insert(this._active[1]));
      $logo.append(this._insert(this._active[2]));

      var _this = this;
      $('[name=lol]').on('click', function() {
        _this._random(this)
      });
    }

    private _random(el: HTMLElement) {
      var i = Math.floor(Math.random() * this._list.length);
      var j = this._active.indexOf(el.textContent);
      var temp = this._list[i];

      this._list[i] = this._active[j];
      this._active[j] = temp;

      $(el).velocity({ opacity: 0 }, 300, function() {
        this[0].innerHTML = temp;
        $(this).velocity({ opacity: 1 }, { duration: 300, delay: 50 });
      })
    }

    private _insert(lol: string) {
      return '<div name="lol">' + lol + '</div>';
    }
  }

  export interface EzLogoElement extends HTMLElement {}

  if (!ez.registered('ez-logo'))
    export var EzLogoElement = ez.registerElement(
      'ez-logo', HTMLElement, Logo);
}
