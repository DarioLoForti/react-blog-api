
export default function({image, title, content, tags, published}){

    return (
        <div className={`cards ${published ? 'published' : ''}`}>
            <div className="card">
                <img src={image} alt="Post" />
                <h3>{title}</h3>
                <p className={`${!content ? 'italic' : ''}`}>
                    {content || "Content not found."}
                </p>
                {tags.length > 0 ? 
                    <div className="tags">
                        <strong>Tags:</strong>
                        <ul>
                            {tags.map((tag, index) => (
                                <li key={`tag${index}`}>{tag}</li>
                            ))}
                        </ul>
                    </div>
                :
                    <strong>Tags not found</strong>
                }
               
            </div>
        </div>
    )
}