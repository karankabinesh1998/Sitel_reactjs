import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Homepage from '../Website/Homepage';
import Header from '../Website/Header';
import PostPage from  '../Website/PostPage';
import AddPost from '../Website/AddPost';
import EditPost from '../Website/EditPost';

import AddLocation from '../Website/AddLocation';
import AddRule from '../Website/AddRule';
import Loginpg from '../Website/Loginpg';




export default function Routes() {
    return (
<BrowserRouter>

      


      <Route
        exact
        path={'/'}
        render={(props) => (
          <React.Fragment>
              {/* <Header {...props}/> */}
             <Loginpg {...props} />
          
          </React.Fragment>
        )}
      />


<Route
        exact
        path={'/home'}
        render={(props) => (
          <React.Fragment>
              <Header {...props}/>
             <Homepage {...props} />
          
          </React.Fragment>
        )}
      />


<Route
        exact
        path={'/location'}
        render={(props) => (
          <React.Fragment>
              <Header {...props}/>
             <AddLocation {...props} />
          
          </React.Fragment>
        )}
      />

<Route
        exact
        path={'/rule'}
        render={(props) => (
          <React.Fragment>
              <Header {...props}/>
             <AddRule {...props} />
          
          </React.Fragment>
        )}
      />


<Route
        exact
        path={'/trans'}
        render={(props) => (
          <React.Fragment>
              <Header {...props}/>
             <AddPost {...props} />
          
          </React.Fragment>
        )}
      />


<Route
        exact
        path={'/speachtotext'}
        render={(props) => (
          <React.Fragment>
              <Header {...props}/>
             <EditPost {...props} />
          
          </React.Fragment>
        )}
      />


   

 </BrowserRouter>
    )

    
          }