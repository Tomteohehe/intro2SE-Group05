import Toggle from "components/toggle/Toggle";
import slugify from "slugify";
import React, { useEffect, useMemo, useState } from "react";
import ImageUpload from "components/image/ImageUpload";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { postStatus } from "utils/constants";
import { Label } from "components/label";
import { Input } from "components/input";
import { Field } from "components/field";
import { Dropdown } from "components/dropdown";
import { Button } from "components/button";
import DashboardHeading from "module/dashboard/DashboardHeading";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { imgbbAPI } from "config/apiConfig";

const PostAddNew = () => {
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      categoryId: "",
      hot: false,
      image: "",
    },
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  // const [categories, setCategories] = useState([]);
  const categories = [
    {
      id: 1,
      name: "Lifestyle",
    },
    {
      id: 2,
      name: "Fitness",
    },
    {
      id: 3,
      name: "Knowledge",
    },
    {
      id: 4,
      name: "Culture",
    },
    {
      id: 5,
      name: "Religion",
    },
  ];
  const [selectCategory, setSelectCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  // const addPostHandler = async (values) => {
  //   setLoading(true);
  //   try {
  //     const cloneValues = { ...values };
  //     cloneValues.slug = slugify(values.slug || values.title, { lower: true });
  //     cloneValues.status = Number(values.status);
  //     const colRef = collection(db, "users", userInfo.uid, "posts");
  //     await addDoc(colRef, {
  //       ...cloneValues,
  //       content,
  //       image,
  //       userId: userInfo.uid,
  //       createdAt: serverTimestamp(),
  //     });
  //     toast.success("Create new post successfully!");
  //     reset({
  //       content: "",
  //       title: "",
  //       slug: "",
  //       status: 2,
  //       categoryId: "",
  //       hot: false,
  //       image: "",
  //     });
  //     handleResetUpload();
  //     setSelectCategory({});
  //   } catch (error) {
  //     setLoading(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   async function getData() {
  //     const colRef = collection(db, "categories");
  //     const q = query(colRef, where("status", "==", 1));
  //     const querySnapshot = await getDocs(q);
  //     let result = [];
  //     querySnapshot.forEach((doc) => {
  //       result.push({
  //         id: doc.id,
  //         ...doc.data(),
  //       });
  //     });
  //     setCategories(result);
  //   }
  //   getData();
  // }, []);

  useEffect(() => {
    document.title = "GoaTalks - Add new post";
  }, []);

  const handleClickOption = (item) => {
    setValue("categoryId", item.id);
    setSelectCategory(item);
  };

  // const modules = useMemo(
  //   () => ({
  //     toolbar: [
  //       ["bold", "italic", "underline", "strike"],
  //       ["blockquote", "code-block"],
  //       [{ header: 1 }, { header: 2 }], // custom button values
  //       [{ list: "ordered" }, { list: "bullet" }],
  //       [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //       ["link", "image"],
  //     ],
  //     // imageUploader: {
  //     //   upload: async (file) => {
  //     //     const bodyFormData = new FormData();
  //     //     bodyFormData.append("image", file);
  //     //     const response = await axios({
  //     //       method: "post",
  //     //       url: imgbbAPI,
  //     //       data: bodyFormData,
  //     //       headers: {
  //     //         "Content-Type": "multipart/form-data",
  //     //       },
  //     //     });
  //     //     return response.data.data.url;
  //     //   },
  //     // },
  //   }),
  //   []
  // );

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <>
      <DashboardHeading
        title="Write New Post"
        desc="Let your thoughts spreading"
      ></DashboardHeading>
      <form>
        <div className="form-layout">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              // onChange={handleSelectImage}
              // handleRemoveImage={handleRemoveImage}
              className="h-[250px] shadow-lg w-full"
              // progress={progress}
              // image={image}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select the category"></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleClickOption(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectCategory?.name && (
              <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
                {selectCategory?.name}
              </span>
            )}
          </Field>
        </div>
        <div className="solo-form-layout">
          <div className="mb-10">
            <Field>
              <Label>Content</Label>
              <div className="w-full entry-content">
                <ReactQuill
                  modules={modules}
                  theme="snow"
                  value={content}
                  onChange={setContent}
                />
              </div>
            </Field>
          </div>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto w-[250px]"
          isLoading={loading}
          disabled={loading}
        >
          Add new post
        </Button>
      </form>
    </>
  );
};

export default PostAddNew;
