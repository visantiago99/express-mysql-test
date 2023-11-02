const mysql = require("mysql2/promise")

const client = mysql.createPool(process.env.CONNECTION_STRING)

async function selectCustomers() {
    const results = await client.query(
        "SELECT * FROM customers;"
    )
    return results[0]
}

async function selectCustomer(id) {
    const results = await client.query(
        "SELECT * FROM customers WHERE id=?;",
        [id]
    )
    return results[0]
}

async function insertCustomer(customer) {
    await client.query(
        "INSERT INTO customers(name,age,uf) VALUES (?,?,?);",
        [customer.name, customer.age, customer.uf]
    )
}

async function updateCustomer(id, customer) {
    await client.query(
        "UPDATE customers SET name=?,age=?,uf=? where id=?;",
        [customer.name, customer.age, customer.uf, id]
    )
}

async function deleteCustomer(id) {
    await client.query(
        "DELETE FROM customers WHERE id=?;",
        [id]
    )
}

module.exports = {
    selectCustomers,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer,
}