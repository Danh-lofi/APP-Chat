import React from 'react';
import './ImageChatItem.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { faSearch, faPhone, faVideo, faCircleInfo, faEllipsisVertical, faDownload, faReply, faShareNodes, faCopy, faBookmark, faMessage, faEllipsis, faPaperPlane, faMicrophone, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile, faTrashCan, faFolderOpen } from "@fortawesome/free-regular-svg-icons";

const ImageChatItem = (props) => {
  return (
    <div className="list_Chat">
      {props.isRightImage ? (
        <div className="chat-list right">
          <div className="conversation-list">

            <div className="user_chat_content">
              <div className="messengerImage">
                <div className="messengerImage_content">
                  <img src={props.imgChatItem} alt="" />
                  <div className="messengerImage_Option">
                    <Tippy
                      content={
                        <div className="option_Chat">
                          <a href="" className="more_option">
                            <p>Download</p>
                            <FontAwesomeIcon className="optionMore_icon" icon={faDownload} />
                          </a>
                          <a href="" className="more_option">
                            <p>Reply</p>
                            <FontAwesomeIcon className="optionMore_icon" icon={faReply} />
                          </a>
                          <a href="" className="more_option">
                            <p href="">Forward</p>
                            <FontAwesomeIcon className="optionMore_icon" icon={faShareNodes} />
                          </a>
                          <a href="" className="more_option">
                            <p href="">Bookmark</p>
                            <FontAwesomeIcon className="optionMore_icon" icon={faBookmark} />
                          </a>
                          <a href="" className="more_option">
                            <p href="">Delete</p>
                            <FontAwesomeIcon className="optionMore_icon" icon={faTrashCan} />
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
                      <FontAwesomeIcon className="messengerImage_Option__icon" icon={faEllipsis} />
                    </Tippy>

                  </div>
                </div>
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
              <div className="messengerImage">
                <div className="messengerImage_content">
                  <img src={props.imgChatItem} alt="" />
                  <div className="messengerImage_Option">
                    <Tippy
                      content={
                        <div className="option_Chat">
                          <a href="" className="more_option">
                            <p>Download</p>
                            <FontAwesomeIcon className="optionMore_icon" icon={faDownload} />
                          </a>
                          <a href="" className="more_option">
                            <p>Reply</p>
                            <FontAwesomeIcon className="optionMore_icon" icon={faReply} />
                          </a>
                          <a href="" className="more_option">
                            <p href="">Forward</p>
                            <FontAwesomeIcon className="optionMore_icon" icon={faShareNodes} />
                          </a>
                          <a href="" className="more_option">
                            <p href="">Bookmark</p>
                            <FontAwesomeIcon className="optionMore_icon" icon={faBookmark} />
                          </a>
                          <a href="" className="more_option">
                            <p href="">Delete</p>
                            <FontAwesomeIcon className="optionMore_icon" icon={faTrashCan} />
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
                      <FontAwesomeIcon className="messengerImage_Option__icon" icon={faEllipsis} />
                    </Tippy>

                  </div>
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








  )
}

export default ImageChatItem