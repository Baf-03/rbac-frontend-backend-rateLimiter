import { User } from 'src/user/entities/users.entity';
import { DataSourceOptions} from 'typeorm';


export const pgConfig:DataSourceOptions={
    url:"postgresql://neondb_owner:X9xkyRvA8Fes@ep-fancy-meadow-a8o987bc.eastus2.azure.neon.tech/neondb?sslmode=require",
    type:"postgres",
    entities:[User],
    synchronize:true,
    logging:true
}