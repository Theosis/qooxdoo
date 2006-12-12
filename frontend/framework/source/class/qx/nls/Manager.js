/**
 * Create a new instance of qx.nls.Manager
 */
qx.OO.defineClass("qx.nls.Manager", qx.manager.object.ObjectManager,
function() {
  qx.manager.object.ObjectManager.call(this);

  this._translationCatalog = { C: true };
  this.setLocale(qx.sys.Client.getInstance().getLocale() || this._defaultLanguage);
});


/** current locale. locale is an language code like de, de_AT, en, en_GB, fr, ... */
qx.OO.addProperty({ name: "locale"});


qx.Proto._modifyLocale = function(propValue, propOldValue, propData) {
  this._language = propValue;

  var pos = propValue.indexOf("_");
  if (pos == -1) {
    this._majorLanguage = propValue;
  } else {
    this._majorLanguage = propValue.substring(0, pos);
  }

  return true;
};


/**
 * Add a translation to the translation manager
 * 
 * @param languageCode (string) language code of the translation like de, de_AT, en, en_GB, fr, ...
 * @param translationMap (Map) mapping of message identifiers (english text) to the target language
 */
qx.Proto.addTranslation = function(languageCode, translationMap) {

  if (this._translationCatalog[languageCode])
  {
    for (var key in translationMap) {
      this._translationCatalog[languageCode][key] = translationMap[key];
    }
  }
  else
  {
    this._translationCatalog[languageCode] = translationMap;
  }
};


/**
 * Translate a message
 * @see(qx.lang.String.format)
 * 
 * @param messageId (string) message id (may contain format strings)
 * @param varargs (object) variable number of argumes applied to the format string
 * @return (qx.nls.LocalizedString)
 */
qx.Proto.tr = function(messageId, varargs)
{
  var args = qx.lang.Array.fromArguments(arguments);
  args.splice(0, 1);

  return new qx.nls.LocalizedString(messageId, args);
};


/**
 * Translate a plural message
 * 
 * Depending on the third argument the plursl or the singular form is chosen.
 * 
 * @see(qx.lang.String.format)
 * 
 * @param singularMessageId (string) message id of the singular form (may contain format strings)
 * @param pluralMessageId (string) message id of the plural form (may contain format strings)
 * @param count (integer) if greater than 1 the plural form otherwhise the singular form is returned.
 * @param varargs (object) variable number of argumes applied to the format string
 * @return (qx.nls.LocalizedString)
 */
qx.Proto.trn = function(singularMessageId, pluralMessageId, count, varargs)
{
  var args = qx.lang.Array.fromArguments(arguments);
  args.splice(0, 3);

  if (count > 1)
  {
    return new qx.nls.LocalizedString(pluralMessageId, args);
  }
  else
  {
    return new qx.nls.LocalizedString(singularMessageId, args);
  }
};


/**
 * Translate a message with translation hint
 * 
 * Depending on the third argument the plursl or the singular form is chosen.
 * 
 * @see(qx.lang.String.format)
 *
 * @param hint (string) hint for the translator of the message. Will be included in the .pot file. 
 * @param messageId (string) message id (may contain format strings)
 * @param varargs (object) variable number of argumes applied to the format string
 * @return (qx.nls.LocalizedString)
 */
qx.Proto.trc = function(hint, messageId, varargs)
{
  var args = qx.lang.Array.fromArguments(arguments);
  args.splice(0, 2);

  return new qx.nls.LocalizedString(messageId, args);
}








qx.Proto._defaultLanguage = "C";


/**
 * Translate a message using the current locale and apply format string to the arguments.
 * 
 * @param messageId (string) message id (may contain format strings)
 * @param args (object[]) array of objects, which are inserted into the format string.
 * @return (string) translated message. 
 */
qx.Proto.translate = function(messageId, args)
{
  var txt;

  if (!txt && this._translationCatalog[this._language]) {
    txt = this._translationCatalog[this._language][messageId];
  }

  if (!txt && this._translationCatalog[this._majorLanguage]) {
    txt = this._translationCatalog[this._majorLanguage][messageId];
  }

  if (!txt && this._translationCatalog[this._defaultLanguage]) {
    txt = this._translationCatalog[this._defaultLanguage][messageId];
  }

  if (!txt) {
    txt = messageId;
  }

  if (args.length > 0) {
    txt = qx.lang.String.format(txt, args)
  }
  return txt;
};


/*
---------------------------------------------------------------------------
  DEFER SINGLETON INSTANCE
---------------------------------------------------------------------------
*/

/**
 * Singleton Instance Getter
 */
qx.Class.getInstance = qx.util.Return.returnInstance;