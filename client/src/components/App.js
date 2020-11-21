import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import ProductDetail from "./views/ProductDetail/ProductDetail"
import UploadProductPage from './views/UploadProduct/UploadProductPage.js';
import CoLandingPage from './views/Community/CoLandingPage.js'
import UploadPost from './views/Community/UploadPost.js'
import CoDetialPage from './views/Community/CoDetailPage.js'

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/community" component={Auth(CoLandingPage, null)} />
          <Route exact path="/community/upload" component={Auth(UploadPost, null)} />
          <Route exact path="/community/:post_by_id" component={Auth(CoDetialPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
          <Route exact path="/product/:products_by_id" component={Auth(ProductDetail, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
