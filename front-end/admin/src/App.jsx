import {  createContext, useState} from 'react'
import UserManagement from './components/Main/User';
import Layouts from './layouts/Layouts';


export const DashBoardLayout = createContext();

function App() {
  const [type, setType] = useState("user")
  return (
    <DashBoardLayout.Provider value={{type}}>
      <Layouts />
    </DashBoardLayout.Provider>
  )
}

export default App
