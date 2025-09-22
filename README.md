# Student Career Guidance System 🎓

Hệ thống web hỗ trợ **tư vấn tuyển sinh cho học sinh THPT**, gồm **backend (Spring Boot)** và **frontend (React + Vite)**.  
Dự án được xây dựng với mục tiêu áp dụng các kiến thức đã học để tạo ra một sản phẩm tiện ích, cung cấp **thông tin tham khảo** về ngành học, điểm chuẩn và gợi ý hướng nghiệp cho học sinh.

⚠️ **Lưu ý**: Hệ thống chỉ mang tính **tham khảo**, không phải công cụ chính thức để lựa chọn ngành/trường.  
Dữ liệu phụ thuộc vào nguồn công khai của các trường → cần có cơ chế cập nhật & chuẩn hoá định kỳ nếu đưa vào sử dụng thực tế.

---

## 🚀 Công nghệ sử dụng

### Backend (Spring Boot)
- Java 17+
- Spring Boot 3.x
- Spring Security + JWT
- Hibernate / JPA
- MySQL

### Frontend (React + Vite)
- React 18
- Vite
- Axios (API calls)
- React Router DOM
- Tailwind CSS

---

## 📂 Cấu trúc thư mục

.
├── backend/ # Spring Boot (API server)
│ ├── src/
│ ├── pom.xml
│ └── target/ (ignored)
│
├── frontend/ # React + Vite (client UI)
│ ├── src/
│ ├── package.json
│ └── dist/ (ignored)
│
├── .gitignore
├── README.md
└── LICENSE

---

## ⚙️ Cài đặt & chạy dự án

### 1. Clone project
```bash
git clone https://github.com/<username>/<repo-name>.git
cd <repo-name>


2. Backend (Spring Boot)
cd backend
# Import vào IntelliJ / Eclipse hoặc chạy bằng Maven
mvn spring-boot:run
Server chạy mặc định tại http://localhost:8080.


3. Frontend (React + Vite)
cd frontend
npm install   # hoặc yarn install
npm run dev   # chạy ở http://localhost:5173

🔑 Cấu hình môi trường
Backend (application.properties)
spring.datasource.url=jdbc:mysql://localhost:3306/your_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

# JWT secret key
jwt.secret=your_secret_key

Frontend (.env)
VITE_API_URL=http://localhost:8080/api

📌 Chức năng chính

Đăng ký / Đăng nhập (JWT)

Quản lý tài khoản (Admin / Học sinh / Giáo viên)

Gợi ý ngành học dựa trên điểm thi + trắc nghiệm hướng nghiệp (Holland, MBTI)

Quản lý ngành/trường và điểm chuẩn

Xem thông tin ngành/trường

Giao diện web trực quan, dễ sử dụng

🌍 Triển khai (Deployment)

Backend: có thể deploy miễn phí lên Render
 hoặc Railway

Frontend: deploy miễn phí lên Netlify
 hoặc Vercel

Database: dùng MySQL free trên Clever Cloud
 hoặc PlanetScale

👨‍💻 Nhóm thực hiện

Trần Tuấn Thắng (Backend + Frontend)

Giảng viên hướng dẫn: ThS. Phan Trần Minh Khuê

📜 Giấy phép

Phát hành theo MIT License