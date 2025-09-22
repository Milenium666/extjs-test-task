Ext.define('App.view.Main', {
    extend: 'Ext.container.Viewport',
    layout: 'border',
    items: [{
        region: 'north',
        xtype: 'panel',
        title: '',
        height: 60,
        bodyPadding: 10,
        html: '<h2>Система отслеживания задач</h2>'
    }, {
        region: 'center',
        xtype: 'panel',
        title: 'Список задач',
        html: '<div style="padding: 20px; text-align: center;">Здесь будет список задач</div>',
        margin: '0 0 0 0'
    }]
});