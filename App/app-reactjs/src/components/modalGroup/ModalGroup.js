import React, { useRef } from "react";
import "./ModalGroup.scss";
import { useEffect, useState } from "react";
import { faXmark, faCamera, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import ListFriend from "./components/list-friend/ListFriend";
import UserChat from "../userchat/UserChat";
import ListChat from "../listchat/ListChat";
import ListFriend from "../list-friend/ListFriend";
import ListFriendCreateGroup from "../list-friend/ListFriendCreateGroup";
import groupApi from "../../api/groupApi";
import { useDispatch } from "react-redux";
import { groupAction } from "../../store/groupSlice";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import friendApi from "../../api/friendApi";
const ModalGroup = ({ onClose }) => {
  // State
  const [nameGroup, setNameGroup] = useState("");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")).user
  );
  const [members, setMembers] = useState([{ id: user._id }]);
  const [avatar, setAvatar] = useState();
  const [type, setType] = useState();
  const [fileName, setFileName] = useState();
  // Valid
  const [isNameGroup, setIsNameGroup] = useState(false);
  const [isButtonGroup, setIsButtonGroup] = useState(false);
  //
  // Socket
  const socket = useRef();
  // socket.current = io("ws://suar-app.herokuapp.com/");

  socket.current = io("ws://localhost:3001");

  //

  // Redux
  const dispatch = useDispatch();
  //
  // Token
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  //

  // Ref
  const imgGroupRef = useRef();
  //

  // Set tên group
  const changeNameGroupHandle = (e) => {
    if (e.target.value === "") {
      setIsNameGroup(false);
    } else {
      setIsNameGroup(true);
    }
    // Bắt rỗng
    setNameGroup(e.target.value);
  };
  //

  // Xử lí ảnh nhóm
  // Mở input
  const openInputFileHandle = () => {
    imgGroupRef.current.click();
  };

  // Set ảnh nhóm
  const changeImgGroupHandle = (e) => {
    const name = e.target.files[0].name;
    const lastDot = name.lastIndexOf(".");
    const fileName = name.substring(0, lastDot);
    const type = name.substring(lastDot + 1);
    setFileName(fileName);
    setType(type);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
  };

  // --End Xử lí ảnh nhóm--

  // Set valid members
  useEffect(() => {
    if (members.length > 2 && nameGroup !== "") {
      setIsButtonGroup(true);
    } else {
      setIsButtonGroup(false);
    }
  }, [members, nameGroup]);

  //
  const [loading, setLoading] = useState(false);
  // Get All Friends

  const changeLoadingHandle = () => {
    setLoading((prev) => !loading);
  };
  // Tạo group
  /*
   INPUT: accessToken, data: {
    name, avatar, type, fileName, member[]
   }
   Output: group
  */
  const createGroupHandle = async () => {
    console.log(user);
    console.log(nameGroup);
    console.log(members);

    const data = {
      name: nameGroup,
      avatar,
      type,
      fileName,
      members,
    };

    const res = await groupApi.createGroup(accessToken, data);
    const arr = [];
    const setData = async (arr) => {
      const listFriend = res.data.memberChat;
      for (const friend of listFriend) {
        const item = await friendApi.findFriendById(friend.id);
        arr.push(item.data);
      }
      return arr;
    };
    setData(arr);
    // Chuyển đến store với object chưa dữ liệu bạn bè
    const groupToStore = { ...res.data, memberInfoChat: arr };
    // Set group để vào store

    dispatch(groupAction.setGroup(groupToStore));
    // Socket
    // Gửi Arr listIdUser, group
    const idAdmin = res.data.adminGroup;
    const listIdUser = res.data.memberChat.filter(
      (member) => member.id !== idAdmin
    );
    const group = res.data;
    socket.current.emit("send-notication-group", {
      listIdUser,
      group,
    });
    //

    if (res.status === 200) {
      toast.success("Tạo group thành công");
      onClose();
    }
  };
  return (
    <div>
      <ToastContainer />
      <div class="modalGroup">
        <div class="modalGroup__overlay" onClick={onClose}></div>
        <div class="modalGroup__body">
          <div className="modalGroup__body__form">
            <div className="modalGroup__body__form__heading">
              <h3>Tạo nhóm</h3>
              <FontAwesomeIcon
                className="modalGroup__body__form__heading__icon"
                icon={faXmark}
                onClick={onClose}
              />
            </div>
            <div className="modalGroup__body__form__container">
              <div className="modalGroup__body__form__container__nameGroup">
                {avatar ? (
                  <div className="modalGroup__body__form__container__nameGroup__container">
                    {" "}
                    <img
                      className="modalGroup__body__form__container__nameGroup__img"
                      src={avatar}
                      alt=""
                    />
                  </div>
                ) : (
                  <FontAwesomeIcon
                    className="modalGroup__body__form__container__nameGroup__icon"
                    icon={faCamera}
                    onClick={openInputFileHandle}
                  />
                )}
                <input
                  ref={imgGroupRef}
                  type="file"
                  onChange={changeImgGroupHandle}
                  style={{ display: "none" }}
                />
                <input
                  type="text"
                  value={nameGroup}
                  onChange={(e) => changeNameGroupHandle(e)}
                  className={`modalGroup__body__form__container__nameGroup__input  ${
                    isNameGroup ? "" : "invalid"
                  }`}
                  placeholder="Nhập tên nhóm..."
                />
              </div>

              <div className="modalGroup__body__form__container__searchPhone">
                <p>Thêm bạn bè vào nhóm</p>
                <div className="modalGroup__body__form__container__searchPhone__groupSearch">
                  <FontAwesomeIcon
                    className="modalGroup__body__form__container__searchPhone__groupSearch__icon"
                    icon={faSearch}
                  />
                  <input
                    type="text"
                    className={`modalGroup__body__form__container__searchPhone__groupSearch__input`}
                    placeholder="Nhập tên, số điện thoại, hoặc danh sách số điện thoại"
                  />
                  <FontAwesomeIcon
                    className="modalGroup__body__form__container__searchPhone__groupSearch__iconExit"
                    icon={faXmark}
                  />
                </div>
              </div>

              <div className="modalGroup__body__form__container__listFriend">
                <ListFriendCreateGroup
                  user={user}
                  changeLoading={changeLoadingHandle}
                  setMembers={setMembers}
                  members={members}
                />
              </div>
            </div>
            <div className="modalGroup__body__form__footer">
              <button
                className="modalGroup__body__form__footer__cancle"
                onClick={onClose}
              >
                Hủy
              </button>
              <button
                className={`modalGroup__body__form__footer__createGroup ${
                  isButtonGroup ? "" : "disabled"
                }`}
                onClick={createGroupHandle}
                disabled={!isButtonGroup}
              >
                Tạo nhóm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalGroup;
