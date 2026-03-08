import React from "react";
import DmSection from "./DmSection";
import GroupSection from "./GroupSection";
import SettingSection from "./SettingSection";
import Home from "./Home";
const SectionContainer = ({ active}) => {
  return (
    <>
      {active === "dm" && <DmSection />}
      {active === "group" && <GroupSection />}
      {active === "setting" && <SettingSection />}
      {active==="" && <Home/>}
    </>
  );
};

export default SectionContainer;
