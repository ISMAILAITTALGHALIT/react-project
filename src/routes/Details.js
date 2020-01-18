import React, { Component } from 'react'
import { Spinner, HeaderDetails, ActorList } from '../components';
import axios from 'axios';
import { API_URL, API_KEY } from '../config';
class Details extends Component {
    state = {
        loading: true,
        actors: [
            {
                name: "ismail ait "
            },
            {
                name: "rafik boubker"
            },
            {
                name: "samir allat"
            },
            {
                name: "hamid talss"
            }
        ],
        mTitle: "Batman",
        mDesc: "Voici la description du film batman",
        imgSrc: './images/Fast_large.jpg',
        revenue: "$151649562",
        status: "Released",
        vote: ""
    };
    async componentDidMount() {
        try {
            const movieId = this.props.match.params.id;
            const url = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr`;
            const { 
                data : { 
                    revenue, 
                    runtime, 
                    title, 
                    overview, 
                    status, 
                    vote_average, 
                    poster_path
                }
            } = await this.loadInfos(url);
            this.setState({
                revenue,
                runtime,
                mTitle: title,
                mDesc: overview,
                status,
                imgSrc: poster_path,
                vote: vote_average
            }, async () => {
                const url = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=fr`;
                const { data : { cast } } = await this.loadInfos(url);
                this.setState({ actors: [...cast], loading: false });
            })
        } catch(e) {
            console.log('e', e);
        }
    }
    loadInfos = url => axios.get(url);
    render() {
        const { loading, mTitle, mDesc, actors, imgSrc, revenue, runtime, status, vote } = this.state;
        return (
            <div className="app">
                {this.props.loading ?
                (
                    <Spinner />
                ) :
                (
                    <>
                        <HeaderDetails
                            mTitle = {mTitle}
                            mDesc={mDesc}
                            imgSrc= {imgSrc}
                            runtime={runtime}
                            revenue={revenue}
                            status = {status}
                            vote = {vote}
                        /> 
                        <ActorList actors={actors}/>   
                    </>
                )}
            </div>
        )
    }
}
export { Details }