import React, { Component } from 'react';

class DashboardFooter extends Component {
	render(){
		return(
			<footer className="footer">
				<div className="d-sm-flex justify-content-center justify-content-sm-between">
					<span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2018 <a href="https://www.myrl.tech/">Myrl Tech</a>. All rights reserved.</span>
					<span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Onclick <i className="mdi mdi-heart text-danger"></i></span>
				</div>
			</footer>
		);
	}
}

export default DashboardFooter;