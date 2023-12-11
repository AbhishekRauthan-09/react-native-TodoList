import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import {useSelector, useDispatch} from 'react-redux';
import {addTodo, setTodolist} from '../redux/todoSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddtoDoModule from './AddtoDoModule';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [todos, setTodos] = useState(data);
  const [showAddTodoModal, setShowAddToDoModal] = useState(false);

  const data = useSelector(state => state.todos.value);

  useEffect(() => {
    setTodos(data);
  }, [data]);

  // const addDataToDatabase = async data => {

  //   try {
  //     const res = await database("")
  //       .ref('userTodos')
  //       .push({name: 'Himanshu', task: 'React Native'});
  //     console.log(res, 'check res');
  //   } catch (error) {
  //     console.log(error.message, 'check error message');
  //   }
  // };
  const addData = async data => {
    try {
      // Get Firestore instance
      const db = firestore();

      // Define collection and document
      const collectionRef = db.collection('userTodos');

      // Add data to document
      await collectionRef
        .doc()
        .set({name: 'Adhishek', task: 'React Native backend'});

      console.log('Data added successfully!');
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const deleteTodo = id => {
    const newToDosArray = todos.filter(todo => todo.id !== id);
    dispatch(setTodolist(newToDosArray));
  };

  return (
    <View style={tw`h-full flex flex-col items-center justify-start`}>
      {showAddTodoModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showAddTodoModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setShowAddToDoModal(false);
          }}>
          <View style={tw`flex-1 justify-center items-center`}>
            <AddtoDoModule
              setShowAddToDoModal={setShowAddToDoModal}
              todos={todos}
            />
          </View>
        </Modal>
      )}

      <Text style={tw`text-gray-400 font-semibold text-2xl mt-3 uppercase`}>
        Your Today's Goal
      </Text>

      <TouchableOpacity>
        <Pressable
          onPress={() => addData()}
          // onPress={() => setShowAddToDoModal(!showAddTodoModal)}
          style={tw`bg-violet-800 py-2 px-5 mt-5 rounded-md`}>
          <Text style={tw`text-base text-white`}>Add</Text>
        </Pressable>
      </TouchableOpacity>

      <ScrollView>
        <View
          style={tw`flex flex-col h-[80%] mt-3 gap-3 items-center w-full overflow`}>
          {todos?.map((item, index) => {
            return (
              <View
                key={index}
                style={tw`flex flex-col gap-2 w-[95%] items-center border border-gray-300 rounded bg-violet-100`}>
                <View
                  style={tw`flex flex-row items-center justify-between p-2 shadow shadow-gray-300`}>
                  <View style={tw`flex flex-col gap-1 items-start w-[85%]`}>
                    <Text
                      style={tw`text-violet-900 font-semibold capitalize text-xl`}>
                      {item.title}
                    </Text>
                    <Text style={tw`text-gray-500 text-base`}>{item.desc}</Text>
                  </View>

                  <View style={tw`w-[15%]`}>
                    {item?.done ? (
                      <Icon name="check" size={30} color="green" />
                    ) : (
                      <Icon name="timer-outline" size={30} color="gray" />
                    )}
                  </View>
                </View>

                <View style={tw`gap-1 flex-row items-end justify-end w-full`}>
                  <Pressable style={tw``} onPress={() => deleteTodo(item.id)}>
                    <Icon
                      name="delete-forever"
                      color="red"
                      style={tw`text-xl`}
                    />
                  </Pressable>

                  <Pressable style={tw``}>
                    <Icon name="pencil" color="gray" style={tw`text-xl`} />
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
