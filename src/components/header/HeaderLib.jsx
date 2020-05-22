import React from 'react';
import './header.scss';
import PropTypes from 'prop-types';
import DisplayRating from '../contents/my-games/DisplayRating';

export default class HeaderLib extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastGameImg: [],
      lastGameName: null,
      lastGameRating: null,
      isThereIsGame: true,
      lastGameAdded: null,
      update: false
    };
    this.removeGameFromHeader = this.removeGameFromHeader.bind(this);
    this.getSelectValue = this.getSelectValue.bind(this);
  }

  componentDidMount() {
    this.handleLastGameAdded();
  }

  componentDidUpdate(prevProps, prevState) {
    const { listGamesLib } = this.props;
    const { lastGameName } = this.state;
    if (listGamesLib && listGamesLib.length > 0 && lastGameName !== listGamesLib[0].title) {
      this.handleLastGameAdded();
    } else if (listGamesLib.length === 0 && lastGameName !== "Ajouter d'abord un jeu") {
      this.handleLastGameAdded();
    }
  }

  getSelectValue(event) {
    const valueToChange = event.target.value;

    const { lastGameName } = this.state;
    const { listGamesLib } = this.props;
    const newTab = listGamesLib.filter(game => game.title === lastGameName);
    this.setState({
      update: true
    });
    const values = {
      addingDate: newTab[0].addingDate,
      title: newTab[0].title,
      img: newTab[0].img,
      rating: newTab[0].rating,
      id: newTab[0].id,
      addToLib: true,
      addToWish: false,
      platformsName: newTab[0].platformsName,
      status: valueToChange
    };

    const { handleChangeStatue } = this.props;
    handleChangeStatue(values);
  }

  handleLastGameAdded() {
    const { listGamesLib } = this.props;
    if (listGamesLib && listGamesLib.length > 0) {
      const lastGameInfo = listGamesLib[0];
      this.setState({
        isThereIsGame: true,
        lastGameName: lastGameInfo.title,
        lastGameRating: lastGameInfo.rating,
        lastGameImg: [...lastGameInfo.img]
      });
    } else {
      this.setState({
        lastGameName: "Ajouter d'abord un jeu",
        lastGameImg: '/img/20200410190035_1.jpg',
        isThereIsGame: false
      });
    }
  }

  removeGameFromHeader() {
    const { gameToRemove } = this.props;
    const { lastGameName } = this.state;
    gameToRemove(lastGameName);
    this.handleLastGameAdded();
  }

  render() {
    const { lastGameName, lastGameImg, lastGameRating, isThereIsGame } = this.state;

    const { listGamesLib } = this.props;

    const test = listGamesLib.find(game => game.title === lastGameName);

    if (isThereIsGame) {
      return (
        <div className="headerContainer" style={{ backgroundImage: `url(${lastGameImg[0]})` }}>
          <div className="filter">
            <div className="gameSugg">
              <div style={{ backgroundImage: `url(${lastGameImg[0]})` }} />
            </div>

            <div className="wrapper">
              <div className="infoHeaderContainer">
                <h2>{lastGameName}</h2>
              </div>

              <div className="infoHeaderContainer">
                <div className="ratingSuggestion">
                  <DisplayRating rating={lastGameRating} />
                </div>
              </div>
              <div className="infoHeaderContainer blue">
                <div className="crossContainer" onClick={() => this.removeGameFromHeader()}>
                  <img src="./img/svg/delete-white.svg" alt="bouton plus" />
                </div>
              </div>

              <div className="infoHeaderContainer blue">
                <label htmlFor="gameStatusHeader">
                  <select
                    name="statuts"
                    className="statuts"
                    onChange={this.getSelectValue}
                    defaultValue={test ? test.status : 'Statuts'}
                  >
                    <option value="Statuts">STATUTS</option>
                    <option value="Pas commencé">Pas commencé</option>
                    <option select value="En cours">
                      En cours
                    </option>
                    <option value="Terminé">Terminé</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="headerContainer" style={{ backgroundImage: `url(${lastGameImg})` }}>
        <div className="filter">
          <img src="./img/svg/logo.svg" alt="logo du site" />
          <h1>{lastGameName}</h1>
        </div>
      </div>
    );
  }
}

HeaderLib.propTypes = {
  listGamesLib: PropTypes.arrayOf(PropTypes.string).isRequired,
  gameToRemove: PropTypes.func.isRequired
};
