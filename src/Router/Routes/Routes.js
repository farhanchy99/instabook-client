import Main from "../../Layout/Main";
import About from "../../Pages/Mains/About/About";
import Home from "../../Pages/Mains/Home/Home";
import Login from "../../Pages/Mains/Login/Login";
import Media from "../../Pages/Mains/Media/Media";
import Message from "../../Pages/Mains/Message/Message";
import PostDetails from "../../Pages/Mains/PostDetails/PostDetails";
import Register from "../../Pages/Mains/Register/Register";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
    {
        path:'/',
        element: <Main></Main>,
        children:[
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/media',
                element: <Media></Media>
            },
            {
                path: '/posts/:id',
                element: <PostDetails></PostDetails>,
                loader: ({params}) => fetch(`https://instabook-server.vercel.app/posts/${params.id}`)
            },
            {
                path: '/message',
                element: <Message></Message>
            },
            {
                path: '/about',
                element: <PrivateRoutes><About></About></PrivateRoutes>,
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: "*",
                element: (
                  <div className="pt-16 block m-auto text-center">
                    <h1 className='text-6xl text-amber-400 font-bold'>404</h1>
                    <h1 className="text-5xl">Sorry Page not Found</h1>
                    <button className="btn btn-square loading mt-5 bg-amber-400"></button>
                  </div>
                ),
            }
        ]
    }
])

export default router;