
import './App.css';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import AddBook from './components/AddBook/AddBook';
import BookList from './components/Booklist/BookList';
import ContextProvider from './components/context/context';
import EditBook from './components/EditBook/EditBook';
import SignUp from './components/signUp/signup';
import ViewBook from './components/ViewBook/viewBook';
import SignIn from './components/signIn/signIn';

function App() {
  const token=localStorage.getItem("token");
  return (
    <>
    <ContextProvider>
  {/* <AddBook/> */}
  {/* <ViewBook/> */}
  {/* <EditBook/> */}
  {/* <BookList/> */}
  {/* <SignUp/> */}
  {/* <SignIn/> */}
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<SignIn/>}/>
    <Route path='/register' element={<SignUp/>}/>
    <Route path='/booklist'  element={
      (token)? <BookList/> : <Navigate replace to="/"/>
    }/>
    <Route path='/addbook' element={<AddBook/>}/>
    <Route path='/viewbook' element={<ViewBook/>}/>
    <Route path='/editbook' element={<EditBook/>}/>

  </Routes>
  </BrowserRouter>
    </ContextProvider>
  
    </>
  );
}

export default App;
