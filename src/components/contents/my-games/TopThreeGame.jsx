import React from 'react';
import PropTypes from 'prop-types';
import DisplayRating from './DisplayRating';
import './MyGameCard.scss';

function TopThreeGame(props) {
  const {
    name,
    url,
    rating,
    id,
    listGamesLib,
    artworksUrl,
    genresName,
    handleRemoveWishlistGame,
    handleWishlistGame,
    handleremoveDataGame,
    handleGamesList,
    platformsName,
    url: img,
    name: title
  } = props;

  const addToWishlist = () => {
    const values = {
      addingDate: new Date(),
      title,
      img,
      artworksUrl,
      genresName,
      rating,
      id,
      platformsName,
      addToLib: false,
      addToWish: true
    };
    handleWishlistGame(values);
  };

  const removeToWishlist = () => {
    const values = {
      addingDate: new Date(),
      title,
      img,
      artworksUrl,
      genresName,
      rating,
      id,
      platformsName,
      addToLib: false,
      addToWish: false
    };
    handleRemoveWishlistGame(values);
  };

  const removeDataGame = () => {
    const values = {
      addingDate: new Date(),
      title,
      img,
      rating,
      artworksUrl,
      genresName,
      id,
      platformsName,
      addToLib: false,
      addToWish: false
    };
    handleremoveDataGame(values);
  };

  const getDataGame = () => {
    const values = {
      addingDate: new Date(),
      title,
      img,
      rating,
      artworksUrl,
      genresName,
      id,
      platformsName,
      addToLib: true,
      addToWish: false
    };
    handleGamesList(values);
  };

  let isAddToLib;
  if (listGamesLib) {
    const newAr = listGamesLib.filter(game => game.title === props.name);
    isAddToLib = newAr.length > 0 && newAr[0].addToLib;
  }
  if (listGamesLib === undefined) {
    isAddToLib = false;
  }

  let isWish;
  if (listGamesLib) {
    const newAr = listGamesLib.filter(game => game.title === props.name);
    isWish = newAr.length > 0 && newAr[0].addToWish;
  }
  if (listGamesLib === undefined) {
    isWish = false;
  }

  return (
    <div className="card" style={{ backgroundImage: `url('${url[0]}')` }}>
      <div className="container">
        <div className="header">
          <div className="title-card">
            <h3>{name}</h3>
          </div>
          <div className="group">
            <div className="wishlist" onClick={isWish ? removeToWishlist : addToWishlist}>
              <img
                src={isWish ? '/img/svg/redheart.svg' : '/img/svg/wishlist.svg'}
                alt="icon wishlist"
              />
            </div>
            <button
              className="add"
              type="submit"
              onClick={isAddToLib ? removeDataGame : getDataGame}
            >
              <img
                src="/img/svg/add.svg"
                alt="icon add"
                style={
                  isAddToLib
                    ? { transform: 'rotate(45deg)', transition: 'all 0.4s ease' }
                    : { transform: 'rotate(0deg)', transition: 'all 0.4s ease' }
                }
              />
            </button>
          </div>
        </div>
        <div className="footer">
          <DisplayRating rating={rating} />
        </div>
      </div>
    </div>
  );
}

TopThreeGame.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.arrayOf(PropTypes.string).isRequired,
  rating: PropTypes.number.isRequired,
  handleWishlistGame: PropTypes.func.isRequired,
  platformsName: PropTypes.arrayOf(PropTypes.string).isRequired,
  listGamesLib: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleRemoveWishlistGame: PropTypes.func.isRequired,
  handleremoveDataGame: PropTypes.func.isRequired,
  handleGamesList: PropTypes.func.isRequired
};

export default TopThreeGame;
