/// <reference path="handlebars.d.ts"/>
/// <reference path="jquery.d.ts"/>
/// <reference path="jquery.pjax.d.ts"/>
/// <reference path="webcomponents.js.d.ts"/>
/// <reference path="promise.d.ts"/>
/// <reference path="velocity.d.ts"/>

/* Custom interfaces */
interface ElementRegistrationOptions {
  prototype?: Object;
  extends?: string;
}

interface Window {
  ActiveXObject: any;
}
