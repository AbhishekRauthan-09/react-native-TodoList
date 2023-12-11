import {View, Text, Pressable, Button} from 'react-native';
import React from 'react';
import tw from 'twrnc';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={tw`flex-1 justify-center items-center h-full`}>
      <Text style={tw`text-4xl font-semibold text-violet-800 p-2 rounded`}>
        Welcome to ToDo App
      </Text>

      <Pressable
        onPress={() => navigation.navigate('Home')}
        style={tw`bg-violet-800 py-2 px-5 mt-5 rounded-md`}>
        <Text style={tw`text-base text-white`}>Enter into App</Text>
      </Pressable>
    </View>
  );
};

export default WelcomeScreen;
