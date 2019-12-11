import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
  selectSubreddit,
  invalidateSubreddit,
  fetchPostsIfNeeded
} from '../actions';

import Picker from '../components/Picker';
import Posts from '../components/Posts';

class AsyncApp extends Component {
  
  render() {
    const { selectedSubreddit, posts, isFetching, didInvalidate } = this.props;
    return (
      <div>
        
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  didIvalidate: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
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
