import React, { useState,useRef,useEffect } from "react";
import { View, StyleSheet, Button,TouchableOpacity, Text } from "react-native";

import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import * as tf from "@tensorflow/tfjs";
import { cameraWithTensors,fetch, decodeJpeg } from "@tensorflow/tfjs-react-native";
import { poseNet } from "@tensorflow-models/posenet";
import { Canvas } from 'expo-2d-context';
export default function App() {
  
  const [status, setStatus] = useState({});
  const [videoSource, setVideoSource] = useState(null);
  const videoPlayer = useRef(null);

 

  // useEffect(() => {
  //   if (videoPlayer.current) {
  //     videoPlayer.current.getStatusAsync().then(status => {
  //       console.log(status);
  //     }).catch(error => {
  //       console.log(error);
  //     });
  //   }
  // }, [videoPlayer.current]);
  const selectVideo = async () => {

    const options = { mediaTypes: ImagePicker.MediaTypeOptions.All };
    try {
      const response = await ImagePicker.launchImageLibraryAsync(options);

      if (response.assets && response.assets.length > 0) {
        setVideoSource({ uri: response.assets[0].uri });
      }
    } catch (error) {
      console.log(error.message);
      console.log("I am giving this error!");
    }
  };

  
  // This is to etimate pose!!
  const estimatePose = async (videoFrame) => {
    const { width, height } = videoFrame.size;
    const tensor = decodeJpeg(videoFrame.uri);
    const model = await poseNet();
    const poses = await model.estimatePoses(tensor, {
      flipHorizontal: false,
      decodingMethod: "single-person",
    });
    return poses;
  };

  const onVidFrame = async (event) => {
    // console.log("In this block!!");
    // const { currentTime } = event;
    // const videoFrame = await videoPlayer.current.getFrameAsync(
    //   currentTime * 1000,
    //   "exact"
    // );
    // const poses = await estimatePose(videoFrame);
    // console.log(poses);

    console.log(videoPlayer.current.getStatusAsync()); 
    await videoPlayer.current.pauseAsync();
    
    // Video ke current position pe seek karen
    // const position = await videoPlayer.current.getPositionAsync();
    // await videoPlayer.current.setPositionAsync(position);
    // await videoPlayer.current.playAsync();
  };

  const vidFrame = async () => {
    //console.log(await videoPlayer.getVideoHeightAsync());
    // if(videoPlayer){
    //  // const { status } = await videoPlayer.getStatusAsync();
       
    //  const { uri } = await videoPlayer.takeSnapshotAsync({
    //   format: "jpeg",
    //   result: "file",
    // });
    //     const poses = await estimatePose({uri});
    //     console.log(poses);
      
  
    // }
  };
    
    return (
      
      <View>
        
      <TouchableOpacity onPress={selectVideo} style={{backgroundColor:'green', padding:30, margin:30}}><Text style={{color:'white'}}>Select Video</Text></TouchableOpacity> 
      
      <View>
      {videoSource && (
        <Video
          ref={videoPlayer}
          source={{ uri: videoSource.uri }}
          style={styles.video}
          resizeMode="contain"
          
          useNativeControls
          onLoad={onVidFrame}
          onPlaybackStatusUpdate={setStatus}

         
        />
        
      )}

      <TouchableOpacity onPress={ ()=> {  
        // let status = videoPlayer?.current?.getStatusAsync({}); 
        // let obj = 
       console.log(videoPlayer.current);
        
      
      }} 
        
        
        style={{backgroundColor:'green', padding:30, margin:30}}
      >
         
        <Text style={{color:'white'}}>Start frame</Text></TouchableOpacity> 

      </View>
      
        {/* {videoSource && 
        (
          
        )} */}
      </View>

    );
    
  
   
   
   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  video: {
    height: 600,
    alignSelf: "stretch",
    marginVertical: 10,
     
    
  },
});
//  // ------------------------------------------------------------

// //  import React, { useState, useRef } from "react";
// // import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
// // import * as ImagePicker from "expo-image-picker";
// // import { Video } from "expo-av";
// // import * as tf from "@tensorflow/tfjs";
// // import { fetch, decodeJpeg } from "@tensorflow/tfjs-react-native";
// // import { poseNet } from "@tensorflow-models/posenet";
// // import { Surface, Shape, Path } from "react-native-community/art";

// // export default function App() {
// //   const videoRef = useRef(null);
// //   const surfaceRef = useRef(null);
// //   const [videoSource, setVideoSource] = useState(null);
// //   const [model, setModel] = useState(null);
// //   const [keypoints, setKeypoints] = useState([]);

// //   const selectVideo = async () => {
// //     const options = { mediaTypes: ImagePicker.MediaTypeOptions.All };
// //     try {
// //       const response = await ImagePicker.launchImageLibraryAsync(options);

