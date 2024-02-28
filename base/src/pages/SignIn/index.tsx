import './styles.css'
import Logo from '../../assets/logo.svg'
import {Link, useNavigate} from 'react-router-dom'
import api from '../../services/api'
import { FormEvent, useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'


function SignIn() {
  const navigate = useNavigate()
  const {handleAddToken, handleGetToken} = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


async function handleSubmit(event:FormEvent){
event.preventDefault()

try {

  if (!email || !password) {
    throw new Error ("Email e senha são obrigatórios!")
  }
  const response = await api.post('/login', {
    email,
    password 
  })

  const {accessToken} = response.data
  handleAddToken(accessToken)
  navigate('/main')

  console.log(response)

} catch (error) {
  console.log(error)
}
}

useEffect(()=> {
const token = handleGetToken()

if (token) {
  navigate('/main')
  return
}
// eslint-disable-next-line 
},[])

  return (
    <div className='container container-sign-in'>

    <div className='sign-in'>
<img src={Logo} alt='logo'/>

    <form onSubmit={handleSubmit}>

      <input
      type='text' 
      placeholder='E-mail' 
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      />
       
      <input 
      type='password' 
      placeholder='Password' 
      value={password}
      onChange={(e)=> setPassword(e.target.value)}
      required
      />

  <span>
    Não tem cadastro?
     <Link to='/sign-up'> Clique aqui! </Link>
   </span>
   <button className="btn-pink">Login</button>
    </form>
    </div>


    
    </div>
  )
}

export default SignIn