import React from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/ImageCardStyle'

export default class CatCard extends React.Component {

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
      'catId': this.state.petId,
      'access': this.state.access
    }
    this.props.onClick(propsObj)
  }

  render () {
    var cardStyle = styles.catCard
    if (this.state.state !== 0) {
      cardStyle = styles.sharedCatCard
    }

    return (
      <TouchableOpacity onPress={this.cardClick.bind(this)} style={styles.outter}>
        <View style={cardStyle}>
          <View style={styles.innerContents}>
            <View style={styles.textContents}>
              <Text style={styles.name}>Amount: {this.state.amount}</Text>
              <Text style={styles.owner}>Id: {this.state.item_id}</Text>
            </View>
            {/* pictures do not yet exist so this may be removed */}
            <Image source={this.state.image} style={styles.catPicture} /> 
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

// Options should be an object with name and value inside of it
// ex {"name": x, "value": y}
CatCard.propTypes = {
  queryData: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func,
}