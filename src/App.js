import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      baseUrl: `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1b083e6d84f39f1e2ac081f4e0f56378&tags=kittens&format=json&nojsoncallback=1`,
      body: {
        per_page: 20,
        page: 2
      },
      images: []
    }
   this.formatImg = this.formatImg.bind(this);
   this.httpRequest = this.httpRequest.bind(this);
  }
  getMoreImages = () => {
    
  }
  formatImg(image){
    return(
      <img src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_m.jpg`} alt={`${image.title}`} key={`${image.title}`}/>
    )
  }

  httpRequest(){
    let _this = this;
    axios({
      method: 'GET',
      url: `${this.state.baseUrl}&page=${this.state.body.page}&per_page=${this.state.body.per_page}`,
      contentType: 'application/json'
    }).then(function(response){
      console.log(response);
      _this.setState({images: [response.data.photos.photo]});
      console.log("images", _this.state.images);
    });
  }
  componentWillMount(){
    this.httpRequest();

  }
  render() {
    console.log(this.state.images[0], "log in reder");
    let images = !this.state.images[0] ? 'loading' : this.state.images[0].map((i) => {
      console.log('hello');
      return this.formatImg(i);
    });
    return (
      <div className="App">
        <div className="header">I <span role="img" aria-label="heart">❤️</span> Kittens <span role="img" aria-label="kittens">🐱</span></div>

        {images}
      </div>
    );
  }
}

export default App;
