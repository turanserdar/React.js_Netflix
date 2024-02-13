import React from 'react';
import './Banner.css';

export default function Banner() {


    function truncate(string, n)
    {
    //    n=number
        return string?.length > n  ? string.substr(0, n-1) + '... ' : string;

    }


    return (
        <header className='banner' style={{
            backgroundSize: "cover",
            backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAACuCAMAAAClZfCTAAAAA1BMVEUAAACnej3aAAAASElEQVR4nO3BMQEAAADCoPVPbQhfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABeA8XKAAFZcBBuAAAAAElFTkSuQmCC")`,
            backgroundPosition: "center center",
        }}>

            <div className='banner__contents'>

                <h1 className='banner-title'>

                    Movie Name

                </h1>

                <div className='banner__buttons'>

                    <button className='banner__button'>Play</button>
                    <button className='banner__button'>My List</button>

                </div>

                <h1 className='banner__description'>
                    {truncate(`This is a test descriptionThis is a test descriptionThis is a test deThis is a test descriptionThis is a test descriptionThis is a test descriptionThis is a test descriptionscription`,150)}
                    
                </h1>
            </div>

            <div className='banner--fadeBottom'/>




        </header>
    );
};

