import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"
import "./css/responsive.css"
import  "../src/css/style.css"
import "../src/css/bootstrap.css"

import Register from "./components/Register"
import ResetDatabase from "./components/ResetDatabase"
import Login from "./components/Login"
import Logout from "./components/Logout"
import AddProduct from "./components/AddProduct"
import EditProduct from "./components/EditProduct"
import DeleteProduct from "./components/DeleteProduct"
import DisplayAllProducts from "./components/DisplayAllProducts"
import LoggedInRoute from "./components/LoggedInRoute"
import BuyProduct from "./components/BuyProduct"
import PayPalMessage from "./components/PayPalMessage"
import Products from "./components/Products"

import {ACCESS_LEVEL_GUEST} from "./config/global_constants"


if (typeof localStorage.accessLevel === "undefined")
{
    localStorage.name = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.token = null
    localStorage.profilePhoto = null
}

    
export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/ResetDatabase" component={ResetDatabase} />                    
                    <Route exact path="/" component={DisplayAllProducts} />
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="/BuyProduct/:id" component={BuyProduct} />
                    <Route exact path="/Products" component={Products} />
                    <Route exact path="/PayPalMessage/:messageType/:payPalPaymentID" component={PayPalMessage}/>                     
                    <LoggedInRoute exact path="/Logout" component={Logout} />
                    <LoggedInRoute exact path="/AddProduct" component={AddProduct} />
                    <LoggedInRoute exact path="/EditProduct/:id" component={EditProduct} />
                    <LoggedInRoute exact path="/DeleteProduct/:id" component={DeleteProduct} />
                    <Route exact path="/DisplayAllProducts" component={DisplayAllProducts}/>
                    <Route path="*" component={DisplayAllProducts}/>
                </Switch>
            </BrowserRouter>
        )
    }
}