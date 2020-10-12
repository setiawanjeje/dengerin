import React, { useRef, useEffect } from "react";
import Link from "next/link";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CloseIcon from "@material-ui/icons/Close";

const mockUserList = [
  {
    name: "Jessica",
    id: 1,
  },
  {
    name: "Park Bo Gum",
    id: 2,
  },
];

function MenuPage(props) {
  return (
    <div className="h-screen bg-white w-full px-4">
      <div className="flex justify-end">
        <button className="p-8 " onClick={props.handleClose}>
          <CloseIcon fontSize="large" />
        </button>
      </div>
      <Link href="/">
        <button className="flex px-4 py-2 bg-pink-100 items-center w-full justify-center mb-8 rounded-md">
          <div className="mr-2">
            <ExitToAppIcon />
          </div>
          End Session
        </button>
      </Link>
      <div className="rounded-md">
        <div className="mb-4">Active user:</div>
        {mockUserList &&
          mockUserList.map((user, key) => (
            <div
              key={key}
              className="flex justify-between px-4 py-2 bg-gray-100"
            >
              <div>{user.name}</div>
              <div className="text-gray-500">#{user.id}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MenuPage;
