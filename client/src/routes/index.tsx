import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import PostAMA from '../pages/PostAMA/PostAMA'
import ViewPost from '../pages/ViewPosts/ViewPost'
import MakePost from '../pages/MakePost/MakePost'

const router = createBrowserRouter([
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
])

export default router
