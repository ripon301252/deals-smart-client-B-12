import axios from "axios";
import useAuth from "./UseAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const axiosInstanceSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate()  

  useEffect(() => {
    // set token in the header for all the api call using axiosSecure hook (request interceptors)
    const requestInstance = axiosInstanceSecure.interceptors.request.use(
      (config) => {
        // console.log(config);
        config.headers.authorization = `Bearer ${user.accessToken}`;
        return config;
      }
    );

    const responseInstance = axiosInstanceSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        console.log("err interceptor", err);
        const status = err.status;
        if (status === 401 || status === 403) {
          console.log("log out the user for bad request");
          logOut().then(() => {
            // navigate user to the login page
            navigate('/signin')
          });
        }
      }
    );

    return () => {
      axiosInstanceSecure.interceptors.request.eject(requestInstance);
      axiosInstanceSecure.interceptors.response.eject(responseInstance);

    };
  }, [user, logOut, navigate]);

  return axiosInstanceSecure;
};

export default useAxiosSecure;
