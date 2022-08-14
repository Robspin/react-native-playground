import { useState, useEffect } from "react"
import {Button, StyleSheet, TouchableOpacity} from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'

export default function TabTwoScreen() {
  const [hasPermission, setHasPermission] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [type, setType] = useState(CameraType.back)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })();
  }, []);

  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }
  return (
      <View style={styles.container}>
      <Text style={styles.title}>Native camera testerino 🦕</Text>
        {showCamera ? <Camera type={type} style={styles.camera}>
          <View>
            <TouchableOpacity style={{ marginLeft: 'auto'}}
                onPress={() => {
                  setType(type === CameraType.back ? CameraType.front : CameraType.back)
                }}>
              <Text darkColor="#248e61">Flip camera</Text>
            </TouchableOpacity>
          </View>
        </Camera> : <View style={styles.camera}/>}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button color="#248e61" title={showCamera ? 'stop camera' : 'use camera'} onPress={() => setShowCamera(!showCamera)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    marginTop: 10,
    width: 200,
    height: 200
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
