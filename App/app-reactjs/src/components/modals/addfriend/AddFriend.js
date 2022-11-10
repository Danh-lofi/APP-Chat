import React, { useState } from "react";
import "./addfriend.scss"
import InputAuthen from "../../input/InputAuthen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserPlus,
    faBan
} from "@fortawesome/free-solid-svg-icons";
import ButtonAuthen from "../../button/ButtonAuthen";


const AddFriend = ({ onClose }) => {
    const [findText, setFindText] = useState("");
    const changeFindTextHandle = (value) => {
        setFindText(value)
    }
    const submitButtonHandle = () => {
        console.log(findText);
    }
    return (
        <div>
            <div className="overlay" onClick={onClose}>
            </div>
            <div className="modalContainer">
                <div className="headerModal">
                    <p className="title">Thêm bạn bè</p>
                    <div onClick={onClose} className="closeBtn">x</div>
                </div>
                <div className="inputRangeModal">
                    <InputAuthen
                        onInput={(value) => changeFindTextHandle(value)}
                        label="Số điện thoại"
                        type="text"
                        placeholder="Nhập số điện thoại cần thêm bạn bè"
                    />
                    <div>
                        <ButtonAuthen
                            onClick={submitButtonHandle}
                            content="Tìm"></ButtonAuthen>
                    </div>
                    {/* <div className="fakeFindBtn">Tìm</div> */}
                </div>
                <div className="friendFoundRangeModal">

                    {/* Này hong tìm thấy nha */}
                    {/* <div className="">Không tìm thấy nha! </div> */}

                    {/* Còn nếu cóa thì ra cái này <3  */}
                    <div className="tabFriend">
                        <div className="left">
                            <div className="imageFriendContain">
                                <img src="https://nhanquyenvn.org/wp-content/uploads/2021/03/tran-dan.png"></img>
                            </div>
                            <div className="infoFriendContain">
                                <p className="nameFriend">Trần Dần</p>
                                {/* <p className="genderFriend">Nam</p> */}
                                <p className="BirthDayFriend">30/2/1977</p>
                            </div>
                        </div>
                        <div className="btnContain">
                            <FontAwesomeIcon title="Thêm" className="icon" icon={faUserPlus} />
                            <FontAwesomeIcon title="Chặn" className="icon" icon={faBan} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AddFriend