import React, { useRef, useState, useEffect } from "react";
import "./ChatBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faContactBook,
  faLocation,
  faFileAudio,
  faSearch,
  faPhone,
  faVideo,
  faCircleInfo,
  faEllipsisVertical,
  faEllipsis,
  faPaperPlane,
  faMicrophone,
  faMicrophoneSlash,
  faLink,
  faCamera,
  faPhotoFilm,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFaceSmile,
  faTrashCan,
  faFolderOpen,
} from "@fortawesome/free-regular-svg-icons";

import ChatItem from "../chatitem/ChatItem";
import { UncontrolledTooltip } from "reactstrap";
import InputAuthen from "../../components/input/InputAuthen";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import InputEmoji from "react-input-emoji";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListChat from "../listchat/ListChat";
import { io } from "socket.io-client";
import chatApi from "../../api/chatApi";
import messageApi from "../../api/messageApi";
import ProfileFriend from "./profile-friend/ProfileFriend";

const ChatBox = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const socket = useRef();
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")).user
  );
  const [chatId, setChatId] = useState();
  const [messages, setMessgages] = useState([]);
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState(null);

  const [ariaExpanded, setAriaExpanded] = useState("");
  const [more, setMore] = useState(false);

  const clickMore = () => {
    if (more === false) {
      setMore(true);
    } else {
      setMore(false);
    }
  };

  function handleOnEnter(text) {
    console.log("enter", text);
  }

  // Handle Event
  const [isProfileFriend, setIsProfileFriend] = useState(false);

  // // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:3001");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  // useEffect(() => {
  //   if (message !== null) {
  //     socket.current.emit("send-message", {
  //       message: message,
  //       receiverId: "635ba8fcfb5b0d4b6d13f53f",
  //     });
  //   }
  // }, [message]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setMessgages((messages) => [...messages, data]);
    });
  }, [receivedMessage]);

  // Test API
  useEffect(() => {
    const getChats = async () => {
      try {
        const chat = await chatApi.getChat(
          "636177aafa30bca9bc79733e",
          "635ba8fcfb5b0d4b6d13f53f"
        );
        console.log(chat);
        setChatId(chat.data._id);
      } catch (error) {}
    };
    getChats();
  }, [user]);

  // get all messages from chat id
  useEffect(() => {
    const getAllMessages = async (chatId) => {
      console.log(chatId);
      const messagesData = await messageApi.getMessages(chatId);
      console.log(messagesData);
      setMessgages(messagesData.data);
    };
    getAllMessages(chatId);
  }, [chatId]);

  //
  const changeHideProfileFriendHandle = () => {
    setIsProfileFriend(!isProfileFriend);
  };
  // Change Message

  // Send Message
  const sendMessageHandle = async () => {
    // console.log(message);
    const messageSender = {
      chatId,
      senderId: user._id,
      text: message,
    };
    const data = await messageApi.addMessage(messageSender);

    if (data.status === 200) {
      if (message !== null) {
        socket.current.emit("send-message", {
          chatId,
          senderId: user._id,
          text: message,
          receiverId: "635ba8fcfb5b0d4b6d13f53f",
        });
      }
      console.log(messages);
      setMessgages((messages) => [...messages, messageSender]);
      setMessage("");
    }
  };

  //

  return (
    <div className="chatBox__container">
      <div className={`chatBox ${!isProfileFriend ? "full" : ""}`}>
        <div className="chatBox_heading">
          <div className="chatBox_heading_left">
            <div className="chatBox_heading_left_headingImage">
              <img
                className="chatBox_heading_left_headingImage_avt_heading"
                src="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/309785858_125822560240032_5676468177324313419_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kbKO-puc1XgAX_oi49v&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT-55QIg_rqEinEG6v3_c0eMMG9WGHl_5xhlEp0PdZqnpQ&oe=635D3BC3"
                alt="avt"
              />
              <span className="chatBox_heading_left_headingImage_status"></span>
            </div>
            <div className="chatBox_heading_left_heading_name">
              <h3 className="chatBox_heading_left_heading_name_name">
                Tran Phuc Tong
              </h3>
              <p className="chatBox_heading_left_heading_name_active">Active</p>
            </div>
          </div>

          <div className="chatBox_heading_right">
            <Tippy
              content={
                <input
                  placeholder="Nhập để tìm kiếm trong tin nhắn..."
                  className="chatBox_heading_right_searchInput"
                ></input>
              }
              placement="bottom"
              animation="fade"
              arrow={false}
              hideOnClick="toggle"
              theme="light-border"
              trigger="click"
              appendTo="parent"
            >
              <FontAwesomeIcon className="icon_fa" icon={faSearch} />
            </Tippy>
            <FontAwesomeIcon className="icon_fa" icon={faPhone} />
            <FontAwesomeIcon className="icon_fa" icon={faVideo} />
            <FontAwesomeIcon
              className="icon_fa"
              icon={faCircleInfo}
              onClick={changeHideProfileFriendHandle}
            />
            <Tippy
              content={
                <div className="option_Chat">
                  <a href="" className="more_option">
                    <p>Archive</p>
                    <FontAwesomeIcon
                      className="optionMore_icon"
                      icon={faFolderOpen}
                    />
                  </a>
                  <a href="" className="more_option">
                    <p>Muted</p>
                    <FontAwesomeIcon
                      href="https://www.facebook.com/"
                      className="optionMore_icon"
                      icon={faMicrophoneSlash}
                    />
                  </a>
                  <a href="https://www.youtube.com/" className="more_option">
                    <p>Delete</p>
                    <FontAwesomeIcon
                      className="optionMore_icon"
                      icon={faTrashCan}
                    />
                  </a>
                </div>
              }
              placement="bottom"
              animation="fade"
              arrow={false}
              theme="light-border"
              trigger="click"
              appendTo="parent"
              onMount={() => setAriaExpanded("true")}
              onHide={() => setAriaExpanded("false")}
            >
              <FontAwesomeIcon
                aria-haspopup="true"
                aria-exponent={ariaExpanded}
                className="icon_fa"
                icon={faEllipsisVertical}
              />
            </Tippy>
          </div>
        </div>

        <div className="chatBox_content">
          <ListChat messages={messages} currentUserId={user._id} />
        </div>

        <div className="chatBox_footer">
          <FontAwesomeIcon
            className="icon_fa"
            onClick={clickMore}
            icon={faEllipsis}
          />
          <FontAwesomeIcon className="icon_fa" icon={faMicrophone} />
          <div className="chatBox_footer_sender">
            <InputEmoji
              value={message}
              onChange={setMessage}
              cleanOnEnter
              theme="light"
              onEnter={handleOnEnter}
              placeholder="Nhập tin nhắn của bạn..."
            />
          </div>
          <FontAwesomeIcon
            className="icon_fa chatBox_footer_send"
            icon={faPaperPlane}
            onClick={sendMessageHandle}
          />
        </div>

        <div className={`chatBox_modal ${more === true ? "activeModal" : " "}`}>
          <div className="chatBox_modal_more">
            <a href="#">
              <FontAwesomeIcon
                className="chatBox_modal_more_icon_fa__second"
                icon={faLink}
              />
              <p className="chatBox_modal_more_name_icon_fa__second">
                attached
              </p>
            </a>
            <a href="#">
              <FontAwesomeIcon
                className="chatBox_modal_more_icon_fa__second"
                icon={faCamera}
              />
              <p className="chatBox_modal_more_name_icon_fa__second">camera</p>
            </a>
            <a href="#">
              <FontAwesomeIcon
                className="chatBox_modal_more_icon_fa__second"
                icon={faPhotoFilm}
              />
              <p className="chatBox_modal_more_name_icon_fa__second">gallery</p>
            </a>
            <a href="#">
              <FontAwesomeIcon
                className="chatBox_modal_more_icon_fa__second"
                icon={faFileAudio}
              />
              <p className="chatBox_modal_more_name_icon_fa__second">audio</p>
            </a>
            <a href="#">
              <FontAwesomeIcon
                className="chatBox_modal_more_icon_fa__second"
                icon={faLocation}
              />
              <p className="chatBox_modal_more_name_icon_fa__second">
                location
              </p>
            </a>
            <a href="#">
              <FontAwesomeIcon
                className="chatBox_modal_more_icon_fa__second"
                icon={faContactBook}
              />
              <p className="chatBox_modal_more_name_icon_fa__second">contact</p>
            </a>
          </div>
        </div>
      </div>
      <div className={`profile-friend ${!isProfileFriend ? "not-active" : ""}`}>
        <ProfileFriend />
      </div>
    </div>
  );
};

