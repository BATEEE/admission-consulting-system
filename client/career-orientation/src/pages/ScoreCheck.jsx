import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import Apis, { authApis, endpoints } from "../configs/Apis";
import { MyUserContext } from "../configs/MyContext";

const ScoreCheck = () => {
  const [blocks, setBlocks] = useState([]);
  const [block, setBlock] = useState(null);
  const [scores, setScores] = useState({});
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  // --- Holland Code ---
  const [hollandCodes, setHollandCodes] = useState([]);
  const [selectedHollandCode, setSelectedHollandCode] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const user = useContext(MyUserContext);

  // Lấy danh sách khối thi
  const loadBlocks = async () => {
    try {
      const res = await Apis.get(endpoints["blocks-with-subjects"]);
      setBlocks(res.data);
    } catch (err) {
      console.error("Lỗi lấy blocks:", err);
    }
  };

  // Lấy Holland code nếu có đăng nhập
  const loadHollandCodes = async () => {
    try {
      const studentId = user?.studentId;
      if (!studentId) {
        setIsLoggedIn(false);
        return;
      }

      console.log("Fetching Holland codes for studentId:", studentId);

      setIsLoggedIn(true);
      const res = await authApis().get(endpoints["holland-result"], {
        params: { studentId },
      });
      setHollandCodes(res.data || []);
    } catch (err) {
      console.error("Lỗi lấy Holland codes:", err);
    }
  };

  useEffect(() => {
    loadBlocks();
    if (user) {
      loadHollandCodes();
    }
  }, []);

  const handleScoreChange = (subjectId, value) => {
    setScores((prev) => ({ ...prev, [subjectId]: value }));
  };

  // Gọi API lấy kết quả
  const fetchResults = async (pageNum = 1) => {
    if (!block) return;

    const totalScore = block.subjects
      .reduce((sum, sub) => sum + (parseFloat(scores[sub.id]) || 0), 0)
      .toFixed(2);

    setLoading(true);
    try {
      const params = {
        blockId: block.id,
        userScore: totalScore,
        page: pageNum,
        size: 5,
      };

      if (selectedHollandCode) {
        params.hollandCode = selectedHollandCode;
      }

      const res = await Apis.get(endpoints["benmark-suitable-schools"], {
        params,
      });
      setResults(res.data.content);
      setTotalPages(res.data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.error("Lỗi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchResults(1);
  };

  return (
    <div className="container my-5" style={{ maxWidth: "900px" }}>
      <h2 className="mb-4 text-center">Kiểm tra điểm của bạn</h2>

      <form onSubmit={handleSubmit}>
        {/* Chọn khối thi */}
        <div className="mb-3">
          <label className="form-label fw-bold">Chọn khối thi</label>
          <Select
            options={blocks.map((b) => ({ value: b.id, label: b.name }))}
            value={block ? { value: block.id, label: block.name } : null}
            onChange={(selected) => {
              const selectedBlock = blocks.find((b) => b.id === selected.value);
              setBlock(selectedBlock);
              setScores({});
              setResults([]);
              setPage(1);
            }}
            placeholder="Tìm khối thi..."
            isSearchable
          />
        </div>

        {/* Chọn Holland Code */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            Chọn kết quả Holland (tùy chọn)
          </label>
          {isLoggedIn ? (
            hollandCodes.length > 0 ? (
              <Select
                options={[
                  // Thêm option rỗng
                  { value: null, label: "-- Không chọn --" },
                  ...hollandCodes.map((h, idx) => ({
                    value: h.resultCode,
                    label: `${h.resultCode} (quiz ${h.quizId})`,
                  })),
                ]}
                value={
                  selectedHollandCode
                    ? {
                        value: selectedHollandCode,
                        label: `${selectedHollandCode}`,
                      }
                    : { value: null, label: "-- Không chọn --" }
                }
                onChange={(selected) =>
                  setSelectedHollandCode(selected?.value || null)
                }
                placeholder="Chọn Holland Code..."
              />
            ) : (
              <p className="text-muted">Không có dữ liệu Holland Code</p>
            )
          ) : (
            <Select
              isDisabled
              placeholder="Vui lòng đăng nhập để chọn Holland Code"
              onMenuOpen={() => navigate("/login")}
            />
          )}
        </div>

        {/* Nhập điểm các môn */}
        {block && (
          <div className="mb-3">
            <h5>Môn thi khối {block.name}:</h5>
            {block.subjects.map((sub) => (
              <div className="mb-2" key={sub.id}>
                <label className="form-label">{sub.name}</label>
                <input
                  type="number"
                  className="form-control"
                  min="0"
                  max="10"
                  step="0.01"
                  value={scores[sub.id] || ""}
                  onChange={(e) => handleScoreChange(sub.id, e.target.value)}
                  placeholder={`Nhập điểm ${sub.name}`}
                  required
                />
              </div>
            ))}
          </div>
        )}

        {block && (
          <button type="submit" className="btn btn-primary w-100">
            Tìm trường phù hợp
          </button>
        )}
      </form>

      {/* Hiển thị kết quả */}
      {loading && <p className="mt-4 text-center">Đang tải...</p>}

      {!loading && results.length > 0 && (
        <div>
          <div className="alert alert-info mt-4">
            Tổng điểm của bạn:{" "}
            {block.subjects
              .reduce((sum, sub) => sum + (parseFloat(scores[sub.id]) || 0), 0)
              .toFixed(2)}
          </div>
          <div className="mt-4">
            <h4>Kết quả gợi ý:</h4>
            <table className="table table-bordered table-striped mt-3">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Trường</th>
                  <th>Ngành</th>
                  <th>Chương trình</th>
                  <th>Năm</th>
                  <th>Điểm chuẩn</th>
                  <th>Chênh lệch</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item, idx) => (
                  <tr key={idx}>
                    <td>{(page - 1) * 5 + idx + 1}</td>
                    <td>{item.school}</td>
                    <td>{item.major}</td>
                    <td>{item.program}</td>
                    <td>{item.year}</td>
                    <td>{item.benchmark}</td>
                    <td
                      style={{
                        color: item.diff >= 0 ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {item.diff >= 0
                        ? `+${item.diff.toFixed(2)}`
                        : item.diff.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Phân trang */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <button
                className="btn btn-secondary"
                disabled={page === 1}
                onClick={() => fetchResults(page - 1)}
              >
                ← Trang trước
              </button>
              <span>
                Trang {page} / {totalPages}
              </span>
              <button
                className="btn btn-secondary"
                disabled={page === totalPages}
                onClick={() => fetchResults(page + 1)}
              >
                Trang sau →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trường hợp không tìm thấy */}
      {!loading && results.length === 0 && block && (
        <div className="alert alert-warning mt-4 text-center">
          Không tìm thấy ngành của trường nào phù hợp với điểm số của bạn.
        </div>
      )}
    </div>
  );
};

export default ScoreCheck;
