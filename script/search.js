"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");

const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");

const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const findBtn = document.getElementById("find-btn");
const tableBodyEl = document.getElementById("tbody");

renderTableSearch(petArr);
renderBreed();

//////////////////////////////////////////////////////////////////////
// Bắt sự kiện find button
findBtn.addEventListener("click", function () {
  // tạo mảng để lọc tìm kiếm
  let findArr = petArr;

  // Nhập id
  if (idInput.value.trim() !== "") {
    findArr = findArr.filter((petItem) =>
      petItem.id.includes(`${idInput.value.trim()}`)
    );
  }

  // Nhập tên
  if (nameInput.value.trim() !== "") {
    findArr = findArr.filter((petItem) =>
      petItem.name.includes(`${nameInput.value.trim()}`)
    );
  }

  // Nhập type
  if (typeInput.value !== "Select Type") {
    findArr = findArr.filter((petItem) => petItem.type === typeInput.value);
  }

  // Nhập breed
  if (breedInput.value !== "Select Breed") {
    findArr = findArr.filter((petItem) => petItem.breed === breedInput.value);
  }

  // vaccinated
  if (vaccinatedInput.checked === true) {
    findArr = findArr.filter((petItem) => petItem.vaccinated === true);
  }

  // dewormed
  if (dewormedInput.checked === true) {
    findArr = findArr.filter((petItem) => petItem.dewormed === true);
  }

  // sterilized
  if (sterilizedInput.checked === true) {
    findArr = findArr.filter((petItem) => petItem.sterilized === true);
  }

  // hiển thị thú cưng thoả điều kiện
  renderTableSearch(findArr);
});

//////////////////////////////////////////////////////////////////////
// Hàm renderTableSearch
function renderTableSearch(petArr) {
  // Xoá nội dung hiện tại của mảng petArr
  tableBodyEl.innerHTML = "";
  // Hiển thị nội dung mới của mảng petArr
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <th scope="row">${petArr[i].id}</th>
        <td>${petArr[i].name}</td>
        <td>${petArr[i].age}</td>
        <td>${petArr[i].type}</td>
        <td>${petArr[i].weight} kg</td>
        <td>${petArr[i].length} cm</td>
        <td>${petArr[i].breed}</td>
        <td>
          <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
        </td>
        <td>
          <i class="bi ${
            petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
          }"></i>
        </td>
        <td>
          <i class="bi ${
            petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
          }"></i>
        </td>
        <td>
          <i class="bi ${
            petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
          }"></i>
        </td>
        <td>${new Date(petArr[i].date).getDate()}/${
      new Date(petArr[i].date).getMonth() + 1
    }/${new Date(petArr[i].date).getFullYear()}
        </td>
        `;
    tableBodyEl.appendChild(row);
  }
}

////////////////////////////////////////////////////////////////////////
// Hiển thị tất cả Breed Name
function renderBreed() {
  breedArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breedName}`;
    breedInput.appendChild(option);
  });
}
