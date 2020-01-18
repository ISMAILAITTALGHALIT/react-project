import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE } from './config';
import axios from 'axios';
import { Header, Spinner } from './components';
import { Home, Details, NotFound } from './routes'
import './App.css';

class App extends Component {
  state = {
    loading :true,
    movies : [
    ],
    badge: 0,
    image: null,
    mTitle: '',
    mDesc: '',
    activePage: 0,
    totlaPages: 0,
    searchText: ""    
  };
  async componentDidMount(){
    try{
      const { data : { results, page, total_pages} } = await this.loadMovies();
      console.log('res ', results);
      this.setState({
        movies: results,
        loading: false,
        activePage: page,
        totlaPages: total_pages,
        image: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${results[0].backdrop_path}`,
        mTitle: results[0].title,
        mDesc: results[0].overview

      })
    } catch(e){
      console.log('e', e);
    }
  }
  loadMovies = () => {
    const page = this.state.activePage + 1;
    const url = `${API_URL}/movie/popular?api_key=${API_KEY}&page=${page}&language=fr`;
    return axios.get(url); //**************axios pour executer les requetes http */
  }
  searchMovie = () => {
    const url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${this.state.searchText}&language=fr`;
    return axios.get(url);
  }
  handleSearch = value => { //recoit un seul parametre
    // lancer la recherche ici
    try {
      this.setState({ loading: true, searchText: value, image: null }, async () => {
        const { data : { results, page, total_pages }} = await this.searchMovie();
        console.log('res', results);
        this.setState({
          movies: results,
          loading: false,
          activePage: page,
          totalPages: total_pages,
          image: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${results[0].backdrop_path}`,
          mTitle: results[0].title,
          mDesc: results[0].overview
        })
      })
    } catch(e) {
      console.log('e', e);
    }
    console.log('handleSearch', value);
  }
  loadMore = async() => { // ne recoit rien en parametres
    //lancer une requete ici
    try{
      this.setState({loading: true})
      const { data : { results, page, total_pages} } = await this.loadMovies();
      console.log('res ', results);
      this.setState({
        movies: [...this.state.movies, ...results],
        loading: false,
        activePage: page,
        totlaPages: total_pages,
        image: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${results[0].backdrop_path}`,
        mTitle: results[0].title,
        mDesc: results[0].overview

      })
    }catch(e){
      console.log('erreur load more', e);
    }
    console.log('load more');
  }
  render() {
    return (
      <BrowserRouter>
      <div className="App">
      <Header badge={this.state.badge} />
            {!this.state.image ? 
              (
                <Spinner />
              ) : 
              (
              <Switch>
                <Route path="/" exact render={() => (
                  <Home 
                    {...this.state}
                    onSearchClick={this.handleSearch}
                    onButtonClick={this.loadMore}
                  />
                  )} 
                />
                <Route path='/:id' exact component={Details}/>
                <Route component={NotFound}/>
              </Switch>
              )}
          </div>
      </BrowserRouter>
    );
  }
}
export default App;
