// import { products } from "./products.js";

let products;

const productContainer = document.querySelector(".product-container");
const buttonContainer = document.querySelector(".btn-container");


function displayProducts(productsList) {
  let displayProduct = productsList.map(
    (product) =>
      `
        <div class="product-item">
            <img class="photo" src="${product.thumbnail}" alt="${product.title}">
            <div class="item-info">
                <header>
                    <h4>${product.title}</h4>
                </header>
                <p class="item-text">${product.description}</p>
                <h4 class="price">${product.price}€</h4>
            </div>
        </div>
        `
  );
  productContainer.innerHTML = displayProduct.join("");
};


function displayCategoryButtons() {
  // The first thing is to obtain unique categories. There are 2 ways to do it: using reduce or using Set
  // Using reduce
  let categories = products.reduce(
    (acc, product) => {
      if (!acc.includes(product.category)) {
        acc.push(product.category);
      }
      return acc;
    },
    ["All"]
  );
  console.log(categories);

  // Using Set
  // let newCategories = new Set(products.map((product) => product.category));
  // const categories2 = ["All", ...newCategories];
  // console.log(categories2);

  // Once the unique categories have been obtained, it is necessary to generate the buttons
  const categoryButtons = categories.map(
    (category) =>
      `
        <button class="filter-btn" data-id="${category}">${category.toUpperCase()}</button>
        `
  );
  buttonContainer.innerHTML = categoryButtons.join("");

  // When the buttons are generated, it is necessary to add an event listener for each button to filter the products based on category
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      //Get data id from filter button insted of get the id
      const category = event.currentTarget.dataset.id;
     
      if (category === "All") {
        displayProducts(products);
      } else {
        const categoryProducts = products.filter(
            (product) => product.category === category
          );
        displayProducts(categoryProducts);
      }
    });
  });
}


window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  products = data.products;
  displayProducts(products);
  displayCategoryButtons();
});
