import React, {Component} from "react"
import Form from "react-bootstrap/Form"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"

export default class EditProduct extends Component
{
    constructor(props) 
    {
        super(props)

        this.state = {
            name: ``,
            Brand: ``,
            year: ``,
            price: ``,
            redirectToDisplayAllProducts:localStorage.accessLevel < ACCESS_LEVEL_ADMIN,
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
                Brand: res.data.Brand,
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


    handleSubmit = (e) => 
    {
        e.preventDefault()

        const ProductObject = {
            name: this.state.name,
            Brand: this.state.Brand,
            year: this.state.year,
            price: this.state.price
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
        let errorMessage = "";
        if(this.state.wasSubmittedAtLeastOnce)
        {
            errorMessage = <div className="error">Error: All fields must be filled in<br/></div>;
        } 
        
        return (
            <div className="form-container">
    
                {this.state.redirectToDisplayAllProducts ? <Redirect to="/DisplayAllProducts"/> : null}
                    
                {errorMessage}
                
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>name</Form.Label>
                        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="Brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" name="Brand" value={this.state.Brand} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="year">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="text" name="year" value={this.state.year} onChange={this.handleChange} />
                    </Form.Group>
        
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                    </Form.Group>
  
                    <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit}/>  
    
                    <Link className="red-button" to={"/DisplayAllProducts"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}