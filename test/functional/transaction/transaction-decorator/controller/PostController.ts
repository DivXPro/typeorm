import {Transaction} from "../../../../../src/decorator/transaction/Transaction";
import {Post} from "../entity/Post";
import {EntityManager} from "../../../../../src/entity-manager/EntityManager";
import {TransactionManager} from "../../../../../src/decorator/transaction/TransactionManager";
import {Category} from "../entity/Category";

export class PostController {

    @Transaction("mysql") // "mysql" is a connection name. you can not pass it if you are using default connection.
    async save(post: Post, category: Category, @TransactionManager() entityManager: EntityManager) {
        await entityManager.save(post);
        await entityManager.save(category);
    }

    // this save is not wrapped into the transaction
    async nonSafeSave(entityManager: EntityManager, post: Post, category: Category) {
        await entityManager.save(post);
        await entityManager.save(category);
    }

}