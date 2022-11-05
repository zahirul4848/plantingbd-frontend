import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, Route} from 'react-router-dom';
import { signout } from '../actions/userActions';
import {Close, CloseOutlined, ExpandLess, ExpandMore, FavoriteBorder, Menu, Person, Search, ShoppingCartOutlined} from '@material-ui/icons';
import SearchBox from './SearchBox';
import { listProductCategory, listProductSize } from '../actions/productActions';
import { baseUrl } from '../utility';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [plantTypeOpen, setPlantTypeOpen] = useState(false);
  const [plantSizeOpen, setPlantSizeOpen] = useState(false);
  const [plantAcceOpen, setPlantAcceOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  const productCategoryList = useSelector(state => state.productCategoryList);
  const {categories} = productCategoryList;
  const productSizeList = useSelector(state => state.productSizeList);
  const {sizes} = productSizeList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProductSize());
    dispatch(listProductCategory());
  }, [dispatch]);

  const signoutHandler = ()=> {
    dispatch(signout());
  }

  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerLeft">
          {!menuOpen ? (
            <div onClick={()=> setMenuOpen(true)} className="navmenuContainer">
              <Menu fontSize="large" style={{marginRight: 20}} />
            </div>
            ) : (
              <>
              <div onClick={()=> setMenuOpen(false)} className="navmenuContainer">
                <Close fontSize="large" style={{marginRight: 20}} />
              </div>

              {/* nav Items */}
              <div className="navItemContainer">
                <div className="navMainItemSubContainer">
                  <div>
                    <div onClick={()=> setPlantTypeOpen(!plantTypeOpen)} className="navMainItem">PLANT TYPES {plantTypeOpen ? <ExpandLess/> : <ExpandMore/>}</div>
                      {plantTypeOpen && (
                      <div className="navSubItem">
                        <Link onClick={()=> setMenuOpen(false)} to="/plants/name">All Plant</Link>
                        {categories && categories.map(c=> (
                          <Link onClick={()=> setMenuOpen(false)} key={c} to={`/plants/category/${c}`}>{c} Plant</Link>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <div onClick={()=> setPlantSizeOpen(!plantSizeOpen)} className="navMainItem">PLANT SIZES {plantSizeOpen ? <ExpandLess/> : <ExpandMore/>}</div>
                    {plantSizeOpen && (
                      <div className="navSubItem">
                        {sizes && sizes.map(s=> (
                          <Link onClick={()=> setMenuOpen(false)} key={s} to={`/plants/size/${s}`}>{s} Plant</Link>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <div onClick={()=> setPlantAcceOpen(!plantAcceOpen)} className="navMainItem">PLANT ACCESSORIES {plantAcceOpen ? <ExpandLess/> : <ExpandMore/>}</div>
                    {plantAcceOpen && (
                      <div className="navSubItem">
                        <Link onClick={()=> setMenuOpen(false)} to="/plants/category/Accessories">ALL ACCESSORIES</Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* nav Items end*/}
              </>
            )}
          <Link to="/"><img className="logo" src={`${baseUrl}/uploads/planting_logo.png`} alt="logo" /></Link>
        </div>
        <div className="headerMiddle">
          <ul className="row">
            <li className="dropdown">
              <div>PLANT TYPES <ExpandMore/></div>
              <div className="dropdownContent">
                <Link className="dropdownItem" to="/plants/name">All Plant</Link>
                {categories && categories.map(c=> (
                  <Link key={c} className="dropdownItem" to={`/plants/category/${c}`}>{c} Plant</Link>
                ))}
              </div>
            </li>
            <li className="dropdown">
              <div>PLANT SIZES <ExpandMore/></div>
              <div className="dropdownContent">
                {sizes && sizes.map(s=> (
                  <Link key={s} className="dropdownItem" to={`/plants/size/${s}`}>{s} Plant</Link>
                ))}
              </div>
            </li>
            <li className="dropdown">
              <div>ACCESSORIES <ExpandMore/></div>
              <div className="dropdownContent">
                <Link to='/plants/category/Accessories' className="dropdownItem">ALL ACCESSORIES</Link>
              </div>
            </li>
          </ul>
        </div>
        <div className="headerRight">
          <div className="headerRightContent">
            <div className="searchBar">
              {searchBarOpen ? <CloseOutlined onClick={()=> setSearchBarOpen(false)} fontSize="large" /> : <Search onClick={()=> setSearchBarOpen(true)} fontSize="large" /> }
              
              {searchBarOpen && (
                <div className="searchBoxCont">
                  
                  <Route render={({ history }) => (
                    <SearchBox history={history}/>
                  )}/>

                </div>
              )}
            </div>
          </div>
          
          <div className="headerRightContent">
            {userInfo ? <Link to="/wishlist"><FavoriteBorder fontSize="large" htmlColor="black"/></Link> : <Link to="/signin?redirect=wishlist"><FavoriteBorder fontSize="large" htmlColor="black"/></Link>}
          </div>
          <div className="headerRightContent">
            {userInfo ? (
              <div className="dropdownR">
                <div className="row">{userInfo.name} <ExpandMore/></div>
                <div className="dropdownContentR">
                  <Link to="/wishlist" className="dropdownItemR">Wishlist</Link>
                  <Link to="/orderhistory" className="dropdownItemR">Order History</Link>
                  <Link to="/profile" className="dropdownItemR">User Profile</Link>
                  <Link to="#signout" onClick={signoutHandler} className="dropdownItemR">Sign Out</Link>
                </div>
              </div>
            ) : (
              <div>
                <Link to="/signin"><Person fontSize="large" htmlColor="black"/></Link>
              </div>
            )}
          </div>
          <div className="headerRightContent">
            {userInfo && userInfo.isAdmin && (
              <div className="dropdownR">
                <div className="row">Admin <ExpandMore/></div>
                <div className="dropdownContentR">
                  <Link to="/dashboard" className="dropdownItemR">Dashboard</Link>
                  <Link to="/productlist" className="dropdownItemR">Products</Link>
                  <Link to="/orderlist" className="dropdownItemR">Orders</Link>
                  <Link to="/userlist" className="dropdownItemR">Users</Link>
                  <Link to="#signout" onClick={signoutHandler} className="dropdownItemR">Sign Out</Link>
                </div>
              </div>
            )}
          </div>
          <div className="headerRightContent">
            <Link to='/cart' className="badgeContainer"><ShoppingCartOutlined fontSize="large" htmlColor="black"/>{cartItems.length > 0 && <span className='badge'>{cartItems.length}</span>}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
