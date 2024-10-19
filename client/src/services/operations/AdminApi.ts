import { clubEndPoints, adminEndPoints } from "../api";
import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import { Dispatch } from "redux";
import { setLoading } from "../../redux/slices/auth";

const { GET_ALL_CLUBS_API } = clubEndPoints;
const {
  GET_ALL_EVENTS,
  GET_ALL_USERS,
  GET_EVENT_DETAILS_FOR_ADMIN,
  GET_CLUB_FULL_DETAILS,
  REMOVE_CLUB_MEMBER,
  DELETE_CLUB_API,
} = adminEndPoints;

export function getAllClubs() {
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

export function getAllEvents(token: string) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        GET_ALL_EVENTS,
        {},
        {},
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("FETCH ALL EVENTS API RESPONSE............", response);

      return response.data;
    } catch (error: any) {
      console.log("FETCH ALL EVENTS API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function getAllUsers(token: string) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        GET_ALL_USERS,
        {},
        {},
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("FETCH ALL USER API RESPONSE............", response);

      return response.data;
    } catch (error: any) {
      console.log("FETCH ALL USER API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function getEventDetailsForAdmin(token: string, eventId: string) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        `${GET_EVENT_DETAILS_FOR_ADMIN}/${eventId}`,
        {},
        {},
        { Authorization: `Bearer ${token}` }
      );

      console.log("FETCH FULL EVENT INFO API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (error: any) {
      console.log("FETCH FULL EVENT INFO API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function getClubDetailsForAdmin(token: string, clubId: string) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        `${GET_CLUB_FULL_DETAILS}/${clubId}`,
        {},
        {},
        { Authorization: `Bearer ${token}` }
      );

      console.log("FETCH FULL CLUB INFO API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (error: any) {
      console.log("FETCH FULL CLUB INFO API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function deleteClubMember(token: string, memberId: string) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "DELETE",
        `${REMOVE_CLUB_MEMBER}/${memberId}`,
        {},
        {},
        { Authorization: `Bearer ${token}` }
      );

      console.log("REMOVE CLUB MEMBER INFO API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Member REMOVED");

      return response.data;
    } catch (error: any) {
      console.log("REMOVE CLUB MEMBER INFO API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function deleteClub(
  token: string | null,
  clubId: string,
  navigate: (path: string) => void
) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "DELETE",
        `${DELETE_CLUB_API}/${clubId}`,
        {},
        {},
        { Authorization: `Bearer ${token}` }
      );

      console.log("DELETE CLUB INFO API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("CLUB DELETED");
      navigate("/dashboard/clubs");
    } catch (error: any) {
      console.log("REMOVE CLUB MEMBER INFO API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
}
