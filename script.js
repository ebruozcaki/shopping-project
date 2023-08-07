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
  const productSection = document.querySelector(".product");
  const newProduct = document.createElement("div");
  newProduct.classList.add("product");

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("checkbox");
  newProduct.appendChild(checkbox);

  const productInput = document.createElement("input");
  productInput.setAttribute("type", "string");
  productInput.setAttribute("placeholder", "Ürün Başlığı");
  productInput.classList.add("product-input");
  newProduct.appendChild(productInput);

  const amount = document.createElement("input");
  amount.setAttribute("type", "number");
  amount.setAttribute("placeholder", "Adet");
  amount.classList.add("amount");
  newProduct.appendChild(amount);

  const price = document.createElement("input");
  price.setAttribute("type", "number");
  price.setAttribute("placeholder", "Birim Fiyat");
  price.classList.add("price");
  newProduct.appendChild(price);

  productSection.appendChild(newProduct);

  checkbox.classList.add("hidden");
});
