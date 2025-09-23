/*--------------------------------
Bài tập 1

Viết chương trình khai báo một biến age và gán giá trị số tuổi của bạn.

Sau đó, in ra câu:

Tôi năm nay <age> tuổi.
--------------------------------*/
let age = 20;
console.log(`01 - Tôi năm nay ${age} tuổi.`);


/*--------------------------------
Bài tập 2

Khai báo hằng số PI = 3.14159. Tính diện tích hình tròn với bán kính r = 5.
--------------------------------*/
const PI = 3.14159;
let r = 5;
let area = PI * r * r;
console.log(`02 - Diện tích hình tròn là ${area}.`);


/*--------------------------------
Bài tập 3

Viết chương trình tính:

Tổng 2 số a = 7, b = 3

Hiệu, tích, thương, số dư
*/
let a = 7;
let b = 3;
let sum = a + b;
let difference = a - b;
let product = a * b;
let quotient = a / b;
let remainder = a % b;
console.log(`03 - Tổng 2 số a và b là ${sum}.`);
console.log(`03 - Hiệu 2 số a và b là ${difference}.`);
console.log(`03 - Tích 2 số a và b là ${product}.`);
console.log(`03 - Thương 2 số a và b là ${quotient}.`);
console.log(`03 - Số dư 2 số a và b là ${remainder}.`);


/*--------------------------------
Bài tập 4

Cho các biến

let name = "";

let defaultName = "Khách";

Hãy gán cho biến displayName giá trị name nếu name có nội dung, ngược lại là defaultName
--------------------------------*/
let nameX = "";
let defaultName = "Khách";
let displayName = nameX || defaultName;
console.log(`04 - Display name là ${displayName}.`);


/*--------------------------------
Bài tập 5

Viết chương trình kiểm tra một người có đủ điều kiện lái xe không. Điều kiện:

Tuổi ≥ 18 (age)

Có bằng lái (hasLicense = true)

Nếu đủ điều kiện thì in "Đủ điều kiện", ngược lại "Không đủ điều kiện".
*/
let agex = 18;
let hasLicense = true;
if (agex >= 18 && hasLicense) {
  console.log(`05 - Đủ điều kiện.`);
} else {
  console.log(`05 - Không đủ điều kiện.`);
}

/*--------------------------------
Bài tập 6

Cho 2 biến username và password. Dùng toán tử đã học để kiểm tra xem username và password khác rỗng không (In ra giá trị boolean)
--------------------------------*/
let username = "";
let password = "";
let isNotEmpty = username !== "" && password !== "";
console.log(`06 - Username và password khác rỗng là ${isNotEmpty}.`);


/*--------------------------------
Bài tập 7

Cho trước giá khuyến mãi (salePrice), tỷ lệ giảm giá (discountRate). Tính giá gốc của sản phẩm (price)
--------------------------------*/
let salePrice = 100;
let discountRate = 10;
let price = (100 - discountRate) / 100 * salePrice;
console.log(`07 - Giá gốc của sản phẩm là ${price}.`);


/*--------------------------------
Bài tập 8

Cho trước 2 biến a, b. Gán giá trị số cho 2 biến.

Yêu cầu: Hoán vị giá trị biến nhưng không được dùng biến trung gian
*/
let ax = 1;
let bx = 2;
bx = ax + bx;
ax = bx - ax;
bx = bx - ax;
console.log(`08 - Giá trị của a và b sau khi hoán vị là ${ax} và ${bx}.`);
