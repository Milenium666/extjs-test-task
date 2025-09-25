Ext.define('App.view.Main', {
    extend: 'Ext.container.Viewport',
    layout: 'border',

    requires: [
        'App.store.Products',
        'App.model.Product',
        'App.view.ProductCard'
    ],

    items: [{
        region: 'north',
        xtype: 'panel',
        title: 'Главное окно',
        style: {
            background: '#007acc',
            color: 'white'
        }
    }, {
        region: 'west',
        width: 180,
        xtype: 'toolbar',
        layout: 'vbox',
        style: {
            background: '#007acc'
        },
        items: [
            {
                text: 'Товары',
                width: '100%',
                handler: function () {
                    var tabPanel = Ext.ComponentQuery.query('tabpanel[region=center]')[0];
                    var store = Ext.create('App.store.Products');

                    tabPanel.add({
                        title: 'Товары',
                        layout: 'fit',
                        closable: true,
                        items: [{
                            xtype: 'grid',
                            store: store,
                            columns: [
                                { text: 'ID', dataIndex: 'id', width: 60 },
                                { text: 'Имя', dataIndex: 'name', width: 160 },
                                { text: 'Описание', dataIndex: 'description', flex: 1 },
                                { text: 'Цена', dataIndex: 'price', width: 100 },
                                {
                                    text: 'Кол-во',
                                    dataIndex: 'quantity',
                                    width: 90,
                                    renderer: function (value) {
                                        if (value <= 0) {
                                            return '<div style="background-color: red; color: black; padding: 4px; width: 100%; height: 100%;">' + value + '</div>';
                                        }
                                        return value;
                                    }
                                }
                            ],
                            listeners: {
                                itemclick: function (view, record) {
                                    Ext.create('App.view.ProductCard').show(record);
                                }
                            }
                        }]
                    });

                    tabPanel.setActiveTab(tabPanel.items.length - 1);
                }
            },
            {
                text: 'Выход',
                width: '100%',
                margin: '10 0 0 0',
                handler: function () {
                    Ext.ComponentQuery.query('viewport')[0].removeAll();
                    Ext.create('App.view.Login');
                }
            }
        ]
    }, {
        region: 'center',
        xtype: 'tabpanel',
        style: {
            background: '#f0f0f0'
        }
    }]
});