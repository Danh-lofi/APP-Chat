import React from "react";
import "./nonemessgage.scss";
const NoneMessage = (props) => {
  const { user, friend } = props;
  return (
    <div className="none-message">
      <div className="none-message__header">
        <img src={user.avatar} alt="avatar" />
        <img
          className="none-message__header__img"
          src={friend.avatar}
          alt="avatar"
        />
      </div>
      <div className="none-message__content">
        <p className="none-message__content__title">
          Bạn và {friend.name} đã là bạn bè
        </p>
        <span className="none-message__content__content">
          Hãy gửi lời chào để bắt cuộc trò chuyện nào!
        </span>
      </div>
    </div>
  );
};

export default NoneMessage;
