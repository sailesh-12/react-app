import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';
import useWindowSize from '../hooks/useWindowSize'; // Fixed import path
import api from '../Posts'; // Fixed import path
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom'; // Removed useHistory

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const { width } = useWindowSize();
    const navigate = useNavigate(); // Correctly calling useNavigate
    const title = "React Js";;

    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

    useEffect(() => {
        setPosts(data);
    }, [data]);

    useEffect(() => {
        const filteredResults = posts.filter((post) =>
            post.body.toLowerCase().includes(search.toLowerCase()) ||
            post.title.toLowerCase().includes(search.toLowerCase())
        );

        setSearchResults(filteredResults.reverse());
    }, [posts, search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = { id, title: postTitle, datetime, body: postBody };
        try {
            const response = await api.post('/posts', newPost);
            const allPosts = [response.data, ...posts]; // Add the new post at the beginning
            setPosts(allPosts); // Update the posts state
            setPostTitle('');
            setPostBody('');
            navigate('/'); // Navigate back to home
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    };
    

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        try {
            const response = await api.put(`/posts/${id}`, updatedPost);
            setPosts(posts.map(post => (post.id === id ? { ...response.data } : post)));
            setEditTitle('');
            setEditBody('');
            navigate('/'); // Navigate back to home
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/${id}`);
            const postsList = posts.filter(post => post.id !== id);
            setPosts(postsList);
            navigate('/'); // Navigate back to home
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    };

    return (
        <DataContext.Provider value={{
            title,
            search, setSearch,
            searchResults, fetchError, isLoading,
            posts, setPosts,
            postTitle, setPostTitle,
            postBody, setPostBody,
            editTitle, setEditTitle,
            editBody, setEditBody,
            handleSubmit,
            handleEdit,
            handleDelete,
            width
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
