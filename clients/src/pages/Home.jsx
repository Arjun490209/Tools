import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Home = () => {
 const navigate= useNavigate()
 
  return (
    <div className='w-full md:w-9/12 mx-auto pt-15'>
      <Navbar />
        <div onClick={()=>navigate('/gradient-generator')}>GradientGenerator</div>
        <div onClick={()=>navigate('/avatar-generator')}>GradientGenerator</div>
    </div>
  )
}

export default Home