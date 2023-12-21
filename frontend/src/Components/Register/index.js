import {Component} from 'react'

import './index.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
class Home extends Component{

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

        

        const url = 'backendproject-production-980f.up.railway.app/register'

        const data = {
            username,password
        }

        const response = await axios.post(url,(data))
        const result = await response

        console.log(result)
        
        // this.setState({
        //     message:result.data
        // })
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
            <Link className ='nav-link' to='/login'>Login Page</Link>
        </form>
    }
}

export default Home