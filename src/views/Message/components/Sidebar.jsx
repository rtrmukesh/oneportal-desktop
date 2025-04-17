import React, { useState } from "react";
import SearchBar from "../../../components/SearchBar";
import SidebarFooter from "./SidebarFooter";
import UserList from "./UserList";

const Sidebar = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div
      className="slack-sidebar"
      style={{
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <UserList search={searchText} />
      <SidebarFooter />
    </div>
  );
};

export default Sidebar;
