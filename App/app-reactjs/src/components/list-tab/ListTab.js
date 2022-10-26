import React, { useState } from "react";
import Tab from "../tab/Tab";

const ListTab = (props) => {
  const listTab = props.listTab;
  const [tabActive, setTabActive] = useState({
    userActive: false,
    chatActive: false,
    contactActive: false,
    settingActive: false,
  });

  const activeTabHandle = (name) => {
    switch (name) {
      case "profile":
        setTabActive((active) => {
          return {
            chatActive: false,
            contactActive: false,
            settingActive: false,
            userActive: true,
          };
        });
        break;
      case "chat":
        setTabActive((active) => {
          return {
            userActive: false,
            contactActive: false,
            settingActive: false,
            chatActive: true,
          };
        });
        break;
      case "contact":
        setTabActive((active) => {
          return {
            userActive: false,
            chatActive: false,
            settingActive: false,
            contactActive: true,
          };
        });
        break;
      case "setting":
        setTabActive((active) => {
          return {
            userActive: false,
            chatActive: false,
            contactActive: false,
            settingActive: true,
          };
        });
        break;
      default:
        setTabActive((active) => {
          return {
            userActive: false,
            chatActive: false,
            contactActive: false,
            settingActive: false,
          };
        });
        break;
    }
  };
  const ListTab = listTab.map((tab) => (
    <Tab
      key={tab.tabName}
      icon={tab.icon}
      name={tab.tabName}
      tabActive={tabActive}
      onClick={activeTabHandle}
    />
  ));
  return <>{ListTab}</>;
};

export default ListTab;
