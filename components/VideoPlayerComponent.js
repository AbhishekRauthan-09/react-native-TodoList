import {View, Text, Button} from 'react-native';
import React, {useState} from 'react';

const VideoPlayerComponent = () => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <View>
      <Text>VideoPlayerComponent</Text>
    </View>
  );
};

export default VideoPlayerComponent;
