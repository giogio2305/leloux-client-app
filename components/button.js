import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { StyledNBtn, StyledNBtnText } from './style';

export default function Button(props) {
  const {title } = props;
  return (
    <StyledNBtn>
        <StyledNBtnText>{title}</StyledNBtnText>
    </StyledNBtn>

  );
}

