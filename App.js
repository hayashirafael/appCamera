import React, {useState} from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { RNCamera } from 'react-native-camera'
import Icon from 'react-native-vector-icons/Feather'

export default function projetoCamera() {
  const [tipo, setTipo] = useState(RNCamera.Constants.Type.back) //iniciar com a camera traseira
  const [open, setOpen] = useState(false)
  const [capture, setCapture] = useState(null)

  function cameraType() {
    if (tipo === RNCamera.Constants.Type.back) {
      setTipo(RNCamera.Constants.Type.front)
    } else {
      setTipo(RNCamera.Constants.Type.back)
    }
  }

  async function takePicture(camera) {
    const options = {quality: 0.5, base64: true}
    const data = await camera.takePictureAsync(options)

    setCapture(data.uri)
    setOpen(true)
    console.log(data.uri)
  }

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

             <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture} >
               <Text>Tirar foto</Text>
             </TouchableOpacity>
             
             <TouchableOpacity onPress={() => {}} style={styles.capture} >
               <Text>Album</Text>
             </TouchableOpacity>

           </View>
         )
       }}

     </RNCamera>
     
       <View style={styles.trocar}>
         <TouchableOpacity onPress={() => cameraType()} >
           <Icon name="rotate-cw" size={30} color="#ffffff" />
         </TouchableOpacity>
       </View>
     {capture && <Modal animationType="slide" transparent={false} visible={open} >
       
       
         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20}} >
           <TouchableOpacity
           style={{margin: 10}}
           onPress={() => setOpen(false)}
           >
             <Text style={{fontSize: 24}}>Fechar</Text>

           </TouchableOpacity>

           <Image
           resizeMode="contain"
           style={{width: 350, height: 450, borderRadius: 15}}
           source={{uri: cap}}
           />

         </View>
       </Modal>}

       

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
  },
  trocar: {
    
    position: 'absolute',
    right: 25,
    top: 40
  }
})