import {Exposed} from 'class-transform';

export class UserData{
    id = Exposed.number();
    email = Exposed.string();
    fName = Exposed.alias('first_name').string();
    lName = Exposed.alias('last_name').string();
    avatar = Exposed.string();

}

export class Support{
    url = Exposed.string();
    text = Exposed.string();
}

export class SingleUser{
    data = Exposed.struct( UserData );
    support = Exposed.struct( Support );
}
