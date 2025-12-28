import React from "react";
import { Link, useNavigate } from "react-router-dom"; // <<< IMPORT THÊM useNavigate

const Home = () => {
  // Khởi tạo Hook useNavigate ngay dưới đây
  const navigate = useNavigate();

  // --- Dữ liệu giả lập ---
  const statsData = [
    { number: "150+", label: "Trường Đại học/Cao đẳng" },
    { number: "2000+", label: "Mã ngành và khối xét tuyển" },
    { number: "50.000+", label: "Lượt trắc nghiệm thành công" },
    { number: "95%", label: "Học sinh tìm được ngành yêu thích" },
  ];

  const popularMajors = [
    { name: "Công nghệ thông tin", icon: "bi bi-laptop", link: "/nganh/it" },
    {
      name: "Kinh tế & Quản lý",
      icon: "bi bi-bar-chart-line",
      link: "/nganh/kinh-te",
    },
    { name: "Y Dược", icon: "bi bi-heart-pulse", link: "/nganh/y-duoc" },
  ];

  // Đường dẫn chung
  const links = {
    hollandTest: "/quizzes",
    scoreAnalysis: "/benchmark/score-check",
    benchmark: "/benchmark",
    fullMajorList: "/majors",
    register: "/register",
  };

  // --- Logic xử lý sự kiện CTA Chính ---
  const handleCtaClick = () => {
    // Sử dụng navigate để chuyển hướng đến trang nhập điểm
    navigate(links.scoreAnalysis);
    console.log("Chuyển đến trang nhập điểm thi bằng useNavigate.");
  };

  // --- Component Phụ: Thẻ Chức năng Cốt lõi (ĐÃ SỬA) ---
  const CoreFeatureCard = ({ icon, title, text, linkUrl }) => (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100 shadow-lg border-0 transition-300 hover-scale-up">
        <div className="card-body p-4">
          <div className="text-primary mb-3">
            <i className={`${icon} fa-3x`}></i>
          </div>
          <h5 className="card-title fw-bold">{title}</h5>
          <p className="card-text text-muted small">{text}</p>
          <Link to={linkUrl} className="btn btn-sm btn-link p-0 fw-bold">
            Khám phá &rarr;
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <main>
      {/* 1. KHU VỰC QUẢNG CÁO */}
      <section
        className="hero-section text-white py-5 py-md-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://picsum.photos/1200/600?random=1")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "500px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container my-5">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-4 fw-bolder mb-3">
                Định Hướng Tương Lai Vững Chắc Ngay Hôm Nay
              </h1>
              <p className="lead text-white-75 mb-5">
                Hệ thống tư vấn kết hợp **Điểm thi** và **Trắc nghiệm Holland**
                để đưa ra lộ trình nghề nghiệp chính xác nhất cho bạn.
              </p>

              {/* QUẢNG CÁO CTA Chính: Dùng onClick={handleCtaClick} */}
              <div className="p-4 bg-warning rounded-3 shadow-lg">
                <p className="h4 mb-3 fw-bold text-dark">
                  <i className="bi bi-patch-check me-2"></i>
                  **Bạn muốn biết điểm chuẩn THPT của mình phù hợp với trường
                  nào?**
                </p>
                <button
                  onClick={handleCtaClick} // <<< Dùng navigate trong hàm này
                  className="btn btn-primary btn-lg fw-bold w-100 w-md-auto"
                >
                  Phân Tích Điểm Số Ngay &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KHU VỰC THỐNG KÊ */}
      <section className="bg-white py-5">
        <div className="container">
          <div className="row text-center">
            {statsData.map((stat, index) => (
              <div key={index} className="col-lg-3 col-6 mb-4">
                <p className="display-4 fw-bolder text-primary mb-0">
                  {stat.number}
                </p>
                <p className="text-muted fw-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. KHU VỰC TÍNH NĂNG CỐT LÕI */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bolder mb-2">
            Các Bước Đơn Giản Để Thành Công
          </h2>
          <p className="text-center text-muted mb-5">
            Khám phá các công cụ mạnh mẽ của chúng tôi.
          </p>
          <div className="row justify-content-center">
            <CoreFeatureCard
              icon="bi bi-clipboard-check"
              title="1. Trắc nghiệm Holland"
              text="Làm bài trắc nghiệm nhanh để khám phá nhóm sở thích (RIASEC) và nghề nghiệp tiềm năng của bạn."
              linkUrl={links.hollandTest}
            />
            <CoreFeatureCard
              icon="bi bi-calculator"
              title="2. Phân tích Điểm số"
              text="Nhập điểm thi THPT của bạn để hệ thống tính toán và so sánh với điểm chuẩn các năm gần nhất."
              linkUrl={links.scoreAnalysis}
            />
            <CoreFeatureCard
              icon="bi bi-person-lines-fill"
              title="3. Xem điểm chuẩn các trường"
              text="Tra cứu điểm chuẩn đại học chính xác của hàng trăm trường qua các năm, giúp bạn đưa ra lựa chọn sáng suốt." // Đã cập nhật nội dung mô tả
              linkUrl={links.benchmark}
            />
          </div>
        </div>
      </section>

{/* 4. KHU VỰC TRA CỨU NHANH (ĐÃ SỬA LINK) */}
      {/* <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center fw-bolder mb-4">
            Tra Cứu Ngành Học & Trường Nổi Bật
          </h2>
          <div className="row justify-content-center">
            {popularMajors.map((major, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className="p-4 border rounded-3 text-center shadow-sm major-card transition-300">
                  <i className={`${major.icon} fa-2x mb-2 text-info`}></i>
                  <h5 className="fw-bold">{major.name}</h5>
                  
                  <Link to={major.link} className="small text-primary">
                    Xem chi tiết &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            
            <Link
              to={links.fullMajorList}
              className="btn btn-outline-secondary"
            >
              Xem Toàn Bộ Danh Sách Ngành/Trường
            </Link>
          </div>
        </div>
      </section>
      */}

      {/* 5. KHU VỰC CTA PHỤ (ĐÃ SỬA LINK) */}
      <section className="py-5 bg-primary bg-opacity-10">
        <div className="container text-center">
          <h2 className="fw-bolder text-primary">Bạn Đã Sẵn Sàng Bắt Đầu?</h2>
          <p className="lead mb-4 text-muted">
            Đừng bỏ lỡ cơ hội định hướng đúng đắn ngay từ bây giờ. Đăng ký tài
            khoản miễn phí để lưu kết quả trắc nghiệm và điểm số.
          </p>
          {/* SỬA: Dùng Link to={links.register} */}
          <Link
            to={links.register}
            className="btn btn-primary btn-lg fw-bold shadow-lg"
          >
            <i className="bi bi-person-add me-2"></i> Đăng Ký Tài Khoản Ngay!
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
