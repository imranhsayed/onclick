import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardAddCategoryForm from  './DashboardAddCategoryForm';


class DashboardAddCategory extends Component {
	render(){
		return(
			<div><DashboardAddCategoryForm/></div>
		);
	};
}

export default DashboardAddCategory;