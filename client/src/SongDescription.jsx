import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// ----------------------------------------- //

class SongDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: null
    }
    this.updateDescription = this.updateDescription.bind(this);
    this.getIdAndUpdateDOM = this.getIdAndUpdateDOM.bind(this);
  }

  updateDescription(data) {
    console.log('Here is the data sent to updateDescription: ', data);
    this.setState({
      description: data.description
    });
  }

  getIdAndUpdateDOM() {
    let songId = window.location.pathname.split('/')[1];
    console.log(songId);
    if (songId.includes('loaderio')) {
      axios.get(`/loaderio-c443a15423d233e72430ab682a5adfd0`)
        .then((response) => {
          console.log('Sending file to loaderIo');
        })
        .catch((err) => {
          console.log('Error sending file to loaderIo');
        })
    } else {
      let songIdWithDefault = (songId > 0) ? songId : ["123"];
      console.log('Song ID: ', songId);
      console.log('Song ID with optional Default: ', songIdWithDefault);
      axios.get(`/songDescription/${songIdWithDefault}`)
        .then((response) => {
          console.log('Data: ', response.data.data);
          this.updateDescription(response.data.data);
        })
        .catch((error) => {
          console.log('Error rendering initial song description: ', error);
        });
    }
    // let songId = splitUrl.filter(function(id) {
    //   return parseInt(id);
    // });
    // This is giving <!DOCTYPE ...> on load
    // let handleDefaultSongId = (typeof songId === "number") ? songId : ["123"];
  }

  componentDidMount() {
    this.getIdAndUpdateDOM();
  }

  render() {
    return (
      <div className="cam song-description">
        <p className="description"> {this.state.description} </p>
      </div>
    )
  }
}

export default SongDescription;