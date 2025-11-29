# Student Career Guidance System 🎓

A web-based **university admission consulting system for high school students**, consisting of a **backend (Spring Boot)** and a **frontend (React + Vite)**.

This project was built to apply learned knowledge to create a useful utility, providing **reference information** about academic majors, admission scores, and career guidance for students.

⚠️ **Note**: This system is for **reference purposes only** and is not an official tool for major/university selection.
The data depends on public sources from universities → it requires a mechanism for periodic updates and normalization if deployed for actual use.

---

## 🚀 Technologies Used

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
- Bootstrap 5 CSS

---

## 📂 Project Structure

```text
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

## ⚙️ Installation & Setup

### 1. Clone project
```bash
git clone https://github.com/<username>/<repo-name>.git
cd <repo-name>
````

### 2. Backend (Spring Boot)

```bash
cd backend
# Import into IntelliJ / Eclipse or run via Maven
mvn spring-boot:run
```

👉 Server runs by default at http://localhost:8080

### 3. Frontend (React + Vite)

```bash
cd frontend
npm install   # or yarn install
npm run dev   # runs at http://localhost:5173
```

### 🔑 Environment Configuration

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

## 📌 Key Features

### 🔐 Registration / Login (JWT)

![Login](https://github.com/user-attachments/assets/926992b9-b090-4ce6-8f80-1bd39fbf0934)
![Register](https://github.com/user-attachments/assets/4e1b0d24-5141-40ac-b878-c2c9b8d53f64)

### 👤 Account Management (Admin / Student / Teacher)

![Account1](https://github.com/user-attachments/assets/6d820a65-6d8e-4eb4-8bca-190af24df4b8)
![Account2](https://github.com/user-attachments/assets/7e023ba3-b32d-4fd5-83d8-c7f0701f00d6)
![Account3](https://github.com/user-attachments/assets/21d4e564-091e-4eb4-a558-52e197889e9a)

### 📝 Holland Career Test

![Holland1](https://github.com/user-attachments/assets/818d8afe-0d5a-48d5-8cbf-de6d2ba95ea1)
![Holland2](https://github.com/user-attachments/assets/ef59182e-6115-415d-8637-bc250db9eda3)
![Holland3](https://github.com/user-attachments/assets/a6935705-cbe9-43f3-b80d-f554573c3cdd)
![Holland4](https://github.com/user-attachments/assets/8428d142-4a6c-4bb0-bf95-c6a2eba98437)
![Holland5](https://github.com/user-attachments/assets/a1e8f0d9-6a1a-40d3-8729-fca23ba721b3)

### 🎯 Major Suggestions (Based on scores + career test)

![Suggest1](https://github.com/user-attachments/assets/a317f5b6-1a38-4d63-b676-15d6f5daddbc)
![Suggest2](https://github.com/user-attachments/assets/f6c1e0d5-53b2-4e7f-bb35-e7aca50043b1)
![Suggest3](https://github.com/user-attachments/assets/a8d8a4f2-eefc-414f-844a-6db5ca9f2a8e)
![Suggest4](https://github.com/user-attachments/assets/eb6eace2-0ab2-4b09-bf63-3b82a50b32e3)
![Suggest5](https://github.com/user-attachments/assets/271c2e5b-5ddc-44c4-838f-2f46bc721070)

### 🏫 Major / University Information

![School1](https://github.com/user-attachments/assets/49c2d366-a16a-478d-afd8-53743d8c49d6)
![School2](https://github.com/user-attachments/assets/74c32eeb-59d1-4d57-a463-90839475a27a)
![School3](https://github.com/user-attachments/assets/ddb2ef3e-9e8e-4486-a107-dccd1ba5a266)

---

## 🌍 Deployment

* **Backend**: Can be deployed for free on Render or Railway.
* **Frontend**: Can be deployed for free on Netlify or Vercel.
* **Database**: Use free MySQL on Clever Cloud or PlanetScale.

---

## 👨‍💻 Contributors

* **Trần Tuấn Thắng** (Backend + Frontend)
* **Supervisor**: TS. Phan Trần Minh Khuê

---

## 📜 License

Distributed under the MIT License.

```

---
