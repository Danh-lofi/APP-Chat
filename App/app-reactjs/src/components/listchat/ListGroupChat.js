import React, { useEffect, useRef, useState } from "react";
import friendApi from "../../api/friendApi";
import ChatItem from "../chatitem/ChatItem";

const ListGroupChat = (props) => {
  // State
  const [listInfoFriend, setListInfoFriend] = useState([]);
  //

  const { messages, currentUser, listFriend } = props;

  // Gọi api lấy dữ liệu danh sách bạn bè
  useEffect(() => {
    const data = [];
    const getListFriend = async (listFriend) => {
      for (const friend of listFriend) {
        const item = await friendApi.findFriendById(friend.id);
        data.push(item.data);
      }
      setListInfoFriend(data);
    };
    getListFriend(listFriend);
  }, []);

  //
  //Current user
  const currentUserId = currentUser._id;
  const name = currentUser.name ? currentUser.name : currentUser.username;
  const avatar = currentUser.avatar
    ? currentUser.avatar
    : "https://placeimg.com/640/480/any";

  const Chat = messages.map((message) => {
    const isUser = message.senderId === currentUserId;
    // Friend
    let friendName = "";
    let friendAvatar = "";

    if (!isUser) {
      listInfoFriend.forEach((friend) => {
        if (friend._id === message.senderId) {
          friendName = friend.name;
          friendAvatar = friend.avatar;
          return;
        }
      });
    }

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

export default ListGroupChat;
