/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2010 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)
     * Fabian Jakobs (fjakobs)

************************************************************************ */
qx.Class.define("performance.test.decorator.Grid", 
{
  extend : performance.test.decorator.AbstractDecorator,

  members :
  {
    createDecorator : function() {
      return new qx.ui.decoration.Grid().set({
        baseImage : "decoration/tabview/tabview-pane.png",
        insets : [ 4, 6, 7, 4 ]
      });
    }
  }
});