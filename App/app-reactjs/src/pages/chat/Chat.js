import React from "react";
import './chat.scss';
import UserChat from "../../components/userchat/UserChat";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import InputAuthen from "../../components/input/InputAuthen";
import { useState } from "react";
const listFavourites = [
  {nameImage:"Do Thanh Danh", linkImage:"https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-1/309785858_125822560240032_5676468177324313419_n.jpg?stp=dst-jpg_p240x240&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Dqij0FLFmOIAX_dp1x1&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfBeVEcF3FSZbtpmTRrapp3ZGgaz3StTrIjeazvTItprNA&oe=6360ED85" },
  {nameImage:"Do Thanh Danh", linkImage:"https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-1/309785858_125822560240032_5676468177324313419_n.jpg?stp=dst-jpg_p240x240&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Dqij0FLFmOIAX_dp1x1&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfBeVEcF3FSZbtpmTRrapp3ZGgaz3StTrIjeazvTItprNA&oe=6360ED85" },
  {nameImage:"Do Thanh Danh", linkImage:"https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-1/309785858_125822560240032_5676468177324313419_n.jpg?stp=dst-jpg_p240x240&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Dqij0FLFmOIAX_dp1x1&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfBeVEcF3FSZbtpmTRrapp3ZGgaz3StTrIjeazvTItprNA&oe=6360ED85" },
  {nameImage:"Do Thanh Danh", linkImage:"https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-1/309785858_125822560240032_5676468177324313419_n.jpg?stp=dst-jpg_p240x240&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Dqij0FLFmOIAX_dp1x1&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfBeVEcF3FSZbtpmTRrapp3ZGgaz3StTrIjeazvTItprNA&oe=6360ED85" },
  {nameImage:"Do Thanh Danh", linkImage:"https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-1/309785858_125822560240032_5676468177324313419_n.jpg?stp=dst-jpg_p240x240&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Dqij0FLFmOIAX_dp1x1&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfBeVEcF3FSZbtpmTRrapp3ZGgaz3StTrIjeazvTItprNA&oe=6360ED85" },
  {nameImage:"Do Thanh Danh", linkImage:"https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-1/309785858_125822560240032_5676468177324313419_n.jpg?stp=dst-jpg_p240x240&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Dqij0FLFmOIAX_dp1x1&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfBeVEcF3FSZbtpmTRrapp3ZGgaz3StTrIjeazvTItprNA&oe=6360ED85" },
  {nameImage:"Do Thanh Danh", linkImage:"https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-1/309785858_125822560240032_5676468177324313419_n.jpg?stp=dst-jpg_p240x240&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Dqij0FLFmOIAX_dp1x1&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfBeVEcF3FSZbtpmTRrapp3ZGgaz3StTrIjeazvTItprNA&oe=6360ED85" },
  {nameImage:"Do Thanh Danh", linkImage:"https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-1/309785858_125822560240032_5676468177324313419_n.jpg?stp=dst-jpg_p240x240&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Dqij0FLFmOIAX_dp1x1&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfBeVEcF3FSZbtpmTRrapp3ZGgaz3StTrIjeazvTItprNA&oe=6360ED85" },
  {nameImage:"Do Thanh Danh", linkImage:"https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-1/309785858_125822560240032_5676468177324313419_n.jpg?stp=dst-jpg_p240x240&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Dqij0FLFmOIAX_dp1x1&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfBeVEcF3FSZbtpmTRrapp3ZGgaz3StTrIjeazvTItprNA&oe=6360ED85" },
  {nameImage:"Do Thanh Danh", linkImage:"https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-1/309785858_125822560240032_5676468177324313419_n.jpg?stp=dst-jpg_p240x240&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Dqij0FLFmOIAX_dp1x1&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfBeVEcF3FSZbtpmTRrapp3ZGgaz3StTrIjeazvTItprNA&oe=6360ED85" },
  {nameImage:"Do Thanh Danh", linkImage:"https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-1/309785858_125822560240032_5676468177324313419_n.jpg?stp=dst-jpg_p240x240&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Dqij0FLFmOIAX_dp1x1&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfBeVEcF3FSZbtpmTRrapp3ZGgaz3StTrIjeazvTItprNA&oe=6360ED85" },
  {nameImage:"Do Thanh Danh", linkImage:"https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-1/309785858_125822560240032_5676468177324313419_n.jpg?stp=dst-jpg_p240x240&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Dqij0FLFmOIAX_dp1x1&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfBeVEcF3FSZbtpmTRrapp3ZGgaz3StTrIjeazvTItprNA&oe=6360ED85" },
  {nameImage:"Do Thanh Danh", linkImage:"https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-1/309785858_125822560240032_5676468177324313419_n.jpg?stp=dst-jpg_p240x240&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Dqij0FLFmOIAX_dp1x1&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfBeVEcF3FSZbtpmTRrapp3ZGgaz3StTrIjeazvTItprNA&oe=6360ED85" },
]
// const listDerect = [
//   {numberWaitMess:"10", linkImage:"https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-1/309785858_125822560240032_5676468177324313419_n.jpg?stp=dst-jpg_p240x240&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Dqij0FLFmOIAX_dp1x1&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfBeVEcF3FSZbtpmTRrapp3ZGgaz3StTrIjeazvTItprNA&oe=6360ED85",  nameImage:"Tran Phuc Tong" },
//   {numberWaitMess:"10", linkImage:"https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-1/309785858_125822560240032_5676468177324313419_n.jpg?stp=dst-jpg_p240x240&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Dqij0FLFmOIAX_dp1x1&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfBeVEcF3FSZbtpmTRrapp3ZGgaz3StTrIjeazvTItprNA&oe=6360ED85",  nameImage:"Tran Phuc Tong" },
//   {numberWaitMess:"10", linkImage:"https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-1/309785858_125822560240032_5676468177324313419_n.jpg?stp=dst-jpg_p240x240&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Dqij0FLFmOIAX_dp1x1&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfBeVEcF3FSZbtpmTRrapp3ZGgaz3StTrIjeazvTItprNA&oe=6360ED85",  nameImage:"Tran Phuc Tong" },
//   {numberWaitMess:"10", linkImage:"https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-1/309785858_125822560240032_5676468177324313419_n.jpg?stp=dst-jpg_p240x240&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Dqij0FLFmOIAX_dp1x1&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfBeVEcF3FSZbtpmTRrapp3ZGgaz3StTrIjeazvTItprNA&oe=6360ED85",  nameImage:"Tran Phuc Tong" },
//   {numberWaitMess:"10", linkImage:"https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-1/309785858_125822560240032_5676468177324313419_n.jpg?stp=dst-jpg_p240x240&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Dqij0FLFmOIAX_dp1x1&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfBeVEcF3FSZbtpmTRrapp3ZGgaz3StTrIjeazvTItprNA&oe=6360ED85",  nameImage:"Tran Phuc Tong" },
// ]
const Chat = () => {
  const [activeChatFavou, setActiveChatFavou] = useState("");
  const [activeChatDirect, setActiveChatDirect] = useState("");
  return (
    <div className="chat">
      <div className="chat_heading">
        <div className="chat_heading_top">
          <h3>Trò chuyện</h3>
          <FontAwesomeIcon className="chat_heading_top_iconPlus" icon={faPlus} />
        </div>
        <div className="chat_heading_bottom">
          <input type="text" className="chat_heading_bottom_searchChat" placeholder="Tìm kiếm cuộc trò chuyện..." />
        </div>
      </div>

      <div className="chat_favourites">
        <p className="chat_favourites_text">Tất cả tin nhắn</p>
        <div className="box_favour">
          <div>
            {listFavourites.map((course, index)=>(
              <div key={index} className={`divIndex ${index === activeChatFavou ? "active_userChat" : ""}` }onClick={()=>{
                setActiveChatFavou(index);
              }}>
                <UserChat
                isOnline
                linkImage= {course.linkImage}
                nameImage={course.nameImage}
              />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="direct">
        <div className="heading_direct">
          <p className="text_direct">DIRECT MESSAGES</p>
          <FontAwesomeIcon className="icon_plus" icon={faPlus} />
        </div>

        <div className="box_favour">
          <ul>
            {listDerect.map((course, index) => (
              <li key={index} className={`${index === activeChatDirect ? "active_userChat" : ""}` }onClick={()=>{
                setActiveChatDirect(index);
              }}>
              <UserChat
                isOnline
                isWaitMess
                numberWaitMess={course.numberWaitMess}
                linkImage= {course.linkImage}
                nameImage={course.nameImage}
              />
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="channels">
        <div className="heading_direct">
          <p className="text_direct">channels</p>
          <FontAwesomeIcon className="icon_plus" icon={faPlus} />
        </div>

        <div className="box_favour">
          <ul>
            <li>
              <UserChat
               isChannels
                nameImage="Tran Phuc Tong"
              />
              <UserChat
                isChannels
                nameImage="Tran Phuc Tong"
              />
              <UserChat
               isChannels
                nameImage="Tran Phuc Tong"
              />
              <UserChat
                isChannels
                nameImage="Tran Phuc Tong"
              />
            </li>
          </ul>
        </div>
      </div> */}
    </div>


  );
};

export default Chat;
