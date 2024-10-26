import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { fetchMyPosts } from "../../services/operations/PostsApi";
import CommentModal from "../../components/Posts/CommentModal";
import Loader from "../../components/common/Loader";
import { IoCreateSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Post } from "../Types/types";

const MyPostsPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const token = useSelector((state: RootState) => state.auth.token);
  const [myPosts, setMyPosts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const getPosts = async () => {
    setLoading(true);
    try {
      if (token) {
        const response = await dispatch(fetchMyPosts(token));
        setMyPosts(response.myPosts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const openCommentModal = (postId: string) => {
    setSelectedPostId(postId);
  };

  const closeCommentModal = () => {
    setSelectedPostId(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between py-7">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-100">
          My Posts
        </h1>
        <Link to="/posts/createPost">
          <button className="w-44 flex justify-between items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-5 rounded-full font-semibold text-sm shadow-lg hover:shadow-2xl transition-transform">
            Create New Post <IoCreateSharp className="text-xl" />
          </button>
        </Link>
      </div>

      {loading && <Loader loading={loading} />}

      {!loading && myPosts.length > 0 ? (
        <div className="space-y-6">
          {myPosts.map((post: Post) => (
            <div
              key={post.id}
              className="bg-gray-800 shadow-md rounded-md p-4 space-y-4"
            >
              <div className="flex items-center justify-between text-gray-400">
                <p className="text-sm">By {post.user.name}</p>
                <p className="text-sm">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>

              <p className="text-gray-300 text-lg">{post.content}</p>
              {post.image && (
                <div className="overflow-hidden rounded-md">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}

              <button
                onClick={() => openCommentModal(post.id)}
                className="text-blue-400 mt-2 block text-right hover:underline"
              >
                View Comments
              </button>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-center text-gray-400">No posts available.</p>
        )
      )}

      {selectedPostId && (
        <CommentModal
          postId={selectedPostId}
          isOpen={!!selectedPostId}
          onClose={closeCommentModal}
        />
      )}
    </div>
  );
};

export default MyPostsPage;
