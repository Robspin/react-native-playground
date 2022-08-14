import { View, StyleSheet, TouchableOpacity, ScrollView, Text } from "react-native"
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    withRepeat,
    FadeIn
} from "react-native-reanimated"
import {useCallback, useEffect, useState} from "react"

interface ListItem {
    id: number
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    listItem: {
        height: 80,
        backgroundColor: '#248e61',
        width: '90%',
        marginVertical: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // shadow android
        // shadow ios
        elevation: 5,
        shadowOpacity: 1,
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20
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
    const [items, setItems] = useState<ListItem[]>(new Array(0).fill(0).map((_, i) => ({ id: i })))

    const addItem = useCallback(() => {
        setItems((currentItems) => {
            const newItemId = currentItems.length ? currentItems[currentItems.length -1].id + 1 : 0
            return [...currentItems, { id: newItemId }]
        })
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={addItem} style={styles.floatingButton}>
                <Text style={{color: 'white', fontSize: 33 }}>+</Text>
            </TouchableOpacity>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                {items.map((item) => (
                    <Animated.View entering={FadeIn} style={styles.listItem} key={item.id}>
                        <Text style={{color: 'white', fontSize: 20 }}>{item.id}</Text>
                    </Animated.View>
                ))}
            </ScrollView>
        </View>
    )
}

export default TabFourScreen
