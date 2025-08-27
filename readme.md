# 🧠 Checkers Game với Node.js

Đây là một dự án đơn giản xây dựng trò chơi **Checkers** (hay còn gọi là Cờ Caro) sử dụng Node.js và Socket.IO. Mục tiêu là tạo một trò chơi hai người chơi có thể tương tác thời gian thực qua trình duyệt.

---

## 🔎 Mô tả cách chơi

Người chơi sẽ lần lượt đánh dấu ký hiệu của mình (**X** hoặc **O**) vào các ô trống trên bàn cờ. Mục tiêu là tạo thành một chuỗi **5 dấu liên tiếp** theo chiều ngang, dọc hoặc chéo mà không bị chặn hai đầu.

---

## 📜 Luật chơi cơ bản

-   **Số người chơi**: 2 người
-   **Ký hiệu**: Một người dùng X, người còn lại dùng O
-   **Lượt đi**: Người chơi thay phiên nhau đánh vào ô trống
-   **Chiến thắng**: Người đầu tiên tạo được chuỗi 5 dấu liên tiếp theo một chiều bất kỳ sẽ thắng, trường hợp hòa là khi số ô đạt giới hạn.
-   **Bàn cờ**: Bàn cờ 10x10 ô vuông

---

## 💻Hướng dẫn chạy dự án tạo dự án

Dự án này chạy bằng **Node.js**, file khởi động chính là **index.js**.

## 📌 Yêu cầu hệ thống

-   [Node.js](https://nodejs.org/) (phiên bản >= 16.x khuyến nghị)
-   [npm](https://www.npmjs.com/) (có sẵn khi cài Node.js)

---

## ⚙️ Cài đặt

1. Clone hoặc tải dự án về:

    ```bash
    git clone https://github.com/TUANKIET0397/Checkers.git
    cd Checkers
    ```

2. Cài dependencies:
    ```bash
    npm install
    ```

---

## ▶️ Chạy dự án

```bash
node src/index.js
```
