import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyles'
import NavigationDrawer from './NavigationDrawer'

// screens identified by the router
import CardInfo from '../Containers/CardInfo'
import PresentationScreen from '../../WhatIsInMyPocket/Screens/PresentationScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer'>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene initial key='presentationScreen' component={PresentationScreen} title="What's in my Pocket" />
            <Scene key='cardInfo' component={CardInfo} title='Image Info' />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
