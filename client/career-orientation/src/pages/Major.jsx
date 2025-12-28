import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import DropdownSelect from "../components/DropdownSelect";
import Apis, { endpoints } from "../configs/Apis";

// ... (các hàm và state giữ nguyên)
// ...

const Major = () => {
    const [majorGroups, setMajorGroups] = useState([]);
    const [selectedMajorGroup, setSelectedMajorGroup] = useState(null);
    const [loading, setLoading] = useState(false);

    const groups = majorGroups.map((group) => group.name);
    groups.unshift("Lựa chọn theo nhóm ngành");

    const loadMajorGroups = async () => {
        try {
            setLoading(true);
            const res = await Apis.get(endpoints["majorgroups"]);
            setMajorGroups(res.data);
        } catch (error) {
            console.error("Lỗi loading MajorGroup:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMajorGroups();
    }, []);

    return (
        <Container 
            fluid 
            className="my-4 my-lg-5"
            style={{ 
                // Giới hạn chiều rộng tối đa trên PC
                maxWidth: '900px', 
                // Đảm bảo nó được căn giữa
                marginInline: 'auto' 
            }} 
        > 
            <div>
                <div className="pb-5">
                    <h1
                        className="fw-bolder fs-3 text-uppercase pb-3"
                        style={{ color: "#282e45" }}
                    >
                        Danh sách ngành nghề đào tạo đại học
                    </h1>
                    {/* ... (Phần mô tả giữ nguyên) ... */}
                    <div className="lh-lg" style={{ color: "#53576a" }}>
                        Các ngành đại học mới nhất trong danh sách dưới đây sẽ giúp các em
                        lựa chọn các ngành nghề , các ngành học ở bậc đại học từ đó tìm
                        trường phù hợp với định hướng ngành, nghề là một bước quan trọng
                        trong việc nền tảng vững chắc trong tương lai.
                    </div>
                </div>

                <div
                    className="search-major p-4"
                    style={{ backgroundColor: "#C5E5FF" }}
                >
                    <p className="fw-semibold">
                        Bạn hãy chọn nhóm ngành mà bạn quan tâm
                    </p>
                    <DropdownSelect
                        items={groups}
                        placeholder="Lựa chọn theo nhóm ngành"
                        className="w-100" // Đảm bảo dropdown chiếm 100%
                        onSelect={(value) => {
                            value === groups[0]
                                ? setSelectedMajorGroup(null)
                                : setSelectedMajorGroup(value);
                        }}
                    />
                </div>
            </div>

            <div className="mt-1">
                {/* ... (Phần hiển thị nhóm ngành giữ nguyên) ... */}
                {majorGroups.length > 0 ? (
                    (selectedMajorGroup
                        ? majorGroups.filter((g) => g.name === selectedMajorGroup)
                        : majorGroups
                    ).map((group) => (
                        <div
                            key={group.name}
                            className="rounded-3 my-3 overflow-hidden"
                            style={{ border: "1px solid #D9D9D9" }}
                        >
                            <div
                                className="group-name p-3 fw-semibold"
                                style={{ backgroundColor: "#F1F1F1" }}
                            >
                                Nhóm - {group.name} ({group.majors.length} ngành)
                            </div>
                            <div className="majors">
                                {group.majors.map((major) => (
                                    <div
                                        key={major.name}
                                        className="major p-3"
                                        style={{
                                            borderTop: "1px solid #D9D9D9",
                                            backgroundColor: "#F4F8FF",
                                        }}
                                    >
                                        <a
                                            className="text-decoration-none"
                                            style={{ color: "#282e45" }}
                                        >
                                            Ngành {major.name}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center my-5">
                        {loading ? (
                            <p>Đang tải dữ liệu...</p>
                        ) : (
                            <p>Không có dữ liệu ngành nghề nào.</p>
                        )}
                    </div>
                )}
            </div>
        </Container>
    );
};

export default Major;