import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import baseUrl from "../api/axios";
import { Button, Flex, notification } from "antd";

export default function FormUpdateUser({ handleCloseUpdateForm, updateId }) {
  const [err, setErr] = useState({
    nameErr: false,
    emailErr: false,
    dobErr: false,
    validEmail: false,
    validDate: false,
  });

  const [updateUser, setUpdateUser] = useState({
    id: uuidv4(),
    userName: "",
    email: "",
    dateOfBirth: "",
    address: "",
    status: 1,
  });
  const getUpdateUser = () => {
    baseUrl
      .get("users/" + updateId)
      .then((res) => {
        setUpdateUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUpdateUser();
  }, []);

  const handleSubmitUpdateForm = (e) => {
    e.preventDefault();
    baseUrl
      .put("users/" + updateId, updateUser)
      .catch((err) => console.log(err));
    handleCloseUpdateForm();
  };
  return (
    <>
      <div className="overlay" hidden="">
        <form className="form" onSubmit={handleSubmitUpdateForm}>
          <div className=" justify-content-between align-items-center">
            <h4>
              <b>Cập nhật nhân viên</b>
            </h4>
            <i className="fa-solid fa-xmark" />
          </div>
          <div>
            <label className="form-label" htmlFor="userName">
              Họ và tên
            </label>
            <input
              onChange={(e) => {
                setUpdateUser({ ...updateUser, userName: e.target.value });
                setErr({ ...err, nameErr: false });
              }}
              value={updateUser.userName}
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
              onChange={(e) => {
                setUpdateUser({ ...updateUser, dateOfBirth: e.target.value });
                setErr({ ...err, dobErr: false });
              }}
              style={{ fontSize: "14px" }}
              value={updateUser.dateOfBirth}
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
              onChange={(e) => {
                setUpdateUser({ ...updateUser, email: e.target.value });
                setErr({ ...err, emailErr: false });
              }}
              style={{ fontSize: "14px" }}
              value={updateUser.email}
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
              onChange={(e) => {
                setUpdateUser({ ...updateUser, address: e.target.value });
              }}
              style={{ fontSize: "14px" }}
              value={updateUser.address}
              className="form-control"
              id="address"
              rows={3}
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
              style={{
                fontSize: "15px",
                backgroundColor: "#ff0000",
                color: "white",
              }}
              className="btn"
              onClick={handleCloseUpdateForm}
            >
              {" "}
              Đóng
            </button>

            <button
              style={{
                fontSize: "15px",
                backgroundColor: "#008000",
                color: "white",
              }}
              className="btn "
              type="submit"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
