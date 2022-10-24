const fileValidate = (fileanme, regs) => {
    for(let i = 0; i < regs.length; i++) {
        if (regs[i].test(fileanme)) return true
    }
    return false
}

module.exports = {
    fileValidate
}