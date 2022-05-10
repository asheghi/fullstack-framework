import Fson from "fson-db";
import fs from 'fs';
import crypto from "crypto";
export function getRepository(name){
  const path = '.db/' + name
  if (!fs.existsSync(path)) {
   fs.mkdirSync(path,{recursive:true})
  }
  const db = Fson(path);

  return {
    find(){
      return Object.keys(db).map(id => ({...db[id],id}));
    },
    findOne(id){
     return {...db[id],id};
    },
    create(item){
      const id = crypto.randomUUID();
      db[id] = item;
      return {id};
    },
    deleteOne(id){
      delete db[id];
      return id;
    },
    updateOne(id,data){
      db[id] = {...db[id],...data};
      return id;
    }
  }
}
