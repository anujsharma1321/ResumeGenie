//import { useState } from 'react'
import { AuthProvider} from './Authenticate/AuthContext';
import './App.css'
import Home from './pages/Home';

function App() {
 // const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <AuthProvider>
        <div className="relative min-h-screen">
  <div className="absolute inset-0 -z-10 bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
  <Home />
</div>
        </AuthProvider>
        </div>
    </>
  )
}

export default App
