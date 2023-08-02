import { useEffect, useState } from 'react'
import { IPost, getAllPosts } from '../../utils/posts'
import { Link } from 'react-router-dom'
import Header from '../../partials/Header'

const HomePage = () => {
    const [posts, setPosts] = useState<IPost[]>([])
    useEffect(() => {
        getAllPosts().then((doc) => setPosts(doc as IPost[]))
    }, [])

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header
                    sidebarOpen={true}
                    headerTitle={'Home'}
                    setSidebarOpen={(val) => {}}
                />
                <main>
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                            {posts.map((post) => {
                                return (
                                    <div className="border border-indigo-200 bg-slate-100 hover:shadow-inner flex p-8 mb-4">
                                        <Link
                                            key={post._id}
                                            to={`/view/${post._id}`}
                                        >
                                            AMA {post._id}
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default HomePage
