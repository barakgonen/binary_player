import React, { Component } from 'react';
import InputForm from './components/form';
import { Card, Button, CardImg, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody } from 'reactstrap';
class App extends Component {
  constructor(){
    super();
    this.state = {
      interfacesConfig : []
    }
  }
  componentDidMount(){
    let url = "http://localhost:3001/";
    fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
          "Content-Type": "application/json"
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer"
  }
  )      .then(response => response.json())
  .then(data => this.setState({ interfacesConfig:data['interfaces-configuration'] }));
  }
  render() {
    return (
      <CardColumns>
        {this.state.interfacesConfig.map((interfaceData)=>
          <InputForm interfaceName={interfaceData.interfaceName} targetPort={interfaceData.targetPort}></InputForm>)}
      </CardColumns>
    );
  }
}

export default App;
