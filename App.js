import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import store from './todoStore'

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = store.getState();

    store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  onAddStarted(){
    this.nav.push({
      name: 'taskForm'
    })
  }

  onDone(todo){
    console.log('todo was completed: ', todo.task);
    // const filteredTodos =
    //   this.state.todos.filter((filterTodo) => {
    //     return filterTodo !== todo;
    //   })
    //   this.setState({ todos: filteredTodos })
    store.dispatch({
      type: 'DONE_TODO',
      todo,
    })
  }

  onToggle(){
    store.dispatch({
      type: 'TOGGLE_STATE',
    })
  }

  renderScene(route, nav){
    switch (route.name){
      case 'taskForm':
        return (
          <TaskForm
            onAdd={this.onAdd.bind(this)}
            onCancel={this.onCancel.bind(this)}
          />
        )
      default:
        return (
          <TaskList
            filter={this.state.filter}
            onToggle={this.onToggle.bind(this)}
            onDone={this.onDone.bind(this)}
            onAddStarted={this.onAddStarted.bind(this)}
            todos={this.state.todos}
          />
        )
    }
  }

  configureScene(){
    return Navigator.SceneConfigs.FloatFromBottom
  }

  onCancel(){
    console.log('cancelled');
    this.nav.pop();
  }

  onAdd(task){
    console.log('a task was added: ', task);
    // this.state.todos.push({task});
    // this.setState({todos: this.state.todos})
    store.dispatch({
      type: 'ADD_TODO',
      task,
    })
    this.nav.pop();
  }

  render() {
    return (
      <Navigator
        configureScene={this.configureScene}
        initialRoute={{name: 'tasklist', index: 0}}
        ref={((nav)=>{
          this.nav = nav;
        })}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
