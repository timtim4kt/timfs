import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"

import BuyProduct from "./BuyProduct"

export default class ProductTableRow extends Component
{    
    componentDidMount() 
    {
        this.props.Product.photos.map(photo =>
        {
            return axios.get(`${SERVER_HOST}/Products/photo/${photo.filename}`)
            .then(res => 
            {         
                document.getElementById(photo._id).src = `data:;base64,${res.data.image}`                                                         
            })
            .catch(err =>
            {
                // do nothing
            })
        })
    }
    
    
    render() 
    {


        let soldOrForSale = null
        if(localStorage.accessLevel = ACCESS_LEVEL_GUEST)
        {
            if(this.props.Product.sold !== true)
            {
                soldOrForSale = <BuyProduct ProductID={this.props.Product._id} price={this.props.Product.price} />
            }
            else
            {
                soldOrForSale = "SOLD"
            }
        }

        if(localStorage.accessLevel = ACCESS_LEVEL_NORMAL_USER)
                {
                    if(this.props.Product.sold !== true)
                    {
                        soldOrForSale = <BuyProduct ProductID={this.props.Product._id} price={this.props.Product.price} />
                    }
                    else
                    {
                        soldOrForSale = "SOLD"
                    }
                }
        
        
        return (

                    <div className="col-sm-6 col-md-4 col-lg-4">
                            <div className="box">
                                    <div className="option_container">
                                        <div className="options">
                                            <a href="" className="option1">
                                                Men's Shirt
                                            </a>
                                            <a className="paypalButton">
                                                {soldOrForSale}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="img-box">
                                     <ul>
                                     <li>        {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="green-button" to={"/EditProduct/" + this.props.Product._id}>Edit</Link> : null} </li>
                                     <li>       {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to={"/DeleteProduct/" + this.props.Product._id}>Delete</Link> : null} </li>
                                    </ul>
                                    {this.props.Product.photos.map(photo => <img key={photo._id} id={photo._id} alt=""  />)}
                                    </div>
                                    <div className="detail-box">
                                        <h5>
                                            {this.props.Product.name}
                                        </h5>
                                        <h6>
                                           € {this.props.Product.price}
                                        </h6>
                                        <br></br>


                                    </div>
                                </div>

                    </div>




                                       

        )
    }
}