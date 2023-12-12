import {View, Text, Pressable, TextInput, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import {editToDo} from './Apis';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';

const EditTodo = ({setshowEditTodoModal, data, setRefetchTodos}) => {
  const textinputStyle = 'p-2 border border-gray-400 rounded ';
  const [title, setTitle] = useState(data.title || '');
  const [desc, setDesc] = useState(data.desc || '');

  const editItem = async () => {
    const body = {
      ...data,
      title,
      desc,
    };

    if (title.length < 5 || desc.length < 15) {
      ToastAndroid.show('Enter valid title and desc', ToastAndroid.SHORT);
      return;
    }

    const {success} = await editToDo(body);
    if (success) {
      setRefetchTodos({});
      setshowEditTodoModal(false);
      ToastAndroid.show('Edited Successfully!', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
    }
  };
  return (
    <View
      style={tw`bg-white p-4 rounded-md shadow shadow-gray-500 w-[100%] relative`}>
      <Pressable
        style={tw`items-end absolute right-0`}
        onPress={() => setshowEditTodoModal(false)}>
        <Icon name="close" color="red" style={tw`text-2xl`} />
      </Pressable>

      <View
        style={tw`w-[100%] flex absolute top-1 right-4  justify-center items-center`}>
        <View style={tw`p-1 bg-gray-600 rounded-xl w-[30%]`}></View>
      </View>

      <Text style={tw`text-2xl font-semibold p-3 mt-2`}>Editing Todo.</Text>

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
        onPress={() => editItem()}
        style={tw`bg-violet-800 py-2 px-5 mt-5 rounded-md`}>
        <Text style={tw`text-base text-white text-center text-base`}>Save</Text>
      </Pressable>
    </View>
  );
};

export default EditTodo;
