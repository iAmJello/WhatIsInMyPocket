'use strict'

import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  infoPage: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    flex: 1,
    backgroundColor: Colors.moneyBG,
    marginTop: 50
  },
  innerContents: {
    flexDirection: 'row'
  },
  textContents: {
    flex: 80,
    overflow: 'hidden'
  },
  name: {
    color: 'white',
    paddingLeft: 10,
    fontSize: 30
  },
  centerImage: {
    alignItems: 'center',
    marginTop: 10,
  },
  coinType: {
    color: 'white',
    paddingLeft: 40,
    fontSize: 18
  },
  outter: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5
  }
})
