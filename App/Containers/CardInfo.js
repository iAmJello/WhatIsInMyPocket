import React from 'react'
import { Image, ScrollView, View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/CardInfoStyle'

export default class CardInfo extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      width: 0,
      height: 0
    }
  }


  render () {
    var cardStyle = styles.infoPage
    var amountVal = 0
    return (
      <ScrollView style={cardStyle}>
        <View style={styles.centerImage}>
          <Image source={this.props.image} resizeMode={Image.resizeMode.contain} style={styles.coinImage} /> 
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
      </ScrollView>
    )
  }
}
