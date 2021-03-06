/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * This class takes care of the normalization of the native 'String' object.
 * Therefore it checks the availability of the following methods and appends
 * it, if not available. This means you can use the methods during
 * development in every browser. For usage samples, check out the attached links.
 *
 * *trim*:
 * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/Trim">MDN documentation</a> |
 * <a href="http://es5.github.com/#x15.5.4.20">Annotated ES5 Spec</a>
 *
 * @group (Polyfill)
 */
qx.Bootstrap.define("qx.lang.normalize.String", {
  defer : function() {
    // trim
    if (!qx.core.Environment.get("ecmascript.string.trim")) {
      String.prototype.trim = function(context) {
        return this.replace(/^\s+|\s+$/g,'');
      };
    }
  }
});
