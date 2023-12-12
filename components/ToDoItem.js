import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ToastAndroid
} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {setTodolist} from '../redux/todoSlice';
import {deleteToDo, markComplete} from './Apis';

const ToDoItem = ({data, setShowTodoItem, setRefetchTodos}) => {
  const deleteTodo = async id => {
    const {success} = await deleteToDo(id);
    if (success) {
      setRefetchTodos({});
      setShowTodoItem(false);
      ToastAndroid.show('deleted Successfully!', ToastAndroid.SHORT);
    }
    else{
      ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
    }
  };

  const markCompletetodo = async () => {
    const body = {
      docId: data.docId,
      done: true,
    };
    const {success} = await markComplete(body);
    if (success) {
      ToastAndroid.show('Marked Successfully !', ToastAndroid.SHORT);
      setRefetchTodos({});
      setShowTodoItem(false);
    }
    else{
      ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
    }
  };

  return (
    <View
      style={tw`w-full max-h-[75%] flex flex-col p-1 rounded-md relative bg-white`}>
      {/* <TouchableOpacity > */}
      <Pressable
        style={tw`items-end absolute right-0`}
        onPress={() => setShowTodoItem(false)}>
        <Icon name="close" color="red" style={tw`text-2xl`} />
      </Pressable>
      {/* </TouchableOpacity> */}
      <View
        style={tw`w-[100%] flex absolute top-1 right-4  justify-center items-center`}>
        <View style={tw`p-1 bg-gray-600 rounded-xl w-[30%]`}></View>
      </View>

      <View style={tw`flex flex-row justify-center gap-3 mt-6`}>
        <Pressable
          style={tw`flex flex-row items-center px-2 rounded-md border border-red-600 mt-3`}
          onPress={() => deleteTodo(data.docId)}>
          <Text style={tw`text-base text-red-500 font-semibold`}>Delete</Text>
          <Icon name="delete-forever" color="red" style={tw`text-xl`} />
        </Pressable>

        <Pressable
          style={tw`flex flex-row items-center px-2 rounded-md border border-gray-600 mt-3`}>
          <Text
            style={tw` text-base ${
              data?.done ? 'text-green-700' : 'text-violet-600'
            }`}>
            {data?.done ? 'Completed' : 'Pending'}
          </Text>
        </Pressable>
      </View>
      <ScrollView style={tw`mt-5 px-3 flex flex-col gap-2 pb-6`}>
        <Text style={tw`text-2xl font-bold text-violet-800 capitalize`}>
          {data.title}
        </Text>

        <Text style={tw`text-base  mt-2 capitalize text-gray-500`}>
          {data.desc}
        </Text>

        {!data?.done && (
          <View style={tw`flex-1 items-start w-full flex-row gap-2`}>
            <Pressable
              style={tw`flex flex-row items-center px-2 rounded-md border border-violet-600 mt-3`}
              onPress={() => markCompletetodo()}>
              <Text style={tw`text-base text-gray-500 font-semibold`}>
                Mark Complete
              </Text>
              <Icon name="delete-forever" color="gray" style={tw`text-xl`} />
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ToDoItem;
