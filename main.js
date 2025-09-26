Ext.Loader.setConfig({
    enabled: false
});


Ext.onReady(function() {
    console.log('Ext ready, creating Login');
    Ext.create('App.view.Login').show();
});