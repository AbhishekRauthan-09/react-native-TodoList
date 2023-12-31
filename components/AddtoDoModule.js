import {
  View,
  Text,
  Button,
  TextInput,
  CheckBox,
  Pressable,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import {useDispatch} from 'react-redux';
import {addTodo} from '../redux/todoSlice';
import {addToDo} from './Apis';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddtoDoModule = ({setShowAddToDoModal, todos, setRefetchTodos}) => {
  // const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const textinputStyle = 'p-2 border border-gray-400 rounded ';

  const addItem = () => {
    if (title.length < 5 || desc.length < 15) {
      ToastAndroid.show('Enter valid title and desc', ToastAndroid.SHORT);
      return;
    }

    const newItem = {
      title,
      desc,
      done: false,
    };

    addToDo(newItem);
    setShowAddToDoModal(false);
    setRefetchTodos({});
    ToastAndroid.show('Todo added successfully', ToastAndroid.SHORT);
  };
  return (
    <View
      style={tw`bg-white p-4 rounded-md shadow shadow-gray-500 w-[100%] relative`}>
      <View
        style={tw`w-[100%] flex absolute top-1 right-4  justify-center items-center`}>
        <View style={tw`p-1 bg-gray-600 rounded-xl w-[30%]`}></View>
      </View>

      <Pressable
        style={tw`items-end absolute right-0`}
        onPress={() => setShowAddToDoModal(false)}>
        <Icon name="close" color="red" style={tw`text-2xl`} />
      </Pressable>

      <Text style={tw`text-2xl font-semibold p-3`}>Adding Snippets here</Text>

      <View style={tw`my-3`}>
        <TextInput
          style={tw`${textinputStyle}`}
          onChangeText={setTitle}
          value={title}
          placeholder="Enter Title here"
          keyboardType="default"
        />
        <TextInput
          style={tw`${textinputStyle} mt-2`}
          onChangeText={setDesc}
          value={desc}
          placeholder="Enter Description here"
          multiline
          numberOfLines={3}
          keyboardType="default"
        />
      </View>

      <Pressable
        onPress={() => addItem()}
        style={tw`bg-violet-800 py-2 px-5 mt-5 rounded-md`}>
        <Text style={tw`text-base text-white text-center text-base`}>Add</Text>
      </Pressable>
    </View>
  );
};

export default AddtoDoModule;
