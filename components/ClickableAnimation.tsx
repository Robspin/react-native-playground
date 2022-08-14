import {View, StyleSheet, TouchableOpacity, Text, Button} from "react-native"
import Animated, {useSharedValue, useAnimatedStyle, withTiming, withSpring, withRepeat} from "react-native-reanimated"
import {useEffect} from "react"


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    }
})

const handleRotation = (progress: Animated.SharedValue<number>): string => {
    'worklet'

    return `${progress.value * 2 * Math.PI}rad`
}

const ClickableAnimation = () => {
    const progress = useSharedValue(1)
    const scale = useSharedValue(2)
    const size = 100

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            borderRadius: (progress.value * size) / 2,
            transform: [{ scale: scale.value }, { rotate: handleRotation(progress) }]
        }
    }, [])

    const onTab = () => {
        progress.value = 1
        scale.value = 2
        progress.value = withRepeat(withSpring(0.5), 3, true)
        scale.value = withRepeat(withSpring(1), 3, true)
    }

    useEffect(() => {
        progress.value = withRepeat(withSpring(0.5), 3, true)
        scale.value = withRepeat(withSpring(1), 3, true)
    }, [])

    return (
        <View>
            <View style={styles.container}>
                <Animated.View style={[{height: size, width: size, backgroundColor: '#248e61'}, reanimatedStyle]} />
            </View>
            <View style={{marginTop: 120}}>
                <Button color="#248e61" onPress={onTab} title="Rerun Animation" />
            </View>
        </View>
    )
}

export default ClickableAnimation
