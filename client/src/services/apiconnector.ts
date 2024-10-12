import axios from "axios";

const axiosInstance = axios.create({});

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export const apiConnector = (
  method: HttpMethod,
  url: string,
  bodyData?: any,
  params?: any,
  headers?: any
): any => {
  return axiosInstance({
    method: method,
    url: url,
    data: bodyData || null,
    params: params || null,
    headers: headers || null,
    withCredentials: true,
  });
};
