import React from "react";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  // Logika untuk menampilkan tombol-tombol halaman
  const pageNumbers = [];
  const displayPages = 5; // Jumlah halaman yang ditampilkan sekaligus

  for (
    let i = currentPage - displayPages;
    i <= currentPage + displayPages;
    i++
  ) {
    if (i > 0 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className="join">
      {currentPage > 1 && (
        <button
          className="join-item btn"
          onClick={() => paginate(currentPage - 1)}
        >
          Previous
        </button>
      )}

      {pageNumbers[0] > 1 && (
        <button className="join-item btn" onClick={() => paginate(1)}>
          1
        </button>
      )}

      {pageNumbers[0] > 2 && (
        <button className="join-item btn btn-disabled">...</button>
      )}

      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`join-item btn ${number === currentPage ? "active" : ""}`}
          onClick={() => paginate(number)}
        >
          {number}
        </button>
      ))}

      {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
        <button className="join-item btn btn-disabled">...</button>
      )}

      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <button className="join-item btn" onClick={() => paginate(totalPages)}>
          {totalPages}
        </button>
      )}

      {currentPage < totalPages && (
        <button
          className="join-item btn"
          onClick={() => paginate(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
