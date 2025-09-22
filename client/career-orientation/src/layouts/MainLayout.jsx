import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <main className="flex-grow-1 container mt-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-light text-center py-3 mt-auto">
        © 2025 Tư Vấn Tuyển Sinh
      </footer>
    </div>
  );
};

export default MainLayout;
