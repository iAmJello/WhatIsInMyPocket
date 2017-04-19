'use strict'

import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  imageDone: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: Colors.success
  },
  imagePro: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: Colors.waiting
  },
  innerContents: {
    flexDirection: 'row'
  },
  textContents: {
    flex: 80,
    overflow: 'hidden'
  },
  amount: {
    color: 'white',
    paddingLeft: 10,
    fontSize: 30
  },
  moneyPicture: {
    marginRight: 10,
    width: 80,
    height: 90,
    flex: 12
  },
  id: {
    color: 'white',
    paddingLeft: 10
  },
  outter: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5
  }
})
