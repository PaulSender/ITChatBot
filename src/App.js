import {style} from './App.css';
import React from 'react';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

  }
  
  updateMessages = (obj) => {
    const cState = this.state.messages
    const updatedState = cState.concat(obj);
    this.setState({
      messages : updatedState
    })
    axios.post("http://localhost:3001/", this.state.messages).then(res => {
      console.log(res.data);
      this.setState({
        response: res.data
      })
    }).catch(e => {
      console.error(e);
    })
  }
  
  render() {
    return(
      <div>
        <div style={{display: "block", margin: "auto"}}>
        <MessageArea messages={this.state.messages}/>
        <UserInput updateMessages = {this.updateMessages}/>
        </div>
      </div>
      );
  }
}

class MessageArea extends React.Component {
  render() {
    return(
        <div className="container" style = {{border: '1px solid black', display:"block", height: '500px' , width: '70%', margin:"auto"}}>
          {this.props.messages.map(item => (
            <div style= {{margin: "10px"}}>
              <div className="userNameDisp" key={item}>{item.user}</div>
              <div className="userTextDisp" key={item}>{item.text}</div>
            </div>
            ))}
        </div>
      );
  }
}

class UserInput extends React.Component {
  constructor(){
    super();
    this.state ={
      user : 'User:',
      text : ''
    };
  }

  handleSubmit() {
    this.props.updateMessages(this.state)
    this.setState({
      text: ''
    })
    Array.from(document.querySelectorAll("input#userInput")).forEach(
      input => (input.value = "")
    );
  }

  
  render(){
    return(
      <div>
        <div className="Container" style={{position: "absolute", width:"15%", left:"287px"}}>
        <label>
          <input type="text" id="userInput" placeholder="Aa" onChange={e => this.setState({text: e.target.value})}/>
        </label>
        <input type="submit" value="Submit" onClick={() => this.handleSubmit()}/>
        </div>
      </div>
    );
  }
}

export default App;
