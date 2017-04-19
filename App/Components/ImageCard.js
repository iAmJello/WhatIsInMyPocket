import React from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/ImageCardStyle'

export default class ImageCard extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      image: "",
      state: -1,
      amount: 0,
      coins: {},
      item_id: 0,
      key: 0
    }
  }

  componentDidMount () {
    var queryInfo = this.props.queryData
    this.setState({
      image: queryInfo.image,
      state: queryInfo.state,
      amount: queryInfo.amount,
      coins: queryInfo.coins,
      item_id: queryInfo.item_id,
      key: queryInfo.key
    })
  }

  componentWillReceiveProps(nextProps){
    var queryInfo = nextProps.queryData
    this.setState({
      image: queryInfo.image,
      state: queryInfo.state,
      amount: queryInfo.amount,
      coins: queryInfo.coins,
      item_id: queryInfo.item_id,
      key: queryInfo.key
    })
  }

  cardClick () {
    var propsObj = {
      image: this.state.image,
      state: this.state.state,
      amount: this.state.amount,
      coins: this.state.coins,
      item_id: this.state.item_id,
      image_key: this.state.key
    }
    this.props.onClick(propsObj)
  }

  render () {
    var disVar = true
    var cardStyle = styles.imagePro
    if (this.state.state === 0 && (this.state.amount !== 0 && this.state.amount !== null)) {
      cardStyle = styles.imageDone
      disVar = false
    }

    var amountVal
    if(this.state.amount === null){
      amountVal = "Processing..."
    } else {
      amountVal = "Amount: " + this.state.amount
    }

    return (
      <TouchableOpacity onPress={this.cardClick.bind(this)} style={styles.outter} disabled={disVar}>
        <View style={cardStyle}>
          <View style={styles.innerContents}>
            <View style={styles.textContents}>
              <Text style={styles.amount}>{amountVal}</Text>
              <Text style={styles.id}>Id: {this.state.item_id}</Text>
            </View>
            {/* pictures do not yet exist so this may be removed */}
            <Image source={{uri: this.state.image.uri}} style={styles.moneyPicture} /> 
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

// Options should be an object with name and value inside of it
// ex {"name": x, "value": y}
ImageCard.propTypes = {
  queryData: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired,
}