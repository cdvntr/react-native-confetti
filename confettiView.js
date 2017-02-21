import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Animated
} from 'react-native';

import Confetti from "./confetti.js";

const defaultColors = [
  "rgb(242.2, 102, 68.8)",
  "rgb(255, 198.9, 91.8)",
  "rgb(122.4, 198.9, 163.2)",
  "rgb(76.5, 193.8, 216.7)",
  "rgb(147.9, 99.4, 140.2)"
];

class ConfettiView extends Component {
  constructor(props) {
      super(props);
      this.state = {confettis: []};
      this.confettiIndex = 0;
  }

  startConfetti() {
       let {confettis} = this.state;
       let {confettiCount, timeout} = this.props;
       if(this.confettiIndex < confettiCount) {
         setTimeout(() => {
           confettis.push({key: this.confettiIndex});
           this.confettiIndex++;
           this.setState({confettis});
           this.startConfetti();
         }, timeout);
       }
  }

  removeConfetti(key) {
       let {confettis} = this.state;
       let {confettiCount} = this.props;
       let index = confettis.findIndex(confetti => {return confetti.key === key});
       confettis.splice(index, 1);
       this.setState({confettis});
       if(key === confettiCount - 1) {
         this.confettiIndex = 0;
       }
  }

  render() {
       let {confettis} = this.state;
       let {...otherProps} = this.props
       let colors = this.props.colors || defaultColors;
       return <View style={styles.container}>
         {confettis.map(confetti => {
             return <Confetti key={confetti.key} index={confetti.key} onComplete={this.removeConfetti.bind(this, confetti.key)} colors={colors} {...otherProps}/>
         })}
       </View>
  }
}

ConfettiView.defaultProps = {
   confettiCount: 100,
   timeout: 30
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  }
});

export default ConfettiView;
