class Router {
    constructor(routes) {
        this.routes = routes;
        this.started = false;
        //Ein Ereignislistener, der auf Änderungen im Hash der URL reagiert

        window.addEventListener('hashchange', () => this.handleRouting());
    }

    start() {
        this.started = true; //Routing wurde gestartet
        this.handleRouting();
    }
    //Methode zum Anhalten des Routings
    stop() {
        this.started = false;
    }
    //Methode zum Handhaben des Routings basierend auf der aktuellen URL
    handleRouting() {
        let url = location.hash.slice(1) || '/';
        let route = this.routes.find(route => url.match(new RegExp(route.url)));
        //Wenn keine passende Route gefunden wurde, gebe einen Fehler aus
        if (!route) {
            console.error(`Keine Route zur URL ${url} gefunden!`);
            return;
        }
        //Zeige die entsprechende Route an
        route.show();
    }
}
//Warte bis das Fenster vollständig geladen ist, und dann den Code ausführen
window.addEventListener("load",function(){
const routes = [
    
    {
        url: '^/ueberuns$',
        show: () => versteckeuberuns('ueberuns') 
    },
    {
        url: '^/benutzer$',
        show: () => versteckebenutzer('benutzer')
    }
];

let router = new Router(routes);
router.start();
})
