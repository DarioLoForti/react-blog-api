import { useState } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";

const defaultData = {
    title: '',
    description: '',
    image: '',
    category: '',
    tags: [],
    published: false
}

const listTags = ['js', 'react', 'css', 'html', 'node', 'vue', 'laravel', 'php']

export default function () {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [data, setData] = useState(defaultData);


    const handleSubmit = (e) => {
        e.preventDefault();
        if(data.title.trim() && data.description.trim() && data.image.trim() && data.category.trim()) {
            setPosts(posts => ([...posts, data]));
            setData(defaultData);
            setError('');
        } else {
          setError('Please fill in all fields');
        }
    }

    const remuveItem = (index) => {
        setPosts(posts => posts.filter((_, i) => i !== index));
    }

    const changeData = (key, newValue) => {
        setData(data => ({...data, [key]: newValue}));
    }

    const toggleTags = (tag) => {
        setData(data => ({
        ...data, 
        tags: data.tags.includes(tag) ? 
        data.tags.filter(t => t !== tag) : 
        [...data.tags, tag]
        }));
    }

    console.log(data);
    console.log(posts);
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
                    <label> Description </label><br />
                    <textarea
                        value={data.description}
                        onChange={(e) => changeData('description', e.target.value)}
                    />
                </div>
                <div className='form-control'>
                    <label> Url Image </label>
                    <input 
                        type="text"
                        value={data.image}
                        onChange={(e) => changeData('image', e.target.value)}
                    />
                </div>
                <div className='form-control'>
                    <label> Category </label>
                    <select
                        value={data.category}
                        onChange={(e) => changeData('category', e.target.value)}
                    >
                        <option value="">Seleziona categoria</option>
                        <option value="tech">Tech</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="business">Business</option>
                    </select>
                </div>
                <div className='form-control'>
                    <h3>tags:</h3>
                    <div className='tags'>
                        {listTags.map((tag, index) => (
                            <label key={`tag${index}`}>
                                <input
                                    type="checkbox"
                                    checked={data.tags.includes(tag)}
                                    onChange={() => toggleTags(tag)}
                                />
                                {tag}
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

            {posts.length > 0 && <h2 className='list'>Posts:</h2>}

            <div className="cards">
                <div className="card">
                    {posts.map(({title, description, image, category, tags}, index) => (
                        <div key={`post${index}`} className="card-item">
                            <img src={image} alt={title} />
                            <h3>{title}</h3>
                            <p>{description}</p>
                            <p>{category}</p>
                            <div>
                                <h3>Tags:</h3>
                            <ul>
                                {tags.map((tag, index) => (
                                    <li key={`tag${index}`}>{tag}</li>
                                ))}
                            </ul>
                            </div>
                            <div className='delete'>
                            <button onClick={() => remuveItem(index)}><FaRegTrashAlt /></button>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </>
    )


}
        