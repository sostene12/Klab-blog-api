const listAllEstates = {
    tags:['Estates'],
    description:"List all Estates",
    responses:{
        200:{
            description:"OK",
            content:{
                 "application/json":{
                    type:'object',
                    example:{
                        status:"success",
                        data:[]
                    }
                 }
            }
        }
    }
}

const getEstateById = {
    tags:['Estates'],
    description:"Get Estate by id",
    parameters:[
        {
            name:"id",
            in:"path",
            description:"id of the blog",
            type:"string",
            example:"63caaf3527b29e1d399896da"
        }
    ],
    responses:{
        200:{
            description:"OK",
            content:{
                 "application/json":{
                    type:'object',
                    example:{
                        status:"success",
                        data:[]
                    }
                 }
            }
        }
    }
}

const creatEstate = {
    tags:['Estates'],
    description:"Create an Estate",
    requestBody:{
        content:{
            "multipart/form-data":{
                schema:{
                    type:"object",
                    properties:{
                        title:{
                            type:"string",
                        },
                        description:{
                            type:"string",
                        },
                        image:{
                            type:"file",
                            description:"the image of the blog post"
                        }
                    }
                }
            }
        }
    },
    responses:{
        201:{
            description:"OK",
            content:{
                "application/json":{
                    type:"object",
                    example:{
                        status:"success",
                        data:[]
                    }
                }
            }
        }
    }
}

const deleteEstate = {
    tags:['Estates'],
    description:"Delete the Estate post by id",
    parameters:[
        {
            name:"id",
            in:"path",
            description:"id of the blog",
            type:"string"
        }
    ],

    responses:{
        200:{
            description:"OK",
            content:{
                 "application/json":{
                    type:'object',
                    example:{
                        status:"success",
                        data:[]
                    }
                 }
            }
        }
    }
}

const updateEstate = {
    tags:['Estates'],
    description:"Update Estate",
    parameters:[
        {
            name:"id",
            in:"path",
            description:"id of the blog",
            type:"string"
        }
    ],
    requestBody:{
        content:{
            "multipart/form-data":{
                schema:{
                    type:"object",
                    properties:{
                        title:{
                            type:"string",
                        },
                        description:{
                            type:"string",
                        },
                        image:{
                            type:"file",
                            description:"the image of the blog post"
                        }
                    }
                }
            }
        }
    },
    responses:{
        201:{
            description:"OK",
            content:{
                "application/json":{
                    type:"object",
                    example:{
                        status:"success",
                        data:[]
                    }
                }
            }
        }
    }
}

export const estateRouteDocs = {
    "/api/estate/all":{
        get:listAllEstates
    },
    "/api/estate/{id}":{
        get:getEstateById
    },
    "/api/estate/create":{
        post:creatEstate
    },
    "/api/estate/delete/{id}":{
        delete:deleteEstate
    },
    "/api/estate/update/{id}":{
        put:updateEstate
    }
}