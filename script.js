"use strict";

let input = document.querySelector(".category-input");
let title = document.querySelector(".title");
let addProduct = document.querySelector(".add-product");
let deleteProduct = document.querySelector(".delete-product");

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    title.prepend(input.value);
    input.classList.add("hidden");
  }
});

//Adding new product to a certain category
addProduct.addEventListener("click", function () {
  const productSection = document.querySelector(".product");
  const newProduct = document.createElement("div");
  newProduct.classList.add("product");

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("checkbox");
  checkbox.checked = false;
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

//Deleting product(s) from a certain category
//NEED UPDATE TO CHECKBOX OF PREVIOUS PRODUCTS
deleteProduct.addEventListener("click", function () {
  let checkboxes = document.querySelectorAll(".checkbox");
  for (let i = 0; i < checkboxes.length; i++) {
    let checkboxToBeChecked = checkboxes[i];
    checkboxes[i].classList.remove("hidden");
    //Checkboxes check&uncheck
    checkboxToBeChecked.addEventListener("change", function () {
      console.log("here");
      if (checkboxToBeChecked.checked === true) {
        check(checkboxToBeChecked);
        console.log("checked");
      } else {
        uncheck(checkboxToBeChecked);
        console.log("unchecked");
      }
    });
  }
  //Deleting products of which checkboxes are checked
  deleteProduct.addEventListener("click", function () {
    const products = document.querySelectorAll(".product");
    for (let i = 0; i < products.length; i++) {
      let productToBeDeleted = products[i];
      if (productToBeDeleted.childNodes[0].checked === true) {
        productToBeDeleted.remove();
      }
    }
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].classList.add("hidden");
    }
  });

  //Checking and unchecking functions
  function check(checkbox) {
    checkbox.checked === true;
  }

  function uncheck(checkbox) {
    checkbox.checked === false;
  }
});
