import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import ProductTable from "./ProductTable"
import Logout from "./Logout"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


export default class Products extends Component{

constructor(props)
    {
        super(props)

        this.state = {
            Products:[],
            selectedProducts:[]
        }
    }



    componentDidMount()
        {
            axios.get(`${SERVER_HOST}/Products`)
            .then(res =>
            {
                if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage)
                    }
                    else
                    {
                        console.log("Records read")
                        this.setState({Products: res.data,selectedProducts: res.data})
                    }
                }
                else
                {
                    console.log("Record not found")
                }
            })
        }

    handleYear2020Click = e =>
    {
        let selectedProducts = this.state.Products.filter(a => a.year === 2020)
        this.setState({selectedProducts})
    }

    handleYear2021Click = e =>
    {
        this.setState({selectedProducts: this.state.Products.filter(a => a.year === 2021)})
    }

    handleYear2022Click = e =>
    {
        let selectedProducts = this.state.Products.filter(a => a.year === 2022)
        this.setState({selectedProducts})
    }

    handleSearch(searchTag)
    {
        console.log(searchTag)

        this.setState({selectedProducts: this.state.Products.filter(a => a.name.toLowerCase().includes(searchTag.toLowerCase()))})
    }

        render()
            {
                return (
                <div>


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

                  <div className="container">



                        <div className="container">

                            <input className="searchBar"
                                type="text" placeholder="Search..." id="search" onChange={() => this.handleSearch(document.getElementById("search").value)}/>

                            <ul className="sorts">
                                <li className="sortItems" onClick={this.handleYear2022Click}>2022</li>
                                <li className="sortItems" onClick={this.handleYear2021Click}>2021</li>
                                <li className="sortItems" onClick={this.handleYear2020Click}>2020</li>
                            </ul>
                            <ProductTable Products={this.state.selectedProducts} />
                        {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?
                        <div className="add-new-Product">
                        <Link className="blue-button" to={"/AddProduct"}>Add New Product</Link>
                        </div>
                        :
                         null
                          }
                    </div>
                  </div>
                </div>
                        )
            }
      }