var Path = require("path");

module.exports = function(content) {
    var locale, name;
    
    this.cacheable && this.cacheable();

    try {
        // Attempt to parse it to ensure it's valid JSON.
        locale = JSON.parse(content);
    } catch(e) {
        throw new Error("Failed to parse locale file. (" + this.resourcePath + ")");
    }

    // Parse the resourcePath to determine the locale name.
    name = Path.basename(this.resourcePath, ".locale.json");

    // Assuming jQuery and the i18n library has already been attached to the window, we pass the JSON inline.
    return "$.i18n().load(" + content + ", '" + name + "');"
        // Support hot module replacement.
        // This doesn't delete keys that have been removed, but that shouldn't be a common case. 
        + " if (module.hot) module.hot.accept();";  
};
