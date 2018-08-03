import React, { Component } from 'react';
import Navbar from "./layouts/Navbar";
import HomeBanner from './layouts/home/HomeBanner';
import Footer from "./layouts/Footer";
import HomeIcons from "./layouts/home/HomeIcons";
import HomeTrendingServices from "./layouts/home/HomeTrendingServices";
import HomeFeaturedServices from "./layouts/home/HomeFeaturedServices";
import HomeServicesData from "./layouts/home/HomeServicesData";
import HomeBestServices from "./layouts/home/HomeBestServices";
import HomeSubscribe from "./layouts/home/HomeSubscribe";

export default () => {
	return (
		<div>
			<Navbar/>
			<HomeBanner/>
			<HomeIcons/>
			<HomeTrendingServices/>
			<HomeFeaturedServices/>
			<HomeServicesData/>
			<HomeBestServices/>
			<HomeSubscribe/>
			<Footer/>
		</div>
	);
}