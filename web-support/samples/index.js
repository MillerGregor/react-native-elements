export {
  default as options,
  snapShot,
  buildJsxForGuideMethod,
  createWrapperWithContext,
  ensureCalled,
  onlyEnsureCalled,
  onlySnapshots,
} from './common';
import Avatar from './Avatar';
import Badge from './Badge';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Card from './Card';
import CheckBox from './CheckBox';
import Divider from './Divider';
import FormInput from './FormInput';
import FormLabel from './FormLabel';
import FormValidationMessage from './FormValidationMessage';
import Header from './Header';
import Icon from './Icon';
import List from './List';
import ListItem from './ListItem';
import SocialIcon from './SocialIcon';
import Rating from './Rating';

export default {
  Avatar: {
    title: 'Avatar',
    sectionComponents: { Avatar },
  },
  Badge: {
    title: 'Badge',
    sectionComponents: { Badge },
  },
  Buttons: {
    title: 'Buttons',
    sectionComponents: { Button, ButtonGroup },
  },
  Card: {
    title: 'Card',
    sectionComponents: { Card },
  },
  CheckBox: {
    title: 'CheckBox',
    sectionComponents: { CheckBox },
  },
  Divider: {
    title: 'Divider',
    sectionComponents: { Divider },
  },
  Forms: {
    title: 'Forms',
    sectionComponents: { FormInput, FormLabel, FormValidationMessage },
  },
  Header: {
    title: 'Header',
    sectionComponents: { Header },
  },
  Icons: {
    title: 'Icons',
    sectionComponents: { Icon, SocialIcon },
  },
  Lists: {
    title: 'Lists',
    sectionComponents: { List, ListItem },
  },
  Rating: {
    title: 'Rating',
    sectionComponents: { Rating },
  },
};