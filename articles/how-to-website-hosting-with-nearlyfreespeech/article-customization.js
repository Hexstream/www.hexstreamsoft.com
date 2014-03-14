"use strict"

function init () {
    var js_enabled_elements = document.getElementsByClassName("javascript-is-enabled");

    for (var i = 0; i < js_enabled_elements.length; i++) {
        var element = js_enabled_elements[i];
        var text = document.createTextNode("✔ Javascript is enabled.");
        element.appendChild(text);
    }

}
