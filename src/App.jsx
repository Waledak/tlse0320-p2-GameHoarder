import React from 'react';
import './App.scss';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CommonLoading } from 'react-loadingg';
import HeaderLib from './components/header/HeaderLib';
import HeaderSugg from './components/header/HeaderSugg';
import MyGames from './components/contents/MyGames';
import NewGames from './components/contents/NewGames';
import Footer from './components/footer/Footer';
import GetGames from './components/data/GetGames';
import NavDesktop from './components/nav-desktop/NavDesktop';

axios.defaults.headers.common['user-key'] = '75f9926369d4142ff35731792bb25f29';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mygameInputValue: null,
      newgameInputValue: null,
      idNewGameDelete: null,
      prevListGamesLib: [],
      listGamesLib: [],
      show: false,
      allGames: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.gameToRemove = this.gameToRemove.bind(this);
    this.handleAllGames = this.handleAllGames.bind(this);
    this.handleGamesList = this.handleGamesList.bind(this);
    this.handleWishlistGame = this.handleWishlistGame.bind(this);
    this.handleRemoveWishlistGame = this.handleRemoveWishlistGame.bind(this);
    this.handleInfoGame = this.handleInfoGame.bind(this);
    this.handleChangeStatue = this.handleChangeStatue.bind(this);
    this.handleremoveDataGame = this.handleremoveDataGame.bind(this);
  }

  componentDidMount() {
    if (window.localStorage.getItem('gamesList')) {
      let gamesList = window.localStorage.getItem('gamesList');
      gamesList = JSON.parse(gamesList);
      gamesList = gamesList.sort((a, b) => new Date(b.addingDate) - new Date(a.addingDate));
      this.setState({ listGamesLib: gamesList });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { listGamesLib, prevListGamesLib } = this.state;
    const listGamesLibReverse = listGamesLib.sort(
      (a, b) => new Date(b.addingDate) - new Date(a.addingDate)
    );
    window.localStorage.setItem('gamesList', JSON.stringify(listGamesLibReverse));
    if (prevListGamesLib.length !== listGamesLibReverse.length || prevListGamesLib === []) {
      this.setState(prevState => {
        return {
          ...prevState,
          listGamesLib: listGamesLibReverse,
          prevListGamesLib: listGamesLibReverse
        };
      });
    }

    if (prevState.listGamesLib !== listGamesLib) {
      this.setState(prevState => {
        return {
          ...prevState,
          listGamesLib: listGamesLibReverse,
          prevListGamesLib: listGamesLibReverse
        };
      });
    }
  }

  handleGamesList(values) {
    const { listGamesLib } = this.state;
    let newlistGamesLib = listGamesLib;
    newlistGamesLib = newlistGamesLib.filter(game => game.title !== values.title);
    this.setState({
      listGamesLib: [...newlistGamesLib, values]
    });
  }

  handleWishlistGame(values) {
    const { listGamesLib } = this.state;
    let newlistGamesLib = listGamesLib;
    newlistGamesLib = newlistGamesLib.filter(game => game.title !== values.title);
    this.setState({
      listGamesLib: [...newlistGamesLib, values]
    });
  }

  handleRemoveWishlistGame(values) {
    const { listGamesLib } = this.state;
    let newlistGamesLib = listGamesLib;
    newlistGamesLib = newlistGamesLib.filter(game => game.title !== values.title);
    this.setState({ listGamesLib: newlistGamesLib });
  }

  handleInfoGame(values) {
    const { listGamesLib } = this.state;
    this.setState({
      listGamesLib: [...listGamesLib, values]
    });
  }

  handleChangeStatue(values) {
    const { listGamesLib } = this.state;
    let newlistGamesLib = listGamesLib;
    newlistGamesLib = newlistGamesLib.filter(game => game.title !== values.title);
    this.setState({ listGamesLib: [...newlistGamesLib, values] });
  }

  gameToRemove(gameToRemove) {
    Swal.fire({
      title: 'Etes-vous sûr?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--primary-color)',
      cancelButtonColor: 'var(--alert-color)',
      confirmButtonText: 'Oui, je supprime!',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.value) {
        Swal.fire({
          title: 'Supprimé!',
          text: 'Votre jeu a été supprimé.',
          icon: 'success',
          showConfirmButton: false,
          timer: 900
        });
        const { listGamesLib } = this.state;
        const newTab = listGamesLib;
        let index = newTab.map(game => {
          if (gameToRemove === game.title) {
            return newTab.indexOf(game);
          }
          return undefined;
        });
        index = index.filter(el => el !== undefined);
        newTab.splice(index[0], 1);
        this.setState({ listGamesLib: newTab });
      }
    });
  }

  handleAllGames(games) {
    this.setState({ allGames: [...games] });
  }

  handleChange(event) {
    const valueToChange = event.target.value;
    const inputSearchInputValue = event.target.name;
    this.setState({ [inputSearchInputValue]: valueToChange });
  }

  handleremoveDataGame(values) {
    const { listGamesLib } = this.state;
    let newlistGamesLib = listGamesLib;
    newlistGamesLib = newlistGamesLib.filter(game => game.title !== values.title);
    this.setState({ listGamesLib: newlistGamesLib });
  }

  render() {
    const { mygameInputValue, allGames, listGamesLib } = this.state;
    const { newgameInputValue } = this.state;
    const { handleChange, handleAllGames, handleChangeStatue } = this;
    let addGameContent;
    if (
      allGames.length === 0 ||
      allGames[0].url === undefined ||
      allGames[0].platformsName === undefined ||
      allGames[0].genres === undefined ||
      allGames[0].artworksUrl === undefined
    ) {
      addGameContent = <CommonLoading color="#1047f5" />;
    } else {
      addGameContent = (
        <>
          <HeaderSugg
            games={this.state.allGames.sort((a, b) => b.rating - a.rating)}
            handleGamesList={this.handleGamesList}
            handleremoveDataGame={this.handleremoveDataGame}
            listGamesLib={listGamesLib}
          />
          <NewGames
            handleAllGames={handleAllGames}
            value={newgameInputValue}
            listGamesLib={listGamesLib}
            handleGamesList={this.handleGamesList}
            handleChange={handleChange}
            games={allGames}
            handleInfoGame={this.handleInfoGame}
            handleWishlistGame={this.handleWishlistGame}
            handleRemoveWishlistGame={this.handleRemoveWishlistGame}
            handleremoveDataGame={this.handleremoveDataGame}
            listGamesLib={listGamesLib}
          />
        </>
      );
    }

    return (
      <div className="App">
        <Router>
          <section id="content">
            <NavDesktop
              listGamesLib={listGamesLib}
              handleRemoveWishlistGame={this.handleRemoveWishlistGame}
              handleWishlistGame={this.handleWishlistGame}
              handleGamesList={this.handleGamesList}
            />

            <Switch>
              <Route exact path="/">
                <HeaderLib
                  gameToRemove={this.gameToRemove}
                  listGamesLib={listGamesLib.filter(el => el.addToLib)}
                  handleChangeStatue={handleChangeStatue}
                />
                <MyGames
                  value={mygameInputValue}
                  gameToRemove={this.gameToRemove}
                  handleInfoGame={this.handleInfoGame}
                  handleChange={handleChange}
                  listGamesLib={listGamesLib}
                  handleChangeStatue={handleChangeStatue}
                />
              </Route>
              <Route exact path="/ajouter-un-jeu">
                <GetGames games={allGames} handleAllGames={handleAllGames} />
                {addGameContent}
              </Route>
            </Switch>
          </section>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
