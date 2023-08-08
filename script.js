"use strict";

let input = document.querySelector(".category-input");
let title = document.querySelector(".title");
let addProduct = document.querySelector(".add-product");
let deleteProduct = document.querySelector(".delete-product");
let newCategoryBtn = document.querySelector(".new-category");

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
  setupCheckboxListener(checkbox);
});

function setupCheckboxListener(checkbox) {
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      checkbox.parentElement.classList.add("selected");
    } else {
      checkbox.parentElement.classList.remove("selected");
    }
  });
}

//Deleting product(s) from a certain category
//NEED UPDATE TO CHECKBOX OF PREVIOUS PRODUCTS
deleteProduct.addEventListener("click", function () {
  let checkboxes = document.querySelectorAll(".checkbox");
  checkboxDisplay(checkboxes);

  //Deleting products of which checkboxes are checked
  deleteProduct.addEventListener("click", function () {
    const selectedProducts = document.querySelectorAll(".product.selected");
    selectedProducts.forEach((product) => {
      product.remove();
    });
    checkboxes.forEach((checkbox) => {
      checkbox.classList.add("hidden");
    });
  });
});

const checkboxDisplay = function (checkboxesList) {
  for (let i = 0; i < checkboxesList.length; i++) {
    let checkboxToBeChecked = checkboxesList[i];
    //Checkbox display
    checkboxToBeChecked.classList.remove("hidden");
  }
};

//Checking and unchecking functions
function check(checkbox) {
  checkbox.checked = true;
}
function uncheck(checkbox) {
  checkbox.checked = false;
}

//Creating new category
newCategoryBtn.addEventListener("click", function () {
  const categorySection = document.querySelector(".category-section");
  const newCategory = document.createElement("section");
  newCategory.classList.add("category-section");

  const addProductBtn = document.createElement("btn");
  addProductBtn.classList.add("add-product");
  addProductBtn.textContent = "Ürün Ekle";
  newCategory.appendChild(addProductBtn);

  const deleteProductBtn = document.createElement("btn");
  deleteProductBtn.classList.add("delete-product");
  deleteProductBtn.textContent = "Ürün Sil";
  newCategory.appendChild(deleteProductBtn);

  const categoryTitle = document.createElement("h3");
  categoryTitle.classList.add("title");
  newCategory.appendChild(categoryTitle);

  const categoryInput = document.createElement("input");
  categoryInput.classList.add("category-input");
  categoryInput.setAttribute("type", "string");
  categoryInput.setAttribute("placeholder", "KATEGORİ BAŞLIĞI");
  newCategory.appendChild(categoryInput);

  categoryInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      categoryTitle.prepend(categoryInput.value);
      categoryInput.classList.add("hidden");
    }
  });

  const deleteCategoryBtn = document.createElement("btn");
  deleteCategoryBtn.classList.add("delete-category");
  deleteCategoryBtn.textContent = "X";
  newCategory.appendChild(deleteCategoryBtn);

  categorySection.appendChild(newCategory);
});
