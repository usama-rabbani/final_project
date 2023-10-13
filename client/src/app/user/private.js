'use client'
import React, { useState, useEffect } from "react";
import { useauth } from "@/context/auth";
import axios from "axios";
import user from "./page";


const PrivateRoute = () => {
    const [ok, setOk] = useState();
    const { auth } = useauth();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/v1/auth/user', {
                    headers: {
                        'Authorization': auth?.token
                    }
                });
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.error("Error:", error);
                setOk(false);
            }
        }

        if (auth?.token) {
            authCheck();
        }
    }, [auth?.token]);

    return ok ? <user/> : null;
};

export default PrivateRoute;