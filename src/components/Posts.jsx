
import PostCard from "./PostCard";

export default function( { posts } ) {
   
    return(
        <div className="posts">
            {posts === null && <span className="loader"></span>}
            {posts?.length === 0 && 'Post not found.'}
            {posts?.length > 0 && 
                posts.map(p => (
                    <PostCard
                        key={`post${p.id}`}
                        image={p.image}
                        title={p.title}
                        content={p.content}
                        tags={p.tags.map(i => i.name)}
                        published={p.published}
                    />
                ))
            }
        </div>
    )
}

    