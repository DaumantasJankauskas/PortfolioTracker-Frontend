import React, { Component } from 'react';
import Header from "./header"
import Footer from "./footer"
import background from "../assets/site_background.jpg"

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div className="App" >
        <Header />
        <div
          style = {
            {
              backgroundImage: `url(${background})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              height: '88vh',
            }
          }> </div>
        <Footer />
    </div>
    );
  }
}
