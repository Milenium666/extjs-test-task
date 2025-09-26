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

                    var filterIdField = Ext.create('Ext.form.field.Text', {
                        fieldLabel: 'ID',
                        labelWidth: 30,
                        width: 120,
                        listeners: {
                            specialkey: function (field, e) {
                                if (e.getKey() === e.ENTER) {
                                    applyFilters(store, filterIdField.getValue(), filterDescField.getValue());
                                }
                            }
                        }
                    });

                    var filterDescField = Ext.create('Ext.form.field.Text', {
                        fieldLabel: 'Описание',
                        labelWidth: 70,
                        width: 200,
                        listeners: {
                            specialkey: function (field, e) {
                                if (e.getKey() === e.ENTER) {
                                    applyFilters(store, filterIdField.getValue(), filterDescField.getValue());
                                }
                            }
                        }
                    });

                    function applyFilters(store, idValue, descValue) {
                        var filters = [];

                        if (idValue !== '') {
                            var id = parseInt(idValue, 10);
                            if (!isNaN(id)) {
                                filters.push({ property: 'id', value: id, operator: '=' });
                            }
                        }

                        if (descValue !== '') {
                            filters.push({ property: 'description', value: descValue, operator: 'like' });
                        }

                        store.clearFilter();
                        if (filters.length > 0) {
                            store.addFilter(filters);
                        }
                    }

                    var grid = Ext.create('Ext.grid.Panel', {
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
                                        return '<div style="background: #ff0000 !important; color: black !important; font-weight: bold !important; padding: 4px; margin: -2px; width: calc(100% + 4px); height: calc(100% + 4px); box-sizing: border-box;">' + value + '</div>';
                                    }
                                    return value;
                                }
                            }
                        ],
                        dockedItems: [{
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [filterIdField, filterDescField]
                        }],
                        listeners: {
                            itemclick: function (view, record, item, index, e, eOpts) {
                                var cell = e.getTarget('.x-grid-cell');
                                if (!cell) return;

                                var cellIndex = cell.cellIndex;
                                var column = view.getGridColumns()[cellIndex];

                                if (column && column.dataIndex === 'name') {
                                    var card = Ext.create('App.view.ProductCard');
                                    card.show(record);
                                }
                            }
                        }
                    });

                    tabPanel.add({
                        title: 'Товары',
                        layout: 'fit',
                        closable: true,
                        items: [grid]
                    });

                    tabPanel.setActiveTab(tabPanel.items.length - 1);
                }
            },
            {
                text: 'Выход',
                width: '100%',
                margin: '10 0 0 0',
                handler: function () {
                    var vp = Ext.ComponentQuery.query('viewport')[0];
                    if (vp) {
                        vp.destroy();
                    }

                    var login = Ext.create('App.view.Login');

                    if (login) {
                        var form = login.down && login.down('form');
                        if (form && form.getForm) {
                            form.getForm().reset();
                        }
                        if (typeof login.show === 'function') {
                            login.show();
                        }
                    }
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