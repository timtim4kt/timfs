import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"


export default class AddProduct extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            name:"",
            brand:"",
            year:"",
            price:"",
            selectedFiles:null,
            redirectToDisplayAllProducts:localStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER,
            wasSubmittedAtLeastOnce:false
        }
    }


    componentDidMount() 
    {     
        this.inputToFocus.focus()        
    }
 
 
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }


    handleFileChange = (e) => 
    {
        this.setState({selectedFiles: e.target.files})
    }
    
    
    handleSubmit = (e) => 
    {
        e.preventDefault()

        let formData = new FormData()                  
        formData.append("name", this.state.name)
        formData.append("brand", this.state.brand)
        formData.append("year", this.state.year)
        formData.append("price", this.state.price)
        
        if(this.state.selectedFiles)
        {
            for(let i = 0; i < this.state.selectedFiles.length; i++)
            {
                formData.append("productPhotos", this.state.selectedFiles[i])
            }
        }

        axios.post(`${SERVER_HOST}/Products`, formData, {headers:{"authorization":localStorage.token, "Content-type": "multipart/form-data"}})
        .then(res => 
        {           
            this.setState({redirectToDisplayAllProducts:true})
        })
        .catch(err =>
        {
            this.setState({wasSubmittedAtLeastOnce: true})
        })
    }


    render()
    {
        const today = new Date()
        let errorMessage = "";
        if(this.state.wasSubmittedAtLeastOnce) {
            if(this.state.name.length < 1){
                errorMessage = <div className="error">Error: Invalid name<br/></div>;

            }
            else if(!(this.state.brand.toLowerCase().includes("samsung") || this.state.brand.toLowerCase().includes("bose") || this.state.brand.toLowerCase().includes("apple")))
            {
                errorMessage = <div className="error">Error: We only sell Apple/Bose/Samsung Products<br/></div>;
            }
            else if(!(this.state.year >= 2020 && this.state.year <= today.getFullYear()))
            {
                errorMessage = <div className="error">Error: Year must be 2020-2022<br/></div>;
            }
            else if(!(this.state.price > 0))
            {
                errorMessage = <div className="error">Error: Price can't be negative<br/></div>;
            }

            }


    
        return (
            <div className="form-container"> 
                {this.state.redirectToDisplayAllProducts ? <Redirect to="/Products"/> : null}
                    
                {errorMessage}
                
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </Form.Group>
    
                    <Form.Group controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" name="brand" value={this.state.brand} onChange={this.handleChange} />
                    </Form.Group>
    
                    <Form.Group controlId="year">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="text" name="year" value={this.state.year} onChange={this.handleChange} />
                    </Form.Group>
    
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                    </Form.Group> 
                    
                    <Form.Group controlId="photos">
                    <Form.Label>Photos</Form.Label>
                    <Form.Control          
                        type = "file" multiple onChange = {this.handleFileChange}
                    /></Form.Group> <br/><br/>
            
                    <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit}/>            
            
                    <Link className="red-button" to={"/Products"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}