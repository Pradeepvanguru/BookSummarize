import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import BookDetails from './BookDetail';
import WelcomePage from './welcomePage';

function Home() {
   const [bookID, setBookID] = useState('');
  const [file, setFile] = useState(null);
  const [books, setBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await axios.get('http://localhost:5000/books');
    setBooks(res.data);
  };

  const uploadBook = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bookID', bookID);
    formData.append('file', file);
    await axios.post('http://localhost:5000/upload', formData);
    fetchBooks();
    setBookID('');
    setFile(null);
  };


  const handleDelete = async (bookID) => {
    try {
      await axios.delete(`http://localhost:5000/book/${bookID}`);
      fetchBooks();
    } catch (error) {
      alert('Error deleting book');
    }
  };

  return (
    <div className="container">
    <i>Welcome to</i>
      <h1>📚 Book Summarization</h1>
      
      <div className="upload-section">
        <input type="text" placeholder="Enter Book ID" value={bookID} onChange={(e) => setBookID(e.target.value)} />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={uploadBook}>Upload</button>
      </div>

      <table className="file-list">
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Book</th>
            <th>Preview</th>
            <th>Summarize</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.bookID}>
              <td>{book.bookID}</td>
              <td>{book.filePath.split('/').pop()} </td>
              <td><a href={`http://localhost:5000${book.filePath}`} target="_blank" rel="noopener noreferrer">view 👁</a></td>
              <td><button onClick={() => navigate(`/book/${book.bookID}`)}>Summarize</button></td>
              <td><button onClick={() => handleDelete(book.bookID)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {bookDetails && (
        <div className="book-details">
          <h2>{bookDetails.bookName}</h2>
          <p><strong>Author:</strong> {bookDetails.author}</p>
          <p><strong>Summary:</strong> {bookDetails.summary}</p>
          <p><strong>Keywords:</strong> {bookDetails.keywords}</p>
          <p><strong>Zone:</strong> {bookDetails.zone}</p>
        </div>
      )}

      <style>
        {`
        body { font-family: Arial, sans-serif; background:rgb(226, 220, 220); text-align: center; }
        .container { max-width: 900px; height:100vh; margin: auto; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .upload-section input { margin: 10px; padding: 8px; border: 1px solid #ccc; }
        .upload-section button { background: #3498db; color: white; border: none; padding: 8px 15px; cursor: pointer; }
        .upload-section button:hover { background: #2980b9; }
        .file-list { width: 100%; margin-top: 20px; border-collapse: collapse; }
        .file-list th, .file-list td { padding: 10px; border: 1px solid #ddd; text-align: left; }
        .file-list th { background: #3498db; color: white; }
        .book-details { margin-top: 20px; padding: 10px; border: 1px solid #ddd; background: white; border-radius: 5px; }
        .book-details h2 { color: #3498db; }
         button{ padding:9px 5px; border-radius: 5px; color:rgb(251, 245, 241); background: #2980b9; border:none;}
        `}
      </style>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<WelcomePage />}/>
        <Route path="/summury" element={<Home />} />
        <Route path="/book/:bookID" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
