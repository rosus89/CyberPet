import Cat from "./models/Cat.js";
import Dog from "./models/Dog.js";
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

    setPetType: async () => { await _({  
                            type:'list',
                            name:'type',
                            message:'What type of pet would you like?',
                            choices:[
                                {
                                    name:'Cat',
                                    value:'Cat'
                                },
                                {
                                    name:'Dog',
                                    value:'Dog'
                                }
                            ]
                            })
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

    setPetName: async () => { await _({  
                            type:'input',
                            name:'name',
                            message:'How should your pet be called?'
                            })
                        .then((ans)=> pet.name = ans.name)
                        },

    setPetAct: async () => { await _({   
                            type:'list',
                            name:'act',
                            message:'Select and activity to do with ' + pet.name,
                            choices: [
                                {
                                    name:"Play with your pet",
                                    value:"play"
                                },
                                {
                                    name:"Feed your pet",
                                    value:"eat"
                                }
                            ]
                            })
                        .then((ans)=> pet[ans.act]())
                        pet.stats()
                        $.setPetAct()

                        },
    close: async () => { await _({
                        type:'list',
                        name:'close',
                        message:'Have you finished playing with your pet?',
                        choices: [
                            {
                                name:"yes",
                                value:"yes"
                            },
                            {
                                name:"no",
                                value:"no"
                            }
                        ]

                    })
                    .then((ans)=>{
                        console.log(ans)
                    })
                }
}

$.init();
