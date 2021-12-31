import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class RelicItem extends React.Component {
    render() {
        return (
            <div className="relic-item">
                <p>Relic {this.props.value}</p>
            </div>
        )
    }
}

class RelicList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {relicList: []}
    }

    fetchData() {
        console.log("fetching relic data")
        const URL='http://localhost:3000/item?n=10'

        fetch(URL)
        .then(data => { return data.json() })
        .then(res=> {
	        console.log(res)
	        this.setState({...this.state, relicList: res})
        })
        .catch(error => { console.error(error) })

    }
   renderRelic(i) {
        return <RelicItem value={i} />
   }

   componentDidMount() {
          this.fetchData();
   }
  render() {
    console.log(this.state)
    return (
      <div className="relic-list-container">
         <ul className="relic-list">
            {this.state.relicList.map(function(name, index) {
                return <li key={index} className="relic-list-item">{name}</li>
            })}
        </ul>

      </div>
    );
  }
}


// ========================================

ReactDOM.render(
  <RelicList />,
  document.getElementById('root')
);
