Ext.define('App.view.Login', {
    extend: 'Ext.window.Window',
    title: 'Вход',
    width: 300,
    height: 180,
    layout: 'fit',
    modal: true,
    closable: false,


    items: [{
        xtype: 'form',
        bodyPadding: 15,
        items: [
            { 
                xtype: 'textfield', 
                name: 'login', 
                fieldLabel: 'Логин', 
                allowBlank: false 
            },
            { 
                xtype: 'textfield', 
                inputType: 'password',
                name: 'password', 
                fieldLabel: 'Пароль', 
                allowBlank: false 
            }
        ],
        buttons: [{
            text: 'Войти',
            formBind: true,
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    var v = form.getValues();
                    if (v.login === 'admin' && v.password === 'padmin') {
                        this.up('window').close();
                        Ext.create('App.view.Main');
                    } else {
                        Ext.Msg.alert('Ошибка', 'Неверный логин или пароль.');
                    }
                }
            }
        }]
    }]
});