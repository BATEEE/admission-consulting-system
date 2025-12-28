// src/components/CreateModal.js
import React, { useState } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";

const CreateModal = ({ show, onHide, onCreate, fields, loading, error }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e, key) => {
    const value = e.target.value;
    setFormData({ ...formData, [key]: value });
    if (errors[key]) {
      setErrors({ ...errors, [key]: null });
    }
  };

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [key]: file });

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }

    if (errors[key]) {
      setErrors({ ...errors, [key]: null });
    }
  };

  const validate = () => {
    const newErrors = {};

    fields.items.forEach((field) => {
      if (field.required) {
        const value = formData[field.key];
        if (value === undefined || value === null || value === "") {
          newErrors[field.key] = `${field.label} là bắt buộc`;
        }
      }
    });

    // Validate password (bắt buộc & >= 6 ký tự)
    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    // Validate email định dạng
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Email không hợp lệ";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onCreate(formData);
    }
  };

  const handleClose = () => {
    setFormData({});
    setErrors({});
    setImagePreview(null);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Tạo mới {fields.entityName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}

        <Form>
          {fields.items.map((field) => (
            <Form.Group key={field.key} className="mb-3">
              <Form.Label>
                {field.label}{" "}
                {field.required && <span style={{ color: "red" }}>*</span>}
              </Form.Label>

              {field.type === "text" && (
                <Form.Control
                  type="text"
                  value={formData[field.key] || ""}
                  onChange={(e) => handleChange(e, field.key)}
                  placeholder={field.placeholder || ""}
                  isInvalid={!!errors[field.key]}
                />
              )}

              {field.type === "email" && (
                <Form.Control
                  type="email"
                  value={formData[field.key] || ""}
                  onChange={(e) => handleChange(e, field.key)}
                  isInvalid={!!errors[field.key]}
                />
              )}

              {field.type === "password" && (
                <Form.Control
                  type="password"
                  value={formData[field.key] || ""}
                  onChange={(e) => handleChange(e, field.key)}
                  isInvalid={!!errors[field.key]}
                />
              )}

              {field.type === "select" && (
                <Form.Select
                  value={formData[field.key] || ""}
                  onChange={(e) => handleChange(e, field.key)}
                  isInvalid={!!errors[field.key]}
                >
                  <option value="">-- Chọn {field.label} --</option>
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Form.Select>
              )}

              {field.type === "gender" && (
                <Form.Select
                  value={
                    formData[field.key] === true
                      ? "true"
                      : formData[field.key] === false
                      ? "false"
                      : ""
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    handleChange(
                      {
                        target: {
                          value:
                            val === "" ? null : val === "true" ? true : false,
                        },
                      },
                      field.key
                    );
                  }}
                  isInvalid={!!errors[field.key]}
                >
                  <option value="" disabled>
                    -- Chọn {field.label} --
                  </option>
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value.toString()}>
                      {opt.label}
                    </option>
                  ))}
                </Form.Select>
              )}

              {field.type === "file" && (
                <div>
                  <Form.Control
                    type="file"
                    onChange={(e) => handleFileChange(e, field.key)}
                    isInvalid={!!errors[field.key]}
                    accept="image/*"
                  />
                  <Form.Text className="text-muted">
                    Chọn file ảnh cho avatar
                  </Form.Text>
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ maxWidth: "150px", borderRadius: "8px" }}
                      />
                    </div>
                  )}
                </div>
              )}

              {field.type === "date" && (
                <Form.Control
                  type="date"
                  value={formData[field.key] || ""}
                  onChange={(e) => handleChange(e, field.key)}
                  isInvalid={!!errors[field.key]}
                />
              )}

              <Form.Control.Feedback type="invalid">
                {errors[field.key]}
              </Form.Control.Feedback>
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" /> Đang tạo...
            </>
          ) : (
            "Tạo mới"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateModal;
