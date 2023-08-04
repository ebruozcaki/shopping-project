"use strict";

let input = document.querySelector(".category-input");
let title = document.querySelector(".title");
let addProduct = document.querySelector(".add-product");
let deleteProduct = document.querySelector(".delete-product");
let product = document.querySelector(".product");

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    title.prepend(input.value);
    input.classList.add("hidden");
  }
});

addProduct.addEventListener("click", function () {
  const newProduct = document.createElement("section");
  newProduct.classList.add("product");
  document.querySelector(".category").appendChild(newProduct);
});
