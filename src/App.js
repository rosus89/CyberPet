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
         $.checkPets() == true ? await $.petLoadOptions() : await $.createPet();
         await $.setPetAct();
    },
    createPet: async () => {  await $.setPetType();
                              await $.setPetName(); 
                            },              

    setPetType: async () => { await _({  type:'list', name:'type',
                            message:'What type of pet would you like?',
                            choices: petType })
                        .then((ans) => {
                            switch(ans.type){
                                case 'Cat':
                                    pet = new Cat();
                                    break;
                                case 'Dog':
                                    pet = new Dog();
                                    break;
                                case 'Rabbit':
                                    pet = new Rabbit();
                                    break;
                            }
                        } )
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
                    fs.appendFileSync("./pets/" + pet.name, JSON.stringify(pet), (err) => console.log(err))
                },
    checkPets: () => 
                {   
                    if(fs.existsSync("pets") === true){       
                      fs.readdirSync("pets").forEach(file => savedPets.push(file))
                      return true
                }
                    else return false
                },
    petLoadOptions: async () =>
                {
                    await _({   type:'list', name:'selectPet',
                    message:'Load existing or create new pet',
                    choices: savedPets  })
                    .then((ans)=>{
                        console.log(ans)
                    }

                    )
                }
    
    // loadPet: async () => {
    //                 fs.existsSync("pets") ?

    // }
}

$.init();