export default ChatBox;

// return (
//   <div className="chatBox__container">
//     <div className={`chatBox ${!isProfileFriend ? "full" : ""}`}>
//       <div className="heading">
//         <div className="heading_left">
//           <div className="image">
//             <img
//               className="avt_heading"
//               src="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/309785858_125822560240032_5676468177324313419_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kbKO-puc1XgAX_oi49v&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT-55QIg_rqEinEG6v3_c0eMMG9WGHl_5xhlEp0PdZqnpQ&oe=635D3BC3"
//               alt="avt"
//             />
//             <span className="status"></span>
//           </div>
//           <div className="heading_name">
//             <h3 className="name">Tran Phuc Tong</h3>
//             <p className="active">Active</p>
//           </div>
//         </div>

//         <div className="heading_right">
//           <Tippy
//             content={
//               <input
//                 placeholder="Nhập để tìm kiếm trong tin nhắn..."
//                 className="searchInput"
//               ></input>
//             }
//             placement="bottom"
//             animation="fade"
//             arrow={false}
//             hideOnClick="toggle"
//             theme="light-border"
//             trigger="click"
//             appendTo="parent"
//           >
//             <FontAwesomeIcon className="icon_fa" icon={faSearch} />
//           </Tippy>
//           <FontAwesomeIcon className="icon_fa" icon={faPhone} />
//           <FontAwesomeIcon className="icon_fa" icon={faVideo} />
//           <FontAwesomeIcon
//             className="icon_fa"
//             icon={faCircleInfo}
//             onClick={changeHideProfileFriendHandle}
//           />
//           <Tippy
//             content={
//               <div className="option_Chat">
//                 <a href="" className="more_option">
//                   <p>Archive</p>
//                   <FontAwesomeIcon
//                     className="optionMore_icon"
//                     icon={faFolderOpen}
//                   />
//                 </a>
//                 <a href="" className="more_option">
//                   <p>Muted</p>
//                   <FontAwesomeIcon
//                     href="https://www.facebook.com/"
//                     className="optionMore_icon"
//                     icon={faMicrophoneSlash}
//                   />
//                 </a>
//                 <a href="https://www.youtube.com/" className="more_option">
//                   <p>Delete</p>
//                   <FontAwesomeIcon
//                     className="optionMore_icon"
//                     icon={faTrashCan}
//                   />
//                 </a>
//               </div>
//             }
//             placement="bottom"
//             animation="fade"
//             arrow={false}
//             theme="light-border"
//             trigger="click"
//             appendTo="parent"
//             onMount={() => setAriaExpanded("true")}
//             onHide={() => setAriaExpanded("false")}
//           >
//             <FontAwesomeIcon
//               aria-haspopup="true"
//               aria-exponent={ariaExpanded}
//               className="icon_fa"
//               icon={faEllipsisVertical}
//             />
//           </Tippy>
//         </div>
//       </div>

//       <ListChat messages={messages} currentUserId={user._id} />
//       <div className="footer">
//         <FontAwesomeIcon
//           onClick={clickMore}
//           id="more"
//           className="icon_fa"
//           icon={faEllipsis}
//         />
//         <FontAwesomeIcon className="icon_fa" icon={faFaceSmile} />
//         <div className="sender">
//           <input
//             className="inputSender"
//             value={message}
//             type="text"
//             placeholder="Nhập tin nhắn của bạn"
//             onChange={changeMessageHandle}
//           />
//         </div>
//         <FontAwesomeIcon className="icon_fa" icon={faMicrophone} />
//         <FontAwesomeIcon
//           className="icon_fa send"
//           icon={faPaperPlane}
//           onClick={sendMessageHandle}
//         />
//       </div>
//     </div>

//   </div>
