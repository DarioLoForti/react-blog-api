
import axios from 'axios';
import { useEffect, useState } from 'react';
import Posts from './components/Posts';
import Form from './components/Form';
const apiUrl = import.meta.env.VITE_BASE_API_URL;

export default function() {

    const [showCreateForm, setShowCreateForm] = useState(false);

    ;
    const [posts, setPosts] = useState(null);

    const fetchPosts = async () => {
        setPosts(null);
        const url = `${apiUrl}/posts`;
        const { data: {posts} } = await axios.get(url);
        setPosts(posts)
    }


    const [categories, setCategories] = useState([]);
    const fetchCategories = async () => {
        const url = `${apiUrl}/categories`;
        const { data: array } = await axios.get(url);
        setCategories(array);
        console.log(array);
    }

    const [tags, setTags] = useState([]);
    const fetchTags = async () => {
        const url = `${apiUrl}/tags`;
        const { data: array } = await axios.get(url);
        setTags(array);
        console.log(array);
    }

    useEffect(() => {
        fetchPosts();
        fetchCategories();
        fetchTags();
    }, []);

    return (
        <>
        <div style={{padding: '1rem'}}>
            <button onClick={() => setShowCreateForm(curr => !curr)}>{showCreateForm ? 'Annulla' : 'Crea Post'}</button>
        </div>
        {showCreateForm && 
            <Form
            tags={tags}
            categories={categories}
            onCreate={() =>{
                setShowCreateForm(false);
                 fetchPosts()}}
            />
        }
            <Posts 
            posts={posts} 
            />
        </>
    )
}