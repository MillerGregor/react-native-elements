/*global require:true*/
/*eslint no-undef: "error"*/
/*eslint-disable no-console */
import times from 'lodash.times';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';

import Text from '../text/Text';
import ViewPropTypes from '../config/ViewPropTypes';

const STAR_IMAGE = require('./images/star.png');
const HEART_IMAGE = require('./images/heart.png');
const ROCKET_IMAGE = require('./images/rocket.png');
const BELL_IMAGE = require('./images/bell.png');

const STAR_WIDTH = 60;

const TYPES = {
  star: {
    source: STAR_IMAGE,
    color: '#f1c40f',
    backgroundColor: 'white',
  },
  heart: {
    source: HEART_IMAGE,
    color: '#e74c3c',
    backgroundColor: 'white',
  },
  rocket: {
    source: ROCKET_IMAGE,
    color: '#2ecc71',
    backgroundColor: 'white',
  },
  bell: {
    source: BELL_IMAGE,
    color: '#f39c12',
    backgroundColor: 'white',
  },
};

export default class Rating extends Component {
  _panResponder;
  _position;

  static defaultProps = {
    type: 'star',
    ratingImage: require('./images/star.png'),
    ratingColor: '#f1c40f',
    ratingBackgroundColor: 'white',
    ratingCount: 5,
    imageSize: STAR_WIDTH,
    onFinishRating: () => console.log('Attach a function here.'),
  };

  constructor(props) {
    super(props);
    this._position = new Animated.Value(0);
    this.state = { value: 0 }; // TODO: add rating
  }

