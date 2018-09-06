# react-native-confetti
Raining confetti made with react native animations

<p align="left">
  <img src="./demo.gif" width="320" height="282">
</p>

## Installation

```sh
npm i -S react-native-confetti
```

## Usage

```javascript
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

import Confetti from 'react-native-confetti';

class RNConfetti extends Component {
  componentDidMount() {
    if(this._confettiView) {
       this._confettiView.startConfetti();
    }
  }

  componentWillUnmount ()
  {
      if (this._confettiView)
      {
          this._confettiView.stopConfetti();
      }
  }

  render() {
    return <View style={styles.container}>
      <Confetti ref={(node) => this._confettiView = node}/>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
```

## Props

Property         | Type     | Default  | Description
---              | ---      | ---      | ---
`confettiCount`  | `Number` |  100     | Number of confetti
`timeout`        | `Number` |  30 (ms)     | Timeout between confetti
`untilStopped`   | `Boolean` | false | Render confetti continuously until `stopConfetti()` is called. This ignores `confettiCount`.
`duration`       | `Number` |  6000 (ms) | Duration until a conffetti reaches the bottom
`colors`       | `Array` |  ["rgb(242.2, 102, 68.8)","rgb(255, 198.9, 91.8)","rgb(122.4, 198.9, 163.2)","rgb(76.5, 193.8, 216.7)","rgb(147.9, 99.4, 140.2)"] | Array of color strings to choose from for the confetti
`size`           | `Number` |   1       | Multiplier for size of confetti (width and heigh)
`bsize`           | `Number` |   1       | Multiplier for radius of confetti (border radius)