// //       if (response.assets && response.assets.length > 0) {
// //         setVideoSource({ uri: response.assets[0].uri });
// //       }
// //     } catch (error) {
// //       console.log(error.message);
// //       console.log("I am  giving this error!");
// //     }
// //   };

// //   const onVideoReady = async () => {
// //     const model = await poseNet.load();
// //     setModel(model);
// //     videoRef.current.playAsync();
// //   };

// //   const onVideoFrame = async () => {
// //     const { width, height } = videoRef.current.getVideoInfo();
// //     const frame = await videoRef.current.getCurrentFrameAsync();
// //     const pose = await model.estimateSinglePose(frame, {
// //       flipHorizontal: false,
// //     });
// //     setKeypoints(pose.keypoints);
// //     const path = new Path();
// //     keypoints.forEach((kp, index) => {
// //       if (kp.score >= 0.2) {
// //         if (index === 0) {
// //           path.moveTo(kp.position.x, kp.position.y);
// //         } else {
// //           path.lineTo(kp.position.x, kp.position.y);
// //         }
// //       }
// //     });
// //     const ctx = surfaceRef.current.getContext("2d");
// //     ctx.fillColor = "#00FF00";
// //     ctx.strokeColor = "#00FF00";
// //     ctx.draw(path);
// //   };

// //   return (
// //     <View style={{ flex: 1 }}>
// //       <View style={{ flex: 1 }}>
// //         {videoSource && (
// //           <Video
// //             ref={videoRef}
// //             source={{ uri: videoSource }}
// //             style={{ flex: 1 }}
// //             resizeMode="contain"
// //             useNativeControls
// //             onReadyForDisplay={onVideoReady}
// //             onPlaybackStatusUpdate={(status) => {
// //               if (status.isPlaying) {
// //                 onVideoFrame();
// //               }
// //             }}
// //           />
// //         )}
// //       </View>
// //       <View style={{ position: "absolute", top: 0, left: 0 }}>
// //         <Surface
// //           ref={surfaceRef}
// //           style={{ width: "100%", height: "100%" }}
// //           onLayout={() => {
// //             const { width, height } = surfaceRef.current.getViewBox();
// //             surfaceRef.current.setNativeProps({ width, height });
// //           }}
// //         />
// //       </View>
// //       <Button title="Select Video" onPress={selectVideo} />
// //     </View>
// //   );
// // }
  
// import * as tf from '@tensorflow/tfjs';
// import * as posenet from '@tensorflow-models/posenet';

// // Define the correct form for a push-up
// const pushupCriteria = {
//   handsDistance: 1.5, // In multiples of shoulder width
//   elbowAngle: Math.PI / 4, // In radians
//   backAngle: Math.PI / 8, // In radians
//   chestDistance: 1, // In multiples of hip-to-shoulder distance
// };

// // Load the PoseNet model
// let net;
// posenet.load().then(model => {
//   net = model;
// });

// // Estimate the user's pose and check for correct push-up form
// export async function checkPushupForm(videoElement) {
//   // Estimate the user's pose using PoseNet
//   const pose = await net.estimateSinglePose(videoElement, {
//     flipHorizontal: false
//   });

//   // Calculate the distances between the user's body parts
//   const shoulders = pose.keypoints.find(k => k.part === 'leftShoulder' || k.part === 'rightShoulder').position;
//   const hips = pose.keypoints.find(k => k.part === 'leftHip' || k.part === 'rightHip').position;
//   const hands = pose.keypoints.find(k => k.part === 'leftWrist' || k.part === 'rightWrist').position;
//   const elbows = pose.keypoints.find(k => k.part === 'leftElbow' || k.part === 'rightElbow').position;
//   const chest = pose.keypoints.find(k => k.part === 'nose').position;

//   const shoulderWidth = shoulders.x - hips.x;
//   const hipToShoulderDistance = hips.y - shoulders.y;
//   const handDistance = Math.abs(hands.x - elbows.x) / shoulderWidth;
//   const elbowAngle = Math.abs(Math.atan2(elbows.y - shoulders.y, elbows.x - shoulders.x) -
//                               Math.atan2(hands.y - elbows.y, hands.x - elbows.x));
//   const backAngle = Math.abs(Math.atan2(shoulders.y - hips.y, shoulders.x - hips.x) -
//                              Math.atan2(chest.y - hips.y, chest.x - hips.x));
//   const chestDistance = Math.abs(chest.y - hips.y) / hipToShoulderDistance;

//   // Check if the user is performing a push-up correctly
//   if (handDistance > pushupCriteria.handsDistance ||
//       elbowAngle > pushupCriteria.elbowAngle ||
//       backAngle > pushupCriteria.backAngle ||
//       chestDistance > pushupCriteria.chestDistance) {
//     console.log('Incorrect push-up form');
//     // Provide feedback to the user
//   } else {
//     console.log('Correct push-up form');
//     // Provide feedback to the user
//   }
// }


