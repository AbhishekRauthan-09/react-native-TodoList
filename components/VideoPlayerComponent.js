import {View, Text, Button} from 'react-native';
import React, {useState} from 'react';
import VideoPlayer from 'react-native-media-console';
// 👇 if you use react-native-reanimated
import {useAnimations} from '@react-native-media-console/reanimated';

const VideoPlayerComponent = () => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <View>
      <Text>VideoPlayerComponent</Text>

    <Button title="Show Video" onPress={()=>setShowVideo(true)}/>
      {showVideo && (
        <VideoPlayer
          useAnimations={useAnimations}
          source={require('./video.mp4')}
          navigator={props.navigator}
        />
      )}
    </View>
  );
};

export default VideoPlayerComponent;
