import axios from "axios";
import { context } from "../context/context";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";




const EditBook=()=>{
    const navigate=useNavigate();
    const config = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };
    const {bookdetails,setBookdetails}=useContext(context);
    const [newBookdetails,setNewBookdetails]=useState({
        title:"",
        author:"",
        isbn:"",
        description:"",
        published_date:'',
        publisher:''
    });
    const [isSubmit,setisSubmit]=useState(false);
    const [formError,setFormError]=useState({});
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setNewBookdetails({...newBookdetails,[name]:value})
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        setFormError(validate(newBookdetails));
        setisSubmit(true);
    };
    function validate(data){
let error={};
if(!data.title || !data.author || !data.isbn || !data.description || !data.published_date || !data.publisher ){
    error.details="all fileds are mandatory"
}
return error;
    }
    useEffect(()=>{
        if(Object.keys(formError).length==0 && isSubmit){
            console.log(newBookdetails);
            axios.put(`https://booklist-server-10x-test.onrender.com/api/books/${bookdetails._id}`,newBookdetails,config).then((res)=>{
                console.log(res);
                window.alert(res.data.message);
                navigate("/booklist")
            }).catch((err)=>{
                console.log(err)
            })
        }
    },[formError])
    useEffect(()=>{
        setNewBookdetails({
            title:bookdetails.title,
            author:bookdetails.author,
            isbn:bookdetails.isbn,
            description:bookdetails.description,
            published_date:bookdetails.publishedDate,
            publisher:bookdetails.publisher
        })
    },[]);
    return(
        <>
          <div className="addbook-container">
           <div>
               <button className="show-book-btn" onClick={()=>{
                navigate("/booklist")
               }}>Show Book list</button>
           </div>
           <h1>Edit Book details</h1>
           <h4 style={{color:"red"}}>{formError.details}</h4>
           <form method="post" className="form-container" onSubmit={handleSubmit}>
            <div className="input-controll">
                <div>TITLE</div>
                <input type="text" name="title" value={newBookdetails.title} onChange={handleChange}/>
            </div>
            <div className="input-controll">
            <div>ISBN</div>
                <input type="text" name="isbn" value={newBookdetails.isbn} onChange={handleChange}/>
            </div>
            <div className="input-controll">
            <div>AUTHOR</div>
                <input type="text" name="author" value={newBookdetails.author} onChange={handleChange}/>
            </div>
            <div className="input-controll">
            <div>DESCRIPTION</div>
                <input type="text" name="description" value={newBookdetails.description} onChange={handleChange}/>
            </div>
            <div className="input-controll">
            <div>Published date</div>
                <input type="text" name="published_date" value={newBookdetails.published_date} onChange={handleChange}/>
            </div>
            <div className="input-controll">
            <div>Publisher</div>
                <input type="text" name="publisher" value={newBookdetails.publisher} onChange={handleChange}/>
            </div>
            <div>
                <button className="submit-btn">UPDTAE</button>
            </div>
           </form>
        </div>
        </>
    )
};

export default EditBook;