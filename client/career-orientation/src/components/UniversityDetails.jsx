import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Card, Container, Table, Spinner, Button, Badge } from "react-bootstrap";
import Apis, { endpoints } from "../configs/Apis";

const UniversityDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const university = location.state?.university;
  const [programs, setPrograms] = useState([]);
  const [scores, setScores] = useState({});
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(true);
  const [isLoadingScores, setIsLoadingScores] = useState({});

  const loadPrograms = async () => {
    setIsLoadingPrograms(true);
    try {
      const res = await Apis.get(
        `${endpoints["schools"]}/${id}/training-programs`
      );
      setPrograms(res.data);
      res.data.forEach((program) => loadScores(program.id));
    } catch (err) {
      console.error("Load chương trình đào tạo thất bại:", err);
    } finally {
      setIsLoadingPrograms(false);
    }
  };

  const loadScores = async (programId) => {
    setIsLoadingScores((prev) => ({ ...prev, [programId]: true }));
    try {
      const res = await Apis.get(
        `${endpoints["schools"]}/${id}/training-programs/${programId}/admission-scores`
      );
      setScores((prev) => ({ ...prev, [programId]: res.data }));
    } catch (err) {
      console.error(`Load điểm chuẩn chương trình ${programId} thất bại:`, err);
    } finally {
      setIsLoadingScores((prev) => ({ ...prev, [programId]: false }));
    }
  };

  useEffect(() => {
    loadPrograms();
  }, [id]);

  return (
    <Container className="my-4" style={{ maxWidth: "1200px" }}>
      <Button 
        variant="outline-primary" 
        className="mb-4 d-flex align-items-center" 
        onClick={() => navigate(-1)}
      >
        <i className="bi bi-arrow-left me-2"></i> Quay lại
      </Button>

      <div className="d-flex align-items-center mb-4">
        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" 
             style={{ width: '60px', height: '60px' }}>
          <span className="text-white fw-bold fs-5">{university?.code}</span>
        </div>
        <div>
          <h1 className="h3 mb-0" style={{ color: "#1b2b48" }}>{university?.name}</h1>
          <p className="text-muted mb-0">{university?.location}</p>
        </div>
      </div>

      {isLoadingPrograms ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Đang tải dữ liệu...</p>
        </div>
      ) : programs.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-journal-x fs-1 text-muted d-block mb-2"></i>
          <p className="text-muted">Chưa có thông tin về chương trình đào tạo</p>
        </div>
      ) : (
        programs.map((program) => (
          <Card className="mb-4 shadow-sm border-0 rounded-3" key={program.id}>
            <Card.Header className="bg-primary text-white border-0 rounded-top-3 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{program.name}</h5>
                <Badge bg="light" text="dark">{programs.indexOf(program) + 1}/{programs.length}</Badge>
              </div>
            </Card.Header>
            {program.description && (
              <Card.Body className="bg-light py-2">
                <p className="mb-0 small">{program.description}</p>
              </Card.Body>
            )}
            <Card.Body className="p-0">
              {isLoadingScores[program.id] ? (
                <div className="text-center py-4">
                  <Spinner animation="border" variant="primary" size="sm" />
                  <p className="mt-2 small text-muted">Đang tải điểm chuẩn...</p>
                </div>
              ) : scores[program.id] && scores[program.id].length > 0 ? (
                <div className="table-responsive">
                  <Table hover className="mb-0 align-middle" style={{ minWidth: '600px' }}>
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: "50px" }} className="text-center">STT</th>
                        <th className="text-start">Tên ngành</th>
                        <th style={{ width: "100px" }} className="text-center">2022</th>
                        <th style={{ width: "100px" }} className="text-center">2023</th>
                        <th style={{ width: "100px" }} className="text-center">2024</th>
                        <th style={{ width: "200px" }}>Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scores[program.id].map((major, index) => (
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td className="fw-medium">{major.majorName}</td>
                          <td className="text-center">
                            {major.scores["2022"] ? (
                              <span className="badge bg-primary rounded-pill px-2 py-1">
                                {major.scores["2022"]}
                              </span>
                            ) : "-"}
                          </td>
                          <td className="text-center">
                            {major.scores["2023"] ? (
                              <span className="badge bg-success rounded-pill px-2 py-1">
                                {major.scores["2023"]}
                              </span>
                            ) : "-"}
                          </td>
                          <td className="text-center">
                            {major.scores["2024"] ? (
                              <span className="badge bg-info rounded-pill px-2 py-1">
                                {major.scores["2024"]}
                              </span>
                            ) : "-"}
                          </td>
                          <td className="small">{major.note || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-4">
                  <i className="bi bi-clipboard-x text-muted d-block fs-1 mb-2"></i>
                  <p className="text-muted mb-0">Chưa có thông tin điểm chuẩn</p>
                </div>
              )}
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default UniversityDetails;
