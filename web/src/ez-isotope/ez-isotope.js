/// <reference path="../ez.ts"/>
var ez;
(function (ez) {
    var Isotope = (function () {
        function Isotope(_element) {
            this._element = _element;
            this._template = Handlebars.templates['ez-isotope'];
        }
        Isotope.prototype.createdCallback = function () {
            if (!this._element)
                Isotope.call(this, this);
            this._element.innerHTML = '';
            this._element.appendChild(ez.createDocumentFragment(this._template({})));
            this._$container = getChild(this._element, '[name=container]');
            this._$controls = getChild(this._element, '[name=controls]');
        };
        Object.defineProperty(Isotope.prototype, "target", {
            get: function () {
                return this._element.getAttribute('target');
            },
            set: function (newTarget) {
                this._element.setAttribute('target', newTarget);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Isotope.prototype, "selector", {
            get: function () {
                return this._element.getAttribute('selector');
            },
            set: function (newSelector) {
                this._element.setAttribute('selector', newSelector);
            },
            enumerable: true,
            configurable: true
        });
        Isotope.prototype.load = function (categories) {
            var keys = Object.keys(categories);
            this._$controls.html('');
            for (var i = 0; i < keys.length; i++) {
                var status = categories[keys[i]];
                this._$controls.append('<div name="c" status="' + status + '">' +
                    keys[i].toUpperCase() +
                    '<div name="under"></div>' +
                    '</div>');
                this._turn(status, this._$controls.children().last()[0]);
            }
            // manual lexical scoping says lol to code readability
            var _this = this;
            $('[name=c]').on('click', function () {
                var delta = 0;
                var selector = 'data-' + _this.selector;
                if (this.getAttribute('status') == 'on') {
                    this.setAttribute('status', 'off');
                    _this._turn('off', this);
                    var children = document.querySelectorAll(_this.target + ' > *');
                    var hide = [];
                    for (var i = children.length - 1; i >= 0; i--) {
                        var child = children[i];
                        if (child.getAttribute(selector).toUpperCase() ==
                            this.textContent.toUpperCase()) {
                            hide.push(child);
                            delta--;
                        }
                    }
                    $(hide).velocity("transition.slideRightOut", { stagger: 250 }, function () {
                        if (typeof _this.onChange === 'function')
                            _this.onChange(delta);
                    });
                }
            });
        };
        return Isotope;
    })();
    {
        this.setAttribute('status', 'on');
        _this._turn('on', this);
        var children = document.querySelectorAll(_this.target + ' > *');
        var show = [];
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child.getAttribute(selector).toUpperCase() ==
                this.textContent.toUpperCase()) {
                show.push(child);
                delta++;
            }
        }
        $(show).velocity("transition.slideLeftIn", { stagger: 250 }, function () {
            if (typeof _this.onChange === 'function')
                _this.onChange(delta);
        });
    }
})(ez || (ez = {}));
;
categories();
Array < string > {
    return: $.map(this._$controls.children(), function (el) {
        if (el.getAttribute('status') == 'on') {
            return el.textContent;
        }
        else {
            return null;
        }
    })
};
_turn(status, string, el, HTMLElement);
{
    if (status == 'on') {
        $(el).velocity({ color: '#000' }, 300);
        $(el).children().velocity({ width: '100%' }, 300);
    }
    else if (status == 'off') {
        $(el).velocity({ color: '#ccc' }, 300);
        $(el).children().velocity({ width: '0%' }, 300);
    }
}
if (!ez.registered('ez-isotope'))
    exports.EzIsotopeElement = ez.registerElement('ez-isotope', HTMLElement, Isotope);
