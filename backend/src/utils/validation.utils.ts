
const isEmpty = (body: any, properties:any)=> {
    return properties.some((property:any)=> {
        if (body[property] === undefined || 
        body[property] === null){
            return true
        }
        if (typeof body[property] === "string"){
            if (body[property].trim() === "") return true
        }
        return false
    });
}

export {isEmpty}