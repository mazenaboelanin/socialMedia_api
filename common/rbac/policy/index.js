const roles = require('../../enum/roles');
const superAdminPolicy = require('../policy/superAdminPolicy');
const adminPolicy = require('../policy/adminPolicy');
const userPolicy = require('../policy/userPolicy');


const options = {
    [roles.SUPER_ADMIN]:{
        can: superAdminPolicy
    },
    [roles.ADMIN]:{
        can: adminPolicy
    },
    [roles.USER]:{
        can: userPolicy
    }
}


module.exports = options ;