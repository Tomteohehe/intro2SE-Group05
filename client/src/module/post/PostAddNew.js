import Toggle from "components/toggle/Toggle";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Label } from "components/label";
import { Input } from "components/input";
import { Field } from "components/field";
import { Dropdown } from "components/dropdown";
import { Button } from "components/button";
import DashboardHeading from "module/dashboard/DashboardHeading";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { postContext } from "../../contexts/postContext";
import { useNavigate } from "react-router-dom";
import CloudinaryUploader from "components/image/CloudinaryUploader";

const PostAddNew = () => {
  const navigate = useNavigate();

  const [isDefaultImageVisible, setDefaultImageVisible] = useState(true);

  const { addPost } = useContext(postContext);

  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      categoryId: "",
      categoryName: "",
      hot: false,
      image: "",
    },
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
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
  const [url, updateUrl] = useState();
  const [error, updateError] = useState();

  const addPostHandler = async (values) => {
    //console.log(content)
    const { title, slug, status, categoryName, hot } = values;
    const category = categoryName;
    const image = url;
    const simplePostInfo = { title, category, image, content };
    try {
      const newPostData = await addPost(simplePostInfo);
      if (newPostData["success"]) {
        toast.success(`New post added successfully`);
        navigate("/manage/posts");
      } else {
        toast.error(newPostData["message"]);
      }
    } catch (error) {
      console.log(error);
    }
    // setLoading(true);
    // try {
    //   const cloneValues = { ...values };
    //   cloneValues.slug = slugify(values.slug || values.title, { lower: true });
    //   cloneValues.status = Number(values.status);
    //   const colRef = collection(db, "users", userInfo.uid, "posts");
    //   await addDoc(colRef, {
    //     ...cloneValues,
    //     content,
    //     image,
    //     userId: userInfo.uid,
    //     createdAt: serverTimestamp(),
    //   });
    //   toast.success("Create new post successfully!");
    //   reset({
    //     content: "",
    //     title: "",
    //     slug: "",
    //     status: 2,
    //     categoryId: "",
    //     hot: false,
    //     image: "",
    //   });
    //   handleResetUpload();
    //   setSelectCategory({});
    // } catch (error) {
    //   setLoading(false);
    // } finally {
    //   setLoading(false);
    // }
  };

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
    setValue("categoryName", item.name);
    setSelectCategory(item);
  };

  function handleOnUpload(error, result, widget) {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    updateUrl(result?.info?.secure_url);
    setValue("image", url);
    // Hide the default image after upload
    setDefaultImageVisible(false);
  }
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
      <form
        className="form"
        onSubmit={handleSubmit(addPostHandler)}
        autoComplete="off"
      >
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
            {/* <ImageUpload
              // onChange={handleSelectImage}
              // handleRemoveImage={handleRemoveImage}
              className="h-[250px] shadow-lg w-full"
              // progress={progress}
              // image={image}
            ></ImageUpload> */}
            {/*
            <Helmet>
              <script
                src="https://upload-widget.cloudinary.com/global/all.js"
                type="text/javascript"
              />
            </Helmet>
            */}
            {/*}
            <Image cloudName="aoh4fpwm" publicId="image1">
              <Transformation width="300" height="200" crop="fill" />
            </Image>

            {/* Render the CloudinaryUploader component */}
            {/*<CloudinaryUploader /> */}
            <CloudinaryUploader onUpload={handleOnUpload}>
              {({ open }) => {
                function handleOnClick(e) {
                  e.preventDefault();
                  open();
                }
                return (
                  <>
                    {!isDefaultImageVisible && (
                      <div>
                        {/* Render the uploaded image */}
                        {/* Add logic to render the uploaded image based on your implementation */}
                        {/* For example, you might use an <img> tag with the uploaded image source */}
                        {/* Add a button beneath the uploaded image for rechoosing */}
                        <button
                          className="p-3 text-sm text-white bg-green-500 rounded-md"
                          onClick={handleOnClick}
                        >
                          Rechoose Image
                        </button>
                      </div>
                    )}

                    {isDefaultImageVisible && (
                      <button
                        className="flex items-start justify-center w-full h-full border-r-2 border-gray-700"
                        onClick={handleOnClick}
                      >
                        <img
                          className="w-[50%] h-[90%]"
                          src={require("../../assets/img-upload.png")}
                          alt="ImgUpload"
                        />
                      </button>
                    )}
                  </>
                );
              }}
            </CloudinaryUploader>
            {url && (
              <>
                <img src={url} alt="Uploaded resource" />
              </>
            )}
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
                  name="content"
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
