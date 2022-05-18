import React, {Component} from "react"
import Form from "react-bootstrap/Form"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"

export default class EditProduct extends Component
{
    constructor(props) 
    {
        super(props)

        this.state = {
            name: ``,
            brand: ``,
            year: ``,
            price: ``,
            redirectToDisplayAllProducts:localStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER,
            wasSubmittedAtLeastOnce:false
        }
    }

    componentDidMount() 
    {      
        this.inputToFocus.focus()
  
        axios.get(`${SERVER_HOST}/Products/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {     
            this.setState({
                name: res.data.name,
                brand: res.data.brand,
                year: res.data.year,
                price: res.data.price
            })            
        })
        .catch(err => 
        {
            // do nothing
        })
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

        const ProductObject = {
            name: this.state.name,
            brand: this.state.brand,
            year: this.state.year,
            price: this.state.price,
            selectedFiles:null
        }

        axios.put(`${SERVER_HOST}/Products/${this.props.match.params.id}`, ProductObject, {headers:{"authorization":localStorage.token}})
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
        if(this.state.wasSubmittedAtLeastOnce)
        {
            if(!(this.state.brand.toLowerCase().includes("samsung") || this.state.brand.toLowerCase().includes("bose") || this.state.brand.toLowerCase().includes("apple")))
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
            else {
                errorMessage = <div className="error">Error: All fields must be filled in<br/></div>;
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

                    <Form.Group controlId="Brand">
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
                        /></Form.Group>
  
                    <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit}/>  
    
                    <Link className="red-button" to={"/Products"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}