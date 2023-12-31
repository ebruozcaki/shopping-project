"use strict";

let budgetInput = document.getElementById("budget-input");
let budgetRemained = document.getElementById("budget-remained");
let newCategoryBtn = document.querySelector(".new-category");
let listFavoritesBtn = document.querySelector(".favorites");
let listRecentsBtn = document.querySelector(".recents");
let complete = document.querySelector(".complete");
let flexContainer = document.querySelector(".flex-container");
let favProductsContainer = document.createElement("section");

//Creating a container that holds favorited products and adding an ul list to it.
document.querySelector("header").insertBefore(favProductsContainer, complete);
favProductsContainer.classList.add("favproducts-container");
favProductsContainer.classList.add("hidden");
const favList = document.createElement("ul");
favProductsContainer.appendChild(favList);

////Creating a container that holds the most recently used 3 products and adding an ul list to it.
let recentProductsContainer = document.createElement("section");
document
  .querySelector("header")
  .insertBefore(recentProductsContainer, complete);
recentProductsContainer.classList.add("recentproducts-container");
recentProductsContainer.classList.add("hidden");
const recentList = document.createElement("ul");
recentProductsContainer.appendChild(recentList);

//Arrays, values, strings that we need
let categories = [];
let favProducts = [];
let recentProducts = new Array(3);
let removeFuncWorking = false; //Boolean for the click on delete product button
let favContainerWorking = false; //Boolean for the click on favorites button
let recentContainerWorking = false;
let budgetValue = 0;
let categoryTitle = "";

///////////////*---FUNCTIONS---*///////////////

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

//Product creation
function addProduct(category) {
  let favoriteFuncWorking = false; //Boolean for the click on favorite button
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

  const favoriteBtn = document.createElement("btn");
  favoriteBtn.textContent = "☆";
  favoriteBtn.classList.add("favorite");
  newProduct.appendChild(favoriteBtn);

  category.appendChild(newProduct);

  checkbox.classList.add("hidden");
  setupCheckboxListener(checkbox);

  //Adding the most recent product name to recentProducts array
  productInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      recentProducts.shift();
      recentProducts.push(newProduct.childNodes[1].value);
      productInput.disabled = true;
    }
  });

  //When new price is sent, calculates current total price and compares it with budgetValue. Alerts message if budget is exceeded.
  price.addEventListener("input", function () {
    calculateTotalAndCheckBudget();
  });

  //When new amount is sent, calculates current total price and compares it with budgetValue. Alerts message if budget is exceeded.
  amount.addEventListener("input", function () {
    calculateTotalAndCheckBudget();
  });

  //If the product is favorited, adds productName to favProducts array and favList list.
  favoriteBtn.addEventListener("click", function () {
    favoriteFuncWorking = !favoriteFuncWorking;
    const productName = favoriteBtn.parentElement.childNodes[1].value;
    if (favoriteFuncWorking) {
      favoriteBtn.textContent = "★";
      favProducts.push(productName);
      const option = document.createElement("li");
      option.textContent = productName;
      option.innerHTML += '<button class="btn add-fav-to-category">+</button>';
      favList.appendChild(option);
    } else {
      favoriteBtn.textContent = "☆";
      for (let i = 0; i < favProducts.length; i++) {
        if (productName === favProducts[i]) {
          favProducts.splice(i, 1);
          for (let j = 0; j < favList.childNodes.length; j++) {
            if (productName + "+" === favList.childNodes[j].innerText) {
              favList.removeChild(favList.childNodes[j]);
            }
          }
        }
      }
    }
  });
}

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
    calculateTotalAndCheckBudget();
  }
});

//Creating new category
newCategoryBtn.addEventListener("click", function () {
  createCategory();
});

//Displaying the favorite products and adding them to selected categories
listFavoritesBtn.addEventListener("click", function () {
  const addFavToCategoryBtns = document.querySelectorAll(
    ".add-fav-to-category"
  );
  favContainerWorking = !favContainerWorking;
  if (favContainerWorking) {
    favProductsContainer.classList.remove("hidden");
  } else {
    favProductsContainer.classList.add("hidden");
  }
  addFavToCategoryBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetCategoryName = window.prompt("Kategori seçiniz.");
      for (let i = 0; i < categories.length; i++) {
        if (
          categories[i].childNodes[2].value.toLowerCase() ===
          targetCategoryName.toLowerCase()
        ) {
          const targetCategory = categories[i];
          addProduct(targetCategory);
          targetCategory.lastChild.childNodes[1].value =
            btn.parentNode.innerText.slice(0, -1);
        }
      }
    });
  });
});

//Displaying the most recently used 3 products and adding them to selected categories
listRecentsBtn.addEventListener("click", function () {
  recentContainerWorking = !recentContainerWorking;
  if (recentContainerWorking) {
    recentProductsContainer.classList.remove("hidden");
    while (recentList.firstChild) {
      recentList.removeChild(recentList.firstChild);
    }
    for (let i = 0; i < 3; i++) {
      const option = document.createElement("li");
      option.textContent = recentProducts[i];
      option.innerHTML +=
        '<button class="btn add-recent-to-category">+</button>';
      recentList.appendChild(option);
    }
  } else {
    recentProductsContainer.classList.add("hidden");
  }
  const addRecentToCategoryBtns = document.querySelectorAll(
    ".add-recent-to-category"
  );
  addRecentToCategoryBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetCategoryName = window.prompt("Kategori seçiniz.");
      for (let i = 0; i < categories.length; i++) {
        if (
          categories[i].childNodes[2].value.toLowerCase() ===
          targetCategoryName.toLowerCase()
        ) {
          const targetCategory = categories[i];
          addProduct(targetCategory);
          targetCategory.lastChild.childNodes[1].value =
            btn.parentNode.innerText.slice(0, -1);
        }
      }
    });
  });
});

//Completing shopping and clearing localStorage
complete.addEventListener("click", function () {
  alert("Alışveriş tamamlanıyor...");
  localStorage.clear();
  location.reload();
});

///////////////*---SETUP FUNCTIONS---*///////////////

//Displaying the checkboxes that are placed next to each product
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
    addProduct(category);
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
    categories.splice(index, 1);
    category.remove();

    favList.textContent = "";
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
