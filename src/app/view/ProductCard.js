Ext.define('App.view.ProductCard', {
    extend: 'Ext.form.Panel',
    alias: 'widget.productcard',
    title: 'Карточка товара',
    width: 400,
    height: 300,
    layout: 'fit',
    modal: true,
    closable: true,
    resizable: false,

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'form',
                bodyPadding: 10,
                items: [
                    { xtype: 'hiddenfield', name: 'id' },
                    { xtype: 'textfield', name: 'name', fieldLabel: 'Имя', allowBlank: false },
                    { xtype: 'textfield', name: 'description', fieldLabel: 'Описание', allowBlank: false },
                    { xtype: 'numberfield', name: 'price', fieldLabel: 'Цена', minValue: 0, decimalPrecision: 2 },
                    { xtype: 'numberfield', name: 'quantity', fieldLabel: 'Кол-во', minValue: 0 }
                ],
                buttons: [{
                    text: 'Отмена',
                    handler: function() {
                        me.close();
                    }
                }, {
                    text: 'Сохранить',
                    handler: function() {
                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                            var values = form.getValues();
                            var record = me.record;
                            record.set(values);
                            Ext.Msg.alert('Успех', 'Данные сохранены!');
                            me.close();
                        }
                    }
                }]
            }]
        });

        this.callParent(arguments);
    },

    show: function(record) {
        this.record = record;
        this.down('form').loadRecord(record);
        this.show();
    }
});