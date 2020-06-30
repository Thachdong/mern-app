import React from "react";
import { FaRegAddressBook } from "react-icons/fa";
import { FiPhoneForwarded } from "react-icons/fi";

const Footer = () => (
  <div className="footer">
    <div className="container flex-box">
      <div className="footer__info">
        <p>
          <strong>About:</strong>
          This is my first page, after i start to learn how to build a real life
          website. This site was build with some tech, there are nodejs,
          express, mongodb, react and so on ...
        </p>
        <div className="flex-box">
          <FaRegAddressBook />
          &nbsp;
          <span>74/5B, street no 36, Binh Tho ward, Thu Duc Dis, HCM city</span>
        </div>
        <div className="flex-box">
          <FiPhoneForwarded />
          &nbsp;
          <a className="format-anchor" href="tel:0353860797">
            0353 860 797
          </a>
        </div>
      </div>
      <div className="footer__map">
        <iframe
          loading="lazy"
          title="shop address"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15674.657942367867!2d106.7441592!3d10.8369676!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x15d38a031e6f706a!2zQ29mZmVlIEfhu41pIE7huq9uZw!5e0!3m2!1sfr!2s!4v1591897473243!5m2!1sfr!2s"
          frameBorder="0"
        />
      </div>
    </div>
  </div>
);

export default Footer;
