import React, {useState} from 'react';
import axios from 'axios';
import { PiHandsClappingDuotone } from "react-icons/pi";
import Toast from 'react-bootstrap/Toast';
import '../styles/news.css';

const LikeDislike = (props) => {
    const [like, setLike] = useState(0);

    const likeDislike = () => {
        if(props.isLoggedIn) {
            setLike(like + 1);
        }else {
            
        }
    }

    return (
        <div className="like-dislike mt-2 mb-2">
            <PiHandsClappingDuotone size={20} className="like-icon" onClick={() => likeDislike()}/> <small className="like-counter">{like}</small>
        </div>
    );
}

export default LikeDislike;
