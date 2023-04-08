import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyle";

  
const Footer = () => {
  return (
    <Box>

      <hr style={{          
          background: 'white',
          color: 'white',
          borderColor: 'white',
          height: '1px',
          width: "100%",
          position: "relative",}}/>

    <p>
        <FooterLink href="https://www.monash.edu.my/personal-data-protection-notice">Data Protection Notice</FooterLink>
    </p>
    </Box>
  );
};

export default Footer;
