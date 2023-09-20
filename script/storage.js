"use strict";

// Animation cho Sidebar
const navEl = document.getElementById("sidebar");
// Sự kiện click cho sidebar
navEl.addEventListener("click", function () {
  this.classList.toggle("active");
});

////////////////////////////////////////////////////////////////////////
// dữ liệu petArr để test
const pet1 = {
  id: "P001",
  name: "Tom",
  age: 3,
  type: "Cat",
  weight: 5,
  length: 50,
  color: "#ee1717",
  breed: "Persian",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: new Date(2022, 2, 1),
};

const pet2 = {
  id: "P002",
  name: "Tyke",
  age: 5,
  type: "Dog",
  weight: 3,
  length: 40,
  color: "#1eff00",
  breed: "Husky",
  vaccinated: false,
  dewormed: false,
  sterilized: false,
  date: new Date(2022, 2, 2),
};

// dữ liệu breedArr để test
const breed1 = {
  breedName: "Alaska",
  type: "Dog",
};
const breed2 = {
  breedName: "Russian Blue",
  type: "Cat",
};
const breed3 = {
  breedName: "Husky",
  type: "Dog",
};
const breed4 = {
  breedName: "Persian",
  type: "Cat",
};

////////////////////////////////////////////////////////////////////////
// lưu trữ dự liệu khai báo sẵn vào localstorage
// petArr
if (!getFromStorage("petArr")) {
  saveToStorage("petArr", [pet1, pet2]);
}
const petArr = getFromStorage("petArr");

//breedArr
if (!getFromStorage("breedArr")) {
  saveToStorage("breedArr", [breed1, breed2, breed3, breed4]);
}
const breedArr = getFromStorage("breedArr");

////////////////////////////////////////////////////////////////////////
// Hàm lưu dữ liệu vào local storage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

////////////////////////////////////////////////////////////////////////
// Hàm lấy dữ liệu từ local storage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
