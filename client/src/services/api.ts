const BASE_URL = "http://localhost:3000/api/v1";

export const authEndPoints: { [key: string]: string } = {
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
};

export const clubEndPoints: { [key: string]: string } = {
  CREATE_CLUB_API: BASE_URL + "/club/createClub",
  GET_CLUB_BY_ID_API: BASE_URL + "/club",
  GET_ALL_CLUBS_API: BASE_URL + "/club/getAllClubs",
};
