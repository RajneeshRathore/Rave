import React, { useState, useEffect } from "react";
import SidebarShowcase from "../components/normal/SiderbarShowcase";
import SectionContainer from "../components/normal/SectionContainer";
import { socket } from "../socket";

const Home = () => {

  const [activeItem, setActiveItem] = useState("");

  //socket connection
  useEffect(() => {

    socket.connect();

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    return () => {
      socket.disconnect();
    };

  }, []);



  return (
    <div className="h-screen w-full flex fixed">
      <SidebarShowcase
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      <SectionContainer active={activeItem} />
    </div>
  );
};

export default Home;