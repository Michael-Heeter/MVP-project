import express from 'express'
import dotenv from 'dotenv'
import postgres from 'postgres'
import pg from 'pg'
import cors from 'cors'
dotenv.config()

const {Pool} = pg
    

const app = express()
const PORT = process.env.PORT
const pool = new Pool ({
    connectionString: process.env.DATABASE_URL
})

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.get("/api/player", async (req,res) => {
    try{
        const result = await pool.query(`SELECT * FROM player`)
        res.status(200).json(result.rows)
    }catch(err){
        res.status(err).send('internal server error on get player')
    }
})

app.get('/api/player/:id', async (req,res) => {
    try{
        const {id} = req.params
        const result = await pool.query(`SELECT character_table.id, character_table.name, character_table.subrace, character_table.race, character_table.subclass, character_table.class FROM character_table WHERE player_id=${id}`)
        res.status(200).json(result.rows)
    }catch(err){
        res.status(err).send('internal server error on get player:id')
    }
})

app.get("/api/campaign", async (req,res) => {
    try{
        const result = await pool.query(`SELECT * FROM campaign`) 
        res.json(result.rows)
    }catch(err){
        res.status(500).send('internal server error on get campaign')
    }
})

app.get("/api/campaign/:id", async (req,res) => {
    try{
        const {id} = req.params
        const result = await pool.query(`SELECT player.name, character_table.name, character_table.class, character_table.race FROM character_table JOIN player ON character_table.player_id = player.id JOIN campaign ON character_table.campaign_id = campaign.id WHERE campaign.id = ${id};`)
        console.log(result.rows)
        res.json(result.rows)
    }catch(err){
        res.status(500).send('internal server error on get campaign:id')
    }
})

app.get("/api/character", async (req,res)=> {
    try{
        const result = await pool.query(`SELECT * FROM character_table;`)
        console.log(result.rows)
        res.json(result.rows)
    }catch(err){
        console.log(err)
        res.send('internal server error on get Character')
    }
})

app.get("/api/character/:id", async (req,res) => {
    console.log(req)
    const {id} = req.params
    try{
        const result = await pool.query(`SELECT * FROM character_table WHERE id=${id}`);
        console.log(result.rows)
        res.json(result.rows)
    }catch(err){
        res.status(500).send('internal server error on get character:id')
    }
})

app.post("/api/campaign", async (req,res) => {
    const {name, dm} = req.body;
    console.log({name, dm})
    try {
        if (!name || !dm){
            res.status(400).json({error: 'Invalid Request'})
        } else {
        const result = await pool.query(`INSERT INTO campaign (name, dm) VALUES ('${name}', '${dm}') RETURNING *;`);
        result.id = result.rows[0].id;
        res.status(201).json(result.rows[0]);
        }
    }catch (err) {
        console.log(err)
        res.status(500).send('internal server error on post campaign')
    }
})

app.post("/api/player", async (req,res) => {
    const {name} = req.body;
    console.log({name})
    try {
        if (!name){
            res.status(400).json({error: 'Invalid Request'})
        } else {
        const result = await pool.query(`INSERT INTO player (name) VALUES ('${name}) RETURNING *;`);
        result.id = result.rows[0].id;
        res.status(201).json(result.rows[0]);
        }
    }catch (err) {
        console.log(err)
        res.status(500).send('internal server error on post campaign')
    }
})

app.post("/api/character", async (req,res) => {
    const newCharacter = req.body;
    try {
        const result = await pool.query(`
            INSERT INTO character_table (
                name, race, subrace, class, subclass, size, alignment, strength, dexterity, constitution, intelligence, wisdom, charisma, 
                acrobatics, animal_handling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, 
                nature, perception, performance, persuasion, religion, sleight_of_hand, stealth, survival, light_armor, medium_armor, 
                heavy_armor, shield, player_id, campaign_id
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, 
                $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37
            ) RETURNING *`,
            [
                newCharacter.name, newCharacter.race, newCharacter.subrace, newCharacter.class, newCharacter.subclass, newCharacter.size,
                newCharacter.alignment, newCharacter.strength, newCharacter.dexterity, newCharacter.constitution, newCharacter.intelligence,
                newCharacter.wisdom, newCharacter.charisma, newCharacter.acrobatics, newCharacter.animal_handling, newCharacter.arcana,
                newCharacter.athletics, newCharacter.deception, newCharacter.history, newCharacter.insight, newCharacter.intimidation,
                newCharacter.investigation, newCharacter.medicine, newCharacter.nature, newCharacter.perception, newCharacter.performance,
                newCharacter.persuasion, newCharacter.religion, newCharacter.sleight_of_hand, newCharacter.stealth, newCharacter.survival,
                newCharacter.light_armor, newCharacter.medium_armor, newCharacter.heavy_armor, newCharacter.shield, newCharacter.player_id,
                newCharacter.campaign_id
            ]
        );
        newCharacter.id = result.rows[0].id;
        res.status(201).json(result.rows[0]);
    }catch (err) {
        console.log(err)
        res.status(500).send('internal server error on post character')
    }
})

