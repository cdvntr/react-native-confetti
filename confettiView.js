import React, { Component } from "react";
import {
	AppRegistry,
	StyleSheet,
	View,
	Animated,
	Dimensions
} from "react-native";

import Confetti from "./confetti.js";

let windowHeight = Dimensions.get("window").height;
let windowWidth = Dimensions.get("window").width;

class ConfettiView extends Component {
	constructor(props) {
		super(props);
		this.state = { confettis: [], width: windowWidth, height: windowHeight };
		this.confettiIndex = 0;
		this.shouldStop = false;
		this.unmounted = false;
	}

	componentWillUnmount() {
		this.stopConfetti();
		this.unmounted = true;
	}

	startConfetti() {
		let { confettis } = this.state;
		let { confettiCount, timeout } = this.props;
		this.shouldStop = false;
		if (this.confettiIndex < confettiCount) {
			setTimeout(() => {
				if (this.shouldStop) {
					return;
				} else {
					confettis.push({ key: this.confettiIndex });
					this.confettiIndex++;
					this.setState({ confettis });
					this.startConfetti();
				}
			}, timeout);
		}
	}

	removeConfetti(key) {
		if (this.unmounted === true) return;
		let { confettis } = this.state;
		let { confettiCount } = this.props;
		let index = confettis.findIndex(confetti => {
			return confetti.key === key;
		});
		confettis.splice(index, 1);
		this.setState({ confettis });
		if (key === confettiCount - 1) {
			this.confettiIndex = 0;
		}
	}

	onPositioned(event) {
		let { x, y, width, height } = event.nativeEvent.layout;
		this.setState({ width, height });
	}

	stopConfetti() {
		this.shouldStop = true;
	}

	render() {
		let { confettis } = this.state;
		let { ...otherProps } = this.props;
		return (
			<View
				style={styles.container}
				onLayout={event => this.onPositioned(event)}
			>
				{confettis.map(confetti => {
					return (
						<Confetti
							key={confetti.key}
							index={confetti.key}
							containerWidth={this.state.width}
							containerHeight={this.state.height}
							onComplete={this.removeConfetti.bind(this, confetti.key)}
							colors={this.props.colors}
							{...otherProps}
						/>
					);
				})}
			</View>
		);
	}
}

ConfettiView.defaultProps = {
	confettiCount: 100,
	timeout: 30
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	}
});

export default ConfettiView;
