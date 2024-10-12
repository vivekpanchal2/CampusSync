import { clubEndPoints } from "../api";
import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import { Dispatch } from "redux";
import { setLoading } from "../../redux/slices/auth";
const { GET_CLUB_BY_ID_API, CREATE_CLUB_API, GET_ALL_CLUBS_API } =
  clubEndPoints;

export function createClub(formData: any, navigate: (path: string) => void) {
  return async (dispatch: Dispatch<any>) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        CREATE_CLUB_API,
        formData,
        {},
        { "Content-Type": "multipart/form-data" }
      );

      console.log(response);
      console.log("CREATE CLUB API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("CLUB CREATED SUCCESSFULLY");
      navigate("/");
    } catch (error: any) {
      console.log("CLUB CREATION API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
      // navigate("/auth");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function getClubInfo(id: string) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", `${GET_CLUB_BY_ID_API}/${id}`);

      console.log("FETCH CLUB INFO API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (error: any) {
      console.log("FETCH CLUB API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function getAllClub() {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_ALL_CLUBS_API);

      console.log("FETCH ALL CLUB API RESPONSE............", response);

      return response.data;
    } catch (error: any) {
      console.log("FETCH ALL CLUB API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
}
