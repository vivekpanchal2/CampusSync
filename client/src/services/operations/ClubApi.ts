import { clubEndPoints } from "../api";
import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import { Dispatch } from "redux";
import { setLoading } from "../../redux/slices/auth";
import { setIsTermsModal } from "../../redux/slices/modal";
import { setClubs } from "../../redux/slices/feed";

const {
  GET_CLUB_BY_ID_API,
  CREATE_CLUB_API,
  GET_ALL_CLUBS_API,
  ADD_MEMBER,
  DOWNLOAD_MEMBERCARD,
  GET_JOINED_CLUBS,
} = clubEndPoints;

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
      navigate("/clubs");
    } catch (error: any) {
      console.log("CLUB CREATION API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
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

      dispatch(setClubs(response.data.clubs));
      return response.data;
    } catch (error: any) {
      console.log("FETCH ALL CLUB API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function joinClub(
  token: string,
  clubId: string,
  navigate: (path: string) => void
) {
  return async (dispatch: Dispatch<any>) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        ADD_MEMBER,
        { clubId },
        {},
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      console.log(response);
      console.log("Join Club API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Club Joined SUCCESSFULLY");
      dispatch(setIsTermsModal(false));
      navigate("/dashboard/clubs");
    } catch (error: any) {
      console.log("Join Club API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function downloadMemberCard(
  userId: string,
  clubId: string,
  token: string
) {
  return async (dispatch: Dispatch<any>) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        DOWNLOAD_MEMBERCARD,
        { userId, clubId },
        {},
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );

      const { memberCardUrl } = response.data;

      console.log({ memberCardUrl });

      const link = document.createElement("a");
      link.href = memberCardUrl;
      link.setAttribute("download", "membership-card.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Membership card downloaded successfully!");
    } catch (error: any) {
      console.error("Error downloading member card:", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function getJoinedClubs(token: string) {
  return async (dispatch: Dispatch<any>) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "GET",
        GET_JOINED_CLUBS,
        {},
        {},
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (error: any) {
      console.error("Error Fetching Joined Clubs:", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}
