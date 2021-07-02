import React, { Component } from 'react';
import Bridge from '../Middleware/bridge';

class EditPost extends Component {
  constructor(props)
  {
      super(props)
      {
          this.state=
          {
            PostData:[]
          }

        }

      }


      async componentDidMount(){
        try{

          let id = this.props.match.params.id
          // console.log(this.props.match.params.id);

          let result = await Bridge.GetPostsById(id);
          if(result.data.length){
            
              this.setState({
                PostData:result.data[0]
              })

              // console.log(this.state.PostData.post);
          }

        }catch(error){
          console.log(error);
        }
      }

      HandleChange=async(e)=>{
        const { PostData } = this.state;

        if(e.target.name == 'title'){
          PostData.title = e.target.value
        }else if(e.target.name == 'author'){
          PostData.author = e.target.value
        }else{
          PostData.post = e.target.value
        }

        this.setState({
          PostData
        })
      }

  render() {
    const{PostData}= this.state;
    return (
      <React.Fragment>

<div class="container">
        
        <h1>Editing Post</h1>
        
            <hr/>
            <h2>Edit:</h2>
            <form action={`http://localhost:5000/sitel/updatepost/${PostData.id}`} method='POST'>
                <label for="title">Title:</label>
                <input class="form-control" required = "required" type="text" name='title' id='title' onChange={this.HandleChange} value={PostData.title} aria-label="Enter Title"/>
                <br/>
                <label for="author">Author:</label>
                <input class="form-control" required = "required" type="text" name='author' id='author' onChange={this.HandleChange} value={PostData.author} aria-label="Enter Author"/>
                <br/>
                <label for="content">Post:</label>
                <textarea class="form-control" required = "required" name='post' id="content" onChange={this.HandleChange} aria-label="Enter Content" value={PostData.post} rows="3"></textarea>
                <br/>
                <input type='submit' value='Save'/>
            </form>
            <hr/>
        
            </div>

             
      </React.Fragment>
        
      
    );
  }
}

export default EditPost;