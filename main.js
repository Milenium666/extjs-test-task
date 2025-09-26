Ext.Loader.setConfig({
    enabled: true,
    paths: { 'App': 'app' }
});


Ext.onReady(function() {
    var loggedIn = localStorage.getItem('app.loggedIn') === 'true';


    if (loggedIn) {
        Ext.create('App.view.Main');


        var activeTitle = localStorage.getItem('app.activeTabTitle');
        if (activeTitle) {
            Ext.defer(function() {
                var tp = Ext.ComponentQuery.query('tabpanel[region=center]')[0];
                if (tp) {
                    var found = tp.items.findBy(function(item) { return item && item.title === activeTitle; });
                    if (found) {
                        tp.setActiveTab(found);
                    }
                }
            }, 150);
        }
    } else {
        var login = Ext.create('App.view.Login');
        if (login && typeof login.show === 'function') login.show();
    }
});