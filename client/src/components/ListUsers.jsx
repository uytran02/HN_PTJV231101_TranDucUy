import React, { useState } from "react";
import FormAddUser from "./FormAddUser";
import ModalDeleteUser from "./ModalDeleteUser";
import ModalBlockUser from "./ModalBlockUser";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import baseUrl from "../api/axios";
import FormUpdateUser from "./FormUpdateUser";
export default function ListUsers() {
  const [openForm, setOpenForm] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openBlockModal, setOpenBlockModal] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersSearch, setUsersSearch] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [blockId, setBlockId] = useState("");
  const [updateId, setUpdateId] = useState("");
  //Tìm kiếm
  const [searchValue, setSearchValue] = useState("");
  //Đóng mở form thêm mới
  const handleOpenForm = () => {
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    setOpenForm(false);
  };
  //Đóng mở modal xóa
  const handleOpenDeleteModal = (id) => {
    setOpenDeleteModal(true);
    setDeleteId(id);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  //Đóng mở modal chặn
  const handleOpenBlockModal = (id) => {
    setOpenBlockModal(true);
    setBlockId(id);
  };
  const handleCloseBlockModal = () => {
    setOpenBlockModal(false);
  };
  //Đóng mở form update
  const handleOpenUpdateForm = (id) => {
    setOpenUpdateForm(true);
    setUpdateId(id);
  };
  const handleCloseUpdateForm = () => {
    setOpenUpdateForm(false);
  };

  //call API
  useEffect(() => {
    baseUrl
      .get(`users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, [users]);
  useEffect(() => {
    const result = users.filter((user) =>
      user.email.toLowerCase().includes(searchValue.toLocaleLowerCase())
    );
    setUsersSearch(result);
    console.log(usersSearch);
    console.log(users);
  }, [searchValue]);
  return (
    <>
      <div className="w-[80%] m-auto mt-4 h-[100vh]">
        <main className="main">
          <header className="d-flex justify-content-between mb-3">
            <h3 style={{ fontSize: "25px" }}>Quản lý nhân viên</h3>

            <button onClick={handleOpenForm} className="btn btn-primary">
              {" "}
              Thêm mới nhân viên
            </button>
          </header>
          <div className="d-flex align-items-center justify-content-end gap-2 mb-3">
            <input
              style={{ width: 350, fontSize: "14px" }}
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo email"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <i className="fa-solid fa-arrows-rotate" title="Refresh" />
          </div>
          {/* Danh sách nhân viên */}
          <table className="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Ngày sinh</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
                <th colSpan={3}>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {usersSearch.length === 0 ? (
                <tr>
                  <td colSpan={7}>Không có kết quả tìm kiếm phù hợp</td>
                </tr>
              ) : usersSearch.length < users.length ? (
                usersSearch.map((user, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user.userName}</td>
                    <td>{user.dateOfBirth}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>
                      <div className="d-flex  gap-3 ">
                        <div
                          style={{
                            borderRadius: "50%",
                            width: "20px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor:
                              user.status === 1 ? "#008000" : "#FF0000",
                          }}
                        >
                          <FontAwesomeIcon
                            className="text-white"
                            style={{ fontSize: "10px" }}
                            icon={faUser}
                          />
                        </div>
                        <div>
                          <span>
                            {user.status === 1 ? "Đang hoạt đông" : "Bị chặn"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        onClick={() => {
                          handleOpenUpdateForm(user.id);
                        }}
                        className="button button-block"
                      >
                        Sửa
                      </span>
                    </td>
                    <td>
                      <span
                        onClick={() => {
                          handleOpenBlockModal(user.id);
                        }}
                        className="button button-edit"
                      >
                        {user.status === 1 ? "Chặn" : "Bỏ chặn"}
                      </span>
                    </td>
                    <td>
                      <span
                        onClick={() => {
                          handleOpenDeleteModal(user.id);
                        }}
                        className="button button-delete"
                      >
                        Xóa
                      </span>
                    </td>
                    {/* Modal xác nhận chặn tài khoản */}
                    {openBlockModal && (
                      <ModalBlockUser
                        blockId={blockId}
                        handleCloseBlockModal={handleCloseBlockModal}
                      ></ModalBlockUser>
                    )}

                    {/* Modal xác nhận xóa tài khoản */}
                    {openDeleteModal && (
                      <ModalDeleteUser
                        deleteId={deleteId}
                        handleCloseDeleteModal={handleCloseDeleteModal}
                      ></ModalDeleteUser>
                    )}
                  </tr>
                ))
              ) : (
                users.map((user, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user.userName}</td>
                    <td>{user.dateOfBirth}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>
                      <div className="d-flex  gap-3 ">
                        <div
                          style={{
                            borderRadius: "50%",
                            width: "20px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor:
                              user.status === 1 ? "#008000" : "#FF0000",
                          }}
                        >
                          <FontAwesomeIcon
                            className="text-white"
                            style={{ fontSize: "10px" }}
                            icon={faUser}
                          />
                        </div>
                        <div>
                          <span>
                            {user.status === 1 ? "Đang hoạt đông" : "Bị chặn"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        onClick={() => {
                          handleOpenUpdateForm(user.id);
                        }}
                        className="button button-block"
                      >
                        Sửa
                      </span>
                    </td>
                    <td>
                      <span
                        onClick={() => {
                          handleOpenBlockModal(user.id);
                        }}
                        className="button button-edit"
                      >
                        {user.status === 1 ? "Chặn" : "Bỏ chặn"}
                      </span>
                    </td>
                    <td>
                      <span
                        onClick={() => {
                          handleOpenDeleteModal(user.id);
                        }}
                        className="button button-delete"
                      >
                        Xóa
                      </span>
                    </td>
                    {/* Modal xác nhận chặn tài khoản */}
                    {openBlockModal && (
                      <ModalBlockUser
                        blockId={blockId}
                        handleCloseBlockModal={handleCloseBlockModal}
                      ></ModalBlockUser>
                    )}

                    {/* Modal xác nhận xóa tài khoản */}
                    {openDeleteModal && (
                      <ModalDeleteUser
                        deleteId={deleteId}
                        handleCloseDeleteModal={handleCloseDeleteModal}
                      ></ModalDeleteUser>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <footer className="d-flex justify-content-end">
            <div className="d-flex align-items-center gap-3">
              <select className="form-select">
                <option selected="">Hiển thị 10 bản ghi trên trang</option>
                <option>Hiển thị 20 bản ghi trên trang</option>
                <option>Hiển thị 50 bản ghi trên trang</option>
                <option>Hiển thị 100 bản ghi trên trang</option>
              </select>
            </div>
          </footer>
        </main>
      </div>
      {/* Form thêm mới nhân viên */}
      {openForm && (
        <FormAddUser handleCloseForm={handleCloseForm}></FormAddUser>
      )}
      {/* Form update nhân viên */}
      {openUpdateForm && (
        <FormUpdateUser
          updateId={updateId}
          handleCloseUpdateForm={handleCloseUpdateForm}
        ></FormUpdateUser>
      )}
    </>
  );
}
