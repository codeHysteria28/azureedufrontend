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
            url: 'https://azureedube1.azurewebsites.net/getNewsAdminAll', 
            withCredentials: true
        }).then(res => {
            setNews(res.data);
        });
    }

    const editArticle = articleID => {
        console.log(`Editing ${articleID}`);
    }

    const deleteArticle = articleID => {
        axios({
            method: 'post',
            url: 'https://azureedube1.azurewebsites.net/deleteArticle',
            data: {articleID},
            withCredentials: true
        }).then(res => {
            if(res.data === "article deleted"){
                getNews();
            }
        });
    }

    const approveArticle = articleTitle => {
        axios({
            method: 'post',
            url: 'https://azureedube1.azurewebsites.net/approveArticle',
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
                        <th>ID</th>
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
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td>{moment(item.createdAt).format('MMM Do YY')}</td>
                                    <td>{ item.approved === true ? <FcCheckmark/> : <FcCancel/>}</td>
                                    <td><BsPencil className='edit-article' onClick={() => editArticle(item.id)}/> | <BsTrash3 className='delete-article' onClick={() => deleteArticle(item.id)}/></td>
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
