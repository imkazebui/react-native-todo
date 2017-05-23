import React from 'react';
import {
  View,
  Text,
  StyleSheet
 } from 'react-native'

import Swipeout from 'react-native-swipeout'

export default function render(baseStyle){

  const buttons = [
    {
      text: 'Done',
      backgroundColor: '#05A5D1',
      underlayColor: '#273539',
      onPress: this.onDonePress.bind(this)
    },
  ]

  return (
    <View style={localStyle.container}>
      <Swipeout
        backgroundColor='#fff'
        right={buttons}
      >
        <View style={[baseStyle.container, localStyle.row]}>
          <Text style={baseStyle .label}>
            ios: {this.props.todo.task}
          </Text>
        </View>
      </Swipeout>
    </View>

  )
}

const localStyle = StyleSheet.create({
  row: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  container: {
    marginBottom: 20,
  }
})
