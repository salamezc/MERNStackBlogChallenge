import React, {useState} from 'react';
import { Card, CardContent, Typography, TextField, SpeedDialIcon, SpeedDial } from "@mui/material";

const CreatePost = () => {
    const [blog, setBlog] = useState({ title: "", content: "", image: ""})

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setBlog({ ...blog, [name]: value })
    }

    const handleSubmit = async () => {
        console.log(blog);
        const res = await fetch ("http://localhost:3000/api/blog/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token")
            },
            body: JSON.stringify(blog)
        })
        const data = await res.json()
        if(res.ok){
            console.log(data);
            alert("Blog Created")
            setBlog({title: "", content: "", image: ""})
        }else{
            console.log(data);
        }
    }
    return (
        <Card sx={{ p: 4, py: 5, maxWidth: "670px", margin: "50px auto", display: "flex", flexDirection: 'column', gap: 5, borderRadius: "15px" }} elevation={10}>
            <CardContent sx={{ m: 0 }}>
                <Typography gutterBottom variant="h4" component="div" sx={{ m: 0 }}>
                    Write Blog!
                </Typography>
                <TextField id="outlined-basic" label="Title" variant="outlined" name='Title' onChange={handleChange} value={blog.title} />
                <TextField id="outlined-basic" label="Image" variant="outlined" name='Image' onChange={handleChange} value={blog.image} />
                <TextField id="outlined-basic" label="Content" variant="outlined" name='Content' rows={7} onChange={handleChange} value={blog.content} multiline />
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    icon={<SpeedDialIcon />}
                    onClick={handleSubmit}
                />
            </CardContent>
        </Card>
    )
}

export default CreatePost