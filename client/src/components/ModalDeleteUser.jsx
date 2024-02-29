import { Button } from "antd";
import React, { useEffect, useState } from "react";
import baseUrl from "../api/axios";
import axios from "axios";
export default function ModalDeleteUser({ handleCloseDeleteModal, deleteId }) {
  const [deleteUserName, setDeleteUserName] = useState("");

  const getDeleteUser = () => {
    baseUrl
      .get("users/" + deleteId)
      .then((res) => setDeleteUserName(res.data.userName))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getDeleteUser();
  }, []);

  const handleDelete = async () => {
    await baseUrl.delete("users/" + deleteId).catch((err) => console.log(err));
    handleCloseDeleteModal();
  };

  return (
    <>
      <div
        className="overlay"
        style={{ backgroundColor: `rgba(0,0, 0, 0.5 )` }}
        hidden=""
      >
        <div className="modal-custom">
          <div className="modal-title d-flex justify-content-center">
            <h4>
              <b>Cảnh báo</b>
            </h4>
            <i className="fa-solid fa-xmark" />
          </div>
          <div className="modal-body-custom">
            <span style={{ fontSize: "16px" }}>
              Bạn có chắc chắn muốn <b>xóa</b> nhân viên <br />{" "}
              <b>{deleteUserName}</b> không?
            </span>
          </div>
          <div className="modal-footer-custom d-flex justify-content-around">
            <button
              onClick={handleCloseDeleteModal}
              className="btn bg-secondary text-white"
            >
              Hủy
            </button>
            <button
              onClick={handleDelete}
              type="submit"
              className="btn bg-danger text-white"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
