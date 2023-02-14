import axios from 'axios';
import { useState, useEffect } from 'react';

/***
 * IMPORTANT NOTE:
 * 
 * The full response is a multi-page response.
 * This hook returns only the 20 items from the first page of results.
 * https://developers.google.com/books/docs/v1/reference/?apix=true
 * */

// Required as final query parameter to authorize GET request
const GOOGLE_API_KEY = 'key=AIzaSyDpaGYiWMq7RD5pajfAXDt30AZ9Aq5flgc';

axios.defaults.baseURL = 'https://www.googleapis.com/books/v1/volumes?q=search+terms'

const useAxiosGoogleBooks = ({ url, method, body = null, headers = null, sortByPopularity = false, responseLength = 20 }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        axios[method](`${url}?${GOOGLE_API_KEY}`, JSON.parse(headers), JSON.parse(body))
            .then((res) => {
                if (sortByPopularity)
                    setResponse(sortResponseByPopularity(res.data, false).splice(0, responseLength));
                else
                    setResponse(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    function sortResponseByPopularity(arr, asc = true) {
        return arr.sort((a, b) => {
            let x = a['averageRating'];
            let y = b['averageRating'];
            if (asc) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
            else { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
        });
    }

    useEffect(() => {
        fetchData();
    }, [method, url, body, headers]);

    return { response, error, loading };
};

export default useAxiosGoogleBooks;