import { Component } from "react";
import axios from 'axios'
import './index.css'
import { Link } from "react-router-dom";


class Login extends Component{

    state = {
        username:'',
        password:'',
        message:''
       
    }

    onClickBtn = (event) =>{
        event.preventDefault()
        this.toGetData()
    }



    toGetData = async () => {

        const {username,password} = this.state

        

        const data = {
            username,password
        }
       

        const response = await axios.post('backendproject-production-980f.up.railway.app/login',(data))
        const result = await response
        
        this.setState({
            message:result.data
        })

        console.log(result)
    }

    onChangeUsername = (event) =>{
        this.setState({
            username:event.target.value
        })
    }

    onChangePassword = (event) =>{
            this.setState({
                password:event.target.value
            })
    }

   

    render(){
       
            
        const {username,password,message} = this.state
        console.log(username,password)
        return <form>

            <input onChange={this.onChangeUsername} placeholder='Username' type='text'/> <br/>
            <input onChange={this.onChangePassword} placeholder='Password' type='password'/> <br/>
            <button onClick={this.onClickBtn}>Submit</button>  
            <p>{message}</p>
            <Link className ='nav-link' to='/'>Register Page</Link>
            
        </form>
        
    }
}

export default Login