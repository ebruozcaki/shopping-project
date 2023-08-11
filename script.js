"use strict";

let budgetInput = document.getElementById("budget-input");
let newCategoryBtn = document.querySelector(".new-category");
let complete = document.querySelector(".complete");
let flexContainer = document.querySelector(".flex-container");
let removeFuncWorking = false;

//Category creation
function createCategory() {
  const body = document.querySelector("body");
  const newCategory = document.createElement("section");
  newCategory.classList.add("category-section");

  const categoryTitle = document.createElement("h3");
  categoryTitle.classList.add("title");
  newCategory.appendChild(categoryTitle);

  const addProductBtn = document.createElement("btn");
  addProductBtn.classList.add("add-product");
  addProductBtn.textContent = "Ürün Ekle";
  newCategory.appendChild(addProductBtn);

  const deleteProductBtn = document.createElement("btn");
  deleteProductBtn.classList.add("delete-product");
  deleteProductBtn.textContent = "Ürün Sil";
  newCategory.appendChild(deleteProductBtn);

  const categoryInput = document.createElement("input");
  categoryInput.classList.add("category-input");
  categoryInput.setAttribute("type", "string");
  categoryInput.setAttribute("placeholder", "KATEGORİ BAŞLIĞI");
  newCategory.appendChild(categoryInput);

  const deleteCategoryBtn = document.createElement("btn");
  deleteCategoryBtn.classList.add("delete-category");
  deleteCategoryBtn.textContent = "X";
  newCategory.appendChild(deleteCategoryBtn);

  deleteCategoryBtn.addEventListener("click", function () {
    deleteCategoryBtn.parentNode.remove();
  });
  body.insertBefore(newCategory, document.querySelector("script"));
  setupCategoryListeners(newCategory);
  flexContainer.appendChild(newCategory);
}

//Creating the default category
createCategory();

///////////////*---FUNCTIONS---*///////////////

// Calculating total product price
function calculateTotalPrice() {
  let productPrices = document.querySelectorAll(".product .price");
  let total = 0;

  productPrices.forEach((priceInput) => {
    const productContainer = priceInput.parentElement;
    const amountInput = productContainer.querySelector(".amount");
    const productAmount = parseInt(amountInput.value) || 0; // Get the product amount

    const priceValue = parseFloat(priceInput.value) * productAmount;
    if (!isNaN(priceValue)) {
      total += priceValue;
    }
  });
  console.log(total);
  return total;
}

// Calculate total price and check budget
function calculateTotalAndCheckBudget() {
  const currentTotal = calculateTotalPrice();
  if (budgetValue < currentTotal) {
    alert("Bütçe " + (currentTotal - budgetValue) + " TL aşıldı!");
  }
}

//Checkbox display
function checkboxDisplay(checkboxesList) {
  for (let i = 0; i < checkboxesList.length; i++) {
    let checkboxToBeChecked = checkboxesList[i];
    checkboxToBeChecked.classList.remove("hidden");
  }
}

//Checking and unchecking functions
function check(checkbox) {
  checkbox.checked = true;
}
function uncheck(checkbox) {
  checkbox.checked = false;
}

///////////////*---EVENT LISTENERS---*///////////////

//Taking budget input and storing it in budgetValue
let budgetValue = 0;
budgetInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    budgetValue = parseFloat(budgetInput.value);
    budgetInput.disabled = true;
  }
});

//Creating new category
newCategoryBtn.addEventListener("click", function () {
  createCategory();
});

complete.addEventListener("click", function () {
  alert("Yeni liste oluşturuluyor...");
  location.reload();
});

///////////////*---SETUP FUNCTIONS---*///////////////

function setupCheckboxListener(checkbox) {
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      checkbox.parentElement.classList.add("selected");
    } else {
      checkbox.parentElement.classList.remove("selected");
    }
  });
}

//When a new category is created, this function makes all buttons and textboxes available
function setupCategoryListeners(category) {
  const addProductBtn = category.querySelector(".add-product");
  const deleteProductBtn = category.querySelector(".delete-product");
  const deleteCategoryBtn = category.querySelector(".delete-category");

  //Adding new product to a certain category when "Ürün Ekle" button is clicked
  addProductBtn.addEventListener("click", function () {
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

    category.appendChild(newProduct);

    checkbox.classList.add("hidden");
    setupCheckboxListener(checkbox);

    //When new price is sent, calculates current total price and compares it with budgetValue. Alerts message if budget is exceeded.
    price.addEventListener("input", function () {
      console.log("price listener");
      calculateTotalAndCheckBudget();
    });

    //When new amount is sent, calculates current total price and compares it with budgetValue. Alerts message if budget is exceeded.
    amount.addEventListener("input", function () {
      console.log("amount listener");
      calculateTotalAndCheckBudget();
    });
  });

  //Deleting product(s) from a certain category when "Ürün Sil" button is clicked
  deleteProductBtn.addEventListener("click", function () {
    removeFuncWorking = !removeFuncWorking;
    let checkboxes = category.querySelectorAll(".checkbox");
    if (removeFuncWorking) {
      checkboxDisplay(checkboxes);
    } else {
      const selectedProducts = category.querySelectorAll(".product.selected");
      selectedProducts.forEach((product) => {
        product.remove();
      });
      checkboxes.forEach((checkbox) => {
        checkbox.classList.add("hidden");
      });
    }
  });

  //Deleting category when "X" button is clicked
  deleteCategoryBtn.addEventListener("click", function () {
    category.remove();
  });
}
