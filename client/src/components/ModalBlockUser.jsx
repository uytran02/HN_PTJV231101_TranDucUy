import React, { useEffect, useState } from "react";
import baseUrl from "../api/axios";
export default function ({ handleCloseBlockModal, blockId }) {
  const [blockUser, setBlockUser] = useState();

  const [blockUserName, setBlockUserName] = useState("");
  const [blockStatus, setBlockStatus] = useState(1);
  const getBlockUser = () => {
    baseUrl
      .get("users/" + blockId)
      .then((res) => {
        setBlockUser(res.data);
        setBlockUserName(res.data.userName);
        setBlockStatus(res.data.status);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getBlockUser();
  }, []);

  const handleBlock = () => {
    if (blockUser.status === 1) {
      const putBlockUser = { ...blockUser, status: 0 };
      console.log(putBlockUser);
      baseUrl
        .put("users/" + blockId, putBlockUser)
        .catch((err) => console.log(err));
      handleCloseBlockModal();
    } else {
      const putBlockUser = { ...blockUser, status: 1 };
      console.log(putBlockUser);
      baseUrl
        .put("users/" + blockId, putBlockUser)
        .catch((err) => console.log(err));
      handleCloseBlockModal();
    }
  };

  return (
    <>
      <div
        className="overlay"
        style={{ backgroundColor: `rgba(0,0, 0, 0.5 )` }}
        hidden=""
      >
        <div className="modal-custom">
          <div className="modal-title  d-flex justify-content-center">
            <h4>
              <b>Cảnh báo</b>
            </h4>
            <i className="fa-solid fa-xmark" />
          </div>
          <div className="modal-body-custom">
            <span style={{ fontSize: "16px" }}>
              Bạn có chắc chắn muốn{" "}
              <b>{blockStatus === 1 ? "chặn" : "bỏ chặn"}</b> tài khoản của{" "}
              <br />
              <b> {blockUserName} </b>
              không?
            </span>
          </div>
          <div className="modal-footer-custom d-flex justify-content-around">
            <button
              onClick={handleCloseBlockModal}
              className="btn bg-secondary text-white"
            >
              Hủy
            </button>
            <button onClick={handleBlock} className="btn bg-warning ">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
