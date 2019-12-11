import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AsyncApp extends Component {
  
  render() {
    const { selectedSubreddit, posts, isFetching, didInvalidate } = this.props;
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { selectedSubreddit, postsBySubreddit } = state;
  const { isFetching, didInvalidate, items: posts } = postsBySubreddit[selectedSubreddit] || { isFetching: true, items: [] }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    didInvalidate
  }
}

export default connect(mapStateToProps)(AsyncApp);
