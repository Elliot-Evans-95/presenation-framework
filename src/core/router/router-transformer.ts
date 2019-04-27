import {Route} from "../../types/types";
import {Router, router} from "./router";

export abstract class RouterTransformer {
    static retrieveCurrentRouter(): Array<Route> {
        return router.state;
    }

    static generateNewRouter(route: Array<Route>) {
        new Router(route);
    }
}