  componentWillMount() {
    const { onFinishRating, fractions } = this.props;
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      // onPanResponderGrant: () => {
      //   extractOffset() is available in later versions of RN
      //   this._position.extractOffset();
      // },
      onPanResponderMove: (event, { dx }) => {
        this._position.setValue(dx);
        this.setState(prevState => {
          return { value: dx };
        });
      },
      onPanResponderRelease: () => {
        const rating = this.getCurrentRating();
        if (!fractions) {
          // "round up" to the nearest star/rocket/whatever
          this.setCurrentRating(rating);
        }
        onFinishRating(rating);
      },
    });
  }

  componentDidMount() {
    this.setCurrentRating(this.props.startingValue);
  }

  getPrimaryViewStyle() {
    const { imageSize, ratingCount, type } = this.props;

    const color = TYPES[type].color;

    const halfFull = ratingCount * imageSize / 2;

    const width = this._position.interpolate(
      {
        inputRange: [-halfFull, halfFull],
        outputRange: [0, ratingCount * imageSize],
        extrapolate: 'clamp',
      },
      { useNativeDriver: true }
    );

    return {
      backgroundColor: color,
      width,
      height: width ? imageSize : 0,
    };
  }

  getSecondaryViewStyle() {
    const { imageSize, ratingCount, type } = this.props;

    const backgroundColor = TYPES[type].backgroundColor;

    const halfFull = ratingCount * imageSize / 2;

    const width = this._position.interpolate(
      {
        inputRange: [-halfFull, halfFull],
        outputRange: [ratingCount * imageSize, 0],
        extrapolate: 'clamp',
      },
      { useNativeDriver: true }
    );

    return {
      backgroundColor,
      width,
      height: width ? imageSize : 0,
    };
  }

  renderRatings() {
    const { imageSize, ratingCount, type } = this.props;
    const source = TYPES[type].source;

    return times(ratingCount, index => (
      <View key={index} style={styles.starContainer}>
        <Image
          source={source}
          style={{ width: imageSize, height: imageSize }}
          pointerEvents="none"
          draggable={false}
        />
      </View>
    ));
  }

  getCurrentRating() {
    const { value } = this.state;
    const { fractions, imageSize, ratingCount } = this.props;
    const startingValue = ratingCount / 2;
    let currentRating = 0;

    if (value > ratingCount * imageSize / 2) {
      currentRating = ratingCount;
    } else if (value < -ratingCount * imageSize / 2) {
      currentRating = 0;
    } else if (value < imageSize || value > imageSize) {
      currentRating = startingValue + value / imageSize;
      currentRating = !fractions
        ? Math.ceil(currentRating)
        : +currentRating.toFixed(fractions);
    } else {
      currentRating = !fractions
        ? Math.ceil(startingValue)
        : +startingValue.toFixed(fractions);
    }
    // console.log({ currentRating });
    return currentRating;
  }

  setCurrentRating(rating) {
    const { imageSize, ratingCount } = this.props;
    // console.log({ rating });
    // `initialRating` corresponds to `startingValue` in the getter. Naming it
    // differently here avoids confusion with `value` below.
    const initialRating = ratingCount / 2;
    let value = null;

    if (rating > ratingCount) {
      value = ratingCount * imageSize / 2;
    } else if (rating < 0) {
      value = -ratingCount * imageSize / 2;
    } else if (rating < ratingCount / 2 || rating > ratingCount / 2) {
      value = (rating - initialRating) * imageSize;
    } else {
      value = 0;
    }

    this._position.setValue(value);
  }

  displayCurrentRating() {
    const { ratingCount, type, readonly } = this.props;

    const color = TYPES[type].color;

    return (
      <View style={styles.showRatingView}>
        <View style={styles.ratingView}>
          <Text style={styles.ratingText}>Rating: </Text>
          <Text style={[styles.currentRatingText, { color }]}>
            {this.getCurrentRating()}
          </Text>
          <Text style={styles.maxRatingText}>/{ratingCount}</Text>
        </View>
        <View>
          {readonly && <Text style={styles.readonlyLabel}>(readonly)</Text>}
        </View>
      </View>
    );
  }

  render() {
    const {
      readonly,
      type,
      ratingImage,
      ratingColor,
      ratingBackgroundColor,
      style,
      showRating,
    } = this.props;

    if (type === 'custom') {
      let custom = {
        source: ratingImage,
        color: ratingColor,
        backgroundColor: ratingBackgroundColor,
      };
      TYPES.custom = custom;
    }

    return (
      <View pointerEvents={readonly ? 'none' : 'box-none'} style={style}>
        {showRating && this.displayCurrentRating()}
        <View style={styles.starsWrapper} {...this._panResponder.panHandlers}>
          <View style={styles.starsInsideWrapper} pointerEvents="none">
            <Animated.View style={this.getPrimaryViewStyle()} />
            <Animated.View style={this.getSecondaryViewStyle()} />
          </View>
          {this.renderRatings()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  starsWrapper: {
    flexDirection: 'row',
  },
  starsInsideWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
  },
  showRatingView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  ratingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  ratingText: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : null,
    color: '#34495e',
  },
  readonlyLabel: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : null,
    color: '#34495a',
  },
  currentRatingText: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : null,
  },
  maxRatingText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : null,
    color: '#34495e',
  },
});

const fractionsType = (props, propName, componentName) => {
  if (props[propName]) {
    const value = props[propName];
    if (typeof value === 'number') {
      return value >= 0 && value <= 20
        ? null
        : new Error(
            `\`${propName}\` in \`${componentName}\` must be between 0 and 20`
          );
    }

    return new Error(
      `\`${propName}\` in \`${componentName}\` must be a number`
    );
  }
};

Rating.propTypes = {
  type: PropTypes.string,
  ratingImage: Image.propTypes.source,
  ratingColor: PropTypes.string,
  ratingBackgroundColor: PropTypes.string,
  ratingCount: PropTypes.number,
  imageSize: PropTypes.number,
  onFinishRating: PropTypes.func,
  showRating: PropTypes.bool,
  style: ViewPropTypes.style,
  readonly: PropTypes.bool,
  startingValue: PropTypes.number,
  fractions: fractionsType,
};
