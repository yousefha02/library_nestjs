import { ForbiddenException } from '@nestjs/common';
export const verifyUser = (userId,userServerId)=>
{
    if(userId.toString()!==userServerId.toString())
    {
        throw new ForbiddenException('you can not do this action')
    }
    else{
        return ;
    }
}