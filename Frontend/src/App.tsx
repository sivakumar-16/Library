import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Viewbook from './Components/userComponents/viewBook';
import AdminDashboard from './Components/adminComponents/adminDashboard';
import AddBookForm from './Components/adminComponents/addBooks';
import BorrowBook from './Components/userComponents/borrowedBooks';
import ViewUser from './Components/adminComponents/ViewUser';



function App() {

  return (
    <>
    <div className="container">
    <BrowserRouter>
    <Routes>
      <Route path='/' element ={ <Home /> } />    
      <Route path='/login' element ={ <Login /> } />   
      <Route path='/register' element ={ <Register /> } />   
      <Route path='/viewbook' element ={ <Viewbook /> } />  
      <Route path='/admindashboard' element ={ <AdminDashboard/> } />  
      <Route path='/addbook' element ={ <AddBookForm/> } /> 
      <Route path='/borrow' element ={ <BorrowBook/> } /> 
      <Route path='/viewusers' element ={ <ViewUser/> } /> 


    </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}


export default App
