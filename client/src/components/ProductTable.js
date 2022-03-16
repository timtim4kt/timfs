import React, {Component, useState} from "react"
import ProductTableRow from "./ProductTableRow"
import {Link} from "react-router-dom";
import {ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_GUEST} from "../config/global_constants";
import Logout from "./Logout";


export default class ProductTable extends Component
{

    handleNameClick = e =>
    {
        let ProductTable = this.props.Products.sort((a, b) => a.name > b.name ? 1 : -1)
        this.setState({ProductTable})
    }

    handlePriceClick = e =>
    {
        let ProductTable = this.props.Products.sort((a, b) => a.price > b.price ? 1 : -1)
        this.setState({ProductTable})
    }






    render() 
    {



        return (



           <section className="product_section layout_paddingTim">



                       <div className="container">

                           <div className="contents">



                    {this.props.Products.map((Product) => <ProductTableRow key={Product._id} Product={Product}/>)}
                       </div>
                       </div>
           </section>
        )
    }
}