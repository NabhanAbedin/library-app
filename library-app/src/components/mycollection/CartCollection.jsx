import { useEffect, useState } from "react";
import { userCarts} from "../../api/apiFunctions";

const CartCollection = () => {
    const [data, setData] = useState(null);
    

    useEffect(()=> {
        const fetchData = async () => {
            const result = await userCarts();
            console.log(result);
            setData(result);
        }
        fetchData();
    })

    return (
        <>
            {data && (
                <div className="books-table-container">
                <table className="books-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(data => (
                            <tr 
                            key={data.id}
                            >
                                <td className="book-title-cell">{data.book_title}</td>
                                <td className="book-author-cell">{data.author_name}</td>
                                <td className="book-genre-cell">
                                    <span className="book-genre-tag">{data.genre_type}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
               </div>
            )}

        </>
    )
};

export default CartCollection;