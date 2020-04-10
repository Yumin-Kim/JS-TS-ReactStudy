import { Model, DataTypes } from "sequelize";
import {sequelize} from './sequelize';
import { dbType } from ".";

class Image extends Model{
    public readonly id! : number;
    public src! : number;
    public readonly createdAt! : number;
    public readonly updatedAt! : number;
}


Image.init({
    src:{
        type:DataTypes.STRING(200),
        allowNull:false,
    }
},{
    sequelize,
    tableName:'image',
    modelName:"Image",
    charset:'utf8',
    collate:'utf8_general_ci'
})

export const associate = (db:dbType) =>{

}

export default Image;