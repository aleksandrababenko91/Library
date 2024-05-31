import RegisterForm from './components/RegisterForm'
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import MainPage from './components/MainPage';
import BookList from './components/BookList'
import UserLoginForm from './components/UserLoginForm';
import { useState, useEffect } from 'react'
import NavBar from './components/NavBar';
import BookService from './components/BookService';
import MyProfile from './components/MyProfile';

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [books, setBooks] = useState([])
  
  const handleLogIn = async (email, password) => {
    const response = await BookService.getUserWithEmailAndPassword(email, password);
    console.log(response);
    if (response.length === 0) {
      console.log("User not found or wrong password!");
      return; 
    }
    setCurrentUser(response[0]); 
  }
  const handleLogOut = () => {
    setCurrentUser(null);
  }
  
  useEffect(() => {
    BookService
      .getAllBooks()
       .then(initialBooks => {
        setBooks(initialBooks)
      })
  }, []);

  useEffect(() => { 
    console.log(books);
  }, [books]);

  const addBook = (id) => {
    const filteredBooksById = books.filter(book => book.id === id)      //iterate to find the boook with  current Id
    const bookCurrentId = filteredBooksById[0]
    console.log("Current books", bookCurrentId); //return object with current book
      if (bookCurrentId) {
        const availableCopies = bookCurrentId.copies.filter(copy => copy.borrower === null); //iterate for borrower === null 
        console.log("Avalaible copies:", availableCopies);  //return array of object with available copy (borrower = null)
       const borrowedDate = new Date();
       console.log(borrowedDate);
       const currentDate = new Date();
       const dueDate = new Date(borrowedDate.setDate(borrowedDate.getDate() + 25));
       console.log(dueDate);
       const updatedCopy = {...availableCopies[0], borrower: currentUser.id, borrowedDate: currentDate.toDateString(), dueDate: dueDate.toDateString()} 
        console.log(updatedCopy);  //update 1 copYYYY!!!! and add borrower
        const updatedCopies = bookCurrentId.copies.map(copy => {  //iterate and compare current book and update an array of copiESSSSS!!!
          if(copy.id === updatedCopy.id) {
            return updatedCopy
          } else {
            return copy;
          }
        })
        console.log(updatedCopies);
      const updatedBook = {...bookCurrentId, copies: updatedCopies} //update an array of Current BOOK
      console.log("Updated books:", updatedBook);
       BookService
        .update(id, updatedBook)
        .then(
          setBooks(books.map(book => {
            if(book.id === id) {
              return updatedBook
            }else {
              return book
            }
          }))
        )

      }
  }
 
  const returnBook = (id) => {
    const filteredBooksById = books.filter(book => book.id === id)      //iterate to find the boook with  current Id
    const bookCurrentId = filteredBooksById[0]
    //console.log(bookCurrentId); //return object with current book
      if (bookCurrentId) {
        const borrowedCopies = bookCurrentId.copies.filter(copy => copy.borrower === currentUser.id); //iterate for borrower === null 
       // console.log(borrowedCopies);  //return array of object with available copy (borrower = null)
        const updatedReturnCopy = {...borrowedCopies[0], borrower: null} 
        //console.log(updatedReturnCopy);  //update 1 copYYYY!!!! and add borrower
        const updatedReturnCopies = bookCurrentId.copies.map(copy => {  //iterate and compare current book and update an array of copiESSSSS!!!
          if(copy.id === updatedReturnCopy.id) {
            return updatedReturnCopy
          } else {
            return copy;
          }
        })
        //console.log(updatedReturnCopies);
      const updatedReturnBook = {...bookCurrentId, copies: updatedReturnCopies} //update an array of Current BOOK
      console.log(updatedReturnBook);
       BookService
        .update(id, updatedReturnBook)
        .then(
          setBooks(books.map(book => {
            if(book.id === id) {
              return updatedReturnBook
            }else {
              return book
            }
          }))
        )
      }
  }

  return (
    <div>  
      <Router>
        <div >
          <NavBar currentUser={currentUser} handleLogOut={handleLogOut}></NavBar>
        </div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/RegisterForm" element={<RegisterForm currentUser={currentUser} handleLogIn={handleLogIn} />} />
          <Route path="/BookList" element={<BookList addBook={addBook} books={books}/>} />
          <Route path="/UserLoginForm" element={<UserLoginForm currentUser={currentUser} handleLogIn={handleLogIn}/>} />
          <Route path="/MyProfile" element={<MyProfile setBooks={setBooks} returnBook={returnBook} books={books} currentUser={currentUser}/> }/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
