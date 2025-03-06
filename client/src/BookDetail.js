import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BookDetails() {
  const { bookID } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBookDetails();
  }, []);

  const fetchBookDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/book/${bookID}`);
      setBook(res.data);
    } catch (error) {
      console.error('Error fetching book details', error);
    }
  };

  if (!book) {
    return <h2>Loading book details...</h2>;
  }

  return (
    <div className="book-details-container">
    <center><h1>Summarization</h1></center>
      <h1>{book.bookName}</h1><i>book Name~</i>
      <table className="book-details-table">
        <tbody>
          <tr>
            <td><strong>📖 Book Name:</strong></td>
            <td>{book.bookName}</td>
          </tr>
          <tr>
            <td><strong>✍️ Author:</strong></td>
            <td>{book.author}</td>
          </tr>
          <tr>
            <td><strong>📜 Summary:</strong></td>
            <td>{book.summary}Magna enim occaecat irure incididunt. Esse officia elit ex consectetur consectetur voluptate eiusmod et voluptate labore non. Nulla ex deserunt ea proident. Irure ut commodo officia elit mollit anim proident. Veniam elit ad sit ex consectetur laborum ullamco aliquip nulla. Dolor officia laborum ullamco deserunt adipisicing sit labore laborum mollit aliquip sit eiusmod sunt sint. Culpa Lorem laborum ea velit commodo Lorem enim.</td>
          </tr>
          <tr>
            <td><strong>🔑 Keywords:</strong></td>
            <td>{book.keywords}</td>
          </tr>
          <tr>
            <td><strong>📍 Zone:</strong></td>
            <td>{book.zone}</td>
          </tr>
        </tbody>
      </table>

      <style>
        {`
        .book-details-container {
          max-width: 900px;
          margin: 20px auto;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .book-details-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .book-details-table td {
          border: 1px solid #333;
          padding: 10px;
          font-size: 18px;
          line-height: 1.5;
        }
        .book-details-table td:first-child {
          font-weight: bold;
          background: rgb(97, 106, 113);
          color: white;
          width: 30%;
        }
        `}
      </style>
    </div>
  );
}

export default BookDetails;
