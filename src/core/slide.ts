import {Messages, Route} from "../types/types";
import {messageBus} from "./mediator/message-bus";
import {ShellElement} from "../helpers/shell-element";
import {NodeElement} from "../helpers/node-element";
import {DocumentWrapper} from "../helpers/document-wrapper";

export interface Dom {
    add: (content: any) => void;
    remove: () => void;
}

export class Slide implements Dom {
    private readonly _appShell;
    private readonly _pageShell;
    private readonly _styleShell;
    private readonly _document;

    constructor(route: Route, appShell: ShellElement, pageShell: ShellElement, styleShell: NodeElement, document: DocumentWrapper) {
        this._appShell = appShell;
        this._pageShell = pageShell;
        this._styleShell = styleShell;
        this._document = document;

        this.remove();
        this.add(route);
    }

    remove(): void {
        while (this._appShell.element.firstChild) {
            this._appShell.element.removeChild(this._appShell.element.firstChild);
        }

        messageBus.publish(Messages.CONTENT_REMOVED, this._appShell);
    }

    add(route: Route): void {
        this._document.title = route.routeName;
        this._pageShell.innerHTML = route.routeHTML;
        this._styleShell.style = route.routeStyle;

        this._appShell.element.appendChild(this._pageShell.element);
        this._appShell.element.appendChild(this._styleShell.element);

        messageBus.publish(Messages.CONTENT_ADDED, this._appShell);
    };

}
