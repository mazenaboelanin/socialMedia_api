const findService = async(model, skip, limit, search, fields)=>{
    try {
        let data;
        if(search){
            const cols = [...fields.map((field)=>{
                return {[field]: {$regex: search}};
            }),]
            data = await model.find({
                $or: cols
            })
            .skip(skip)
            .limit(limit);
        } else {
            data = await model.find().skip(skip).limit(limit);
        }
        return data;
    } catch (err) {
        return err;
    }
    
}

module.exports = findService;