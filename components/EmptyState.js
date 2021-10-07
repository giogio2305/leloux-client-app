import React from 'react'
import { View, Text } from 'react-native'
import { useState, useEffect, useContext, useLayoutEffect } from 'react'
import { StyledContainer, InnerConatainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledLabel, StyledTextInput, RightIcon, StyledBtn, StyledBtnText, Msgbox, ExtraView, ExtraText, TextLink, TextLinkContent, OptIcon, EmptyArea, EmptyBadge, EmptyBadgeText, EmptyIbox, EmptyTitle, EmptySeText, NotifBadge, Spcr } from './style'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './CredentialsContext';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

const EmptyState = ({pagetitle, icon, isBadge, maintitle, des}) => {
    return (
            <>
                <EmptyArea><EmptyIbox>
                        <Icon color="#a1aab8" type='ionicon' name={icon} size={88} />

                       {isBadge && <EmptyBadge >
                            <EmptyBadgeText>0</EmptyBadgeText>
                        </EmptyBadge> }

                    </EmptyIbox>
                    <EmptyTitle>{maintitle}</EmptyTitle>
                    <EmptySeText>{des}</EmptySeText>
                </EmptyArea>
                </>

    )
}

export default EmptyState
