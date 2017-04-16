import React from 'react'
import {Text, View, ScrollView, Image, CameraRoll, StyleSheet, AppRegistry, Alert, TouchableHighlight, AlertIOS} from  'react-native'
import RoundedButton from '../../App/Components/RoundedButton'
import {create} from 'apisauce'
import ImagePicker from 'react-native-image-picker'

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',

  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

const db = create({
  baseURL: 'http://138.197.149.10',
  headers: {'Accept': 'application/json'}
})

export default class PresentationScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      images: [],
      isCameraLoaded: false,
      avatarSource: null,
      queries: []
    };
    this.id = 0;
  }

  //Pretty sure we do not need this. Unless we plan on displaying the previous 5 ourselves
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
        console.log(error);
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

  /**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info below in README)
 */
  selectImage() {
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

  uploadImage() {
      console.log("error");
  }


  onPressButtonGet() {
      db.get('/test')
      .then(function (response) {
          console.log(response);
      })
      .catch((error) => console.log("ERROR",error))
  }

  replaceItemInList(item, newItem, list) {
    var newList = list.slice(0, list.indexOf(item));
    newList.push(newItem);
    newList = newList.concat(list.slice(list.indexOf(item) + 1));
    return newList;
  }

  startPooling(query) {
    var that = this;

    db.setHeaders({
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    })

    var data = new FormData();
    data.append('authToken', 'wb7J1G536cI2yvm');
    data.append('id', query.item_id);
    db.get('/polka.php', data)
      .then((response) => {
        var _query = {
          image: query.photo,
          state: response.data.status,
          amount: response.data.amount,
          coins: response.data.coins,
          item_id: query.item_id,
          key: query.key
        };
        if (response.data.status !== 1) {
          _query.amount = null;
          setTimeout(function () {
            that.startPooling(_query);
          }, 3000);
        }
        that.setState({
          queries: that.replaceItemInList(query, _query, that.state.queries)
        });

      })
      .catch((error) => console.log("ERROR",error))
  }


  onPressButtonPost() {

    var that = this;

    db.setHeaders({
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    })

    var photo = {
      uri:  this.state.avatarSource.uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };

    var data = new FormData();
    data.append('authToken', 'wb7J1G536cI2yvm');
    data.append('photo', photo);
    data.append('title', 'A beautiful photo!');

    var id = this.id;
    this.id ++;
    var queries = this.state.queries;
    var query = {
      image: photo,
      state: 0,
      amount: null,
      item_id: id,
      key: id
    };
    queries = queries.concat(query);

    that.setState({
      queries: queries,
      avatarSource: null
    });
    db.post('/urload.php', data)
    .then((response) => {
      var _query = {
        image: photo,
        state: 0,
        amount: null,
        item_id: id,
        key: id
      };
      that.setState({
        queries: this.replaceItemInList(query, _query, that.state.queries)
      });
      query = _query;
      that.startPooling(_query);
    })
    .catch((error) => console.log("ERROR",error))


    // fetch("https://138.197.149.10/urload.php", {
    //         method: 'POST',
    //         headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'multipart/form-data',
    //           },
    //           body: data
    //       })
    // .then((response) => response.json())
    // .then((responseData) => {
    //     AlertIOS.alert(
    //         "POST Response",
    //         "Upload Test -> " + JSON.stringify(responseData)
    //       )
    // })
    // .done();

  }

  render() {

    var rows = [];
    for (var i = 0 ; i < this.state.queries.length ; i ++) {
      rows.push(<Text key="{this.state.queries[i].key}">id: {this.state.queries[i].item_id} amount:{this.state.queries[i].amount}</Text>);
    }

    return (
      <View style={styles.container}>


        <Image source={this.state.avatarSource} style={styles.image} />

        <RoundedButton text="Select Image" onPress = {this.selectImage.bind(this)} />

        <RoundedButton text="Upload Image" onPress = {this.onPressButtonPost.bind(this)} isDisabled={this.state.avatarSource ? false : true} />

        {rows}


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
    width:400,
    height:200,
    margin: 10,
  },
});

AppRegistry.registerComponent('styles', () => styles)
