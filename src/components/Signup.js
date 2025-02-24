import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';

const Signup = () => {
    const host = 'https://mynotebook-im9n.onrender.com';

    let navigate = useNavigate();
    const context = useContext(noteContext);
    const {setAlert} = context;
    const [credentials, setCredentials] = useState({name: '', email: '', password: ''})

    const signUp = async (e) => {
        e.preventDefault();
        const data = await fetch(`${host}/api/auth/createuser`,{
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
        },
        );
        const res = await data.json();
        if(res.success){
            localStorage.setItem('token', res.authToken);
            navigate("/");
            setAlert({show: true, message: 'Account Created Successfully!', type:'success'})
            setTimeout(() => {
                setAlert({show:false, message:'',type:''});
            }, 1500);
        }
        else if(res.error === "email already exists"){
            setAlert({show:true, message: "email already exists", type: 'danger'});
            setTimeout(() => {
                setAlert({show:false, message:'', type:''})
            }, 1500);
        }
        else{
            // alert("Something went wrong, Please Try Again later!");
            setAlert({show:true, message: 'Something went wrong, please try again in some time', type: 'danger'})
            setTimeout(() => {
                setAlert({show:false, message:"",type:''})
            }, 1500);
        }
        // console.log(res);
        // console.log('signing you up')
    }
    
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
        // console.log(e.taraget.name);
        console.log("hello")
        console.log(credentials.name.length);
        console.log(credentials.email.length)
        console.log(credentials.password.length)

    }

    return (
        <div className='container mt-4'>
            <form onSubmit={signUp}>
                <h2><strong>Signup to get started</strong></h2>
                <div className="mb-3 mt-3">
                    <label htmlFor="exampleInputName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" minLength={3} onChange={onChange} name='name'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} name='email'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={onChange} minLength = {5} name='password'/>
                </div>
                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div> */}
                <button type="submit" className="btn btn-primary" disabled={!(credentials.name.length>3 && credentials.email.length!==0 && credentials.password.length>5)}>Submit</button>
            </form>
        </div>
    )
}

export default Signup
