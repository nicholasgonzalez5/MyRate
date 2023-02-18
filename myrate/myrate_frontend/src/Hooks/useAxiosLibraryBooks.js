import axios from 'axios';
import { useState, useEffect } from 'react';

/***
 * IMPORTANT NOTE:
 * 
 * The full response is a multi-page response.
 * https://developers.google.com/books/docs/v1/reference/?apix=true
 * */

// Required as final query parameter to authorize GET request
const GOOGLE_API_KEY = 'key=AIzaSyDpaGYiWMq7RD5pajfAXDt30AZ9Aq5flgc';

axios.defaults.baseURL = 'https://openlibrary.org/search.json?q=';// 'https://www.googleapis.com/books/v1/volumes?q='//search+terms'

const useAxiosLibraryBooks = ({ key, method, body = null, headers = null, }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        axios[method]('https://openlibrary.org/works/'+`${key}`+'/editions.json', JSON.parse(headers), JSON.parse(body))//'https://www.googleapis.com/books/v1/volumes?q='+`${searchterms}:keyes&${GOOGLE_API_KEY}`, JSON.parse(headers), JSON.parse(body))
        .then((res) => {
            console.log('https://openlibrary.org/works/'+`${key}`+'/editions.json');
            //console.log("--------------------------");
            //console.log(JSON.stringify(res.data));
            setResponse(res.data);
        })
        .catch((err) => {
            console.log("Library errored: " + err);
            setError(err);
        })
        .finally(() => {
            //console.log("IN finally");
            setloading(false);
        });
    };

    useEffect(() => {
        fetchData();
    }, [method, key, body, headers]);

    return { response, error, loading };
};

export default useAxiosLibraryBooks;