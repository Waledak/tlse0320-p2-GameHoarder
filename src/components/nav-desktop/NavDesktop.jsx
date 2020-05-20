import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './navDesktop.scss';
import DisplayWishlist from '../contents/my-games/DisplayWishlist';

class NavDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.handleWishlistGame1 = this.handleWishlistGame1.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  handleWishlistGame1() {
    this.setState(state => ({
      show: !state.show
    }));
  }

  hideModal() {
    this.setState({ show: false });
  }

  render() {
    const { show } = this.state;
    const {
      listGamesLib,
      handleRemoveWishlistGame,
      handleWishlistGame,
      handleGamesList
    } = this.props;

    return (
      <div className="navDesktop">
        <div className="logo">
          <img src="./img/svg/logo-black.svg" alt="logo " />
        </div>
        <ul>
          <NavLink to="/ajouter-un-jeu" style={{ outlineStyle: 'none' }}>
            <li>Ajouter un jeu</li>
          </NavLink>
          <NavLink to="/" style={{ outlineStyle: 'none' }}>
            <li>Ma bibliothèque</li>
          </NavLink>
          <DisplayWishlist
            style={{ outlineStyle: 'none' }}
            show={show}
            handleClose={this.hideModal}
            listGamesLib={listGamesLib}
            handleRemoveWishlistGame={handleRemoveWishlistGame}
            handleWishlistGame={handleWishlistGame}
            handleGamesList={handleGamesList}
          />
          <button
            className="btnOpenWishlist"
            type="button"
            onClick={this.handleWishlistGame1}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <img
              src="./img/svg/navWishlist.svg"
              alt="icon wishlist"
              style={{
                width: '30px'
              }}
            />

            {listGamesLib.filter(game => game.addToWish === true).length > 0 ? (
              <div className="countWislist">
                {listGamesLib.filter(game => game.addToWish === true).length}
              </div>
            ) : null}
          </button>
        </ul>
      </div>
    );
  }
}

NavDesktop.propTypes = {
  listGamesLib: PropTypes.string.isRequired,
  handleRemoveWishlistGame: PropTypes.func.isRequired,
  handleGamesList: PropTypes.func.isRequired,
  handleWishlistGame: PropTypes.func.isRequired
};

export default NavDesktop;
