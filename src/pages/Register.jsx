import React, {useState, useNavigate} from 'react';
import {Card, CardContent, Typography, TextField, Button} from "@mui/material";


const Register = () => {
  const [user, setUser] = useState({name: "", email: "", password: ""})
  const navigator = useNavigate()

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({...user, [name]: value})
  }

  const handleSubmit = async () => {
    console.log(user);
    const res = await fetch("http://localhost:3000/api/user/register", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    const data = await res.json()
    if(res.ok){
      navigator("/login")
    }else{
      console.log(data)
    }
  }

  return (
    <Card sx={{p:3, py:5, maxWidth: "550px", margin: "50px auto", display: "flex", flexDirection: 'column', gap: 5, borderRadius: "15px"}} elevation={10}>
      <CardContent sx={{m:0}}>
        <Typography gutterBottom variant="h4" component="div" sx={{m:0, textAlign: "center"}}>
          Register Here!
        </Typography>
        <TextField id="outlined-basic" label="Name" variant="outlined" type={"text"} OnChange={handleChange} value={user.name} /> 
        <TextField id="outlined-basic" label="Email" variant="outlined" type={"email"} OnChange={handleChange} value={user.email} /> 
        <TextField id="outlined-basic" label="Password" variant="outlined" type={"password"} OnChange={handleChange} value={user.password}/>
        <Button variant='contained' onClick={handleSubmit}>Register</Button>
      </CardContent>
    </Card>
  )
}

export default Register