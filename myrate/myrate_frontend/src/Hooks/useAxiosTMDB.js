import axios from 'axios';
import { useState, useEffect } from 'react';

/***
 * IMPORTANT NOTE:
 * 
 * The full response is a multi-page response.
 * This hook returns only the 20 items from the first page of results.
 * 
 * */

// Required as final query parameter to authorize GET request
const TMDB_API_KEY = 'api_key=44a9a2cde95eface8cfceffc13305aaa';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/trending/'

const useAxiosTMDB = ({ url, method, body = null, headers = null, sortByPopularity = false, responseLength = 20 }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        axios[method](`${url}?${TMDB_API_KEY}`, JSON.parse(headers), JSON.parse(body))
            .then((res) => {
                if (sortByPopularity)
                    setResponse(sortResponseByPopularity(res.data['results'], false).splice(0, responseLength));
                else
                    setResponse(res.data['results'].splice(0, responseLength));
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
            let x = a['popularity'];
            let y = b['popularity'];
            if (asc) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
            else { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
        });
    }

    useEffect(() => {
        fetchData();
    }, [method, url, body, headers]);

    return { response, error, loading };
};

export default useAxiosTMDB;
