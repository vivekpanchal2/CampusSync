import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { createPost } from "../../services/operations/PostsApi";
import { appendPosts } from "../../redux/slices/feed";
import Loader from "../common/Loader";
import { useNavigate } from "react-router-dom";

const CreatePostPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { loading, token } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("Content is required");
      return;
    }

    setSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    if (token) {
      try {
        const response = await dispatch(createPost(formData, navigate, token));
        dispatch(appendPosts(response));
        setContent("");
        setImage(null);
        setImagePreview(null);
      } catch (error) {
        console.error("Error creating post:", error);
        setError("Failed to create post. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-[5rem]">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-100">
        Create a New Post
      </h1>

      {loading && <Loader loading={loading} />}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
      >
        <textarea
          className="w-full p-2 rounded-md border border-gray-700 bg-gray-900 text-gray-100"
          rows={5}
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border border-gray-700 rounded-md p-2 text-gray-100"
        />

        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-72 object-cover rounded-md"
            />
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className={`w-full px-4 py-2 rounded-md bg-blue-500 text-white ${
            submitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={submitting}
        >
          {submitting ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
