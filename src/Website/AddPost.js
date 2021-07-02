import React, { Component } from 'react';
// import LogoImage from './lorem.jpg';
import TranscriptEditor from "@bbc/react-transcript-editor";
import TestJson from './TestJson.json';


class AddPost extends Component {
  constructor(props){
    super(props);
    this.state={
      someJsonFile:[]
    }
  }

  async componentDidMount(){

    let someJsonFile = [{ival:"hello"}]
    someJsonFile = JSON.stringify(someJsonFile)

    this.setState({
      someJsonFile
    })

    console.log(TestJson);
  }

  render() {
    const { someJsonFile } = this.state
    return (
      <React.Fragment>
        {/* style={{marginLeft:0}} */}

<div class="container" >
        <br/>
<h4>Calls / IHKXNJLbjUn09UzuT767</h4>
<br/>
<br/>
<div className="row form-group">
<div className="col-sm-9">
<ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link active" href="#">July 10 2021</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" href="#">12:35 PM</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" href="#">Appointment</a>
  </li>
</ul>
</div>
<div className="col-sm-3"><button className="btn btn-dark"   >Review Form</button></div>
</div>
<span>
{/* <button className="btn btn-dark" style={{marginLeft: '103%'}} >Review</button> */}
</span>

<br/> <br/>


<div style={{width:'100%'}}>
<div className="row form-group">
                <div className="col-sm-2"><h5>Transcript</h5></div>

                <div className="col-sm-6"></div>



<div className="col-sm-1">
  
  <span style={{background:"violet",padding:"3px"}}>keyword</span>
  
</div>

<div className="col-sm-1"> 
{/* <button className="btn btn-success">Entity</button>  */}
<span style={{background:"lightgreen",padding:"3px"}}>Entity</span>
 </div>

<div className="col-sm-1">
   {/* <button className="btn btn-info">Phrase</button> */}
   <span style={{background:"lightsteelblue",padding:"3px"}}>Phrase</span>
   
    </div>

<div className="col-sm-1">
   {/* <button className="btn btn-danger">Incident</button>  */}
   <span style={{background:"red",padding:"3px"}}>Incident</span>
   </div>

</div>
</div>

{/* <TranscriptEditor
  transcriptData={someJsonFile}
  mediaUrl={"https://download.ted.com/talks/KateDarling_2018S-950k.mp4"}
/> */}

<TranscriptEditor
  transcriptData={TestJson}
  mediaUrl={"https://download.ted.com/talks/KateDarling_2018S-950k.mp4"}
  handleAutoSaveChanges={this.handleAutoSaveChanges}
  autoSaveContentType={"digitalpaperedit"}
  isEditable={true}
  spellCheck={false}
  sttJsonType={"bbckaldi"}
  handleAnalyticsEvents={this.handleAnalyticsEvents}
  fileName={"ted-talk.mp4"}
  title={"Ted Talk"}
  ref={this.transcriptEditorRef}
  mediaType={"video"}
/>

    
    </div> 

             
      </React.Fragment>
        
      
    );
  }
}

export default AddPost;