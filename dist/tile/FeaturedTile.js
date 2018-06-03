Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');







var _Text=require('../text/Text');var _Text2=_interopRequireDefault(_Text);
var _Icon=require('../icons/Icon');var _Icon2=_interopRequireDefault(_Icon);
var _ViewPropTypes=require('../config/ViewPropTypes');var _ViewPropTypes2=_interopRequireDefault(_ViewPropTypes);
var _BackgroundImage=require('../config/BackgroundImage');var _BackgroundImage2=_interopRequireDefault(_BackgroundImage);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}

var FeaturedTile=function FeaturedTile(props){var

title=










props.title,icon=props.icon,caption=props.caption,imageSrc=props.imageSrc,containerStyle=props.containerStyle,imageContainerStyle=props.imageContainerStyle,overlayContainerStyle=props.overlayContainerStyle,iconContainerStyle=props.iconContainerStyle,titleStyle=props.titleStyle,captionStyle=props.captionStyle,attributes=_objectWithoutProperties(props,['title','icon','caption','imageSrc','containerStyle','imageContainerStyle','overlayContainerStyle','iconContainerStyle','titleStyle','captionStyle']);var

width=props.width,height=props.height;

if(!width){
width=_reactNative.Dimensions.get('window').width;
}
if(!height){
height=width*0.8;
}

var styles=_reactNative.StyleSheet.create({
container:{
width:width,
height:height},

imageContainer:{
alignItems:'center',
justifyContent:'center',
backgroundColor:'#ffffff',
width:width,
height:height},

overlayContainer:{
flex:1,
alignItems:'center',
backgroundColor:'rgba(0,0,0,0.2)',
alignSelf:'stretch',
justifyContent:'center',
paddingLeft:25,
paddingRight:25,
paddingTop:45,
paddingBottom:40,
position:'absolute',
top:0,
left:0,
right:0,
bottom:0},

text:{
color:'#ffffff',
backgroundColor:'rgba(0,0,0,0)',
marginBottom:15,
textAlign:'center'},

iconContainer:{
justifyContent:'center',
alignItems:'center',
alignSelf:'center'}});



return(
_react2.default.createElement(_reactNative.TouchableOpacity,_extends({},
attributes,{
style:[styles.container,containerStyle&&containerStyle]}),

_react2.default.createElement(_BackgroundImage2.default,{
source:imageSrc,
style:[
styles.imageContainer,
imageContainerStyle&&imageContainerStyle],

resizeMode:'cover'},

_react2.default.createElement(_reactNative.View,{
style:[
styles.overlayContainer,
overlayContainerStyle&&overlayContainerStyle]},


_react2.default.createElement(_reactNative.View,{
style:[
styles.iconContainer,
iconContainerStyle&&iconContainerStyle]},


icon&&_react2.default.createElement(_Icon2.default,icon)),

_react2.default.createElement(_Text2.default,{h4:true,style:[styles.text,titleStyle&&titleStyle]},
title),

_react2.default.createElement(_Text2.default,{style:[styles.text,captionStyle&&captionStyle]},
caption)))));





};

FeaturedTile.propTypes={
title:_propTypes2.default.string,
icon:_propTypes2.default.object,
caption:_propTypes2.default.string,
imageSrc:_reactNative.Image.propTypes.source.isRequired,
onPress:_propTypes2.default.func,
containerStyle:_ViewPropTypes2.default.style,
iconContainerStyle:_ViewPropTypes2.default.style,
imageContainerStyle:_ViewPropTypes2.default.style,
overlayContainerStyle:_ViewPropTypes2.default.style,
titleStyle:_reactNative.Text.propTypes.style,
captionStyle:_reactNative.Text.propTypes.style,
width:_propTypes2.default.number,
height:_propTypes2.default.number};exports.default=


FeaturedTile;
//# sourceMappingURL=FeaturedTile.js.map