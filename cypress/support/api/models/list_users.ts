import { UserData, Support } from "./single_user";
import { Exposed } from "class-transform";

export class UsersList{
    page = Exposed.number();
    perPage = Exposed.alias( 'per_page' ).number(6);
    total = Exposed.number();
    totalPages = Exposed.alias( 'total_pages' ).number();
    data = Exposed.structs( UserData  );
    support = Exposed.struct( Support );

}