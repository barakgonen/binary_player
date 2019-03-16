import React from 'react';
import PlayIcon from '../icons/play.svg';
import StopIcon from '../icons/stop.svg';
import ErrorIcon from '../icons/error.svg';
import CheckIcon from '../icons/check.svg';
import { Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody } from 'reactstrap';
class InputForm extends React.Component{
    constructor(){
        super()
        this.state={
            status: "play",
            serverIP: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }
    selectProperIcon = () => {
        switch(this.state.status){
            case "play": 
                 return PlayIcon;
            case "error":
                return ErrorIcon;
            case "stop":
                return StopIcon;
            case "check":
                return CheckIcon;
        }
    }
    buttonOnClick = (event) => {
        event.preventDefault();
        let url = "http://localhost:3001/";
        fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer",
            body: JSON.stringify({
              interfaceName: this.props.interfaceName,
              serverIP: this.state.serverIP,
              targetPort: this.props.targetPort
            })
        }).then(response => response.text()).then((response) => {
            if(response === "timeout")
            {
                this.setState({status:"error"})
            }
            if(response === "check"){
                this.setState({status:"check"})
            }
        })
    }
    handleChange(event) {
        event.preventDefault();
        this.setState({serverIP: event.target.value});
    }
    
   render(){
       return(
                 <Card className="text-center">
                 <CardBody>
                   <CardTitle>{this.props.interfaceName} - {this.props.targetPort}</CardTitle>
                   <CardText>
                       <input className="text-center" placeholder="Your Machine IP Address" onChange={this.handleChange} type="text" id="serverIP">
                           </input></CardText>
                   <Button onClick={this.buttonOnClick}><img src={this.selectProperIcon()}></img></Button>
                 </CardBody>
               </Card>
       );
   }

}
export default InputForm;