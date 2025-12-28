import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const EditModal = ({
  show,
  onHide,
  onSave,
  entity,
  fields,
  loading,
  error,
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (show) {
      setFormData(entity || {});
      setErrors({});
      setApiError(null);
    }
  }, [show, entity]);

  useEffect(() => {
    if (error) {
      setApiError(error);
    }
  }, [error]);

  const handleChange = (e, key) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [key]: value });
    // Clear lỗi khi người dùng bắt đầu nhập
    if (errors[key]) {
      setErrors({ ...errors, [key]: null });
    }
    if (apiError) {
      setApiError(null);
    }
  };

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [key]: file });
    if (errors[key]) {
      setErrors({ ...errors, [key]: null });
    }
    if (apiError) {
      setApiError(null);
    }
  };

  // validate field trước khi submit
  const validate = () => {
  const newErrors = {};

  fields.items.forEach((field) => {
    if (field.required) {
      const value = formData[field.key];

      // Xử lý riêng cho boolean (gender)
      if (field.type === "gender") {
        if (value === null || value === undefined) {
          newErrors[field.key] = `${field.label} là bắt buộc`;
        }
      }
      // Xử lý riêng cho file
      else if (field.type === "file") {
        if (!(value instanceof File) && !value) {
          newErrors[field.key] = `${field.label} là bắt buộc`;
        }
      }
      // Các field khác (text, email, date, select)
      else {
        if (value === undefined || value === null || value === "") {
          newErrors[field.key] = `${field.label} là bắt buộc`;
        }
      }
    }
  });

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleSubmit = () => {
    if (validate()) {
      onSave(formData);
      console.log("Form data to save:", formData);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa {fields.entityName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Hiển thị lỗi từ API */}
        {apiError && (
          <Alert variant="danger" className="mb-3">
            {apiError}
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
                  isInvalid={
                    !!errors[field.key] ||
                    (apiError && apiError.includes("Email"))
                  }
                />
              )}

              {field.type === "select" && (
                <Form.Select
                  value={formData[field.key] || ""}
                  onChange={(e) => handleChange(e, field.key)}
                  isInvalid={!!errors[field.key]}
                >
                  <option value="" disabled={true}>
                    -- Chọn {field.label} --
                  </option>
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
                  {/* Hiển thị ảnh hiện tại nếu có */}
                  {formData[field.key] &&
                    !(formData[field.key] instanceof File) && (
                      <div className="mb-2">
                        <img
                          src={formData[field.key]}
                          alt="Current avatar"
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                          }}
                          className="rounded"
                        />
                      </div>
                    )}

                  {/* Hiển thị xem trước ảnh mới nếu chọn */}
                  {formData[field.key] instanceof File && (
                    <div className="mb-2">
                      <img
                        src={URL.createObjectURL(formData[field.key])}
                        alt="Preview"
                        style={{ width: 100, height: 100, objectFit: "cover" }}
                        className="rounded"
                      />
                    </div>
                  )}

                  <Form.Control
                    type="file"
                    onChange={(e) => handleFileChange(e, field.key)}
                    isInvalid={!!errors[field.key]}
                    accept="image/*"
                  />

                  <Form.Text className="text-muted">
                    Chọn file ảnh mới để thay đổi
                  </Form.Text>

                  <Form.Control.Feedback type="invalid">
                    {errors[field.key]}
                  </Form.Control.Feedback>
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
        <Button
          variant="secondary"
          onClick={() => {
            setFormData(entity || {});
            setErrors({});
            setApiError(null);
            onHide();
          }}
        >
          Hủy
        </Button>

        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Đang lưu..." : "Lưu"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
