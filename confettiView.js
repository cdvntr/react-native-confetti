import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Confetti from "./confetti.js";

class ConfettiView extends Component {
  state = { confettis: [] };

  _timeout = null;
  confettiIndex = 0;
  shouldStop = false;

  componentDidMount() {
    if (this.props.startOnLoad) {
      this.startConfetti();
    }
  }

  componentWillUnmount() {
    this.stopConfetti();

    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  startConfetti = onComplete => {
    const { confettis } = this.state;
    const { confettiCount, timeout, untilStopped } = this.props;

    this.shouldStop = false;

    if (untilStopped || this.confettiIndex < confettiCount) {
      this._timeout = setTimeout(() => {
        if (this.shouldStop) {
          return;
        }

        confettis.push({ key: this.confettiIndex });
        this.confettiIndex++;

        if (onComplete) {
          this.setState({ onComplete });
        }

        this.setState({ confettis });
        this.startConfetti();
      }, timeout);
    }
  };

  stopConfetti = () => {
    const { onComplete } = this.state;

    this.shouldStop = true;
    this.confettiIndex = 0;

    if (onComplete && typeof onComplete === "function") {
      onComplete();
    }

    this.setState({ confettis: [], onComplete: null });
  };

  _removeConfetti = key => {
    const { confettis, onComplete } = this.state;
    const { confettiCount } = this.props;

    const index = confettis.findIndex(confetti => confetti.key === key);

    confettis.splice(index, 1);
    this.setState({ confettis });

    if (key === confettiCount - 1) {
      this.confettiIndex = 0;
    }

    if (
      confettis.length === 0 &&
      onComplete &&
      typeof onComplete === "function"
    ) {
      onComplete();
    }
  };

  render() {
    const { confettis } = this.state;
    const { colors } = this.props;

    return (
      <View style={styles.container}>
        {confettis.map(confetti => {
          return (
            <Confetti
              key={confetti.key}
              index={confetti.key}
              onAnimationComplete={() => this._removeConfetti(confetti.key)}
              colors={colors}
              {...this.props}
            />
          );
        })}
      </View>
    );
  }
}

ConfettiView.defaultProps = {
  confettiCount: 100,
  timeout: 30,
  untilStopped: false
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  }
});

export default ConfettiView;
