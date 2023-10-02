import { data } from "./data.js";

const wrapper = document.querySelector(".card__wrapper");
const input = document.querySelector(".header__input");
const select = document.querySelector(".footer__select");

const uniqueData = getUniqueData(data);

function createCard({ title, symbol, keywords }) {
  const card = document.createElement("div");
  card.className = "card__layout";
  card.innerHTML = `<h2 class="card__emoji">${symbol}</h2>
  <p class="card__underline-text">${title}</p>
  <p class="card__description">
  ${keywords}
  </p>`;
  return card;
}

function renderCards(arr) {
  wrapper.innerHTML = "";
  arr.forEach((el) => {
    const card = createCard(el);
    wrapper.append(card);
  });
}

function cardSearch(e) {
  let value = e.target.value;
  const valueCap = value[0].toUpperCase() + value.slice(1).toLowerCase();
  const filteredData = uniqueData.filter(
    (obj) => obj.title.includes(valueCap) || obj.keywords.includes(value)
  );
  renderCards(filteredData);
}

input.addEventListener("input", cardSearch);

function getUniqueData(data) {
  const arrUnique = [];
  data.forEach((obj) => {
    arrUnique.push({
      ...obj,
      keywords: [...new Set(obj.keywords.split(" "))].join(" "),
    });
  });
  return arrUnique;
}
select.addEventListener("change", (event) => {
  const value = event.target.value;
  const slicedData = uniqueData.slice(0, value);
  renderCards(slicedData);
});

select.value = 12;
select.dispatchEvent(new Event("change"));
getUniqueData(data);
