import { useEffect } from "react";
import { useState } from "react";
import "./signup.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";
const SignUp=()=>{
    const navigate=useNavigate();
const [details,setDetails]=useState({
    email:"",
    password:"",
    confirmPassword:""
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
useEffect(()=>{
    if(Object.keys(formError).length==0 && isSubmit){
        // console.log(details);
        axios.post("https://booklist-server-10x-test.onrender.com/api/user/register",details).then((res)=>{
            // console.log(res);
            window.alert(res.data.message);
            navigate("/")
        }).catch((err)=>{
            // console.log(err);
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
    if(!data.confirmPassword){
        error.confirmPassword="enter confirm password"
    }
    else if(data.password  !== data.confirmPassword){
        error.confirmPassword="password does not match"
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
            <div className="signup-input-controll">
                <div>Confirm Password</div>
               <input type="password" name="confirmPassword" value={details.confirmPassword} onChange={handleChange}/>
                <p>{formError.confirmPassword}</p>
            </div>
            <div>
                <button>register</button>
            </div>
           </form>
        </div>
        </>
    )
};

export default SignUp