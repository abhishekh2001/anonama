import { useEffect, useState } from 'react'
import { IPost, getAllPosts } from '../../utils/posts'
import { Link } from 'react-router-dom'

const HomePage = () => {
    const [posts, setPosts] = useState<IPost[]>([])
    useEffect(() => {
        getAllPosts().then((doc) => setPosts(doc as IPost[]))
    }, [])

    return (
        <div>
            {posts.map((post) => {
                return (
                    <Link key={post._id} to={`/view/${post._id}`}>
                        {post._id}
                    </Link>
                )
            })}
        </div>
    )
}

export default HomePage
