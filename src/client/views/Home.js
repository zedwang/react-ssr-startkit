import React from 'react';
import { connect } from 'react-redux';
import { For } from 'react-loops';

class Home extends React.Component {

    loadData = () => {
        this.props.fetchData();
    }

    render() {
        const {data} = this.props;
        return (<>
            <h1>Welcome, boy or girl from china</h1>
            <div>Hi! You will?</div>
            <div><button onClick={this.loadData}>fetch repos</button></div>
            <ul>
                <For of={data} as={item => 
                    <li>{item.name}</li>
                }>
                </For>
            </ul>

            </>
        );
    }
}
Home.serverFetch = {type: 'repos/fetchData'};

const mapStateToProps = (state) => ({
    data: state.repos
});

const mapDispatchToProps = dispath => ({
    fetchData: () => dispath.repos.fetchData()
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);