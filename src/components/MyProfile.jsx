import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'react-bootstrap';
import BookService from './BookService';
import PropTypes from 'prop-types';

const MyProfile = ({ currentUser, books, returnBook, setBooks }) => {

  const transformBooks = (books) => {
    return books.map(book => ({
      ...book,
      id: book.id.toString(),
      copies: book.copies.map(copy => ({
        ...copy,
        id: copy.id.toString(),
      })),
    }));
  };

  const transformedBooks = transformBooks(books);

  const extendBook = (bookId, copyId) => {
    const filteredBooksById = transformedBooks.filter(book => bookId === book.id); // iterate to find the book with current Id
    const bookCurrentId = filteredBooksById[0];
    if (bookCurrentId) {
      const filteredCopy = bookCurrentId.copies.filter(copy => copyId === copy.id); // iterate for borrower === null
      const currentDate = new Date();
      const dueDate = new Date(currentDate.setDate(currentDate.getDate() + 25));
      const extendDate = new Date(dueDate.setDate(dueDate.getDate() + 20)); // extend Date
      const updatedExtendDate = { ...filteredCopy[0], dueDate: extendDate.toDateString() };
      const updatedCopies = bookCurrentId.copies.map(copy => { // iterate and compare current book and update an array of copies
        if (copy.id === updatedExtendDate.id) { // compare the copy of current book and id of copy which extend
          return updatedExtendDate;
        } else {
          return copy;
        }
      });
      const updatedBook = { ...bookCurrentId, copies: updatedCopies }; // update an array of Current BOOK
      BookService
        .update(bookId, updatedBook)
        .then(
          setBooks(transformedBooks.map(book => {
            if (book.id === bookId) {
              return updatedBook;
            } else {
              return book;
            }
          }))
        );
    }
  };

  const myCopies = transformedBooks.filter(book => book.copies.some(copy => copy.borrower === currentUser.id));

  return (
    <div className='bg'>
      <Container className="containerStyleProfile">
        <img src='https://mdbootstrap.com/img/new/slides/041.webp' className="mountains" />
        <h2>{currentUser.name} </h2>
        <h4>{currentUser.email}</h4>
        <Button className="buttonBookList" variant="success">Book List</Button>
        <Container className="bookContainer">
          <table>
            <thead>
              <tr>
                <th scope="col">Book name:</th>
                <th scope="col">Borrow date</th>
                <th scope="col">Due date:</th>
              </tr>
            </thead>
            <tbody>
              {myCopies.map((book) =>
                book.copies.map((copy) => (
                  copy.borrower === currentUser.id && (
                    <tr key={copy.id}>
                      <td>{book.title}</td>
                      <td>{copy.borrowedDate}</td>
                      <td>{copy.dueDate}</td>
                      <td>
                        <Button id="button" variant="success" onClick={() => returnBook(book.id)} className="buttonStyle">Return book</Button>
                      </td>
                      <td>
                        <Button id="button" variant="success" onClick={() => extendBook(book.id, copy.id)} className="buttonStyle">Extend book</Button>
                      </td>
                    </tr>
                  )
                ))
              )}
            </tbody>
          </table>
        </Container>
      </Container>
    </div>
  );
};

MyProfile.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      copies: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          borrower: PropTypes.string,
          borrowedDate: PropTypes.string,
          dueDate: PropTypes.string,
        })
      ).isRequired,
    })
  ).isRequired,
  returnBook: PropTypes.func.isRequired,
  setBooks: PropTypes.func.isRequired,
};

MyProfile.defaultProps = {
  currentUser: null,
};

export default MyProfile;
