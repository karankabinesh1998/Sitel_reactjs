import React, { Component } from 'react';
// import LogoImage from './lorem.jpg';
import Bridge from '../Middleware/bridge';

import ModelWindow from "../Component/Model";
import SingleSelect from '../Component/SingleSelect';
import Switch from "react-switch";
import { BsInfoCircle } from 'react-icons/bs'

import Datatable from "../Component/Datatable/Datatable";
import swal from 'sweetalert';
import moment from 'moment';
import { AiFillTags } from 'react-icons/ai';
import { RiMenuFill } from 'react-icons/ri';
import SearchBar from 'react-js-search';

import './Style.css'

class Homepage extends Component {
  constructor(props){
    super(props);
    this.state={

      LocationOption:[],
      selectedlocation:{},
      RuleOption:[],
      selectedrule:{},
      description:"",
      Userdetails : JSON.parse(localStorage.getItem("Userdetails")) == null ? [] : JSON.parse(localStorage.getItem("Userdetails")) ,
      Componets1:{checkAggravated:false,checkAngry:false,checkannoyed:false,checkdisappointed:false},
      checkAggravated:false,
      Data:[],
      StatusCheck:false,
      SearchField:null,
      SearchChoice:[{value:1,label:"location"},{value:2,label:"rule"},{value:3,label:"modifiedBy"}],
      IsEditState:false,
      SearchResult:[],
      column: [
        {
          Header: "Icon",
          accessor: "location",
          Cell:(d)=>this.IconView(d)
        },
        {
          Header:"Location",
          accessor:"locationname"
        },
        {
          Header:"Rule",
          accessor:"rulename"
        },
        {
          Header:"Components/Indicator",
          accessor:"Component_indicator",
          Cell: (d) => this.Component_indicator(d),
        },
        {
          Header:"ModifiedBy",
          accessor:"ModifiedUser"
        },
        {
          Header:"Modified_At",
          accessor:"modified_At"
        },
        {
          Header:"Created By",
          accessor:"createdBy"
        },
        {
          Header:"Effective From",
          accessor:"createdAt"
        },
        {
          Header:"Status",
          accessor:"status",
          Cell: (d) => this.Status(d),
        },
        {
          Header:"Coach",
          accessor:"coach",
          Cell: (d) => this.Coach(d),
        },
        {
            Header: "Edit",
            accessor: "edit",
            Cell: (d) => this.edit(d),
          },
        {
          Header: "Delete",
          accessor: "delete",
          Cell: (d) => this.delete(d),
                      },
        ]

    }
  }

  IconView = (d)=>{
    return(
      <AiFillTags size={25} />
    )
  }

  Component_indicator= (d)=>{

    let value = JSON.stringify(d.original.Component_indicator)
  
    let text = `Aggravated..`;

    

    return(
      <div class="dropdown">
        <span data-toggle="modal"
                   data-target="#componentsor" onClick={()=>this.OnmclickInfo(d)} ><BsInfoCircle style={{cursor:"pointer"}} size={20} />{text}</span>
      </div>
    )
  }

  OnmclickInfo = async(d)=>{
    //  console.log(d.original.Component_indicator);
    this.setState({
      Componets1:JSON.parse(d.original.Component_indicator)
    })
    // console.log(this.state.Componets1);

  }

  delete = (d) => {

    return (
        <center>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => this.deletion(d)}
      >
        Delete
      </button>
      </center>
    );
  };


deletion =async(value)=>{

const previousData = [...this.state.Data];
// Seperating data row using row-index
const getData = { ...previousData[value.index] };

//getting id on that data
const id = getData.id;
//removing specific id in previous state data
const Data = previousData.filter((delelteid) => delelteid.id !== id);

try {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this !",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then(async(willDelete) => {
       
        if (willDelete) {
            const result = await Bridge.deleteDeatils(
                id
              );
              if (result) {
                  console.log(result);
                this.setState({ Data });
                swal("Poof! Your Data has been deleted!", {
                    icon: "success",
                  });
                // setTimeout(() => this.setState({ formAlertdelete: false }), 3000);
              }
          
        } else {
          swal("Your Data  is safe!");
        }
      });
 
} catch (error) {
  this.setState({ data: previousData });
  console.log(error);
}

}

  Status = (d)=>{
    return(
          <Switch  height={23} onChange={(e)=>this.ChangeStatus(e,d)} checked={d.original.status == 1 ? true : false } />
        )
 }

 Coach = (d)=>{
  return(
        <Switch  height={23} onChange={(e)=>this.ChangeCoach(e,d)} checked={d.original.coach == 1 ? true : false } />
      )
}

