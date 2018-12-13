import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '75b9b73126384476ab116061562c56d8'
 });
 

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}



class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }


  displayFaceBox = (box) => {
    this.setState({box : box});
    console.log(this.state.box);
  }

  onSubmit = () => {
    this.setState({imageUrl : this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    response => {
      this.displayFaceBox(this.calculateFaceLocation(response)); 
    }
  ).catch(err => console.log(err));
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
    console.log(event.target.value);
  }

  render() {
    return (
      <div className="App">
      <Particles className='particles' params={particlesOptions} />
       <Navigation />
        <Logo />
        <Rank />
     <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
    <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/> 
      </div>
    );
  }
}

export default App;
