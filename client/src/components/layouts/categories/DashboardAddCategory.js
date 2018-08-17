import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardAddCategoryForm from  './DashboardAddCategoryForm';
import DashboardNav from './../dashboard/DashboardNav';
import DashboardSidebar from './../dashboard/DashboardSidebar';


class DashboardAddCategory extends Component {
	render(){
		return(
			<div className="container-scroller">
				<DashboardNav/>
				<div className="container-fluid page-body-wrapper">
					<DashboardSidebar/>
					<DashboardAddCategoryForm/>
				</div>
			</div>
		);
	};
}

export default DashboardAddCategory;