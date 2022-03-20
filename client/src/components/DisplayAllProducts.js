import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import ProductTable from "./ProductTable"
import Logout from "./Logout"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"


export default class DisplayAllProducts extends Component
{
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
            <div className="hero_area">

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
                                            <img id="profilePhoto" src={`data:;base64,${localStorage.profilePhoto}`} alt=""/>
                                        </li>
                                        :
                                       null


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

                <section className="slider_section ">
                    <div className="slider_bg_box">


                    </div>
                    <div id="customCarousel1" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="container ">
                                    <div className="row">
                                        <div className="col-md-7 col-lg-6 ">
                                            <div className="detail-box">
                                                <h1>
                                    <span className="sale">
                                    Sale 20% Off
                                    </span>
                                                    <br></br>
                                                        On Everything
                                                </h1>
                                                <p>
                                                    To celebrate our 2 YEARS in business,
                                                    <br></br>
                                                    AUDIOJUMO are offering a discount of 20% on all our<br></br>
                                                    products from now, until the 7th of april!!!
                                                </p>


                                                <div className="btn-box">
                                                    <Link className="nav-link" to={"/Products"}>
                                                        Shop Now</Link>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                </section>

            </div>

        <section className="why_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>
                        Why Shop With Us
                    </h2>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="box ">
                            <div className="img-box">



                            </div>
                            <div className="detail-box">
                                <h5>
                                    Fast Delivery
                                </h5>
                                <p>
                                    Expect delivery within 3-5 working days
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="box ">
                            <div className="img-box">


                            </div>
                            <div className="detail-box">
                                <h5>
                                    Free Shipping
                                </h5>
                                <p>
                                    We ship worldwide with no additional costs
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="box ">
                            <div className="img-box">

                            </div>
                            <div className="detail-box">
                                <h5>
                                    Best Quality
                                </h5>
                                <p>
                                    Anything you buy here is of a high quality
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>



        <section className="arrival_section">
            <div className="container">
                <div className="box">
                    <div className="arrival_bg_box">
                        <img src="https://cdn.mos.cms.futurecdn.net/iGpFjwBgDZ2SHTaBmP9535-480-80.jpg" ></img>
                    </div>
                    <div className="row">
                        <div className="col-md-6 ml-auto">
                            <div className="heading_container remove_line_bt">
                                <h2>
                                    #ComingSoon
                                </h2>
                            </div>
                            <p style={{margintop: 20 + `px` ,marginbottom: 30+ `px`}}>
                                Sennheiser MM 400-X review
                                Best wireless headphones, Awards 2012. A must-audition for owners of aptX-enabled phones and laptops Tested at €180
                            </p>
                            <Link className="nav-link" to={"/Products"}>
                                Shop Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section className="subscribe_section">
            <div className="container-fuild">
                <div className="box">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="subscribe_form ">
                                <div className="heading_container heading_center">
                                    <h3>Sign up to never miss out on Updates</h3>
                                </div>
                                <p>Keep up with our latest sales and business news when u register for an account</p>


                                    <Link className="register-button" to={"/Register"}>Register</Link>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>




        <section className="client_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>
                        Customer's Testimonial
                    </h2>
                </div>
                <div id="carouselExample3Controls" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="box col-lg-10 mx-auto">
                                <div className="img_container">
                                    <div className="img-box">
                                        <div className="img_box-inner">
                                            <img src="https://cdn.discordapp.com/attachments/893541757336318012/952891426964901929/20220314_112918.jpg" alt="hi"></img>
                                        </div>
                                    </div>
                                </div>
                                <div className="detail-box">
                                    <h5>
                                        Nathan Field
                                    </h5>
                                    <h6>
                                        Customer
                                    </h6>
                                    <p>
                                        I love AUDIOJUMO. They're products are the best quality. They're my go to when I want to satisfy my musical needs.
                                    </p>
                                </div>
                            </div>
                        </div>



                    </div>

                </div>
            </div>
        </section>


        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="full">
                            <div className="widget_menu">
                                <h3>Information</h3>

                            </div>
                            <div className="information_f">
                                <p><strong>ADDRESS:</strong> Castlemill Shopping Centre, Balbriggan, Co.Dublin</p>
                                <p><strong>TELEPHONE:</strong> +91 987 654 3210</p>
                                <p><strong>EMAIL:</strong> tim@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="widget_menu">
                                            <h3>Menu</h3>
                                            <ul>
                                                <li> <Link to={"/DisplayAllProducts"}>Home</Link></li>
                                                <li> <Link  to={"/Products"}>Products</Link> </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="widget_menu">
                                            <h3>Account</h3>
                                            <ul>
                                                <li> <Link  to={"/Login"}>Login</Link> </li>
                                                <li> <Link  to={"/Register"}>Register</Link> </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="col-md-5">
                                <div className="widget_menu">
                                    <h3>Newsletter</h3>
                                    <div className="information_f">
                                        <p>Subscribe by our newsletter and get update protidin.</p>
                                    </div>
                                    <div className="form_sub">
                                        <form>
                                            <fieldset>
                                                <div className="field">
                                                    <input type="email" placeholder="Enter Your Mail" name="email"/>
                                                    <input type="submit" value="Subscribe"/>
                                                </div>
                                            </fieldset>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>




        <div className="cpy_">
            <p className="mx-auto">© 2022 All Rights Reserved By <a href="">AUDIOJUMO</a><br/>

                Distributed By <a href="" target="_blank">DKiT</a>

            </p>
        </div>

    </div>
        )
    }
}