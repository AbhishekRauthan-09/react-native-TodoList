import firestore from '@react-native-firebase/firestore';

const db = firestore();

export const addToDo = async data => {
  try {
    console.log('running');
    await db.collection('todos').add({...data, date: new Date()});
    console.log('added to firebase');
    return {success: true};
  } catch (error) {
    console.log('error', error.message);
    return {success: false, message: error.message};
  }
};

export const getTodos = async () => {
  try {
    console.log('in api');
    const dataDoc = await db.collection('todos').get();
    const data = dataDoc.docs.map(item => {
      return {...item.data() , docId: item.id}
    });
    return {success: true, data};
  } catch (error) {
    return {success: false, message: error.message};
  }
};

export const deleteToDo = async(docId) => {
  try {
    console.log('in api deleting', docId);
    await db.collection('todos').doc(docId).delete();
    console.log("deleted")
    return {success: true};
  } catch (error) {
    return {success: false, message: error.message};
  }
};

export const editToDo = async(data) => {
  try {
    const docId = data.docId;
    console.log('in api deleting', docId);
    delete data.docId;
    console.log('in api');
    await db.collection('todos').doc(docId).set({...data , updatedAt:new Date()});
    return {success: true};
  } catch (error) {
    return {success: false, message: error.message};
  }
};

export const markComplete = async(data) => {
  try {
    const docId = data.docId;
    console.log('marking complete', docId);
    delete data.docId;
    await db.collection('todos').doc(docId).update({done:data.done});
    return {success: true};
  } catch (error) {
    return {success: false, message: error.message};
  }
};


