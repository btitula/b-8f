const MANGA_ITEMS = [
  {
    id: 1,
    name: 'One Punch Man',
    chapter: 'Tập 25',
    price: 28000,
    image: './images/one-punch-man_25_978-604-2-28438-7-657x1024.webp',
    description: 'Kị sĩ cơ khí',
    shortContent: 'Saitama chẳng hiểu sao lại trở thành bạn đồng hành của Hào Quang Chớp Nhoáng. Trên mặt đất, nhóm anh hùng cấp A bị Miêu quái Mèo Méo Meo đánh cho tơi bời khói lửa. Giữa cơn nguy khốn, bỗng Kị Sĩ Cơ Khí xuất hiện. Liệu anh có giải vây cho đồng đội kịp thời!?',
    isSaled: false,
    salePercent: 0,
    isPublished: true
  },
  {
    id: 2,
    name: 'One Punch Man',
    chapter: 'Tập 26',
    price: 28000,
    image: './images/one-punch-man_26_-660x1024.webp',
    description: 'Chưa từng biết tới',
    shortContent: 'Đụng độ quái nhân gia nhiệt, một trong những đầu lĩnh của hội Quái Nhân, các anh hùng cấp S thật sự rơi vào bế tắc… Trong lúc đó, Tatsumaki vẫn và đang truy lùng chân tướng của Gyoro Gyoro, còn Siêu Hợp Kim Đen Bóng và Garo thì quần nhau té lửa, chỉ có Saitama là lạc lối trong mê cung dưới lòng đất…!?',
    isSaled: false,
    salePercent: 0,
    isPublished: true
  },
  {
    id: 3,
    name: 'One Punch Man',
    chapter: 'Tập 27',
    price: 28000,
    image: './images/one-punch-man_27_-668x1024.webp',
    description: 'Xuống vực sâu',
    shortContent: 'Psykos đã dung hợp làm một với Quái nhân vương Orochi để khuếch trương sức mạnh lên gấp trăm ngàn lần, khiến Tatsumaki đối phó vô cùng chật vật. Ở trận địa Siêu Hợp Kim Đen Bóng VS. Garo, sau rất nhiều năm chinh chiến, Siêu Hợp Kim Đen Bóng mới lại nếm mùi đau thương, anh cảm nhận sâu sắc nỗi sợ hãi lan tỏa khắp cơ thể và khối óc mình, không cách nào chống đỡ được... Còn về phần Saitama và Hào Quang Chớp Nhoáng, bộ đôi bất đắc dĩ này vẫn đang loay hoay trong mê cung thì bị mắc kẹt trong vụ sập hầm nghiêm trọng...',
    isSaled: false,
    salePercent: 0,
    isPublished: true
  },
  {
    id: 4,
    name: 'One Punch Man',
    chapter: 'Tập 28',
    price: 28000,
    image: './images/one-punch-man-tap-28-vn-665x1024.webp',
    description: 'Xuống vực sâu',
    shortContent: 'Hai kì phùng địch thủ, Psykos và Tatsumaki đang có một trận đối đầu siêu năng lực nảy lửa. Nhờ Genos mà cuộc giải cứu các anh hùng của Tatsumaki đã thành công, cô nàng đã sẵn sàng giải phóng một luồng sức mạnh làm rung chuyển cả thành phố... Chứng kiến trận đánh này, các anh hùng Cấp S đã có những chuyển biến tâm lí như thế nào!?',
    isSaled: false,
    salePercent: 0,
    isPublished: true
  },
  {
    id: 5,
    name: 'One Punch Man',
    chapter: 'Tập 29',
    price: 28000,
    image: './images/one-punch-man-tap-29-vn-665x1024.webp',
    description: 'Phất cờ trỗi dậy',
    shortContent: 'Blast, anh hùng số 1 Cấp S bỗng xuất hiện trước mặt Saitama và Hào Quang Chớp Nhoáng! Mục đích của anh ta là gì khi đuổi theo một chiếc hộp bí ẩn!? Trong lúc đó, các anh hùng Cấp S lại rơi vào tình thế hiểm nghèo trước cuộc tổng tấn công cực mạnh của bè lũ quái nhân cấp cao. Genos đã chiến đấu rất dũng cảm, mặc cho máy móc trong cơ thể anh liên tục ra tín hiệu cảnh báo nguy hiểm và có thể sẽ phát nổ…!?',
    isSaled: false,
    salePercent: 0,
    isPublished: true
  },
  {
    id: 6,
    name: 'One Punch Man',
    chapter: 'Tập 30',
    price: 28000,
    image: './images/one-punch-man-tap-30-vn-664x1024.webp',
    description: 'Chướng ngại lớn nhất',
    shortContent: 'Quyết tử với quân đoàn quái nhân, các anh hùng liên tục ngã xuống do vết thương quá nặng. Fubuki kiên trì dùng siêu năng lực chữa trị cho họ nhưng không xuể… Trong lúc đó, Nhật Luân của Kiếm Thánh Hội bỗng xuất hiện trợ chiến! Garo cũng trở lại với dạng quái nhân hóa bất lão bất tử, quyết đánh một trận sống mái vói thầy mình…',
    isSaled: false,
    salePercent: 0,
    isPublished: true
  },
  {
    id: 7,
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
    id: 8,
    name: 'One Punch Man',
    chapter: 'Tập 32',
    price: 35000,
    image: './images/one-punch-man-tap-32-jp-649x1024.webp',
    description: 'Ban Phước',
    shortContent: 'Garo và Rết Đại Thủy Tổ lao vào cắn xé nhau dữ dội! Ngoài khơi xa, Nước Biển Thành Tinh vẫn đang rình thời cơ thích hợp để trả thù… Rết Đại Thủy Tổ định triệt hạ trực thăng cứu viện của Tareo và Sekingar, may sao Trẻ Trâu Chày Cối đã kịp thời xuất hiện! Đang đối đầu Garo, không biết từ lúc nào mà các anh hùng lại chuyển sang chiến đấu cùng hắn…',
    isSaled: false,
    salePercent: 0,
    isPublished: false
  },
  {
    id: 9,
    name: 'One Punch Man',
    chapter: 'Tập 33',
    price: 118000,
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