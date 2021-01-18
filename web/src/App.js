import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import Routes from './routes/index';
import * as ACTION from './store/actions/action';
import LoadingOverlay from 'react-loading-overlay';
import SyncLoader from 'react-spinners/SyncLoader';

class App extends Component {
  constructor() {
    super();

  }
  render() {

    return (
      <div className="App">
        <Suspense fallback={null}>
          <LoadingOverlay
            active={false}
            spinner={<SyncLoader color={'#00BE00'} size={20} sizeUnit={'px'} />}>
            <Routes />
          </LoadingOverlay>
        </Suspense>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    returnedInitRedux: state.returnedInitReducer.initState,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeInitReduxTrue: () => dispatch(ACTION.IS_INITIAL_REDUX)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);