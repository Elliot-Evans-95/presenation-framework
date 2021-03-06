import {Router} from "../router";
import {Bus} from "../../messages/bus";
import {fakeRoutes} from "../router.test";
import {RouterController} from "./router.controller";
import {Direction} from "../../shared/types/types";
import {Route} from "../router.type";

describe('When the "setNewRoute" is called on the RouterController going forward', () => {
    let router: Router;

    beforeAll( () => router = RouterController.setActiveRoute(new Router(fakeRoutes), Direction.NEXT, new Bus()));

    test('Then it sets the "NEXT" route as the active route', () => {
        const fakeChangedActiveRoutes: Readonly<Array<Route>> = [
            {
                id: 1,
                routeName: 'pageOne',
                routeHTML: '<h1>Page one of presentation</h1>',
                routeStyle: `
            #app-shell { 
                background: aqua;
            }
        `,
                isActive: false
            },
            {
                id: 2,
                routeName: 'pageTwo',
                routeHTML: '<h1>Page two of presentation</h1>',
                routeStyle: `
            #app-shell { 
                background: fuchsia;
            }
        `,
                isActive: true
            }
        ];

        expect(router.state).toEqual(fakeChangedActiveRoutes);
    });
});

describe('When the "setNewRoute" is called on the RouterController going backward', () => {
    const prevFakeRoutes: Readonly<Array<Route>> = [
        {
            id: 1,
            routeName: 'pageOne',
            routeHTML: '<h1>Page one of presentation</h1>',
            routeStyle: `
            #app-shell { 
                background: aqua;
            }
        `,
            isActive: false
        },
        {
            id: 2,
            routeName: 'pageTwo',
            routeHTML: '<h1>Page two of presentation</h1>',
            routeStyle: `
            #app-shell { 
                background: fuchsia;
            }
        `,
            isActive: true
        }
    ];

    let router: Router;

    beforeAll( () => router = RouterController.setActiveRoute(new Router(prevFakeRoutes), Direction.PREVIOUS, new Bus()));

    test('Then it sets the "NEXT" route as the active route', () => {
        const fakeChangedActiveRoutes: Readonly<Array<Route>> = [
            {
                id: 1,
                routeName: 'pageOne',
                routeHTML: '<h1>Page one of presentation</h1>',
                routeStyle: `
            #app-shell { 
                background: aqua;
            }
        `,
                isActive: true
            },
            {
                id: 2,
                routeName: 'pageTwo',
                routeHTML: '<h1>Page two of presentation</h1>',
                routeStyle: `
            #app-shell { 
                background: fuchsia;
            }
        `,
                isActive: false
            }
        ];

        expect(router.state).toEqual(fakeChangedActiveRoutes);
    });
});
