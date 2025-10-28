/**
 * Bài 1

const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1200 },
  { id: 2, name: "Phone", category: "Electronics", price: 800 },
  { id: 3, name: "Shirt", category: "Clothing", price: 40 },
  { id: 4, name: "Shoes", category: "Clothing", price: 60 },
  { id: 5, name: "Headphones", category: "Electronics", price: 150 },
];
Viết các hàm thực hiện các yêu cầu sau:

- Lọc ra các sản phẩm thuộc danh mục "Electronics".

- Tính tổng giá của tất cả sản phẩm trong danh mục "Electronics".

- Chuyển đổi mảng sản phẩm thành một object, trong đó key là category, value là mảng các sản phẩm thuộc danh mục đó.
 */

const exercise01 = () => {
  const products = [
    { id: 1, name: "Laptop", category: "Electronics", price: 1200 },
    { id: 2, name: "Phone", category: "Electronics", price: 800 },
    { id: 3, name: "Shirt", category: "Clothing", price: 40 },
    { id: 4, name: "Shoes", category: "Clothing", price: 60 },
    { id: 5, name: "Headphones", category: "Electronics", price: 150 },
  ];

  const electronicsProducts = products.filter(product => product.category === "Electronics");
  console.log(`01 - Các sản phẩm thuộc danh mục "Electronics": ${JSON.stringify(electronicsProducts.map(product => product.name))}`);

  const totalPrice = electronicsProducts.reduce((sum, product) => sum + product.price, 0);
  console.log(`01 - Tổng giá của tất cả sản phẩm trong danh mục "Electronics": ${totalPrice}`);

  const productsByCategory = products.reduce((acc, product) => {
    acc[product.category] = [...(acc[product.category] || []), product];
    return acc;
  }, {});
  console.log(`01 - Chuyển đổi mảng sản phẩm thành một object, trong đó key là category, value là mảng các sản phẩm thuộc danh mục đó: ${JSON.stringify(productsByCategory)}`);
};
exercise01();

/**
 * Bài 2

const students = [
  { id: 1, name: "An", scores: { math: 8, english: 7, science: 9 } },
  { id: 2, name: "Bình", scores: { math: 6, english: 8, science: 7 } },
  { id: 3, name: "Châu", scores: { math: 9, english: 6, science: 8 } },
];
Viết các hàm thực hiện các yêu cầu sau:

- Tính điểm trung bình của từng học viên.

- Tìm học viên có điểm trung bình cao nhất.

- Sắp xếp danh sách học viên theo điểm trung bình giảm dần.
 */

const exercise02 = () => {
  const students = [
    { id: 1, name: "An", scores: { math: 8, english: 7, science: 9 } },
    { id: 2, name: "Bình", scores: { math: 6, english: 8, science: 7 } },
    { id: 3, name: "Châu", scores: { math: 9, english: 6, science: 8 } },
  ];

  const studentAverages = students.map((student) => {
    const scoresArray = Object.values(student.scores);
    const averageScore = scoresArray.reduce((sum, score) => sum + score, 0) / scoresArray.length;
    return {
      name: student.name,
      averageScore,
    };
  });
  console.log(`02 - Điểm trung bình của từng học viên: ${JSON.stringify(studentAverages)}`);

  const topStudent = studentAverages.reduce((student, currentStudent) => {
    return currentStudent.averageScore > student.averageScore ? currentStudent : student;
  }, { averageScore: 0 });
  console.log(`02 - Học viên có điểm trung bình cao nhất: ${JSON.stringify(topStudent)}`);

  const sortedStudents = studentAverages.sort((a, b) => b.averageScore - a.averageScore);
  console.log(`02 - Danh sách học viên sắp xếp theo điểm trung bình giảm dần: ${JSON.stringify(sortedStudents)}`);
};
exercise02();

/**
 * Bài 3

const orders = [
  {
    orderId: 101,
    customer: "John",
    items: [{ name: "Laptop", price: 1000, quantity: 1 }],
  },
  {
    orderId: 102,
    customer: "Alice",
    items: [
      { name: "Phone", price: 500, quantity: 2 },
      { name: "Charger", price: 50, quantity: 3 },
    ],
  },
  {
    orderId: 103,
    customer: "Bob",
    items: [{ name: "Headphones", price: 200, quantity: 2 }],
  },
];
Viết các hàm thực hiện các yêu cầu sau:

- Tính tổng tiền của từng đơn hàng.

- Tìm khách hàng có đơn hàng có tổng tiền cao nhất.

- Gộp danh sách tất cả các sản phẩm từ các đơn hàng, nhóm theo tên sản phẩm và tính tổng số lượng của mỗi sản phẩm.
 */

