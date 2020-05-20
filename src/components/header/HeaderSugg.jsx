import React from 'react';
import './header.scss';
import PropTypes from 'prop-types';
import DisplayRating from '../contents/my-games/DisplayRating';

class HeaderSugg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.games[0].url[0],
      name: this.props.games[0].name,
      rating: this.props.games[0].rating,
      id: this.props.games[0].id
    };
    this.AddGameToLibrary = this.AddGameToLibrary.bind(this);
    this.removeDataGame = this.removeDataGame.bind(this);
  }

  AddGameToLibrary() {
    const { id, name: title, url: img, rating, platformsName } = this.state;
    const values = {
      addingDate: new Date(),
      id,
      title,
      img,
      rating,
      platformsName,
      addToLib: true,
      addToWish: false
    };
    const { handleGamesList } = this.props;
    handleGamesList(values);
  }

  removeDataGame() {
    const { id, name: title, url: img, rating, platformsName } = this.state;
    const values = {
      addingDate: new Date(),
      title,
      img,
      rating,
      id,
      platformsName,
      addToLib: false,
      addToWish: false
    };

    const { handleremoveDataGame } = this.props;
    handleremoveDataGame(values);
  }

  render() {
    const { url, name, rating } = this.state;

    let isAddToLib;
    if (this.props.listGamesLib) {
      const newAr = this.props.listGamesLib.filter(game => game.title === name);
      isAddToLib = newAr.length > 0 && newAr[0].addToLib;
    }
    if (this.props.listGamesLib === undefined) {
      isAddToLib = false;
    }

    return (
      <div className="HeaderSugg" style={{ backgroundImage: `url(${url})` }}>
        <div className="filter">
          <div className="gameSugg">
            <div style={{ backgroundImage: `url(${url})` }}>
              <button
                className="crossContainerSugg"
                type="button"
                onClick={isAddToLib ? this.removeDataGame : this.AddGameToLibrary}
                style={{ color: 'black' }}
              >
                <img
                  src="./img/svg/add.svg"
                  alt="bouton plus"
                  style={
                    isAddToLib ? { transform: 'rotate(45deg)' } : { transform: 'rotate(0deg)' }
                  }
                />
              </button>
            </div>
          </div>

          <div>
            <div className="infoHeaderContainerSugg">
              <div className="ratingSuggestion">
                <DisplayRating rating={rating} />
              </div>
              <h1>Notre suggestion</h1>

              <h2>{name}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HeaderSugg.propTypes = {
  games: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleGamesList: PropTypes.func.isRequired
};

export default HeaderSugg;
