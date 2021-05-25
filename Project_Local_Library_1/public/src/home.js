function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let total = 0;
  books.forEach((book) =>{
    if (!book.borrows[0].returned){
      total++;
    }
  });
  return total;
}

function getMostCommonGenres(books) {
    const result = books.reduce((accum, book) => {
      const genre = book.genre;
      const genreInfo = accum.find((element) => element.name === genre);
      if (!genreInfo) {
        const newGenreInfo = {
          name: genre,
          count: 1,
        };
        accum.push(newGenreInfo);
      } else {
        genreInfo.count++;
      }
      return accum;
    }, []);
    result.sort((genreA, genreB) => genreB.count - genreA.count);
    result.splice(5);
    return result;
}

function getMostPopularBooks(books) {
    const result = books.map((book) => {
      const popularityInfo = {
        name: book.title,
        count: book.borrows.length,
      };
      return popularityInfo;
    });
    result.sort((titleA, titleB) => titleB.count - titleA.count);
    result.splice(5);
    return result;
}

  function getMostPopularAuthors(books, authors) {
    const popularAuthors = authors.map((author) => {
      const authorName = author.name.first + " " + author.name.last;
      const booklist = getBooksByAuthor(books, author.id);
      const borrowCountByAuthor = booklist.reduce((accumulator,book) => {
        return accumulator += book.borrows.length }, 0
      );
      const result = {
        name: authorName,
        count: borrowCountByAuthor,
      } 
      return result;
    });
    popularAuthors.sort((authorA, authorB) => authorB.count - authorA.count); 
    return popularAuthors.slice(0,5);
  }
  function getBooksByAuthor(books, id) {
    const listOfBookByAuthor =  books.filter((book) => 
      book.authorId === id
    )
    return listOfBookByAuthor;
  }

 

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
