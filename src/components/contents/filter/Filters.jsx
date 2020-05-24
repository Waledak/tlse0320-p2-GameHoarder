import React from 'react';
import PropTypes from 'prop-types';
import './filter.scss';
import ResearchGame from '../../data/ResearchGame';

function Filters({ value, handleChange, handleAllGames, location }) {
  if (value === null) {
    value = undefined;
  }

  let research = '';
  if (location === 'newgameInputValue') {
    research = (
      <button type="submit">
        <img src="./img/svg/icons8-search.svg" alt="loupe icon" />
      </button>
    );
  }
  return (
    <div className="filter-container">
      <form
        onSubmit={e => ResearchGame(value, handleAllGames, e, handleChange)}
        style={{ display: 'flex' }}
      >
        <div className="input-filter">
          <input
            value={value}
            style={research ? { borderRight: '0' } : {}}
            onChange={handleChange}
            name={location}
            placeholder="ma recherche"
            required
          />
        </div>
        {research}
      </form>
    </div>
  );
}

Filters.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired
};
export default Filters;
