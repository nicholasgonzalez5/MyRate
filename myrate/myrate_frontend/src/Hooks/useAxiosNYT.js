import axios from 'axios';
import { useState, useEffect } from 'react';

// Required as final query parameter to authorize GET request
const NYT_API_KEY = 'api-key=cLdOpoHOGl43aVB1xShNdt3oLHbGxixL';

axios.defaults.baseURL = 'https://api.nytimes.com/svc/books/v3/lists/';

const useAxiosNYT = ({ url, method, body = null, headers = null }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        axios[method](`${url}?${NYT_API_KEY}`, JSON.parse(headers), JSON.parse(body))
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [method, url, body, headers]);

    return { response, error, loading };
};

export default useAxiosNYT;
