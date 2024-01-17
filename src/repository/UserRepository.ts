import {User} from "../entity/User";

export default class UserRepository {
    findById = async (id: number) => {
        return await User.createQueryBuilder('user')
            .where('user.id = :id', {id})
            .getOne();
    }

    findByEmail = async (email: string) => {
        return await User.createQueryBuilder('user')
            .where('user.email = :email', {email})
            .getOne();
    }
}