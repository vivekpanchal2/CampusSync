import { postEndPoints } from "../api";
import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import { Dispatch } from "redux";
import { setLoading } from "../../redux/slices/auth";

const {
  FETCH_POSTS_API,
  FETCH_COMMENTS_API,
  POST_COMMENT_API,
  CREATE_POST_API,
  FETCH_MYPOSTS_API,
} = postEndPoints;

export function createPost(
  formData: any,
  navigate: (path: string) => void,
  token: string
) {
  return async (dispatch: Dispatch<any>) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    console.log(formData);

    try {
      const response = await apiConnector(
        "POST",
        CREATE_POST_API,
        formData,
        {},
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      console.log(response);
      console.log("CREATE POST API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("POST CREATED SUCCESSFULLY");
      navigate("/posts");
    } catch (error: any) {
      console.log("POST CREATION API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function fetchPosts(page: number) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        FETCH_POSTS_API,
        {},
        { page: page }
      );

      console.log("FETCH POST API RESPONSE............", response);

      return response.data;
    } catch (error: any) {
      console.log("FETCH ALL POST API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export async function postComment(
  postId: string,
  content: string,
  token: string
) {
  try {
    const response = await apiConnector(
      "POST",
      `${POST_COMMENT_API}/${postId}`,
      { content },
      {},
      { Authorization: `Bearer ${token}` }
    );

    console.log("POST COMMENT API RESPONSE............", response);

    return response.data;
  } catch (error: any) {
    console.log("FETCH ALL POST API ERROR............", error);
    toast.error(error.response?.data.message || "Something went wrong");
  }
}

export async function fetchComments(postId: string) {
  try {
    const response = await apiConnector(
      "GET",
      `${FETCH_COMMENTS_API}/${postId}`,
      { postId },
      {},
      {}
    );

    console.log("FETCH Comment API RESPONSE............", response);

    return response.data;
  } catch (error: any) {
    console.log("FETCH ALL COMMENTS API ERROR............", error);
    toast.error(error.response?.data.message || "Something went wrong");
  }
}

export function fetchMyPosts(token: string) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        FETCH_MYPOSTS_API,
        {},
        {},
        { Authorization: `Bearer ${token}` }
      );

      console.log("FETCH MY POST API RESPONSE............", response);

      return response.data;
    } catch (error: any) {
      console.log("FETCH MY POST API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
}
