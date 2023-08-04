"use strict";

let input = document.querySelector(".category-input");
let title = document.querySelector(".title");

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    title.prepend(input.value);
    input.classList.add("hidden");
  }
});
