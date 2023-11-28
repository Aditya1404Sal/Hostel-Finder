import {BrowserRouter,Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Spinner from './components/spinner';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Landing from './pages/Landing';
import HostelRegistrationPage from './pages/HostelRegistrationPage';
import HostelInfoPage from './pages/HostelInfoPage';
import ChattingPage from './pages/ChattingPage';




function App() {
  const {loading} = useSelector(state => state.alerts)
  return (
    <>
    <BrowserRouter>
    {loading ? (<Spinner />) : (
    <Routes>

      <Route path='/' 
      element={

        <PublicRoute>
        <Landing/>
        </PublicRoute>
      } />

      <Route path='/Details/:hostel_id' 
      element={
        <PublicRoute>
        <HostelInfoPage/>
        </PublicRoute>
      } />

      <Route path='/Details/ws/:hostel_id' 
      element={
        <PublicRoute>
        <ChattingPage/>
        </PublicRoute>
      } />

    <Route path='/Hostels/:pin_id' 
      element={
        <PublicRoute>
        <Landing/>
        </PublicRoute>
      } />

      <Route path='/hostelRegistration/:user_id' 
      element={

      <PublicRoute>
        <HostelRegistrationPage/>
      </PublicRoute>
      } />

      <Route path='/Login' 
      element={

      <PublicRoute>
        <Login/>
      </PublicRoute>

      } />

      <Route path='/Register' 
      element={
      <PublicRoute>
        <Register/>
      </PublicRoute>

      } />
      
      <Route path='/Landing/:user_id'
      element={
        <ProtectedRoute>
        <HomePage/>
       </ProtectedRoute>
      }/>
    </Routes>
    )}
    </BrowserRouter>
    </>
  );
}

export default App;
