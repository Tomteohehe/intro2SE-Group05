import { ActionDelete, ActionEdit, ActionView } from "components/action";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PostTable = () => {
  // useEffect(() => {
  //   async function fetchUser() {
  //     if (post.userId) {
  //       const docRef = doc(db, "users", post.userId);
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap?.data) setUser(docSnap?.data());
  //     }
  //   }

  //   fetchUser();
  // }, [post.userId]);

  // const handleDeletePost = async (postId) => {
  //   const colRef = doc(db, "users", userInfo?.uid, "posts", postId);
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#1DC071",
  //     cancelButtonColor: "#ef233c",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       await deleteDoc(colRef);
  //       Swal.fire("Deleted!", "Your post has been deleted.", "success");
  //     }
  //   });
  // };

  return (
    <>
      <td title="No risk No story">00001</td>
      <td>
        <div className="flex items-center gap-x-3">
          <img
            src={
              "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
            }
            alt=""
            className="w-[66px] h-[55px] rounded object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold">No risk No story</h3>
            <time className="text-sm text-gray-500">Date: 18 Nov</time>
          </div>
        </div>
      </td>
      <td>
        <span className="text-gray-500">Lifestyle</span>
      </td>
      <td>
        <span className="text-gray-500">Ho Vinh Dinh</span>
      </td>
      <td>
        <div className="flex items-center text-gray-500 gap-x-3">
          <ActionView
          // onClick={() => navigate(`/${post.userId}-${post.slug}`)}
          ></ActionView>
          <ActionEdit
          // onClick={() => navigate(`/manage/update-post?id=${post.id}`)}
          ></ActionEdit>
          <ActionDelete
          // onClick={() => handleDeletePost(post.id)}
          ></ActionDelete>
        </div>
      </td>
    </>
  );
};

export default PostTable;
