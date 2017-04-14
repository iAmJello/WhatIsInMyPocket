import React from 'react'
import { View, Modal } from 'react-native'
import DebugConfig from '../../App/Config/DebugConfig'
import RoundedButton from '../../App/Components/RoundedButton'
import PresentationScreen from './PresentationScreen'


export default class PocketButton extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      avatarSource: null
    }
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render () {
      return (
        <View>
          <RoundedButton onPress={this.toggleModal}>
            Open The App
          </RoundedButton>
          <Modal
            visible={this.state.showModal}
            onRequestClose={this.toggleModal}>
            <PresentationScreen screenProps={{ toggle: this.toggleModal }} />
          </Modal>
        </View>
      )
  }
}
