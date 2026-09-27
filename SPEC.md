# Landing Page Specification — Vinhomes Grand Park

## Project

Tên nội bộ: `vinhomes-grand-park-landing`

Mục tiêu: tạo một Landing Page bất động sản hiện đại, tối giản và responsive để giới thiệu Vinhomes Grand Park tại thành phố Thủ Đức.

## Primary user action

CTA chính:

> Nhận thông tin dự án

CTA có thể scroll tới khu vực liên hệ ở cuối trang.

## Page structure

```text
NAVBAR
  └── Logo: Vinhomes
  └── Giới thiệu
  └── Tiện ích
  └── Liên hệ

HERO
  ├── Eyebrow nhỏ
  ├── H1: thông điệp thu hút
  ├── Mô tả ngắn
  ├── CTA
  └── Hình ảnh lớn bên phải

FEATURES
  ├── Section heading
  ├── Card 01 — Lối sống thượng lưu
  ├── Card 02 — Tiện ích tối ưu
  └── Card 03 — Pháp lý nhanh gọn

CONTACT / CTA
  ├── Heading
  ├── Mô tả
  └── Nút liên hệ

FOOTER
  ├── Copyright
  └── Contact information
```

## Visual direction

### Overall

- Premium real-estate aesthetic.
- Clean whitespace.
- Rounded corners vừa phải.
- Shadows nhẹ.
- Không dùng gradient quá mạnh.
- Không dùng quá nhiều animation.
- Ưu tiên hình ảnh lớn, typography rõ ràng.

### Color tokens

```css
--bg: #f2f2f2;
--primary: #2d2d86;
--text: #2d2d2d;
--white: #ffffff;
```

Có thể thêm màu trung tính phụ nhưng không được làm mất nhận diện chính.

## Hero requirements

Desktop:
- Layout 2 cột.
- Text khoảng 45%.
- Image khoảng 55%.
- Image nằm bên phải.
- Hình ảnh có border-radius.
- CTA nằm ngay dưới mô tả.

Mobile:
- Chuyển thành 1 cột.
- Text trước, image sau.
- CTA full-width hoặc gần full-width nếu phù hợp.

## Feature card requirements

Ba card:

### Card 1

Title: `Lối sống thượng lưu`

Ý tưởng nội dung: mô tả trải nghiệm sống hiện đại, không gian xanh và môi trường sống được quy hoạch.

### Card 2

Title: `Tiện ích tối ưu`

Ý tưởng nội dung: mô tả hệ thống tiện ích và nhu cầu sinh hoạt đa dạng.

### Card 3

Title: `Pháp lý nhanh gọn`

Ý tưởng nội dung: diễn đạt thận trọng, khuyến khích khách hàng liên hệ để được cung cấp hồ sơ/thông tin chính xác. Không biến đây thành cam kết pháp lý tuyệt đối.

## Content tone

- Tiếng Việt.
- Ngắn gọn.
- Sang trọng.
- Có tính quảng cáo nhưng không phóng đại bằng số liệu chưa được xác minh.
- Không dùng các claim tuyệt đối như “số 1”, “tốt nhất Việt Nam”, “chắc chắn sinh lời” nếu không có nguồn xác thực.

## Technical constraints

- HTML5.
- CSS3.
- Bootstrap 5 CDN.
- Vanilla JavaScript.
- Static frontend only.
- Entry: `index.html`.

## Acceptance criteria

- [ ] Navbar responsive.
- [ ] Hero đúng cấu trúc.
- [ ] Hero image ở bên phải trên desktop.
- [ ] Ba feature cards có ba hình ảnh khác nhau.
- [ ] Footer có copyright và contact.
- [ ] Màu nền chính là `#f2f2f2`.
- [ ] Màu chủ đạo/chữ chính là `#2d2d86`.
- [ ] Không có backend.
- [ ] Không có framework JS.
- [ ] Không có horizontal scrollbar trên viewport phổ biến.
- [ ] CTA hoạt động.
- [ ] Anchor navigation hoạt động.
- [ ] Có meta title/description.
- [ ] Có alt text cho ảnh.
