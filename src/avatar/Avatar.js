import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';
import elevation from '../config/elevation';
import ViewPropTypes from '../config/ViewPropTypes';

import Icon from 'react-native-vector-icons/FontAwesome';

const DEFAULT_COLORS = ['#000', '#333', '#555', '#888', '#aaa', '#ddd'];

const Avatar = props => {
  const {
    component,
    onPress,
    onLongPress,
    containerStyle,
    icon,
    iconStyle,
    source,
    small,
    medium,
    large,
    xlarge,
    avatarStyle,
    rounded,
    title,
    titleStyle,
    overlayContainerStyle,
    activeOpacity,
    showEditButton,
    editButton,
    onEditPress,
    ...attributes
  } = props;

  let { width, height } = props;

  if (small) {
    width = 34;
    height = 34;
  } else if (medium) {
    width = 50;
    height = 50;
  } else if (large) {
    width = 75;
    height = 75;
  } else if (xlarge) {
    width = 150;
    height = 150;
  } else if (!width && !height) {
    width = 34;
    height = 34;
  } else if (!width) {
    width = height;
  } else if (!height) {
    height = width;
  }

  let titleSize = width / 2;
  let iconSize = width / 2;

  let touchableProps = {};
  let Component = View;
  if (onPress || onLongPress) {
    Component = TouchableOpacity;
    touchableProps = { onPress, onLongPress, activeOpacity };
  }
  if (component) {
    Component = component;
    if (Component != TouchableOpacity) delete touchableProps.activeOpacity;
  }

  const renderUtils = () => {
    if (showEditButton) {
      const editButtonProps = { ...editButton };

      const defaultEditButtonSize = (width + height) / 2 / 3;
      const editButtonSize = editButton.size || defaultEditButtonSize;
      const editButtonSizeStyle = {
        width: editButtonSize,
        height: editButtonSize,
        borderRadius: editButtonSize / 2,
      };
      const editButtonIconSize = editButtonSize * 0.8;

      return (
        <TouchableHighlight
          style={[
            styles.editButton,
            editButtonSizeStyle,
            editButtonProps.style,
          ]}
          underlayColor={editButtonProps.underlayColor}
          onPress={onEditPress}
        >
          <View>
            <Icon
              size={editButtonIconSize}
              name={editButtonProps.iconName}
              type={editButtonProps.iconType}
              color={editButtonProps.iconColor}
            />
          </View>
        </TouchableHighlight>
      );
    }
  };

  const renderContent = () => {
    if (source) {
      return (
        <Image
          style={[
            styles.avatar,
            rounded && { borderRadius: width / 2 },
            avatarStyle && avatarStyle,
          ]}
          source={source}
          draggable={false}
        />
      );
    } else if (title) {
      return (
        <Text style={[styles.title, titleStyle && titleStyle]}>{title}</Text>
      );
    } else if (icon) {
      return (
        <Icon
          iconStyle={iconStyle && iconStyle}
          color={icon.color || 'white'}
          name={icon.name || 'user'}
          size={icon.size || iconSize}
          type={icon.type && icon.type}
        />
      );
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      width: width,
      height: height,
    },
    avatar: {
      width: width,
      height: height,
    },
    overlayContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.2)',
      alignSelf: 'stretch',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    title: {
      color: '#ffffff',
      fontSize: titleSize,
      backgroundColor: 'rgba(0,0,0,0)',
      textAlign: 'center',
    },
    editButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: DEFAULT_COLORS[4],
      ...Platform.select({
        ios: {
          shadowColor: DEFAULT_COLORS[0],
          shadowOffset: { width: 1, height: 1 },
          shadowRadius: 2,
          shadowOpacity: 0.5,
        },
        android: elevation.android.one,
        web: elevation.web.one,
      }),
    },
  });

  return (
    <Component
      {...touchableProps}
      style={[
        styles.container,
        rounded && { borderRadius: width / 2 },
        containerStyle && containerStyle,
      ]}
      {...attributes}
    >
      <View
        style={[
          styles.overlayContainer,
          rounded && { borderRadius: width / 2 },
          overlayContainerStyle && overlayContainerStyle,
        ]}
      >
        {renderContent()}
        {renderUtils()}
      </View>
    </Component>
  );
};

const defaultProps = {
  showEditButton: false,
  onEditPress: null,
  editButton: {
    size: null,
    iconName: 'mode-edit',
    iconType: 'material',
    iconColor: '#fff',
    underlayColor: DEFAULT_COLORS[0],
    style: null,
  },
};

Avatar.propTypes = {
  component: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  containerStyle: PropTypes.any,
  source: Image.propTypes.source,
  avatarStyle: PropTypes.any,
  rounded: PropTypes.bool,
  title: PropTypes.string,
  titleStyle: Text.propTypes.style,
  overlayContainerStyle: PropTypes.any,
  activeOpacity: PropTypes.number,
  icon: PropTypes.object,
  iconStyle: Text.propTypes.style,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool,
  showEditButton: PropTypes.bool,
  onEditPress: PropTypes.func,
  editButton: PropTypes.shape({
    size: PropTypes.number,
    iconName: PropTypes.string,
    iconType: PropTypes.string,
    iconColor: PropTypes.string,
    underlayColor: PropTypes.string,
    style: ViewPropTypes.style,
  }),
};

Avatar.defaultProps = defaultProps;

export default Avatar;