ChangeCoach=async(e,d)=>{
  let index = d.index;

  const previousData = [...this.state.Data];
  let value = d.original;

  let arr = {}

  if(value.coach == 1){
    arr.coach = 0
  }else{
    arr.coach = 1
  }

  try {

    const Update = await Bridge.updateMaster("tbl_details",value.id,arr);
    
    previousData[index].coach = arr.coach;
    

    if(Update){console.log(Update);
       this.setState({
         Data:previousData
       })

       swal("Status Changed successfully!", {
        icon: "success",
      });
    }

    
  } catch (error) {
    console.log(error);
  }

 }

 ChangeStatus=async(e,d)=>{
  let index = d.index;

  const previousData = [...this.state.Data];
  let value = d.original;

  let arr = {}

  if(value.status == 1){
    arr.status = 0
  }else{
    arr.status = 1
  }

  try {

    const Update = await Bridge.updateMaster("tbl_details",value.id,arr);
 
    previousData[index].status = arr.status;
    

    if(Update){
       this.setState({
         Data:previousData
       })
       swal("Status Changed successfully!", {
        icon: "success",
      });
    }

    
  } catch (error) {
    console.log(error);
  }

 }

  handleSwitch=async(checked,a)=> {
    console.log(checked,a);
    // this.setState({ checked });
    const { Componets1 } = this.state;
    if(a =='agra'){
      Componets1.checkAggravated = checked
    }else if(a =='angry'){
      
      Componets1.checkAngry = checked
    }else if(a =='Annoyed'){
      
      Componets1.checkannoyed = checked
    }else if(a =='Disappointed'){
      
      Componets1.checkdisappointed = checked
    }

    this.setState({
      Componets1
    })

  }


  ClearSearch = async()=>{
    try {

      const GetDeatils = await Bridge.GetDeatils();
      if(GetDeatils){
        console.log(GetDeatils.data);
        this.setState({
          Data : GetDeatils.data
        })
      }

      
    } catch (error) {
      console.log(error);
    }
    this.setState({
      SearchField:""
    })
  }

  edit = (d) => {
    let value = d;
    return (
      <center>
        <button
          type="button"
          className="btn btn-info"
          data-toggle="modal"
           data-target="#adduser"
           onClick={() => this.edition(value)}
        >
          Edit
        </button>
      </center>
    );
  };

  edition =async(value)=>{

    const { LocationOption , RuleOption } = this.setState;
    let d = value.original;
    let EditId = value.original.id;
    let IndexID = value.index

    // console.log(this.state.LocationOption);

    let wait = await this.state.LocationOption.map((ival,i)=>{
      if(ival.value == d.location){
        this.setState({
          selectedlocation:ival
        })
      }
    })
    await Promise.all(wait)

    let wait1 = await this.state.RuleOption.map((jval,j)=>{
      if(jval.value == d.rule){
        this.setState({
          selectedrule:jval
        })
      }
    })
    await Promise.all(wait1)



    this.setState({
      IsEditState : true,
      description:d.description,
      Componets1 : JSON.parse(d.Component_indicator),
      EditId,
      IndexID
    })

  }

  async componentDidMount(){
    try {

      // console.log(this.state.Userdetails[0]);

      const GetDeatils = await Bridge.GetDeatils();
      if(GetDeatils){
        console.log(GetDeatils.data);
        this.setState({
          Data : GetDeatils.data
        })
      }

      const LocationData = await Bridge.GetLocationByValueandLabel()
      // console.log(LocationData);
      if(LocationData.data.length){
        this.setState({
          LocationOption:LocationData.data
        })
      }

      const RuleData = await Bridge.GetRuleByValueandLabel()
      // console.log(RuleData);
      if(RuleData.data.length){
        this.setState({
          RuleOption:RuleData.data
        })
      }

      
    } catch (error) {
      console.log(error);
    }
  }

  handleChange=async(e)=>{
    this.setState({
      description : e.target.value
    })
  }

  HandleOption=async(e)=>{
    this.setState({
      selectedlocation:e
    })
  }

  HandleRuleOption=async(e)=>{
    this.setState({
      selectedrule:e
    })
  }

  AddCustomers = async()=>{
    this.setState({
      IsEditState:false,
      Componets1 : {checkAggravated:false,checkAngry:false,checkannoyed:false,checkdisappointed:false},
      selectedlocation:{},
      selectedrule:{},
      description:""
    })
  }

  submit = async()=>{
    const { selectedlocation ,Userdetails ,selectedrule , description , Componets1 } = this.state;

    let ModifiedDate = new Date();
    let Month = ModifiedDate.getMonth();
    let Datte = ModifiedDate.getDate();
    if(ModifiedDate.getMonth() < 9){
      Month = `0${ModifiedDate.getMonth()}`
    }
    if(ModifiedDate.getDate() < 9){
      Datte = `0${ModifiedDate.getDate()}`
    }
    let ModiDate = `${ModifiedDate.getFullYear()}-${Month}-${Datte}`
    // console.log(ModiDate);

    const formData=new FormData();
    formData.append("location",selectedlocation.value);
    formData.append("rule",selectedrule.value);
    formData.append("description",description);
    formData.append("Component_indicator",JSON.stringify(Componets1));
    formData.append("createdBy",Userdetails[0].id)
    formData.append("modified_At",ModiDate);
    formData.append("modifiedby",Userdetails[0].id)
    formData.append("status",1)
    formData.append("coach",1)


  
    console.log([...formData]);

    try {

      const Submit = await Bridge.AddDetails(formData);
      if(Submit){
        console.log(Submit);
        let arr ={}
        arr.id = Submit.data.insertId;
        arr.location = selectedlocation.value;
        arr.locationname = selectedlocation.label
        arr.rule = selectedrule.value;
        arr.rulename = selectedrule.label;
        arr.description = description;
        arr.modified_At = ModiDate;
        arr.createdBy = Userdetails[0].username;
        arr.username = Userdetails[0].username;
        arr.Component_indicator = Componets1;
        arr.ModifiedUser=Userdetails[0].username;
        arr.status = 1;
        arr.coach = 1;
        arr.createdAt = moment().format('YYYY-MM-DD HH:MM:SS')
        // arr.createdAt = new Date();
        console.log(arr);
        let newdate = [arr,...this.state.Data]
        console.log(newdate);

        this.setState({
          Data : newdate,
          description:"",
          Componets1:{checkAggravated:false,checkAngry:false,checkannoyed:false,checkdisappointed:false},
          selectedlocation:{},
          selectedrule:{},
        })


      }
      
    } catch (error) {
      console.log(error);
    }
  }

  onSearchChange = async () => {
    const { SearchField  } = this.state;

    try {

      const formData=new FormData();
    formData.append("search",SearchField);

      const result = await Bridge.SearchallData(formData);

      if(result.data.length){
        console.log(result.data);

        this.setState({
          Data : result.data
        })
      }
      
    } catch (error) {
      console.log(error);
    }
    
  }

  

  Update = async()=>{
    const { selectedlocation ,Userdetails ,selectedrule , description , Componets1 ,EditId , IndexID } = this.state;

    let ModifiedDate = new Date();
    let Month = ModifiedDate.getMonth();
    let Datte = ModifiedDate.getDate();
    if(ModifiedDate.getMonth() < 9){
      Month = `0${ModifiedDate.getMonth()}`
    }
    if(ModifiedDate.getDate() < 9){
      Datte = `0${ModifiedDate.getDate()}`
    }
    let ModiDate = `${ModifiedDate.getFullYear()}-${Month}-${Datte}`;

    try {


      let arr ={}
      // arr.id = Submit.data.insertId;
      arr.location = selectedlocation.value;
      // arr.locationname = selectedlocation.label
      arr.rule = selectedrule.value;
      // arr.rulename = selectedrule.label;
      arr.description = description;
      arr.Component_indicator = JSON.stringify(Componets1);
      arr.modified_At = ModiDate;
      arr.modifiedby = Userdetails[0].id;
      // arr.username = Userdetails[0].username;
      console.log(arr,EditId);
      console.log(EditId);
      const Update = await Bridge.updateMaster("tbl_details",EditId,arr);

      if(Update){
      console.log(Update);

      let Newdata = [...this.state.Data]

      Newdata[IndexID].location = selectedlocation.value;
      Newdata[IndexID].locationname = selectedlocation.label
      Newdata[IndexID].rule = selectedrule.value
      Newdata[IndexID].rulename = selectedrule.label;
      Newdata[IndexID].description = description;
      Newdata[IndexID].Component_indicator = Componets1;
      Newdata[IndexID].modified_At = ModiDate
      Newdata[IndexID].modifiedby = Userdetails[0].id;
      Newdata[IndexID].username = Userdetails[0].username;


         this.setState({
           EditId : false,
           IndexID : null,
           selectedlocation:{},
           Componets1:{checkAggravated:false,checkAngry:false,checkannoyed:false,checkdisappointed:false},
           selectedrule:{},
           description:"",
           IsEditState:false,
           Data : Newdata
         })

      }
      
    } catch (error) {
      console.log(error);
    }

  }


  handleSearch = async(e)=>{
    this.setState({
      SearchField : e.target.value
    })
  }

  HandleSearchOption=async(e)=>{
    this.setState({
      selectedsearch:e
    })
  }

  Applysewarch =async()=>{
    const { selectedsearch , SearchField } = this.state;

    try {

      const formData=new FormData();
    formData.append("search",SearchField);
    formData.append("option",selectedsearch.label)

    let result = await Bridge.SelectedSearchallData(formData);

    if(result.data.length){
      this.setState({
        Data :  result.data
      })
    }

    } catch (error) {
      console.log(error);
    }

  }

  render() {
    const { Componets1 } = this.state;
    return (
      <React.Fragment>

<div class="main-content">
  <ModelWindow 
  ButtonTitle ="Search Filter"
  id="searchfilter"
  
  ButtonBody={
    <div>
    <div className="row form-group">
              <div className="col-sm-4">
                <label class="labell2">Search option:</label>
                </div>
                <div className="col-sm-8">
            <SingleSelect
                   options={this.state.SearchChoice}
                   handleChange={d => this.HandleSearchOption(d)}
                   selectedService={this.state.selectedsearch}
                />
             
            </div>
            {/* <span id="spanid" >{this.state.errorusername}</span>   */}
            </div>

            <div className="row form-group">
                <div className="col-sm-1"></div>
                <div className="col-sm-3">
                <label class="labell2">Value:</label>
                </div>
                <div className="col-sm-8">
                <input type="text" class="form-control" required = "required" name='post' value={this.state.SearchField}  onChange={this.handleSearch} id="content" placeholder="Enter the value" aria-label="Enter Content"/>
             
            </div>
            {/* <span id="spanid" >{this.state.errorusername}</span>   */}
            </div>
            <br/>

            <div className="row form-group">
            <div className="col-sm-3"/>
                <div className="col-sm-3">
                <label class="labell2">
                  <button className="btn btn-secondary" onClick={this.Applysewarch} >Apply</button>
                </label>
                </div>
                
            {/* <span id="spanid" >{this.state.errorusername}</span>   */}
            </div>
            <br/>

            </div>
  }/>
<ModelWindow 
ButtonTitle = "Componet/Indicator"
ButtonName = {"ButtonName"}
id = "componentsor"
ButtonBody={
  <div className="row form-group">
                <div className="col-sm-1"></div>
                <div className="col-sm-3">
                <label class="labell2">Components:</label>
                </div>
                <div className="col-sm-8">
                 
                  <label>Aggravated</label>
                <Switch  disabled={true} height={23} checked={Componets1.checkAggravated} /><br/>
                <label>Angry</label>
                <Switch disabled={true} height={23} checked={Componets1.checkAngry} /><br/>

                <label>Annoyed</label>
                <Switch disabled={true} height={23} checked={Componets1.checkannoyed} /><br/>

                <label>Disappointed</label>
                <Switch disabled={true} height={23} checked={Componets1.checkdisappointed} />


             
            </div>
            <span id="spanid" >{this.state.errorusername}</span>  
            </div>
}
/>
<ModelWindow  
           ButtonTitle = {this.state.IsEditState ==true ? "Update" : "Add Detail"}
           ButtonName = {"ButtonName"}
           id = "adduser"
           indexStyle={{color:"black",fontWeight: '500'}}
           ButtonBody = {

            <div>

           
            <div className="row form-group">
                <div className="col-sm-1"></div>
                <div className="col-sm-3">
                <label class="labell2">Location:</label>
                </div>
                <div className="col-sm-8">
            <SingleSelect
                   options={this.state.LocationOption}
                   handleChange={d => this.HandleOption(d)}
                   selectedService={this.state.selectedlocation}
                />
             
            </div>
            <span id="spanid" >{this.state.errorusername}</span>  
            </div>


            <div className="row form-group">
                <div className="col-sm-1"></div>
                <div className="col-sm-3">
                <label class="labell2">Rule:</label>
                </div>
                <div className="col-sm-8">
            <SingleSelect
                   options={this.state.RuleOption}
                   handleChange={d => this.HandleRuleOption(d)}
                   selectedService={this.state.selectedrule}
                />
             
            </div>
            <span id="spanid" >{this.state.errorusername}</span>  
            </div>


            <div className="row form-group">
                <div className="col-sm-1"></div>
                <div className="col-sm-3">
                <label class="labell2">Description:</label>
                </div>
                <div className="col-sm-8">
                <textarea class="form-control" required = "required" name='post' value={this.state.description}  onChange={this.handleChange} id="content" placeholder="Enter the description" aria-label="Enter Content" rows="3"></textarea>
             
            </div>
            <span id="spanid" >{this.state.errorusername}</span>  
            </div>
            <br/>

            <div className="row form-group">
                <div className="col-sm-1"></div>
                <div className="col-sm-3">
                <label class="labell2">Components:</label>
                </div>
                <div className="col-sm-8">
                 
                  <label>Aggravated</label>
                <Switch onChange={(e)=>this.handleSwitch(e,'agra')} height={23} checked={Componets1.checkAggravated} /><br/>
                <label>Angry</label>
                <Switch onChange={(e)=>this.handleSwitch(e,'angry')} height={23} checked={Componets1.checkAngry} /><br/>

                <label>Annoyed</label>
                <Switch onChange={(e)=>this.handleSwitch(e,'Annoyed')} height={23} checked={Componets1.checkannoyed} /><br/>

                <label>Disappointed</label>
                <Switch onChange={(e)=>this.handleSwitch(e,'Disappointed')} height={23} checked={Componets1.checkdisappointed} />


             
            </div>
            <span id="spanid" >{this.state.errorusername}</span>  
            </div>


            <div className="row form-group">
              <div className="col-sm-4" ></div>
              <div className="col-sm-5" > <button className="btn btn-success" onClick={this.state.IsEditState == false ? this.submit : this.Update} >{this.state.IsEditState == false ?"Submit":"Update"}</button> </div>
              <div className="col-sm-3" ></div>
            </div>


            </div>
}
           
             />


<section class="section">
          <div class="section-body">


          <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h3>Customers</h3>
                  </div>
                  

                 <div class="card-body">

                    <button type="button"
                   class="btn btn-primary" 
                   data-toggle="modal"
                   onClick={this.AddCustomers}
                    data-target="#adduser">
                     Add Detail 
                      </button>

                      <br/><br/>

                      <div class="mobileresp desKtop input-group mb-3" >
  <div class="input-group-prepend">
    <span class="input-group-text" data-toggle="modal" style={{cursor:"pointer"}} data-target="#searchfilter" id="basic-addon1"><RiMenuFill  /></span>
  </div>
  <input type="text" class="form-control" value={this.state.SearchField} onChange={this.handleSearch} placeholder="Enter the search " aria-label="Username" aria-describedby="basic-addon1"/>
  {/* <SearchBar
    onSearchTextChange={(term, hits) => { this.onSearchChange(term, hits) }}
    onSearchButtonClick={this.onSearchClick}
    placeHolderText={"Search here..."}
    data={this.state.Data}
  /> */}
</div>

<button className="btn btn-primary" onClick={this.onSearchChange}  >Search</button>
  <button className="btn btn-danger" onClick={this.ClearSearch} style={{marginLeft:"3%"}} >Clear</button>


                <br/><br/>
                  
                  <div className="row form-group">
                    <div className="col-sm-12">
                    {this.state.Data.length ? (
                        <Datatable
                        data={this.state.Data}
                        columnHeading={this.state.column}
                        />
                    ) : null}
                    </div>
                    </div>
                 
                 </div>
                 </div>
                 </div>
                 </div>
                            </div>
                            </section>
        
        
        
            </div> 

             
      </React.Fragment>
        
      
    );
  }
}

export default Homepage;
