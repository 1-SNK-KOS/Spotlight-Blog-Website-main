import { useSelector, useDispatch } from "react-redux";
import { PostCard, Container } from "../components";
// import appwriteService from "../appwrite/conf";
import { useEffect, useState } from "react";
import { userPosts } from "../store/postSlice";
import appwriteService from "../appwrite/config";
import { Query } from "appwrite";

function UserPost() {
    const userStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    // const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    // const posts = useSelector(state => state.post.userPostData);
     
    // console.log(userData);

    // useEffect(()=>{
    //     posts =  useSelector(state => state.post.userPostData);
     
    // },[userData,userStatus])

    useEffect(() => {
        // console.log("USEEFFECT :: HOME PAGE");
        if (userStatus) {
            appwriteService
                .getAllPost([Query.equal("user_Id", [String(userData.userData.$id)])])
                .then((post) => dispatch(setPosts(post.documents)));
        }
    }, [userData, userStatus]);

    // const posts = useSelector(state => state.post.userPostData)
    // console.log("user post :: post :: ", posts);
    return (
        <div className="w-full  py-8">
            <div>
                <h1 className=" text-[2rem] md:text-[2.5rem] text-center font-semibold">
                    Your Posts
                </h1>
            </div>
            <Container>
                {posts.length > 0 ? (
                    <div className="flex flex-wrap flex-row">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-3 w-full md:w-1/2 lg:w-1/3 ">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">Nothing to Show</div>
                )}
            </Container>
        </div>
    );
}

export default UserPost;
