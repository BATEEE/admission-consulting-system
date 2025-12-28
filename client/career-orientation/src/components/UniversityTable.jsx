import { useNavigate } from "react-router-dom";

const UniversityTable = ({
  universities,
  isLoading,
  currentPage,
  totalPages,
  onPrev,
  onNext,
}) => {
  const navigate = useNavigate();

  const handleViewDetail = (university) => {
    navigate(`/benchmark/universities/${university.id}`, { state: { university } });
  };

  return (
    <>
      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="table-responsive shadow-sm rounded-3">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-primary">
                <tr>
                  <th className="text-center">Mã trường</th>
                  <th>Tên trường</th>
                  <th>Địa chỉ</th>
                  <th>Loại trường</th>
                  <th className="text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {universities.length > 0 ? (
                  universities.map((uni) => (
                    <tr key={uni.id}>
                      <td className="text-center fw-bold">{uni.code}</td>
                      <td className="fw-semibold">{uni.name}</td>
                      <td>{uni.location || "Chưa có thông tin"}</td>
                      <td>{uni.type || "Chưa có thông tin"}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-primary btn-sm px-3"
                          onClick={() => handleViewDetail(uni)}
                        >
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-secondary py-4">
                      <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
            <button
              className="btn btn-outline-primary px-3"
              onClick={onPrev}
              disabled={currentPage === 0}
            >
              &laquo; Trước
            </button>
            <span className="fw-bold">
              Trang {currentPage + 1} / {totalPages}
            </span>
            <button
              className="btn btn-outline-primary px-3"
              onClick={onNext}
              disabled={currentPage === totalPages - 1}
            >
              Sau &raquo;
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default UniversityTable;