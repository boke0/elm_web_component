const evts = [
    "click",
    "dblclick",
    "dedicate",
    "focus",
    "blur",
    "change",
    "submit",
    "reset",
    "load",
    "unload",
    "select",
    "mousedown",
    "mouseup",
    "mouseout",
    "mouseover",
    "mousemove",
    "dragdrop",
    "move",
    "resize",
];

export default function component(name, obj) {
    let init = obj.init;
    let template = obj.template;
    let attrs = obj.attrs?obj.attrs:[];
    class Component extends HTMLElement {
        constructor() {
            super();
            this.init = init;
            this.template = template;
            this.updater = {};
            this.shadow = this.attachShadow({mode:"closed"});
            for(const f in obj){
                if(typeof obj[f] == "function" && f!="init" && f!="template"){
                    this.updater[f] = obj[f];
                    this[f] = new Proxy(this.updater[f], {
                        apply: (target, this_, args) => {
                            Reflect.apply(target, this, args);
                            this.draw();
                        }
                    });
                }
            }
            let args = [];
            for(const attr of attrs){
                args.push(this.dataset[attr]);
            }
            this.init.apply(this, args);
            this.draw();
        }
        dedicate(data) {
            let evt = new Event("dedicate");
            evt.data = data;
            this.dispatchEvent(evt);
        }
        draw() {
            this.shadow.innerHTML = this.template();
            for(const e of evts){
                const doms = this.shadow.querySelectorAll("[upd-"+e+"]");
                if(doms!=null){
                    Array.from(doms).forEach(d=>{
                        d.addEventListener(e,evt=>{
                            this[d.getAttribute("upd-"+e)](evt);
                        });
                    });
                }
            }
        }
    }
    window.customElements.define(name, Component);
    return Component;
}

