/**
 * Bài 1: Xây dựng chức năng highlight
 * - Khi người dùng nhập từ khóa vào ô input, các từ khóa này sẽ được bôi đậm trong đoạn văn bản bên dưới
 * - Không phân biệt hoa thường
 * - Nếu ô input rỗng, đoạn văn bản không có từ nào được bôi đậm
 */
function highlightText() {
    const textArea = document.getElementById('eo-text');
    const keywordInput = document.getElementById('eo-keyword');
    const resultDiv = document.getElementById('eo-result');
    if (!textArea || !resultDiv)
        return;
    const text = textArea.value;
    const keyword = keywordInput ? keywordInput.value.trim() : '';
    if (text === '') {
        resultDiv.innerHTML = '<span>Vui lòng nhập đoạn văn</span>';
        resultDiv.className = "eo-result fail";
        return;
    }
    if (keyword === '') {
        resultDiv.innerHTML = '<span>Vui lòng nhập highlight text</span>';
        resultDiv.className = "eo-result fail";
        return;
    }
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedKeyword})`, 'gi');
    const matches = text.match(regex) || [];
    console.log(matches.length);
    //   const newDiv = document.createElement('div');
    //   newDiv.className = 'eo-extra';
    //   newDiv.textContent = 'I am a new sibling div';
    //
    // // insert right after eo-result
    //   resultDiv.insertAdjacentElement('afterend', newDiv);
    //
    const highlightedText = text.replace(regex, '<span class="highlight">$1</span>');
    resultDiv.innerHTML = highlightedText;
    resultDiv.className = "eo-result";
    resultDiv.classList.add("success");
    resultDiv.classList.add("has-content");
    const countDiv = document.createElement('div');
    countDiv.className = 'eo-count';
    countDiv.innerHTML = `<span> ${matches.length} </span> lần từ khoá <span> ${keyword} </span> xuất hiện`;
    resultDiv.insertAdjacentElement('afterend', countDiv);
}
/**
 * Bài 2: Kiểm tra độ mạnh yếu mật khẩu, đáp ứng tiêu chí
 *
 * - Độ dài >= 8
 *
 * - Có ít nhất 2 chữ HOA
 *
 * - Có ít nhất 2 chữ thường
 *
 * - Có ít nhất 1 số
 *
 * - Có ít nhất 1 ký tự đặc biệt: !@#$%^&*()
 */
function checkPassword() {
    const passwordInput = document.getElementById('et-password');
    const resultDiv = document.getElementById('et-result');
    if (!passwordInput || !resultDiv)
        return;
    if (passwordInput.value.length === 0) {
        resultDiv.innerHTML = '<span>Vui lòng nhập mật khẩu</span>';
        resultDiv.className = "et-result";
        resultDiv.classList.add("fail");
        return;
    }
    const password = passwordInput.value;
    const minLength = password.length >= 8;
    const upperCase = (password.match(/[A-Z]/g) || []).length >= 2;
    const lowerCase = (password.match(/[a-z]/g) || []).length >= 2;
    const digit = (password.match(/[0-9]/g) || []).length >= 1;
    const specialChar = (password.match(/[!@#$%^&*()]/g) || []).length >= 1;
    let message = '';
    if (minLength && upperCase && lowerCase && digit && specialChar) {
        message = '<span>Mật khẩu mạnh!</span>';
        resultDiv.className = "et-result";
        resultDiv.classList.add("success");
    }
    else {
        resultDiv.className = "et-result";
        resultDiv.classList.add("fail");
        message = '<span>Mật khẩu yếu. Yêu cầu:</span>';
        message += '<ul>';
        if (!minLength)
            message += '<li>Độ dài >= 8</li>';
        if (!upperCase)
            message += '<li>Ít nhất 2 chữ HOA</li>';
        if (!lowerCase)
            message += '<li>Ít nhất 2 chữ thường</li>';
        if (!digit)
            message += '<li>Ít nhất 1 số</li>';
        if (!specialChar)
            message += '<li>Ít nhất 1 ký tự đặc biệt (!@#$%^&*())</li>';
        message += '</ul>';
    }
    // console.log(message)
    resultDiv.innerHTML = message;
}
window.addEventListener('DOMContentLoaded', function () {
    const btnEo = document.getElementById("eo-btn");
    if (btnEo) {
        btnEo.addEventListener('click', highlightText);
    }
    const btnEt = document.getElementById('et-btn');
    if (btnEt) {
        btnEt.addEventListener('click', checkPassword);
    }
});
/**
 * Bài 3: Lọc trùng mảng
 *
 * const users = ['User 1', 'User 2', 'User 3', 'User 2', 'User 4'];
 */
function removeDuplicates(arr) {
    const uniqueArr = [];
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (item != undefined && uniqueArr.indexOf(item) === -1) {
            uniqueArr.push(item);
        }
    }
    return uniqueArr;
}
const users = ['User 1', 'User 2', 'User 3', 'User 2', 'User 4'];
const uniqueUsers = removeDuplicates(users);
console.log(`bai-3: ${uniqueUsers}`);
/**
 * Bài 4: Tìm số lớn thứ hai trong mảng
 *
 * const numbers = [5, 2, 1, 9, 8, 0];
 */
function findSecondLargest(arr) {
    let arrSorted = arr.sort();
    return arrSorted[arr.length - 2];
}
let numbers = [5, 2, 1, 9, 8, 0];
let secondLargestNumber = findSecondLargest(numbers);
console.log(`bai-4: ${secondLargestNumber}`);
/**
 * Bài 5: Chèn phần tử vào mảng không làm thay đổi thứ tự sắp xếp
 *
 * const numbers =  [1,3,5,7,9,11];
 *
 * const newNumber = 4; //Giá trị này có thể thay đổi
 *
 * Viết chương trình chèn vào mảng numbers mà không làm thay đổi thứ tự tăng dần của mảng
 */
function insertIntoSortedArray(arr, newNum) {
    arr.push(newNum);
    return arr.sort((a, b) => a - b);
}
numbers = [1, 3, 5, 7, 9, 11];
let newNumber = 4;
let updatedNumbers = insertIntoSortedArray(numbers, newNumber);
console.log(`bai-5: ${updatedNumbers}`);
export {};
//# sourceMappingURL=index.js.map