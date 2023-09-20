"use strict";
const fileInput = document.getElementById("input-file");
const exportEl = document.getElementById("export-btn");
const importEl = document.getElementById("import-btn");

// Bắt sự kiện click nút export
exportEl.addEventListener("click", function () {
  // kiểm tra có muốn export không
  if (confirm("Are you sure to EXPORT this data?")) {
    saveStaticDataToFile();
  }
});

// Hàm lưu dữ liệu
function saveStaticDataToFile() {
  // tạo dữ liệu để lưu
  const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
    type: "application/json",
  });

  // lưu file
  saveAs(blob, "petData.json");
}

// Bắt sự kiện import
importEl.addEventListener("click", importStaticFile);

// Hàm import
function importStaticFile() {
  // kiểm tra xem người dùng chọn file hay chưa
  if (!fileInput.value) {
    alert("Please chose file to import!");
  } else {
    // xác nhận import
    if (confirm("Are you sure to IMPORT this file?")) {
      const file = fileInput.files[0];

      const reader = new FileReader();

      // sự kiện load dữ liệu
      reader.addEventListener(
        "load",
        function () {
          // lưu dữ liệu xuống localStorage
          const inputArr = petArrNew(JSON.parse(reader.result));
          // console.log(inputArr);
          saveToStorage("petArr", inputArr);
          // Thông báo thành công
          alert("IMPORTED successfully!");
        },
        false
      );

      // đọc file
      if (file) {
        reader.readAsText(file);
      }

      // reset file input
      fileInput.value = "";
    }
  }
}

// Hàm tạo dữ liệu mới từ inputFile
function petArrNew(inputFile) {
  petArr.forEach((pet, i) => {
    inputFile.forEach((petInput, j) => {
      // console.log(i);
      // console.log(pet.id);
      // console.log(j);
      // console.log(petInput.id);
      // Nếu id của inputFile trùng với id của pet thì thay thế dữ liệu và xoá bỏ phần tử đó khỏi inputFile
      if (petInput.id === pet.id) {
        // console.log(petArr[i]);
        // console.log(inputFile[j]);
        petArr[i] = inputFile[j];
        inputFile.splice(j, 1);
      }
    });
  });

  // Nếu mảng inputFile còn lại sau khi xoá không rỗng thì nối mảng
  if (inputFile.length) {
    return [...petArr, ...inputFile];
  } else return petArr;
  // console.log(petArr);
}
