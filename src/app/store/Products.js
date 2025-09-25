Ext.define('App.store.Products', {
    extend: 'Ext.data.JsonStore',
    alias: 'store.products',
    model: 'App.model.Product',
    data: [
        { id: 1, name: 'Компьютер', description: 'Настольный компьютер', price: 50000, quantity: 10 },
        { id: 2, name: 'Мышь', description: 'Оптическая мышь', price: 1500, quantity: 20 },
        { id: 3, name: 'Клавиатура', description: 'Механическая клавиатура', price: 8000, quantity: 0 }
    ]
});