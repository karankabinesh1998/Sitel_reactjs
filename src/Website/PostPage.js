import React, { Component } from 'react';
import Bridge from '../Middleware/bridge';

class PostPage extends Component {
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

          let result = await Bridge.GetPosts();
          if(result.data.length){
            console.log(result);
              this.setState({
                PostData:result.data
              })
          }

        }catch(error){
          console.log(error);
        }
      }


      DeletePost=async(id)=>{
        try {

          const Data = this.state.PostData.filter((delelteid) => delelteid.id !== id);

          console.log(Data);

          let result = await Bridge.deleteMaster(id);

          if(result){

            this.setState({
              PostData : Data
            })

          }
          
        } catch (error) {
          console.log(error);
        }
      }

  render() {
    const { PostData  }=this.state;
    return (
      <React.Fragment>

<div class="container">
        
        <br/>
        <div>
            <h1 style={{display:"inline"}}>All Posts</h1>
            
        </div>

    {PostData.length ? PostData.map((ival,i)=>{
       
       return(
         <React.Fragment>
           <hr/>
           <h2>{ival.title}</h2>
           <small> Written by {ival.author} on {ival.createdAt}</small>
           <br/>
    <br/>
    <p style={{whiteSpace:"pre-wrap"}}>{ival.post}</p>
    <br/>
    <a class="btn btn-danger" onClick={()=>this.DeletePost(ival.id)} href={`javascript:void(0)`}>Delete</a>
    <a style={{marginLeft:"5px"}} class="btn btn-primary" href={`/posts/edit/${ival.id}`}>Edit</a>
    <a style={{marginLeft:"5px"}} class="btn btn-success " href="/posts/new" >+ New Post</a>
    <br/>
    <hr/>

         </React.Fragment>
       )


    }) : null
  }




    <br/>


     </div>        
      </React.Fragment>
        
      
    );
  }
}

export default PostPage;