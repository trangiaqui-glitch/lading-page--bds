# Antigravity Project Instructions — Vinhomes Grand Park Landing Page

## 1. Mục tiêu

Xây dựng một Landing Page quảng bá bất động sản **Vinhomes Grand Park tại thành phố Thủ Đức, TP. Hồ Chí Minh**.

Đây là một website frontend tĩnh. Mã nguồn cuối cùng phải chạy trực tiếp bằng cách mở `index.html` trong trình duyệt hoặc qua một static server.

## 2. Công nghệ bắt buộc

- HTML5 thuần.
- CSS3 thuần.
- Bootstrap 5 qua CDN.
- JavaScript thuần (vanilla JS).
- Không dùng React, Vue, Angular, Svelte, jQuery hoặc framework frontend khác.
- Không dùng Node.js/build step/package manager nếu không cần thiết.
- Không dùng PHP, Python, Java, Node backend hoặc bất kỳ ngôn ngữ backend nào.
- Không tạo API/backend.
- Không dùng TypeScript.
- File entry chính bắt buộc là `index.html`.

## 3. Cấu trúc file mong muốn

```text
/
├── index.html
├── styles.css
├── script.js
└── assets/
    └── (chỉ tạo nếu thực sự cần)
```

Có thể gộp CSS/JavaScript vào `index.html` nếu điều đó làm project đơn giản hơn, nhưng ưu tiên tách thành `styles.css` và `script.js`.

## 4. Yêu cầu giao diện

### Màu sắc

- Background chính: `#f2f2f2`
- Màu chữ/chủ đạo: `#2d2d86`
- Có thể dùng trắng `#ffffff`, xám trung tính và các màu phụ nhẹ để tạo tương phản.
- Không làm giao diện quá nhiều màu.
- Phong cách tổng thể: hiện đại, cao cấp, sạch sẽ, phù hợp lĩnh vực bất động sản.

### Header / Navbar

- Có thương hiệu/logo chữ **Vinhomes**.
- Navbar rõ ràng, tối giản.
- Menu có anchor link tới các section chính.
- Trên mobile phải chuyển sang Bootstrap responsive navbar/collapse.
- Navbar nên dễ đọc và có trạng thái hover/focus rõ ràng.

### Hero Section

Hero phải có:
- Tiêu đề thu hút nhưng không sử dụng tuyên bố sai sự thật.
- Một đoạn mô tả ngắn.
- Một CTA nổi bật.
- Hình ảnh bất động sản nằm bên phải trên desktop.
- Trên mobile, hình ảnh chuyển xuống dưới nội dung.
- Có thể dùng hình ảnh minh họa liên quan tới bất động sản, biệt thự nghỉ dưỡng, không gian đô thị và Vinschool.
- Không sử dụng logo/thương hiệu bên thứ ba theo cách gây hiểu rằng họ là đối tác nếu không có căn cứ.

### Features Section

Tạo 3 feature cards, mỗi card có một hình ảnh minh họa khác nhau:

1. **Lối sống thượng lưu**
2. **Tiện ích tối ưu**
3. **Pháp lý nhanh gọn**

Mỗi card cần có:
- Hình ảnh.
- Tiêu đề.
- Mô tả ngắn.
- Thiết kế đồng nhất.
- Hiệu ứng hover nhẹ, không lạm dụng animation.

### Footer

Có:
- Thông tin bản quyền.
- Thông tin liên hệ mẫu.
- Có thể có số điện thoại/email placeholder rõ ràng nếu chưa có dữ liệu thật.
- Không được bịa thông tin pháp lý, giấy phép, hotline chính thức hoặc cam kết thương mại.

## 5. Hình ảnh

- Ưu tiên hình ảnh web phù hợp chủ đề và có thể tải từ nguồn công khai.
- Nếu dùng ảnh từ CDN/URL bên ngoài, đặt `alt` text có ý nghĩa.
- Không để ảnh làm vỡ layout khi mạng chậm.
- Dùng `object-fit: cover` khi phù hợp.
- Không dùng ảnh có watermark rõ ràng.
- Nếu không thể xác định quyền sử dụng ảnh, dùng ảnh placeholder/nguồn ảnh miễn phí phù hợp thay vì khẳng định quyền sở hữu.

## 6. UX / Responsive

Website phải responsive tối thiểu cho:
- Mobile ~320–575px
- Tablet ~576–991px
- Desktop >=992px

Yêu cầu:
- Không có horizontal overflow.
- CTA dễ bấm trên mobile.
- Typography có hierarchy rõ ràng.
- Khoảng cách giữa các section nhất quán.
- Hình ảnh không méo.
- Các nút có `:hover` và `:focus`.

## 7. JavaScript

JavaScript chỉ phục vụ frontend, ví dụ:
- Smooth scrolling.
- Navbar behavior.
- Nút CTA scroll tới section liên hệ.
- Hiệu ứng nhỏ khi scroll nếu cần.

Không tạo backend.

Nếu có form:
- Không giả vờ gửi dữ liệu lên server.
- Có thể validate frontend và hiển thị thông báo demo.
- Ghi chú rõ đây là form demo nếu không có backend.

## 8. Accessibility

- Dùng semantic HTML5.
- Mỗi ảnh có `alt`.
- Button/link có tên rõ ràng.
- Màu chữ phải đủ tương phản.
- Có thể điều hướng bằng keyboard.
- Không dùng animation gây khó chịu.
- Nếu có icon, không để icon là thông tin duy nhất.

## 9. SEO cơ bản

Trong `index.html` phải có:
- `lang="vi"`.
- `charset="UTF-8"`.
- `viewport`.
- `<title>` phù hợp.
- Meta description tiếng Việt.
- Semantic headings, chỉ dùng một `<h1>` chính.

## 10. Nguyên tắc nội dung

Không tự bịa các thông tin mang tính pháp lý/thương mại như:
- Giá bán cụ thể.
- Chính sách thanh toán.
- Diện tích pháp lý cụ thể.
- Thời hạn sở hữu.
- Cam kết lợi nhuận.
- Tỷ lệ sinh lời.
- Thời gian bàn giao.
- Số điện thoại/hotline chính thức.
- Tình trạng pháp lý của một dự án.

Nếu cần minh họa, dùng wording trung tính như “Liên hệ để nhận thông tin chi tiết” thay vì tạo số liệu giả.

## 11. Quy trình thực hiện

1. Kiểm tra cấu trúc project hiện tại.
2. Nếu chưa có code, tạo `index.html`, `styles.css`, `script.js`.
3. Implement layout bằng Bootstrap + CSS tùy chỉnh.
4. Kiểm tra responsive.
5. Kiểm tra tất cả anchor link.
6. Kiểm tra console không có lỗi JavaScript.
7. Kiểm tra ảnh, alt text và overflow.
8. Chỉ hoàn tất khi yêu cầu trong `SPEC.md` và `CHECKLIST.md` đều được đáp ứng.

## 12. Definition of Done

Task chỉ được xem là hoàn thành khi:

- `index.html` tồn tại và là entry point.
- Trang chạy như static frontend.
- Bootstrap được load qua CDN.
- Có Navbar, Hero, Features và Footer.
- Hero có ảnh bên phải trên desktop.
- Có đúng 3 feature chính.
- Có responsive mobile/tablet/desktop.
- CSS sử dụng màu chủ đạo `#f2f2f2` và `#2d2d86`.
- Không có backend.
- Không có framework frontend ngoài Bootstrap.
- Không có lỗi rõ ràng trong HTML/CSS/JS.
