"use strict";

let budgetInput = document.getElementById("budget-input");
let budgetRemained = document.getElementById("budget-remained");
let newCategoryBtn = document.querySelector(".new-category");
let complete = document.querySelector(".complete");
let flexContainer = document.querySelector(".flex-container");
let categories = localStorage.getItem("categoriesArray")
  ? JSON.parse(localStorage.getItem("categoriesArray"))
  : [];
let removeFuncWorking = false;
let budgetValue = 0;
let categoryTitle = "";

//Category creation
function createCategory() {
  const body = document.querySelector("body");
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
  categories.push(newCategory);
  localStorage.setItem("categoriesArray", JSON.stringify(categories));

  //Storing category name to localStorage
  categoryInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      categoryInput.disabled = true;
      localStorage.setItem(
        "category_" + categories.indexOf(newCategory),
        categoryTitle
      );
      categoryTitle = "";
    } else if (e.key === "Backspace") {
      categoryTitle = categoryTitle.slice(0, -1); // Son karakteri sil
    } else {
      let validCharacters = /^[a-zA-ZçğıöşüÇĞİÖŞÜ ]$/; // Geçerli karakterlerin regex'i
      if (validCharacters.test(e.key)) {
        categoryTitle += e.key;
      }
    }
  });
  return newCategory;
}

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
  budgetRemained.textContent = "Kalan Bütçe: " + (budgetValue - total) + " TL";
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
budgetInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    budgetValue = parseFloat(budgetInput.value);
    budgetInput.disabled = true;
    localStorage.setItem("budgetValue", budgetValue);
  }
});

//Creating new category
newCategoryBtn.addEventListener("click", function () {
  createCategory();
});

complete.addEventListener("click", function () {
  alert("Alışveriş tamamlanıyor...");
  localStorage.clear();
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
    if (category.childNodes[4] === newProduct) {
      let arr = [newProduct];
      localStorage.setItem(
        "category: " + category.childNodes[2].value,
        JSON.stringify(arr)
      );
    } else {
      let arr = JSON.parse(
        localStorage.getItem("category: " + category.childNodes[2].value)
      );
      arr.push(newProduct);
      localStorage.setItem(
        "category: " + category.childNodes[2].value,
        JSON.stringify(arr)
      );
    }

    checkbox.classList.add("hidden");
    setupCheckboxListener(checkbox);

    //When new price is sent, calculates current total price and compares it with budgetValue. Alerts message if budget is exceeded.
    price.addEventListener("input", function () {
      calculateTotalAndCheckBudget();
    });

    //When new amount is sent, calculates current total price and compares it with budgetValue. Alerts message if budget is exceeded.
    amount.addEventListener("input", function () {
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
        calculateTotalAndCheckBudget();
      });
      checkboxes.forEach((checkbox) => {
        checkbox.classList.add("hidden");
      });
    }
  });

  //Deleting category when "X" button is clicked
  deleteCategoryBtn.addEventListener("click", function () {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        localStorage.getItem(key) === category.childNodes[2].value.toLowerCase()
      ) {
        localStorage.removeItem(key);
      }
    }

    const index = categories.indexOf(category);
    categories = categories.splice(index, 1);
    localStorage.removeItem("categoriesArray");
    localStorage.setItem("categoriesArray", JSON.parse(categories));
    category.remove();
  });
}

///////////////*---RELOAD FUNCTIONS---*///////////////
window.addEventListener("load", function () {
  budgetInput.value = parseFloat(localStorage.getItem("budgetValue"));
  for (let i = 0; i < localStorage.length; i++) {
    const keyi = localStorage.key(i);
    if (keyi.startsWith("category_")) {
      const newStoredCategory = createCategory();
      newStoredCategory.childNodes[2].value = localStorage.getItem(keyi);
      flexContainer.appendChild(newStoredCategory);
    }
  }
});
