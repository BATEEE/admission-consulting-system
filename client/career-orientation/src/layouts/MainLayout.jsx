import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <main className="flex-grow-1 container mt-4 main-content-watermark">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-light text-center py-3 mt-auto">
        <p className="mb-1 small text-muted">
          Dự án được phát triển cho mục đích **Đồ án Tốt nghiệp/Môn học**
        </p>
        <p className="mb-2 small text-muted">
          **Đơn vị/Trường:** Đại học Mở Tp.HCM (HCMCOU)
        </p>
        <p className="mb-0">
            © 2025 Tư Vấn Tuyển Sinh
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;