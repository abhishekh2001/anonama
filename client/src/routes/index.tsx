import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import PostAMA from '../pages/PostAMA/PostAMA'

const router = createBrowserRouter([
    {
        path: '/app',
        element: <App />,
    },
    {
        path: '/post',
        element: <PostAMA />,
    },
])

export default router
