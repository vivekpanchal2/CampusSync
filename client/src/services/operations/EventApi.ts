import { eventEndPoints } from "../api";
import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import { Dispatch } from "redux";
import { setLoading } from "../../redux/slices/auth";
import { setEvents } from "../../redux/slices/feed";

const {
  GET_CLUB_LIST,
  CREATE_EVENT_API,
  GET_ALL_EVENTS_API,
  GET_EVENT_BY_ID_API,
  GET_MY_ENROLLED_EVENT_API,
  GET_MY_HOSTED_EVENT_API,
  GET_MY_HOSTED_EVENT_DETAILS_API,
  EDIT_EVENT,
  DELETE_EVENT_API,
} = eventEndPoints;

export function createEvent(
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
        CREATE_EVENT_API,
        formData,
        {},
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      console.log(response);
      console.log("CREATE EVENT API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("EVENT CREATED SUCCESSFULLY");
      navigate("/");
    } catch (error: any) {
      console.log("EVENT CREATION API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function getClubList() {
  return async (dispatch: Dispatch<any>) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_CLUB_LIST);

      console.log(response);
      console.log("FETCH CLUB LIST API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response;
    } catch (error: any) {
      console.log("FETCH CLUB LIST API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function fetchEvents() {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_ALL_EVENTS_API);

      console.log("FETCH ALL EVENTS API RESPONSE............", response);

      dispatch(setEvents(response.data.events));
      return response.data;
    } catch (error: any) {
      console.log("FETCH ALL Events API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function getEventInfo(id: string) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        `${GET_EVENT_BY_ID_API}/${id}`
      );

      console.log("FETCH EVENT INFO API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (error: any) {
      console.log("FETCH EVENT API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function getMyEnrollEvents(token: string) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        GET_MY_ENROLLED_EVENT_API,
        {},
        {},
        { Authorization: `Bearer ${token}` }
      );

      console.log(
        "FETCH ENROLLED EVENT INFO API RESPONSE............",
        response
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (error: any) {
      console.log("FETCH ENROLLED EVENT API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function getMyHostedEvents(token: string) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        GET_MY_HOSTED_EVENT_API,
        {},
        {},
        { Authorization: `Bearer ${token}` }
      );

      console.log("FETCH HOSTED EVENT INFO API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (error: any) {
      console.log("FETCH HOSTED EVENT API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function getMyHostedEventDetails(token: string, eventId: string) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        `${GET_MY_HOSTED_EVENT_DETAILS_API}/${eventId}`,
        {},
        {},
        { Authorization: `Bearer ${token}` }
      );

      console.log("FETCH HOSTED EVENT INFO API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (error: any) {
      console.log("FETCH HOSTED EVENT API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function editEvent(
  token: string,
  eventId: string,
  formData: any,
  navigate: (path: string) => void
) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector(
        "PUT",
        `${EDIT_EVENT}/${eventId}`,
        { formData },
        {},
        { Authorization: `Bearer ${token}` }
      );

      console.log("EDIT EVENT API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success(response.data.message);
      navigate(`/dashboard/hosted`);
    } catch (error: any) {
      console.log("EDIT EVENT API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function deleteEvent(
  token: string | null,
  eventId: string,
  navigate: (path: string) => void
) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "DELETE",
        `${DELETE_EVENT_API}/${eventId}`,
        {},
        {},
        { Authorization: `Bearer ${token}` }
      );

      console.log("DELETE EVENT API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("EVENT DELETED");
      navigate("/dashboard/hosted");
    } catch (error: any) {
      console.log("REMOVE EVENT MEMBER INFO API ERROR............", error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
}
