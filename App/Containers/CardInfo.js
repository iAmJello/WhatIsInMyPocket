import React from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/CardInfoStyle'

export default class CardInfo extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      width: 0,
      height: 0
    }
  }

  _onLayout(event) {
    console.log("HERE")
    const containerWidth = event.nativeEvent.layout.width;

    Image.getSize(this.props.image.uri, (width, height) => {
      this.setState({
        width: containerWidth / 2,
        height: (containerWidth * height / width) / 2
      });
    });
  }

  render () {
    var cardStyle = styles.infoPage
    var amountVal = 0

    console.log(this.state.height + " " + this.state.width)

    return (
      <View style={cardStyle} onLayout={this._onLayout.bind(this)}>
        <View style={styles.centerImage}>
          <Image source={this.props.image} style={{width: this.state.width, height: this.state.height}} /> 
        </View>
        <View style={styles.innerContents}>
          <View style={styles.textContents}>
            <Text style={styles.name}>Amount: {this.props.amount}</Text>
            <Text style={styles.name}>Coins: </Text>
            <Text style={styles.coinType}>Nickels: {this.props.coins.nickel}</Text>
            <Text style={styles.coinType}>Dimes: {this.props.coins.dime}</Text>
            <Text style={styles.coinType}>Quarters: {this.props.coins.quarter}</Text>
            <Text style={styles.coinType}>Loonies: {this.props.coins.loonie}</Text>
            <Text style={styles.coinType}>Toonies: {this.props.coins.toonie}</Text>
            
          </View>
        </View>
      </View>
    )
  }
}
