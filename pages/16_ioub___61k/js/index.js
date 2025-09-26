/*
Bài tập 2

Viết chương trình kiểm tra 1 số có phải số nguyên tố hay không ?
*/
let number = 17;
let isPrime = true;
for (let i = 2; i < number; i++) {
  if (number % i === 0) {
    isPrime = false;
    break;
  }
}
console.log(`02 - Số ${number} là số nguyên tố: ${isPrime}.`);


/*
Bài tập 3

Cho 1 số nguyên bất kỳ, hiển thị danh sách các số chẵn và số lẻ

Input:

var n = 10;

Output:

Số lẻ: 1, 3, 5, 7, 9

Số chẵn: 2, 4, 6
*/
let n = 10;
let odd = [];
let even = [];
for (let i = 0; i < n; i++) {
  if (i % 2 === 0) {
    even.push(i);
  } else {
    odd.push(i);
  }
}
console.log(`03 - Số lẻ: ${odd.join(", ")}, Số chẵn: ${even.join(", ")}.`);


/*
Bài tập 4

Cho trước số nguyên n.Tính giá trị biểu thức sau

S = 1 * 2 + 2 * 3 + 3 * 4 + ... + n * (n + 1)
*/
let nx = 3;
let sum = 0;
for (let i = 1; i <= nx; i++) {
  console.log(`04 - ${i} * (${i} + 1): ${i * (i + 1)}`);
  sum += i * (i + 1);
}
console.log(`04 - Giá trị biểu thức S là ${sum}.`);

/*
Bài tập 5

Cho trước 2 số a, b. Tính tổng số chẵn và số lẻ trong khoảng từ a đến b

Input:

var a = 5, b = 9;

Output:

Tổng số lẻ: 21

Tổng số chẵn: 14
*/
let a = 2;
let b = 5;
let oddSum = 0;
let evenSum = 0;

if (a > b) {
  console.error(`05 - a phải nhỏ hơn b.`);
}

for (let i = a; i <= b; i++) {
  if (i % 2 === 0) {
    evenSum += i;
  } else {
    oddSum += i;
  }
}
console.log(`05 - Tổng số lẻ: ${oddSum}, Tổng số chẵn: ${evenSum}.`);


/*
Bài tập 6

Vẽ bàn cờ vua bằng cách dùng vòng lặp
*/
let rows = document.querySelector("#table-six tbody");
console.log(rows);
for (let i = 0; i < 8; i++) {
  let row = document.createElement("tr");
  for (let j = 0; j < 8; j++) {
    let cell = document.createElement("td");
    cell.classList.add((i + j) % 2 === 0 ? "cell-black" : "cell-white");
    row.appendChild(cell);
  }
  rows.appendChild(row);
}


/*
Bài tập 8

Vẽ tam giác số với n dòng

Ví dụ n = 5

```

1

2 3

4 5 6

7 8 9 10

11 12 13 14 15

*/
let ny = 5;
let current = 1;
for (let i = 1; i <= ny; i++) {
  let row = [];
  for (let j = 0; j < i; j++) {
    row.push(current++);
  }
  console.log(row.join(" "));
}

