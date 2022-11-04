import React from 'react';
import './FileChatItem.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { faDownload, faEllipsisVertical, faReply, faShareNodes, faCopy, faBookmark, faMessage, faLink, faEllipsis, faPaperPlane, faMicrophone, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile, faTrashCan, faFolderOpen } from "@fortawesome/free-regular-svg-icons";

const FileChatItem = (props) => {
  return (

    <div className="list_Chat">
      {props.isRightFile ? (
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
                          <FontAwesomeIcon className="optionMore_icon" icon={faReply} />
                        </a>
                        <a href="" className="more_option">
                          <p href="">Forward</p>
                          <FontAwesomeIcon className="optionMore_icon" icon={faShareNodes} />
                        </a>
                        <a href="" className="more_option">
                          <p href="">Copy</p>
                          <FontAwesomeIcon className="optionMore_icon" icon={faCopy} />
                        </a>
                        <a href="" className="more_option">
                          <p href="">Bookmark</p>
                          <FontAwesomeIcon className="optionMore_icon" icon={faBookmark} />
                        </a>
                        <a href="" className="more_option">
                          <p href="">Mark as Unread</p>
                          <FontAwesomeIcon className="optionMore_icon" icon={faMessage} />
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
                    <FontAwesomeIcon className="icon_messOption" icon={faEllipsisVertical} />
                  </Tippy>
                </div>
                <div className="messengerUpload">
                  <div className="messengerUpload_file">
                    <FontAwesomeIcon className="chatBox_modal_more_icon_fa__second" icon={faLink} />
                    <div className="messengerUpload_file__contentFile">
                      <p className="messengerUpload_file__contentFile__name">
                        {props.fileName}
                      </p>
                      <small className='messengerUpload_file__contentFile__capacity'>
                        {props.size}
                      </small>
                    </div>
                    <FontAwesomeIcon className="icon_fa" icon={faDownload} />
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
              <div className="messenger">
                <div className="messengerUpload">
                  <div className="messengerUpload_file">
                    <FontAwesomeIcon className="chatBox_modal_more_icon_fa__second" icon={faLink} />
                    <div className="messengerUpload_file__contentFile">
                      <p className="messengerUpload_file__contentFile__name">
                        {props.fileName}
                      </p>
                      <small className='messengerUpload_file__contentFile__capacity'>
                        {props.size}
                      </small>
                    </div>
                    <FontAwesomeIcon className="icon_fa" icon={faDownload} />
                  </div>
                </div>
                <div className="messOption">
                  <Tippy
                    content={
                      <div className="option_Chat">
                        <a href="" className="more_option">
                          <p>Reply</p>
                          <FontAwesomeIcon className="optionMore_icon" icon={faReply} />
                        </a>
                        <a href="" className="more_option">
                          <p href="">Forward</p>
                          <FontAwesomeIcon className="optionMore_icon" icon={faShareNodes} />
                        </a>
                        <a href="" className="more_option">
                          <p href="">Copy</p>
                          <FontAwesomeIcon className="optionMore_icon" icon={faCopy} />
                        </a>
                        <a href="" className="more_option">
                          <p href="">Bookmark</p>
                          <FontAwesomeIcon className="optionMore_icon" icon={faBookmark} />
                        </a>
                        <a href="" className="more_option">
                          <p href="">Mark as Unread</p>
                          <FontAwesomeIcon className="optionMore_icon" icon={faMessage} />
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
                    <FontAwesomeIcon className="icon_messOption" icon={faEllipsisVertical} />
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








  )
}

export default FileChatItem