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
            Products:[]
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
                        this.setState({Products: res.data})
                    }
                }
                else
                {
                    console.log("Record not found")
                }
            })
        }

        render()
            {
                return (
                <div>
                  <div className="container">


                        <div className="container">
                        <ProductTable Products={this.state.Products} />

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