const exercise03 = () => {
  const orders = [
    {
      orderId: 101,
      customer: "John",
      items: [{ name: "Laptop", price: 1000, quantity: 1 }],
    },
    {
      orderId: 102,
      customer: "Alice",
      items: [
        { name: "Phone", price: 500, quantity: 2 },
        { name: "Charger", price: 50, quantity: 3 },
      ],
    },
    {
      orderId: 103,
      customer: "Bob",
      items: [{ name: "Headphones", price: 200, quantity: 2 }],
    },
  ];

  const orderTotals = orders.map((order) => {
    return {
      orderId: order.orderId,
      total: order.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };
  });
  console.log(`03 - Tổng tiền của từng đơn hàng: ${JSON.stringify(orderTotals)}`);

  const topCustomer = orderTotals.reduce((customer, currentCustomer) => {
    return currentCustomer.total > customer.total ? currentCustomer : customer;
  }, { total: 0 });
  console.log(`03 - Khách hàng có đơn hàng có tổng tiền cao nhất: ${JSON.stringify(topCustomer)}`);

  const productTotals = orders.flatMap((order) => order.items).reduce((acc, item) => {
    acc[item.name] = (acc[item.name] || 0) + item.quantity;
    return acc;
  }, {});
  console.log(`03 - Gộp danh sách tất cả các sản phẩm từ các đơn hàng, nhóm theo tên sản phẩm và tính tổng số lượng của mỗi sản phẩm: ${JSON.stringify(productTotals)}`);
};
exercise03();

/**
 * Bài 4

const employees = [
  { id: 1, name: "Mai", department: "IT", salary: 1200 },
  { id: 2, name: "Nam", department: "HR", salary: 800 },
  { id: 3, name: "Hà", department: "IT", salary: 1500 },
  { id: 4, name: "Linh", department: "Marketing", salary: 900 },
  { id: 5, name: "Phúc", department: "IT", salary: 1100 },
];
Viết các hàm thực hiện các yêu cầu sau:

- Tính tổng lương của từng phòng ban.

- Tìm nhân viên có mức lương cao nhất trong mỗi phòng ban.

- Chuyển đổi dữ liệu về dạng object, trong đó key là tên phòng ban, value là mảng nhân viên trong phòng ban đó.
 */

const exercise04 = () => {
  const employees = [
    { id: 1, name: "Mai", department: "IT", salary: 1200 },
    { id: 2, name: "Nam", department: "HR", salary: 800 },
    { id: 3, name: "Hà", department: "IT", salary: 1500 },
    { id: 4, name: "Linh", department: "Marketing", salary: 900 },
    { id: 5, name: "Phúc", department: "IT", salary: 1100 },
  ];

  // Tính tổng lương của từng phòng ban.
  const departmentTotals = employees.reduce((acc, employee) => {
    acc[employee.department] = (acc[employee.department] || 0) + employee.salary;
    return acc;
  }, {});
  console.log(`04 - Tổng lương của từng phòng ban: ${JSON.stringify(departmentTotals)}`);
  
  // Tìm nhân viên có mức lương cao nhất trong mỗi phòng ban.
  const topEmployee = employees.reduce((employee, currentEmployee) => {
    return currentEmployee.salary > employee.salary ? currentEmployee : employee;
  }, { salary: 0 });
  console.log(`04 - Nhân viên có mức lương cao nhất trong mỗi phòng ban: ${JSON.stringify(topEmployee)}`);

  // Chuyển đổi dữ liệu về dạng object, trong đó key là tên phòng ban, value là mảng nhân viên trong phòng ban đó.
  const employeesByDepartment = employees.reduce((acc, employee) => {
    acc[employee.department] = [...(acc[employee.department] || []), employee];
    return acc;
  }, {});
  console.log(`04 - Chuyển đổi dữ liệu về dạng object, trong đó key là tên phòng ban, value là mảng nhân viên trong phòng ban đó: ${JSON.stringify(employeesByDepartment)}`);
};
exercise04();

/**
 * Bài 5

const watchHistory = [
  { userId: 1, videoId: "A1", duration: 10 },
  { userId: 2, videoId: "B1", duration: 15 },
  { userId: 1, videoId: "A1", duration: 20 },
  { userId: 3, videoId: "C1", duration: 30 },
  { userId: 2, videoId: "B1", duration: 5 },
  { userId: 1, videoId: "A2", duration: 25 },
  { userId: 3, videoId: "C1", duration: 15 },
];
Viết các hàm thực hiện các yêu cầu sau:

- Tính tổng thời gian xem của từng video.

- Tìm video được xem nhiều nhất (dựa trên tổng thời gian).

- Nhóm lịch sử xem theo userId, trong đó mỗi userId sẽ chứa danh sách các video mà họ đã xem và tổng thời gian xem mỗi video. Sắp xếp danh sách video theo thời gian xem giảm dần.
 */

