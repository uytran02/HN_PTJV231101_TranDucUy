import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { Button, Flex, notification } from "antd";
import baseUrl from "../api/axios";
export default function FormAddUser({ handleCloseForm }) {
  const [err, setErr] = useState({
    nameErr: true,
    emailErr: true,
    dobErr: true,
    validEmail: false,
    validDate: false,
  });
  const [inputData, setInputData] = useState({
    id: uuidv4(),
    userName: "",
    email: "",
    dateOfBirth: "",
    address: "",
    status: 1,
  });
  //Submit form
  const handleSubmit = (e) => {
    //Ngăn chặn sự kiện mặc định
    e.preventDefault();
    //Tạo đối tượng user

    //Gọi API thêm mới user
    baseUrl
      .post("users", inputData)
      .then((res) => {
        if (res.status === 201) {
          setTimeout(() => {
            notification.success({
              message: "Thành công",
              description: "Thêm mới nhân viên thành công",
            });
          }, 500);
        }
      })
      .catch((err) => {
        if (err.name === "AxiosError") {
          setTimeout(() => {
            notification.error({
              message: "Cảnh báo",
              message: "Lõi hệ thống",
            });
          }, 500);
        }
      });
    handleCloseForm();
  };
  return (
    <>
      <div className="overlay" hidden="">
        <form className="form" onSubmit={handleSubmit}>
          <div className=" justify-content-between align-items-center">
            <h4>
              <b>Thêm mới nhân viên</b>
            </h4>

            <i className="fa-solid fa-xmark" />
          </div>
          <div>
            <label className="form-label" htmlFor="userName">
              Họ và tên
            </label>
            <input
              onChange={(e) => {
                setInputData({ ...inputData, userName: e.target.value });
                setErr({ ...err, nameErr: false });
              }}
              value={inputData.userName}
              id="userName"
              className="form-control"
              style={{ fontSize: "14px" }}
            />
            {err.nameErr && (
              <div className="form-text error">
                Họ và tên không được để trống.
              </div>
            )}
          </div>
          <div>
            <label className="form-label" htmlFor="dateOfBirth">
              Ngày sinh
            </label>
            <input
              style={{ fontSize: "14px" }}
              onChange={(e) => {
                setInputData({ ...inputData, dateOfBirth: e.target.value });
                setErr({ ...err, dobErr: false });
              }}
              value={inputData.dateOfBirth}
              id="dateOfBirth"
              type="date"
              className="form-control"
            />
          </div>
          {err.dobErr && (
            <div className="form-text error">
              Ngày sinh không được để trống.
            </div>
          )}

          <div>
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              style={{ fontSize: "14px" }}
              onChange={(e) => {
                setInputData({ ...inputData, email: e.target.value });
                setErr({ ...err, emailErr: false });
              }}
              value={inputData.email}
              id="email"
              type="email"
              className="form-control"
            />
          </div>
          {err.emailErr && (
            <div className="form-text error">Email không được để trống.</div>
          )}
          <div>
            <label className="form-label" htmlFor="address">
              Địa chỉ
            </label>
            <textarea
              style={{ fontSize: "14px" }}
              onChange={(e) => {
                setInputData({ ...inputData, address: e.target.value });
              }}
              className="form-control"
              id="address"
              rows={3}
              value={inputData.address}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
            }}
          >
            <button
              style={{ fontSize: "15px" }}
              className="btn btn-danger"
              onClick={handleCloseForm}
            >
              {" "}
              Đóng
            </button>
            <button
              style={{ fontSize: "15px" }}
              className="btn btn-primary"
              type="submit"
            >
              Thêm mới
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
