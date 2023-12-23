import React from "react";
import UserTableItem from "./UserTableItem";
import { ActionDelete, ActionEdit, ActionView } from "components/action";

const UserTable = ({ users }) => {
  return (
    <>
      {users.map((user, index) => (
        <tr>
          <td>{`0${index + 1}`}</td>
          <td>
            <UserTableItem user={user}></UserTableItem>
          </td>
          <td>
            <span className="text-gray-500">{user.email}</span>
          </td>
          <td>
            <span className="text-gray-500">{user.description}</span>
          </td>
          <td>
            <div className="flex items-center text-gray-500 gap-x-3">
              <ActionView
              // onClick={() => navigate(`/post/${post._id}`)}
              ></ActionView>
              <ActionEdit></ActionEdit>
              <ActionDelete
              // onClick={() => handleDeletePost(post._id)}
              ></ActionDelete>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default UserTable;