app.patch('/api/character/:id', async (req,res)=>{
    const {id} = req.params
    const updateChar = req.body
    try{
        const result = await pool.query('UPDATE character_table SET name = $1, race = $2, subrace = $3, class = $4, subclass = $5, size = $6, alignment = $7, strength = $8, dexterity = $9, constitution = $10, intelligence = $11, wisdom = $12, charisma = $13, acrobatics = $14, animal_handling = $15, arcana = $16, athletics = $17, deception = $18, history = $19, insight = $20, intimidation = $21, investigation = $22, medicine = $23, nature = $24, perception = $25, performance = $26, persuasion = $27, religion = $28, sleight_of_hand = $29, stealth = $30, survival = $31, light_armor = $32, medium_armor = $33, heavy_armor = $34, shield = $35, player_id = $36, campaign_id = $37 WHERE id = $38 RETURNING *',
        [
            updateChar.name, updateChar.race, updateChar.subrace, updateChar.class, updateChar.subclass, updateChar.size,
            updateChar.alignment, updateChar.strength, updateChar.dexterity, updateChar.constitution, updateChar.intelligence,
            updateChar.wisdom, updateChar.charisma, updateChar.acrobatics, updateChar.animal_handling, updateChar.arcana,
            updateChar.athletics, updateChar.deception, updateChar.history, updateChar.insight, updateChar.intimidation,
            updateChar.investigation, updateChar.medicine, updateChar.nature, updateChar.perception, updateChar.performance,
            updateChar.persuasion, updateChar.religion, updateChar.sleight_of_hand, updateChar.stealth, updateChar.survival,
            updateChar.light_armor, updateChar.medium_armor, updateChar.heavy_armor, updateChar.shield, updateChar.player_id,
            updateChar.campaign_id, id
        ])
        if(result.rowCount === 0){
            res.status(404).send('character not found')
        }else{
            const updatedChar = result.rows[0]
            res.json({message: 'Character updated successfully', updateChar: updatedChar})
        }
    }catch(err){
        console.log(err)
        res.status(500).send(`internal server error on patch character ${id}`)
    }
})

app.patch('/api/campaign/:id', async (req,res)=>{
    const {id} = req.params
    const updateCampaign = req.body
    try{
        const result = await pool.query('UPDATE campaign SET name = $1, dm = $2 WHERE id = $3 RETURNING *',
        [updateCampaign.name, updateCampaign.dm, id])
        if(result.rowCount === 0){
            res.status(404).send('character not found')
        }else{
            const updatedCampaign = result.rows[0]
            res.json({message: 'Campaign updated successfully', updateCampaign, updatedCampaign})
        }
    }catch(err){
        console.log(err)
        res.status(500).send(`internal server error on patch campaign ${id}`)
    }
})

app.patch('/api/player/:id', async (req,res)=>{
    const {id} = req.params
    const updatePlayer = req.body
    try{
        const result = await pool.query('UPDATE player SET name = $1 WHERE id = $2 RETURNING *',
        [updatePlayer.name, id])
        if(result.rowCount === 0){
            res.status(404).send('character not found')
        }else{
            const updatedPlayer = result.rows[0]
            res.json({message: 'Campaign updated successfully', updatePlayer, updatedPlayer})
        }
    }catch(err){
        console.log(err)
        res.status(500).send(`internal server error on patch player ${id}`)
    }
})

app.delete('/api/campaign/:id', async (req,res)=>{
    const {id} = req.params
    if(isNaN(id)||id <= 0){
        res.status(400).send('invalid campaign ID')
    }
    try{
        const result = await pool.query('DELETE FROM campaign WHERE id = $1 RETURNING *', [id])
        if(result.rowCount === 0){
            res.status(404).send('Campaign not found')
        }else{
            res.json({message: 'Campaign deleteed successfully', deletedCampaign: result.rows[0]})
        }
    }catch(err){
        console.log(err)
        res.status(500).send(`internal server error on delete campaign ${id}`)
    }
})

app.delete('/api/player/:id', async (req,res)=>{
    const {id} = req.params
    if(isNaN(id)||id <= 0){
        res.status(400).send('invalid player ID')
    }
    try{
        const result = await pool.query('DELETE FROM player WHERE id = $1 RETURNING *', [id])
        if(result.rowCount === 0){
            res.status(404).send('Player not found')
        }else{
            res.json({message: 'Player deleteed successfully', deletedPlayer: result.rows[0]})
        }
    }catch(err){
        console.log(err)
        res.status(500).send(`internal server error on delete player ${id}`)
    }
})

app.delete('/api/character/:id', async (req,res)=>{
    const {id} = req.params
    if(isNaN(id)||id <= 0){
        res.status(400).send('invalid character ID')
    }
    try{
        const result = await pool.query('DELETE FROM character_table WHERE id = $1 RETURNING *', [id])
        if(result.rowCount === 0){
            res.status(404).send('Character not found')
        }else{
            res.json({message: 'Character deleteed successfully', deletedCharacter: result.rows[0]})
        }
    }catch(err){
        console.log(err)
        res.status(500).send(`internal server error on delete character ${id}`)
    }
})

app.listen(PORT, () => {
    console.log(`listening on Port ${PORT}`)
})