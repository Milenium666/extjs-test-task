Ext.define('App.view.ProductCard', {
    extend: 'Ext.window.Window',
    alias: 'widget.productcard',
    title: 'Карточка товара',
    width: 400,
    height: 300,
    modal: true,
    resizable: false,
    layout: 'fit',
    items: [{
        xtype: 'form',
        bodyPadding: 10,
        items: [
            { xtype: 'hiddenfield', name: 'id' },
            { xtype: 'textfield', name: 'name', fieldLabel: 'Имя', allowBlank: false },
            { xtype: 'textfield', name: 'description', fieldLabel: 'Описание', allowBlank: false },
            { 
                xtype: 'numberfield', 
                name: 'price', 
                fieldLabel: 'Цена', 
                minValue: 0, 
                decimalPrecision: 2,
                allowBlank: false
            },
            { 
                xtype: 'numberfield', 
                name: 'quantity', 
                fieldLabel: 'Кол-во', 
                minValue: 0,
                allowBlank: false
            }
        ]
    }],
    buttons: [{
        text: 'Отмена',
        handler: function() {
            this.up('window').close();
        }
    }, {
        text: 'Сохранить',
        handler: function() {
            var form = this.up('window').down('form');
            var record = this.up('window').record;
            if (form.isValid() && record) {
                var values = form.getValues();
                var isModified = 
                    record.get('price') !== parseFloat(values.price) ||
                    record.get('quantity') !== parseInt(values.quantity, 10);

                if (isModified) {
                    Ext.Msg.confirm('Изменения', 'Есть несохранённые изменения. Сохранить?', function(btn) {
                        if (btn === 'yes') {
                            record.set(values);
                            Ext.Msg.alert('Успех', 'Данные сохранены!');
                            this.up('window').close();
                        }
                    }, this);
                } else {
                    Ext.Msg.alert('Информация', 'Нет изменений.');
                }
            }
        }
    }],

    show: function(record) {
        this.record = record;
        this.down('form').loadRecord(record);
        this.callParent(); 
    }
});