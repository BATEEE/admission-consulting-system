import React, { useEffect, useState } from "react";
import { Card, Container, Table, Spinner, Form, Button } from "react-bootstrap";
import Apis, { endpoints } from "../configs/Apis";

const School = () => {
    const [schools, setSchools] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const pageSize = 10;

    const loadSchools = async (page = 0, q = "") => {
        setIsLoading(true);
        try {
            const res = await Apis.get(
                `${endpoints["schools"]}?page=${page}&size=${pageSize}${q ? `&q=${q}` : ""}`
            );
            setSchools(res.data.content);
            setTotalPages(res.data.totalPages);
            setCurrentPage(page);
        } catch (error) {
            console.error("Lỗi khi load schools:", error);
            setSchools([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadSchools();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        loadSchools(0, searchQuery);
    };

    const handlePrev = () => {
        if (currentPage > 0) loadSchools(currentPage - 1, searchQuery);
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) loadSchools(currentPage + 1, searchQuery);
    };

    return (
        <Container 
            className="my-4"
            style={{ 
                maxWidth: "1000px", // Giới hạn chiều rộng tối đa trên PC
                color: "#1b2b48" 
            }}
        >
            <h1 className="pb-2 text-center">ĐH - HV ở Việt Nam</h1>
            <hr />
            <p className="pt-2 text-center">
                Dưới đây là danh sách thống kê những trường đại học, học viện ở Việt Nam
                được chúng tôi cập nhật, bổ sung mới nhất. Để xem chi tiết thông tin
                tuyển sinh, các bạn hãy click vào từng trường để biết các ngành đào tạo,
                chỉ tiêu cũng như điểm chuẩn năm gần nhất.
            </p>

            {/* Điều chỉnh Search form */}
            <Form 
                className="d-flex flex-column flex-md-row justify-content-center my-4 p-3 bg-light rounded-3" 
                onSubmit={handleSearch}
            >
                <Form.Control
                    type="text"
                    placeholder="Tìm tên hoặc mã trường..."
                    // w-100 trên mobile, w-75 trên màn hình trung bình trở lên (md)
                    className="me-md-2 w-100 w-md-75 mb-2 mb-md-0" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                    type="submit" 
                    variant="primary"
                    // w-100 trên mobile, tự động co lại trên màn hình trung bình
                    className="w-100 w-md-auto" 
                >
                    Tìm kiếm
                </Button>
            </Form>

            {isLoading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" role="status" />
                </div>
            ) : (
                <>
                    <Card className="shadow-sm rounded-3">
                        <Card.Body className="p-0">
                            <Table hover responsive className="align-middle mb-0 text-center">
                                <thead className="table-light">
                                    <tr>
                                        <th className="text-center">STT</th>
                                        <th className="text-center">Mã trường</th>
                                        <th>Tên trường</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schools.length > 0 ? (
                                        schools.map((item, index) => (
                                            <tr key={item.id}>
                                                <td className="text-center">{currentPage * pageSize + index + 1}</td>
                                                <td className="text-center fw-bold">{item.code}</td>
                                                <td className="text-start text-primary fw-semibold">🎓 {item.name}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center text-secondary py-3">
                                                Không có dữ liệu
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>

                    {/* Pagination */}
                    <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
                        <Button variant="outline-primary" onClick={handlePrev} disabled={currentPage === 0}>
                            &laquo; Prev
                        </Button>
                        <span className="fw-bold">
                            Trang {currentPage + 1} / {totalPages}
                        </span>
                        <Button
                            variant="outline-primary"
                            onClick={handleNext}
                            disabled={currentPage === totalPages - 1 || totalPages === 0}
                        >
                            Next &raquo;
                        </Button>
                    </div>
                </>
            )}
        </Container>
    );
};

export default School;