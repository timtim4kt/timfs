import React, {Component} from "react"
import Form from "react-bootstrap/Form"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"

export default class Modal extends Component

{

    constructor(props)
    {
        super(props)

        this.state = {
            name: "",
            brand: "",
            year: "",
            price: "",

        }
    }

    componentDidMount()
    {


        axios.get(`${SERVER_HOST}/Products/${this.props.match.params.id}`)
            .then(res =>
            {
                this.setState({
                    name: res.data.name,
                    Brand: res.data.brand,
                    year: res.data.year,
                    price: res.data.price
                })
                console.log(this.state.name)
            })
    }
    
    render()
    {

        return (
            <div className="form-container">

                <div id="modal">
              <div id="modalContent">
                    <h1>Name</h1>
                    <p>{this.state.name}</p>

                    <h1>Brand</h1>
                    <p>{this.state.Brand}</p>

                    <h1>Year</h1>
                    <p>{this.state.year}</p>

                    <h1>Price</h1>
                    <p>€ {this.state.price}</p>
                    <Link className="red-button" to={"/Products"}>Back</Link>
                </div>
            </div>
            </div>
        )
    }
}