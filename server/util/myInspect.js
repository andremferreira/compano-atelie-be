function myInspect(obj, findArr) {
    if (obj !== Object(obj)) throw { error: { code: 'MYINSPEC-001', message: 'Only accept object on first parameter!'} }
    if (!Array.isArray(findArr)) throw { error: { code: 'MYINSPEC-002', message: 'Only accept array on second parameter!'} }
    const compare = []
    for (i = 0; i <= findArr.length; i++) {
        for (let p1 in obj) {
            if (typeof findArr[i] !== 'undefined') {
                if (p1 == findArr[i]) {
                    compare.push(p1)
                    obj = obj[p1]
                    break
                }
            }
        }
    }

    function isEquals(compare, findArr){
        let v = true
        if (compare.length != findArr.length){
            v = false
            return v
        } else {
            for( i2=0; i2 < compare.lenght; i2++ ){
                if(compare[i2] != findArr[i2]){
                    v = false
                }
            }
            return v
        }
    }
    return isEquals(compare, findArr)
}

module.exports = { myInspect }