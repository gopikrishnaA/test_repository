import React, {Component} from 'react';
import request from 'unirest';
import GraphComponent from './GraphComponent'

export class MainContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data: [],
            seriesData: [],
            uploadedData: []
        }
        this.readFile = this.readFile.bind(this);
        this.csvToJson = this.csvToJson.bind(this);
        this.onUploadButtonClicked = this.onUploadButtonClicked.bind(this);
        this.clickOnParticularLink = this.clickOnParticularLink.bind(this)
    }
    readFile() {
        let reader = new FileReader();
        let file = this.refs.file.files[0];
        reader.onload = function(evt){
            this.csvToJson( evt.target.result);
        }.bind(this);
        reader.readAsText(file.slice(0,5000));
    }

    csvToJson(csvString) {
        const Converter = require("csvtojson").Converter;
        const converter = new Converter({noheader:true});
        let self = this;
        converter.fromString(csvString, function(err,result){
            self.setState({
                uploadedData: JSON.stringify(result)
            })
        });
    }

    onUploadButtonClicked() {
        let self = this;
        new Promise(function updateButton (resolve, reject) {
            request.post('http://localhost:3002/save')
                .send(JSON.stringify({input : JSON.parse(self.state.uploadedData)}))
                .type('application/json')
                .end(function (response) {
                    if (response.ok) {
                        const data = JSON.stringify(response.body)
                        self.setState({
                            seriesData: response.body
                        })
                        resolve()
                    } else {
                        reject()
                    }
                })
        })
    }
    clickOnParticularLink(value) {
        let self = this;
        new Promise(function updateButton (resolve, reject) {
            request.get(`http://localhost:3002/show/${value}`)
                .type('application/json')
                .end(function (response) {
                    if (response.ok) {
                        let arrayData = response.body[0];
                        let graphData = [];
                        Object.keys(arrayData).forEach(function (key) {
                            const obj = arrayData[key].split('|');
                            graphData.push({name: obj[0], score: parseInt(obj[1])});
                        });
                        self.setState({
                            data: graphData
                        });
                        resolve()
                    } else {
                        reject()
                    }
                })
        })
    }
    render () {
        const links = this.state.seriesData.map((value, index) => {
            return <u key={index} onClick={() => this.clickOnParticularLink(value.field1)} style={{margin: '10px', cursor: 'pointer', color: 'blue'}} >{value.field1}</u>
        });
        return (
            <div>
                <form style={{margin: '30px 75px'}}>
                    Select csv file to upload :
                    <input type="file" name="fileToUpload" id="fileToUpload" ref="file" onChange={this.readFile}/>
                    <input type="button" value="Upload Data" onClick={this.onUploadButtonClicked}/>
                </form>
                {this.state.seriesData.length > 0 ? <div style={{marginLeft:'70px', height: '40px'}}>{links}</div> : null}
                {this.state.data.length > 0 ? <GraphComponent data={this.state.data}/> : null}
            </div>
        );
    }
}

