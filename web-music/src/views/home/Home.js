import React from "react";
import Banner from './Banner';
import Toppic from './Toppic';
import Ranking from './Ranking';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function Home() {

    const fetchApi = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/topic/get`);
            console.log('API Response:', res.data); 
            return res.data.data; 
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const query = useQuery({ queryKey: ['topics'], queryFn: fetchApi });

    if (query.isLoading) {
        return <div>Loading...</div>; 
    }

    if (query.isError) {
        return <div>Error fetching data: {query.error.message}</div>; 
    }

    const arrTopic = query.data || [];
  
    return (
        <div>
            <Banner /> 
            <div className="home-container">
                <Toppic arrTopic={arrTopic} /> 
                <Ranking /> 
            </div> 
        </div>
    );
}

export default Home;
