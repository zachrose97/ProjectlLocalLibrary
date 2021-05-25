function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}


function partitionBooksByBorrowedStatus(books) {
  let result = [];
  const borrowed = books.filter((book) => book.borrows[0].returned === false);
  const returned = books.filter((book) => book.borrows[0].returned === true);
  result.push(borrowed, returned);

  return result;
}

function getBorrowersForBook(book, accounts) {

  const { borrows } = book;

  const borrowers = borrows.map(({ id, returned })=> {
    const account = accounts.find(account => account.id === id);
    return {
      ...account,
      returned,
    };
  });

  return borrowers
    .sort((borrowerA, borrowerB) => {
      const companyA = borrowerA.company;
      const companyB = borrowerB.company;
      return companyA.localeCompare(companyB);
    })
    .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
