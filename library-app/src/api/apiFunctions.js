export const formatRelease = (release) => {
    const splitRelease = release.split('T');

    return splitRelease[0];
};

export const addBook = async ({title, author, release, genre}) => {
    const res = await fetch('http://localhost:5001/books/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title,
            release,
            authorName: author,
            genreName: genre
        })
    });

    const result = await res.json();
    console.log(result);

    return res;
};

export const getBooks = async () => {
    const res = await fetch('http://localhost:5001/books', {
        method: 'GET'
    });

    const result = await res.json();
    return result;
}

export const addAuthor = async ({name, bio, age}) => {
    const res = await fetch('http://localhost:5001/authors/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name,
            bio,
            age
        })
    });
    const result = await res.json();
    console.log(result);
    return res;
};

// export const viewAllBooks = async () => {
//     const res = await fetch('http://localhost:5001/books/catalog');

//     const result = await res.json();
//     console.log(result);
//     return result;
// };

export const findBySearch = async (query) => {
     const res = await fetch(`http://localhost:5001/books/catalog/search?query=${encodeURIComponent(query)}`);

     const result = await res.json();
     return result;
};

export const catalogBooks = async ({sortBy, orderBy, from, to}) => {
    const res = await fetch(`http://localhost:5001/books/catalog?sortBy=${sortBy}&orderBy=${orderBy}&from=${from}&to=${to}`);

    const result = await res.json();
    return result;
};

// export const viewAllAuthors = async () => {
//     const res = await fetch('http://localhost:5001/authors/catalog');

//     const result = await res.json();
//     console.log(result);
//     return result;
// };

export const catalogAuthors = async ({orderBy, from, to}) => {
    const res = await fetch(`http://localhost:5001/authors/catalog?orderBy=${orderBy}&from=${from}&to=${to}`);

    const result = await res.json();
    return result;
};

export const findAuthorsBySearch = async (query) => {
    const res = await fetch(`http://localhost:5001/authors/catalog/search?query=${encodeURIComponent(query)}`);

    const result = await res.json();
    return result;
};

export const catalogGenre = async ({orderBy}) => {
    const res = await fetch(`http://localhost:5001/genre/catalog?orderBy=${orderBy}`);
    const result = await res.json();
    return result;
};

export const findGenreBySearch = async (query) => {
    const res = await fetch (`http://localhost:5001/genre/catalog/search?query=${encodeURIComponent(query)}`);
    const result = await res.json();
    return result;
};

export const createAccount = async (username, password) => {
    const res = await fetch('http://localhost:5001/auth/register', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
         username: username,
         password: password
        })
 
     });

    const result = await res.json();
    console.log(result);
    return res;
}

export const logIn = async (username, password) => {
    const res = await fetch('http://localhost:5001/auth/login', {
       method: 'POST',
       headers: {'Content-type': 'application/json'},
       credentials: 'include',
       body: JSON.stringify({
        username: username,
        password: password
       })

    });

    const result = await res.json();
    console.log(result);
    return { res, result };
};

export const logOut = async () => {
    const res = await fetch('http://localhost:5001/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });

    const result = await res.json();
    console.log(result);
    return res;
}

 
export const checkLoggedIn = async () => {
    const res = await fetch('http://localhost:5001/auth/check',{
        method: 'POST',
        credentials: 'include'
    });

    return res;
}