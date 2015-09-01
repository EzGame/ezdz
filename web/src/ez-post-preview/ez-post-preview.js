/// <reference path="../ez.ts"/>
var ez;
(function (ez) {
    var PostPreview = (function () {
        function PostPreview(_element) {
            this._element = _element;
            this._template = Handlebars.templates['ez-post-preview'];
        }
        PostPreview.prototype.createdCallback = function () {
            if (!this._element)
                PostPreview.call(this, this);
            this._element.innerHTML = '';
            this._element.appendChild(ez.createDocumentFragment(this._template({})));
            this._$anchor = getChild(this._element, '[name=anchor]');
            this._$container = getChild(this._element, '[name=container]');
            this._$cover = getChild(this._element, '[name=cover]');
            this._$date = getChild(this._element, '[name=date]');
            this._$tags = getChild(this._element, '[name=tags]');
            this._$title = getChild(this._element, '[name=title]');
        };
        // todo:
        // try to shrink image to a reasonable size, then let css position
        PostPreview.prototype.attachedCallback = function () {
            var _this = this;
            this._$container.on('mouseenter', function () {
                _this._$cover.velocity({ opacity: 0.5 }, 300);
                _this._$title.velocity('fadeIn', 300);
            });
            this._$container.on('mouseleave', function () {
                _this._$cover.velocity({ opacity: 1 }, 300);
                _this._$title.velocity('fadeOut', 300);
            });
        };
        Object.defineProperty(PostPreview.prototype, "id", {
            get: function () {
                return this._element.getAttribute('id');
            },
            set: function (newId) {
                this._$anchor.attr('href', '/p/' + newId);
                this._element.setAttribute('id', newId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PostPreview.prototype, "tags", {
            get: function () {
                return this._element.getAttribute('tags').split(' ');
            },
            set: function (newTags) {
                this._createTags(newTags);
                this._element.setAttribute('tags', newTags.join(' '));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PostPreview.prototype, "grid", {
            get: function () {
                var grid = this._element.getAttribute('grid');
                return (grid == "") ? undefined : parseInt(grid);
            },
            set: function (newGrid) {
                this._element.setAttribute('grid', newGrid);
            },
            enumerable: true,
            configurable: true
        });
        PostPreview.prototype.load = function (model) {
            var _this = this;
            this.id = model.id;
            this.tags = model.tags;
            this._$title.text(model.title);
            this._$date.text(model.date);
            this._$cover.attr('src', model.cover);
            this._$cover.on('load', function () {
                var height = _this._$cover.height();
                var width = _this._$cover.width();
                var wh_aspect = width / height;
                if (width <= height) {
                    _this._element.style.width = _this.grid || width;
                }
            }) + '';
            this._element.style.height = width * Math.round(1 / wh_aspect) + '';
        };
        return PostPreview;
    })();
    {
        this._element.style.height = this.grid || height + '';
        this._element.style.width = height * Math.round(wh_aspect) + '';
    }
})(ez || (ez = {}));
;
_createTags(tags, Array(), {
    this: ._$tags.html(''),
    for: function () { }, var: i = 0, i: function () { }, i: ++ });
{
    var tag = '<a name="tag" href="/?q=' +
        tags[i] + '">' + tags[i] + '</a>';
    this._$tags.append(tag);
}
;
if (!ez.registered('ez-post-preview'))
    exports.EzPostPreviewElement = ez.registerElement('ez-post-preview', HTMLElement, PostPreview);
