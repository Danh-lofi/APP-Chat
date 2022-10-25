import React from "react";
import "./navigation.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import {
  faComment,
  faAddressBook,
  faGear,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import ListTab from "../list-tab/ListTab";
const listTab = [
  { tabName: "user", icon: faCircleUser },
  { tabName: "chat", icon: faComment },
  { tabName: "contact", icon: faAddressBook },
  { tabName: "setting", icon: faGear },
];

const Navigation = () => {
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
          <div className="navigation__bottom__user">
            <img src="https://s120-ava-talk.zadn.vn/b/9/b/a/6/120/473b8d61137b99d8000663d47e7437c9.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
