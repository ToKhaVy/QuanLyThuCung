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

const formEl = document.getElementById("container-form");
const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

//////////////////////////////////////////////////////////////////////
renderTableEdit(petArr);

//////////////////////////////////////////////////////////////////////
// Hàm validateData
function validateData(data) {
  // Khai báo biến cờ hiệu
  let isValidate = true;

  // Không có trường nào bị nhập thiếu dữ liệu.
  // data.id là 1 string "   ABC   ", phương thức .trim -> "ABC"

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
  return isValidate;
}

//////////////////////////////////////////////////////////////////////
// Hàm renderTableData
function renderTableEdit(petArr) {
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
	        <button class="btn btn-primary" 
          onclick="editPet('${petArr[i].id}')">Edit</button>
        </td>`;
    tableBodyEl.appendChild(row);
  }
}

//////////////////////////////////////////////////////////////////////
// Hàm edit thú cưng
function editPet(petId) {
  // Hiển thị form nhập dữ liệu
  formEl.classList.remove("hide");

  // tìm dữ liệu thú cưng cần edit
  const pet = petArr.find((petItem) => petItem.id === petId);

  // hiển thị dữ liệu trên form edit
  idInput.value = petId;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;

  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;

  // hiển thị dữ liệu breed cũ trước khi edit
  renderBreed(); // tạo thẻ option cho breed theo type
  breedInput.value = `${pet.breed}`; // gán giá trị bằng breed của pet cần edit
}

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
    // date: new Date(),
  };
  // console.log(data);

  // 2. VALIDATE DỮ LIỆU
  // Nếu hợp lệ thì thực hiện
  // K hợp lệ thì thông báo dữ liệu k hợp lệ.
  const validate = validateData(data);

  if (validate) {
    // Tìm vị trí của petEdit trong mảng petArr
    const index = petArr.findIndex((pet) => pet.id === data.id);

    // gán lại ngày tạo thú cưng ban đầu
    data.date = petArr[index].date;

    // cập nhật lại dữ liệu thú cưng trong mảng petArr
    petArr[index] = data;

    // Lưu trữ vào localstorage
    saveToStorage("petArr", petArr);
    // Hiển thị bảng edit
    renderTableEdit(petArr);

    // Ẩn form nhập dữ liệu
    formEl.classList.add("hide");
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
