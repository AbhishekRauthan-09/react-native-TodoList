import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Modal,
  ToastAndroid,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import {useSelector, useDispatch} from 'react-redux';
import {addTodo, setTodolist} from '../redux/todoSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddtoDoModule from './AddtoDoModule';
import ToDoItem from './ToDoItem';
import {deleteToDo, getTodos} from './Apis';
import EditTodo from './EditTodo';
import moment from 'moment';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [todos, setTodos] = useState(data);
  const [showAddTodoModal, setShowAddToDoModal] = useState(false);
  const [showTodoItem, setShowTodoItem] = useState(false);
  const [selectedTodoItem, setSelectedTodoItem] = useState(null);
  const [refetchTodos, setRefetchTodos] = useState({});
  const [showEditTodoModl, setshowEditTodoModal] = useState(false);

  const data = useSelector(state => state.todos.value);

  useEffect(() => {
    setTodos(data);
  }, [data]);

  const deleteTodo = async id => {
    const {success} = await deleteToDo(id);
    if (success) {
      ToastAndroid.show('Deleted Successfully!', ToastAndroid.SHORT);
      setRefetchTodos({});
    } else {
      ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
    }
  };

  const getAllToDos = async () => {
    console.log('getting all todos');
    const {success, data} = await getTodos();
    if (success) {
      dispatch(setTodolist(data));
    }
  };

  useEffect(() => {
    console.log('running useEffect');
    getAllToDos();
  }, [refetchTodos]);

  return (
    <View style={tw`h-full flex flex-col items-center justify-start`}>
      {showAddTodoModal && (
        <Modal
          animationType=""
          transparent={true}
          visible={showAddTodoModal}
          onRequestClose={() => {
            setShowAddToDoModal(false);
          }}>
          <View style={tw`flex-1 justify-end items-center bg-[#18131363]`}>
            <AddtoDoModule
              setShowAddToDoModal={setShowAddToDoModal}
              todos={todos}
              setRefetchTodos={setRefetchTodos}
            />
          </View>
        </Modal>
      )}

      {showTodoItem && (
        <Modal
          animationType=""
          transparent={true}
          visible={showTodoItem}
          onRequestClose={() => {
            setSelectedTodoItem(null);
            setShowTodoItem(false);
          }}>
          <View style={tw`flex-1 justify-end items-center bg-[#18131363]`}>
            <ToDoItem
              data={selectedTodoItem}
              setShowTodoItem={setShowTodoItem}
              setRefetchTodos={setRefetchTodos}
            />
          </View>
        </Modal>
      )}

      {showEditTodoModl && (
        <Modal
          animationType=""
          transparent={true}
          visible={showEditTodoModl}
          onRequestClose={() => {
            setshowEditTodoModal(false);
          }}>
          <View style={tw`flex-1 justify-end items-center bg-[#18131363]`}>
            <EditTodo
              data={selectedTodoItem}
              setshowEditTodoModal={setshowEditTodoModal}
              setRefetchTodos={setRefetchTodos}
            />
          </View>
        </Modal>
      )}

      <Text style={tw`text-gray-400 font-semibold text-2xl mt-3 uppercase`}>
        Your Today's Goal
      </Text>

      <TouchableOpacity>
        <Pressable
          onPress={() => setShowAddToDoModal(!showAddTodoModal)}
          style={tw`bg-violet-800 py-2 px-5 mt-5 rounded-md`}>
          <Text style={tw`text-base text-white`}>Add</Text>
        </Pressable>
      </TouchableOpacity>

      <TouchableOpacity>
        <Pressable
          onPress={() => navigation.navigate('Video')}
          style={tw`bg-violet-800 py-2 px-5 mt-5 rounded-md`}>
          <Text style={tw`text-base text-white`}>Go to video</Text>
        </Pressable>
      </TouchableOpacity>

      <View style={tw`w-full flex flex-row justify-center bg-red-500`}>
        <FlatList
          data={todos}
          style={tw`p-2 mt-4 max-w-[90%] bg-gray-500`}
          horizontal
          renderItem={({item}) => {
            return (
              <>
                {console.log('item is', item?.title)}
                <View
                  style={{
                    height: 200,
                    width: 300,
                    borderWidth: 2,
                    borderColor: 'gray',
                  }}>
                  <Text>{item?.title}</Text>
                </View>
              </>
            );
          }}
          keyExtractor={item => item.docId}
          ItemSeparatorComponent={() => {
            return (
              <>
                <View
                  style={{
                    padding: 10,
                  }}></View>
              </>
            );
          }}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const item = () => {
  <ScrollView>
    <View style={tw`flex flex-col h-[80%] mt-3 gap-3 items-center w-full`}>
      {todos?.length > 0 ? (
        todos?.map((item, index) => {
          return (
            <View
              key={index}
              style={tw`flex flex-col gap-2 w-[95%] items-center border border-gray-300 rounded bg-violet-100`}>
              <TouchableOpacity
                onPress={() => {
                  setShowTodoItem(true), setSelectedTodoItem(item);
                }}>
                <View
                  style={tw`flex flex-row items-center justify-between p-2 shadow shadow-gray-300`}>
                  <View style={tw`flex flex-col gap-1 items-start w-[85%]`}>
                    <Text
                      style={tw`text-violet-900 font-semibold capitalize text-xl`}>
                      {item.title}
                    </Text>
                    {/* <Text style={tw`text-gray-500 text-base`}>{item.desc}</Text> */}
                  </View>

                  <View style={tw`w-[15%]`}>
                    {item?.done ? (
                      <Icon name="check" size={30} color="green" />
                    ) : (
                      <Icon name="timer-outline" size={30} color="gray" />
                    )}
                  </View>
                </View>
              </TouchableOpacity>

              <View
                style={tw`gap-4 flex-row items-end justify-between w-full bg-white`}>
                <View style={tw`flex flex-row gap-3`}>
                  <Pressable
                    style={tw``}
                    onPress={() => deleteTodo(item.docId)}>
                    <Icon
                      name="delete-forever"
                      color="red"
                      style={tw`text-xl`}
                    />
                  </Pressable>

                  <Pressable
                    style={tw``}
                    onPress={() => {
                      setSelectedTodoItem(item), setshowEditTodoModal(true);
                    }}>
                    <Icon name="pencil" color="gray" style={tw`text-xl`} />
                  </Pressable>
                </View>

                <Text style={tw`text-base text-gray-500`}>
                  {moment(item.date).format('DD/MM/YYYY hh:mm a')}
                </Text>
              </View>
            </View>
          );
        })
      ) : (
        <Text
          style={tw`flex-1 items-center justify-center mt-10 text-3xl text-center w-full text-violet-300 font-semibold`}>
          No Todos Added
        </Text>
      )}
    </View>
  </ScrollView>;
};
