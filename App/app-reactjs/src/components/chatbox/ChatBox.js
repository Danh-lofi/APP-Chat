import React, { useState } from "react";
import './ChatBox.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faContactBook, faLocation, faFileAudio, faSearch, faPhone, faVideo, faCircleInfo, faEllipsisVertical, faEllipsis, faPaperPlane, faMicrophone, faMicrophoneSlash, faLink, faCamera, faPhotoFilm, faL } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile, faTrashCan, faFolderOpen } from "@fortawesome/free-regular-svg-icons";

import ChatItem from "../chatitem/ChatItem";
import FileChatItem from "../chatitem/fileChatItem/FileChatItem";
import ImageChatItem from "../chatitem/imageChatItem/ImageChatItem";
import { UncontrolledTooltip } from "reactstrap";
import InputAuthen from "../../components/input/InputAuthen";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import InputEmoji from "react-input-emoji";


const ChatBox = () => {
  const [ariaExpanded, setAriaExpanded] = useState("");
  const [more, setMore] = useState(false);

  const clickMore = () => {
    if (more === false) {
      setMore(true)
    } else {
      setMore(false)
    }
  }

  const [text, setText] = useState("");

  function handleOnEnter(text) {
    console.log("enter", text);
  };

  return (

    <div className="chatBox">
      <div className="chatBox_heading">
        <div className="chatBox_heading_left">
          <div className="chatBox_heading_left_headingImage">
            <img className="chatBox_heading_left_headingImage_avt_heading" src="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/309785858_125822560240032_5676468177324313419_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kbKO-puc1XgAX_oi49v&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT-55QIg_rqEinEG6v3_c0eMMG9WGHl_5xhlEp0PdZqnpQ&oe=635D3BC3" alt="avt" />
            <span className="chatBox_heading_left_headingImage_status"></span>
          </div>
          <div className="chatBox_heading_left_heading_name">
            <h3 className="chatBox_heading_left_heading_name_name">Tran Phuc Tong</h3>
            <p className="chatBox_heading_left_heading_name_active">Active</p>
          </div>
        </div>

        <div className="chatBox_heading_right">
          <Tippy
            content={
              <input placeholder="Nhập để tìm kiếm trong tin nhắn..." className="chatBox_heading_right_searchInput"></input>
            }
            placement="bottom"
            animation="fade"
            arrow={false}
            hideOnClick="toggle"
            theme="light-border"
            trigger="click"
            appendTo="parent">
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
                  <FontAwesomeIcon className="optionMore_icon" icon={faFolderOpen} />
                </a>
                <a href="" className="more_option">
                  <p>Muted</p>
                  <FontAwesomeIcon href="https://www.facebook.com/" className="optionMore_icon" icon={faMicrophoneSlash} />
                </a>
                <a href="https://www.youtube.com/" className="more_option">
                  <p>Delete</p>
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
            onMount={() => setAriaExpanded('true')}
            onHide={() => setAriaExpanded('false')}>
            <FontAwesomeIcon aria-haspopup="true" aria-exponent={ariaExpanded} className="icon_fa" icon={faEllipsisVertical} />
          </Tippy>
        </div>
      </div>

      <div className="chatBox_content">
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
          linkImage="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/309785858_125822560240032_5676468177324313419_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kbKO-puc1XgAX_oi49v&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT-55QIg_rqEinEG6v3_c0eMMG9WGHl_5xhlEp0PdZqnpQ&oe=635D3BC3" />
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
          linkImage="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/309785858_125822560240032_5676468177324313419_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kbKO-puc1XgAX_oi49v&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT-55QIg_rqEinEG6v3_c0eMMG9WGHl_5xhlEp0PdZqnpQ&oe=635D3BC3" />
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
          linkImage="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/309785858_125822560240032_5676468177324313419_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kbKO-puc1XgAX_oi49v&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT-55QIg_rqEinEG6v3_c0eMMG9WGHl_5xhlEp0PdZqnpQ&oe=635D3BC3" />
        <ChatItem
          isRight
          Messenger="Tong dep trai de thuong lollllllllllllllllllllllllllllllllllllllllllllllllll"
          time="09:13pm"
          name="Tran Phuc Tong"
          linkImage="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/309785858_125822560240032_5676468177324313419_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kbKO-puc1XgAX_oi49v&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT-55QIg_rqEinEG6v3_c0eMMG9WGHl_5xhlEp0PdZqnpQ&oe=635D3BC3" />
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
        <FileChatItem
          fileName="ALT.pdf"
          size="100MB"
          time="09:13pm"
          name="Tran Phuc Tong"
          linkImage="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/309785858_125822560240032_5676468177324313419_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kbKO-puc1XgAX_oi49v&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT-55QIg_rqEinEG6v3_c0eMMG9WGHl_5xhlEp0PdZqnpQ&oe=635D3BC3"
        />
        <FileChatItem
          isRightFile
          fileName="KhoahoclaptrinhtrenF8.pdf"
          size="100MB"
          time="09:13pm"
          name="Tran Phuc Tong"
          linkImage="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/309785858_125822560240032_5676468177324313419_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kbKO-puc1XgAX_oi49v&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT-55QIg_rqEinEG6v3_c0eMMG9WGHl_5xhlEp0PdZqnpQ&oe=635D3BC3"
        />

        <ImageChatItem
          time="09:13pm"
          imgChatItem ="https://scontent.fsgn8-4.fna.fbcdn.net/v/t1.6435-9/94495420_2811370619090313_1019681169429495808_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=co5ZXgVK_n4AX8D-u-A&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfCmCGu4Mg5sHK_vHP7pyXHaU_mz0xFnkcZFIb88zbvD6Q&oe=638C34B8"
          name="Tran Phuc Tong"
          linkImage="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/309785858_125822560240032_5676468177324313419_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kbKO-puc1XgAX_oi49v&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT-55QIg_rqEinEG6v3_c0eMMG9WGHl_5xhlEp0PdZqnpQ&oe=635D3BC3"
        />

        <ImageChatItem
          isRightImage
          imgChatItem ="https://scontent.fsgn8-4.fna.fbcdn.net/v/t1.6435-9/94495420_2811370619090313_1019681169429495808_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=co5ZXgVK_n4AX8D-u-A&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfCmCGu4Mg5sHK_vHP7pyXHaU_mz0xFnkcZFIb88zbvD6Q&oe=638C34B8"
          time="09:13pm"
          name="Tran Phuc Tong"
          linkImage="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/309785858_125822560240032_5676468177324313419_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kbKO-puc1XgAX_oi49v&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT-55QIg_rqEinEG6v3_c0eMMG9WGHl_5xhlEp0PdZqnpQ&oe=635D3BC3"
        />
      </div>

      <div className="chatBox_footer">
        <FontAwesomeIcon className="icon_fa" onClick={clickMore} icon={faEllipsis} />
        <FontAwesomeIcon className="icon_fa" icon={faMicrophone} />
        <div className="chatBox_footer_sender">
          <InputEmoji
            value={text}
            onChange={setText}
            cleanOnEnter
            theme="light"
            onEnter={handleOnEnter}
            placeholder="Nhập tin nhắn của bạn..."
          />
        </div>
        <FontAwesomeIcon className="icon_fa chatBox_footer_send" icon={faPaperPlane} />
      </div>

      <div className={`chatBox_modal ${more === true ? "activeModal" : " "}`}>
        <div className="chatBox_modal_more">
          <a href="#">
            <FontAwesomeIcon className="chatBox_modal_more_icon_fa__second" icon={faLink} />
            <p className="chatBox_modal_more_name_icon_fa__second">attached</p>
          </a>
          <a href="#">
            <FontAwesomeIcon className="chatBox_modal_more_icon_fa__second" icon={faCamera} />
            <p className="chatBox_modal_more_name_icon_fa__second">camera</p>
          </a>
          <a href="#">
            <FontAwesomeIcon className="chatBox_modal_more_icon_fa__second" icon={faPhotoFilm} />
            <p className="chatBox_modal_more_name_icon_fa__second">gallery</p>
          </a>
          <a href="#">
            <FontAwesomeIcon className="chatBox_modal_more_icon_fa__second" icon={faFileAudio} />
            <p className="chatBox_modal_more_name_icon_fa__second">audio</p>
          </a>
          <a href="#">
            <FontAwesomeIcon className="chatBox_modal_more_icon_fa__second" icon={faLocation} />
            <p className="chatBox_modal_more_name_icon_fa__second">location</p>
          </a>
          <a href="#">
            <FontAwesomeIcon className="chatBox_modal_more_icon_fa__second" icon={faContactBook} />
            <p className="chatBox_modal_more_name_icon_fa__second">contact</p>
          </a>
        </div>
      </div>

    </div>

  );
};

export default ChatBox;
