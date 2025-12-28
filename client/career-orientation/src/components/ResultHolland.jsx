import React, { useContext, useEffect, useMemo, useState } from "react";
import Apis, { authApis, endpoints } from "../configs/Apis";
import { MyUserContext } from "../configs/MyContext";
import { toast, ToastContainer } from "react-toastify";

const ResultHolland = ({ result, hollandCode }) => {
  const [traits, setTraits] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const [occLoading, setOccLoading] = useState(false);
  const [occError, setOccError] = useState(null);
  const [showOcc, setShowOcc] = useState(false);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  const user = useContext(MyUserContext);

  const loadTraits = async () => {
    try {
      const codes = (hollandCode || "").split("");
      const responses = await Promise.all(
        codes.map((trait) => Apis.get(`${endpoints["traits"]}/code/${trait}`))
      );
      setTraits(responses.map((res) => res.data));
    } catch (error) {
      console.error("Lỗi loading traits:", error);
    }
  };

  const loadOccupations = async () => {
    try {
      setOccLoading(true);
      setOccError(null);
      const res = await Apis.get(
        endpoints["occupations-by-holland-code"](hollandCode)
      );
      setOccupations(res.data || []);
      setShowOcc(true);
    } catch (error) {
      console.error("Lỗi loading occupations:", error);
      setOccError("Không tải được danh sách nghề. Vui lòng thử lại.");
    } finally {
      setOccLoading(false);
    }
  };

const saveResult = async () => {
    console.log("Saving result...", { result, hollandCode, user });
    if (!result || !hollandCode) return;

    if (!user) {
      toast.error("❌ Bạn cần đăng nhập để lưu kết quả!");
      return;
    }

    if (user.role !== "STUDENT") {
      toast.error("⚠️ Chỉ sinh viên mới được lưu kết quả Holland!");
      return;
    }

    try {
      const payload = {
        quizId: 1,
        result: hollandCode,
        resultCode: hollandCode,
        scoreDetails: result,
      };

      await authApis().post(endpoints["holland-result"], payload, {
        params: { studentId: user.studentId },
      });

      toast.success("Kết quả đã được lưu thành công!");
      setIsSaved(true);
    } catch (err) {
      console.error("Lỗi lưu kết quả:", err);
      toast.error("Lưu kết quả thất bại. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    if (hollandCode) loadTraits();
  }, [hollandCode]);

  // Lọc nhanh theo tên/mã nghề
  const filteredOccupations = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return occupations;
    return occupations.filter((o) => {
      return (
        o.code?.toLowerCase().includes(q) ||
        o.titleVie?.toLowerCase().includes(q) ||
        o.titleEn?.toLowerCase().includes(q)
      );
    });
  }, [query, occupations]);

  const toggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-success">
          🎉 Bạn đã hoàn thành bài Test Holland!
        </h2>
        <h4 className="mt-3 fw-bold" style={{ color: "#555" }}>
          ✅ Mã Holland của bạn:{" "}
          <span className="badge bg-primary fs-5 px-3 py-2">{hollandCode}</span>
        </h4>
      </div>

      <div className="text-center mt-3">
        <button
          className="btn btn-success fw-bold px-4 py-2"
          onClick={saveResult}
          disabled={isSaved}
        >
          {isSaved ? "✅ Đã lưu kết quả" : "💾 Lưu kết quả Holland"}
        </button>
      </div>

      {/* Traits section */}
      <h3 className="fw-semibold mb-4">📌 Giải thích từng nhóm:</h3>
      <div className="row g-4">
        {traits.map((trait) => (
          <div key={trait.code} className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
              <div className="card-body">
                <h5 className="card-title fw-bold text-primary mb-2">
                  {trait.code} - {trait.nameEn}
                </h5>
                <h6 className="text-muted mb-3">{trait.nameVie}</h6>
                <p className="card-text">{trait.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action button */}
      <div className="text-center mt-5">
        <button
          className="btn btn-lg btn-warning fw-bold text-white rounded-pill shadow"
          onClick={loadOccupations}
          disabled={occLoading}
        >
          {occLoading
            ? "Đang tải gợi ý..."
            : "🚀 Xem gợi ý nghề nghiệp phù hợp"}
        </button>
      </div>

      {/* Occupations section */}
      {showOcc && (
        <div className="mt-5">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-3">
            <h3 className="m-0">💼 Nghề nghiệp phù hợp</h3>
            <div className="input-group" style={{ maxWidth: 420 }}>
              <span className="input-group-text">Tìm nhanh</span>
              <input
                className="form-control"
                placeholder="Nhập mã hoặc tên nghề (VD: 15-1242, Web, Lập trình...)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {occError && (
            <div className="alert alert-danger" role="alert">
              {occError}
            </div>
          )}

          {filteredOccupations.length === 0 && !occLoading && (
            <div className="alert alert-info" role="alert">
              Không tìm thấy nghề phù hợp với từ khóa.
            </div>
          )}

          <div className="row g-4">
            {filteredOccupations.map((job) => {
              const isOpen = !!expanded[job.id];
              const vie = job.descriptionVie || "";
              const en = job.descriptionEn || "";
              const previewVie =
                vie.length > 220 && !isOpen ? vie.slice(0, 220) + "..." : vie;
              const previewEn =
                en.length > 220 && !isOpen ? en.slice(0, 220) + "..." : en;

              return (
                <div key={job.id} className="col-md-6 col-lg-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex align-items-start justify-content-between">
                        <h5 className="card-title fw-bold mb-2">
                          {job.titleVie || job.titleEn}
                        </h5>
                        <span className="badge bg-secondary ms-2">
                          {job.code}
                        </span>
                      </div>
                      {job.titleEn && (
                        <p className="text-muted mb-2">
                          <em>{job.titleEn}</em>
                        </p>
                      )}

                      {/* Descriptions */}
                      {vie && (
                        <p className="mb-2">
                          <strong>Mô tả (VI):</strong> {previewVie}
                        </p>
                      )}
                      {en && (
                        <p className="mb-3">
                          <strong>Description (EN):</strong> {previewEn}
                        </p>
                      )}

                      {(vie.length > 220 || en.length > 220) && (
                        <button
                          className="btn btn-sm btn-outline-primary mt-auto align-self-start"
                          onClick={() => toggleExpand(job.id)}
                        >
                          {isOpen ? "Thu gọn" : "Xem thêm"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default ResultHolland;
