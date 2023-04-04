import React, {useEffect} from 'react';import {Outlet} from "react-router-dom";import Home from "../Home/Home";import {useSelector} from "react-redux";import Authorization from "../../Pages/Authorization/Authorization";import NoAuth from "../NoAuth/NoAuth";const Layout = () => {    const isAuth = useSelector(state => state.user.isAuth)    if(!isAuth && !localStorage.getItem('accessToken') || localStorage.getItem('accessToken') === 'undefined'){        return (        <Home>            <NoAuth/>        </Home>        )    }    return (        <Home>            <Outlet/>        </Home>    );};export {Layout};