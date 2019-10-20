// ----------------------------------- CONSOLE COLOR HELP -----------------------
module.exports = function (nameColor, str){
    var msg
    if(!nameColor) nameColor = ''
    switch(nameColor){
        case 'f-yellow':
            msg = '\x1b[33m' + str + '\x1b[0m';
        break;
        case 'b-yellow':
            msg = '\x1b[43m' + str + '\x1b[0m';
        break;
        case 'f-green':
            msg = '\x1b[32m' + str + '\x1b[0m';
        break;
        case 'b-green':
            msg = '\x1b[42m' + str + '\x1b[0m';
        break;
        case 'f-red':
            msg = '\x1b[31m' + str + '\x1b[0m';
        break;
        case 'b-red':
            msg = '\x1b[41m' + str + '\x1b[0m';
        break;
        case 'f-blue':
            msg = '\x1b[34m' + str + '\x1b[0m';
            break;
        case 'b-blue':
            msg = '\x1b[44m' + str + '\x1b[0m';
            break;            
        case 'f-cyan':
            msg = '\x1b[36m' + str + '\x1b[0m';
            break;
        case 'b-cyan':
            msg = '\x1b[46m' + str + '\x1b[0m';
            break;            
        case 'f-magenta':
            msg = '\x1b[35m' + str + '\x1b[0m';
            break;
        case 'f-hidden':
            msg = '\x1b[90m' + str + '\x1b[0m';
        break;
        case 'f-underscore':
            msg = "\x1b[4m" + str + '\x1b[0m';
            break;
        default:
            msg = '\x1b[0m' + str;
    }  
    return msg
}