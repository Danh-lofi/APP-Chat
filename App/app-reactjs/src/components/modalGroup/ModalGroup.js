import React from 'react';
import './ModalGroup.scss';
import { useEffect, useState } from "react";
import {
  faXmark, faCamera, faSearch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import ListFriend from "./components/list-friend/ListFriend";
import UserChat from '../userchat/UserChat';
import ListChat from '../listchat/ListChat';
import ListFriend from '../list-friend/ListFriend';

const ModalGroup = ({ onClose }) => {
  const [isFromChirld, setIsFromChirld] = useState("");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")).user
  );

  const [loading, setLoading] = useState(false);
  // Get All Friends

  const changeLoadingHandle = () => {
    setLoading((prev) => !loading);
  };
  return (
    <div>
      <div class="modalGroup">
        <div class="modalGroup__overlay" onClick={onClose}>

        </div>
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
                <FontAwesomeIcon
                  className="modalGroup__body__form__container__nameGroup__icon"
                  icon={faCamera}
                />
                <input type="text" className="modalGroup__body__form__container__nameGroup__input" placeholder="Nhập tên nhóm..." />
              </div>

              <div className="modalGroup__body__form__container__searchPhone">
                <p>Thêm bạn bè vào nhóm</p>
                <div className="modalGroup__body__form__container__searchPhone__groupSearch">
                  <FontAwesomeIcon
                    className="modalGroup__body__form__container__searchPhone__groupSearch__icon"
                    icon={faSearch}
                  />
                  <input type="text" className="modalGroup__body__form__container__searchPhone__groupSearch__input"
                    placeholder="Nhập tên, số điện thoại, hoặc danh sách số điện thoại" />
                  <FontAwesomeIcon
                    className="modalGroup__body__form__container__searchPhone__groupSearch__iconExit"
                    icon={faXmark}
                  />
                </div>
              </div>

              <div className="modalGroup__body__form__container__listFriend">
                <ListFriend user={user} changeLoading={changeLoadingHandle} />
              </div>

            </div>
            <div className="modalGroup__body__form__footer">
              <div className="modalGroup__body__form__footer__cancle">
                Hủy
              </div>
              <div className="modalGroup__body__form__footer__createGroup">
                Tạo nhóm
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalGroup