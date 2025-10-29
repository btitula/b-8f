const MANGA_ITEMS = [
  {
    id: 1,
    name: 'One Punch Man',
    chapter: 'Tập 31',
    price: 28000,
    image: './images/onepunch-man_31_jp_-648x1024.webp',
    description: 'Luyện Ngục Vô Song Đế Vương Hỏa Thiêu Pháo',
    shortContent: 'Đám quái nhân cấp cao lần lượt đốn hạ các anh hùng cấp S... Giữa cơn nguy khốn đó, King – người đàn ông mạnh nhất hành tinh đã đứng lên! Trong vòng vây quái nhân với sát khí trùng trùng, ông ta vẫn tỏ ra cực kì bình tĩnh và hiên ngang! Các anh hùng đồng loạt nín thở, chờ thời khắc King tung tuyệt chiêu tất sáts',
    isSaled: true,
    salePercent: 25,
    isPublished: true
  },
  {
    id: 2,
    name: 'One Punch Man',
    chapter: 'Tập 32',
    price: 28000,
    image: './images/one-punch-man-tap-32-jp-649x1024.webp',
    description: 'Ban Phước',
    shortContent: 'Garo và Rết Đại Thủy Tổ lao vào cắn xé nhau dữ dội! Ngoài khơi xa, Nước Biển Thành Tinh vẫn đang rình thời cơ thích hợp để trả thù… Rết Đại Thủy Tổ định triệt hạ trực thăng cứu viện của Tareo và Sekingar, may sao Trẻ Trâu Chày Cối đã kịp thời xuất hiện! Đang đối đầu Garo, không biết từ lúc nào mà các anh hùng lại chuyển sang chiến đấu cùng hắn…',
    isSaled: false,
    salePercent: 0,
    isPublished: true
  },
  {
    id: 3,
    name: 'One Punch Man',
    chapter: 'Tập 33',
    price: 28000,
    image: './images/one-punch-man-tap-33-jp-647x1024.webp',
    description: 'Công suất bình phương',
    shortContent: 'Saitama và Garou cuối cùng cũng chạm trán. Saitama cố gắng thuyết phục Garou nghĩ đến cảm xúc của Tareo lúc nhỏ, nhưng Garou lại đẩy nhanh quá trình biến đổi thành quái vật. Ngay khi hắn chuẩn bị bị đánh bại bởi sức mạnh áp đảo của Saitama, một giọng nói vang lên, và Garou đạt được sức mạnh đáng kinh ngạc!',
    isSaled: false,
    salePercent: 0,
    isPublished: false
  }
]

const TIMEOUT = {
  TWO_SECONDS: '2000',
  THREE_SECONDS: '3000'
}

const MESSAGE = {
  ADD_TASK_ERROR: 'A task with this name already exists.',
  ADD_TASK_SUCCESS: 'New task added successfully.',
  DELETE_TASK_SUCCESS: 'Task deleted successfully.',
  MARK_TASK_AS_COMPLETED: 'Task marked as completed.',
  MARK_TASK_AS_UNDONE: 'Task marked as incomplete.',
  TEXT_EMPTY: 'Please enter a task name.',
  UPDATE_TASK_SUCCESS: 'Task updated successfully.'
};

const FONT_AWESOME_ICONS = {
  FA_CIRCLE_CHECK: 'fa-circle-check',
  FA_CIRCLE_EXCLAMATION: 'fa-circle-exclamation',
  FA_CIRCLE_INFO: 'fa-circle-info',
  FA_CIRCLE_PLUS: 'fa-circle-plus',
  FA_CIRCLE_XMARK: 'fa-circle-xmark',
  FA_TRASH: 'fa-trash',
  FA_PENCIL: 'fa-pen-to-square',
};

const COLORS = {
  TEXT_COLOR: '#191A40',
  YELLOW: '#FDE44C',
  GRAY: 'lightgray',
  GREEN: '#01EDC7',
  RED: '#FE546E'
}

export const CONSTANT = {
  COLORS,
  FONT_AWESOME_ICONS,
  MANGA_ITEMS,
  MESSAGE,
  TIMEOUT
};