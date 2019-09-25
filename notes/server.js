const express = require('express');

const app = express();


app.get('./api/customers', (req, res) =>{
    const customers = [
        {id: 1, firstName: 'John', lastName: 'Doe'},
        {id: 2, firstName: 'Steve', lastName: 'Doe'},
        {id: 3, firstName: 'Mary', lastName: 'Doe'}
    ]
    res.json(customers);
})
// Port to listen on
const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));