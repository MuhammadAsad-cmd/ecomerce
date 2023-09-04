import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import logo from '../../../asserts/logo.jpg'
import { FaExternalLinkAlt, FaPlusCircle, FaTh, FaUsers } from 'react-icons/fa';
import RateReviewIcon from "@material-ui/icons/RateReview";
import { BiGrid } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import './sidebar.css'

const Sidebar = (props) => {
  return (
    <div className="sidebar">

   
   <Link to='/'>
   <img src={logo} alt="" />
   </Link>

   <Link to='/admin/dashboard'>
<div className={`${props.active==='dashboard'? 'activemenue':''}`}>
   <BiGrid/>
DashBoard
</div>
   </Link>

    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
 
      <TreeItem nodeId="1" label="Products">
        <Link to='/admin/products' className={`${props.active==='all'? 'activemenue':''}`}>
        <TreeItem nodeId="2" label="All"  icon={<FaExternalLinkAlt/>} />
        </Link>
        <Link to='/admin/product/new' className={`${props.active==='create'? 'activemenue':''}`}>
        <TreeItem nodeId="3" label="Create" icon={<FaPlusCircle/>}  />
        </Link>
      </TreeItem>
    </TreeView>
{/* orders */}
    <Link to='/admin/orders'>
<div  className={`${props.active==='orders'? 'activemenue':''}`}>
   <FaTh/>
Orders
</div>
   </Link>

   <Link to='/admin/users'>
<div  className={`${props.active==='users'? 'activemenue':''}`}>
   <FaUsers/>
Users
</div>
   </Link>

   <Link to='/admin/reviews'>
<div  className={`${props.active==='reviews'? 'activemenue':''}`}>
   <RateReviewIcon/>
Reviews
</div>
   </Link>

    </div>
  );
};

export default Sidebar;
