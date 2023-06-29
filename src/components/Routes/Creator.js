import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Creator = () => {
    const [auth, setAuth] = useState(false);
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const getUser = () => {
        axios({
            method: 'post',
            url: 'http://localhost:80/usercreator',
            withCredentials: true
        }).then(res => {
            if(res.data === 'not authenticated'){
                navigate("/signin");
            }else {
                setEmail(res.data.email);
                setAuth(true);
            }
        });
    }

    const logout = () => {
        axios({
            method: 'post',
            url: 'http://localhost:80/logout',
            withCredentials: true
        }).then(res => {
            if(res.data === 'logged out'){
                setAuth(false);
                navigate("/signin");
            }
        });
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            {auth ?
                <>
                    <h1>Creator {email}</h1>
                </>
                : ""
            }
        </div>
    )
}

export default Creator;