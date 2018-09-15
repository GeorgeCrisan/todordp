import React  from 'react';
import {connect} from 'react-redux';
import { addTodo,deleteItem, toggleTodo } from '../actions';
import moment from 'moment';
import './App.css';

function mapStateToProps(state){
     return {
           todos: state.todos,
           fullstate: state
     }
}

function mapDispatchToProps(dispatch){
         return {
               addNewTodo: (element)=>{
                   dispatch(addTodo(element))},
               deleteItem: (index)=>{
                   dispatch(deleteItem(index));
               },
               toggleItem:(index)=>{
                    dispatch(toggleTodo(index));
               }   
               
         }
}


//TheList is going the reunder each element for the to do and I am going
// to abstract later on each el in his own class ItemdoTo to promote some functionality
class TheList extends React.Component {
    constructor(props){
       super(props);
      this.toggleComplete = this.toggleComplete.bind(this);
      this.deleteItem = this.deleteItem.bind(this);
    }
    componentDidMount () {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    
   componentWillReceiveProps(){
       localStorage.setItem('fullstate',JSON.stringify(this.props.fullstate));
   }

    toggleComplete(event){
         
         this.props.toggleItem(Number(event.target.attributes.index.value));
          
         
         
    }

    deleteItem(event){
           this.props.deleteItem(Number(event.target.attributes.index.value));
    }

    render(){
             let data = [...this.props.todos];
            
           let list =   data.map((el,i)=>{
                         
                   return( <li key={i + 'fcsd32'}> <div onClick={this.toggleComplete}  style={el.completed ? {cursor:'pointer',  textDecoration:'line-through'}:{cursor:'pointer', textDecoration:'none'}} index={i} > 
                   { i+1 + '. ' + el.text }</div> <button className='button-delete' index={i} onClick={this.deleteItem}>Delete</button></li>);
           });

        
          return(<ul className='unordered-list'>
                 {list} 
            </ul>);
    }
}


class TodoApp extends React.Component {
   constructor(props){
        super(props);
        this.state= {
            inpValue: ''
        }
       this.onSubmit = this.onSubmit.bind(this);
   }
     componentDidUpdate(){
        localStorage.setItem('fullstate',JSON.stringify(this.props.fullstate));
     }

    onSubmit(e){
          e.preventDefault();
          
          if(this.state.inpValue.length < 2)
              return;

          this.props.addNewTodo(this.state.inpValue);
          
          this.setState({inpValue:''});

    }

   render(){
      
     return (
       <div className='base'>
       <h1> Today's to do ... </h1>
       <form  onSubmit={this.onSubmit}>
         <input onChange={(event)=>{
          this.setState({inpValue: event.target.value});
         }} value={this.state.inpValue} />
         <button className='button' type='submit'> Add Task </button>
       </form>

       <ContainerList />
       <ins className="adsbygoogle"
     style={{display:'block'}}
     data-ad-client="ca-pub-2372442392819950"
     data-ad-slot="9393559310"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
       </div>)
   }

}




const ContainerList = connect(mapStateToProps,mapDispatchToProps)(TheList);
const Container = connect(mapStateToProps,mapDispatchToProps)(TodoApp);


export default Container;
