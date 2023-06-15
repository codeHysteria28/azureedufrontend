import React, {useEffect, useState} from 'react'
import { Table } from 'react-bootstrap';
import axios from "axios";
import moment from 'moment';
import { BsPencil, BsTrash3 } from "react-icons/bs";
import { FcCheckmark, FcCancel } from "react-icons/fc";

import '../styles/admin.css';

const AdministerArticlesTable = () => {
    const [news, setNews] = useState([]);

    const getNews = () => {
        axios({
            method: 'get',
            url: 'http://localhost:80/getNewsAdmin',
            withCredentials: true
        }).then(res => {
            setNews(res.data);
        });
    }

    const editArticle = articleTitle => {
        console.log(`Editing ${articleTitle}`);
    }

    const deleteArticle = articleTitle => {
        console.log(`Deleting ${articleTitle}`);
    }

    const approveArticle = articleTitle => {
        axios({
            method: 'post',
            url: 'http://localhost:80/approveArticle',
            data: {articleTitle},
            withCredentials: true
        }).then(res => {
            if(res.data){
                getNews();
            }
        });
    }

    useEffect(() => {
        getNews();
    }, []);

    return (
        // create a table with all the articles
        <div>
            <Table striped bordered hover className='text-center'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Created At</th>
                        <th>Approved</th>
                        <th>Manage</th>
                        <th>Approve</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        news.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td>{moment(item.createdAt).format('MMM Do YY')}</td>
                                    <td>{ item.approved === true ? <FcCheckmark/> : <FcCancel/>}</td>
                                    <td><BsPencil className='edit-article' onClick={() => editArticle(item.title)}/> | <BsTrash3 className='delete-article' onClick={() => deleteArticle(item.title)}/></td>
                                    <td><FcCheckmark className='approve-article' onClick={() => approveArticle(item.title)}/></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default AdministerArticlesTable;
