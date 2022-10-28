import React from "react";
import './chat.scss';
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus } from "@fortawesome/free-solid-svg-icons";
import InputAuthen from "../../components/input/InputAuthen";

const Chat = () => {
  return (
    <div className="chat">
      <section className="heading_chat">
      <div className="heading_top">
        <h3>Chats</h3>
        <FontAwesomeIcon className="icon_plus" icon={faPlus} />
      </div>
      <div className="heading_bottom">
        <input type="text" className="input_searchChat" placeholder="Tìm kiếm cuộc trò chuyện..."/>
      </div>
    </section>

    <section className="favourites">
      <p>favourites</p>
      <div className="box_favour">
        <ul>
          <li>alo alo</li>
          <li>alo alo</li>
        </ul>
      </div>
    </section>
    </div>
    
    
  ); 
};

export default Chat;
