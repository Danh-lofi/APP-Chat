import React, { useRef, useState } from "react";
import "./addfriendgroup.scss";
import InputAuthen from "../../input/InputAuthen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faBan,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import ButtonAuthen from "../../button/ButtonAuthen";
import { useDispatch, useSelector } from "react-redux";
import { modalSliceAction } from "../../../store/modalSlice";
import ListFriendCreateGroup from "../../list-friend/ListFriendCreateGroup";
import groupApi from "../../../api/groupApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userApi from "../../../api/userApi";
import { io } from "socket.io-client";
import FormatDate from "../../../method/FormatDate";
import { groupAction } from "../../../store/groupSlice";
import friendApi from "../../../api/friendApi";
const AddFriendToGroup = ({ onClose }) => {
  // Redux
  const dispatch = useDispatch();
  const infoGroup = useSelector((state) => state.modal.addFriendToGroup);
  const group = useSelector((state) => state.group.group);

  //

  // State
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")).user
  );
  const [listFriend, setListFriend] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [findText, setFindText] = useState("");
  const [userFinded, setUserFinded] = useState();
  const [isExistInGroup, setIsExistInGroup] = useState(false);
  //

  // Socket
  const socket = useRef();
  socket.current = io("ws://localhost:3001");

  //

  // Token
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  //
  // Event
  const changeLoadingHandle = () => {
    setLoading((prev) => !loading);
  };
  const changeFindTextHandle = (value) => {
    setFindText(value);
  };
  // Tìm kiếm thành viên
  const findUserHandle = async () => {
    try {
      const idGroup = infoGroup.idGroupChat;
      const data = await userApi.findUser(findText, idGroup);
      setUserFinded(data.data.user);
      setIsExistInGroup(data.data.isExist);
    } catch (error) {
      console.log(error);
    }
  };
  // Thêm user vừa tìm vào group
  const addUserFindToGroup = async () => {
    try {
      const listIdUser = [{ id: userFinded._id }];
      const data = await groupApi.addUsersToGroup(
        infoGroup.idGroupChat,
        listIdUser
      );
      if (data.status === 200) {
        toast.success("Thêm thành công");
        setIsExistInGroup(true);
        // dispatch(modalSliceAction.setOpenAddFriendToGroup());
        // Socket
        // Gửi Arr listIdUser, group
        socket.current.emit("send-notication-group", {
          listIdUser,
          group: group,
        });
        //
      }
    } catch (error) {
      toast.error(error);
    }
  };
  //
  const closeModalHandle = () => {
    dispatch(modalSliceAction.setOpenAddFriendToGroup());
  };
  //

  // Thêm thành viên
  const submitHandle = async () => {
    // List id user, idGroupChat
    try {
      const data = await groupApi.addUsersToGroup(
        infoGroup.idGroupChat,
        members
      );
      if (data.status === 200) {
        toast.success("Thêm thành công");
        dispatch(modalSliceAction.setOpenAddFriendToGroup());
        // get info friends
        const getListFriend = async (listFriend) => {
          const listInfoFriend = [];
          for (const friend of listFriend) {
            const item = await friendApi.findFriendById(friend.id);
            listInfoFriend.push(item.data);
          }

          // Set lại list bạn bè của mình
          dispatch(groupAction.addMemberToGroup(listInfoFriend));
        };
        getListFriend(members);

        //

        // Socket
        // Gửi Arr listIdUser, group
        socket.current.emit("send-notication-group", {
          listIdUser: members,
          group,
        });
        //
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="overlay" onClick={closeModalHandle}></div>
      <div className="modalContainer">
        <div className="headerModal">
          <p className="title">Thêm thành viên</p>
          <div
            // onClick={onClose}
            className="closeBtn"
            onClick={closeModalHandle}
          >
            x
          </div>
        </div>
        <div className="inputRangeModal">
          <InputAuthen
            onInput={(value) => changeFindTextHandle(value)}
            label="Số điện thoại"
            type="text"
            placeholder="Nhập số điện thoại cần thêm vào nhóm"
          />
          <div>
            <ButtonAuthen onClick={findUserHandle} content="Tìm"></ButtonAuthen>
          </div>
          {/* <div className="fakeFindBtn">Tìm</div> */}
        </div>
        {userFinded ? (
          <div className="friendFoundRangeModal">
            <div className="tabFriend">
              <div className="left">
                <div className="imageFriendContain">
                  <img src={userFinded.avatar}></img>
                </div>
                <div className="infoFriendContain">
                  <p className="nameFriend">{userFinded.name}</p>
                  {/* <p className="genderFriend">Nam</p> */}
                  <p className="BirthDayFriend">
                    {FormatDate(userFinded.birthDate)}
                  </p>
                </div>
              </div>
              <div className="btnContain">
                {!isExistInGroup ? (
                  <FontAwesomeIcon
                    title="Thêm"
                    className="icon"
                    icon={faCirclePlus}
                    onClick={addUserFindToGroup}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="listFriend">
          <p className="label">Bạn bè</p>
          <ListFriendCreateGroup
            user={user}
            changeLoading={changeLoadingHandle}
            setMembers={setMembers}
            members={members}
            infoGroup={infoGroup}
          />
        </div>
        <div className="footer">
          <ButtonAuthen
            content="Xác nhận"
            onClick={submitHandle}
          ></ButtonAuthen>
        </div>
      </div>
    </div>
  );
};
export default AddFriendToGroup;
