import React from "react";
import { Route, Switch } from "react-router-dom";
import "./app.css";

import { HomePage, CartPage } from "../pages";
import ShopHeader from "../shop-header";
import BookDetails from "../book-details/book-details";

const App = () => {
  return (
    <main role="main" className="container">
      <ShopHeader numItems={0} total={0} />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/cart" component={CartPage} />
        <Route path="/:id" component={BookDetails}/>
      </Switch>
    </main>
  );
};

export default App;
