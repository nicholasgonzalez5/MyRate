import React from "react";
import { Link } from "react-router-dom";
import { all } from "../../../node_modules/axios/index";
import useAxiosNYT from "../Hooks/useAxiosNYT";
import "./TrendingBooks.css";

const booksAPI = () => {

    let allTrending = [];

    const { response, loading, error } = useAxiosNYT({
        method: 'get',
        url: 'full-overview.json',
    });

    const renderTrendingBooks = (response) => {

        let allTrending = [];
        for (let listIdx in response.results.lists) {
            const listObj = response.results.lists[listIdx];

            let bookList = []
            for (let bookIdx in listObj.books) {
                const image = listObj.books[bookIdx]['book_image'];
                const bookTitle = listObj.books[bookIdx]['title'];
                const bookAuthor = listObj.books[bookIdx]['author'];
                const publisher = listObj.books[bookIdx]['publisher'];
                const isbn_10 = listObj.books[bookIdx]['primary_isbn10'];
                const isbn_13 = listObj.books[bookIdx]['primary_isbn13'];
                const description = listObj.books[bookIdx]['description'];

                let purchaseLinks = [];
                for (let purchaseIdx in listObj.books[bookIdx]['buy_links']) {
                    const url = listObj.books[bookIdx]['buy_links'][purchaseIdx].url;
                    const name = listObj.books[bookIdx]['buy_links'][purchaseIdx].name;

                    if (name === "Amazon" || name === "Apple Books" || name === "Barnes and Noble")
                        purchaseLinks.push({ name, url });
                }
                bookList.push({ image, bookTitle, bookAuthor, publisher, isbn_10, isbn_13, description, purchaseLinks });
            }
            const displayName = listObj['display_name'];
            allTrending.push({ displayName, bookList });
        }

        return { allTrending }
   

}

export default booksAPI;