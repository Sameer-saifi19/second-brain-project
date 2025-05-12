import { DashBoard } from './pages/Dashboard'
import { SignIn } from './pages/Signin'
import { SignUp } from './pages/signup'

import { BrowserRouter, Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path='/signup' element={<SignUp />}/>
        <Route  path='/signin' element={<SignIn />}/>
        <Route  path='/dashboard' element={<DashBoard />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App