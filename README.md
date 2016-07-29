# react-native-confetti

<p align="center">
  <img src="./demo.gif" width="320" height="282">
</p>

## Installation

```sh
npm i -S react-native-confetti
```

## Use

```javascript
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

import Confetti from 'react-native-confetti';

class Example extends Component {
  componentDidMount() {
    if(this._confettiView) {
       this._confettiView.startConfetti();
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
`timeout`        | `Number` |  30      | Timeout between confettis
`duration`       | `Number` |  6000 ms | Duration until a conffetti reaches the bottom
