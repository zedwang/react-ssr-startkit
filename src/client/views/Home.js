import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends React.Component {

    render() {
        return (<>
            <h1>home</h1>
            <Link to="/">工作台</Link>
            <Link to="/alerts">风险告警</Link>
            <Link to="/search">资信查询</Link>
            <Link to="/profile">个人中心</Link>
            <Link to="/h5">H5</Link>
            <div>1112222111</div>
            <div>dancer</div>
            <div>dancer</div>
            <div>dancer</div>
            <div>dancer</div>
            <div>dancer</div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default connect(null, null)(Home);