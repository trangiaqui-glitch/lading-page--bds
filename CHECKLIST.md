# Final QA Checklist

Agent phải tự kiểm tra trước khi báo hoàn thành.

## Files

- [ ] `index.html` tồn tại.
- [ ] `styles.css` tồn tại nếu CSS được tách file.
- [ ] `script.js` tồn tại nếu JavaScript được tách file.
- [ ] Không tạo file backend.
- [ ] Không tạo framework/build configuration không cần thiết.

## HTML

- [ ] `<!doctype html>` hợp lệ.
- [ ] `<html lang="vi">`.
- [ ] UTF-8.
- [ ] Responsive viewport.
- [ ] Có `<title>`.
- [ ] Có meta description.
- [ ] Chỉ có một H1 chính.
- [ ] Semantic sections được sử dụng.
- [ ] Tất cả ảnh có alt text.
- [ ] Links/buttons có accessible name.

## Bootstrap

- [ ] Bootstrap được load bằng CDN.
- [ ] Không phụ thuộc vào npm.
- [ ] Navbar collapse hoạt động trên mobile.
- [ ] Grid responsive hoạt động.

## Design

- [ ] Background chính: `#f2f2f2`.
- [ ] Primary/text: `#2d2d86`.
- [ ] Giao diện sạch và hiện đại.
- [ ] Hero image ở bên phải trên desktop.
- [ ] Hero image xuống dưới trên mobile.
- [ ] Ba feature cards có hình ảnh khác nhau.
- [ ] Cards có spacing đồng nhất.
- [ ] CTA dễ nhìn.

## JavaScript

- [ ] Không có lỗi console.
- [ ] CTA hoạt động.
- [ ] Navigation anchor hoạt động.
- [ ] Không có code backend/API không cần thiết.
- [ ] Không có JavaScript framework.

## Responsive

Kiểm tra tối thiểu:

- [ ] 320px
- [ ] 375px
- [ ] 768px
- [ ] 1024px
- [ ] 1440px

- [ ] Không horizontal overflow.
- [ ] Text không bị cắt.
- [ ] Buttons không bị tràn.
- [ ] Images không méo.
- [ ] Navbar không bị vỡ.

## Content safety

- [ ] Không bịa giá.
- [ ] Không bịa hotline chính thức.
- [ ] Không bịa số liệu pháp lý.
- [ ] Không bịa cam kết lợi nhuận.
- [ ] Không đưa claim tuyệt đối thiếu nguồn.

## Final response

Khi hoàn thành, trả lời ngắn gọn:
1. Những file đã tạo/thay đổi.
2. Cách chạy: mở `index.html` hoặc dùng static server.
3. Nêu rõ nếu có nội dung/hình ảnh placeholder cần thay thế.
