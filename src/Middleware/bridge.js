
import { ACCESS_POINT } from '../config';

import http from "./http";





const GetPosts = async (t) => {
//  console.log(data)
  const result = await http.get(ACCESS_POINT + `/sitel/getposts`);
  return result;
};

const GetPostsById = async (id) => {
  //  console.log(data)
    const result = await http.get(ACCESS_POINT + `/sitel/getpostbyid/${id}`);
    return result;
  };

  const AddLocation = async(FormData)=>{
    const result = await http.post(ACCESS_POINT + `/sitel/location`,FormData,{
      headers:{
        'Content-Type': 'multipart/form-data',
      }
    })
    return result;
  }


  const SearchallData = async(FormData)=>{
    console.log(FormData);
    const result = await http.post(ACCESS_POINT + `/sitel/searchdata`,FormData,{
      headers:{
        'Content-Type': 'multipart/form-data',
      }
    })
    return result;
  }

  const SelectedSearchallData = async(FormData)=>{
    console.log(FormData);
    const result = await http.post(ACCESS_POINT + `/sitel/searchselectdata`,FormData,{
      headers:{
        'Content-Type': 'multipart/form-data',
      }
    })
    return result;
  }

  

  const AddRules = async(FormData)=>{
    const result = await http.post(ACCESS_POINT + `/sitel/rules`,FormData,{
      headers:{
        'Content-Type': 'multipart/form-data',
      }
    })
    return result;
  }

  const AddDetails = async(FormData)=>{
    const result = await http.post(ACCESS_POINT + `/sitel/adddetails`,FormData,{
      headers:{
        'Content-Type': 'multipart/form-data',
      }
    })
    return result;
  }


  const GetDeatils = async (id) => {
    //  console.log(data)
      const result = await http.get(ACCESS_POINT + `/sitel/adddetails`);
      return result;
    };

  const LoginUserData = async(FormData)=>{
    const result = await http.post(ACCESS_POINT + `/sitel/login`,FormData,{
      headers:{
        'Content-Type': 'multipart/form-data',
      }
    })
    return result;
  }

  const GetLocation = async (id) => {
    //  console.log(data)
      const result = await http.get(ACCESS_POINT + `/sitel/location`);
      return result;
    };

    const GetRule = async (id) => {
      //  console.log(data)
        const result = await http.get(ACCESS_POINT + `/sitel/rules`);
        return result;
      };

    const GetLocationByValueandLabel = async () => {
      
        const result = await http.get(ACCESS_POINT + `/sitel/locationvandl`);
        return result;
      };

      const GetRuleByValueandLabel = async () => {
      
        const result = await http.get(ACCESS_POINT + `/sitel/rulevandl`);
        return result;
      };

      const getaudioorvideo = async () => {
      
        const result = await http.get(ACCESS_POINT + `/sitel/getaudioorvideo`);
        return result;
      };

      


    const UpdateLocation = async(id,body)=>{
      const result = await http.put(
        ACCESS_POINT + `/sitel/location/${id}`,
        body
      );
      return result;
    
    }

    const UpdateRule = async(id,body)=>{
      const result = await http.put(
        ACCESS_POINT + `/sitel/rule/${id}`,
        body
      );
      return result;
    
    }
  
    const updateMaster = async (tableName, id, categoryArray, column = "id") => {
      const result = await http.put(
        ACCESS_POINT + `/sitel/master/${tableName}/${column}`,
        { id: id, categoryArray }
      );
      return result;
    };



const deleteMaster = async (id) => {
  const result = await http.delete(
    ACCESS_POINT + `/sitel/deletepost/${id}`
  );
  return result;
};

const deleteDeatils = async (id) => {
  const result = await http.delete(
    ACCESS_POINT + `/sitel/adddetails/${id}`
  );
  return result;
};





export default {
  GetRuleByValueandLabel,
  getaudioorvideo,
  UpdateRule,
  GetLocationByValueandLabel,
  UpdateLocation,
    GetPosts,
    deleteMaster,
    GetPostsById,
    AddLocation,
    SelectedSearchallData,
    GetLocation,
    AddRules,
    GetRule,
    LoginUserData,
    AddDetails,
    GetDeatils,
    updateMaster,
    deleteDeatils,
   SearchallData 

}