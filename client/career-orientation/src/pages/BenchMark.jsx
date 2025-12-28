import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UniversityTable from "../components/UniversityTable";
import Apis, { endpoints } from "../configs/Apis";

const BenchMark = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 10;

  const loadUniversities = async (page = 0, q = "") => {
    setIsLoading(true);
    try {
      const res = await Apis.get(
        `${endpoints["schools"]}?page=${page}&size=${pageSize}${q ? `&q=${q}` : ""}`
      );
      setUniversities(res.data.content);
      setTotalPages(res.data.totalPages);
      setCurrentPage(page);
    } catch (err) {
      console.error("Load các trường đại học thất bại:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUniversities();
  }, []);

  const handlePrev = () => {
    if (currentPage > 0) loadUniversities(currentPage - 1, searchQuery);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) loadUniversities(currentPage + 1, searchQuery);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadUniversities(0, searchQuery);
  };

  const handleScoreCheck = () => {
    navigate("/benchmark/score-check");
  };

  return (
    // ĐIỀU CHỈNH CONTAINER CHÍNH
    // Sử dụng class 'container' để có padding và tự động responsive
    // Thêm style max-width để giới hạn trên màn hình lớn (PC)
    <div 
        className="container my-4 my-lg-5"
        style={{ maxWidth: "1100px" }} 
    >
      <div className="text-center mb-4">
        <h1 className="fw-bold">Danh sách Trường Đại học</h1>
        <p className="text-secondary">
          Tìm kiếm, so sánh và chọn lựa trường phù hợp với bạn
        </p>
      </div>

      {/* Score check section */}
      <div className="text-center mb-4 p-3 rounded" style={{backgroundColor: '#e7f0ff'}}>
        <p className="mb-2 fw-semibold">Bạn muốn biết điểm của mình phù hợp với trường nào?</p>
        <button className="btn btn-success" onClick={handleScoreCheck}>
          Nhập điểm của tôi
        </button>
      </div>

      {/* Search form */}
      <form 
        // Dùng flex-column trên mobile, chuyển sang flex-row trên tablet (md)
        className="d-flex flex-column flex-md-row mb-3 justify-content-center" 
        onSubmit={handleSearch}
      >
        <input
          type="text"
          // w-100 trên mobile, w-50 trên tablet trở lên
          className="form-control w-100 w-md-50 me-md-2 mb-2 mb-md-0" 
          placeholder="Tìm tên hoặc mã trường..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
          type="submit" 
          className="btn btn-primary w-100 w-md-auto" // W-100 trên mobile, co lại trên tablet
        >
          Tìm kiếm
        </button>
      </form>

      <UniversityTable
        universities={universities}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default BenchMark;