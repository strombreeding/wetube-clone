import { RequestHandler } from "express"

export const serch:RequestHandler = (req,res) =>  res.send("serch Videos")
export const watch:RequestHandler = (req,res) =>{
    return res.send(`#${req.params.id} you watching now!]`)
}
export const edit:RequestHandler = (req,res) => res.send("Edit Videos")
export const upload:RequestHandler = (req,res) => res.send("Upload Videos")
export const remove:RequestHandler = (req,res) => res.send("Remove Videos")
