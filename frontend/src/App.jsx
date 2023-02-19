import './App.css';
import { Route,Routes,BrowserRouter, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import Register from "./components/auth/register"
import Home from "./components/auth/home"
import Login from './components/auth/login';
import Verify from './components/auth/verify';

import Main from './components/main/main';
import MyAccount from './components/main/myaccount/myaccount';
import WikiList from './components/main/wikis/WikiList/WikiList';
import Wikis from './components/main/wikis/wiki';
import WikiPage from './components/main/wikis/WikiPage';
import VerifyError from './components/main/misc/verifyerror';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/register" element={ <Register/> } />
      <Route path="/login" element={ <Login/> } />
      <Route path="/" element={ <Home/> } />
      <Route path='/auth/verify' element={<Verify/>} />
      <Route path="/app" element={ <Protected children={<Main />} /> }>
        <Route path='wikis' element={ <Wikis /> } >
          <Route path='list' element={ <WikiList /> } />
          <Route path=':userID' element={ <WikiPage /> } />
        </Route>
        <Route path='me' element={ <MyAccount/> } />
      </Route>
      <Route path='/error/verify' element={<VerifyError/>} />
      </Routes>
    </BrowserRouter>
  );
}

const Protected = ({ children }) => {
  if (!localStorage.getItem("token")) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

export default App;
