import React, { useState, useEffect } from 'react';
import './Navbar.css';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faSyncAlt, faUser,} from '@fortawesome/free-solid-svg-icons'; // Import the necessary icons

const Navbar = () => {

    useEffect(() => {
        animation(); // Apply animation on load
        $(window).on('resize', function () {
            setTimeout(function () { animation(); }, 500);
        });
    }, []);

    const refreshPage = () => {
        window.location.reload(); // Refresh the page
    };

    const logOut = () => {
        window.localStorage.clear();
        window.location.href = "./sign-in";
    };

    function animation() {
        var tabsNewAnim = $('#navbarSupportedContent');
        var activeItemNewAnim = tabsNewAnim.find('.active');
        var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
        var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
        var itemPosNewAnimTop = activeItemNewAnim.position();
        var itemPosNewAnimLeft = activeItemNewAnim.position();
        $(".hori-selector").css({
            "top": itemPosNewAnimTop.top + "px",
            "left": itemPosNewAnimLeft.left + "px",
            "height": activeWidthNewAnimHeight + "px",
            "width": activeWidthNewAnimWidth + "px"
        });
        $("#navbarSupportedContent").on("click", "li", function (e) {
            $('#navbarSupportedContent ul li').removeClass("active");
            $(this).addClass('active');
            var activeWidthNewAnimHeight = $(this).innerHeight();
            var activeWidthNewAnimWidth = $(this).innerWidth();
            var itemPosNewAnimTop = $(this).position();
            var itemPosNewAnimLeft = $(this).position();
            $(".hori-selector").css({
                "top": itemPosNewAnimTop.top + "px",
                "left": itemPosNewAnimLeft.left + "px",
                "height": activeWidthNewAnimHeight + "px",
                "width": activeWidthNewAnimWidth + "px"
            });
        });
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-mainbg">
            <div className="client-name">
                Smartdwell
            </div>
            <button
                className="navbar-toggler"
                onClick={() => setTimeout(animation, 0)} // Simplified onClick handler
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <FontAwesomeIcon icon={faBars} className="text-white" />
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                <ul className="navbar-nav mx-auto">
                    <div className="hori-selector">
                        <div className="left"></div>
                        <div className="right"></div>
                    </div>
                    <li className="nav-item active">
                        {/* <NavLink className="nav-link" to="/" exact>
                            <FontAwesomeIcon icon={faArrowUpFromWaterPump} /> Domestic
                        </NavLink> */}
                    </li>
                </ul>
                <div className="d-flex">
                    <div className="logout p-2">
                        <ul>
                            <button type="button" className="btn btn-outline-light" onClick={refreshPage}>
                                <FontAwesomeIcon icon={faSyncAlt} /> Refresh
                            </button>
                        </ul>
                    </div>
                    <div className="logout p-2">
                        <ul>
                            <button type="button" className="btn btn-outline-light" onClick={logOut}>
                                <FontAwesomeIcon icon={faUser} /> Logout
                            </button>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
