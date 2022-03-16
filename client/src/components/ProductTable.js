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


    handleYear2020Click = e =>
    {
        let ProductTable = this.props.Products.filter(a => a.year === 2020)
        this.setState({ProductTable})
    }

    handleYear2021Click = e =>
    {
        this.setState({selectedProducts: this.props.Products.filter(a => a.year === 2021)})
    }

    handleYear2022Click = e =>
    {
        let selectedProducts = this.props.Products.filter(a => a.year === 2022)
        this.setState({selectedProducts})
    }



    render() 
    {



        return (



           <section className="product_section layout_paddingTim">

               <header className="header_section">
                   <div className="container">
                       <nav className="navbar navbar-expand-lg custom_nav-container ">
                           <a className="logo" href="index.html">AUDIOJUMO</a>
                           <button className="navbar-toggler" type="button" data-toggle="collapse"
                                   data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                   aria-expanded="false" aria-label="Toggle navigation">
                               <span className=""> </span>
                           </button>
                           <div className="collapse navbar-collapse" id="navbarSupportedContent">
                               <ul className="navbar-nav">
                                   <li className="nav-item active">
                                       <Link className="nav-link" to={"/DisplayAllProducts"}>Home <span
                                           className="sr-only">(current)</span></Link>
                                   </li>


                                   <li className="nav-item">
                                       <Link className="nav-link" to={"/Products"}>Products</Link>
                                   </li>


                                   {localStorage.accessLevel > ACCESS_LEVEL_GUEST ?
                                       <li className="nav-item">
                                           <Logout/>
                                       </li>
                                       :
                                       <li className="nav-item">
                                           <Link className="nav-link" to={"/Login"}>Login</Link>
                                       </li>


                                   }

                                   {localStorage.accessLevel > ACCESS_LEVEL_GUEST ?
                                       <li className="nav-item">

                                       </li>
                                       :
                                       <li className="nav-item">
                                           <Link className="nav-link" to={"/Register"}>Register</Link>
                                       </li>


                                   }



                                   {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?
                                       <li className="nav-item">
                                           <Link className="nav-link" to={"/ResetDatabase"}>Reset</Link>
                                       </li>
                                       :
                                       <li className="nav-item">

                                       </li>

                                   }


                                   <li className="nav-item">
                                       <a className="nav-link" href="#">
                                       </a>
                                   </li>
                                   <form className="form-inline">
                                       <button className="btn  my-2 my-sm-0 nav_search-btn" type="submit">
                                           <i className="fa fa-search" aria-hidden="true"></i>
                                       </button>
                                   </form>
                               </ul>
                           </div>
                       </nav>
                   </div>
               </header>

                       <div className="container">
                           <div className="heading_container heading_center">

                               <div>
                              <h2>
                               Our <span>products</span>
                           </h2>



                               </div>


                               <div className="sortDiv">



                                   <h5>Sort By</h5>
                                   <ul className="sorts">
                                       <li className="sortItems" onClick={this.handlePriceClick}>Price</li>
                                       <li className="sortItems" onClick={this.handleNameClick}>Name</li>

                                   </ul>




                               </div>

                               <div  className="filterBar">
                                   <h6>Year</h6>
                                   <ul className="sorts">
                                       <li className="sortItems" onClick={this.handleYear2022Click}>2022</li>
                                       <li className="sortItems" onClick={this.handleYear2021Click}>2021</li>
                                       <li className="sortItems" onClick={this.handleYear2020Click}>2020</li>
                                   </ul>
                                   <h6>Brand</h6>
                                   <ul className="sorts">
                                       <li className="sortItems">Samsung</li>
                                       <li className="sortItems">Bose</li>
                                       <li className="sortItems">Apple</li>
                                   </ul>
                               </div>

                           </div>
                           <div className="contents">



                    {this.props.Products.map((Product) => <ProductTableRow key={Product._id} Product={Product}/>)}
                       </div>
                       </div>
           </section>
        )
    }
}