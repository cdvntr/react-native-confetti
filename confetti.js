import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions
} from 'react-native';

let windowHeight = Dimensions.get('window').height;
let windowWidth = Dimensions.get('window').width;

class Confetti extends Component {
  constructor(props) {
      super(props);
      this._yAnimation = new Animated.Value(0);
      this.color = this.randomColor(this.props.colors);
      this.left = this.randomValue(0, windowWidth);
      let rotationOutput = this.randomValue(-220, 220) + 'deg';
      this._rotateAnimation = this._yAnimation.interpolate({
        inputRange: [0, windowHeight / 2, windowHeight],
        outputRange: ['0deg', rotationOutput, rotationOutput]
      });

      let xDistance = this.randomIntValue((windowWidth / 3 * -1), windowWidth / 3);
      this._xAnimation = this._yAnimation.interpolate({
        inputRange: [0, windowHeight],
        outputRange: [0, xDistance]
      });
  }

  componentDidMount() {
      let {duration, index} = this.props;
        Animated.timing(this._yAnimation, {
           duration: duration + this.randomIntValue(duration * .2, duration * -.2),
           toValue: windowHeight + 1.25,
           useNativeDriver: true
        }).start(this.props.onAnimationComplete);
  }

  getTransformStyle() {
      return {
         transform: [
           {translateY: this._yAnimation},
           {translateX: this._xAnimation},
           {rotate: this._rotateAnimation}
         ]
      }
  }

  getConfettiStyle() {
      let {index, size, bsize} = this.props;
      let bigConfetti = {
        height: 5.5*size,
        width: 11*size,
        borderBottomLeftRadius: 5*bsize,
        borderBottomRightRadius: 5*bsize,
        borderTopLeftRadius: 2.6*bsize,
        borderTopRightRadius: 2.6*bsize
      };
      let smallConfetti = {
        height: 4.5*size,
        width: 8*size,
        borderBottomLeftRadius: 2.5*bsize,
        borderBottomRightRadius: 2.5*bsize,
        borderTopLeftRadius: 1.3*bsize,
        borderTopRightRadius: 1.3*bsize
      }
      return index % 5 === 0 ? smallConfetti : bigConfetti;
  }

  randomValue(min, max) {
      return Math.random() * (max - min) + min;
  }

  randomIntValue(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
  }

  randomColor(colors) {
      return colors[this.randomIntValue(0,colors.length)];
  }

  render() {
      let {left, ...otherProps} = this.props;
      return <Animated.View style={[styles.confetti, this.getConfettiStyle(), this.getTransformStyle(), {marginLeft: this.left, backgroundColor: this.color}]} {...otherProps}/>
  }
}

Confetti.defaultProps = {
    duration: 6000,
    colors: [
      "rgb(242.2, 102, 68.8)",
      "rgb(255, 198.9, 91.8)",
      "rgb(122.4, 198.9, 163.2)",
      "rgb(76.5, 193.8, 216.7)",
      "rgb(147.9, 99.4, 140.2)"
    ],
    size: 1,
    bsize: 1
}

const styles = StyleSheet.create({
  confetti: {
    position: 'absolute',
    marginTop: 0
  }
});

export default Confetti;
