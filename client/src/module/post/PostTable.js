import { ActionDelete, ActionEdit, ActionView } from "components/action";
import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { postContext } from "../../contexts/postContext";
import { useNavigate } from "react-router-dom";

const PostTable = ({ filterposts }) => {
  const detailPost = async (PostId) => {
    const id = PostId;
    const idPostInfo = { id };
    try {
      const content = await getDetailedPost(idPostInfo);
      console.log(content.posts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1DC071",
      cancelButtonColor: "#ef233c",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deleted = await deletePost(postId);
          if (deleted["success"]) {
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
            setTimeout(function () {
              window.location.reload();
            }, 2000);
          } else {
            Swal.fire("Error occured");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  const { deletePost, getDetailedPost } = useContext(postContext);

  const index = 1;
  const navigate = useNavigate();

  return (
    <>
      {filterposts.map((post) => (
        <tr>
          <td>{`0000${index}`}</td>
          <td>
            <div className="flex items-center gap-x-3">
              <img
                src={post.image ? post.image : require("../../assets/logo.png")}
                alt=""
                className="w-[66px] h-[55px] rounded object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{post.title}</h3>
                <time className="text-sm text-gray-500">{post.date}</time>
              </div>
            </div>
          </td>
          <td>
            <span className="text-gray-500">{post.category}</span>
          </td>
          <td>
            <span className="text-gray-500">{post.user.username}</span>
          </td>
          <td>
            <div className="flex items-center text-gray-500 gap-x-3">
              <ActionView onClick={() => navigate(`/${post._id}`)}></ActionView>
              <ActionEdit onClick={() => detailPost(post._id)}></ActionEdit>
              <ActionDelete
                onClick={() => handleDeletePost(post._id)}
              ></ActionDelete>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default PostTable;
