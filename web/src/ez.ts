/// <reference path="dts/types.d.ts"/>

module ez {
  function getPropertyDescriptor(obj: Object, prop: string):
      PropertyDescriptor {
    for (var proto = obj; proto ; proto = Object.getPrototypeOf(proto)) {
      var desc = Object.getOwnPropertyDescriptor(proto, prop);
      if (desc)
        return desc;
    }
    return undefined;
  }

  function getProperties(obj: Object):
      string[] {
    var properties: string[] = [];
    for (var proto = obj; proto; proto = Object.getPrototypeOf(proto)) {
      Object.getOwnPropertyNames(proto).forEach((property) => {
        if (properties.indexOf(property) === -1)
          properties.push(property);
      });
    }
    return properties
  }

  function getFullPrototype(proto: Object): PropertyDescriptorMap {
    return getProperties(proto).reduce(
        (map: PropertyDescriptorMap, prop: string) => {
          map[prop] = getPropertyDescriptor(proto, prop);
          return map;
        }, <PropertyDescriptorMap>{}
    );
  }

  export function registerElement(elName: string, elBase: Function,
      el: Function, elExtend?: string): void {
    var options: webcomponents.CustomElementInit = {
      prototype: Object.create(elBase.prototype, getFullPrototype(el.prototype))
    };
    if (elExtend)
      options.extends = elExtend;
    return document.registerElement(elName, options);
  }

  export function createDocumentFragment(html: string): DocumentFragment {
    return document.createRange().createContextualFragment(html);
  }

  export function getChild(parent, selector): any {
    return $(parent).find(selector)[0];
  }
}