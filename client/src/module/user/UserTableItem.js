import React from "react";

const UserTableItem = ({ user }) => {
  const date = new Date(user.createdAt);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  return (
    <div className="flex items-center gap-x-3">
      <img
        src={user?.avatar || require("../../assets/logo.png")}
        alt=""
        className="w-[66px] h-[55px] rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{user.username}</h3>
        <time className="text-sm text-gray-500">{formattedDate}</time>
      </div>
    </div>
  );
};

export default UserTableItem;
