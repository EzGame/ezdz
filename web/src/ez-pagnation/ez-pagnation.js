/* Be sure to include dependencies here */
/// <reference path="../ez.ts"/>
/// <reference path="../ez-pagnation-server/ez-pagnation-server.ts"/>
/// <reference path="../ez-blog/ez-blog.ts"/>
// TODO: infinite scroll mode
// TODO: masonary mode (REALLY COOL)
var ez;
(function (ez) {
    var _this = this;
    var EzPagnation = (function () {
        function EzPagnation(_element) {
            this._element = _element;
            this._template = Handlebars.templates['ez-pagnation'];
        }
        EzPagnation.prototype.createdCallback = function () {
            /* Called when component is created */
            if (!this._element)
                EzPagnation.call(this, this);
            // Attributes
            this._resource =
                this._element.getAttribute('resource');
            this._resultsPerPage =
                parseInt(this._element.getAttribute('resultsPerPage')) || 5;
            // Template
            this._element.appendChild(ez.createDocumentFragment(this._template({ page: true })));
            this._pageBarElement = getChild(this._element, '[name=page-bar]');
            this._pageContentElement = getChild(this._element, '[name=page-content]');
            // Server
            this._pagnationServerElement = getChild(this._element, '[id=ez-pagnation-server]');
            this._pagnationServerElement.resource = this._resource;
            this._pagnationServerElement.resultsPerPage = this._resultsPerPage;
            this._element.appendChild(this._pagnationServerElement);
            if (this._resource == null) {
                console.warn('Warning! ez-pagnation initialized with no resource!');
            }
            else {
                this._render();
            }
        };
        EzPagnation.prototype.nextPage = function () {
            if (this._currentPage > 0) {
                var results = this._findResultsByPage(this._currentPage + 1);
                if (results)
                    this._currentPage += 1;
                return results;
            }
            return null;
        };
        EzPagnation.prototype.prevPage = function () {
            if (this._currentPage > 1) {
                this._currentPage -= 1;
                return this._findResultsByPage(this._currentPage);
            }
            return null;
        };
        Object.defineProperty(EzPagnation.prototype, "resource", {
            get: function () {
                return this._resource;
            },
            set: function (newResource) {
                this._element.setAttribute('resource', newResource);
                this._render();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EzPagnation.prototype, "resultsPerPage", {
            get: function () {
                return this._resultsPerPage;
            },
            enumerable: true,
            configurable: true
        });
        EzPagnation.prototype.attachedCallback = function () {
            /* Called when component is attached to DOM */
        };
        EzPagnation.prototype.attributeChangedCallback = function (attr, old, value) {
            /* Called when component has attribute change */
            if (attr == 'resultsPerPage') {
                console.error('Error! ez-pagnation cannot change resultsPerPage!');
            }
        };
        EzPagnation.prototype.detachedCallback = function () {
            /* Called when component is removed from DOM */
        };
        EzPagnation.prototype.gotoPage = function (page) {
            this._renderPageBar(page);
        };
        EzPagnation.prototype._renderPageContent = function (currentPage) {
            this._pageContentElement.innerHTML = '';
            results = this._pagnationServerElement.getPage(currentPage);
            for (var i = 0; i < results.length; i++) {
                var newEl = document.createElement(EzPagnation._CLASSES[this._resource]);
                newEl.model = results[i];
                newEl.serverId = this._pagnationServerElement.getAttribute('id');
                this._pageContentElement.appendChild(newEl);
            }
        };
        EzPagnation.prototype._renderPageBar = function (currentPage) {
            this._pageBarElement.innerHTML = '';
            var numOfPages = this._pagnationServerElement.numOfPages;
            var currentPage = this._pagnationServerElement.currentPage;
            if (currentPage == 1) {
            }
            else if (currentPage == numOfPages) {
            }
            else {
            }
        };
        EzPagnation.prototype._render = function (page) {
            this._renderPageContent(page);
            this._renderPageBar(page);
            // First render
            if (typeof init === 'undefined' || init) {
                this._renderPageBar();
            }
        };
        EzPagnation._CLASSES = {
            'blogs': 'ez-blog',
        };
        return EzPagnation;
    })();
    {
    }
    this._renderPageBar();
    this._render;
    if (this._pageBarElement) {
        var shownPages = Math.min(numOfPages, 3);
        for (var i = 1; i < this._pagnationServerElement.numOfPages; i++) {
            var goToEl = document.createElement('div');
            goToEl.setAttribute('name', 'goto');
            goToEl.innerHTML = "" + i;
            goToEl.addEventListener('click', function (e) {
                _this.gotoPage(parseInt(e.target.textContent));
            });
            this._pageBarElement.appendChild(goToEl);
        }
        if (numOfPages > 4) {
        }
        else {
        }
    }
})(ez || (ez = {}));
;
/* Export Component */
if (!ez.registered('ez-pagnation'))
    exports.EzPagnationElement = ez.registerElement('ez-pagnation', HTMLElement, EzPagnation);
