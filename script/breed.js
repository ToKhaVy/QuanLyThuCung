"use strict";

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

// Hiển thị danh sách breed
renderBreedTable(breedArr);

//////////////////////////////////////////////////////////////////////
// sự kiện ấn nút submit
btnSubmit.addEventListener("click", function () {
  // lấy dữ liệu từ form
  const data = {
    breedName: breedInput.value,
    type: typeInput.value,
  };

  // validate data
  const validate = validateData(data);

  if (validate) {
    // THÊM GIỐNG MỚI VÀO DANH SÁCH
    breedArr.push(data);
    // Lưu dữ liệu vào local storage
    saveToStorage("breedArr", breedArr);
    // HIỂN THỊ DANH SÁCH GIỐNG
    renderBreedTable(breedArr);
    // XOÁ CÁC DỮ LIỆU NHẬP TRONG FORM INPUT
    clearBreedInput();
  }
});

//////////////////////////////////////////////////////////////////////
// Hàm validateData
function validateData(data) {
  // Khai báo biến cờ hiệu
  let isValidate = true;
  // Không có trường nào bị nhập thiếu dữ liệu.
  // data.breed là 1 string "   ABC   ", phương thức .trim -> "ABC"
  if (data.breedName.trim() === "") {
    alert("Please input for Breed Name!");
    isValidate = false;
  } else if (data.type === "Select Type") {
    alert("Please select type");
    isValidate = false;
  }

  return isValidate;
}

//////////////////////////////////////////////////////////////////////
// Hàm renderTableBreed
function renderBreedTable(breedArr) {
  // Xoá nội dung hiện tại của mảng petArr
  tableBodyEl.innerHTML = "";
  // Hiển thị nội dung mới của mảng petArr
  breedArr.forEach(function (breedItem, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td scope="col">${index + 1}</td>
    <td scope="col">${breedItem.breedName}</td>
    <td scope="col">${breedItem.type}</td>
    <td>
      <!-- đặt click event trong html -->
	    <button class="btn btn-danger" type="button"
      onclick="deleteBreed('${breedItem.breedName}')">Delete</button>
    </td>`;

    tableBodyEl.appendChild(row);
  });
}

//////////////////////////////////////////////////////////////////////
// Hàm clearBreedInput
function clearBreedInput() {
  breedInput.value = "";
  typeInput.value = "Select Type";
}

//////////////////////////////////////////////////////////////////////
// Hàm xoá breed
function deleteBreed(breedName) {
  // confirm trước khi xoá
  if (confirm("Are you sure?")) {
    // tìm breed trùng breed trong mảng petArr
    for (let i = 0; i < breedArr.length; i++) {
      if (breedName === breedArr[i].breedName) {
        // xoá khỏi mảng petArr
        breedArr.splice(i, 1);
        // lưu dữ liệu vào localstorage
        saveToStorage("breedArr", breedArr);
        // hiển thị lại mảng petArr
        renderBreedTable(breedArr);
      }
    }
  }
}
