const characters = '0123456789';
export const generateCode = ()=>
{
    let result = ""
    for ( let i = 0; i < 4 ; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 10));
    }
    return result
}