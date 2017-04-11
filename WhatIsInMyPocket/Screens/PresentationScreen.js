import React from 'react'
import {Text, View, ScrollView, Image, CameraRoll, StyleSheet, AppRegistry, Alert} from  'react-native'
import RoundedButton from '../../App/Components/RoundedButton'


var ImagePicker = require('react-native-image-picker');

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',

  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};


export default class PresentationScreen extends React.Component {
    

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info below in README)
 */
selectImage = () => {
  ImagePicker.showImagePicker(options, (response) => {


    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      let source = { uri: response.uri };

      this.setState({
        avatarSource: source
      });
    }
  });
}



  constructor(props){
    super(props)
    this.state = {
      images: [],
      isCameraLoaded: false
    };
  }

  componentWillMount() {
    CameraRoll.getPhotos({first: 5}).then(
      (data) =>{
        const assets = data.edges;
        const images = assets.map((asset) => asset.node.image);
        this.setState({
          isCameraLoaded: true,
          images: images
        })
      },
      (error) => {
        console.warn(error);
      }
    );
  }


  storeImages(data) {
    const assets = data.edges;
    const images = assets.map((asset) => asset.node.image);
    this.setState({
      images: images,
    });
  }

  logImageError(err) {
    console.log(err);
  }

  render() {
    return (
      <View style={styles.container}>

          
        <Image source={this.state.avatarSource} style={styles.image} />
          
          <RoundedButton onPress={this.selectImage}>
            Select Image
          </RoundedButton>

          <RoundedButton onPress = {() => Alert.alert(
            'Alert Title',
            "Test Alert Message",
          )}>
            Upload Image
          </RoundedButton>
          

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf5fb',
    marginTop: 20
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  image: {
    width: 355,
    height: 400,
    margin: 10,
  },
});

AppRegistry.registerComponent('styles', () => styles)