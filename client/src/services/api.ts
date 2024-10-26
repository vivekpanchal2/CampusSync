const BASE_URL = "http://localhost:3000/api/v1";

export const authEndPoints: { [key: string]: string } = {
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
};

export const clubEndPoints: { [key: string]: string } = {
  CREATE_CLUB_API: BASE_URL + "/club/createClub",
  GET_CLUB_BY_ID_API: BASE_URL + "/club",
  GET_ALL_CLUBS_API: BASE_URL + "/club/getAllClubs",
  ADD_MEMBER: BASE_URL + "/club/joinClub",
  DOWNLOAD_MEMBERCARD: BASE_URL + "/club/download/membership",
  GET_JOINED_CLUBS: BASE_URL + "/club/getJoinedClubs",
};

export const eventEndPoints: { [key: string]: string } = {
  GET_CLUB_LIST: BASE_URL + "/event/getClubList",
  CREATE_EVENT_API: BASE_URL + "/event/createEvent",
  GET_ALL_EVENTS_API: BASE_URL + "/event/getAllEvents",
  GET_EVENT_BY_ID_API: BASE_URL + "/event",
  TICKET_PAYMENT_API: BASE_URL + "/event/create-order",
  PAYMENT_VERIFY_API: BASE_URL + "/event/verify-payment",
  FREE_EVENT_API: BASE_URL + "/event/joinFreeEvent",
  GET_MY_ENROLLED_EVENT_API: BASE_URL + "/event/getUsersEnrollEvents",
  GET_MY_HOSTED_EVENT_API: BASE_URL + "/event/getMyHostedEvents",
  GET_MY_HOSTED_EVENT_DETAILS_API: BASE_URL + "/event/getMyHostedEvent",
  EDIT_EVENT: BASE_URL + "/event/updateEvent",
  DELETE_EVENT_API: BASE_URL + "/event/deleteEvent",
};

export const adminEndPoints: { [key: string]: string } = {
  GET_ALL_EVENTS: BASE_URL + "/admin/getAllEvents",
  GET_ALL_USERS: BASE_URL + "/admin/getAllUsers",
  GET_EVENT_DETAILS_FOR_ADMIN: BASE_URL + "/admin/getEventDetailsForAdmin",
  GET_CLUB_FULL_DETAILS: BASE_URL + "/admin/getClubDetails",
  REMOVE_CLUB_MEMBER: BASE_URL + "/admin/removeClubMember",
  DELETE_CLUB_API: BASE_URL + "/admin/deleteClub",
};

export const postEndPoints: { [key: string]: string } = {
  CREATE_POST_API: BASE_URL + "/posts/createPost",
  FETCH_POSTS_API: BASE_URL + "/posts/getPosts",
  FETCH_MYPOSTS_API: BASE_URL + "/posts/getMyPosts",
  FETCH_COMMENTS_API: BASE_URL + "/posts/getComments",
  POST_COMMENT_API: BASE_URL + "/posts/createComment",
};
