import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Constants from 'expo-constants';

import Spacer from '../components/Spacer';
import ButtonIcon from '../components/ButtonIcon';
import { Title, Paragraph, Card, Button, TextInput, Switch } from 'react-native-paper';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { addTodo, deleteTodo, editTodo } from '../redux/actions';

const TodoApp = ({ todo_list, addTodo, deleteTodo, editTodo }) => {
  const [task, setTask] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleAddTodo = () => {
    if (task.trim() !== '') {
      addTodo({ task, status: 'due' });
      setTask('');
    }
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
  };

  const handleEditTodo = (id, status) => {
    const newStatus = status === 'due' ? 'done' : 'due';
    editTodo({ id, status: newStatus });
  };

  const handleToggleStatus = (id, currentStatus) => {
    handleEditTodo(id, currentStatus);
  };

  return (
    <View style={styles.container}>
      <Card title="Card Title">
        <Text style={styles.paragraph}>
          ToDo App with React Native and Redux
        </Text>
      </Card>
      <Spacer />
      <Card>
        <Card.Content>
          <Title>Add ToDo Here</Title>
          <TextInput
            mode="outlined"
            label="Task"
            value={task}
            onChangeText={(task) => {
              setTask(task);
              setIsButtonDisabled(task.trim() === '');
            }}
          />
          <Spacer />
          <Button
            mode="contained"
            onPress={handleAddTodo}
            disabled={isButtonDisabled}>
            Add Task
          </Button>
        </Card.Content>
      </Card>
      <Spacer />
      <FlatList
        data={todo_list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          return (
            <>
              <Card
                style={{
                  backgroundColor:
                    item.status === 'late'
                      ? 'red'
                      : item.status === 'done'
                      ? 'green'
                      : 'white',
                }}>
                <Card.Title
                  title={`Task#${item.id}`}
                  left={(props) => (
                    <Icon name="tasks" size={24} color="black" />
                  )}
                  right={(props) => (
                    <View style={styles.buttonContainer}>
                      <Switch
                      size={16}
                        value={item.status === 'done'}
                        onValueChange={() => handleToggleStatus(item.id, item.status)}
                      />
                      <ButtonIcon
                        size={24}
                        iconName="close"
                        color="red"
                        onPress={() => handleDeleteTodo(item.id)}
                      />
                    </View>
                  )}
                />
                <Card.Content>
                  <Paragraph>{item.task}</Paragraph>
                </Card.Content>
              </Card>
              <Spacer />
            </>
          );
        }}
      />
      <Spacer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight:'5px'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    todo_list: state.todos.todo_list,
  };
};

const mapDispatchToProps = { addTodo, deleteTodo, editTodo };

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);