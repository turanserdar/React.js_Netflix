import React from 'react';
import './HomeScreen.css'
import Nav from './Nav';
import Banner from './Banner';
import requests from './Request';
import Row from './Row';


export default function HomeScreen() {

    return (

        <div className='homeScreen'>
            <Nav />

            

            <Banner/>
            
            <Row
            title="NETFLIX ORIGINALS"
            fetchUrl={requests.fetchNetflixOriginals}
            isLargeRow
            />
            <Row
            title="Trending Now"
            fetchUrl={requests.fetchTrending}
            isLargeRow
            />
            <Row
            title="Top Rated"
            fetchUrl={requests.fetchTopRate}
            isLargeRow
            />
            <Row
            title="Action Movies"
            fetchUrl={requests.fetchActionMovies}
            isLargeRow
            />
            <Row
            title="Comedy Movies"
            fetchUrl={requests.fetchComedyMovies}
            isLargeRow
            />

            <Row
            title="Horrow Movies"
            fetchUrl={requests.fetchHorrorMovies}
            isLargeRow
            />
            <Row
            title="Romance Movies"
            fetchUrl={requests.fetchRomanceMovies}
            isLargeRow
            />

            <Row
            title="Documentaries"
            fetchUrl={requests.fetchDocumentaries}
            isLargeRow
            />
           
        </div>

    );


}

