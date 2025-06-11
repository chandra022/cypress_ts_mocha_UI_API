import { plainToInstance } from "class-transform";
import { ApiClient } from "../apiClient";
import * as SingleUserInfo from '../models/single_user';
import { UsersList } from "../models/list_users";


export class UserInfo extends ApiClient{
    singleUserEndPoint: string = 'api/users';

    constructor(){
        super();
    }

    getByUserId( userId: number ){
        return this.get( `${this.singleUserEndPoint}/${userId}` )
            .then( ( res )=> {
                return plainToInstance( SingleUserInfo.SingleUser, res.body );
            });
    }

    getUsersByPage( pageId: number ){
        const pageQryParam: Record<string, string> = {
            'page': pageId.toString()
        };
        return this.get( `${this.singleUserEndPoint}`, pageQryParam,  {} )
            .then( ( res )=> {
                return plainToInstance( UsersList, res.body );
            });
    }
}

