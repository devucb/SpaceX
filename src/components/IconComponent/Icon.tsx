import React from 'react';
import {IconSizes, PIcon} from './Icon.props';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
MIcon.loadFont().catch(error => {
  console.info(error);
});

export const Icon = ({color, name, size}: PIcon) => (
  <MIcon name={name} size={IconSizes[size]} color={color} />
);
