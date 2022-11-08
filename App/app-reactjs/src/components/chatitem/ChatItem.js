import "./ChatItem.scss";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {
  faSearch,
  faPhone,
  faVideo,
  faCircleInfo,
  faEllipsisVertical,
  faReply,
  faShareNodes,
  faCopy,
  faBookmark,
  faMessage,
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

const ChatItem = (props) => {
  const scroll = useRef();

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.id]);

  return (
    <div className="list_Chat" ref={scroll}>
      {props.isRight ? (
        <div className="chat-list right">
          <div className="conversation-list">
            <div className="user_chat_content">
              <div className="messenger">
                <div className="messOption">
                  <Tippy
                    content={
                      <div className="option_Chat">
                        <a href="" className="more_option">
                          <p>Reply</p>
                          <FontAwesomeIcon
                            className="optionMore_icon"
                            icon={faReply}
                          />
                        </a>
                        <a href="" className="more_option">
                          <p href="">Forward</p>
                          <FontAwesomeIcon
                            className="optionMore_icon"
                            icon={faShareNodes}
                          />
                        </a>
                        <a href="" className="more_option">
                          <p href="">Copy</p>
                          <FontAwesomeIcon
                            className="optionMore_icon"
                            icon={faCopy}
                          />
                        </a>
                        <a href="" className="more_option">
                          <p href="">Bookmark</p>
                          <FontAwesomeIcon
                            className="optionMore_icon"
                            icon={faBookmark}
                          />
                        </a>
                        <a href="" className="more_option">
                          <p href="">Mark as Unread</p>
                          <FontAwesomeIcon
                            className="optionMore_icon"
                            icon={faMessage}
                          />
                        </a>
                        <a href="" className="more_option">
                          <p href="">Delete</p>
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
                  // onMount={() => setAriaExpanded('true')}
                  // onHide={() => setAriaExpanded('false')}
                  >
                    <FontAwesomeIcon
                      className="icon_messOption"
                      icon={faEllipsisVertical}
                    />
                  </Tippy>
                </div>
                {props.isImg ? (<img className="content_messenger_image" src={props.Messenger} />) :
                  (
                    <div className="content_messenger">
                      <p>{props.Messenger}</p>
                    </div>
                  )}
              </div>
              <div className="conversation-name">
                <small>{props.time}</small>
                {props.name}
              </div>
            </div>
            <div className="chat_avatar">
              <img className="avt_chat" src={props.linkImage} alt="avtChat" />
            </div>
          </div>
        </div>
      ) : (
        <div className="chat-list">
          <div className="conversation-list">
            <div className="chat_avatar">
              <img className="avt_chat" src={props.linkImage} alt="avtChat" />
            </div>
            <div className="user_chat_content">
              <div className="messenger">
                {props.isImg ? (<img className="content_messenger_image" src={props.Messenger} />) :
                  (
                    <div className="content_messenger">
                      <p>{props.Messenger}</p>
                    </div>
                  )}
                <div className="messOption">
                  <Tippy
                    content={
                      <div className="option_Chat">
                        <a href="" className="more_option">
                          <p>Reply</p>
                          <FontAwesomeIcon
                            className="optionMore_icon"
                            icon={faReply}
                          />
                        </a>
                        <a href="" className="more_option">
                          <p href="">Forward</p>
                          <FontAwesomeIcon
                            className="optionMore_icon"
                            icon={faShareNodes}
                          />
                        </a>
                        <a href="" className="more_option">
                          <p href="">Copy</p>
                          <FontAwesomeIcon
                            className="optionMore_icon"
                            icon={faCopy}
                          />
                        </a>
                        <a href="" className="more_option">
                          <p href="">Bookmark</p>
                          <FontAwesomeIcon
                            className="optionMore_icon"
                            icon={faBookmark}
                          />
                        </a>
                        <a href="" className="more_option">
                          <p href="">Mark as Unread</p>
                          <FontAwesomeIcon
                            className="optionMore_icon"
                            icon={faMessage}
                          />
                        </a>
                        <a href="" className="more_option">
                          <p href="">Delete</p>
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
                  // onMount={() => setAriaExpanded('true')}
                  // onHide={() => setAriaExpanded('false')}
                  >
                    <FontAwesomeIcon
                      className="icon_messOption"
                      icon={faEllipsisVertical}
                    />
                  </Tippy>
                </div>
              </div>
              <div className="conversation-name">
                {props.name}
                <small>{props.time}</small>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatItem;
