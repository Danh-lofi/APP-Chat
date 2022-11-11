import React, { useState } from "react";
import "./addfriendgroup.scss"
import InputAuthen from "../../input/InputAuthen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserPlus,
    faBan,
    faCirclePlus
} from "@fortawesome/free-solid-svg-icons";
import ButtonAuthen from "../../button/ButtonAuthen";


const AddFriendToGroup = ({ onClose }) => {
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
                    <p className="title">Thêm thành viên</p>
                    <div onClick={onClose} className="closeBtn">x</div>
                </div>
                <div className="inputRangeModal">
                    <InputAuthen
                        onInput={(value) => changeFindTextHandle(value)}
                        label="Số điện thoại"
                        type="text"
                        placeholder="Nhập số điện thoại cần thêm vào nhóm"
                    />
                    <div>
                        <ButtonAuthen
                            onClick={submitButtonHandle}
                            content="Tìm"></ButtonAuthen>
                    </div>
                    {/* <div className="fakeFindBtn">Tìm</div> */}
                </div>
                <div className="friendFoundRangeModal">
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
                            <FontAwesomeIcon title="Thêm" className="icon" icon={faCirclePlus} />
                        </div>
                    </div>
                </div>
                <div className="listFriend">
                    <p className="label">Bạn bè</p>
                    <div className="friendItem">
                        <label class="container_checkbox">
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                        </label>
                        <img src="https://nhanquyenvn.org/wp-content/uploads/2021/03/tran-dan.png"></img>
                        <p className="name_member">Trần dần</p>
                    </div>
                    <div className="friendItem">
                        <label class="container_checkbox">
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                        </label>
                        <img src="https://nhanquyenvn.org/wp-content/uploads/2021/03/tran-dan.png"></img>
                        <p className="name_member">Trần dần</p>
                    </div>
                    <div className="friendItem">
                        <label class="container_checkbox">
                            <input type="checkbox" />
                            <span class="checkmark"></span>
                        </label>
                        <img src="https://nhanquyenvn.org/wp-content/uploads/2021/03/tran-dan.png"></img>
                        <p className="name_member">Trần dần</p>
                    </div>
                </div>
                <div className="footer">
                    <ButtonAuthen
                        content="Xác nhận">
                    </ButtonAuthen>
                </div>
            </div>
        </div>
    );
}
export default AddFriendToGroup