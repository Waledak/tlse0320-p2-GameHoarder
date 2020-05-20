import React from 'react';
import PropTypes from 'prop-types';
import './MyGameCard';
import Swal from 'sweetalert2';
import DisplayRating from './DisplayRating';
import InfoCard from './InfoCard';

class NewGameCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.getDataGame = this.getDataGame.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.addToWishlist = this.addToWishlist.bind(this);
    this.removeToWishlist = this.removeToWishlist.bind(this);
    this.showInfoGame = this.showInfoGame.bind(this);
    this.removeDataGame = this.removeDataGame.bind(this);
  }

  getDataGame() {
    const {
      url: img,
      name: title,
      rating,
      handleGamesList,
      id,
      genresName,
      platformsName,
      artworksUrl
    } = this.props;
    const values = {
      addingDate: new Date(),
      title,
      img,
      genresName,
      rating,
      artworksUrl,
      id,
      platformsName,
      addToLib: true,
      addToWish: false
    };
    handleGamesList(values);
  }

  addToWishlist() {
    const {
      url: img,
      name: title,
      rating,
      handleWishlistGame,
      id,
      genresName,
      platformsName,
      artworksUrl
    } = this.props;
    const values = {
      addingDate: new Date(),
      title,
      img,
      genresName,
      rating,
      id,
      artworksUrl,
      platformsName,
      addToLib: false,
      addToWish: true
    };
    handleWishlistGame(values);
  }

  removeToWishlist() {
    const {
      url: img,
      name: title,
      rating,
      genresName,
      handleRemoveWishlistGame,
      id,
      artworksUrl,
      platformsName
    } = this.props;
    const values = {
      addingDate: new Date(),
      title,
      img,
      artworksUrl,
      rating,
      id,
      genresName,
      platformsName,
      addToLib: false,
      addToWish: false
    };
    handleRemoveWishlistGame(values);
  }

  showInfoGame() {
    this.setState(state => ({
      show: !state.show
    }));
  }

  hideModal() {
    this.setState({ show: false });
  }

  removeDataGame() {
    const {
      url: img,
      name: title,
      rating,
      genresName,
      id,
      platformsName,
      handleremoveDataGame,
      artworksUrl
    } = this.props;
    const values = {
      addingDate: new Date(),
      title,
      img,
      genresName,
      artworksUrl,
      rating,
      id,
      platformsName,
      addToLib: false,
      addToWish: false
    };
    handleremoveDataGame(values);
  }

  render() {
    const {
      rating,
      name,
      url,
      addToWish,
      platformsName,
      genresName,
      summary,
      artworksUrl,
      listGamesLib
    } = this.props;
    const { show } = this.state;

    let isAddToLib;
    if (listGamesLib) {
      const newAr = listGamesLib.filter(game => game.title === name);
      isAddToLib = newAr.length > 0 && newAr[0].addToLib;
    }
    if (listGamesLib === undefined) {
      isAddToLib = false;
    }

    let isWish;
    if (listGamesLib) {
      const newAr = listGamesLib.filter(game => game.title === name);
      isWish = newAr.length > 0 && newAr[0].addToWish;
    }
    if (listGamesLib === undefined) {
      isWish = false;
    }

    return (
      <div className="Card">
        <InfoCard
          show={show}
          handleClose={this.hideModal}
          name={name}
          url={url}
          rating={rating}
          platformsName={platformsName}
          genresName={genresName}
          artworksUrl={artworksUrl}
          summary={summary}
        />

        <div
          className="ImageCard"
          style={{ backgroundImage: `url(${url[0]})` }}
          onClick={addToWish ? this.hideModal : this.showInfoGame}
        />
        <div className="GameInfo">
          <div className="GameInfoTitle">
            <div>
              <div className="NameWish">
                <h3 className="GameName" onClick={this.showInfoGame}>
                  {name}
                </h3>
                <button
                  type="button"
                  onClick={isWish || addToWish ? this.removeToWishlist : this.addToWishlist}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={isWish || addToWish ? '/img/svg/redheart.svg' : '/img/svg/wishlist.svg'}
                    alt="icon wishlist"
                  />
                </button>
              </div>

              <p className="GameSupport">
                {platformsName
                  .map(platform => `${platform}/`)
                  .join('')
                  .slice(0, -1)}
              </p>
            </div>

            <div className="ratingSuggestion">
              <DisplayRating rating={rating} />
            </div>

            <div
              className="ButtonAddLibrary"
              onClick={isAddToLib ? this.removeDataGame : this.getDataGame}
            >
              <img
                src="/img/svg/add.svg"
                alt="icon add or delete library"
                style={
                  isAddToLib
                    ? { transform: 'rotate(45deg)', transition: 'all 0.4s ease' }
                    : { transform: 'rotate(0deg)', transition: 'all 0.4s ease' }
                }
              />
              {isAddToLib ? 'Déjà dans votre bibliothèque.' : 'Ajouter à votre bibliothèque.'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewGameCard.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.arrayOf(PropTypes.string).isRequired,
  platformsName: PropTypes.arrayOf(PropTypes.string).isRequired,
  rating: PropTypes.number.isRequired,
  handleGamesList: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleWishlistGame: PropTypes.string.isRequired,
  handleRemoveWishlistGame: PropTypes.func.isRequired,
  handleremoveDataGame: PropTypes.func.isRequired,
  addToWish: PropTypes.string.isRequired,
  listGamesLib: PropTypes.arrayOf(PropTypes.string).isRequired,
  genresName: PropTypes.arrayOf(PropTypes.string).isRequired,
  artworksUrl: PropTypes.arrayOf(PropTypes.string).isRequired,
  summary: PropTypes.string.isRequired
};

export default NewGameCard;
