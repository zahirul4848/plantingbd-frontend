import { Email, Facebook, Instagram, Phone, Pinterest, Twitter } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footerContainer">
      <div className="row footer">
        <div className="footerLeft">
          <img className="footerLogo" src="/planting_logo.png" alt="logo" />
        </div>
        <div className="footerMiddle">
          <ul className="footerLinks">
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/">Customer Service</Link></li>
            <li><Link to="/shippinginfo">Shipping Info</Link></li>
            <li><Link to="/">In the News</Link></li>
            <li><Link to="/signin?redirect=profile">My Account</Link></li>
          </ul>
        </div>
        <div className="footerRight">
          <h1>FIND US ON</h1>
          <div className="phoneContact">
            <div className="row start mb-1"><Phone className="mr-1"/> +8801625 997485</div>
            <div className="row start"><Email className="mr-1"/> info@plantingbd.com</div>
          </div>
          <div className="footerIcons">
            <a target="_blank" rel="noreferrer" href="http://facebook.com/plantingbd"><Facebook fontSize="large" /></a>
            <Link to="/"><Twitter fontSize="large" /></Link>
            <Link to="/"><Instagram fontSize="large" /></Link>
            <Link to="/"><Pinterest fontSize="large" /></Link>
          </div>
        </div>
      </div>
      <p className="copyrightTxt">© 2021plantingbd.com, grayscalepixel</p>
    </div>
  )
}
