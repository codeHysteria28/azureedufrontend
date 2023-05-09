import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
    const [auth, setAuth] = useState(false);
    const [username, setUsername] = useState("");

    const navigate = useNavigate();

    const getUser = () => {
        axios({
            method: 'post',
            url: 'http://localhost:1337/admin',
            withCredentials: true
        }).then(res => {
            if(res.data === 'not authenticated'){
                navigate("/adminLogin");
            }else {
                setUsername(res.data.username);
                setAuth(true);
            }
        });
    }

    const logout = () => {
        axios({
            method: 'post',
            url: 'http://localhost:1337/logout',
            withCredentials: true
        }).then(res => {
            if(res.data === 'logged out'){
                setAuth(false);
                navigate("/adminLogin");
            }
        });
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
        {auth 
            ? 
            <div>
                <h1>Admin - {username}</h1>
                <button onClick={logout}>Logout</button>
            </div>
            : ""
        }
        </>
    );
};

export default Admin;