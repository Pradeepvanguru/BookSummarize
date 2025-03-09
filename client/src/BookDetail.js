import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BookDetails() {
  const { bookID } = useParams();
  const [book, setBook] = useState(null);
  const [animatedTable, setAnimatedTable] = useState({
    bookName: '',
    author: '',
    summary: '',
    keywords: '',
    zone: '',
  });
  const [visibleRows, setVisibleRows] = useState(0); // Controls row visibility

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

  useEffect(() => {
    if (book) {
      animateTable();
    }
  }, [book]);

  const animateTable = async () => {
    const tableData = {
      bookName: book.bookName,
      author: book.author,
      summary: book.summary,
      keywords: book.keywords,
      zone: book.zone,
    };

    let delay = 0;

    for (const key of Object.keys(tableData)) {
      await new Promise((resolve) => {
        setTimeout(() => {
          let currentText = "";
          let index = 0;
          const interval = setInterval(() => {
            if (index < tableData[key].length) {
              currentText += tableData[key][index];
              setAnimatedTable((prev) => ({ ...prev, [key]: currentText }));
              index++;
            } else {
              clearInterval(interval);
              setVisibleRows((prev) => prev + 1); // Show next row
              resolve();
            }
          }, 30);
        }, delay);
      });

      delay += 500; // Wait before starting next row
    }
  };

  if (!book) {
    return <h2>Loading book details...</h2>;
  }

  return (
    <div className="book-details-container">
      <center><h1 className="title">📚 Summarization</h1></center>

      <table className="book-details-table">
        <tbody>
          {visibleRows >= 0 && (
            <tr>
              <td><strong>📖 Book Name:</strong></td>
              <td>{animatedTable.bookName || "..."}</td>
            </tr>
          )}
          {visibleRows >= 1 && (
            <tr>
              <td><strong>✍️ Author:</strong></td>
              <td>{animatedTable.author || "..."}</td>
            </tr>
          )}
          {visibleRows >= 2 && (
            <tr>
              <td><strong>📜 Summary:</strong></td>
              <td>{animatedTable.summary || "..."}</td>
            </tr>
          )}
          {visibleRows >= 3 && (
            <tr>
              <td><strong>🔑 Keywords:</strong></td>
              <td>{animatedTable.keywords || "..."}</td>
            </tr>
          )}
          {visibleRows >= 4 && (
            <tr>
              <td><strong>📍 Zone:</strong></td>
              <td>{animatedTable.zone || "..."}</td>
            </tr>
          )}
        </tbody>
      </table>

      <style>
        {`
        .book-details-container {
          max-width: 900px;
          margin: 20px auto;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(0,0,0,0.2);
          font-family: 'Courier New', monospace;
          padding-bottom: 30px;
        }
        .title {
          font-size: 28px;
          color:rgb(8, 130, 251);
          margin-bottom: 20px;
        }
        .book-details-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .book-details-table td {
          border: 1px solid #333;
          padding: 12px;
          font-size: 18px;
          line-height: 2;
          white-space: pre-line;
        }
        .book-details-table td:first-child {
          font-weight: bold;
          background: #34495e;
          color: white;
          width: 30%;
        }
        `}
      </style>
    </div>
  );
}

export default BookDetails;
