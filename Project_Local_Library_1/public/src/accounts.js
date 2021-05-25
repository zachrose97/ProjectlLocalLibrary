function findAccountById(accounts, id) {
  let result = accounts.find((account) => account.id === id);
  console.log(result);
  return result;
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => {
  const lastNameA= accountA.name.last;
  const lastNameB = accountB.name.last;
  return lastNameA.toLowerCase() < lastNameB.toLowerCase() ? -1 : 1;
  });
}

function getTotalNumberOfBorrows(account, books) {
  const {id} = account;
  let total = 0;

  for (let book in books) {
    const {borrows} = books[book];
    borrows.forEach((element) => {
      if (element.id === id){
        total++;
      }
    });
  }
  return total
}

function getBooksPossessedByAccount(account, books, authors) {
  let books_taken = [];
  books.forEach(book=>{
    if (book.borrows.find(item=>item.id === account.id && !item.returned)) {
      books_taken.push(book);
    }
  })
  console.log(books_taken);
  books_taken.forEach(book=>{
    let anAuthor = authors.find(person => person.id === book.authorId);
    book['author'] = anAuthor;
  })
  console.log(books_taken);
  return books_taken;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
