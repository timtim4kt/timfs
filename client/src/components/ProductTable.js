import React, {Component, useState} from "react"
import ProductTableRow from "./ProductTableRow"
import {Link} from "react-router-dom";
import {ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_GUEST} from "../config/global_constants";
import Logout from "./Logout";


export default class ProductTable extends Component
{


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