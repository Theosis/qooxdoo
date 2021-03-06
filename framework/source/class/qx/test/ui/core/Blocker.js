/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Hagendorn (chris_schmidt)

************************************************************************ */
qx.Class.define("qx.test.ui.core.Blocker",
{
  extend : qx.test.ui.LayoutTestCase,

  members :
  {
    __blocker : null,

    setUp : function() {
      this.base(arguments);

      this.__blocker = new qx.ui.core.Blocker(this.getRoot());
      this.__blocker.setColor("green");
      this.__blocker.setOpacity(0.5);
    },

    tearDown : function() {
      this.base(arguments);

      this.__blocker.dispose();
    },

    testBlocker : function()
    {
      var blockerElement = this.__blocker.getBlockerElement();

      this.__blocker.block();
      this.flush();
      this.assertTrue(this.__blocker.isBlocked(), "isBlocked()");
      this.assertTrue(blockerElement.isIncluded(), "isIncluded()");

      this.__blocker.unblock();
      this.flush();
      this.assertFalse(this.__blocker.isBlocked(), "isBlocked()");
      this.assertFalse(blockerElement.isIncluded(), "isIncluded()");
    },

    testBlockerThrice : function()
    {
      var blockerElement = this.__blocker.getBlockerElement();

      this.__blocker.block();
      this.flush();
      this.assertTrue(this.__blocker.isBlocked(), "isBlocked()");
      this.assertTrue(blockerElement.isIncluded(), "isIncluded()");

      this.__blocker.block();
      this.flush();
      this.assertTrue(this.__blocker.isBlocked(), "isBlocked()");
      this.assertTrue(blockerElement.isIncluded(), "isIncluded()");

      this.__blocker.block();
      this.flush();
      this.assertTrue(this.__blocker.isBlocked(), "isBlocked()");
      this.assertTrue(blockerElement.isIncluded(), "isIncluded()");

      this.__blocker.unblock();
      this.flush();
      this.assertTrue(this.__blocker.isBlocked(), "isBlocked()");
      this.assertTrue(blockerElement.isIncluded(), "isIncluded()");

      this.__blocker.unblock();
      this.flush();
      this.assertTrue(this.__blocker.isBlocked(), "isBlocked()");
      this.assertTrue(blockerElement.isIncluded(), "isIncluded()");

      this.__blocker.unblock();
      this.flush();
      this.assertFalse(this.__blocker.isBlocked(), "isBlocked()");
      this.assertFalse(blockerElement.isIncluded(), "isIncluded()");
    },

    testForceUnblock : function()
    {
      var blockerElement = this.__blocker.getBlockerElement();

      this.__blocker.block();
      this.flush();
      this.assertTrue(this.__blocker.isBlocked(), "isBlocked()");
      this.assertTrue(blockerElement.isIncluded(), "isIncluded()");

      this.__blocker.block();
      this.flush();
      this.assertTrue(this.__blocker.isBlocked(), "isBlocked()");
      this.assertTrue(blockerElement.isIncluded(), "isIncluded()");

      this.__blocker.forceUnblock();
      this.flush();
      this.assertFalse(this.__blocker.isBlocked(), "isBlocked()");
      this.assertFalse(blockerElement.isIncluded(), "isIncluded()");
    },

    testBlockedEvent : function()
    {
      this.__blockedEventFired = false;
      this.__unblockedEventFired = false;

      this.__blocker.addListenerOnce("blocked", function(e){
        this.__blockedEventFired = true;
      }, this);

      this.__blocker.addListenerOnce("unblocked", function(e){
        this.__unblockedEventFired = true;
      }, this);

      this.__blocker.block();
      this.__blocker.unblock();

      this.wait(100, function() {
        this.assertTrue(this.__blockedEventFired, "'blocked' event was not fired, after block() was executed!");
        this.assertTrue(this.__unblockedEventFired, "'unblocked' event was not fired, after unblock() was executed!");
      }, this);
    }
  }
});
