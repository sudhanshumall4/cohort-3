import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../modules/auth/context/AuthContext";

const api = axios.create({

    baseURL: "/api",

    withCredentials: true
    // Allows cookies to be included in API requests

});

const useApi = () => {

    const { accessToken } = useAuth();

    useEffect(() => {

        const interceptor = api.interceptors.request.use(

            (config) => {

                if (accessToken) {

                    config.headers.Authorization = `Bearer ${accessToken}`;

                }

                return config;
            },

            (error) => {

                return Promise.reject(error);

            }
        );

        return () => {
            api.interceptors.request.eject(interceptor);
        };

    }, [accessToken]);

    return api;
};

export default useApi;