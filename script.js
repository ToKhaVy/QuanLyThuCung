"use strict";
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");
const healthyBtn = document.getElementById("healthy-btn");

//////////////////////////////////////////////////////////////////////
// BẮT SỰ KIỆN NÚT SUBMIT
submitBtn.addEventListener("click", function () {
  // 1. LẤY DỮ LIỆU TỪ CÁC FORM INPUT
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };
  // console.log(data);

  // 2. VALIDATE DỮ LIỆU
  // Nếu hợp lệ thì thực hiện 3,4,5
  // K hợp lệ thì thông báo dữ liệu k hợp lệ.

  const validate = validateData(data);

  if (validate) {
    // 3. THÊM THÚ CƯNG VÀO DANH SÁCH
    petArr.push(data);
    // Lưu trữ vào localstorage
    saveToStorage("petArr", petArr);
    // 4. HIỂN THỊ DANH SÁCH THÚ CƯNG
    renderTableData(petArr);
    // 5. XOÁ CÁC DỮ LIỆU NHẬP TRONG FORM INPUT
    clearInput();
  }
});

//////////////////////////////////////////////////////////////////////
// Hàm validateData
function validateData(data) {
  // Khai báo biến cờ hiệu
  let isValidate = true;

  // Không có trường nào bị nhập thiếu dữ liệu.
  // data.id là 1 string "   ABC   ", phương thức .trim -> "ABC"
  if (data.id.trim() === "") {
    alert("Please input for Pet ID!");
    isValidate = false;
  }
  //Kiểm tra ID có trùng không.
  //Duyệt mảng petArr
  else
    for (let i = 0; i < petArr.length; i++) {
      if (data.id === petArr[i].id) {
        alert("ID must unique!");
        isValidate = false;
        break;
      }
    }
  if (data.id.trim() != "" && isValidate === true) {
    // data.name
    if (data.name.trim() === "") {
      alert("Please input for Pet Name!");
      isValidate = false;
    }

    // data.age
    else if (isNaN(data.age)) {
      alert("Please input for Age!");
      isValidate = false;
    } else if (data.age < 1 || data.age > 15) {
      alert("Age must be between 1 and 15!");
      isValidate = false;
    }

    // data.type
    else if (data.type === "Select Type") {
      alert("Please select Type!");
      isValidate = false;
    }

    // data.weight
    else if (isNaN(data.weight)) {
      alert("Please input for Weight!");
      isValidate = false;
    } else if (data.weight < 1 || data.weight > 15) {
      alert("Weight must be between 1 and 15!");
      isValidate = false;
    }

    // data.length
    else if (isNaN(data.length)) {
      alert("Please input for Length!");
      isValidate = false;
    } else if (data.length < 1 || data.length > 100) {
      alert("Length must be between 1 and 100!");
      isValidate = false;
    }

    // data.breed
    else if (data.breed === "Select Breed") {
      alert("Please select Breed!");
      isValidate = false;
    }
  }

  return isValidate;
}

//////////////////////////////////////////////////////////////////////
renderTableData(petArr);
// Hàm renderTableData
function renderTableData(petArr) {
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
        <td>
        <!-- đặt click event trong html -->
	        <button class="btn btn-danger" 
          onclick="deletePet('${petArr[i].id}')">Delete</button>
        </td>`;
    tableBodyEl.appendChild(row);
  }
}

//////////////////////////////////////////////////////////////////////
// Hàm clearInput
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  typeInput.value = "Select Type";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

//////////////////////////////////////////////////////////////////////
// Hàm xoá thú cưng
function deletePet(petId) {
  // confirm trước khi xoá thú cưng
  if (confirm("Are you sure?")) {
    // tìm thú cưng trùng id trong mảng petArr
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        // xoá khỏi mảng petArr
        petArr.splice(i, 1);
        // lưu trữ petArr mới vào localstorage
        saveToStorage("petArr", petArr);
        // hiển thị lại mảng petArr
        renderTableData(petArr);
      }
    }
  }
}

//////////////////////////////////////////////////////////////////////
// Hàm Show healthy pet
let healthyCheck = true;
healthyBtn.addEventListener("click", function () {
  if (healthyCheck === false) {
    // Hiển thị toàn bộ thú cưng
    renderTableData(petArr);
    // Đổi tên nút
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = true;
  } else {
    // Tạo mảng healthyPetArr bằng vòng lặp for
    const healthyPetArr = [];
    for (let i = 0; i < petArr.length; i++) {
      if (
        petArr[i].vaccinated === true &&
        petArr[i].dewormed === true &&
        petArr[i].sterilized === true
      ) {
        healthyPetArr.push(petArr[i]);
      }
    }
    // Sau vòng lặp for đã tạo xong mảng

    // Tạo mảng healthyPetArr bằng phương thức fillter
    // Hiển thị mảng healthyPetArr
    renderTableData(healthyPetArr);
    // Đổi tên nút
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = false;
  }
});

////////////////////////////////////////////////////////////////////////
// Bắt sự kiện select type
typeInput.addEventListener("click", renderBreed);
// Hiển thị Breed Name theo Breed Type
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  // Nếu type là Dog
  if (typeInput.value === "Dog") {
    // Dùng phương thức filter tạo mảng dogBreed chứa các Dog type
    const dogBreed = breedArr.filter((breedItem) => breedItem.type === "Dog");
    // console.log(dogBreed);
    // Duyệt qua mảng dogBreed bằng forEach
    dogBreed.forEach((breedItem) => {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breedName}`;
      breedInput.appendChild(option);
    });
  } else if (typeInput.value === "Cat") {
    // Nếu type là Cat
    const catBreed = breedArr.filter((breedItem) => breedItem.type === "Cat");
    // console.log(catBreed);
    catBreed.forEach((breedItem) => {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breedName}`;
      breedInput.appendChild(option);
    });
  }
}
