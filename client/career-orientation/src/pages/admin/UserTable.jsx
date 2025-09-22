// src/pages/UserTable.js
import React, { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import Apis, { endpoints } from "../../configs/Apis";
import EditModal from "../../components/EditModal";
import CreateModal from "../../components/CreateModal"; // Import CreateModal
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserTable = () => {
  const [usersData, setUsersData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const usersPerPage = 5;

  const [editModalShow, setEditModalShow] = useState(false);
  const [createModalShow, setCreateModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createError, setCreateError] = useState(null);

  const loadUsers = async (pageNumber = 0, query = "") => {
    try {
      const url = `${endpoints["users"]}?page=${pageNumber}&size=${usersPerPage}&q=${query}`;
      const response = await Apis.get(url);

      const data = response.data;
      setUsersData(data.content);
      setTotalPages(data.totalPages);
      setPage(data.pageNumber);
    } catch (error) {
      console.error("Lỗi khi loading users:", error);
    }
  };

  useEffect(() => {
    loadUsers(0, search);
  }, [search]);

  const handlePageChange = (newPage) => {
    loadUsers(newPage, search);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModalShow(true);
    setError(null);
  };

  const handleCreate = () => {
    setCreateModalShow(true);
    setCreateError(null);
  };

  const handleSave = async (updatedUser) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      Object.keys(updatedUser).forEach((key) => {
        if (key === "avatar" && updatedUser[key] instanceof File) {
          formData.append(key, updatedUser[key]);
        } else if (key !== "avatar") {
          const value = updatedUser[key];
          if (value !== null && value !== undefined) {
            formData.append(key, value);
          }
        }
      });

      const response = await Apis.put(
        `${endpoints["users"]}/${selectedUser.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Cập nhật người dùng thành công!", {
        position: "top-right",
        autoClose: 3000,
      });

      loadUsers(page, search);
      setEditModalShow(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật user:", error);

      if (error.response && error.response.data) {
        const msg = error.response.data.message;

        if (msg?.includes("Email đã tồn tại")) {
          setError("Email này đã được sử dụng bởi người dùng khác");
        } else if (msg?.includes("Người dùng không tồn tại")) {
          setError("Người dùng không tồn tại");
        } else {
          setError("Có lỗi xảy ra khi cập nhật user");
        }
      } else {
        setError("Có lỗi xảy ra khi cập nhật user");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (newUser) => {
    setLoading(true);
    setCreateError(null);

    try {
      const formData = new FormData();

      // Thêm tất cả các trường vào formData
      Object.keys(newUser).forEach((key) => {
        if (key === "avatar" && newUser[key] instanceof File) {
          formData.append(key, newUser[key]);
        } else {
          const value = newUser[key];
          if (value !== null && value !== undefined) {
            formData.append(key, value);
          }
        }
      });

      const response = await Apis.post(endpoints["register"], formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Tạo người dùng mới thành công!", {
        position: "top-right",
        autoClose: 3000,
      });

      loadUsers(page, search);
      setCreateModalShow(false);
    } catch (error) {
      console.error("Lỗi khi tạo user:", error);

      if (error.response && error.response.data) {
        const msg = error.response.data;

        if (typeof msg === "string" && msg.includes("Email đã tồn tại")) {
          setCreateError("Email này đã được sử dụng bởi người dùng khác");
        } else {
          setCreateError("Có lỗi xảy ra khi tạo user");
        }
      } else {
        setCreateError("Có lỗi xảy ra khi tạo user");
      }
    } finally {
      setLoading(false);
    }
  };

const handleDelete = async (user) => {
  const confirmDelete = window.confirm(
    `Bạn có chắc chắn muốn xóa người dùng "${user.firstName} ${user.lastName}" không?`
  );

  if (!confirmDelete) return;

  try {
    setLoading(true);
    await Apis.delete(`${endpoints["users"]}/${user.id}`);
    
    toast.success("Xóa người dùng thành công!", {
      position: "top-right",
      autoClose: 3000,
    });

    // Reload lại dữ liệu
    loadUsers(page, search);
  } catch (error) {
    console.error("Lỗi khi xóa user:", error);

    toast.error(
      error.response?.data?.message || "Có lỗi xảy ra khi xóa người dùng",
      {
        position: "top-right",
        autoClose: 3000,
      }
    );
  } finally {
    setLoading(false);
  }
};


  const userColumns = [
    { key: "id", header: "ID" },
    {
      key: "name",
      header: "Người dùng",
      render: (item) => (
        <div className="d-flex align-items-center">
          <img
            src={item.avatar || "https://i.pravatar.cc/40"}
            alt="avatar"
            className="rounded-circle me-2"
            style={{ width: 40, height: 40 }}
          />
          {item.firstName} {item.lastName}
        </div>
      ),
    },
    { key: "email", header: "Email" },
    { key: "role", header: "Vai trò" },
    {
      key: "gender",
      header: "Giới tính",
      render: (item) => (item.gender ? "Nam" : "Nữ"),
    },
    {
      key: "dob",
      header: "Ngày sinh",
      render: (item) =>
        item.dob ? new Date(item.dob).toLocaleDateString("vi-VN") : "",
    },
  ];

  const userFieldsCreate = {
    entityName: "User",
    items: [
      { key: "firstName", label: "Họ", type: "text", required: true },
      { key: "lastName", label: "Tên", type: "text", required: true },
      { key: "email", label: "Email", type: "email", required: true },
      { key: "password", label: "Mật khẩu", type: "password", required: true }, // 👈 thêm vào đây
      {
        key: "role",
        label: "Vai trò",
        type: "select",
        required: true,
        options: [
          { value: "STUDENT", label: "Học sinh" },
          { value: "ADMIN", label: "Quản trị viên" },
        ],
      },
      {
        key: "gender",
        label: "Giới tính",
        type: "gender",
        options: [
          { value: true, label: "Nam" },
          { value: false, label: "Nữ" },
        ],
        required: true,
      },
      { key: "dob", label: "Ngày sinh", type: "date", required: true },
      { key: "avatar", label: "Avatar", type: "file" },
    ],
  };

  const userFieldsEdit = {
    entityName: "User",
    items: [
      { key: "firstName", label: "Họ", type: "text", required: true },
      { key: "lastName", label: "Tên", type: "text", required: true },
      { key: "email", label: "Email", type: "email", required: true },
      {
        key: "role",
        label: "Vai trò",
        type: "select",
        required: true,
        options: [
          { value: "STUDENT", label: "Học sinh" },
          { value: "ADMIN", label: "Quản trị viên" },
        ],
      },
      {
        key: "gender",
        label: "Giới tính",
        type: "gender",
        options: [
          { value: true, label: "Nam" },
          { value: false, label: "Nữ" },
        ],
        required: true,
      },
      { key: "dob", label: "Ngày sinh", type: "date", required: true },
      { key: "avatar", label: "Avatar", type: "file" },
    ],
  };

  return (
    <div className="container mt-4">
      <ToastContainer />

      {/* Tìm kiếm và nút thêm mới */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Tìm theo tên"
          value={search}
          onChange={handleSearchChange}
          style={{ maxWidth: "300px" }}
        />
        <button className="btn btn-primary" onClick={handleCreate}>
          <i className="bi bi-plus-circle me-2"></i>
          Thêm mới
        </button>
      </div>

      <DataTable
        data={usersData}
        columns={userColumns}
        currentPage={page + 1}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EditModal
        show={editModalShow}
        onHide={() => {
          setEditModalShow(false);
          setError(null);
        }}
        onSave={handleSave}
        entity={selectedUser}
        fields={userFieldsEdit}
        loading={loading}
        error={error}
      />

      <CreateModal
        show={createModalShow}
        onHide={() => {
          setCreateModalShow(false);
          setCreateError(null);
        }}
        onCreate={handleCreateUser}
        fields={userFieldsCreate}
        loading={loading}
        error={createError}
      />
    </div>
  );
};

export default UserTable;
