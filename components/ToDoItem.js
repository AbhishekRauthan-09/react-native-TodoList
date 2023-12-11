import {View, Text, ScrollView, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ToDoItem = ({data, setShowTodoItem}) => {
  return (
    <View
      style={tw`w-full max-h-[75%] flex flex-col p-1 rounded-md relative bg-white`}>
      {/* <TouchableOpacity > */}
      <Pressable style={tw`items-end absolute right-0`} onPress={() => setShowTodoItem(false)}>
        <Icon name="close" color="red" style={tw`text-2xl`} />
      </Pressable>
      {/* </TouchableOpacity> */}
      
      <ScrollView>
        <Text></Text>
        <Text>ToDoItem</Text>
      </ScrollView>
    </View>
  );
};

export default ToDoItem;