const exercise05 = () => {
  const watchHistory = [
    { userId: 1, videoId: "A1", duration: 10 },
    { userId: 2, videoId: "B1", duration: 15 },
    { userId: 1, videoId: "A1", duration: 20 },
    { userId: 3, videoId: "C1", duration: 30 },
    { userId: 2, videoId: "B1", duration: 5 },
    { userId: 1, videoId: "A2", duration: 25 },
    { userId: 3, videoId: "C1", duration: 15 },
  ];

  const videoTotals = watchHistory.reduce((acc, watch) => {
    acc[watch.videoId] = (acc[watch.videoId] || 0) + watch.duration;
    return acc;
  }, {});
  console.log(`05 - Tổng thời gian xem của từng video: ${JSON.stringify(videoTotals)}`);
  
  const mostWatchedVideo = Object.entries(videoTotals).reduce((mostWatched, currentVideo) => {
    return currentVideo[1] > mostWatched[1] ? currentVideo : mostWatched;
  }, { videoId: "", duration: 0 });
  console.log(`05 - Video được xem nhiều nhất: ${JSON.stringify(mostWatchedVideo)}`); 

  const watchedVideos = watchHistory.reduce((acc, watch) => {
    acc[watch.userId] = [...(acc[watch.userId] || []), { 
      videoId: watch.videoId,
      duration: watch.duration 
    }];
    return acc;
  }, {});
  const sortedWatchedVideos = Object.entries(watchedVideos).map(([userId, videos]) => {
    return {
      userId,
      videos: videos.sort((a, b) => b.duration - a.duration),
    };
  });
  console.log(`05 - Nhóm lịch sử xem theo userId, trong đó mỗi userId sẽ chứa danh sách các video mà họ đã xem và tổng thời gian xem mỗi video. Sắp xếp danh sách video theo thời gian xem giảm dần: ${JSON.stringify(sortedWatchedVideos)}`);
};
exercise05(); 

/**
 * Bài 6

const matches = [
  { teamA: "A", teamB: "B", scoreA: 2, scoreB: 1 },
  { teamA: "C", teamB: "D", scoreA: 1, scoreB: 3 },
  { teamA: "A", teamB: "C", scoreA: 2, scoreB: 2 },
  { teamA: "B", teamB: "D", scoreA: 0, scoreB: 1 },
  { teamA: "A", teamB: "D", scoreA: 3, scoreB: 1 },
];
Viết các hàm thực hiện các yêu cầu sau:

- Tính số trận thắng, hòa, thua của mỗi đội.

- Xếp hạng các đội bóng theo số điểm, với quy tắc:

* Thắng: +3 điểm

* Hòa: +1 điểm

* Thua: +0 điểm

- Tìm đội có số bàn thắng nhiều nhất.
 */

const exercise06 = () => {
  const matches = [
    { teamA: "A", teamB: "B", scoreA: 2, scoreB: 1 },
    { teamA: "C", teamB: "D", scoreA: 1, scoreB: 3 },
    { teamA: "A", teamB: "C", scoreA: 2, scoreB: 2 },
    { teamA: "B", teamB: "D", scoreA: 0, scoreB: 1 },
    { teamA: "A", teamB: "D", scoreA: 3, scoreB: 1 },
  ];

  const teamResults = matches.reduce((acc, match) => {
    acc[match.teamA] = (acc[match.teamA] || 0) + (match.scoreA > match.scoreB ? 1 : 0);
    acc[match.teamB] = (acc[match.teamB] || 0) + (match.scoreB > match.scoreA ? 1 : 0);
    return acc;
  }, {});
  console.log(`06 - Số trận thắng, hòa, thua của mỗi đội: ${JSON.stringify(teamResults)}`);
  
  const teamRankings = Object.entries(teamResults).map(([team, results]) => {
    return {
      team,
      wins: results,
    };
  });
  console.log(`06 - Xếp hạng các đội bóng theo số điểm, với quy tắc: ${JSON.stringify(teamRankings)}`);
  
  // Tìm đội có số bàn thắng nhiều nhất.
  const mostGoalsTeam = Object.entries(teamResults).reduce((team, currentTeam) => {
    return currentTeam.goals > team.goals ? currentTeam : team;
  }, { team: "", goals: 0 });
  console.log(`06 - Đội có số bàn thắng nhiều nhất: ${JSON.stringify(mostGoalsTeam)}`);
};
exercise06();