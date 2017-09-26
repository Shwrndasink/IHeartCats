import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      baseUrl: `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=bbae3a0126cc200ebac8a1c275f2d773&tags=kittens&format=json&nojsoncallback=1`,
      body: {
        per_page: 20,
        page: 1
      },
      images: []
    }
   this.formatImg = this.formatImg.bind(this);
   this.httpRequest = this.httpRequest.bind(this);
   this.getMoreImages = this.getMoreImages.bind(this);
  }
  getMoreImages = () => {
    let page = this.state.body.page;
    this.setState({page: this.state.body.page++})
    console.log("state", this.state);
    this.httpRequest();
  }
  formatImg(image, index){
    return(
        <img src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_m.jpg`} alt={`${image.title}`} key={index}/>
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
      _this.setState({images: [..._this.state.images, ...response.data.photos.photo]});
      console.log("images", _this.state.images);
    });
  }
  componentWillMount(){
    this.httpRequest();

  }
  render() {
    // console.log(this.state.images[0], "log in reder");
    let images = !this.state.images ? 'loading' : this.state.images.map((i) => {
      console.log('hello');
      return this.formatImg(i);
    });
    return (
      <div className="App">
        <div className="header">I <span role="img" aria-label="heart">❤️</span> Kittens <span role="img" aria-label="kittens">🐱</span></div>
      <div className="body">
        {images}
      </div>
      <button className="loadmore" onClick={this.getMoreImages}>Load More Kittens <span role="img" aria-label="kittens">🐱</span></button>
      </div>
    );
  }
}

export default App;
