import * as React from "react";
import { render } from "react-dom";
import Locator from "./Locator/index";
import "./style.scss";

if (module.hot) {
    module.hot.accept();
}

render(<Locator />, document.getElementById("app"));
