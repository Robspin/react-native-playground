import { View, StyleSheet, TouchableOpacity, ScrollView, Text } from "react-native"
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    withRepeat,
    FadeIn, FadeOut, Layout
} from "react-native-reanimated"
import {useCallback, useEffect, useRef, useState} from "react"

interface ListItem {
    id: number
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        display: 'flex',
        minHeight: '100%',
        alignItems: 'center',
    },
    listItem: {
        height: 80,
        backgroundColor: '#248e61',
        width: '90%',
        marginVertical: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingButton: {
        width: 50,
        aspectRatio: 1,
        backgroundColor: '#248e61',
        borderRadius: 40,
        position: 'absolute',
        bottom: 20,
        right: '5%',
        zIndex: 10,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white'
    }
})

const TabFourScreen = () => {
    const [items, setItems] = useState<ListItem[]>(new Array(5).fill(0).map((_, i) => ({ id: i })))
    const scrollY = useRef(new Animated.Value(0)).current
    const initialRenderRef = useRef(true)

    useEffect(() => {
        initialRenderRef.current = false
    }, [])

    const addItem = useCallback(() => {
        setItems((currentItems) => {
            const newItemId = currentItems.length ? currentItems[currentItems.length -1].id + 1 : 0
            return [...currentItems, { id: newItemId }]
        })
    }, [])

    const deleteItem = useCallback((itemId: number) => {
        setItems((currentItems) => [...currentItems.filter(item => item.id !== itemId)])
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={addItem} style={styles.floatingButton}>
                <Text style={{color: 'white', fontSize: 33 }}>+</Text>
            </TouchableOpacity>
            <Animated.ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} scrollEventThrottle={16}
                                 onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY }}}],
                                     { useNativeDriver: true })}>
                {items.map((item, i) => {
                    const size = 100
                    const inputRange = [-1, 0, size * i, size * (i + 2)]
                    const opacityInputRange = [-1, 0, size * i, size * (i + 0.8)]
                    const scale = scrollY.interpolate({ inputRange, outputRange: [1, 1, 1, 0] })
                    const opacity = scrollY.interpolate({ inputRange: opacityInputRange, outputRange: [1, 1, 1, 0] })
                    const topFadeStyles = { transform: [{scale}], opacity }

                    return (
                        <Animated.View
                                       exiting={FadeOut} onTouchEnd={() => deleteItem(item.id)}
                                       style={[styles.listItem, topFadeStyles]} key={item.id} layout={Layout.delay(100)}>
                            <Text style={{color: 'white', fontSize: 20}}>{item.id}</Text>
                        </Animated.View>
                    )
                })}
            </Animated.ScrollView>
        </View>
    )
}

export default TabFourScreen
