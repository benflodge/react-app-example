/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default function Home({ match }) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/todos')
            .then(response => {
                setData(response.data);
            })
            .catch(() => setError('Data request failed.'));
    }, []);

    if (error) return <div>{`Error: ${error}`}</div>;
    if (!data) return <div>Loading Home Page..</div>;
    return (
        <div>
            <h1>Home Page</h1>
            <p>Data loaded.</p>
        </div>
    );
}
