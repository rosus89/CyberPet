import inquirer from "inquirer";
import fs from "fs";

import Cat from "./models/Cat.js";
import Dog from "./models/Dog.js";
import Rabbit from "./models/Rabbit.js";
import petType from "./choices/petType.js";
import actions from "./choices/actions.js";
import extras from "./choices/extras.js";
import closeApp from "./choices/closeApp.js";





const _ = inquirer.prompt;
const separator = new inquirer.Separator();
let pet;
let savedPets = ["New Pet"];

let $ = {
    init: async () => {
         $.checkPets() ? await $.petLoadOptions($.loadPet, $.createPet) : await $.createPet();
         await $.setPetAct();
    },
    createPet: async () => {  await $.setPetType();
                              await $.setPetName(); 
                            },              

    setPetType: async () => { await _({  type:'list', name:'type',
                            message:'What type of pet would you like?',
                            choices: petType })
                        .then((ans)=>$.createPetType(ans.type))
                        },
    createPetType:  (type, name, health, hunger, thirst, happiness, energy) => {
                                switch(type){
                                    case 'Cat':
                                        pet = new Cat(name, health, hunger, thirst, happiness, energy);
                                        break;
                                    case 'Dog':
                                        pet = new Dog(name, health, hunger, thirst, happiness, energy);
                                        break;
                                    case 'Rabbit':
                                        pet = new Rabbit(name, health, hunger, thirst, happiness, energy);
                                        break;
                                }
                            },

    setPetName: async () => { await _({  type:'input', name:'name',
                        message:'How should your pet be called?'})
                        .then((ans)=> pet.name = ans.name)
                        },

    setPetAct: async () => { await _({ type:'list', name:'activity',
                        message:'Select and activity to do with ' + pet.name,
                        choices: [...actions.animal ,...actions[pet.constructor.name], separator , ...extras]})
                        .then((ans)=> ans.activity=="Close" ? $.close() : pet[ans.activity]())
                        pet.stats()
                        $.setPetAct()

                        },
    close: async () => { await _({  type:'list', name:'close',
                        message:'Have you finished playing with your pet?',
                        choices: closeApp })
                    .then((ans)=>{
                        if (ans.close == "yes"){
                            process.exit()
                        }
                        else if (ans.close == "saveExit"){
                            $.save()
                            process.exit()
                        }
                        
                    })
                },
                
    save: () => {
                   !fs.existsSync("pets") ? fs.mkdirSync("pets") : null
                    fs.appendFileSync("./pets/" + pet.name, JSON.stringify({petType :pet.constructor.name, ...pet}), (err) => console.log(err))
                },

                //TODO: update pet instead of adding to the object
    checkPets: () => 
                {   
                    if(fs.existsSync("pets") === true){       
                      fs.readdirSync("pets").forEach(file => savedPets.push(file))
                      return true
                }
                    else return false
                },

    petLoadOptions: async (load, create) =>
                {
                    await _({   type:'list', name:'selectPet',
                    message:'Load existing or create new pet',
                    choices: savedPets  })
                    .then((ans)=>{
                       return ans.selectPet !="New Pet" ? load(ans.selectPet) :  create()
                     }
                    )
                },
    
     loadPet: async  (item) => 
                {
                     const data = await JSON.parse(fs.readFileSync("./pets/" + item, "utf8"))
                     $.createPetType(data.petType,data.name, data.health, data.hunger, data.thirst, data.happiness, data.energy)
                     
                }
}

$.init();
