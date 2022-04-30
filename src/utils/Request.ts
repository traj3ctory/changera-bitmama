/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "../plugins/Axios";
import { AxiosResponse } from "axios";

const baseURL = process.env.VUE_APP_API_BASE_URL;

/**
 * AXIOS FUNCTION
 * @param {*} method i.e post, get, patch, delete
 * @param {*} url i.e BaseURL + Api-url
 * @param {*} body: formData-Object
 * @returns response only if status is 'OK'
 */
type MethodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const Request = (
  method: MethodType,
  url: string,
  data?: any
): Promise<AxiosResponse> =>
  new Promise((resolve, reject) => {
    axios({
      method,
      url: `${baseURL}${url}`,
      data,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      },
    })
      .then(
        (response: AxiosResponse<any> | PromiseLike<AxiosResponse<any>>) => {
          resolve(response);
        }
      )
      .catch((err: any) => {
        reject(err);
        throw err;
      });
  });

export default Request;
