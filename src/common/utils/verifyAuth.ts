import {ForbiddenException} from '@nestjs/common'
export const verifyAuth = (role:string,word:string)=>
{
    if (role === word) {
        return ;
    } else {
        throw new ForbiddenException('not allowed to perform this action');
    }
}