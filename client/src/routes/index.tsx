import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import PostAMA from '../pages/PostAMA/PostAMA'
import ViewPost from '../pages/ViewPosts/ViewPost'
import MakePost from '../pages/MakePost/MakePost'
import Post from '../pages/post/Post'
import HomePage from '../pages/Homepage/Homepage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/app',
        element: <App />,
    },
    {
        path: '/post',
        element: <PostAMA />,
    },
    {
        path: '/viewPost',
        element: <ViewPost />,
    },
    {
        path: '/makePost',
        element: <MakePost />,
    },
    {
        path: '/view/:id',
        element: <Post />,
    },
])

export default router
