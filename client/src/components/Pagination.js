import React from "react";

const Pagination = ({
  employeeCount,
  viewPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(employeeCount / viewPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="py-2 rounded-md flex justify-center gap-5">
      {pages.map((page, idx) => {
        return (
          <button
            className={` bg-blue-500 p-2 w-10 h-10 rounded-md text-center active:bg-stone-600 disabled:bg-gray-500 disabled:opacity-65 text-white`}
            key={idx}
            onClick={() => setCurrentPage(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
