const express = require('express');
const { database } = require('../database.js');
const router = express.Router();

const pool = require('../database.js');

router.get('/',async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    let listOffices = await pool.query('SELECT * FROM office');
    res.json({
        status:"200",
        message:"Se ha recuperado correctamente",
        listOffices: listOffices
    });
});

router.get('/:id',async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const {id} = req.params;
    let office = await pool.query('SELECT * FROM office WHERE id=?',[id]);
    res.json({
        status:"200",
        message:"Se ha recuperado correctamente",
        office: office
    });
});

router.post('/create',async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const {office_code, address} = req.body;
    const office={
        office_code, address
    };
    await pool.query('INSERT INTO office set ?', [office]);
    res.json({
        status:"200",
        message:"Se ha registrado correctamente",
        office: office
    });
});

router.post('/update/:id',async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const {id} = req.params;
    const {office_code, address} = req.body;
    const office= {office_code, address};
    await pool.query('UPDATE office SET ? WHERE id = ?',[office,id]);
    res.json({
        status:"200",
        message:"Se ha actualizado correctamente",
        office: office
    });
});

router.post('/delete/:id',async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const {id} = req.params;
    await pool.query('DELETE FROM office WHERE id = ?',[id]);
});

module.exports = router;