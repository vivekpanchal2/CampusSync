import React, { useState, useEffect, useRef } from "react";
import { postComment, fetchComments } from "../../services/operations/PostsApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

interface Comment {
  id: string;
  content: string;
  user: {
    name: string;
  };
  createdAt: string;
}

interface CommentModalProps {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
  postId,
  isOpen,
  onClose,
}) => {
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [postingComment, setPostingComment] = useState<boolean>(false);
  const [loadingComments, setLoadingComments] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchCommentsForPost = async () => {
      setLoadingComments(true);
      try {
        const response: any = await fetchComments(postId);
        setComments(response.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("Failed to load comments.");
      }
      setLoadingComments(false);
    };

    if (isOpen) {
      fetchCommentsForPost();
    }
  }, [isOpen, postId]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    setPostingComment(true);
    setError(null);

    try {
      if (token) {
        const response: any = await postComment(postId, newComment, token);
        setComments((prevComments) => [...prevComments, response.comment]);
        setNewComment("");
      }
    } catch (error) {
      setError("Failed to post comment. Please try again.");
    } finally {
      setPostingComment(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          ref={modalRef}
          tabIndex={-1}
        >
          <div className="bg-gray-800 text-gray-200 w-full max-w-2xl p-6 rounded-lg shadow-lg transition-transform duration-300 transform scale-100">
            <div className="flex justify-between items-center mb-4">
              <h2 id="modal-title" className="text-xl font-semibold">
                Comments
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-200 focus:outline-none"
                aria-label="Close comments"
              >
                &times;
              </button>
            </div>

            <div className="overflow-y-auto h-60 mb-4">
              {loadingComments ? (
                <p className="text-gray-400">Loading comments...</p>
              ) : comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="mb-4">
                    <p className="font-semibold text-gray-200">
                      {comment.user.name}
                    </p>
                    <p className="text-gray-300">{comment.content}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      {new Date(comment.createdAt).toLocaleDateString()}{" "}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No comments yet.</p>
              )}
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="flex items-center border border-gray-600 rounded-full px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-blue-500">
              <input
                type="text"
                className="flex-grow outline-none text-sm text-gray-300 bg-transparent placeholder-gray-500 focus:outline-none"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={postingComment}
                aria-label="Write your comment"
              />
              <button
                onClick={handleCommentSubmit}
                className={`ml-3 bg-blue-500 text-white p-2 rounded-full focus:outline-none hover:bg-blue-600 transition-colors ${
                  postingComment ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={postingComment}
                aria-busy={postingComment}
                aria-label="Post comment"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentModal;
