import React from "react";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import Home from "./core/Home"
import Singup from "./user/Signup"
import Signin from "./user/Signin";
import MyPosts from "./user/MyPosts"
import CreatePost from "./user/CreatePost"
import UpdatePost from "./user/UpdatePost"
import PrivateRoute from "../src/auth/helper/PrivateRoutes"





const Routes=()=>{

    return(
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={Singup} />
            <Route path="/signin" exact component={Signin} />
            <PrivateRoute path="/myposts" exact component={MyPosts} />
            <PrivateRoute path="/createpost" exact component={CreatePost} />
            <PrivateRoute path="/updatepost/:postId" exact component={UpdatePost} />



        </Switch>
        </BrowserRouter>




    )


}

export default Routes;