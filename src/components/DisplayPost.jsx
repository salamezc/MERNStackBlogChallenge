import { Box } from "@mui/material";
import React, {useState, useEffect} from 'react';
import PostCard from './PostCard';

const DisplayPost = () => {
    const [posts, setPosts] = useState([])

    useEffect(()=> {
        const fetchData = async() => {
            const res =await fetch("http://localhost:3000/api/blog/", {
                method: "GET",
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            const data = await res.json()
            if(res.ok){
                setPosts(data)
            }else{
                console.log(data)
            }
        }
        fetchData()
    }, [posts])


// const DisplayPost = () => {
//     const post = [{
//         id: 1,
//         title: "this is tile 1",
//         content: "this is content 1",
//         image: "https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/images/09q4/300860/2012-lexus-lfa-review-car-and-driver-photo-302743-s-original.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*",
//         user: "sal",
//         timestamp: "2 days ago"
//     },
//     {   
//         id: 2,
//         title: "this is tile 2",
//         content: "this is content 2",
//         image: "https://www.topgear.com/sites/default/files/2022/08/DSC07904.jpg",
//         user: "sal",
//         timestamp: "1 days ago"
//     }

// ]

  return (
    <Box sx={{maxWidth: "600px", display: "flex", flexDirection: "column", margin: "auto", gap: 3, py:4}}>
        {posts && posts.map(post=>(
            <PostCard post={post} key={post._id}/>
        ))}
    </Box>
  )
}

export default DisplayPost