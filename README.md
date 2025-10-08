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
- Bootstrap5 CSS

---

## 📂 Cấu trúc thư mục

```

.
├── backend/        # Spring Boot (API server)
│   ├── src/
│   ├── pom.xml
│   └── target/ (ignored)
│
├── frontend/       # React + Vite (client UI)
│   ├── src/
│   ├── package.json
│   └── dist/ (ignored)
│
├── .gitignore
├── README.md
└── LICENSE

````

---

## ⚙️ Cài đặt & chạy dự án

### 1. Clone project
```bash
git clone https://github.com/<username>/<repo-name>.git
cd <repo-name>
````

### 2. Backend (Spring Boot)

```bash
cd backend
# Import vào IntelliJ / Eclipse hoặc chạy bằng Maven
mvn spring-boot:run
```

👉 Server chạy mặc định tại `http://localhost:8080`

### 3. Frontend (React + Vite)

```bash
cd frontend
npm install   # hoặc yarn install
npm run dev   # chạy ở http://localhost:5173
```

### 🔑 Cấu hình môi trường

**Backend (`application.properties`):**

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

# JWT secret key
jwt.secret=your_secret_key
```

**Frontend (`.env`):**

```env
VITE_API_URL=http://localhost:8080/api
```

---

## 📌 Chức năng chính

### 🔐 Đăng ký / Đăng nhập (JWT)

![Login](https://github.com/user-attachments/assets/926992b9-b090-4ce6-8f80-1bd39fbf0934)
![Register](https://github.com/user-attachments/assets/4e1b0d24-5141-40ac-b878-c2c9b8d53f64)

### 👤 Quản lý tài khoản (Admin / Học sinh / Giáo viên)

![Account1](https://github.com/user-attachments/assets/6d820a65-6d8e-4eb4-8bca-190af24df4b8)
![Account2](https://github.com/user-attachments/assets/7e023ba3-b32d-4fd5-83d8-c7f0701f00d6)
![Account3](https://github.com/user-attachments/assets/21d4e564-091e-4eb4-a558-52e197889e9a)

### 📝 Làm trắc nghiệm Holland

![Holland1](https://github.com/user-attachments/assets/818d8afe-0d5a-48d5-8cbf-de6d2ba95ea1)
![Holland2](https://github.com/user-attachments/assets/ef59182e-6115-415d-8637-bc250db9eda3)
![Holland3](https://github.com/user-attachments/assets/a6935705-cbe9-43f3-b80d-f554573c3cdd)
![Holland4](https://github.com/user-attachments/assets/8428d142-4a6c-4bb0-bf95-c6a2eba98437)
![Holland5](https://github.com/user-attachments/assets/a1e8f0d9-6a1a-40d3-8729-fca23ba721b3)

### 🎯 Gợi ý ngành học (dựa trên điểm thi + trắc nghiệm hướng nghiệp)

![Suggest1](https://github.com/user-attachments/assets/a317f5b6-1a38-4d63-b676-15d6f5daddbc)
![Suggest2](https://github.com/user-attachments/assets/f6c1e0d5-53b2-4e7f-bb35-e7aca50043b1)
![Suggest3](https://github.com/user-attachments/assets/a8d8a4f2-eefc-414f-844a-6db5ca9f2a8e)
![Suggest4](https://github.com/user-attachments/assets/eb6eace2-0ab2-4b09-bf63-3b82a50b32e3)
![Suggest5](https://github.com/user-attachments/assets/271c2e5b-5ddc-44c4-838f-2f46bc721070)

### 🏫 Xem thông tin ngành / trường

![School1](https://github.com/user-attachments/assets/49c2d366-a16a-478d-afd8-53743d8c49d6)
![School2](https://github.com/user-attachments/assets/74c32eeb-59d1-4d57-a463-90839475a27a)
![School3](https://github.com/user-attachments/assets/ddb2ef3e-9e8e-4486-a107-dccd1ba5a266)

---

## 🌍 Triển khai (Deployment)

* **Backend**: có thể deploy miễn phí lên [Render](https://render.com) hoặc [Railway](https://railway.app)
* **Frontend**: deploy miễn phí lên [Netlify](https://netlify.com) hoặc [Vercel](https://vercel.com)
* **Database**: dùng MySQL free trên [Clever Cloud](https://www.clever-cloud.com/) hoặc [PlanetScale](https://planetscale.com/)

---

## 👨‍💻 Nhóm thực hiện

* **Trần Tuấn Thắng** (Backend + Frontend)
* **Giảng viên hướng dẫn**: TS. Phan Trần Minh Khuê

---

## 📜 Giấy phép

Phát hành theo [MIT License](LICENSE)

```

---
