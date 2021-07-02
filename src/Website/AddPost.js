import React, { Component } from 'react';
// import LogoImage from './lorem.jpg';
import TranscriptEditor from "@bbc/react-transcript-editor";
import TestJson1 from './TestJson.json';
import { ACCESS_POINT } from '../config/index';
import bridge from '../Middleware/bridge';



class AddPost extends Component {
  constructor(props){
    super(props);
    this.state={
      someJsonFile:[],
      TextFile:[],
      PuncH :"",
      filepath:"",
      Title:""
    }
  }

  async componentDidMount(){
   try{

    let result = await bridge.getaudioorvideo();
    if(result.data.length){
      console.log(result.data);
      this.setState({
        filepath:result.data[0].filepath,
        Title:result.data[0].filename,
        // TestJson : JSON.parse(result.data[0].TestJson)
      })
    }
    let someJsonFile = [{ival:"hello"}]
    someJsonFile = JSON.stringify(someJsonFile)

    let TextFile = TestJson1.retval.words
    let PuncH = TestJson1.retval.punct

    this.setState({
      someJsonFile,
      TextFile,
      PuncH
    })
  }catch(error){
    console.log(error);
  }

    
  }

  render() {
    const { someJsonFile } = this.state
    return (
      <React.Fragment>
        {/* style={{marginLeft:0}} */}

<div class="container" >
        <br/>
<h4 style={{color:"lightslategrey"}}>Calls / IHKXNJLbjUn09UzuT767</h4>
<br/>


<br/>
<div className="row form-group">
<div className="col-sm-9">
{/* <ul class="nav nav-tabs">
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
</ul> */}
<nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">July 10 2021</a>
    <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">12:35 PM</a>
    <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Link</a>
    <a class="nav-item nav-link" id="nav-app-tab" data-toggle="tab" href="#nav-app" role="tab" aria-controls="nav-app" aria-selected="false">Appointment</a>
  </div>
</nav>
</div>
<div className="col-sm-3"><button className="btn btn-dark"  data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"  >Review Form</button></div>
</div>
<span>
{/* <button className="btn btn-dark" style={{marginLeft: '103%'}} >Review</button> */}
</span>

<br/> <br/>


<div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">

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

<TranscriptEditor
  transcriptData={TestJson1}
  mediaUrl={`${ACCESS_POINT}/sitel/filename/${this.state.filepath}`}
  // mediaUrl={"https://youtu.be/WUMMnpj5ZzM"}
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
  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
   
   <h4>Information about the video</h4>

   <p>This is video taken at 02/07/2021</p> 

   <p>Time : 12:35 PM</p>

   <p>At Dino world Sitel </p>

   <p>By Sitel Developers</p>

  </div>
  <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">

  <h4>Transcript Text Files :-</h4>

  <h4>Video of SitelLink : <a target="_blank" href="https://download.ted.com/talks/KateDarling_2018S-950k.mp4">https://download.ted.com/talks/KateDarling_2018S-950k.mp4</a></h4>

<p>
  {this.state.PuncH}
</p>

  </div>
  <div class="tab-pane fade" id="nav-app" role="tabpanel" aria-labelledby="nav-app-tab">

    {/* dfk;l */}

  </div>
</div>




{/* <TranscriptEditor
  transcriptData={someJsonFile}
  mediaUrl={"https://download.ted.com/talks/KateDarling_2018S-950k.mp4"}
/> */}



    
    </div> 

             
      </React.Fragment>
        
      
    );
  }
}

export default AddPost;