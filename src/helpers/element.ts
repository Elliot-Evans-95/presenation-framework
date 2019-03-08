export class ShellElement {
    private readonly HTMLElement: HTMLElement;

    constructor(id: string) {
        this.HTMLElement = <HTMLElement>document.getElementById(id) || <HTMLElement>document.createElement(id);
    }

    get element(): HTMLElement {
        return this.HTMLElement;
    }

    set innerHTML(content: string) {
        if(!content) return;

        this.HTMLElement.innerHTML = content;
    }

    set addClassName(className: string) {
        this.HTMLElement.classList.add(className);
    }

    set removeClassName(className: string) {
        this.HTMLElement.classList.remove(className);
    }

    addEventListener(listener: string): Promise<any> {
        const htmlElement = this.HTMLElement;

        return new Promise(function(resolve, reject) {
            htmlElement.addEventListener(listener, () => {
                // htmlElement.removeEventListener('animationend');
                resolve();
            })
        });
    }

}

export class NodeElement {
    private readonly nodeElement: HTMLElement;

    constructor(id: string) {
        this.nodeElement = <HTMLElement>document.createElement(id);
    }

    get element(): HTMLElement {
        return this.nodeElement;
    }

    set style(styleSheet: string) {
        if(!styleSheet) return;

        this.nodeElement.textContent = styleSheet;
    }

}
