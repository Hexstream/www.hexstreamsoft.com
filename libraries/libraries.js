"use strict";

const libraries = [
    {
        name: "map-bind"
    },
    {
        name: "positional-lambda"
    },
    {
        name: "enhanced-eval-when"
    },
    {
        name: "enhanced-multiple-value-bind"
    },
    {
        name: "macro-level"
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
        name: "incognito-keywords"
    },
    {
        name: "symbol-namespaces"
    },
    {
        name: "clhs"
    },
    {
        name: "place-utils"
    }
];

function siblingLibraries (current) {
    function libraryWithIndex (index) {
        let clampedIndex = (index >= 0 && index < libraries.length) ? index : null;
        return clampedIndex != null ? libraries[clampedIndex] : null;
    }
    let libraryIndex = libraries.findIndex(element => element.name === current);
    if (libraryIndex < 0) {
        throw Error("Unrecognized library name \"" + current + "\".");
    }
    return [libraryWithIndex(libraryIndex - 1),
            libraryWithIndex(libraryIndex + 1),
           libraryIndex + 1, libraries.length];
}

function buildSequentialNavHTML(prevLibrary, nextLibrary, currentIndex, librariesCount) {
    function makeLink (sibling, prevOrNext, arrow) {
        return sibling !== null ? `<a class="sequential-link ${prevOrNext}" href="${`../${sibling.name}/`}">${arrow}</a>` : "";
    }
    let prev = makeLink(prevLibrary, "prev", "←");
    let next = makeLink(nextLibrary, "next", "→");
    return `
<nav class="sequential-nav">
  ${prev}
  <a href="../">
    Libraries
    <span>${currentIndex}/${librariesCount}</span>
  </a>
  ${next}
</nav>`;
}

document.querySelector("#top-nav .main").insertAdjacentHTML("beforeend", buildSequentialNavHTML(...siblingLibraries(document.querySelector("#top-nav .main .here").innerText)));
