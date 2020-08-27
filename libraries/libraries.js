"use strict";

const libraries = [
    {
        name: "map-bind"
    },
    {
        name: "positional-lambda"
    },
    {
        name: "trivial-jumptables"
    },
    {
        name: "with-output-to-stream"
    },
    {
        name: "enhanced-eval-when"
    },
    {
        name: "enhanced-multiple-value-bind"
    },
    {
        name: "evaled-when"
    },
    {
        name: "macro-level"
    },
    {
        name: "with-shadowed-bindings"
    },
    {
        name: "first-time-value"
    },
    {
        name: "its"
    },
    {
        name: "cartesian-product-switch"
    },
    {
        name: "place-modifiers"
    },
    {
        name: "anaphoric-variants"
    },
    {
        name: "multiple-value-variants"
    },
    {
        name: "parse-number-range"
    },
    {
        name: "bubble-operator-upwards"
    },
    {
        name: "cesdi"
    },
    {
        name: "enhanced-find-class"
    },
    {
        name: "class-options"
    },
    {
        name: "definitions-systems"
    },
    {
        name: "incognito-keywords"
    },
    {
        name: "symbol-namespaces"
    },
    {
        name: "clhs"
    },
    {
        name: "enhanced-boolean"
    },
    {
        name: "fakenil"
    },
    {
        name: "place-utils"
    }
];

function siblingLibraries (current) {
    function libraryWithIndex (index) {
        const clampedIndex = (index >= 0 && index < libraries.length) ? index : null;
        return clampedIndex != null ? libraries[clampedIndex] : null;
    }
    const libraryIndex = libraries.findIndex(element => element.name === current);
    if (libraryIndex < 0) {
        throw Error("Unrecognized library name \"" + current + "\".");
    }
    return [libraryWithIndex(libraryIndex - 1),
            libraryWithIndex(libraryIndex + 1),
           libraryIndex + 1, libraries.length];
}

function buildSequentialNavHTML(prevLibrary, nextLibrary, currentIndex, librariesCount) {
    const librariesDir = document.location.protocol === "file:" ? "https://www.hexstreamsoft.com/libraries/" : "../";
    function makeLink (sibling, prevOrNext, arrow) {
        return sibling !== null ? `<a class="sequential-link ${prevOrNext}" href="${librariesDir}${`${sibling.name}/`}">${arrow}</a>` : "";
    }
    const prev = makeLink(prevLibrary, "prev", "←");
    const next = makeLink(nextLibrary, "next", "→");
    return `
<nav class="sequential-nav">
  ${prev}
  <a href="${librariesDir}">
    Libraries
    <span class="under">${currentIndex}/${librariesCount}</span>
  </a>
  ${next}
</nav>`;
}

document.querySelector("#top-nav .main").insertAdjacentHTML("beforeend", buildSequentialNavHTML(...siblingLibraries(document.querySelector("#top-nav .main .here").innerText)));
