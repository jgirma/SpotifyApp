import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import TopAnalyzer from "./TopAnalyzer";
import logo from "./spotify-logo.svg";
import "./App.css";
import Spotify from 'spotify-web-api-js'
import {determinePopularity} from './helpers/helpers'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'

const spotifyApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      hipsterScore: 0,
      popularities: [0, 0],
      tracksData: [{
        name: "",
        artists: [{ name: ""}],
        popularity: 0,
      }],
      artistsData: [{
        name: "",
        popularity: 0,
      }]
    };

    this.getTopTracks = this.getTopTracks.bind(this);
    this.getTopArtists = this.getTopArtists.bind(this);
    this.tick = this.tick.bind(this);
  }



  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.getTopTracks(_token);
      this.getTopArtists(_token);
    }

    // set interval for polling every 5 seconds
    this.interval = setInterval(() => this.tick(), 500000);
  }

  componentWillUnmount() {
    // clear the interval to save resources
    clearInterval(this.interval);
  }

  tick() {
    if(this.state.token) {
      this.getTopTracks(this.state.token);
      this.getTopArtists(this.state.token);
    }
  }

  getTopTracks(token) {
    spotifyApi.setAccessToken(token);
    spotifyApi.getMyTopTracks()
    .then((data) => {
      console.log(data);
      this.setState({
        tracksData: data.items
      });
    })
  }
  getTopArtists(token) {
    spotifyApi.setAccessToken(token);
    spotifyApi.getMyTopArtists()
    .then((response) => {
      console.log(response);
      this.setState({
        artistsData: response.items
      });
    })
  }

  render() {
    console.log(this.state.popularities);
    return (
      <div>
        <header className="App-header">
          <h1>Hipster Check</h1>
          <FontAwesomeIcon icon={faSpotify} />
          {!this.state.token && (
            <div style={{textAlign: "center"}}>
            <p>The application that shows you how popular your taste in music is.</p>
            <Button variant="secondary" href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
              "%20"
            )}&response_type=token&show_dialog=true`}>Login to Spotify</Button>{''}
            </div>
          )}
          {this.state.token && (
            <TopAnalyzer
              tracksData = {this.state.tracksData}
              artistsData = {this.state.artistsData}
              hipsterScore = {determinePopularity(this.state.tracksData, this.state.artistsData)[0]}
              popularities = {determinePopularity(this.state.tracksData, this.state.artistsData)[1]}
            />
          )}
        </header>
      </div>
    );
  }
}

export default App;
