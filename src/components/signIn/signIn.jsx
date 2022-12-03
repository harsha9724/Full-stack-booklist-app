import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const SignIn=()=>{
    const navigate=useNavigate();
    
    
const [details,setDetails]=useState({
    email:"",
    password:"",
});
const [isSubmit,setIsSubmit]=useState(false);
const [formError,setFormError]=useState({});
const handleChange=(e)=>{
    const {name,value}=e.target;
    setDetails({...details,[name]:value})
}
const handleSubmit=(e)=>{
    e.preventDefault();
    setFormError(validate(details));
    setIsSubmit(true);

};
useEffect( ()=>{
    if(Object.keys(formError).length==0 && isSubmit){
        // console.log(details);
        axios.post("https://booklist-server-10x-test.onrender.com/api/user/login",details).then((res)=>{
            // console.log(res);
              const myToken = res.data.token;
            localStorage.setItem("token", myToken);
            window.alert(res.data.status);
            navigate("/booklist")
        }).catch((err)=>{
            console.log(err);
            window.alert(err.response.data.message)
        })
    }
},[formError])
function validate(data){
    let error={};
    if(data.email==""){
        error.email="email is required"
    }
    if(!data.password){
        error.password="enter password"
    }
   
    return error;
}
    return(
        <>
        <div className="signup-form-container">
           <h1>SignUp</h1>
           <form method="post" onSubmit={handleSubmit}>
            <div className="signup-input-controll">
                <div>email</div>
                <input type="email" name="email" value={details.email} onChange={handleChange} />
                <p>{formError.email}</p>
            </div>
            <div className="signup-input-controll">
                <div>Password</div>
                <input type="password" name="password" value={details.password} onChange={handleChange}  />
                <p>{formError.password}</p>
            </div>
            <div>
                <button>login</button>
            </div>
           </form>
           <div>
            <button onClick={()=>{
                navigate("/register")
            }}>Register</button>
           </div>
        </div>
        </>
    )
};

export default SignIn