const express = require('express');
const {request} = require("express");
const app = express();
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fibonacci'
});



app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})

//endpoint
app.get('/health',(request,response)=>{
    response.json({data:"health"}
    );
});

app.get('/penjumlahan',(request,response)=>{
    const bilangan1 = parseInt(request.query.bilangan1);
    const bilangan2 = parseInt(request.query.bilangan2);
    const result = bilangan1 * bilangan2;
    response.json({hasil_penjumlahan:result})
})

app.get('/pembagian',(request,response)=>{
    const bilangan1 = parseInt(request.query.bilangan1);
    const bilangan2 = parseInt(request.query.bilangan2);
    const result = bilangan1 / bilangan2;
    response.json({hasil_pembagian:result})
})

app.get('/perkalian',(request,response)=>{
    const bilangan1 = parseInt(request.query.bilangan1);
    const bilangan2 = parseInt(request.query.bilangan2);
    const result = bilangan1 * bilangan2;
    response.json({hasil_perkalian:result})
})

app.get('/pengurangan',(request,response)=>{
    const bilangan1 = parseInt(request.query.bilangan1);
    const bilangan2 = parseInt(request.query.bilangan2);
    const result = bilangan1 - bilangan2;
    response.json({hasil_pengulangan:result})
})

app.get('/prima',(request,response)=>{
    const rentang = parseInt(request.query.rentang);
    let prima = [];

    for (let i = 2; i<rentang;i++){ // Mengulang sebanyak rentang
        let isPrima = true;
        for(let j = 2; j<i; j++){ // Mengulang pembagi sebanyak data yang ke i
                if(i%j==0){
                    isPrima = false;
                }
            }
            if(isPrima){
                prima.push(i)
            }
        }
    response.json({data:prima})

})

app.get('/genap', (request, response) => {
    const rentang = parseInt(request.query.rentang);
    let genap = [];

    for (let i = 2; i <= rentang; i++) { // Mengulang sebanyak rentang
        if (i % 2 === 0) { // Cek apakah bilangan genap
            genap.push(i);
        }
    }
    response.json({data:genap});
});

app.get('/ganjil', (request, response) => {
    const rentang = parseInt(request.query.rentang);
    let ganjil = [];
    for (let i = 1; i <= rentang; i++) { // Mengulang sebanyak rentang
        if (i % 2 !== 0) { // Cek apakah bilangan ganjil
            ganjil.push(i);
        }
    }
    response.json({data:ganjil});
});

// app.get('/fibonacci', (request,response)=>{
//     const rentang = parseInt(request.query.rentang);
//     let fibonacci = [0,1];
//     for (let i = 2; i < rentang; i++) {
//         fibonacci[i] = fibonacci[i-1] + fibonacci[i-2];
//     }
//     response.json({data:fibonacci});
// })

// app.get('/fibonaci', (request, response)=>{
//     const rentang = parseInt(request.query.rentang);
//     let fibonacci = (n) => {
//         if(n <= 1) {
//             return n;
//         }
//         let result = [0, 1];
//         for (let i = 2; i <= n; i++) {
//             result[i] = result[i - 2] + result[i - 1];
//         }
//         return result;
//     }
//     response.json({data : fibonacci(rentang)});
// })


app.get('/fibonacci', (request,response)=>{
    const rentang = parseInt(request.query.rentang);
    let fibonacci = [0,1];
    for (let i = 2; i < rentang; i++) {
        fibonacci[i] = fibonacci[i-1] + fibonacci[i-2];
    }
    // convert array to string
    let sequence = fibonacci.toString();
    connection.query("INSERT INTO fibonacci_table (range,sequence) VALUES (?,?)", [rentang,sequence], (err, result) => {
        if (err) throw err;
        response.json({data:fibonacci});
    });
})
