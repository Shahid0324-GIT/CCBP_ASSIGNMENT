// const api = "https://apis.ccbp.in/countries-data";
// const api = "https://products-api-2ttf.onrender.com/api/products";
const api = "https://run.mocky.io/v3/12531624-c691-4a5b-9625-4490a7cff00d";

const productsContainer = document.getElementById("productsContainer");
const input = document.getElementById("input");

let data = [];
let searchVal = "";

function addProductsToDom(product) {
  const { image, name, price, weight } = product;

  //   All dom nodes creation
  const cardContainer = document.createElement("div");
  const prodDetails = document.createElement("div");
  const prodImg = document.createElement("img");
  const prodName = document.createElement("p");
  const prodPrice = document.createElement("p");
  const prodWeight = document.createElement("p");

  cardContainer.classList.add("card-container");
  prodDetails.classList.add("prod-details");

  //   Appending Product card container to products container
  productsContainer.appendChild(cardContainer);

  //   Product Image
  prodImg.src = image;
  prodImg.alt = name;
  prodImg.classList.add("prod-img");

  //   Appending Product Image to card container
  cardContainer.appendChild(prodImg);

  //   Appending Product Image to prodDetails container
  cardContainer.appendChild(prodDetails);

  prodName.textContent = name;
  prodPrice.textContent = price;
  prodWeight.textContent = weight;

  prodDetails.appendChild(prodName);
  prodDetails.appendChild(prodPrice);
  prodDetails.appendChild(prodWeight);
}

function displayResults() {
  productsContainer.textContent = "";
  for (let product of data) {
    let prodName = product.name;

    if (prodName.toLowerCase().includes(searchVal.toLowerCase())) {
      addProductsToDom(product);
    }
  }
}

async function fetchData() {
  productsContainer.classList.add("none");
  productsContainer.textContent = "";
  fetch(api, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((resData) => {
      let response = resData;
      const { categories } = response;
      data = categories[1].products;
      productsContainer.classList.remove("none");

      displayResults();
    });
}

function search(e) {
  searchVal = e.target.value;
  fetchData();
}

fetchData();
input.addEventListener("keyup", search);

function grid() {
  productsContainer.classList.add("grid");
}

function normal() {
  productsContainer.classList.remove("grid");
}

console.log(searchVal);
