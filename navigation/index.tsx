/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme, DarkTheme, useIsFocused} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName, Pressable, View, Text} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen'
import TabFourScreen from '../screens/TabFourScreen'
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import {useEffect} from "react"
import Animated, {useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming} from "react-native-reanimated"

export default function Navigation() {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={DarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: '#248e61',
          tabBarStyle: {
            height: 80,
          }
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'SQLite',
          tabBarIcon: ({ color , focused}) => <TabBarIcon name="code" color={color} focused={focused} />,
            tabBarLabel: ({ color, focused }) => <Label name="SQLite" color={color} focused={focused} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="camera" color={color} focused={focused} />,
            tabBarLabel: ({ color, focused }) => <Label name="Camera" color={color} focused={focused} />
        }}
      />
        <BottomTab.Screen
            name="TabThree"
            component={TabThreeScreen}
            options={{
                tabBarIcon: ({ color , focused}) => <TabBarIcon name="circle" color={color} focused={focused} />,
                tabBarLabel: ({ color, focused }) => <Label name="Animation" color={color} focused={focused} />
            }}
            />
        <BottomTab.Screen
            name="TabFour"
            component={TabFourScreen}
            options={{
                tabBarIcon: ({ color , focused}) => <TabBarIcon name="list" color={color} focused={focused} />,
                tabBarLabel: ({ color, focused }) => <Label name="List" color={color} focused={focused} />
            }}
        />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

type TabBarProps = {
    name: React.ComponentProps<typeof FontAwesome>['name']
    color: string
    focused?: boolean
}

const Label = ({ name, focused, color }: TabBarProps) => {
    return <Text style={[focused && { fontWeight: 'bold' }, { color, marginBottom: 14, fontSize: 12 }]}>{name}</Text>
}

const TabBarIcon = ({ name, color, focused }: TabBarProps) => {
    const rotation = useSharedValue(0)
    const scale = useSharedValue(1)
    const isFocused = useIsFocused()

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
        };
    })

    useEffect(() => {
        if (!isFocused || !focused) return
        // rotation.value = withRepeat(withTiming(10, { duration: 200 }), 4, true)
        scale.value = withRepeat(withSpring(1.1), 2, true)
        // rotation.value = withSpring(0)
    }, [isFocused, focused])

  return (
      <Animated.View style={animatedStyle}>
        <FontAwesome size={30} style={{ marginBottom: -3, marginTop: 10 }} name={name} color={color} />
      </Animated.View>
  )
}
