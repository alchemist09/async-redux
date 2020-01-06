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

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentDidUpdate(prevProps) {
    if(this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectSubreddit } = this.props;
      dispatch(fetchPostsIfNeeded(selectSubreddit));
    }
  }

  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit));
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit));
  }

  handleRefreshClick(e) {
    e.preventDefault();
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }
  
  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <Picker 
          value={selectedSubreddit} 
          onChange={this.handleChange} 
          options={["cloud computing", "aws"]} 
        />

        <p>
          { lastUpdated && (
            <span>
              Last updated at { new Date(lastUpdated).toLocaleTimeString()}.{' '}
            </span>
          )}
          {
            !isFetching && (
              <button onClick={this.handleRefreshClick}>Refresh</button>
            )
          }
        </p>

        {isFetching && posts.length === 0 && <h2>Loading....</h2>}
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {posts.length > 0 && (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        )}
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
