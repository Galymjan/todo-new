import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../itam-add-form';

import './app.css';

export default class App extends Component {

  maxId=100;

  state = {
    todoData : [
      this.createTodoItem('Drink coffee1'),
      this.createTodoItem('Make awesome app1'),
      this.createTodoItem('Have a launch1')
    ],
    term : '', 
    filter : 'active'// active, all, done
  };

  createTodoItem(label){
    return{
       label,
       important:false,
       done : false,
       id: this.maxId++
    };
  }

  deleteItem = (id) => {
     this.setState(({todoData})=> {
       const idx = todoData.findIndex((el)=>el.id===id);
 
       const newArray=[...todoData.slice(0,idx),...todoData.slice(idx+1)];

       return {
         todoData: newArray
       }
     }); 
  }
  
  addItem = (text) => {
     const newItem=this.createTodoItem(text);

      this.setState(({ todoData })=>{
        const newArr =[
          ...todoData,
          newItem
        ];

        return{
          todoData: newArr
        };
      });

  };

  onSearchChange = (term) => {
     this.setState({ term });

  };
  
  onFilterChange = (filter) => {
    this.setState({ filter });

};

  toogleProperty(arr, id, propName){
    const idx = arr.findIndex((el)=>el.id===id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName] : !oldItem[propName]};
        return [
          ...arr.slice(0,idx),
          newItem,
          ...arr.slice(idx+1)];
  }

  onToggleImportant = (id) =>
  {
    this.setState(
      ({todoData}) => {
        return {
          todoData:this.toogleProperty(todoData,id,'important')
        };
      }
    );
  };

  onToggleDone = (id) =>
  {
     //console.log('onToggleDone',id);
     this.setState(
      ({todoData}) => {
        return {
          todoData:this.toogleProperty(todoData,id,'done')
        };
      }
    );
  };

  search(items, term){
    if(term.length==0){
      return items;
    }
    return items.filter((item)=> {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) >-1;
    })
  }

  filter(items, filter){
    switch(filter){
      case 'all': return items;
      case 'active' :
        return items.filter((item)=>{ return !item.done});
      case 'done' :
        return items.filter((item)=>item.done);  
      default:
        return items;

    }
  }

  render(){

    const {todoData, term, filter}=this.state;

    const visibleItems = this.filter( this.search(todoData,term), filter);
    const doneCount = todoData
                                  .filter((el)=>el.done).length;

    const todoCount = todoData.length-doneCount;                                  

    return (<div>
      <AppHeader toDo={todoCount} done={doneCount}/>  
      <div className="top-panel d-flex p-2">
        <SearchPanel onSearchChange={this.onSearchChange}/>
        <ItemStatusFilter 
          filter={filter}
          onFilterChange={this.onFilterChange}/>
      </div>  
      <TodoList 
        todos = {visibleItems}
        onDeleted={this.deleteItem}
        onToggleImportant={this.onToggleImportant}
        onToggleDone={this.onToggleDone}/>
        
        <ItemAddForm onItemAdded={this.addItem}/>
      </div>);
  }
}
