import React, { Component } from 'react';
import { Poster } from './index';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';

import '../css/PosterList.css';

let wish;
class PosterList extends Component {
    renderPoster = () => { // la methode qui va retourner notre poster
        return this.props.movies.map( movie => {
            const imgSrc = `${IMAGE_BASE_URL}/${POSTER_SIZE}/${movie.poster_path}`;
            wish=false;
            return (
                <Poster 
                    key = {movie.id}
                    imgSrc = {imgSrc}
                    whished = {wish}
                    mTitle={movie.title}
                    mDesc={movie.overview}
                    id= {movie.id}
                />
            )
        })
    }
    render() {
        return (
            <div className="posterList">
                <h3 className="posterList--title">Nouveaux Films</h3>
                <div className="posterList--grid">
                    { this.renderPoster()}
                </div>
            </div>
        )
    }
}


export { PosterList }; 