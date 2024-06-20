import { useState } from 'react';
import axios from "axios";
const apiUrl = import.meta.env.VITE_BASE_API_URL;



export default function ({tags, categories, onCreate}) {

    const defaultData = {
        title: '',
        content: '',
        image: '',
        categoryId: '',
        tags: [],
        published: false
    }
    const [error, setError] = useState('');
    const [data, setData] = useState(defaultData);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
            const res = await axios.post(`${apiUrl}/posts`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(res);
            if(res.status < 400){
                onCreate();
            }
    }


    const changeData = (key, newValue) => {
        setData(data => ({...data, [key]: newValue}));
    }

    console.log(data);
    return (
        <>
        <h1>My blog</h1>
            <form onSubmit={handleSubmit} id="articleForm">
                <div className='form-control'>
                    <label> Title </label>
                    <input 
                        type="text"
                        value={data.title}
                        onChange={(e) => changeData('title', e.target.value)}
                    />
                </div>
                <div className='form-text-area'>
                    <label> Content </label><br />
                    <textarea
                        value={data.content}
                        onChange={(e) => changeData('content', e.target.value)}
                    />
                </div>
                <div className='form-control'>
                    <label> Image </label>
                    <input 
                        type="file"
                        // value={data.image}
                        onChange={(e) => changeData('image', e.target.value)}
                    />
                </div>
                <div className='form-control'>
                    <label> Category </label>
                    <select
                        value={data.categoryId}
                        onChange={(e) => changeData('categoryId', e.target.value)}
                    >
                        <option value="" disabled>Seleziona categoria</option>
                        {categories.map(c => (
                            <option key={`categoryId${c.id}`} 
                            value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div className='form-control'>
                    <h3>tags:</h3>
                    <div className='tags'>
                        {tags.map(({id, name}, index) => (
                            <label key={`tag${index}`}>
                                <input
                                    type="checkbox"
                                    checked={data.tags.includes(id)}
                                    onChange={() => {
                                        const curr = data.tags;
                                        const newTags = curr.includes(id) ?
                                         curr.filter(t => t !== id) :
                                          [...curr, id];
                                        changeData('tags', newTags);
                                    }}
                                />
                                {name}
                            </label>
                        ))}
                    </div>
                </div>
                <div className='form-control'>
                    <div className='published'>
                    <label> Published </label>
                    <input
                        type="checkbox"
                        checked={data.published}
                        onChange={(e) => changeData('published', e.target.checked)}
                    />
                    </div>
                </div>
                
                    <button>Submit</button>
            </form>
            {error && <div className="error">{error}</div>}
        </>
    )


}
        