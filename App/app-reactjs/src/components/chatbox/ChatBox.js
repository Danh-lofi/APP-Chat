import React, { useState } from "react";
import "./ChatBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPhone,
  faVideo,
  faCircleInfo,
  faEllipsisVertical,
  faEllipsis,
  faPaperPlane,
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFaceSmile,
  faTrashCan,
  faFolderOpen,
} from "@fortawesome/free-regular-svg-icons";

import ChatItem from "../chatitem/ChatItem";
import InputAuthen from "../../components/input/InputAuthen";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import ProfileFriend from "./profile-friend/ProfileFriend";

const ChatBox = () => {
  const [ariaExpanded, setAriaExpanded] = useState("");
  const [isProfileFriend, setIsProfileFriend] = useState(false);
  const clickMore = () => {
    document.querySelector(".modal_more").classList.toggle("active");
  };

  const changeHideProfileFriendHandle = () => {
    setIsProfileFriend(!isProfileFriend);
  };

  return (
    <div className="chatBox__container">
      <div className={`chatBox ${!isProfileFriend ? "full" : ""}`}>
        <div className="heading">
          <div className="heading_left">
            <div className="image">
              <img
                className="avt_heading"
                src="https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/global-review/2019/ey-staff-at-event.jpg"
                alt="avt"
              />
              <span className="status"></span>
            </div>
            <div className="heading_name">
              <h3 className="name">Tran Phuc Tong</h3>
              <p className="active">Active</p>
            </div>
          </div>

          <div className="heading_right">
            <Tippy
              content={
                <input
                  placeholder="Nhập để tìm kiếm trong tin nhắn..."
                  className="searchInput"
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

        <div className="content">
          <ChatItem
            Messenger="Alo alo"
            time="09:13pm"
            name="Do Thanh Danh"
            linkImage="https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/global-review/2019/ey-staff-at-event.jpg"
          />
          <ChatItem
            isRight
            Messenger="Tong dep trai de thuong"
            time="09:13pm"
            name="Tran Phuc Tong"
            linkImage="https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/global-review/2019/ey-staff-at-event.jpg"
          />
          <ChatItem
            Messenger="OK!"
            time="09:13pm"
            name="Do Thanh Danh"
            linkImage="https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/global-review/2019/ey-staff-at-event.jpg"
          />
          <ChatItem
            Messenger="OKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK!"
            time="09:13pm"
            name="Do Thanh Danh"
            linkImage="https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/global-review/2019/ey-staff-at-event.jpg"
          />
          <ChatItem
            isRight
            Messenger="Tong dep trai de thuong"
            time="09:13pm"
            name="Tran Phuc Tong"
            linkImage="https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/global-review/2019/ey-staff-at-event.jpg"
          />
          <ChatItem
            Messenger="OK!"
            time="09:13pm"
            name="Do Thanh Danh"
            linkImage="https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/global-review/2019/ey-staff-at-event.jpg"
          />
          <ChatItem
            isRight
            Messenger="Tong dep trai de thuong lollllllllllllllllllllllllllllllllllllllllllllllllll"
            time="09:13pm"
            name="Tran Phuc Tong"
            linkImage="https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/global-review/2019/ey-staff-at-event.jpg"
          />
          <ChatItem
            Messenger="OK!"
            time="09:13pm"
            name="Do Thanh Danh"
            linkImage="https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/global-review/2019/ey-staff-at-event.jpg"
          />
          <ChatItem
            Messenger="OK!"
            time="09:13pm"
            name="Do Thanh Danh"
            linkImage="https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/global-review/2019/ey-staff-at-event.jpg"
          />
        </div>

        <div className="footer">
          <FontAwesomeIcon
            onClick={clickMore}
            id="more"
            className="icon_fa"
            icon={faEllipsis}
          />
          <FontAwesomeIcon className="icon_fa" icon={faFaceSmile} />
          <div className="sender">
            <input
              className="inputSender"
              type="text"
              placeholder="Nhập tin nhắn của bạn"
            />
          </div>
          <FontAwesomeIcon className="icon_fa" icon={faMicrophone} />
          <FontAwesomeIcon className="icon_fa send" icon={faPaperPlane} />
        </div>
      </div>

      <div className={`profile-friend ${!isProfileFriend ? "not-active" : ""}`}>
        <ProfileFriend />
      </div>
    </div>
  );
};

export default ChatBox;
