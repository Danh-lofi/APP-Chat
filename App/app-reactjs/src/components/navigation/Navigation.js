import React from "react";
import { useDispatch } from "react-redux";
import "./navigation.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import {
  faComment,
  faAddressBook,
  faGear,
  faMoon,
  faLock,
  faCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

import ListTab from "../list-tab/ListTab";
import { userActions } from "../../store/userSlice";

const listTab = [
  { tabName: "profile", icon: faCircleUser },
  { tabName: "chat", icon: faComment },
  { tabName: "contact", icon: faAddressBook },
  { tabName: "setting", icon: faGear },
];

const Box = styled(animated.div)`
  background: #fff;
  box-shadow: 0 2px 4px rgb(15 34 58 / 12%);
  color: #333;
  // background: #333;
  // color: #fff;
  width: 200px;
  padding: 5px 25px;
  border-radius: 4px;
  margin-left: 5px;
`;

const Navigation = () => {
  const dispatch = useDispatch();

  const config = { tension: 300, friction: 30 };
  const initialStyles = {
    opacity: 0,
    transform: "translateY(20%)",
  };
  const [props, setSpring] = useSpring(() => initialStyles);

  function onMount() {
    setSpring({
      opacity: 1,
      transform: "translateY(0%)",
      onRest: () => {},
      config,
    });
  }

  function onHide({ unmount }) {
    setSpring({
      ...initialStyles,
      onRest: unmount,
      config: { ...config, clamp: true },
    });
  }
  // Log out
  const logOutHandle = () => {
    console.log("log out");
    dispatch(userActions.logOut());
  };
  return (
    <div className="navigation">
      <div className="navigation__container">
        <div className="navigation__logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <path d="M8.5,18l3.5,4l3.5-4H19c1.103,0,2-0.897,2-2V4c0-1.103-0.897-2-2-2H5C3.897,2,3,2.897,3,4v12c0,1.103,0.897,2,2,2H8.5z M7,7h10v2H7V7z M7,11h7v2H7V11z"></path>
          </svg>
        </div>
        <div className="navigation__main">
          <ListTab listTab={listTab} />
        </div>

        <div className="navigation__bottom">
          <div className="navigation__main__wrap">
            <FontAwesomeIcon icon={faMoon} />
            <div className="navigation__main__effect"></div>
          </div>
          <Tippy
            data-placement="top"
            trigger="click"
            interactive={true}
            render={(attrs) => (
              <Box style={props} {...attrs}>
                <ul>
                  <Link to="/profile" className="navigation__bottom__item">
                    <span>Hồ sơ</span>
                    <div>
                      <FontAwesomeIcon icon={faCircleUser} />
                    </div>
                  </Link>
                  <Link to="/setting" className="navigation__bottom__item">
                    <span>Cài đặt</span>
                    <div>
                      <FontAwesomeIcon icon={faGear} />
                    </div>
                  </Link>
                  <Link
                    to="/change-password"
                    className="navigation__bottom__item"
                  >
                    <span>Đổi mật khẩu</span>
                    <div>
                      <FontAwesomeIcon icon={faLock} />
                    </div>
                  </Link>
                  <Link to="/logout" className="navigation__bottom__item">
                    <span onClick={logOutHandle}>Đăng xuất</span>
                    <div>
                      <FontAwesomeIcon icon={faCircleLeft} />
                    </div>
                  </Link>
                </ul>
              </Box>
            )}
            animation={true}
            onMount={onMount}
            onHide={onHide}
          >
            <div className="navigation__bottom__user">
              <img
                src="https://s120-ava-talk.zadn.vn/b/9/b/a/6/120/473b8d61137b99d8000663d47e7437c9.jpg"
                alt="avatar"
              />
            </div>
          </Tippy>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
