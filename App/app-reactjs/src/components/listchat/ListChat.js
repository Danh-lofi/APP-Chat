import React, { useRef } from "react";
import ChatItem from "../chatitem/ChatItem";

const ListChat = (props) => {
  // const messages = props.messages;
  // const currentUser = props.currentUser;
  const friend = props.friendUser;
  const { messages, currentUser } = props;
  //Current user
  const currentUserId = currentUser._id;
  const name = currentUser.name ? currentUser.name : currentUser.username;
  const avatar = currentUser.avatar
    ? currentUser.avatar
    : "https://placeimg.com/640/480/any";
  // Friend
  // const friendUserId = friend._id;
  const friendName = friend.name ? friend.name : friend.username;
  const friendAvatar = friend.avatar
    ? friend.avatar
    : "https://placeimg.com/640/480/any";

  const Chat = messages.map((message) => {
    const isUser = message.senderId === currentUserId;
    const date = new Date(message.createdAt);
    let time = `${date.getHours()}:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }`;
    if (message.time) {
      time = message.time;
    }
    return (
      <ChatItem
        key={message._id}
        id={message._id}
        isImg={message.isImg}
        isFileWord={message.isFileWord}
        isFilePdf={message.isFilePdf}
        isFileExel={message.isFileExel}
        isFilePowP={message.isFilePowP}
        type={message.type}
        isRight={isUser}
        Messenger={message.text}
        time={time}
        fileName={message.fileName}
        name={isUser ? name : friendName}
        linkImage={isUser ? avatar : friendAvatar}
      />
    );
  });
  return <div className="content">{Chat}</div>;
};

export default ListChat;
