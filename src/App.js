import Cat from "./models/Cat.js";
import Dog from "./models/Dog.js";
import petType from "./choices/petType.js";
import actions from "./choices/actions.js";
import closeApp from "./choices/closeApp.js";

import inquirer from "inquirer";


const _ = inquirer.prompt;
let pet;

let $ = {
    init: async () => {
         await $.createPet()
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
                            }
                        } )
                        },

    setPetName: async () => { await _({  type:'input', name:'name',
                        message:'How should your pet be called?'})
                        .then((ans)=> pet.name = ans.name)
                        },

    setPetAct: async () => { await _({ type:'list', name:'act',
                        message:'Select and activity to do with ' + pet.name,
                        choices: [...actions.animal ,...actions[pet.constructor.name]]})
                        .then((ans)=> pet[ans.act]())
                        pet.stats()
                        $.setPetAct()

                        },
    close: async () => { await _({  type:'list', name:'close',
                        message:'Have you finished playing with your pet?',
                        choices: closeApp })
                    .then((ans)=>{
                        console.log(ans)
                    })
                }
}

$.init();
