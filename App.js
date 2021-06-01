import React, {useState} from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera'

export default function projetoCamera() {
  const [tipo, setTipo] = useState(RNCamera.Constants.Type.back) //iniciar com a camera traseira

 return (
   <View style={styles.container}>
     <RNCamera
     style={styles.preview}
     type={tipo} // setando o modo que a camera ira iniciar
     flashMode={RNCamera.Constants.FlashMode.off}
     androidCameraPermissionOptions={{
       title: 'Permissao para usar a camera',
       message: 'Por gentileza, autorizar o uso da camera',
       buttonPositive: 'Ok',
       buttonNegative: 'Cancelar'
     }}
     >
       {({ camera, status, recordAudioPermissionStatus } ) => {
         if(status !== 'READY') return <View/>
         return(
           <View
           style={{marginBottom: 35, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>

             <TouchableOpacity onPress={() => {}} style={styles.capture} >
               <Text>Tirar foto</Text>
             </TouchableOpacity>
             
             <TouchableOpacity onPress={() => {}} style={styles.capture} >
               <Text>Album</Text>
             </TouchableOpacity>

           </View>
         )
       }}

     </RNCamera>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    alignSelf: 'center',
    margin: 20
  }
})