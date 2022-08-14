import Animated, {
    withSpring,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import { Button, StyleSheet, View } from "react-native"
import ClickableAnimation from "../components/ClickableAnimation"

const styles = StyleSheet.create({
    box: {
        height: 80,
        width: 80,
        backgroundColor: '#248e61',
        margin: 12,
        borderRadius: 5
    }
})

const TabThreeScreen = () => {
    const offset = useSharedValue(0);

    const defaultSpringStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: withSpring(offset.value * 255) }],
        };
    });

    const customSpringStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: withSpring(offset.value * 255, {
                        damping: 20,
                        stiffness: 90,
                    }),
                },
            ],
        };
    });

    return (
        <View style={{paddingHorizontal: 20}}>
            <Animated.View style={[styles.box, defaultSpringStyles]} />
            <Animated.View style={[styles.box, customSpringStyles]} />
            <Button color="#248e61" onPress={() => (offset.value = Math.random())} title="Move" />
            <View style={{marginTop: 60}}>
                <ClickableAnimation />
            </View>
        </View>
    );
}

export default TabThreeScreen
