"use strict";

const phoe_redirects = ["#23_march_2021",
                        "#27_january_2021",
                        "#no-I-never-bought-traffic"];

const index = phoe_redirects.indexOf(window.location.hash);

if (index >= 0)
    window.location.href = "https://blog.hexstream.xyz/about-phoe/"
    + index === 0 ? "#23_may_2021" : window.location.hash;
