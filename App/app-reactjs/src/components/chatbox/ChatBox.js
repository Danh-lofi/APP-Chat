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

const ChatBox = () => {
  const [ariaExpanded, setAriaExpanded] = useState("");
  const clickMore = () => {
    document.querySelector(".modal_more").classList.toggle("active");
  };

  return (
    <div className="chatBox">
      <div className="heading">
        <div className="heading_left">
          <div className="image">
            <img
              className="avt_heading"
              src="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/309785858_125822560240032_5676468177324313419_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kbKO-puc1XgAX_oi49v&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT-55QIg_rqEinEG6v3_c0eMMG9WGHl_5xhlEp0PdZqnpQ&oe=635D3BC3"
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
          <FontAwesomeIcon className="icon_fa" icon={faCircleInfo} />
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
          linkImage="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/309785858_125822560240032_5676468177324313419_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kbKO-puc1XgAX_oi49v&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT-55QIg_rqEinEG6v3_c0eMMG9WGHl_5xhlEp0PdZqnpQ&oe=635D3BC3"
        />
        <ChatItem
          isRight
          Messenger="Tong dep trai de thuong"
          time="09:13pm"
          name="Tran Phuc Tong"
          linkImage="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/309785858_125822560240032_5676468177324313419_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kbKO-puc1XgAX_oi49v&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT-55QIg_rqEinEG6v3_c0eMMG9WGHl_5xhlEp0PdZqnpQ&oe=635D3BC3"
        />
        <ChatItem
          Messenger="OK!"
          time="09:13pm"
          name="Do Thanh Danh"
          linkImage="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/309785858_125822560240032_5676468177324313419_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kbKO-puc1XgAX_oi49v&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT-55QIg_rqEinEG6v3_c0eMMG9WGHl_5xhlEp0PdZqnpQ&oe=635D3BC3"
        />
        <ChatItem
          Messenger="OKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK!"
          time="09:13pm"
          name="Do Thanh Danh"
          linkImage="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/309785858_125822560240032_5676468177324313419_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kbKO-puc1XgAX_oi49v&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT-55QIg_rqEinEG6v3_c0eMMG9WGHl_5xhlEp0PdZqnpQ&oe=635D3BC3"
        />
        <ChatItem
          isRight
          Messenger="Tong dep trai de thuong"
          time="09:13pm"
          name="Tran Phuc Tong"
          linkImage="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/309785858_125822560240032_5676468177324313419_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kbKO-puc1XgAX_oi49v&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT-55QIg_rqEinEG6v3_c0eMMG9WGHl_5xhlEp0PdZqnpQ&oe=635D3BC3"
        />
        <ChatItem
          Messenger="OK!"
          time="09:13pm"
          name="Do Thanh Danh"
          linkImage="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/309785858_125822560240032_5676468177324313419_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kbKO-puc1XgAX_oi49v&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT-55QIg_rqEinEG6v3_c0eMMG9WGHl_5xhlEp0PdZqnpQ&oe=635D3BC3"
        />
        <ChatItem
          isRight
          Messenger="Tong dep trai de thuong lollllllllllllllllllllllllllllllllllllllllllllllllll"
          time="09:13pm"
          name="Tran Phuc Tong"
          linkImage="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/309785858_125822560240032_5676468177324313419_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kbKO-puc1XgAX_oi49v&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT-55QIg_rqEinEG6v3_c0eMMG9WGHl_5xhlEp0PdZqnpQ&oe=635D3BC3"
        />
        <ChatItem
          Messenger="OK!"
          time="09:13pm"
          name="Do Thanh Danh"
          linkImage="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/309785858_125822560240032_5676468177324313419_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kbKO-puc1XgAX_oi49v&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT-55QIg_rqEinEG6v3_c0eMMG9WGHl_5xhlEp0PdZqnpQ&oe=635D3BC3"
        />
        <ChatItem
          Messenger="OK!"
          time="09:13pm"
          name="Do Thanh Danh"
          linkImage="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/309785858_125822560240032_5676468177324313419_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kbKO-puc1XgAX_oi49v&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT-55QIg_rqEinEG6v3_c0eMMG9WGHl_5xhlEp0PdZqnpQ&oe=635D3BC3"
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
  );
};

export default ChatBox;
