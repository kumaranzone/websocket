import React, { Component } from 'react';
import { RaisedButton } from 'material-ui'


export default class Chat extends React.Component {

    constructor() {
        super();

        this.state = {
            open: false,
            socket:{},
            messages:[],
            url:'wss://echo.websocket.org/',
            isInternetAvailable:navigator.onLine,
        };
        const socket = this.connectwsSocket(this.props, this, this.state.url);
        // this.socket = new WebSocket('wss://echo.websocket.org/');
        this.emit = this.emit.bind(this);
    }
    connectwsSocket = async(props, obj, url) => {
      let socket;
      try {
        socket = await new WebSocket(url);

        socket.onopen = () => {
          // connection opened
         // obj.emit();
         obj.setState(prevState => ({
          open: !prevState.open,
        }))
          socket.send(JSON.stringify({type: 'greet', payload: 'Hello Mr. Websocket!'})); // send a message
        };

        socket.onmessage = (e) => {
          // a message was received
          console.log(`message received is`, e.data);
          this.setState({
            messages: [...this.state.messages, e.data]
          }, ()=> console.log( [...this.state.messages, e.data], e.data))
        };

        socket.onerror = (e) => {
          // an error occurred
          console.log(e.message);
        };

        socket.onclose = (e) => {
          // connection closed
          console.log(`web socket closed due to ${e}`,e.code, e.reason);
        };
      } catch (e) {
       console.log('error in connect web socket ', e)
        throw e;
      }
      this.setState({ socket });
  
      return socket;
    }

    reconnectToWs = () => {
      const { socket } = this.state;
      this.setState({isInternetAvailable: navigator.onLine})
      console.log(`internet connection is `, this.state.isInternetAvailable, this.state.messages )
      if (socket.readyState !== 1 && this.state.isInternetAvailable) {
        this.connectwsSocket(this.props, this, this.state.url);
        console.log(` socket status is now :: `, socket.readyState)
        
      } else if(socket.readyState === 1 && navigator.onLine){
       // socket.send(JSON.stringify({type: 'greet', payload: 'Hello Mr. Websocket!'})); // send a message
       console.log(`web socket is connnected still`)
      }
    };
    emit() {
        this.setState(prevState => ({
            open: false,
          }))
          this.state.socket.close();
        //this.state.socket.send(JSON.stringify({type: 'greet', payload: 'Hello Mr. Server!'}));
    }

    componentDidMount() {
      this.reconnectInterval = setInterval(() => {
        this.reconnectToWs();
      }, 5000);
    }
  
    componentWillUnmount() {
      clearInterval(this.reconnectInterval);
    }

    render() {

        const LED = {
            backgroundColor: (this.state.open && this.state.isInternetAvailable)
            ? 'lightgreen'
            : 'red',
            height: 20,
            flexDirection: 'row',
            bottom: 0,
            width: 20,
            top: 10,
            borderRadius: 20,
            justifyContent: 'space-between'
        }

        return (
            <div style={styles.container}>
                <RaisedButton onTouchTap={this.emit}  color="#21ba45">{(this.state.open && this.state.isInternetAvailable)
        ? "Turn off"
        : "Turn on"}</RaisedButton>
                    <div style={LED}></div>
                    <ul>
                     {this.state.messages && this.state.messages.length>0 &&  this.state.messages.map((message, index)=>
                     
                      <li>{message}</li>
                     )}
                    </ul>
            </div>
        );
    }
}


const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
};