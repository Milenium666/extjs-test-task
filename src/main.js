Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'App': './app'
    }
});

Ext.application({
    name: 'App',
    appFolder: './app',
    controllers: [],
    launch: function() {
        Ext.create('App.view.Main');
    }
});