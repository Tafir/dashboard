import React, { useEffect, useState } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';

import { columns } from './posts-table.columns';
import { PostDetailsResponse } from '../../models/PostDetailsResponse';

export const PostsTable = () => {
    var emptyArray: PostDetailsResponse[] = [];
    const [posts, setPosts] = useState(emptyArray);

    const getPosts = async () => {
        try {
            const res = await fetch("http://localhost:8080/posts", {
              headers: {  token: localStorage.token }
            });
      
            const parseRes = await res.json();
            console.log(parseRes);

            setPosts(parseRes.data.posts);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(()=> {
        getPosts();
    }, [])

    return (
        <div>
            <BootstrapTable
                keyField='id'
                data={posts}
                columns={columns}

            />
        </div>
    )
}