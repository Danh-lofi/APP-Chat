import React, { useRef } from "react";
import ChatItem from "../chatitem/ChatItem";

const ListChat = (props) => {
  const messages = props.messages;
  const currentUserId = props.currentUserId;
  const Chat = messages.map((message) => {
    const date = new Date(message.createdAt);
    const time = `${date.getHours()}:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }`;
    return (
      <ChatItem
        key={message._id}
        id={message._id}
        isRight={message.senderId === currentUserId ? true : false}
        Messenger={message.text}
        time={time}
        name="Tran Phuc Tong"
        linkImage="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/309785858_125822560240032_5676468177324313419_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kbKO-puc1XgAX_oi49v&_nc_ht=scontent.fsgn13-4.fna&oh=00_AT-55QIg_rqEinEG6v3_c0eMMG9WGHl_5xhlEp0PdZqnpQ&oe=635D3BC3"
      />
    );
  });
  return <div className="content">{Chat}</div>;
};

export default ListChat;
