import React from 'react'
import { View, Animated, Dimensions, StyleSheet } from 'react-native'
import pt from 'prop-types'

import { PercentString } from '../../utilities'

const { width: windowWidth } = Dimensions.get('window')

class SimpleShimmer extends React.Component {

  state = {
    shimmerPosition: new Animated.Value(0),
    shimmerStartPosition: -(windowWidth),
    shimmerEndPosition: -(windowWidth),
    shimmerWidth: 0,
    containerWidthInPx: 0,
  }

  componentDidMount = () => {
    this.moveShimmer()
  }

  moveShimmer = () => {
    const { shimmerPosition, shimmerStartPosition, shimmerEndPosition, shimmerOpacity } = this.state
    shimmerPosition.setValue(shimmerStartPosition)
    Animated.timing(shimmerPosition, {
      useNativeDriver: true,
      toValue: shimmerEndPosition,
      duration: 1000,
      delay: 500,
    }).start(this.moveShimmer)
  }

  onShimmerLayout = ({ nativeEvent }) => {
    const { width: shimmerWidth } = nativeEvent.layout
    this.setState({ shimmerWidth })
  }

  onContainerLayout = ({ nativeEvent }) => {
    const { width: containerWidthInPx, x: containerStartPosition } = nativeEvent.layout
    const { shimmerWidth } = this.props
    const shimmerWidthInNumbers = Number(/\d+/.exec(shimmerWidth)[0])
    const shimmerEndPosition = containerWidthInPx
    const shimmerStartPosition = -((containerWidthInPx / 100) * shimmerWidthInNumbers)
    this.setState({
      shimmerStartPosition,
      shimmerEndPosition,
      shimmerColor: '#ddd',
      containerStartPosition,
      containerWidthInPx
    })
  }

  render() {
    const { shimmerPosition, shimmerColor } = this.state
    const { shimmerWidth, containerWidth } = this.props
    return (
      <View
        style={[styles.container, { width: containerWidth, overflow: 'hidden' }]}
        onLayout={this.onContainerLayout}
      >
        <Animated.View
          onLayout={this.onShimmerLayout}
          style={{
            transform: [{ translateX: shimmerPosition }],
            width: shimmerWidth,
            backgroundColor: shimmerColor,
            opacity: 0.35,
            height: '100%',
          }}>
        </Animated.View>
      </View >
    )
  }
}

SimpleShimmer.propTypes = {
  containerWidth: PercentString,
  shimmerWidth: PercentString,
  duration: pt.number,
  delay: pt.number,
}

SimpleShimmer.defaultProps = {
  containerWidth: '100%',
  shimmerWidth: '35%',
  duration: 1000,
  delay: 1000,
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#EFEFEF',
    borderWidth: 2,
  },
})

export default SimpleShimmer
