
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model Bid
 * 
 */
export type Bid = $Result.DefaultSelection<Prisma.$BidPayload>
/**
 * Model Deliverable
 * 
 */
export type Deliverable = $Result.DefaultSelection<Prisma.$DeliverablePayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>
/**
 * Model Dispute
 * 
 */
export type Dispute = $Result.DefaultSelection<Prisma.$DisputePayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bid`: Exposes CRUD operations for the **Bid** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bids
    * const bids = await prisma.bid.findMany()
    * ```
    */
  get bid(): Prisma.BidDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.deliverable`: Exposes CRUD operations for the **Deliverable** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Deliverables
    * const deliverables = await prisma.deliverable.findMany()
    * ```
    */
  get deliverable(): Prisma.DeliverableDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dispute`: Exposes CRUD operations for the **Dispute** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Disputes
    * const disputes = await prisma.dispute.findMany()
    * ```
    */
  get dispute(): Prisma.DisputeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Task: 'Task',
    Bid: 'Bid',
    Deliverable: 'Deliverable',
    Review: 'Review',
    Dispute: 'Dispute',
    Message: 'Message'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "task" | "bid" | "deliverable" | "review" | "dispute" | "message"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      Bid: {
        payload: Prisma.$BidPayload<ExtArgs>
        fields: Prisma.BidFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BidFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BidFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPayload>
          }
          findFirst: {
            args: Prisma.BidFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BidFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPayload>
          }
          findMany: {
            args: Prisma.BidFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPayload>[]
          }
          create: {
            args: Prisma.BidCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPayload>
          }
          createMany: {
            args: Prisma.BidCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BidCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPayload>[]
          }
          delete: {
            args: Prisma.BidDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPayload>
          }
          update: {
            args: Prisma.BidUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPayload>
          }
          deleteMany: {
            args: Prisma.BidDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BidUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BidUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPayload>[]
          }
          upsert: {
            args: Prisma.BidUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPayload>
          }
          aggregate: {
            args: Prisma.BidAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBid>
          }
          groupBy: {
            args: Prisma.BidGroupByArgs<ExtArgs>
            result: $Utils.Optional<BidGroupByOutputType>[]
          }
          count: {
            args: Prisma.BidCountArgs<ExtArgs>
            result: $Utils.Optional<BidCountAggregateOutputType> | number
          }
        }
      }
      Deliverable: {
        payload: Prisma.$DeliverablePayload<ExtArgs>
        fields: Prisma.DeliverableFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeliverableFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliverablePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeliverableFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliverablePayload>
          }
          findFirst: {
            args: Prisma.DeliverableFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliverablePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeliverableFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliverablePayload>
          }
          findMany: {
            args: Prisma.DeliverableFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliverablePayload>[]
          }
          create: {
            args: Prisma.DeliverableCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliverablePayload>
          }
          createMany: {
            args: Prisma.DeliverableCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeliverableCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliverablePayload>[]
          }
          delete: {
            args: Prisma.DeliverableDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliverablePayload>
          }
          update: {
            args: Prisma.DeliverableUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliverablePayload>
          }
          deleteMany: {
            args: Prisma.DeliverableDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeliverableUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeliverableUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliverablePayload>[]
          }
          upsert: {
            args: Prisma.DeliverableUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliverablePayload>
          }
          aggregate: {
            args: Prisma.DeliverableAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeliverable>
          }
          groupBy: {
            args: Prisma.DeliverableGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeliverableGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeliverableCountArgs<ExtArgs>
            result: $Utils.Optional<DeliverableCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      Dispute: {
        payload: Prisma.$DisputePayload<ExtArgs>
        fields: Prisma.DisputeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DisputeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DisputeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>
          }
          findFirst: {
            args: Prisma.DisputeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DisputeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>
          }
          findMany: {
            args: Prisma.DisputeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>[]
          }
          create: {
            args: Prisma.DisputeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>
          }
          createMany: {
            args: Prisma.DisputeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DisputeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>[]
          }
          delete: {
            args: Prisma.DisputeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>
          }
          update: {
            args: Prisma.DisputeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>
          }
          deleteMany: {
            args: Prisma.DisputeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DisputeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DisputeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>[]
          }
          upsert: {
            args: Prisma.DisputeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>
          }
          aggregate: {
            args: Prisma.DisputeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDispute>
          }
          groupBy: {
            args: Prisma.DisputeGroupByArgs<ExtArgs>
            result: $Utils.Optional<DisputeGroupByOutputType>[]
          }
          count: {
            args: Prisma.DisputeCountArgs<ExtArgs>
            result: $Utils.Optional<DisputeCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    task?: TaskOmit
    bid?: BidOmit
    deliverable?: DeliverableOmit
    review?: ReviewOmit
    dispute?: DisputeOmit
    message?: MessageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    postedTasks: number
    bids: number
    deliverables: number
    sentMessages: number
    givenReviews: number
    receivedReviews: number
    initiatedDisputes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    postedTasks?: boolean | UserCountOutputTypeCountPostedTasksArgs
    bids?: boolean | UserCountOutputTypeCountBidsArgs
    deliverables?: boolean | UserCountOutputTypeCountDeliverablesArgs
    sentMessages?: boolean | UserCountOutputTypeCountSentMessagesArgs
    givenReviews?: boolean | UserCountOutputTypeCountGivenReviewsArgs
    receivedReviews?: boolean | UserCountOutputTypeCountReceivedReviewsArgs
    initiatedDisputes?: boolean | UserCountOutputTypeCountInitiatedDisputesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPostedTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBidsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BidWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDeliverablesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeliverableWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGivenReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceivedReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInitiatedDisputesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisputeWhereInput
  }


  /**
   * Count Type TaskCountOutputType
   */

  export type TaskCountOutputType = {
    bids: number
    deliverables: number
    reviews: number
    disputes: number
    messages: number
  }

  export type TaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bids?: boolean | TaskCountOutputTypeCountBidsArgs
    deliverables?: boolean | TaskCountOutputTypeCountDeliverablesArgs
    reviews?: boolean | TaskCountOutputTypeCountReviewsArgs
    disputes?: boolean | TaskCountOutputTypeCountDisputesArgs
    messages?: boolean | TaskCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCountOutputType
     */
    select?: TaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountBidsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BidWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountDeliverablesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeliverableWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountDisputesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisputeWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    rating: number | null
    completedTasks: number | null
    totalEarnings: number | null
    onTimeRate: number | null
  }

  export type UserSumAggregateOutputType = {
    rating: number | null
    completedTasks: number | null
    totalEarnings: number | null
    onTimeRate: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    avatar: string | null
    bio: string | null
    role: string | null
    rating: number | null
    completedTasks: number | null
    totalEarnings: number | null
    onTimeRate: number | null
    createdAt: Date | null
    updatedAt: Date | null
    resetToken: string | null
    resetTokenExpiry: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    avatar: string | null
    bio: string | null
    role: string | null
    rating: number | null
    completedTasks: number | null
    totalEarnings: number | null
    onTimeRate: number | null
    createdAt: Date | null
    updatedAt: Date | null
    resetToken: string | null
    resetTokenExpiry: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    avatar: number
    bio: number
    role: number
    rating: number
    completedTasks: number
    totalEarnings: number
    onTimeRate: number
    createdAt: number
    updatedAt: number
    resetToken: number
    resetTokenExpiry: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    rating?: true
    completedTasks?: true
    totalEarnings?: true
    onTimeRate?: true
  }

  export type UserSumAggregateInputType = {
    rating?: true
    completedTasks?: true
    totalEarnings?: true
    onTimeRate?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    avatar?: true
    bio?: true
    role?: true
    rating?: true
    completedTasks?: true
    totalEarnings?: true
    onTimeRate?: true
    createdAt?: true
    updatedAt?: true
    resetToken?: true
    resetTokenExpiry?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    avatar?: true
    bio?: true
    role?: true
    rating?: true
    completedTasks?: true
    totalEarnings?: true
    onTimeRate?: true
    createdAt?: true
    updatedAt?: true
    resetToken?: true
    resetTokenExpiry?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    avatar?: true
    bio?: true
    role?: true
    rating?: true
    completedTasks?: true
    totalEarnings?: true
    onTimeRate?: true
    createdAt?: true
    updatedAt?: true
    resetToken?: true
    resetTokenExpiry?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    password: string
    avatar: string | null
    bio: string | null
    role: string
    rating: number
    completedTasks: number
    totalEarnings: number
    onTimeRate: number
    createdAt: Date
    updatedAt: Date
    resetToken: string | null
    resetTokenExpiry: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    avatar?: boolean
    bio?: boolean
    role?: boolean
    rating?: boolean
    completedTasks?: boolean
    totalEarnings?: boolean
    onTimeRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    postedTasks?: boolean | User$postedTasksArgs<ExtArgs>
    bids?: boolean | User$bidsArgs<ExtArgs>
    deliverables?: boolean | User$deliverablesArgs<ExtArgs>
    sentMessages?: boolean | User$sentMessagesArgs<ExtArgs>
    givenReviews?: boolean | User$givenReviewsArgs<ExtArgs>
    receivedReviews?: boolean | User$receivedReviewsArgs<ExtArgs>
    initiatedDisputes?: boolean | User$initiatedDisputesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    avatar?: boolean
    bio?: boolean
    role?: boolean
    rating?: boolean
    completedTasks?: boolean
    totalEarnings?: boolean
    onTimeRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    avatar?: boolean
    bio?: boolean
    role?: boolean
    rating?: boolean
    completedTasks?: boolean
    totalEarnings?: boolean
    onTimeRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    avatar?: boolean
    bio?: boolean
    role?: boolean
    rating?: boolean
    completedTasks?: boolean
    totalEarnings?: boolean
    onTimeRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "avatar" | "bio" | "role" | "rating" | "completedTasks" | "totalEarnings" | "onTimeRate" | "createdAt" | "updatedAt" | "resetToken" | "resetTokenExpiry", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    postedTasks?: boolean | User$postedTasksArgs<ExtArgs>
    bids?: boolean | User$bidsArgs<ExtArgs>
    deliverables?: boolean | User$deliverablesArgs<ExtArgs>
    sentMessages?: boolean | User$sentMessagesArgs<ExtArgs>
    givenReviews?: boolean | User$givenReviewsArgs<ExtArgs>
    receivedReviews?: boolean | User$receivedReviewsArgs<ExtArgs>
    initiatedDisputes?: boolean | User$initiatedDisputesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      postedTasks: Prisma.$TaskPayload<ExtArgs>[]
      bids: Prisma.$BidPayload<ExtArgs>[]
      deliverables: Prisma.$DeliverablePayload<ExtArgs>[]
      sentMessages: Prisma.$MessagePayload<ExtArgs>[]
      givenReviews: Prisma.$ReviewPayload<ExtArgs>[]
      receivedReviews: Prisma.$ReviewPayload<ExtArgs>[]
      initiatedDisputes: Prisma.$DisputePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      password: string
      avatar: string | null
      bio: string | null
      role: string
      rating: number
      completedTasks: number
      totalEarnings: number
      onTimeRate: number
      createdAt: Date
      updatedAt: Date
      resetToken: string | null
      resetTokenExpiry: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    postedTasks<T extends User$postedTasksArgs<ExtArgs> = {}>(args?: Subset<T, User$postedTasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bids<T extends User$bidsArgs<ExtArgs> = {}>(args?: Subset<T, User$bidsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    deliverables<T extends User$deliverablesArgs<ExtArgs> = {}>(args?: Subset<T, User$deliverablesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliverablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sentMessages<T extends User$sentMessagesArgs<ExtArgs> = {}>(args?: Subset<T, User$sentMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    givenReviews<T extends User$givenReviewsArgs<ExtArgs> = {}>(args?: Subset<T, User$givenReviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    receivedReviews<T extends User$receivedReviewsArgs<ExtArgs> = {}>(args?: Subset<T, User$receivedReviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    initiatedDisputes<T extends User$initiatedDisputesArgs<ExtArgs> = {}>(args?: Subset<T, User$initiatedDisputesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly bio: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly rating: FieldRef<"User", 'Float'>
    readonly completedTasks: FieldRef<"User", 'Int'>
    readonly totalEarnings: FieldRef<"User", 'Float'>
    readonly onTimeRate: FieldRef<"User", 'Float'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly resetToken: FieldRef<"User", 'String'>
    readonly resetTokenExpiry: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.postedTasks
   */
  export type User$postedTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.bids
   */
  export type User$bidsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
    where?: BidWhereInput
    orderBy?: BidOrderByWithRelationInput | BidOrderByWithRelationInput[]
    cursor?: BidWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BidScalarFieldEnum | BidScalarFieldEnum[]
  }

  /**
   * User.deliverables
   */
  export type User$deliverablesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deliverable
     */
    select?: DeliverableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deliverable
     */
    omit?: DeliverableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliverableInclude<ExtArgs> | null
    where?: DeliverableWhereInput
    orderBy?: DeliverableOrderByWithRelationInput | DeliverableOrderByWithRelationInput[]
    cursor?: DeliverableWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeliverableScalarFieldEnum | DeliverableScalarFieldEnum[]
  }

  /**
   * User.sentMessages
   */
  export type User$sentMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User.givenReviews
   */
  export type User$givenReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * User.receivedReviews
   */
  export type User$receivedReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * User.initiatedDisputes
   */
  export type User$initiatedDisputesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    where?: DisputeWhereInput
    orderBy?: DisputeOrderByWithRelationInput | DisputeOrderByWithRelationInput[]
    cursor?: DisputeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DisputeScalarFieldEnum | DisputeScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    budgetMin: number | null
    budgetMax: number | null
    revisionCount: number | null
    platformFee: number | null
  }

  export type TaskSumAggregateOutputType = {
    budgetMin: number | null
    budgetMax: number | null
    revisionCount: number | null
    platformFee: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    posterId: string | null
    title: string | null
    description: string | null
    category: string | null
    academicLevel: string | null
    budgetMin: number | null
    budgetMax: number | null
    deadline: Date | null
    status: string | null
    acceptedBidId: string | null
    revisionCount: number | null
    platformFee: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    posterId: string | null
    title: string | null
    description: string | null
    category: string | null
    academicLevel: string | null
    budgetMin: number | null
    budgetMax: number | null
    deadline: Date | null
    status: string | null
    acceptedBidId: string | null
    revisionCount: number | null
    platformFee: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    posterId: number
    title: number
    description: number
    category: number
    academicLevel: number
    budgetMin: number
    budgetMax: number
    deadline: number
    status: number
    acceptedBidId: number
    revisionCount: number
    platformFee: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    budgetMin?: true
    budgetMax?: true
    revisionCount?: true
    platformFee?: true
  }

  export type TaskSumAggregateInputType = {
    budgetMin?: true
    budgetMax?: true
    revisionCount?: true
    platformFee?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    posterId?: true
    title?: true
    description?: true
    category?: true
    academicLevel?: true
    budgetMin?: true
    budgetMax?: true
    deadline?: true
    status?: true
    acceptedBidId?: true
    revisionCount?: true
    platformFee?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    posterId?: true
    title?: true
    description?: true
    category?: true
    academicLevel?: true
    budgetMin?: true
    budgetMax?: true
    deadline?: true
    status?: true
    acceptedBidId?: true
    revisionCount?: true
    platformFee?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    posterId?: true
    title?: true
    description?: true
    category?: true
    academicLevel?: true
    budgetMin?: true
    budgetMax?: true
    deadline?: true
    status?: true
    acceptedBidId?: true
    revisionCount?: true
    platformFee?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    posterId: string
    title: string
    description: string
    category: string
    academicLevel: string
    budgetMin: number
    budgetMax: number
    deadline: Date
    status: string
    acceptedBidId: string | null
    revisionCount: number
    platformFee: number
    createdAt: Date
    updatedAt: Date
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    posterId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    academicLevel?: boolean
    budgetMin?: boolean
    budgetMax?: boolean
    deadline?: boolean
    status?: boolean
    acceptedBidId?: boolean
    revisionCount?: boolean
    platformFee?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    poster?: boolean | UserDefaultArgs<ExtArgs>
    acceptedBid?: boolean | Task$acceptedBidArgs<ExtArgs>
    bids?: boolean | Task$bidsArgs<ExtArgs>
    deliverables?: boolean | Task$deliverablesArgs<ExtArgs>
    reviews?: boolean | Task$reviewsArgs<ExtArgs>
    disputes?: boolean | Task$disputesArgs<ExtArgs>
    messages?: boolean | Task$messagesArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    posterId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    academicLevel?: boolean
    budgetMin?: boolean
    budgetMax?: boolean
    deadline?: boolean
    status?: boolean
    acceptedBidId?: boolean
    revisionCount?: boolean
    platformFee?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    poster?: boolean | UserDefaultArgs<ExtArgs>
    acceptedBid?: boolean | Task$acceptedBidArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    posterId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    academicLevel?: boolean
    budgetMin?: boolean
    budgetMax?: boolean
    deadline?: boolean
    status?: boolean
    acceptedBidId?: boolean
    revisionCount?: boolean
    platformFee?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    poster?: boolean | UserDefaultArgs<ExtArgs>
    acceptedBid?: boolean | Task$acceptedBidArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    posterId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    academicLevel?: boolean
    budgetMin?: boolean
    budgetMax?: boolean
    deadline?: boolean
    status?: boolean
    acceptedBidId?: boolean
    revisionCount?: boolean
    platformFee?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "posterId" | "title" | "description" | "category" | "academicLevel" | "budgetMin" | "budgetMax" | "deadline" | "status" | "acceptedBidId" | "revisionCount" | "platformFee" | "createdAt" | "updatedAt", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    poster?: boolean | UserDefaultArgs<ExtArgs>
    acceptedBid?: boolean | Task$acceptedBidArgs<ExtArgs>
    bids?: boolean | Task$bidsArgs<ExtArgs>
    deliverables?: boolean | Task$deliverablesArgs<ExtArgs>
    reviews?: boolean | Task$reviewsArgs<ExtArgs>
    disputes?: boolean | Task$disputesArgs<ExtArgs>
    messages?: boolean | Task$messagesArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    poster?: boolean | UserDefaultArgs<ExtArgs>
    acceptedBid?: boolean | Task$acceptedBidArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    poster?: boolean | UserDefaultArgs<ExtArgs>
    acceptedBid?: boolean | Task$acceptedBidArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      poster: Prisma.$UserPayload<ExtArgs>
      acceptedBid: Prisma.$BidPayload<ExtArgs> | null
      bids: Prisma.$BidPayload<ExtArgs>[]
      deliverables: Prisma.$DeliverablePayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
      disputes: Prisma.$DisputePayload<ExtArgs>[]
      messages: Prisma.$MessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      posterId: string
      title: string
      description: string
      category: string
      academicLevel: string
      budgetMin: number
      budgetMax: number
      deadline: Date
      status: string
      acceptedBidId: string | null
      revisionCount: number
      platformFee: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    poster<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    acceptedBid<T extends Task$acceptedBidArgs<ExtArgs> = {}>(args?: Subset<T, Task$acceptedBidArgs<ExtArgs>>): Prisma__BidClient<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    bids<T extends Task$bidsArgs<ExtArgs> = {}>(args?: Subset<T, Task$bidsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    deliverables<T extends Task$deliverablesArgs<ExtArgs> = {}>(args?: Subset<T, Task$deliverablesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliverablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends Task$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Task$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    disputes<T extends Task$disputesArgs<ExtArgs> = {}>(args?: Subset<T, Task$disputesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages<T extends Task$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Task$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly posterId: FieldRef<"Task", 'String'>
    readonly title: FieldRef<"Task", 'String'>
    readonly description: FieldRef<"Task", 'String'>
    readonly category: FieldRef<"Task", 'String'>
    readonly academicLevel: FieldRef<"Task", 'String'>
    readonly budgetMin: FieldRef<"Task", 'Float'>
    readonly budgetMax: FieldRef<"Task", 'Float'>
    readonly deadline: FieldRef<"Task", 'DateTime'>
    readonly status: FieldRef<"Task", 'String'>
    readonly acceptedBidId: FieldRef<"Task", 'String'>
    readonly revisionCount: FieldRef<"Task", 'Int'>
    readonly platformFee: FieldRef<"Task", 'Float'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly updatedAt: FieldRef<"Task", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task.acceptedBid
   */
  export type Task$acceptedBidArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
    where?: BidWhereInput
  }

  /**
   * Task.bids
   */
  export type Task$bidsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
    where?: BidWhereInput
    orderBy?: BidOrderByWithRelationInput | BidOrderByWithRelationInput[]
    cursor?: BidWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BidScalarFieldEnum | BidScalarFieldEnum[]
  }

  /**
   * Task.deliverables
   */
  export type Task$deliverablesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deliverable
     */
    select?: DeliverableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deliverable
     */
    omit?: DeliverableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliverableInclude<ExtArgs> | null
    where?: DeliverableWhereInput
    orderBy?: DeliverableOrderByWithRelationInput | DeliverableOrderByWithRelationInput[]
    cursor?: DeliverableWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeliverableScalarFieldEnum | DeliverableScalarFieldEnum[]
  }

  /**
   * Task.reviews
   */
  export type Task$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Task.disputes
   */
  export type Task$disputesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    where?: DisputeWhereInput
    orderBy?: DisputeOrderByWithRelationInput | DisputeOrderByWithRelationInput[]
    cursor?: DisputeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DisputeScalarFieldEnum | DisputeScalarFieldEnum[]
  }

  /**
   * Task.messages
   */
  export type Task$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model Bid
   */

  export type AggregateBid = {
    _count: BidCountAggregateOutputType | null
    _avg: BidAvgAggregateOutputType | null
    _sum: BidSumAggregateOutputType | null
    _min: BidMinAggregateOutputType | null
    _max: BidMaxAggregateOutputType | null
  }

  export type BidAvgAggregateOutputType = {
    proposedPrice: number | null
    deliveryDays: number | null
  }

  export type BidSumAggregateOutputType = {
    proposedPrice: number | null
    deliveryDays: number | null
  }

  export type BidMinAggregateOutputType = {
    id: string | null
    taskId: string | null
    solverId: string | null
    proposedPrice: number | null
    deliveryDays: number | null
    message: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BidMaxAggregateOutputType = {
    id: string | null
    taskId: string | null
    solverId: string | null
    proposedPrice: number | null
    deliveryDays: number | null
    message: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BidCountAggregateOutputType = {
    id: number
    taskId: number
    solverId: number
    proposedPrice: number
    deliveryDays: number
    message: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BidAvgAggregateInputType = {
    proposedPrice?: true
    deliveryDays?: true
  }

  export type BidSumAggregateInputType = {
    proposedPrice?: true
    deliveryDays?: true
  }

  export type BidMinAggregateInputType = {
    id?: true
    taskId?: true
    solverId?: true
    proposedPrice?: true
    deliveryDays?: true
    message?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BidMaxAggregateInputType = {
    id?: true
    taskId?: true
    solverId?: true
    proposedPrice?: true
    deliveryDays?: true
    message?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BidCountAggregateInputType = {
    id?: true
    taskId?: true
    solverId?: true
    proposedPrice?: true
    deliveryDays?: true
    message?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BidAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bid to aggregate.
     */
    where?: BidWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bids to fetch.
     */
    orderBy?: BidOrderByWithRelationInput | BidOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BidWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bids from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bids.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bids
    **/
    _count?: true | BidCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BidAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BidSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BidMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BidMaxAggregateInputType
  }

  export type GetBidAggregateType<T extends BidAggregateArgs> = {
        [P in keyof T & keyof AggregateBid]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBid[P]>
      : GetScalarType<T[P], AggregateBid[P]>
  }




  export type BidGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BidWhereInput
    orderBy?: BidOrderByWithAggregationInput | BidOrderByWithAggregationInput[]
    by: BidScalarFieldEnum[] | BidScalarFieldEnum
    having?: BidScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BidCountAggregateInputType | true
    _avg?: BidAvgAggregateInputType
    _sum?: BidSumAggregateInputType
    _min?: BidMinAggregateInputType
    _max?: BidMaxAggregateInputType
  }

  export type BidGroupByOutputType = {
    id: string
    taskId: string
    solverId: string
    proposedPrice: number
    deliveryDays: number
    message: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: BidCountAggregateOutputType | null
    _avg: BidAvgAggregateOutputType | null
    _sum: BidSumAggregateOutputType | null
    _min: BidMinAggregateOutputType | null
    _max: BidMaxAggregateOutputType | null
  }

  type GetBidGroupByPayload<T extends BidGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BidGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BidGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BidGroupByOutputType[P]>
            : GetScalarType<T[P], BidGroupByOutputType[P]>
        }
      >
    >


  export type BidSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    solverId?: boolean
    proposedPrice?: boolean
    deliveryDays?: boolean
    message?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    solver?: boolean | UserDefaultArgs<ExtArgs>
    acceptedTask?: boolean | Bid$acceptedTaskArgs<ExtArgs>
  }, ExtArgs["result"]["bid"]>

  export type BidSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    solverId?: boolean
    proposedPrice?: boolean
    deliveryDays?: boolean
    message?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    solver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bid"]>

  export type BidSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    solverId?: boolean
    proposedPrice?: boolean
    deliveryDays?: boolean
    message?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    solver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bid"]>

  export type BidSelectScalar = {
    id?: boolean
    taskId?: boolean
    solverId?: boolean
    proposedPrice?: boolean
    deliveryDays?: boolean
    message?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BidOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "solverId" | "proposedPrice" | "deliveryDays" | "message" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["bid"]>
  export type BidInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    solver?: boolean | UserDefaultArgs<ExtArgs>
    acceptedTask?: boolean | Bid$acceptedTaskArgs<ExtArgs>
  }
  export type BidIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    solver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BidIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    solver?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BidPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bid"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      solver: Prisma.$UserPayload<ExtArgs>
      acceptedTask: Prisma.$TaskPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      taskId: string
      solverId: string
      proposedPrice: number
      deliveryDays: number
      message: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bid"]>
    composites: {}
  }

  type BidGetPayload<S extends boolean | null | undefined | BidDefaultArgs> = $Result.GetResult<Prisma.$BidPayload, S>

  type BidCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BidFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BidCountAggregateInputType | true
    }

  export interface BidDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bid'], meta: { name: 'Bid' } }
    /**
     * Find zero or one Bid that matches the filter.
     * @param {BidFindUniqueArgs} args - Arguments to find a Bid
     * @example
     * // Get one Bid
     * const bid = await prisma.bid.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BidFindUniqueArgs>(args: SelectSubset<T, BidFindUniqueArgs<ExtArgs>>): Prisma__BidClient<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bid that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BidFindUniqueOrThrowArgs} args - Arguments to find a Bid
     * @example
     * // Get one Bid
     * const bid = await prisma.bid.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BidFindUniqueOrThrowArgs>(args: SelectSubset<T, BidFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BidClient<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bid that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidFindFirstArgs} args - Arguments to find a Bid
     * @example
     * // Get one Bid
     * const bid = await prisma.bid.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BidFindFirstArgs>(args?: SelectSubset<T, BidFindFirstArgs<ExtArgs>>): Prisma__BidClient<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bid that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidFindFirstOrThrowArgs} args - Arguments to find a Bid
     * @example
     * // Get one Bid
     * const bid = await prisma.bid.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BidFindFirstOrThrowArgs>(args?: SelectSubset<T, BidFindFirstOrThrowArgs<ExtArgs>>): Prisma__BidClient<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bids that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bids
     * const bids = await prisma.bid.findMany()
     * 
     * // Get first 10 Bids
     * const bids = await prisma.bid.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bidWithIdOnly = await prisma.bid.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BidFindManyArgs>(args?: SelectSubset<T, BidFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bid.
     * @param {BidCreateArgs} args - Arguments to create a Bid.
     * @example
     * // Create one Bid
     * const Bid = await prisma.bid.create({
     *   data: {
     *     // ... data to create a Bid
     *   }
     * })
     * 
     */
    create<T extends BidCreateArgs>(args: SelectSubset<T, BidCreateArgs<ExtArgs>>): Prisma__BidClient<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bids.
     * @param {BidCreateManyArgs} args - Arguments to create many Bids.
     * @example
     * // Create many Bids
     * const bid = await prisma.bid.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BidCreateManyArgs>(args?: SelectSubset<T, BidCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bids and returns the data saved in the database.
     * @param {BidCreateManyAndReturnArgs} args - Arguments to create many Bids.
     * @example
     * // Create many Bids
     * const bid = await prisma.bid.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bids and only return the `id`
     * const bidWithIdOnly = await prisma.bid.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BidCreateManyAndReturnArgs>(args?: SelectSubset<T, BidCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bid.
     * @param {BidDeleteArgs} args - Arguments to delete one Bid.
     * @example
     * // Delete one Bid
     * const Bid = await prisma.bid.delete({
     *   where: {
     *     // ... filter to delete one Bid
     *   }
     * })
     * 
     */
    delete<T extends BidDeleteArgs>(args: SelectSubset<T, BidDeleteArgs<ExtArgs>>): Prisma__BidClient<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bid.
     * @param {BidUpdateArgs} args - Arguments to update one Bid.
     * @example
     * // Update one Bid
     * const bid = await prisma.bid.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BidUpdateArgs>(args: SelectSubset<T, BidUpdateArgs<ExtArgs>>): Prisma__BidClient<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bids.
     * @param {BidDeleteManyArgs} args - Arguments to filter Bids to delete.
     * @example
     * // Delete a few Bids
     * const { count } = await prisma.bid.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BidDeleteManyArgs>(args?: SelectSubset<T, BidDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bids.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bids
     * const bid = await prisma.bid.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BidUpdateManyArgs>(args: SelectSubset<T, BidUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bids and returns the data updated in the database.
     * @param {BidUpdateManyAndReturnArgs} args - Arguments to update many Bids.
     * @example
     * // Update many Bids
     * const bid = await prisma.bid.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bids and only return the `id`
     * const bidWithIdOnly = await prisma.bid.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BidUpdateManyAndReturnArgs>(args: SelectSubset<T, BidUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bid.
     * @param {BidUpsertArgs} args - Arguments to update or create a Bid.
     * @example
     * // Update or create a Bid
     * const bid = await prisma.bid.upsert({
     *   create: {
     *     // ... data to create a Bid
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bid we want to update
     *   }
     * })
     */
    upsert<T extends BidUpsertArgs>(args: SelectSubset<T, BidUpsertArgs<ExtArgs>>): Prisma__BidClient<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bids.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidCountArgs} args - Arguments to filter Bids to count.
     * @example
     * // Count the number of Bids
     * const count = await prisma.bid.count({
     *   where: {
     *     // ... the filter for the Bids we want to count
     *   }
     * })
    **/
    count<T extends BidCountArgs>(
      args?: Subset<T, BidCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BidCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bid.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BidAggregateArgs>(args: Subset<T, BidAggregateArgs>): Prisma.PrismaPromise<GetBidAggregateType<T>>

    /**
     * Group by Bid.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BidGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BidGroupByArgs['orderBy'] }
        : { orderBy?: BidGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BidGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBidGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bid model
   */
  readonly fields: BidFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bid.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BidClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    solver<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    acceptedTask<T extends Bid$acceptedTaskArgs<ExtArgs> = {}>(args?: Subset<T, Bid$acceptedTaskArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Bid model
   */
  interface BidFieldRefs {
    readonly id: FieldRef<"Bid", 'String'>
    readonly taskId: FieldRef<"Bid", 'String'>
    readonly solverId: FieldRef<"Bid", 'String'>
    readonly proposedPrice: FieldRef<"Bid", 'Float'>
    readonly deliveryDays: FieldRef<"Bid", 'Int'>
    readonly message: FieldRef<"Bid", 'String'>
    readonly status: FieldRef<"Bid", 'String'>
    readonly createdAt: FieldRef<"Bid", 'DateTime'>
    readonly updatedAt: FieldRef<"Bid", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Bid findUnique
   */
  export type BidFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
    /**
     * Filter, which Bid to fetch.
     */
    where: BidWhereUniqueInput
  }

  /**
   * Bid findUniqueOrThrow
   */
  export type BidFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
    /**
     * Filter, which Bid to fetch.
     */
    where: BidWhereUniqueInput
  }

  /**
   * Bid findFirst
   */
  export type BidFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
    /**
     * Filter, which Bid to fetch.
     */
    where?: BidWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bids to fetch.
     */
    orderBy?: BidOrderByWithRelationInput | BidOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bids.
     */
    cursor?: BidWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bids from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bids.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bids.
     */
    distinct?: BidScalarFieldEnum | BidScalarFieldEnum[]
  }

  /**
   * Bid findFirstOrThrow
   */
  export type BidFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
    /**
     * Filter, which Bid to fetch.
     */
    where?: BidWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bids to fetch.
     */
    orderBy?: BidOrderByWithRelationInput | BidOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bids.
     */
    cursor?: BidWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bids from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bids.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bids.
     */
    distinct?: BidScalarFieldEnum | BidScalarFieldEnum[]
  }

  /**
   * Bid findMany
   */
  export type BidFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
    /**
     * Filter, which Bids to fetch.
     */
    where?: BidWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bids to fetch.
     */
    orderBy?: BidOrderByWithRelationInput | BidOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bids.
     */
    cursor?: BidWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bids from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bids.
     */
    skip?: number
    distinct?: BidScalarFieldEnum | BidScalarFieldEnum[]
  }

  /**
   * Bid create
   */
  export type BidCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
    /**
     * The data needed to create a Bid.
     */
    data: XOR<BidCreateInput, BidUncheckedCreateInput>
  }

  /**
   * Bid createMany
   */
  export type BidCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bids.
     */
    data: BidCreateManyInput | BidCreateManyInput[]
  }

  /**
   * Bid createManyAndReturn
   */
  export type BidCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * The data used to create many Bids.
     */
    data: BidCreateManyInput | BidCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bid update
   */
  export type BidUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
    /**
     * The data needed to update a Bid.
     */
    data: XOR<BidUpdateInput, BidUncheckedUpdateInput>
    /**
     * Choose, which Bid to update.
     */
    where: BidWhereUniqueInput
  }

  /**
   * Bid updateMany
   */
  export type BidUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bids.
     */
    data: XOR<BidUpdateManyMutationInput, BidUncheckedUpdateManyInput>
    /**
     * Filter which Bids to update
     */
    where?: BidWhereInput
    /**
     * Limit how many Bids to update.
     */
    limit?: number
  }

  /**
   * Bid updateManyAndReturn
   */
  export type BidUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * The data used to update Bids.
     */
    data: XOR<BidUpdateManyMutationInput, BidUncheckedUpdateManyInput>
    /**
     * Filter which Bids to update
     */
    where?: BidWhereInput
    /**
     * Limit how many Bids to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bid upsert
   */
  export type BidUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
    /**
     * The filter to search for the Bid to update in case it exists.
     */
    where: BidWhereUniqueInput
    /**
     * In case the Bid found by the `where` argument doesn't exist, create a new Bid with this data.
     */
    create: XOR<BidCreateInput, BidUncheckedCreateInput>
    /**
     * In case the Bid was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BidUpdateInput, BidUncheckedUpdateInput>
  }

  /**
   * Bid delete
   */
  export type BidDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
    /**
     * Filter which Bid to delete.
     */
    where: BidWhereUniqueInput
  }

  /**
   * Bid deleteMany
   */
  export type BidDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bids to delete
     */
    where?: BidWhereInput
    /**
     * Limit how many Bids to delete.
     */
    limit?: number
  }

  /**
   * Bid.acceptedTask
   */
  export type Bid$acceptedTaskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
  }

  /**
   * Bid without action
   */
  export type BidDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
  }


  /**
   * Model Deliverable
   */

  export type AggregateDeliverable = {
    _count: DeliverableCountAggregateOutputType | null
    _avg: DeliverableAvgAggregateOutputType | null
    _sum: DeliverableSumAggregateOutputType | null
    _min: DeliverableMinAggregateOutputType | null
    _max: DeliverableMaxAggregateOutputType | null
  }

  export type DeliverableAvgAggregateOutputType = {
    version: number | null
  }

  export type DeliverableSumAggregateOutputType = {
    version: number | null
  }

  export type DeliverableMinAggregateOutputType = {
    id: string | null
    taskId: string | null
    solverId: string | null
    content: string | null
    version: number | null
    status: string | null
    createdAt: Date | null
  }

  export type DeliverableMaxAggregateOutputType = {
    id: string | null
    taskId: string | null
    solverId: string | null
    content: string | null
    version: number | null
    status: string | null
    createdAt: Date | null
  }

  export type DeliverableCountAggregateOutputType = {
    id: number
    taskId: number
    solverId: number
    content: number
    version: number
    status: number
    createdAt: number
    _all: number
  }


  export type DeliverableAvgAggregateInputType = {
    version?: true
  }

  export type DeliverableSumAggregateInputType = {
    version?: true
  }

  export type DeliverableMinAggregateInputType = {
    id?: true
    taskId?: true
    solverId?: true
    content?: true
    version?: true
    status?: true
    createdAt?: true
  }

  export type DeliverableMaxAggregateInputType = {
    id?: true
    taskId?: true
    solverId?: true
    content?: true
    version?: true
    status?: true
    createdAt?: true
  }

  export type DeliverableCountAggregateInputType = {
    id?: true
    taskId?: true
    solverId?: true
    content?: true
    version?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type DeliverableAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Deliverable to aggregate.
     */
    where?: DeliverableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deliverables to fetch.
     */
    orderBy?: DeliverableOrderByWithRelationInput | DeliverableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeliverableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deliverables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deliverables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Deliverables
    **/
    _count?: true | DeliverableCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeliverableAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeliverableSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeliverableMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeliverableMaxAggregateInputType
  }

  export type GetDeliverableAggregateType<T extends DeliverableAggregateArgs> = {
        [P in keyof T & keyof AggregateDeliverable]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeliverable[P]>
      : GetScalarType<T[P], AggregateDeliverable[P]>
  }




  export type DeliverableGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeliverableWhereInput
    orderBy?: DeliverableOrderByWithAggregationInput | DeliverableOrderByWithAggregationInput[]
    by: DeliverableScalarFieldEnum[] | DeliverableScalarFieldEnum
    having?: DeliverableScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeliverableCountAggregateInputType | true
    _avg?: DeliverableAvgAggregateInputType
    _sum?: DeliverableSumAggregateInputType
    _min?: DeliverableMinAggregateInputType
    _max?: DeliverableMaxAggregateInputType
  }

  export type DeliverableGroupByOutputType = {
    id: string
    taskId: string
    solverId: string
    content: string
    version: number
    status: string
    createdAt: Date
    _count: DeliverableCountAggregateOutputType | null
    _avg: DeliverableAvgAggregateOutputType | null
    _sum: DeliverableSumAggregateOutputType | null
    _min: DeliverableMinAggregateOutputType | null
    _max: DeliverableMaxAggregateOutputType | null
  }

  type GetDeliverableGroupByPayload<T extends DeliverableGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeliverableGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeliverableGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeliverableGroupByOutputType[P]>
            : GetScalarType<T[P], DeliverableGroupByOutputType[P]>
        }
      >
    >


  export type DeliverableSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    solverId?: boolean
    content?: boolean
    version?: boolean
    status?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    solver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deliverable"]>

  export type DeliverableSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    solverId?: boolean
    content?: boolean
    version?: boolean
    status?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    solver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deliverable"]>

  export type DeliverableSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    solverId?: boolean
    content?: boolean
    version?: boolean
    status?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    solver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deliverable"]>

  export type DeliverableSelectScalar = {
    id?: boolean
    taskId?: boolean
    solverId?: boolean
    content?: boolean
    version?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type DeliverableOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "solverId" | "content" | "version" | "status" | "createdAt", ExtArgs["result"]["deliverable"]>
  export type DeliverableInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    solver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DeliverableIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    solver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DeliverableIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    solver?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DeliverablePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Deliverable"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      solver: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      taskId: string
      solverId: string
      content: string
      version: number
      status: string
      createdAt: Date
    }, ExtArgs["result"]["deliverable"]>
    composites: {}
  }

  type DeliverableGetPayload<S extends boolean | null | undefined | DeliverableDefaultArgs> = $Result.GetResult<Prisma.$DeliverablePayload, S>

  type DeliverableCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeliverableFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeliverableCountAggregateInputType | true
    }

  export interface DeliverableDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Deliverable'], meta: { name: 'Deliverable' } }
    /**
     * Find zero or one Deliverable that matches the filter.
     * @param {DeliverableFindUniqueArgs} args - Arguments to find a Deliverable
     * @example
     * // Get one Deliverable
     * const deliverable = await prisma.deliverable.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeliverableFindUniqueArgs>(args: SelectSubset<T, DeliverableFindUniqueArgs<ExtArgs>>): Prisma__DeliverableClient<$Result.GetResult<Prisma.$DeliverablePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Deliverable that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeliverableFindUniqueOrThrowArgs} args - Arguments to find a Deliverable
     * @example
     * // Get one Deliverable
     * const deliverable = await prisma.deliverable.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeliverableFindUniqueOrThrowArgs>(args: SelectSubset<T, DeliverableFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeliverableClient<$Result.GetResult<Prisma.$DeliverablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Deliverable that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliverableFindFirstArgs} args - Arguments to find a Deliverable
     * @example
     * // Get one Deliverable
     * const deliverable = await prisma.deliverable.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeliverableFindFirstArgs>(args?: SelectSubset<T, DeliverableFindFirstArgs<ExtArgs>>): Prisma__DeliverableClient<$Result.GetResult<Prisma.$DeliverablePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Deliverable that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliverableFindFirstOrThrowArgs} args - Arguments to find a Deliverable
     * @example
     * // Get one Deliverable
     * const deliverable = await prisma.deliverable.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeliverableFindFirstOrThrowArgs>(args?: SelectSubset<T, DeliverableFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeliverableClient<$Result.GetResult<Prisma.$DeliverablePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Deliverables that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliverableFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Deliverables
     * const deliverables = await prisma.deliverable.findMany()
     * 
     * // Get first 10 Deliverables
     * const deliverables = await prisma.deliverable.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deliverableWithIdOnly = await prisma.deliverable.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeliverableFindManyArgs>(args?: SelectSubset<T, DeliverableFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliverablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Deliverable.
     * @param {DeliverableCreateArgs} args - Arguments to create a Deliverable.
     * @example
     * // Create one Deliverable
     * const Deliverable = await prisma.deliverable.create({
     *   data: {
     *     // ... data to create a Deliverable
     *   }
     * })
     * 
     */
    create<T extends DeliverableCreateArgs>(args: SelectSubset<T, DeliverableCreateArgs<ExtArgs>>): Prisma__DeliverableClient<$Result.GetResult<Prisma.$DeliverablePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Deliverables.
     * @param {DeliverableCreateManyArgs} args - Arguments to create many Deliverables.
     * @example
     * // Create many Deliverables
     * const deliverable = await prisma.deliverable.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeliverableCreateManyArgs>(args?: SelectSubset<T, DeliverableCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Deliverables and returns the data saved in the database.
     * @param {DeliverableCreateManyAndReturnArgs} args - Arguments to create many Deliverables.
     * @example
     * // Create many Deliverables
     * const deliverable = await prisma.deliverable.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Deliverables and only return the `id`
     * const deliverableWithIdOnly = await prisma.deliverable.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeliverableCreateManyAndReturnArgs>(args?: SelectSubset<T, DeliverableCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliverablePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Deliverable.
     * @param {DeliverableDeleteArgs} args - Arguments to delete one Deliverable.
     * @example
     * // Delete one Deliverable
     * const Deliverable = await prisma.deliverable.delete({
     *   where: {
     *     // ... filter to delete one Deliverable
     *   }
     * })
     * 
     */
    delete<T extends DeliverableDeleteArgs>(args: SelectSubset<T, DeliverableDeleteArgs<ExtArgs>>): Prisma__DeliverableClient<$Result.GetResult<Prisma.$DeliverablePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Deliverable.
     * @param {DeliverableUpdateArgs} args - Arguments to update one Deliverable.
     * @example
     * // Update one Deliverable
     * const deliverable = await prisma.deliverable.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeliverableUpdateArgs>(args: SelectSubset<T, DeliverableUpdateArgs<ExtArgs>>): Prisma__DeliverableClient<$Result.GetResult<Prisma.$DeliverablePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Deliverables.
     * @param {DeliverableDeleteManyArgs} args - Arguments to filter Deliverables to delete.
     * @example
     * // Delete a few Deliverables
     * const { count } = await prisma.deliverable.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeliverableDeleteManyArgs>(args?: SelectSubset<T, DeliverableDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Deliverables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliverableUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Deliverables
     * const deliverable = await prisma.deliverable.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeliverableUpdateManyArgs>(args: SelectSubset<T, DeliverableUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Deliverables and returns the data updated in the database.
     * @param {DeliverableUpdateManyAndReturnArgs} args - Arguments to update many Deliverables.
     * @example
     * // Update many Deliverables
     * const deliverable = await prisma.deliverable.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Deliverables and only return the `id`
     * const deliverableWithIdOnly = await prisma.deliverable.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DeliverableUpdateManyAndReturnArgs>(args: SelectSubset<T, DeliverableUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliverablePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Deliverable.
     * @param {DeliverableUpsertArgs} args - Arguments to update or create a Deliverable.
     * @example
     * // Update or create a Deliverable
     * const deliverable = await prisma.deliverable.upsert({
     *   create: {
     *     // ... data to create a Deliverable
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Deliverable we want to update
     *   }
     * })
     */
    upsert<T extends DeliverableUpsertArgs>(args: SelectSubset<T, DeliverableUpsertArgs<ExtArgs>>): Prisma__DeliverableClient<$Result.GetResult<Prisma.$DeliverablePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Deliverables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliverableCountArgs} args - Arguments to filter Deliverables to count.
     * @example
     * // Count the number of Deliverables
     * const count = await prisma.deliverable.count({
     *   where: {
     *     // ... the filter for the Deliverables we want to count
     *   }
     * })
    **/
    count<T extends DeliverableCountArgs>(
      args?: Subset<T, DeliverableCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeliverableCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Deliverable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliverableAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeliverableAggregateArgs>(args: Subset<T, DeliverableAggregateArgs>): Prisma.PrismaPromise<GetDeliverableAggregateType<T>>

    /**
     * Group by Deliverable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliverableGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeliverableGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeliverableGroupByArgs['orderBy'] }
        : { orderBy?: DeliverableGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeliverableGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeliverableGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Deliverable model
   */
  readonly fields: DeliverableFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Deliverable.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeliverableClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    solver<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Deliverable model
   */
  interface DeliverableFieldRefs {
    readonly id: FieldRef<"Deliverable", 'String'>
    readonly taskId: FieldRef<"Deliverable", 'String'>
    readonly solverId: FieldRef<"Deliverable", 'String'>
    readonly content: FieldRef<"Deliverable", 'String'>
    readonly version: FieldRef<"Deliverable", 'Int'>
    readonly status: FieldRef<"Deliverable", 'String'>
    readonly createdAt: FieldRef<"Deliverable", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Deliverable findUnique
   */
  export type DeliverableFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deliverable
     */
    select?: DeliverableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deliverable
     */
    omit?: DeliverableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliverableInclude<ExtArgs> | null
    /**
     * Filter, which Deliverable to fetch.
     */
    where: DeliverableWhereUniqueInput
  }

  /**
   * Deliverable findUniqueOrThrow
   */
  export type DeliverableFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deliverable
     */
    select?: DeliverableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deliverable
     */
    omit?: DeliverableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliverableInclude<ExtArgs> | null
    /**
     * Filter, which Deliverable to fetch.
     */
    where: DeliverableWhereUniqueInput
  }

  /**
   * Deliverable findFirst
   */
  export type DeliverableFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deliverable
     */
    select?: DeliverableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deliverable
     */
    omit?: DeliverableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliverableInclude<ExtArgs> | null
    /**
     * Filter, which Deliverable to fetch.
     */
    where?: DeliverableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deliverables to fetch.
     */
    orderBy?: DeliverableOrderByWithRelationInput | DeliverableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deliverables.
     */
    cursor?: DeliverableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deliverables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deliverables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deliverables.
     */
    distinct?: DeliverableScalarFieldEnum | DeliverableScalarFieldEnum[]
  }

  /**
   * Deliverable findFirstOrThrow
   */
  export type DeliverableFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deliverable
     */
    select?: DeliverableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deliverable
     */
    omit?: DeliverableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliverableInclude<ExtArgs> | null
    /**
     * Filter, which Deliverable to fetch.
     */
    where?: DeliverableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deliverables to fetch.
     */
    orderBy?: DeliverableOrderByWithRelationInput | DeliverableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deliverables.
     */
    cursor?: DeliverableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deliverables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deliverables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deliverables.
     */
    distinct?: DeliverableScalarFieldEnum | DeliverableScalarFieldEnum[]
  }

  /**
   * Deliverable findMany
   */
  export type DeliverableFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deliverable
     */
    select?: DeliverableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deliverable
     */
    omit?: DeliverableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliverableInclude<ExtArgs> | null
    /**
     * Filter, which Deliverables to fetch.
     */
    where?: DeliverableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deliverables to fetch.
     */
    orderBy?: DeliverableOrderByWithRelationInput | DeliverableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Deliverables.
     */
    cursor?: DeliverableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deliverables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deliverables.
     */
    skip?: number
    distinct?: DeliverableScalarFieldEnum | DeliverableScalarFieldEnum[]
  }

  /**
   * Deliverable create
   */
  export type DeliverableCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deliverable
     */
    select?: DeliverableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deliverable
     */
    omit?: DeliverableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliverableInclude<ExtArgs> | null
    /**
     * The data needed to create a Deliverable.
     */
    data: XOR<DeliverableCreateInput, DeliverableUncheckedCreateInput>
  }

  /**
   * Deliverable createMany
   */
  export type DeliverableCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Deliverables.
     */
    data: DeliverableCreateManyInput | DeliverableCreateManyInput[]
  }

  /**
   * Deliverable createManyAndReturn
   */
  export type DeliverableCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deliverable
     */
    select?: DeliverableSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Deliverable
     */
    omit?: DeliverableOmit<ExtArgs> | null
    /**
     * The data used to create many Deliverables.
     */
    data: DeliverableCreateManyInput | DeliverableCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliverableIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Deliverable update
   */
  export type DeliverableUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deliverable
     */
    select?: DeliverableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deliverable
     */
    omit?: DeliverableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliverableInclude<ExtArgs> | null
    /**
     * The data needed to update a Deliverable.
     */
    data: XOR<DeliverableUpdateInput, DeliverableUncheckedUpdateInput>
    /**
     * Choose, which Deliverable to update.
     */
    where: DeliverableWhereUniqueInput
  }

  /**
   * Deliverable updateMany
   */
  export type DeliverableUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Deliverables.
     */
    data: XOR<DeliverableUpdateManyMutationInput, DeliverableUncheckedUpdateManyInput>
    /**
     * Filter which Deliverables to update
     */
    where?: DeliverableWhereInput
    /**
     * Limit how many Deliverables to update.
     */
    limit?: number
  }

  /**
   * Deliverable updateManyAndReturn
   */
  export type DeliverableUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deliverable
     */
    select?: DeliverableSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Deliverable
     */
    omit?: DeliverableOmit<ExtArgs> | null
    /**
     * The data used to update Deliverables.
     */
    data: XOR<DeliverableUpdateManyMutationInput, DeliverableUncheckedUpdateManyInput>
    /**
     * Filter which Deliverables to update
     */
    where?: DeliverableWhereInput
    /**
     * Limit how many Deliverables to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliverableIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Deliverable upsert
   */
  export type DeliverableUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deliverable
     */
    select?: DeliverableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deliverable
     */
    omit?: DeliverableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliverableInclude<ExtArgs> | null
    /**
     * The filter to search for the Deliverable to update in case it exists.
     */
    where: DeliverableWhereUniqueInput
    /**
     * In case the Deliverable found by the `where` argument doesn't exist, create a new Deliverable with this data.
     */
    create: XOR<DeliverableCreateInput, DeliverableUncheckedCreateInput>
    /**
     * In case the Deliverable was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeliverableUpdateInput, DeliverableUncheckedUpdateInput>
  }

  /**
   * Deliverable delete
   */
  export type DeliverableDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deliverable
     */
    select?: DeliverableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deliverable
     */
    omit?: DeliverableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliverableInclude<ExtArgs> | null
    /**
     * Filter which Deliverable to delete.
     */
    where: DeliverableWhereUniqueInput
  }

  /**
   * Deliverable deleteMany
   */
  export type DeliverableDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Deliverables to delete
     */
    where?: DeliverableWhereInput
    /**
     * Limit how many Deliverables to delete.
     */
    limit?: number
  }

  /**
   * Deliverable without action
   */
  export type DeliverableDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deliverable
     */
    select?: DeliverableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deliverable
     */
    omit?: DeliverableOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeliverableInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    rating: number | null
  }

  export type ReviewSumAggregateOutputType = {
    rating: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    taskId: string | null
    reviewerId: string | null
    revieweeId: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    taskId: string | null
    reviewerId: string | null
    revieweeId: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    taskId: number
    reviewerId: number
    revieweeId: number
    rating: number
    comment: number
    createdAt: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    rating?: true
  }

  export type ReviewSumAggregateInputType = {
    rating?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    taskId?: true
    reviewerId?: true
    revieweeId?: true
    rating?: true
    comment?: true
    createdAt?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    taskId?: true
    reviewerId?: true
    revieweeId?: true
    rating?: true
    comment?: true
    createdAt?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    taskId?: true
    reviewerId?: true
    revieweeId?: true
    rating?: true
    comment?: true
    createdAt?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: string
    taskId: string
    reviewerId: string
    revieweeId: string
    rating: number
    comment: string
    createdAt: Date
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    reviewerId?: boolean
    revieweeId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    reviewer?: boolean | UserDefaultArgs<ExtArgs>
    reviewee?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    reviewerId?: boolean
    revieweeId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    reviewer?: boolean | UserDefaultArgs<ExtArgs>
    reviewee?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    reviewerId?: boolean
    revieweeId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    reviewer?: boolean | UserDefaultArgs<ExtArgs>
    reviewee?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectScalar = {
    id?: boolean
    taskId?: boolean
    reviewerId?: boolean
    revieweeId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
  }

  export type ReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "reviewerId" | "revieweeId" | "rating" | "comment" | "createdAt", ExtArgs["result"]["review"]>
  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    reviewer?: boolean | UserDefaultArgs<ExtArgs>
    reviewee?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    reviewer?: boolean | UserDefaultArgs<ExtArgs>
    reviewee?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    reviewer?: boolean | UserDefaultArgs<ExtArgs>
    reviewee?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      reviewer: Prisma.$UserPayload<ExtArgs>
      reviewee: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      taskId: string
      reviewerId: string
      revieweeId: string
      rating: number
      comment: string
      createdAt: Date
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {ReviewCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews and returns the data updated in the database.
     * @param {ReviewUpdateManyAndReturnArgs} args - Arguments to update many Reviews.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReviewUpdateManyAndReturnArgs>(args: SelectSubset<T, ReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reviewer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reviewee<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Review model
   */
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'String'>
    readonly taskId: FieldRef<"Review", 'String'>
    readonly reviewerId: FieldRef<"Review", 'String'>
    readonly revieweeId: FieldRef<"Review", 'String'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly comment: FieldRef<"Review", 'String'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
  }

  /**
   * Review createManyAndReturn
   */
  export type ReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
  }

  /**
   * Review updateManyAndReturn
   */
  export type ReviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to delete.
     */
    limit?: number
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Model Dispute
   */

  export type AggregateDispute = {
    _count: DisputeCountAggregateOutputType | null
    _min: DisputeMinAggregateOutputType | null
    _max: DisputeMaxAggregateOutputType | null
  }

  export type DisputeMinAggregateOutputType = {
    id: string | null
    taskId: string | null
    initiatorId: string | null
    reason: string | null
    status: string | null
    resolution: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DisputeMaxAggregateOutputType = {
    id: string | null
    taskId: string | null
    initiatorId: string | null
    reason: string | null
    status: string | null
    resolution: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DisputeCountAggregateOutputType = {
    id: number
    taskId: number
    initiatorId: number
    reason: number
    status: number
    resolution: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DisputeMinAggregateInputType = {
    id?: true
    taskId?: true
    initiatorId?: true
    reason?: true
    status?: true
    resolution?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DisputeMaxAggregateInputType = {
    id?: true
    taskId?: true
    initiatorId?: true
    reason?: true
    status?: true
    resolution?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DisputeCountAggregateInputType = {
    id?: true
    taskId?: true
    initiatorId?: true
    reason?: true
    status?: true
    resolution?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DisputeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dispute to aggregate.
     */
    where?: DisputeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disputes to fetch.
     */
    orderBy?: DisputeOrderByWithRelationInput | DisputeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DisputeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disputes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disputes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Disputes
    **/
    _count?: true | DisputeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DisputeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DisputeMaxAggregateInputType
  }

  export type GetDisputeAggregateType<T extends DisputeAggregateArgs> = {
        [P in keyof T & keyof AggregateDispute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDispute[P]>
      : GetScalarType<T[P], AggregateDispute[P]>
  }




  export type DisputeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisputeWhereInput
    orderBy?: DisputeOrderByWithAggregationInput | DisputeOrderByWithAggregationInput[]
    by: DisputeScalarFieldEnum[] | DisputeScalarFieldEnum
    having?: DisputeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DisputeCountAggregateInputType | true
    _min?: DisputeMinAggregateInputType
    _max?: DisputeMaxAggregateInputType
  }

  export type DisputeGroupByOutputType = {
    id: string
    taskId: string
    initiatorId: string
    reason: string
    status: string
    resolution: string | null
    createdAt: Date
    updatedAt: Date
    _count: DisputeCountAggregateOutputType | null
    _min: DisputeMinAggregateOutputType | null
    _max: DisputeMaxAggregateOutputType | null
  }

  type GetDisputeGroupByPayload<T extends DisputeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DisputeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DisputeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DisputeGroupByOutputType[P]>
            : GetScalarType<T[P], DisputeGroupByOutputType[P]>
        }
      >
    >


  export type DisputeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    initiatorId?: boolean
    reason?: boolean
    status?: boolean
    resolution?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    initiator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dispute"]>

  export type DisputeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    initiatorId?: boolean
    reason?: boolean
    status?: boolean
    resolution?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    initiator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dispute"]>

  export type DisputeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    initiatorId?: boolean
    reason?: boolean
    status?: boolean
    resolution?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    initiator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dispute"]>

  export type DisputeSelectScalar = {
    id?: boolean
    taskId?: boolean
    initiatorId?: boolean
    reason?: boolean
    status?: boolean
    resolution?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DisputeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "initiatorId" | "reason" | "status" | "resolution" | "createdAt" | "updatedAt", ExtArgs["result"]["dispute"]>
  export type DisputeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    initiator?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DisputeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    initiator?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DisputeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    initiator?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DisputePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Dispute"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      initiator: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      taskId: string
      initiatorId: string
      reason: string
      status: string
      resolution: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dispute"]>
    composites: {}
  }

  type DisputeGetPayload<S extends boolean | null | undefined | DisputeDefaultArgs> = $Result.GetResult<Prisma.$DisputePayload, S>

  type DisputeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DisputeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DisputeCountAggregateInputType | true
    }

  export interface DisputeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Dispute'], meta: { name: 'Dispute' } }
    /**
     * Find zero or one Dispute that matches the filter.
     * @param {DisputeFindUniqueArgs} args - Arguments to find a Dispute
     * @example
     * // Get one Dispute
     * const dispute = await prisma.dispute.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DisputeFindUniqueArgs>(args: SelectSubset<T, DisputeFindUniqueArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Dispute that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DisputeFindUniqueOrThrowArgs} args - Arguments to find a Dispute
     * @example
     * // Get one Dispute
     * const dispute = await prisma.dispute.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DisputeFindUniqueOrThrowArgs>(args: SelectSubset<T, DisputeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dispute that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisputeFindFirstArgs} args - Arguments to find a Dispute
     * @example
     * // Get one Dispute
     * const dispute = await prisma.dispute.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DisputeFindFirstArgs>(args?: SelectSubset<T, DisputeFindFirstArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dispute that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisputeFindFirstOrThrowArgs} args - Arguments to find a Dispute
     * @example
     * // Get one Dispute
     * const dispute = await prisma.dispute.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DisputeFindFirstOrThrowArgs>(args?: SelectSubset<T, DisputeFindFirstOrThrowArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Disputes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisputeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Disputes
     * const disputes = await prisma.dispute.findMany()
     * 
     * // Get first 10 Disputes
     * const disputes = await prisma.dispute.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const disputeWithIdOnly = await prisma.dispute.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DisputeFindManyArgs>(args?: SelectSubset<T, DisputeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Dispute.
     * @param {DisputeCreateArgs} args - Arguments to create a Dispute.
     * @example
     * // Create one Dispute
     * const Dispute = await prisma.dispute.create({
     *   data: {
     *     // ... data to create a Dispute
     *   }
     * })
     * 
     */
    create<T extends DisputeCreateArgs>(args: SelectSubset<T, DisputeCreateArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Disputes.
     * @param {DisputeCreateManyArgs} args - Arguments to create many Disputes.
     * @example
     * // Create many Disputes
     * const dispute = await prisma.dispute.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DisputeCreateManyArgs>(args?: SelectSubset<T, DisputeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Disputes and returns the data saved in the database.
     * @param {DisputeCreateManyAndReturnArgs} args - Arguments to create many Disputes.
     * @example
     * // Create many Disputes
     * const dispute = await prisma.dispute.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Disputes and only return the `id`
     * const disputeWithIdOnly = await prisma.dispute.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DisputeCreateManyAndReturnArgs>(args?: SelectSubset<T, DisputeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Dispute.
     * @param {DisputeDeleteArgs} args - Arguments to delete one Dispute.
     * @example
     * // Delete one Dispute
     * const Dispute = await prisma.dispute.delete({
     *   where: {
     *     // ... filter to delete one Dispute
     *   }
     * })
     * 
     */
    delete<T extends DisputeDeleteArgs>(args: SelectSubset<T, DisputeDeleteArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Dispute.
     * @param {DisputeUpdateArgs} args - Arguments to update one Dispute.
     * @example
     * // Update one Dispute
     * const dispute = await prisma.dispute.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DisputeUpdateArgs>(args: SelectSubset<T, DisputeUpdateArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Disputes.
     * @param {DisputeDeleteManyArgs} args - Arguments to filter Disputes to delete.
     * @example
     * // Delete a few Disputes
     * const { count } = await prisma.dispute.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DisputeDeleteManyArgs>(args?: SelectSubset<T, DisputeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Disputes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisputeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Disputes
     * const dispute = await prisma.dispute.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DisputeUpdateManyArgs>(args: SelectSubset<T, DisputeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Disputes and returns the data updated in the database.
     * @param {DisputeUpdateManyAndReturnArgs} args - Arguments to update many Disputes.
     * @example
     * // Update many Disputes
     * const dispute = await prisma.dispute.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Disputes and only return the `id`
     * const disputeWithIdOnly = await prisma.dispute.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DisputeUpdateManyAndReturnArgs>(args: SelectSubset<T, DisputeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Dispute.
     * @param {DisputeUpsertArgs} args - Arguments to update or create a Dispute.
     * @example
     * // Update or create a Dispute
     * const dispute = await prisma.dispute.upsert({
     *   create: {
     *     // ... data to create a Dispute
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dispute we want to update
     *   }
     * })
     */
    upsert<T extends DisputeUpsertArgs>(args: SelectSubset<T, DisputeUpsertArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Disputes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisputeCountArgs} args - Arguments to filter Disputes to count.
     * @example
     * // Count the number of Disputes
     * const count = await prisma.dispute.count({
     *   where: {
     *     // ... the filter for the Disputes we want to count
     *   }
     * })
    **/
    count<T extends DisputeCountArgs>(
      args?: Subset<T, DisputeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DisputeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dispute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisputeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DisputeAggregateArgs>(args: Subset<T, DisputeAggregateArgs>): Prisma.PrismaPromise<GetDisputeAggregateType<T>>

    /**
     * Group by Dispute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisputeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DisputeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DisputeGroupByArgs['orderBy'] }
        : { orderBy?: DisputeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DisputeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDisputeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Dispute model
   */
  readonly fields: DisputeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Dispute.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DisputeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    initiator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Dispute model
   */
  interface DisputeFieldRefs {
    readonly id: FieldRef<"Dispute", 'String'>
    readonly taskId: FieldRef<"Dispute", 'String'>
    readonly initiatorId: FieldRef<"Dispute", 'String'>
    readonly reason: FieldRef<"Dispute", 'String'>
    readonly status: FieldRef<"Dispute", 'String'>
    readonly resolution: FieldRef<"Dispute", 'String'>
    readonly createdAt: FieldRef<"Dispute", 'DateTime'>
    readonly updatedAt: FieldRef<"Dispute", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Dispute findUnique
   */
  export type DisputeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * Filter, which Dispute to fetch.
     */
    where: DisputeWhereUniqueInput
  }

  /**
   * Dispute findUniqueOrThrow
   */
  export type DisputeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * Filter, which Dispute to fetch.
     */
    where: DisputeWhereUniqueInput
  }

  /**
   * Dispute findFirst
   */
  export type DisputeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * Filter, which Dispute to fetch.
     */
    where?: DisputeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disputes to fetch.
     */
    orderBy?: DisputeOrderByWithRelationInput | DisputeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Disputes.
     */
    cursor?: DisputeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disputes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disputes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Disputes.
     */
    distinct?: DisputeScalarFieldEnum | DisputeScalarFieldEnum[]
  }

  /**
   * Dispute findFirstOrThrow
   */
  export type DisputeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * Filter, which Dispute to fetch.
     */
    where?: DisputeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disputes to fetch.
     */
    orderBy?: DisputeOrderByWithRelationInput | DisputeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Disputes.
     */
    cursor?: DisputeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disputes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disputes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Disputes.
     */
    distinct?: DisputeScalarFieldEnum | DisputeScalarFieldEnum[]
  }

  /**
   * Dispute findMany
   */
  export type DisputeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * Filter, which Disputes to fetch.
     */
    where?: DisputeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disputes to fetch.
     */
    orderBy?: DisputeOrderByWithRelationInput | DisputeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Disputes.
     */
    cursor?: DisputeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disputes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disputes.
     */
    skip?: number
    distinct?: DisputeScalarFieldEnum | DisputeScalarFieldEnum[]
  }

  /**
   * Dispute create
   */
  export type DisputeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * The data needed to create a Dispute.
     */
    data: XOR<DisputeCreateInput, DisputeUncheckedCreateInput>
  }

  /**
   * Dispute createMany
   */
  export type DisputeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Disputes.
     */
    data: DisputeCreateManyInput | DisputeCreateManyInput[]
  }

  /**
   * Dispute createManyAndReturn
   */
  export type DisputeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * The data used to create many Disputes.
     */
    data: DisputeCreateManyInput | DisputeCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Dispute update
   */
  export type DisputeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * The data needed to update a Dispute.
     */
    data: XOR<DisputeUpdateInput, DisputeUncheckedUpdateInput>
    /**
     * Choose, which Dispute to update.
     */
    where: DisputeWhereUniqueInput
  }

  /**
   * Dispute updateMany
   */
  export type DisputeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Disputes.
     */
    data: XOR<DisputeUpdateManyMutationInput, DisputeUncheckedUpdateManyInput>
    /**
     * Filter which Disputes to update
     */
    where?: DisputeWhereInput
    /**
     * Limit how many Disputes to update.
     */
    limit?: number
  }

  /**
   * Dispute updateManyAndReturn
   */
  export type DisputeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * The data used to update Disputes.
     */
    data: XOR<DisputeUpdateManyMutationInput, DisputeUncheckedUpdateManyInput>
    /**
     * Filter which Disputes to update
     */
    where?: DisputeWhereInput
    /**
     * Limit how many Disputes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Dispute upsert
   */
  export type DisputeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * The filter to search for the Dispute to update in case it exists.
     */
    where: DisputeWhereUniqueInput
    /**
     * In case the Dispute found by the `where` argument doesn't exist, create a new Dispute with this data.
     */
    create: XOR<DisputeCreateInput, DisputeUncheckedCreateInput>
    /**
     * In case the Dispute was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DisputeUpdateInput, DisputeUncheckedUpdateInput>
  }

  /**
   * Dispute delete
   */
  export type DisputeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * Filter which Dispute to delete.
     */
    where: DisputeWhereUniqueInput
  }

  /**
   * Dispute deleteMany
   */
  export type DisputeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Disputes to delete
     */
    where?: DisputeWhereInput
    /**
     * Limit how many Disputes to delete.
     */
    limit?: number
  }

  /**
   * Dispute without action
   */
  export type DisputeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    taskId: string | null
    senderId: string | null
    content: string | null
    createdAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    taskId: string | null
    senderId: string | null
    content: string | null
    createdAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    taskId: number
    senderId: number
    content: number
    createdAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    taskId?: true
    senderId?: true
    content?: true
    createdAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    taskId?: true
    senderId?: true
    content?: true
    createdAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    taskId?: true
    senderId?: true
    content?: true
    createdAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    taskId: string
    senderId: string
    content: string
    createdAt: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    senderId?: boolean
    content?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    senderId?: boolean
    content?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    senderId?: boolean
    content?: boolean
    createdAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    taskId?: boolean
    senderId?: boolean
    content?: boolean
    createdAt?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "senderId" | "content" | "createdAt", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      sender: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      taskId: string
      senderId: string
      content: string
      createdAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly taskId: FieldRef<"Message", 'String'>
    readonly senderId: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    avatar: 'avatar',
    bio: 'bio',
    role: 'role',
    rating: 'rating',
    completedTasks: 'completedTasks',
    totalEarnings: 'totalEarnings',
    onTimeRate: 'onTimeRate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    resetToken: 'resetToken',
    resetTokenExpiry: 'resetTokenExpiry'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    posterId: 'posterId',
    title: 'title',
    description: 'description',
    category: 'category',
    academicLevel: 'academicLevel',
    budgetMin: 'budgetMin',
    budgetMax: 'budgetMax',
    deadline: 'deadline',
    status: 'status',
    acceptedBidId: 'acceptedBidId',
    revisionCount: 'revisionCount',
    platformFee: 'platformFee',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const BidScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    solverId: 'solverId',
    proposedPrice: 'proposedPrice',
    deliveryDays: 'deliveryDays',
    message: 'message',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BidScalarFieldEnum = (typeof BidScalarFieldEnum)[keyof typeof BidScalarFieldEnum]


  export const DeliverableScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    solverId: 'solverId',
    content: 'content',
    version: 'version',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type DeliverableScalarFieldEnum = (typeof DeliverableScalarFieldEnum)[keyof typeof DeliverableScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    reviewerId: 'reviewerId',
    revieweeId: 'revieweeId',
    rating: 'rating',
    comment: 'comment',
    createdAt: 'createdAt'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const DisputeScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    initiatorId: 'initiatorId',
    reason: 'reason',
    status: 'status',
    resolution: 'resolution',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DisputeScalarFieldEnum = (typeof DisputeScalarFieldEnum)[keyof typeof DisputeScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    senderId: 'senderId',
    content: 'content',
    createdAt: 'createdAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    avatar?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    rating?: FloatFilter<"User"> | number
    completedTasks?: IntFilter<"User"> | number
    totalEarnings?: FloatFilter<"User"> | number
    onTimeRate?: FloatFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    postedTasks?: TaskListRelationFilter
    bids?: BidListRelationFilter
    deliverables?: DeliverableListRelationFilter
    sentMessages?: MessageListRelationFilter
    givenReviews?: ReviewListRelationFilter
    receivedReviews?: ReviewListRelationFilter
    initiatedDisputes?: DisputeListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    avatar?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    role?: SortOrder
    rating?: SortOrder
    completedTasks?: SortOrder
    totalEarnings?: SortOrder
    onTimeRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpiry?: SortOrderInput | SortOrder
    postedTasks?: TaskOrderByRelationAggregateInput
    bids?: BidOrderByRelationAggregateInput
    deliverables?: DeliverableOrderByRelationAggregateInput
    sentMessages?: MessageOrderByRelationAggregateInput
    givenReviews?: ReviewOrderByRelationAggregateInput
    receivedReviews?: ReviewOrderByRelationAggregateInput
    initiatedDisputes?: DisputeOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    avatar?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    rating?: FloatFilter<"User"> | number
    completedTasks?: IntFilter<"User"> | number
    totalEarnings?: FloatFilter<"User"> | number
    onTimeRate?: FloatFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    postedTasks?: TaskListRelationFilter
    bids?: BidListRelationFilter
    deliverables?: DeliverableListRelationFilter
    sentMessages?: MessageListRelationFilter
    givenReviews?: ReviewListRelationFilter
    receivedReviews?: ReviewListRelationFilter
    initiatedDisputes?: DisputeListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    avatar?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    role?: SortOrder
    rating?: SortOrder
    completedTasks?: SortOrder
    totalEarnings?: SortOrder
    onTimeRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpiry?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    rating?: FloatWithAggregatesFilter<"User"> | number
    completedTasks?: IntWithAggregatesFilter<"User"> | number
    totalEarnings?: FloatWithAggregatesFilter<"User"> | number
    onTimeRate?: FloatWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    resetToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: StringFilter<"Task"> | string
    posterId?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    description?: StringFilter<"Task"> | string
    category?: StringFilter<"Task"> | string
    academicLevel?: StringFilter<"Task"> | string
    budgetMin?: FloatFilter<"Task"> | number
    budgetMax?: FloatFilter<"Task"> | number
    deadline?: DateTimeFilter<"Task"> | Date | string
    status?: StringFilter<"Task"> | string
    acceptedBidId?: StringNullableFilter<"Task"> | string | null
    revisionCount?: IntFilter<"Task"> | number
    platformFee?: FloatFilter<"Task"> | number
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    poster?: XOR<UserScalarRelationFilter, UserWhereInput>
    acceptedBid?: XOR<BidNullableScalarRelationFilter, BidWhereInput> | null
    bids?: BidListRelationFilter
    deliverables?: DeliverableListRelationFilter
    reviews?: ReviewListRelationFilter
    disputes?: DisputeListRelationFilter
    messages?: MessageListRelationFilter
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    posterId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    academicLevel?: SortOrder
    budgetMin?: SortOrder
    budgetMax?: SortOrder
    deadline?: SortOrder
    status?: SortOrder
    acceptedBidId?: SortOrderInput | SortOrder
    revisionCount?: SortOrder
    platformFee?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    poster?: UserOrderByWithRelationInput
    acceptedBid?: BidOrderByWithRelationInput
    bids?: BidOrderByRelationAggregateInput
    deliverables?: DeliverableOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
    disputes?: DisputeOrderByRelationAggregateInput
    messages?: MessageOrderByRelationAggregateInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    acceptedBidId?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    posterId?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    description?: StringFilter<"Task"> | string
    category?: StringFilter<"Task"> | string
    academicLevel?: StringFilter<"Task"> | string
    budgetMin?: FloatFilter<"Task"> | number
    budgetMax?: FloatFilter<"Task"> | number
    deadline?: DateTimeFilter<"Task"> | Date | string
    status?: StringFilter<"Task"> | string
    revisionCount?: IntFilter<"Task"> | number
    platformFee?: FloatFilter<"Task"> | number
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    poster?: XOR<UserScalarRelationFilter, UserWhereInput>
    acceptedBid?: XOR<BidNullableScalarRelationFilter, BidWhereInput> | null
    bids?: BidListRelationFilter
    deliverables?: DeliverableListRelationFilter
    reviews?: ReviewListRelationFilter
    disputes?: DisputeListRelationFilter
    messages?: MessageListRelationFilter
  }, "id" | "acceptedBidId">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    posterId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    academicLevel?: SortOrder
    budgetMin?: SortOrder
    budgetMax?: SortOrder
    deadline?: SortOrder
    status?: SortOrder
    acceptedBidId?: SortOrderInput | SortOrder
    revisionCount?: SortOrder
    platformFee?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Task"> | string
    posterId?: StringWithAggregatesFilter<"Task"> | string
    title?: StringWithAggregatesFilter<"Task"> | string
    description?: StringWithAggregatesFilter<"Task"> | string
    category?: StringWithAggregatesFilter<"Task"> | string
    academicLevel?: StringWithAggregatesFilter<"Task"> | string
    budgetMin?: FloatWithAggregatesFilter<"Task"> | number
    budgetMax?: FloatWithAggregatesFilter<"Task"> | number
    deadline?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    status?: StringWithAggregatesFilter<"Task"> | string
    acceptedBidId?: StringNullableWithAggregatesFilter<"Task"> | string | null
    revisionCount?: IntWithAggregatesFilter<"Task"> | number
    platformFee?: FloatWithAggregatesFilter<"Task"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
  }

  export type BidWhereInput = {
    AND?: BidWhereInput | BidWhereInput[]
    OR?: BidWhereInput[]
    NOT?: BidWhereInput | BidWhereInput[]
    id?: StringFilter<"Bid"> | string
    taskId?: StringFilter<"Bid"> | string
    solverId?: StringFilter<"Bid"> | string
    proposedPrice?: FloatFilter<"Bid"> | number
    deliveryDays?: IntFilter<"Bid"> | number
    message?: StringFilter<"Bid"> | string
    status?: StringFilter<"Bid"> | string
    createdAt?: DateTimeFilter<"Bid"> | Date | string
    updatedAt?: DateTimeFilter<"Bid"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    solver?: XOR<UserScalarRelationFilter, UserWhereInput>
    acceptedTask?: XOR<TaskNullableScalarRelationFilter, TaskWhereInput> | null
  }

  export type BidOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    solverId?: SortOrder
    proposedPrice?: SortOrder
    deliveryDays?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    task?: TaskOrderByWithRelationInput
    solver?: UserOrderByWithRelationInput
    acceptedTask?: TaskOrderByWithRelationInput
  }

  export type BidWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BidWhereInput | BidWhereInput[]
    OR?: BidWhereInput[]
    NOT?: BidWhereInput | BidWhereInput[]
    taskId?: StringFilter<"Bid"> | string
    solverId?: StringFilter<"Bid"> | string
    proposedPrice?: FloatFilter<"Bid"> | number
    deliveryDays?: IntFilter<"Bid"> | number
    message?: StringFilter<"Bid"> | string
    status?: StringFilter<"Bid"> | string
    createdAt?: DateTimeFilter<"Bid"> | Date | string
    updatedAt?: DateTimeFilter<"Bid"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    solver?: XOR<UserScalarRelationFilter, UserWhereInput>
    acceptedTask?: XOR<TaskNullableScalarRelationFilter, TaskWhereInput> | null
  }, "id">

  export type BidOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    solverId?: SortOrder
    proposedPrice?: SortOrder
    deliveryDays?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BidCountOrderByAggregateInput
    _avg?: BidAvgOrderByAggregateInput
    _max?: BidMaxOrderByAggregateInput
    _min?: BidMinOrderByAggregateInput
    _sum?: BidSumOrderByAggregateInput
  }

  export type BidScalarWhereWithAggregatesInput = {
    AND?: BidScalarWhereWithAggregatesInput | BidScalarWhereWithAggregatesInput[]
    OR?: BidScalarWhereWithAggregatesInput[]
    NOT?: BidScalarWhereWithAggregatesInput | BidScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Bid"> | string
    taskId?: StringWithAggregatesFilter<"Bid"> | string
    solverId?: StringWithAggregatesFilter<"Bid"> | string
    proposedPrice?: FloatWithAggregatesFilter<"Bid"> | number
    deliveryDays?: IntWithAggregatesFilter<"Bid"> | number
    message?: StringWithAggregatesFilter<"Bid"> | string
    status?: StringWithAggregatesFilter<"Bid"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Bid"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Bid"> | Date | string
  }

  export type DeliverableWhereInput = {
    AND?: DeliverableWhereInput | DeliverableWhereInput[]
    OR?: DeliverableWhereInput[]
    NOT?: DeliverableWhereInput | DeliverableWhereInput[]
    id?: StringFilter<"Deliverable"> | string
    taskId?: StringFilter<"Deliverable"> | string
    solverId?: StringFilter<"Deliverable"> | string
    content?: StringFilter<"Deliverable"> | string
    version?: IntFilter<"Deliverable"> | number
    status?: StringFilter<"Deliverable"> | string
    createdAt?: DateTimeFilter<"Deliverable"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    solver?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type DeliverableOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    solverId?: SortOrder
    content?: SortOrder
    version?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    task?: TaskOrderByWithRelationInput
    solver?: UserOrderByWithRelationInput
  }

  export type DeliverableWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DeliverableWhereInput | DeliverableWhereInput[]
    OR?: DeliverableWhereInput[]
    NOT?: DeliverableWhereInput | DeliverableWhereInput[]
    taskId?: StringFilter<"Deliverable"> | string
    solverId?: StringFilter<"Deliverable"> | string
    content?: StringFilter<"Deliverable"> | string
    version?: IntFilter<"Deliverable"> | number
    status?: StringFilter<"Deliverable"> | string
    createdAt?: DateTimeFilter<"Deliverable"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    solver?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type DeliverableOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    solverId?: SortOrder
    content?: SortOrder
    version?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: DeliverableCountOrderByAggregateInput
    _avg?: DeliverableAvgOrderByAggregateInput
    _max?: DeliverableMaxOrderByAggregateInput
    _min?: DeliverableMinOrderByAggregateInput
    _sum?: DeliverableSumOrderByAggregateInput
  }

  export type DeliverableScalarWhereWithAggregatesInput = {
    AND?: DeliverableScalarWhereWithAggregatesInput | DeliverableScalarWhereWithAggregatesInput[]
    OR?: DeliverableScalarWhereWithAggregatesInput[]
    NOT?: DeliverableScalarWhereWithAggregatesInput | DeliverableScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Deliverable"> | string
    taskId?: StringWithAggregatesFilter<"Deliverable"> | string
    solverId?: StringWithAggregatesFilter<"Deliverable"> | string
    content?: StringWithAggregatesFilter<"Deliverable"> | string
    version?: IntWithAggregatesFilter<"Deliverable"> | number
    status?: StringWithAggregatesFilter<"Deliverable"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Deliverable"> | Date | string
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: StringFilter<"Review"> | string
    taskId?: StringFilter<"Review"> | string
    reviewerId?: StringFilter<"Review"> | string
    revieweeId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringFilter<"Review"> | string
    createdAt?: DateTimeFilter<"Review"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    reviewer?: XOR<UserScalarRelationFilter, UserWhereInput>
    reviewee?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    reviewerId?: SortOrder
    revieweeId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    task?: TaskOrderByWithRelationInput
    reviewer?: UserOrderByWithRelationInput
    reviewee?: UserOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    taskId?: StringFilter<"Review"> | string
    reviewerId?: StringFilter<"Review"> | string
    revieweeId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringFilter<"Review"> | string
    createdAt?: DateTimeFilter<"Review"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    reviewer?: XOR<UserScalarRelationFilter, UserWhereInput>
    reviewee?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    reviewerId?: SortOrder
    revieweeId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Review"> | string
    taskId?: StringWithAggregatesFilter<"Review"> | string
    reviewerId?: StringWithAggregatesFilter<"Review"> | string
    revieweeId?: StringWithAggregatesFilter<"Review"> | string
    rating?: IntWithAggregatesFilter<"Review"> | number
    comment?: StringWithAggregatesFilter<"Review"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
  }

  export type DisputeWhereInput = {
    AND?: DisputeWhereInput | DisputeWhereInput[]
    OR?: DisputeWhereInput[]
    NOT?: DisputeWhereInput | DisputeWhereInput[]
    id?: StringFilter<"Dispute"> | string
    taskId?: StringFilter<"Dispute"> | string
    initiatorId?: StringFilter<"Dispute"> | string
    reason?: StringFilter<"Dispute"> | string
    status?: StringFilter<"Dispute"> | string
    resolution?: StringNullableFilter<"Dispute"> | string | null
    createdAt?: DateTimeFilter<"Dispute"> | Date | string
    updatedAt?: DateTimeFilter<"Dispute"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    initiator?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type DisputeOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    initiatorId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    resolution?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    task?: TaskOrderByWithRelationInput
    initiator?: UserOrderByWithRelationInput
  }

  export type DisputeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DisputeWhereInput | DisputeWhereInput[]
    OR?: DisputeWhereInput[]
    NOT?: DisputeWhereInput | DisputeWhereInput[]
    taskId?: StringFilter<"Dispute"> | string
    initiatorId?: StringFilter<"Dispute"> | string
    reason?: StringFilter<"Dispute"> | string
    status?: StringFilter<"Dispute"> | string
    resolution?: StringNullableFilter<"Dispute"> | string | null
    createdAt?: DateTimeFilter<"Dispute"> | Date | string
    updatedAt?: DateTimeFilter<"Dispute"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    initiator?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type DisputeOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    initiatorId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    resolution?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DisputeCountOrderByAggregateInput
    _max?: DisputeMaxOrderByAggregateInput
    _min?: DisputeMinOrderByAggregateInput
  }

  export type DisputeScalarWhereWithAggregatesInput = {
    AND?: DisputeScalarWhereWithAggregatesInput | DisputeScalarWhereWithAggregatesInput[]
    OR?: DisputeScalarWhereWithAggregatesInput[]
    NOT?: DisputeScalarWhereWithAggregatesInput | DisputeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Dispute"> | string
    taskId?: StringWithAggregatesFilter<"Dispute"> | string
    initiatorId?: StringWithAggregatesFilter<"Dispute"> | string
    reason?: StringWithAggregatesFilter<"Dispute"> | string
    status?: StringWithAggregatesFilter<"Dispute"> | string
    resolution?: StringNullableWithAggregatesFilter<"Dispute"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Dispute"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Dispute"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    taskId?: StringFilter<"Message"> | string
    senderId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    task?: TaskOrderByWithRelationInput
    sender?: UserOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    taskId?: StringFilter<"Message"> | string
    senderId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    taskId?: StringWithAggregatesFilter<"Message"> | string
    senderId?: StringWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    rating?: number
    completedTasks?: number
    totalEarnings?: number
    onTimeRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    postedTasks?: TaskCreateNestedManyWithoutPosterInput
    bids?: BidCreateNestedManyWithoutSolverInput
    deliverables?: DeliverableCreateNestedManyWithoutSolverInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    givenReviews?: ReviewCreateNestedManyWithoutReviewerInput
    receivedReviews?: ReviewCreateNestedManyWithoutRevieweeInput
    initiatedDisputes?: DisputeCreateNestedManyWithoutInitiatorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    rating?: number
    completedTasks?: number
    totalEarnings?: number
    onTimeRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    postedTasks?: TaskUncheckedCreateNestedManyWithoutPosterInput
    bids?: BidUncheckedCreateNestedManyWithoutSolverInput
    deliverables?: DeliverableUncheckedCreateNestedManyWithoutSolverInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    givenReviews?: ReviewUncheckedCreateNestedManyWithoutReviewerInput
    receivedReviews?: ReviewUncheckedCreateNestedManyWithoutRevieweeInput
    initiatedDisputes?: DisputeUncheckedCreateNestedManyWithoutInitiatorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    completedTasks?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    onTimeRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    postedTasks?: TaskUpdateManyWithoutPosterNestedInput
    bids?: BidUpdateManyWithoutSolverNestedInput
    deliverables?: DeliverableUpdateManyWithoutSolverNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    givenReviews?: ReviewUpdateManyWithoutReviewerNestedInput
    receivedReviews?: ReviewUpdateManyWithoutRevieweeNestedInput
    initiatedDisputes?: DisputeUpdateManyWithoutInitiatorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    completedTasks?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    onTimeRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    postedTasks?: TaskUncheckedUpdateManyWithoutPosterNestedInput
    bids?: BidUncheckedUpdateManyWithoutSolverNestedInput
    deliverables?: DeliverableUncheckedUpdateManyWithoutSolverNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    givenReviews?: ReviewUncheckedUpdateManyWithoutReviewerNestedInput
    receivedReviews?: ReviewUncheckedUpdateManyWithoutRevieweeNestedInput
    initiatedDisputes?: DisputeUncheckedUpdateManyWithoutInitiatorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    rating?: number
    completedTasks?: number
    totalEarnings?: number
    onTimeRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    completedTasks?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    onTimeRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    completedTasks?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    onTimeRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TaskCreateInput = {
    id?: string
    title: string
    description: string
    category: string
    academicLevel: string
    budgetMin: number
    budgetMax: number
    deadline: Date | string
    status?: string
    revisionCount?: number
    platformFee?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    poster: UserCreateNestedOneWithoutPostedTasksInput
    acceptedBid?: BidCreateNestedOneWithoutAcceptedTaskInput
    bids?: BidCreateNestedManyWithoutTaskInput
    deliverables?: DeliverableCreateNestedManyWithoutTaskInput
    reviews?: ReviewCreateNestedManyWithoutTaskInput
    disputes?: DisputeCreateNestedManyWithoutTaskInput
    messages?: MessageCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    posterId: string
    title: string
    description: string
    category: string
    academicLevel: string
    budgetMin: number
    budgetMax: number
    deadline: Date | string
    status?: string
    acceptedBidId?: string | null
    revisionCount?: number
    platformFee?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    bids?: BidUncheckedCreateNestedManyWithoutTaskInput
    deliverables?: DeliverableUncheckedCreateNestedManyWithoutTaskInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutTaskInput
    disputes?: DisputeUncheckedCreateNestedManyWithoutTaskInput
    messages?: MessageUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    academicLevel?: StringFieldUpdateOperationsInput | string
    budgetMin?: FloatFieldUpdateOperationsInput | number
    budgetMax?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    revisionCount?: IntFieldUpdateOperationsInput | number
    platformFee?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poster?: UserUpdateOneRequiredWithoutPostedTasksNestedInput
    acceptedBid?: BidUpdateOneWithoutAcceptedTaskNestedInput
    bids?: BidUpdateManyWithoutTaskNestedInput
    deliverables?: DeliverableUpdateManyWithoutTaskNestedInput
    reviews?: ReviewUpdateManyWithoutTaskNestedInput
    disputes?: DisputeUpdateManyWithoutTaskNestedInput
    messages?: MessageUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    posterId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    academicLevel?: StringFieldUpdateOperationsInput | string
    budgetMin?: FloatFieldUpdateOperationsInput | number
    budgetMax?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    acceptedBidId?: NullableStringFieldUpdateOperationsInput | string | null
    revisionCount?: IntFieldUpdateOperationsInput | number
    platformFee?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bids?: BidUncheckedUpdateManyWithoutTaskNestedInput
    deliverables?: DeliverableUncheckedUpdateManyWithoutTaskNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutTaskNestedInput
    disputes?: DisputeUncheckedUpdateManyWithoutTaskNestedInput
    messages?: MessageUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskCreateManyInput = {
    id?: string
    posterId: string
    title: string
    description: string
    category: string
    academicLevel: string
    budgetMin: number
    budgetMax: number
    deadline: Date | string
    status?: string
    acceptedBidId?: string | null
    revisionCount?: number
    platformFee?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    academicLevel?: StringFieldUpdateOperationsInput | string
    budgetMin?: FloatFieldUpdateOperationsInput | number
    budgetMax?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    revisionCount?: IntFieldUpdateOperationsInput | number
    platformFee?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    posterId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    academicLevel?: StringFieldUpdateOperationsInput | string
    budgetMin?: FloatFieldUpdateOperationsInput | number
    budgetMax?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    acceptedBidId?: NullableStringFieldUpdateOperationsInput | string | null
    revisionCount?: IntFieldUpdateOperationsInput | number
    platformFee?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BidCreateInput = {
    id?: string
    proposedPrice: number
    deliveryDays: number
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    task: TaskCreateNestedOneWithoutBidsInput
    solver: UserCreateNestedOneWithoutBidsInput
    acceptedTask?: TaskCreateNestedOneWithoutAcceptedBidInput
  }

  export type BidUncheckedCreateInput = {
    id?: string
    taskId: string
    solverId: string
    proposedPrice: number
    deliveryDays: number
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    acceptedTask?: TaskUncheckedCreateNestedOneWithoutAcceptedBidInput
  }

  export type BidUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    proposedPrice?: FloatFieldUpdateOperationsInput | number
    deliveryDays?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutBidsNestedInput
    solver?: UserUpdateOneRequiredWithoutBidsNestedInput
    acceptedTask?: TaskUpdateOneWithoutAcceptedBidNestedInput
  }

  export type BidUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    solverId?: StringFieldUpdateOperationsInput | string
    proposedPrice?: FloatFieldUpdateOperationsInput | number
    deliveryDays?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedTask?: TaskUncheckedUpdateOneWithoutAcceptedBidNestedInput
  }

  export type BidCreateManyInput = {
    id?: string
    taskId: string
    solverId: string
    proposedPrice: number
    deliveryDays: number
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BidUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    proposedPrice?: FloatFieldUpdateOperationsInput | number
    deliveryDays?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BidUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    solverId?: StringFieldUpdateOperationsInput | string
    proposedPrice?: FloatFieldUpdateOperationsInput | number
    deliveryDays?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliverableCreateInput = {
    id?: string
    content: string
    version?: number
    status?: string
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutDeliverablesInput
    solver: UserCreateNestedOneWithoutDeliverablesInput
  }

  export type DeliverableUncheckedCreateInput = {
    id?: string
    taskId: string
    solverId: string
    content: string
    version?: number
    status?: string
    createdAt?: Date | string
  }

  export type DeliverableUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutDeliverablesNestedInput
    solver?: UserUpdateOneRequiredWithoutDeliverablesNestedInput
  }

  export type DeliverableUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    solverId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliverableCreateManyInput = {
    id?: string
    taskId: string
    solverId: string
    content: string
    version?: number
    status?: string
    createdAt?: Date | string
  }

  export type DeliverableUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliverableUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    solverId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateInput = {
    id?: string
    rating: number
    comment: string
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutReviewsInput
    reviewer: UserCreateNestedOneWithoutGivenReviewsInput
    reviewee: UserCreateNestedOneWithoutReceivedReviewsInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    taskId: string
    reviewerId: string
    revieweeId: string
    rating: number
    comment: string
    createdAt?: Date | string
  }

  export type ReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutReviewsNestedInput
    reviewer?: UserUpdateOneRequiredWithoutGivenReviewsNestedInput
    reviewee?: UserUpdateOneRequiredWithoutReceivedReviewsNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    revieweeId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateManyInput = {
    id?: string
    taskId: string
    reviewerId: string
    revieweeId: string
    rating: number
    comment: string
    createdAt?: Date | string
  }

  export type ReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    revieweeId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisputeCreateInput = {
    id?: string
    reason: string
    status?: string
    resolution?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    task: TaskCreateNestedOneWithoutDisputesInput
    initiator: UserCreateNestedOneWithoutInitiatedDisputesInput
  }

  export type DisputeUncheckedCreateInput = {
    id?: string
    taskId: string
    initiatorId: string
    reason: string
    status?: string
    resolution?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DisputeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutDisputesNestedInput
    initiator?: UserUpdateOneRequiredWithoutInitiatedDisputesNestedInput
  }

  export type DisputeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    initiatorId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisputeCreateManyInput = {
    id?: string
    taskId: string
    initiatorId: string
    reason: string
    status?: string
    resolution?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DisputeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisputeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    initiatorId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    content: string
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutMessagesInput
    sender: UserCreateNestedOneWithoutSentMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    taskId: string
    senderId: string
    content: string
    createdAt?: Date | string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutMessagesNestedInput
    sender?: UserUpdateOneRequiredWithoutSentMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInput = {
    id?: string
    taskId: string
    senderId: string
    content: string
    createdAt?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type BidListRelationFilter = {
    every?: BidWhereInput
    some?: BidWhereInput
    none?: BidWhereInput
  }

  export type DeliverableListRelationFilter = {
    every?: DeliverableWhereInput
    some?: DeliverableWhereInput
    none?: DeliverableWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type DisputeListRelationFilter = {
    every?: DisputeWhereInput
    some?: DisputeWhereInput
    none?: DisputeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BidOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DeliverableOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DisputeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    role?: SortOrder
    rating?: SortOrder
    completedTasks?: SortOrder
    totalEarnings?: SortOrder
    onTimeRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    rating?: SortOrder
    completedTasks?: SortOrder
    totalEarnings?: SortOrder
    onTimeRate?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    role?: SortOrder
    rating?: SortOrder
    completedTasks?: SortOrder
    totalEarnings?: SortOrder
    onTimeRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    role?: SortOrder
    rating?: SortOrder
    completedTasks?: SortOrder
    totalEarnings?: SortOrder
    onTimeRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    rating?: SortOrder
    completedTasks?: SortOrder
    totalEarnings?: SortOrder
    onTimeRate?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type BidNullableScalarRelationFilter = {
    is?: BidWhereInput | null
    isNot?: BidWhereInput | null
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    posterId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    academicLevel?: SortOrder
    budgetMin?: SortOrder
    budgetMax?: SortOrder
    deadline?: SortOrder
    status?: SortOrder
    acceptedBidId?: SortOrder
    revisionCount?: SortOrder
    platformFee?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    budgetMin?: SortOrder
    budgetMax?: SortOrder
    revisionCount?: SortOrder
    platformFee?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    posterId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    academicLevel?: SortOrder
    budgetMin?: SortOrder
    budgetMax?: SortOrder
    deadline?: SortOrder
    status?: SortOrder
    acceptedBidId?: SortOrder
    revisionCount?: SortOrder
    platformFee?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    posterId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    academicLevel?: SortOrder
    budgetMin?: SortOrder
    budgetMax?: SortOrder
    deadline?: SortOrder
    status?: SortOrder
    acceptedBidId?: SortOrder
    revisionCount?: SortOrder
    platformFee?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    budgetMin?: SortOrder
    budgetMax?: SortOrder
    revisionCount?: SortOrder
    platformFee?: SortOrder
  }

  export type TaskScalarRelationFilter = {
    is?: TaskWhereInput
    isNot?: TaskWhereInput
  }

  export type TaskNullableScalarRelationFilter = {
    is?: TaskWhereInput | null
    isNot?: TaskWhereInput | null
  }

  export type BidCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    solverId?: SortOrder
    proposedPrice?: SortOrder
    deliveryDays?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BidAvgOrderByAggregateInput = {
    proposedPrice?: SortOrder
    deliveryDays?: SortOrder
  }

  export type BidMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    solverId?: SortOrder
    proposedPrice?: SortOrder
    deliveryDays?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BidMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    solverId?: SortOrder
    proposedPrice?: SortOrder
    deliveryDays?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BidSumOrderByAggregateInput = {
    proposedPrice?: SortOrder
    deliveryDays?: SortOrder
  }

  export type DeliverableCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    solverId?: SortOrder
    content?: SortOrder
    version?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type DeliverableAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type DeliverableMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    solverId?: SortOrder
    content?: SortOrder
    version?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type DeliverableMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    solverId?: SortOrder
    content?: SortOrder
    version?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type DeliverableSumOrderByAggregateInput = {
    version?: SortOrder
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    reviewerId?: SortOrder
    revieweeId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    reviewerId?: SortOrder
    revieweeId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    reviewerId?: SortOrder
    revieweeId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type DisputeCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    initiatorId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    resolution?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DisputeMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    initiatorId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    resolution?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DisputeMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    initiatorId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    resolution?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskCreateNestedManyWithoutPosterInput = {
    create?: XOR<TaskCreateWithoutPosterInput, TaskUncheckedCreateWithoutPosterInput> | TaskCreateWithoutPosterInput[] | TaskUncheckedCreateWithoutPosterInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutPosterInput | TaskCreateOrConnectWithoutPosterInput[]
    createMany?: TaskCreateManyPosterInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type BidCreateNestedManyWithoutSolverInput = {
    create?: XOR<BidCreateWithoutSolverInput, BidUncheckedCreateWithoutSolverInput> | BidCreateWithoutSolverInput[] | BidUncheckedCreateWithoutSolverInput[]
    connectOrCreate?: BidCreateOrConnectWithoutSolverInput | BidCreateOrConnectWithoutSolverInput[]
    createMany?: BidCreateManySolverInputEnvelope
    connect?: BidWhereUniqueInput | BidWhereUniqueInput[]
  }

  export type DeliverableCreateNestedManyWithoutSolverInput = {
    create?: XOR<DeliverableCreateWithoutSolverInput, DeliverableUncheckedCreateWithoutSolverInput> | DeliverableCreateWithoutSolverInput[] | DeliverableUncheckedCreateWithoutSolverInput[]
    connectOrCreate?: DeliverableCreateOrConnectWithoutSolverInput | DeliverableCreateOrConnectWithoutSolverInput[]
    createMany?: DeliverableCreateManySolverInputEnvelope
    connect?: DeliverableWhereUniqueInput | DeliverableWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutSenderInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutReviewerInput = {
    create?: XOR<ReviewCreateWithoutReviewerInput, ReviewUncheckedCreateWithoutReviewerInput> | ReviewCreateWithoutReviewerInput[] | ReviewUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutReviewerInput | ReviewCreateOrConnectWithoutReviewerInput[]
    createMany?: ReviewCreateManyReviewerInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutRevieweeInput = {
    create?: XOR<ReviewCreateWithoutRevieweeInput, ReviewUncheckedCreateWithoutRevieweeInput> | ReviewCreateWithoutRevieweeInput[] | ReviewUncheckedCreateWithoutRevieweeInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutRevieweeInput | ReviewCreateOrConnectWithoutRevieweeInput[]
    createMany?: ReviewCreateManyRevieweeInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type DisputeCreateNestedManyWithoutInitiatorInput = {
    create?: XOR<DisputeCreateWithoutInitiatorInput, DisputeUncheckedCreateWithoutInitiatorInput> | DisputeCreateWithoutInitiatorInput[] | DisputeUncheckedCreateWithoutInitiatorInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutInitiatorInput | DisputeCreateOrConnectWithoutInitiatorInput[]
    createMany?: DisputeCreateManyInitiatorInputEnvelope
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutPosterInput = {
    create?: XOR<TaskCreateWithoutPosterInput, TaskUncheckedCreateWithoutPosterInput> | TaskCreateWithoutPosterInput[] | TaskUncheckedCreateWithoutPosterInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutPosterInput | TaskCreateOrConnectWithoutPosterInput[]
    createMany?: TaskCreateManyPosterInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type BidUncheckedCreateNestedManyWithoutSolverInput = {
    create?: XOR<BidCreateWithoutSolverInput, BidUncheckedCreateWithoutSolverInput> | BidCreateWithoutSolverInput[] | BidUncheckedCreateWithoutSolverInput[]
    connectOrCreate?: BidCreateOrConnectWithoutSolverInput | BidCreateOrConnectWithoutSolverInput[]
    createMany?: BidCreateManySolverInputEnvelope
    connect?: BidWhereUniqueInput | BidWhereUniqueInput[]
  }

  export type DeliverableUncheckedCreateNestedManyWithoutSolverInput = {
    create?: XOR<DeliverableCreateWithoutSolverInput, DeliverableUncheckedCreateWithoutSolverInput> | DeliverableCreateWithoutSolverInput[] | DeliverableUncheckedCreateWithoutSolverInput[]
    connectOrCreate?: DeliverableCreateOrConnectWithoutSolverInput | DeliverableCreateOrConnectWithoutSolverInput[]
    createMany?: DeliverableCreateManySolverInputEnvelope
    connect?: DeliverableWhereUniqueInput | DeliverableWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutReviewerInput = {
    create?: XOR<ReviewCreateWithoutReviewerInput, ReviewUncheckedCreateWithoutReviewerInput> | ReviewCreateWithoutReviewerInput[] | ReviewUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutReviewerInput | ReviewCreateOrConnectWithoutReviewerInput[]
    createMany?: ReviewCreateManyReviewerInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutRevieweeInput = {
    create?: XOR<ReviewCreateWithoutRevieweeInput, ReviewUncheckedCreateWithoutRevieweeInput> | ReviewCreateWithoutRevieweeInput[] | ReviewUncheckedCreateWithoutRevieweeInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutRevieweeInput | ReviewCreateOrConnectWithoutRevieweeInput[]
    createMany?: ReviewCreateManyRevieweeInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type DisputeUncheckedCreateNestedManyWithoutInitiatorInput = {
    create?: XOR<DisputeCreateWithoutInitiatorInput, DisputeUncheckedCreateWithoutInitiatorInput> | DisputeCreateWithoutInitiatorInput[] | DisputeUncheckedCreateWithoutInitiatorInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutInitiatorInput | DisputeCreateOrConnectWithoutInitiatorInput[]
    createMany?: DisputeCreateManyInitiatorInputEnvelope
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type TaskUpdateManyWithoutPosterNestedInput = {
    create?: XOR<TaskCreateWithoutPosterInput, TaskUncheckedCreateWithoutPosterInput> | TaskCreateWithoutPosterInput[] | TaskUncheckedCreateWithoutPosterInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutPosterInput | TaskCreateOrConnectWithoutPosterInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutPosterInput | TaskUpsertWithWhereUniqueWithoutPosterInput[]
    createMany?: TaskCreateManyPosterInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutPosterInput | TaskUpdateWithWhereUniqueWithoutPosterInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutPosterInput | TaskUpdateManyWithWhereWithoutPosterInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type BidUpdateManyWithoutSolverNestedInput = {
    create?: XOR<BidCreateWithoutSolverInput, BidUncheckedCreateWithoutSolverInput> | BidCreateWithoutSolverInput[] | BidUncheckedCreateWithoutSolverInput[]
    connectOrCreate?: BidCreateOrConnectWithoutSolverInput | BidCreateOrConnectWithoutSolverInput[]
    upsert?: BidUpsertWithWhereUniqueWithoutSolverInput | BidUpsertWithWhereUniqueWithoutSolverInput[]
    createMany?: BidCreateManySolverInputEnvelope
    set?: BidWhereUniqueInput | BidWhereUniqueInput[]
    disconnect?: BidWhereUniqueInput | BidWhereUniqueInput[]
    delete?: BidWhereUniqueInput | BidWhereUniqueInput[]
    connect?: BidWhereUniqueInput | BidWhereUniqueInput[]
    update?: BidUpdateWithWhereUniqueWithoutSolverInput | BidUpdateWithWhereUniqueWithoutSolverInput[]
    updateMany?: BidUpdateManyWithWhereWithoutSolverInput | BidUpdateManyWithWhereWithoutSolverInput[]
    deleteMany?: BidScalarWhereInput | BidScalarWhereInput[]
  }

  export type DeliverableUpdateManyWithoutSolverNestedInput = {
    create?: XOR<DeliverableCreateWithoutSolverInput, DeliverableUncheckedCreateWithoutSolverInput> | DeliverableCreateWithoutSolverInput[] | DeliverableUncheckedCreateWithoutSolverInput[]
    connectOrCreate?: DeliverableCreateOrConnectWithoutSolverInput | DeliverableCreateOrConnectWithoutSolverInput[]
    upsert?: DeliverableUpsertWithWhereUniqueWithoutSolverInput | DeliverableUpsertWithWhereUniqueWithoutSolverInput[]
    createMany?: DeliverableCreateManySolverInputEnvelope
    set?: DeliverableWhereUniqueInput | DeliverableWhereUniqueInput[]
    disconnect?: DeliverableWhereUniqueInput | DeliverableWhereUniqueInput[]
    delete?: DeliverableWhereUniqueInput | DeliverableWhereUniqueInput[]
    connect?: DeliverableWhereUniqueInput | DeliverableWhereUniqueInput[]
    update?: DeliverableUpdateWithWhereUniqueWithoutSolverInput | DeliverableUpdateWithWhereUniqueWithoutSolverInput[]
    updateMany?: DeliverableUpdateManyWithWhereWithoutSolverInput | DeliverableUpdateManyWithWhereWithoutSolverInput[]
    deleteMany?: DeliverableScalarWhereInput | DeliverableScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutSenderNestedInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSenderInput | MessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSenderInput | MessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSenderInput | MessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutReviewerNestedInput = {
    create?: XOR<ReviewCreateWithoutReviewerInput, ReviewUncheckedCreateWithoutReviewerInput> | ReviewCreateWithoutReviewerInput[] | ReviewUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutReviewerInput | ReviewCreateOrConnectWithoutReviewerInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutReviewerInput | ReviewUpsertWithWhereUniqueWithoutReviewerInput[]
    createMany?: ReviewCreateManyReviewerInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutReviewerInput | ReviewUpdateWithWhereUniqueWithoutReviewerInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutReviewerInput | ReviewUpdateManyWithWhereWithoutReviewerInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutRevieweeNestedInput = {
    create?: XOR<ReviewCreateWithoutRevieweeInput, ReviewUncheckedCreateWithoutRevieweeInput> | ReviewCreateWithoutRevieweeInput[] | ReviewUncheckedCreateWithoutRevieweeInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutRevieweeInput | ReviewCreateOrConnectWithoutRevieweeInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutRevieweeInput | ReviewUpsertWithWhereUniqueWithoutRevieweeInput[]
    createMany?: ReviewCreateManyRevieweeInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutRevieweeInput | ReviewUpdateWithWhereUniqueWithoutRevieweeInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutRevieweeInput | ReviewUpdateManyWithWhereWithoutRevieweeInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type DisputeUpdateManyWithoutInitiatorNestedInput = {
    create?: XOR<DisputeCreateWithoutInitiatorInput, DisputeUncheckedCreateWithoutInitiatorInput> | DisputeCreateWithoutInitiatorInput[] | DisputeUncheckedCreateWithoutInitiatorInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutInitiatorInput | DisputeCreateOrConnectWithoutInitiatorInput[]
    upsert?: DisputeUpsertWithWhereUniqueWithoutInitiatorInput | DisputeUpsertWithWhereUniqueWithoutInitiatorInput[]
    createMany?: DisputeCreateManyInitiatorInputEnvelope
    set?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    disconnect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    delete?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    update?: DisputeUpdateWithWhereUniqueWithoutInitiatorInput | DisputeUpdateWithWhereUniqueWithoutInitiatorInput[]
    updateMany?: DisputeUpdateManyWithWhereWithoutInitiatorInput | DisputeUpdateManyWithWhereWithoutInitiatorInput[]
    deleteMany?: DisputeScalarWhereInput | DisputeScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutPosterNestedInput = {
    create?: XOR<TaskCreateWithoutPosterInput, TaskUncheckedCreateWithoutPosterInput> | TaskCreateWithoutPosterInput[] | TaskUncheckedCreateWithoutPosterInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutPosterInput | TaskCreateOrConnectWithoutPosterInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutPosterInput | TaskUpsertWithWhereUniqueWithoutPosterInput[]
    createMany?: TaskCreateManyPosterInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutPosterInput | TaskUpdateWithWhereUniqueWithoutPosterInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutPosterInput | TaskUpdateManyWithWhereWithoutPosterInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type BidUncheckedUpdateManyWithoutSolverNestedInput = {
    create?: XOR<BidCreateWithoutSolverInput, BidUncheckedCreateWithoutSolverInput> | BidCreateWithoutSolverInput[] | BidUncheckedCreateWithoutSolverInput[]
    connectOrCreate?: BidCreateOrConnectWithoutSolverInput | BidCreateOrConnectWithoutSolverInput[]
    upsert?: BidUpsertWithWhereUniqueWithoutSolverInput | BidUpsertWithWhereUniqueWithoutSolverInput[]
    createMany?: BidCreateManySolverInputEnvelope
    set?: BidWhereUniqueInput | BidWhereUniqueInput[]
    disconnect?: BidWhereUniqueInput | BidWhereUniqueInput[]
    delete?: BidWhereUniqueInput | BidWhereUniqueInput[]
    connect?: BidWhereUniqueInput | BidWhereUniqueInput[]
    update?: BidUpdateWithWhereUniqueWithoutSolverInput | BidUpdateWithWhereUniqueWithoutSolverInput[]
    updateMany?: BidUpdateManyWithWhereWithoutSolverInput | BidUpdateManyWithWhereWithoutSolverInput[]
    deleteMany?: BidScalarWhereInput | BidScalarWhereInput[]
  }

  export type DeliverableUncheckedUpdateManyWithoutSolverNestedInput = {
    create?: XOR<DeliverableCreateWithoutSolverInput, DeliverableUncheckedCreateWithoutSolverInput> | DeliverableCreateWithoutSolverInput[] | DeliverableUncheckedCreateWithoutSolverInput[]
    connectOrCreate?: DeliverableCreateOrConnectWithoutSolverInput | DeliverableCreateOrConnectWithoutSolverInput[]
    upsert?: DeliverableUpsertWithWhereUniqueWithoutSolverInput | DeliverableUpsertWithWhereUniqueWithoutSolverInput[]
    createMany?: DeliverableCreateManySolverInputEnvelope
    set?: DeliverableWhereUniqueInput | DeliverableWhereUniqueInput[]
    disconnect?: DeliverableWhereUniqueInput | DeliverableWhereUniqueInput[]
    delete?: DeliverableWhereUniqueInput | DeliverableWhereUniqueInput[]
    connect?: DeliverableWhereUniqueInput | DeliverableWhereUniqueInput[]
    update?: DeliverableUpdateWithWhereUniqueWithoutSolverInput | DeliverableUpdateWithWhereUniqueWithoutSolverInput[]
    updateMany?: DeliverableUpdateManyWithWhereWithoutSolverInput | DeliverableUpdateManyWithWhereWithoutSolverInput[]
    deleteMany?: DeliverableScalarWhereInput | DeliverableScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSenderInput | MessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSenderInput | MessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSenderInput | MessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutReviewerNestedInput = {
    create?: XOR<ReviewCreateWithoutReviewerInput, ReviewUncheckedCreateWithoutReviewerInput> | ReviewCreateWithoutReviewerInput[] | ReviewUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutReviewerInput | ReviewCreateOrConnectWithoutReviewerInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutReviewerInput | ReviewUpsertWithWhereUniqueWithoutReviewerInput[]
    createMany?: ReviewCreateManyReviewerInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutReviewerInput | ReviewUpdateWithWhereUniqueWithoutReviewerInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutReviewerInput | ReviewUpdateManyWithWhereWithoutReviewerInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutRevieweeNestedInput = {
    create?: XOR<ReviewCreateWithoutRevieweeInput, ReviewUncheckedCreateWithoutRevieweeInput> | ReviewCreateWithoutRevieweeInput[] | ReviewUncheckedCreateWithoutRevieweeInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutRevieweeInput | ReviewCreateOrConnectWithoutRevieweeInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutRevieweeInput | ReviewUpsertWithWhereUniqueWithoutRevieweeInput[]
    createMany?: ReviewCreateManyRevieweeInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutRevieweeInput | ReviewUpdateWithWhereUniqueWithoutRevieweeInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutRevieweeInput | ReviewUpdateManyWithWhereWithoutRevieweeInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type DisputeUncheckedUpdateManyWithoutInitiatorNestedInput = {
    create?: XOR<DisputeCreateWithoutInitiatorInput, DisputeUncheckedCreateWithoutInitiatorInput> | DisputeCreateWithoutInitiatorInput[] | DisputeUncheckedCreateWithoutInitiatorInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutInitiatorInput | DisputeCreateOrConnectWithoutInitiatorInput[]
    upsert?: DisputeUpsertWithWhereUniqueWithoutInitiatorInput | DisputeUpsertWithWhereUniqueWithoutInitiatorInput[]
    createMany?: DisputeCreateManyInitiatorInputEnvelope
    set?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    disconnect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    delete?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    update?: DisputeUpdateWithWhereUniqueWithoutInitiatorInput | DisputeUpdateWithWhereUniqueWithoutInitiatorInput[]
    updateMany?: DisputeUpdateManyWithWhereWithoutInitiatorInput | DisputeUpdateManyWithWhereWithoutInitiatorInput[]
    deleteMany?: DisputeScalarWhereInput | DisputeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPostedTasksInput = {
    create?: XOR<UserCreateWithoutPostedTasksInput, UserUncheckedCreateWithoutPostedTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostedTasksInput
    connect?: UserWhereUniqueInput
  }

  export type BidCreateNestedOneWithoutAcceptedTaskInput = {
    create?: XOR<BidCreateWithoutAcceptedTaskInput, BidUncheckedCreateWithoutAcceptedTaskInput>
    connectOrCreate?: BidCreateOrConnectWithoutAcceptedTaskInput
    connect?: BidWhereUniqueInput
  }

  export type BidCreateNestedManyWithoutTaskInput = {
    create?: XOR<BidCreateWithoutTaskInput, BidUncheckedCreateWithoutTaskInput> | BidCreateWithoutTaskInput[] | BidUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: BidCreateOrConnectWithoutTaskInput | BidCreateOrConnectWithoutTaskInput[]
    createMany?: BidCreateManyTaskInputEnvelope
    connect?: BidWhereUniqueInput | BidWhereUniqueInput[]
  }

  export type DeliverableCreateNestedManyWithoutTaskInput = {
    create?: XOR<DeliverableCreateWithoutTaskInput, DeliverableUncheckedCreateWithoutTaskInput> | DeliverableCreateWithoutTaskInput[] | DeliverableUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: DeliverableCreateOrConnectWithoutTaskInput | DeliverableCreateOrConnectWithoutTaskInput[]
    createMany?: DeliverableCreateManyTaskInputEnvelope
    connect?: DeliverableWhereUniqueInput | DeliverableWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutTaskInput = {
    create?: XOR<ReviewCreateWithoutTaskInput, ReviewUncheckedCreateWithoutTaskInput> | ReviewCreateWithoutTaskInput[] | ReviewUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutTaskInput | ReviewCreateOrConnectWithoutTaskInput[]
    createMany?: ReviewCreateManyTaskInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type DisputeCreateNestedManyWithoutTaskInput = {
    create?: XOR<DisputeCreateWithoutTaskInput, DisputeUncheckedCreateWithoutTaskInput> | DisputeCreateWithoutTaskInput[] | DisputeUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutTaskInput | DisputeCreateOrConnectWithoutTaskInput[]
    createMany?: DisputeCreateManyTaskInputEnvelope
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutTaskInput = {
    create?: XOR<MessageCreateWithoutTaskInput, MessageUncheckedCreateWithoutTaskInput> | MessageCreateWithoutTaskInput[] | MessageUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutTaskInput | MessageCreateOrConnectWithoutTaskInput[]
    createMany?: MessageCreateManyTaskInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type BidUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<BidCreateWithoutTaskInput, BidUncheckedCreateWithoutTaskInput> | BidCreateWithoutTaskInput[] | BidUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: BidCreateOrConnectWithoutTaskInput | BidCreateOrConnectWithoutTaskInput[]
    createMany?: BidCreateManyTaskInputEnvelope
    connect?: BidWhereUniqueInput | BidWhereUniqueInput[]
  }

  export type DeliverableUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<DeliverableCreateWithoutTaskInput, DeliverableUncheckedCreateWithoutTaskInput> | DeliverableCreateWithoutTaskInput[] | DeliverableUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: DeliverableCreateOrConnectWithoutTaskInput | DeliverableCreateOrConnectWithoutTaskInput[]
    createMany?: DeliverableCreateManyTaskInputEnvelope
    connect?: DeliverableWhereUniqueInput | DeliverableWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<ReviewCreateWithoutTaskInput, ReviewUncheckedCreateWithoutTaskInput> | ReviewCreateWithoutTaskInput[] | ReviewUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutTaskInput | ReviewCreateOrConnectWithoutTaskInput[]
    createMany?: ReviewCreateManyTaskInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type DisputeUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<DisputeCreateWithoutTaskInput, DisputeUncheckedCreateWithoutTaskInput> | DisputeCreateWithoutTaskInput[] | DisputeUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutTaskInput | DisputeCreateOrConnectWithoutTaskInput[]
    createMany?: DisputeCreateManyTaskInputEnvelope
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<MessageCreateWithoutTaskInput, MessageUncheckedCreateWithoutTaskInput> | MessageCreateWithoutTaskInput[] | MessageUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutTaskInput | MessageCreateOrConnectWithoutTaskInput[]
    createMany?: MessageCreateManyTaskInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutPostedTasksNestedInput = {
    create?: XOR<UserCreateWithoutPostedTasksInput, UserUncheckedCreateWithoutPostedTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostedTasksInput
    upsert?: UserUpsertWithoutPostedTasksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPostedTasksInput, UserUpdateWithoutPostedTasksInput>, UserUncheckedUpdateWithoutPostedTasksInput>
  }

  export type BidUpdateOneWithoutAcceptedTaskNestedInput = {
    create?: XOR<BidCreateWithoutAcceptedTaskInput, BidUncheckedCreateWithoutAcceptedTaskInput>
    connectOrCreate?: BidCreateOrConnectWithoutAcceptedTaskInput
    upsert?: BidUpsertWithoutAcceptedTaskInput
    disconnect?: BidWhereInput | boolean
    delete?: BidWhereInput | boolean
    connect?: BidWhereUniqueInput
    update?: XOR<XOR<BidUpdateToOneWithWhereWithoutAcceptedTaskInput, BidUpdateWithoutAcceptedTaskInput>, BidUncheckedUpdateWithoutAcceptedTaskInput>
  }

  export type BidUpdateManyWithoutTaskNestedInput = {
    create?: XOR<BidCreateWithoutTaskInput, BidUncheckedCreateWithoutTaskInput> | BidCreateWithoutTaskInput[] | BidUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: BidCreateOrConnectWithoutTaskInput | BidCreateOrConnectWithoutTaskInput[]
    upsert?: BidUpsertWithWhereUniqueWithoutTaskInput | BidUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: BidCreateManyTaskInputEnvelope
    set?: BidWhereUniqueInput | BidWhereUniqueInput[]
    disconnect?: BidWhereUniqueInput | BidWhereUniqueInput[]
    delete?: BidWhereUniqueInput | BidWhereUniqueInput[]
    connect?: BidWhereUniqueInput | BidWhereUniqueInput[]
    update?: BidUpdateWithWhereUniqueWithoutTaskInput | BidUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: BidUpdateManyWithWhereWithoutTaskInput | BidUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: BidScalarWhereInput | BidScalarWhereInput[]
  }

  export type DeliverableUpdateManyWithoutTaskNestedInput = {
    create?: XOR<DeliverableCreateWithoutTaskInput, DeliverableUncheckedCreateWithoutTaskInput> | DeliverableCreateWithoutTaskInput[] | DeliverableUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: DeliverableCreateOrConnectWithoutTaskInput | DeliverableCreateOrConnectWithoutTaskInput[]
    upsert?: DeliverableUpsertWithWhereUniqueWithoutTaskInput | DeliverableUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: DeliverableCreateManyTaskInputEnvelope
    set?: DeliverableWhereUniqueInput | DeliverableWhereUniqueInput[]
    disconnect?: DeliverableWhereUniqueInput | DeliverableWhereUniqueInput[]
    delete?: DeliverableWhereUniqueInput | DeliverableWhereUniqueInput[]
    connect?: DeliverableWhereUniqueInput | DeliverableWhereUniqueInput[]
    update?: DeliverableUpdateWithWhereUniqueWithoutTaskInput | DeliverableUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: DeliverableUpdateManyWithWhereWithoutTaskInput | DeliverableUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: DeliverableScalarWhereInput | DeliverableScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutTaskNestedInput = {
    create?: XOR<ReviewCreateWithoutTaskInput, ReviewUncheckedCreateWithoutTaskInput> | ReviewCreateWithoutTaskInput[] | ReviewUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutTaskInput | ReviewCreateOrConnectWithoutTaskInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutTaskInput | ReviewUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: ReviewCreateManyTaskInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutTaskInput | ReviewUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutTaskInput | ReviewUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type DisputeUpdateManyWithoutTaskNestedInput = {
    create?: XOR<DisputeCreateWithoutTaskInput, DisputeUncheckedCreateWithoutTaskInput> | DisputeCreateWithoutTaskInput[] | DisputeUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutTaskInput | DisputeCreateOrConnectWithoutTaskInput[]
    upsert?: DisputeUpsertWithWhereUniqueWithoutTaskInput | DisputeUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: DisputeCreateManyTaskInputEnvelope
    set?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    disconnect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    delete?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    update?: DisputeUpdateWithWhereUniqueWithoutTaskInput | DisputeUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: DisputeUpdateManyWithWhereWithoutTaskInput | DisputeUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: DisputeScalarWhereInput | DisputeScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutTaskNestedInput = {
    create?: XOR<MessageCreateWithoutTaskInput, MessageUncheckedCreateWithoutTaskInput> | MessageCreateWithoutTaskInput[] | MessageUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutTaskInput | MessageCreateOrConnectWithoutTaskInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutTaskInput | MessageUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: MessageCreateManyTaskInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutTaskInput | MessageUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutTaskInput | MessageUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type BidUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<BidCreateWithoutTaskInput, BidUncheckedCreateWithoutTaskInput> | BidCreateWithoutTaskInput[] | BidUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: BidCreateOrConnectWithoutTaskInput | BidCreateOrConnectWithoutTaskInput[]
    upsert?: BidUpsertWithWhereUniqueWithoutTaskInput | BidUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: BidCreateManyTaskInputEnvelope
    set?: BidWhereUniqueInput | BidWhereUniqueInput[]
    disconnect?: BidWhereUniqueInput | BidWhereUniqueInput[]
    delete?: BidWhereUniqueInput | BidWhereUniqueInput[]
    connect?: BidWhereUniqueInput | BidWhereUniqueInput[]
    update?: BidUpdateWithWhereUniqueWithoutTaskInput | BidUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: BidUpdateManyWithWhereWithoutTaskInput | BidUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: BidScalarWhereInput | BidScalarWhereInput[]
  }

  export type DeliverableUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<DeliverableCreateWithoutTaskInput, DeliverableUncheckedCreateWithoutTaskInput> | DeliverableCreateWithoutTaskInput[] | DeliverableUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: DeliverableCreateOrConnectWithoutTaskInput | DeliverableCreateOrConnectWithoutTaskInput[]
    upsert?: DeliverableUpsertWithWhereUniqueWithoutTaskInput | DeliverableUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: DeliverableCreateManyTaskInputEnvelope
    set?: DeliverableWhereUniqueInput | DeliverableWhereUniqueInput[]
    disconnect?: DeliverableWhereUniqueInput | DeliverableWhereUniqueInput[]
    delete?: DeliverableWhereUniqueInput | DeliverableWhereUniqueInput[]
    connect?: DeliverableWhereUniqueInput | DeliverableWhereUniqueInput[]
    update?: DeliverableUpdateWithWhereUniqueWithoutTaskInput | DeliverableUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: DeliverableUpdateManyWithWhereWithoutTaskInput | DeliverableUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: DeliverableScalarWhereInput | DeliverableScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<ReviewCreateWithoutTaskInput, ReviewUncheckedCreateWithoutTaskInput> | ReviewCreateWithoutTaskInput[] | ReviewUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutTaskInput | ReviewCreateOrConnectWithoutTaskInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutTaskInput | ReviewUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: ReviewCreateManyTaskInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutTaskInput | ReviewUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutTaskInput | ReviewUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type DisputeUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<DisputeCreateWithoutTaskInput, DisputeUncheckedCreateWithoutTaskInput> | DisputeCreateWithoutTaskInput[] | DisputeUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutTaskInput | DisputeCreateOrConnectWithoutTaskInput[]
    upsert?: DisputeUpsertWithWhereUniqueWithoutTaskInput | DisputeUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: DisputeCreateManyTaskInputEnvelope
    set?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    disconnect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    delete?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    update?: DisputeUpdateWithWhereUniqueWithoutTaskInput | DisputeUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: DisputeUpdateManyWithWhereWithoutTaskInput | DisputeUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: DisputeScalarWhereInput | DisputeScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<MessageCreateWithoutTaskInput, MessageUncheckedCreateWithoutTaskInput> | MessageCreateWithoutTaskInput[] | MessageUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutTaskInput | MessageCreateOrConnectWithoutTaskInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutTaskInput | MessageUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: MessageCreateManyTaskInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutTaskInput | MessageUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutTaskInput | MessageUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type TaskCreateNestedOneWithoutBidsInput = {
    create?: XOR<TaskCreateWithoutBidsInput, TaskUncheckedCreateWithoutBidsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutBidsInput
    connect?: TaskWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutBidsInput = {
    create?: XOR<UserCreateWithoutBidsInput, UserUncheckedCreateWithoutBidsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBidsInput
    connect?: UserWhereUniqueInput
  }

  export type TaskCreateNestedOneWithoutAcceptedBidInput = {
    create?: XOR<TaskCreateWithoutAcceptedBidInput, TaskUncheckedCreateWithoutAcceptedBidInput>
    connectOrCreate?: TaskCreateOrConnectWithoutAcceptedBidInput
    connect?: TaskWhereUniqueInput
  }

  export type TaskUncheckedCreateNestedOneWithoutAcceptedBidInput = {
    create?: XOR<TaskCreateWithoutAcceptedBidInput, TaskUncheckedCreateWithoutAcceptedBidInput>
    connectOrCreate?: TaskCreateOrConnectWithoutAcceptedBidInput
    connect?: TaskWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutBidsNestedInput = {
    create?: XOR<TaskCreateWithoutBidsInput, TaskUncheckedCreateWithoutBidsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutBidsInput
    upsert?: TaskUpsertWithoutBidsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutBidsInput, TaskUpdateWithoutBidsInput>, TaskUncheckedUpdateWithoutBidsInput>
  }

  export type UserUpdateOneRequiredWithoutBidsNestedInput = {
    create?: XOR<UserCreateWithoutBidsInput, UserUncheckedCreateWithoutBidsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBidsInput
    upsert?: UserUpsertWithoutBidsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBidsInput, UserUpdateWithoutBidsInput>, UserUncheckedUpdateWithoutBidsInput>
  }

  export type TaskUpdateOneWithoutAcceptedBidNestedInput = {
    create?: XOR<TaskCreateWithoutAcceptedBidInput, TaskUncheckedCreateWithoutAcceptedBidInput>
    connectOrCreate?: TaskCreateOrConnectWithoutAcceptedBidInput
    upsert?: TaskUpsertWithoutAcceptedBidInput
    disconnect?: TaskWhereInput | boolean
    delete?: TaskWhereInput | boolean
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutAcceptedBidInput, TaskUpdateWithoutAcceptedBidInput>, TaskUncheckedUpdateWithoutAcceptedBidInput>
  }

  export type TaskUncheckedUpdateOneWithoutAcceptedBidNestedInput = {
    create?: XOR<TaskCreateWithoutAcceptedBidInput, TaskUncheckedCreateWithoutAcceptedBidInput>
    connectOrCreate?: TaskCreateOrConnectWithoutAcceptedBidInput
    upsert?: TaskUpsertWithoutAcceptedBidInput
    disconnect?: TaskWhereInput | boolean
    delete?: TaskWhereInput | boolean
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutAcceptedBidInput, TaskUpdateWithoutAcceptedBidInput>, TaskUncheckedUpdateWithoutAcceptedBidInput>
  }

  export type TaskCreateNestedOneWithoutDeliverablesInput = {
    create?: XOR<TaskCreateWithoutDeliverablesInput, TaskUncheckedCreateWithoutDeliverablesInput>
    connectOrCreate?: TaskCreateOrConnectWithoutDeliverablesInput
    connect?: TaskWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDeliverablesInput = {
    create?: XOR<UserCreateWithoutDeliverablesInput, UserUncheckedCreateWithoutDeliverablesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDeliverablesInput
    connect?: UserWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutDeliverablesNestedInput = {
    create?: XOR<TaskCreateWithoutDeliverablesInput, TaskUncheckedCreateWithoutDeliverablesInput>
    connectOrCreate?: TaskCreateOrConnectWithoutDeliverablesInput
    upsert?: TaskUpsertWithoutDeliverablesInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutDeliverablesInput, TaskUpdateWithoutDeliverablesInput>, TaskUncheckedUpdateWithoutDeliverablesInput>
  }

  export type UserUpdateOneRequiredWithoutDeliverablesNestedInput = {
    create?: XOR<UserCreateWithoutDeliverablesInput, UserUncheckedCreateWithoutDeliverablesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDeliverablesInput
    upsert?: UserUpsertWithoutDeliverablesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDeliverablesInput, UserUpdateWithoutDeliverablesInput>, UserUncheckedUpdateWithoutDeliverablesInput>
  }

  export type TaskCreateNestedOneWithoutReviewsInput = {
    create?: XOR<TaskCreateWithoutReviewsInput, TaskUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutReviewsInput
    connect?: TaskWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutGivenReviewsInput = {
    create?: XOR<UserCreateWithoutGivenReviewsInput, UserUncheckedCreateWithoutGivenReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGivenReviewsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReceivedReviewsInput = {
    create?: XOR<UserCreateWithoutReceivedReviewsInput, UserUncheckedCreateWithoutReceivedReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedReviewsInput
    connect?: UserWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<TaskCreateWithoutReviewsInput, TaskUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutReviewsInput
    upsert?: TaskUpsertWithoutReviewsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutReviewsInput, TaskUpdateWithoutReviewsInput>, TaskUncheckedUpdateWithoutReviewsInput>
  }

  export type UserUpdateOneRequiredWithoutGivenReviewsNestedInput = {
    create?: XOR<UserCreateWithoutGivenReviewsInput, UserUncheckedCreateWithoutGivenReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGivenReviewsInput
    upsert?: UserUpsertWithoutGivenReviewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGivenReviewsInput, UserUpdateWithoutGivenReviewsInput>, UserUncheckedUpdateWithoutGivenReviewsInput>
  }

  export type UserUpdateOneRequiredWithoutReceivedReviewsNestedInput = {
    create?: XOR<UserCreateWithoutReceivedReviewsInput, UserUncheckedCreateWithoutReceivedReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedReviewsInput
    upsert?: UserUpsertWithoutReceivedReviewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceivedReviewsInput, UserUpdateWithoutReceivedReviewsInput>, UserUncheckedUpdateWithoutReceivedReviewsInput>
  }

  export type TaskCreateNestedOneWithoutDisputesInput = {
    create?: XOR<TaskCreateWithoutDisputesInput, TaskUncheckedCreateWithoutDisputesInput>
    connectOrCreate?: TaskCreateOrConnectWithoutDisputesInput
    connect?: TaskWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutInitiatedDisputesInput = {
    create?: XOR<UserCreateWithoutInitiatedDisputesInput, UserUncheckedCreateWithoutInitiatedDisputesInput>
    connectOrCreate?: UserCreateOrConnectWithoutInitiatedDisputesInput
    connect?: UserWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutDisputesNestedInput = {
    create?: XOR<TaskCreateWithoutDisputesInput, TaskUncheckedCreateWithoutDisputesInput>
    connectOrCreate?: TaskCreateOrConnectWithoutDisputesInput
    upsert?: TaskUpsertWithoutDisputesInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutDisputesInput, TaskUpdateWithoutDisputesInput>, TaskUncheckedUpdateWithoutDisputesInput>
  }

  export type UserUpdateOneRequiredWithoutInitiatedDisputesNestedInput = {
    create?: XOR<UserCreateWithoutInitiatedDisputesInput, UserUncheckedCreateWithoutInitiatedDisputesInput>
    connectOrCreate?: UserCreateOrConnectWithoutInitiatedDisputesInput
    upsert?: UserUpsertWithoutInitiatedDisputesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInitiatedDisputesInput, UserUpdateWithoutInitiatedDisputesInput>, UserUncheckedUpdateWithoutInitiatedDisputesInput>
  }

  export type TaskCreateNestedOneWithoutMessagesInput = {
    create?: XOR<TaskCreateWithoutMessagesInput, TaskUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: TaskCreateOrConnectWithoutMessagesInput
    connect?: TaskWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSentMessagesInput = {
    create?: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<TaskCreateWithoutMessagesInput, TaskUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: TaskCreateOrConnectWithoutMessagesInput
    upsert?: TaskUpsertWithoutMessagesInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutMessagesInput, TaskUpdateWithoutMessagesInput>, TaskUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateOneRequiredWithoutSentMessagesNestedInput = {
    create?: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentMessagesInput
    upsert?: UserUpsertWithoutSentMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentMessagesInput, UserUpdateWithoutSentMessagesInput>, UserUncheckedUpdateWithoutSentMessagesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TaskCreateWithoutPosterInput = {
    id?: string
    title: string
    description: string
    category: string
    academicLevel: string
    budgetMin: number
    budgetMax: number
    deadline: Date | string
    status?: string
    revisionCount?: number
    platformFee?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    acceptedBid?: BidCreateNestedOneWithoutAcceptedTaskInput
    bids?: BidCreateNestedManyWithoutTaskInput
    deliverables?: DeliverableCreateNestedManyWithoutTaskInput
    reviews?: ReviewCreateNestedManyWithoutTaskInput
    disputes?: DisputeCreateNestedManyWithoutTaskInput
    messages?: MessageCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutPosterInput = {
    id?: string
    title: string
    description: string
    category: string
    academicLevel: string
    budgetMin: number
    budgetMax: number
    deadline: Date | string
    status?: string
    acceptedBidId?: string | null
    revisionCount?: number
    platformFee?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    bids?: BidUncheckedCreateNestedManyWithoutTaskInput
    deliverables?: DeliverableUncheckedCreateNestedManyWithoutTaskInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutTaskInput
    disputes?: DisputeUncheckedCreateNestedManyWithoutTaskInput
    messages?: MessageUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutPosterInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutPosterInput, TaskUncheckedCreateWithoutPosterInput>
  }

  export type TaskCreateManyPosterInputEnvelope = {
    data: TaskCreateManyPosterInput | TaskCreateManyPosterInput[]
  }

  export type BidCreateWithoutSolverInput = {
    id?: string
    proposedPrice: number
    deliveryDays: number
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    task: TaskCreateNestedOneWithoutBidsInput
    acceptedTask?: TaskCreateNestedOneWithoutAcceptedBidInput
  }

  export type BidUncheckedCreateWithoutSolverInput = {
    id?: string
    taskId: string
    proposedPrice: number
    deliveryDays: number
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    acceptedTask?: TaskUncheckedCreateNestedOneWithoutAcceptedBidInput
  }

  export type BidCreateOrConnectWithoutSolverInput = {
    where: BidWhereUniqueInput
    create: XOR<BidCreateWithoutSolverInput, BidUncheckedCreateWithoutSolverInput>
  }

  export type BidCreateManySolverInputEnvelope = {
    data: BidCreateManySolverInput | BidCreateManySolverInput[]
  }

  export type DeliverableCreateWithoutSolverInput = {
    id?: string
    content: string
    version?: number
    status?: string
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutDeliverablesInput
  }

  export type DeliverableUncheckedCreateWithoutSolverInput = {
    id?: string
    taskId: string
    content: string
    version?: number
    status?: string
    createdAt?: Date | string
  }

  export type DeliverableCreateOrConnectWithoutSolverInput = {
    where: DeliverableWhereUniqueInput
    create: XOR<DeliverableCreateWithoutSolverInput, DeliverableUncheckedCreateWithoutSolverInput>
  }

  export type DeliverableCreateManySolverInputEnvelope = {
    data: DeliverableCreateManySolverInput | DeliverableCreateManySolverInput[]
  }

  export type MessageCreateWithoutSenderInput = {
    id?: string
    content: string
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutSenderInput = {
    id?: string
    taskId: string
    content: string
    createdAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutSenderInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageCreateManySenderInputEnvelope = {
    data: MessageCreateManySenderInput | MessageCreateManySenderInput[]
  }

  export type ReviewCreateWithoutReviewerInput = {
    id?: string
    rating: number
    comment: string
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutReviewsInput
    reviewee: UserCreateNestedOneWithoutReceivedReviewsInput
  }

  export type ReviewUncheckedCreateWithoutReviewerInput = {
    id?: string
    taskId: string
    revieweeId: string
    rating: number
    comment: string
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutReviewerInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutReviewerInput, ReviewUncheckedCreateWithoutReviewerInput>
  }

  export type ReviewCreateManyReviewerInputEnvelope = {
    data: ReviewCreateManyReviewerInput | ReviewCreateManyReviewerInput[]
  }

  export type ReviewCreateWithoutRevieweeInput = {
    id?: string
    rating: number
    comment: string
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutReviewsInput
    reviewer: UserCreateNestedOneWithoutGivenReviewsInput
  }

  export type ReviewUncheckedCreateWithoutRevieweeInput = {
    id?: string
    taskId: string
    reviewerId: string
    rating: number
    comment: string
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutRevieweeInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutRevieweeInput, ReviewUncheckedCreateWithoutRevieweeInput>
  }

  export type ReviewCreateManyRevieweeInputEnvelope = {
    data: ReviewCreateManyRevieweeInput | ReviewCreateManyRevieweeInput[]
  }

  export type DisputeCreateWithoutInitiatorInput = {
    id?: string
    reason: string
    status?: string
    resolution?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    task: TaskCreateNestedOneWithoutDisputesInput
  }

  export type DisputeUncheckedCreateWithoutInitiatorInput = {
    id?: string
    taskId: string
    reason: string
    status?: string
    resolution?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DisputeCreateOrConnectWithoutInitiatorInput = {
    where: DisputeWhereUniqueInput
    create: XOR<DisputeCreateWithoutInitiatorInput, DisputeUncheckedCreateWithoutInitiatorInput>
  }

  export type DisputeCreateManyInitiatorInputEnvelope = {
    data: DisputeCreateManyInitiatorInput | DisputeCreateManyInitiatorInput[]
  }

  export type TaskUpsertWithWhereUniqueWithoutPosterInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutPosterInput, TaskUncheckedUpdateWithoutPosterInput>
    create: XOR<TaskCreateWithoutPosterInput, TaskUncheckedCreateWithoutPosterInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutPosterInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutPosterInput, TaskUncheckedUpdateWithoutPosterInput>
  }

  export type TaskUpdateManyWithWhereWithoutPosterInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutPosterInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: StringFilter<"Task"> | string
    posterId?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    description?: StringFilter<"Task"> | string
    category?: StringFilter<"Task"> | string
    academicLevel?: StringFilter<"Task"> | string
    budgetMin?: FloatFilter<"Task"> | number
    budgetMax?: FloatFilter<"Task"> | number
    deadline?: DateTimeFilter<"Task"> | Date | string
    status?: StringFilter<"Task"> | string
    acceptedBidId?: StringNullableFilter<"Task"> | string | null
    revisionCount?: IntFilter<"Task"> | number
    platformFee?: FloatFilter<"Task"> | number
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
  }

  export type BidUpsertWithWhereUniqueWithoutSolverInput = {
    where: BidWhereUniqueInput
    update: XOR<BidUpdateWithoutSolverInput, BidUncheckedUpdateWithoutSolverInput>
    create: XOR<BidCreateWithoutSolverInput, BidUncheckedCreateWithoutSolverInput>
  }

  export type BidUpdateWithWhereUniqueWithoutSolverInput = {
    where: BidWhereUniqueInput
    data: XOR<BidUpdateWithoutSolverInput, BidUncheckedUpdateWithoutSolverInput>
  }

  export type BidUpdateManyWithWhereWithoutSolverInput = {
    where: BidScalarWhereInput
    data: XOR<BidUpdateManyMutationInput, BidUncheckedUpdateManyWithoutSolverInput>
  }

  export type BidScalarWhereInput = {
    AND?: BidScalarWhereInput | BidScalarWhereInput[]
    OR?: BidScalarWhereInput[]
    NOT?: BidScalarWhereInput | BidScalarWhereInput[]
    id?: StringFilter<"Bid"> | string
    taskId?: StringFilter<"Bid"> | string
    solverId?: StringFilter<"Bid"> | string
    proposedPrice?: FloatFilter<"Bid"> | number
    deliveryDays?: IntFilter<"Bid"> | number
    message?: StringFilter<"Bid"> | string
    status?: StringFilter<"Bid"> | string
    createdAt?: DateTimeFilter<"Bid"> | Date | string
    updatedAt?: DateTimeFilter<"Bid"> | Date | string
  }

  export type DeliverableUpsertWithWhereUniqueWithoutSolverInput = {
    where: DeliverableWhereUniqueInput
    update: XOR<DeliverableUpdateWithoutSolverInput, DeliverableUncheckedUpdateWithoutSolverInput>
    create: XOR<DeliverableCreateWithoutSolverInput, DeliverableUncheckedCreateWithoutSolverInput>
  }

  export type DeliverableUpdateWithWhereUniqueWithoutSolverInput = {
    where: DeliverableWhereUniqueInput
    data: XOR<DeliverableUpdateWithoutSolverInput, DeliverableUncheckedUpdateWithoutSolverInput>
  }

  export type DeliverableUpdateManyWithWhereWithoutSolverInput = {
    where: DeliverableScalarWhereInput
    data: XOR<DeliverableUpdateManyMutationInput, DeliverableUncheckedUpdateManyWithoutSolverInput>
  }

  export type DeliverableScalarWhereInput = {
    AND?: DeliverableScalarWhereInput | DeliverableScalarWhereInput[]
    OR?: DeliverableScalarWhereInput[]
    NOT?: DeliverableScalarWhereInput | DeliverableScalarWhereInput[]
    id?: StringFilter<"Deliverable"> | string
    taskId?: StringFilter<"Deliverable"> | string
    solverId?: StringFilter<"Deliverable"> | string
    content?: StringFilter<"Deliverable"> | string
    version?: IntFilter<"Deliverable"> | number
    status?: StringFilter<"Deliverable"> | string
    createdAt?: DateTimeFilter<"Deliverable"> | Date | string
  }

  export type MessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
  }

  export type MessageUpdateManyWithWhereWithoutSenderInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutSenderInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    taskId?: StringFilter<"Message"> | string
    senderId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutReviewerInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutReviewerInput, ReviewUncheckedUpdateWithoutReviewerInput>
    create: XOR<ReviewCreateWithoutReviewerInput, ReviewUncheckedCreateWithoutReviewerInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutReviewerInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutReviewerInput, ReviewUncheckedUpdateWithoutReviewerInput>
  }

  export type ReviewUpdateManyWithWhereWithoutReviewerInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutReviewerInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: StringFilter<"Review"> | string
    taskId?: StringFilter<"Review"> | string
    reviewerId?: StringFilter<"Review"> | string
    revieweeId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringFilter<"Review"> | string
    createdAt?: DateTimeFilter<"Review"> | Date | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutRevieweeInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutRevieweeInput, ReviewUncheckedUpdateWithoutRevieweeInput>
    create: XOR<ReviewCreateWithoutRevieweeInput, ReviewUncheckedCreateWithoutRevieweeInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutRevieweeInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutRevieweeInput, ReviewUncheckedUpdateWithoutRevieweeInput>
  }

  export type ReviewUpdateManyWithWhereWithoutRevieweeInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutRevieweeInput>
  }

  export type DisputeUpsertWithWhereUniqueWithoutInitiatorInput = {
    where: DisputeWhereUniqueInput
    update: XOR<DisputeUpdateWithoutInitiatorInput, DisputeUncheckedUpdateWithoutInitiatorInput>
    create: XOR<DisputeCreateWithoutInitiatorInput, DisputeUncheckedCreateWithoutInitiatorInput>
  }

  export type DisputeUpdateWithWhereUniqueWithoutInitiatorInput = {
    where: DisputeWhereUniqueInput
    data: XOR<DisputeUpdateWithoutInitiatorInput, DisputeUncheckedUpdateWithoutInitiatorInput>
  }

  export type DisputeUpdateManyWithWhereWithoutInitiatorInput = {
    where: DisputeScalarWhereInput
    data: XOR<DisputeUpdateManyMutationInput, DisputeUncheckedUpdateManyWithoutInitiatorInput>
  }

  export type DisputeScalarWhereInput = {
    AND?: DisputeScalarWhereInput | DisputeScalarWhereInput[]
    OR?: DisputeScalarWhereInput[]
    NOT?: DisputeScalarWhereInput | DisputeScalarWhereInput[]
    id?: StringFilter<"Dispute"> | string
    taskId?: StringFilter<"Dispute"> | string
    initiatorId?: StringFilter<"Dispute"> | string
    reason?: StringFilter<"Dispute"> | string
    status?: StringFilter<"Dispute"> | string
    resolution?: StringNullableFilter<"Dispute"> | string | null
    createdAt?: DateTimeFilter<"Dispute"> | Date | string
    updatedAt?: DateTimeFilter<"Dispute"> | Date | string
  }

  export type UserCreateWithoutPostedTasksInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    rating?: number
    completedTasks?: number
    totalEarnings?: number
    onTimeRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    bids?: BidCreateNestedManyWithoutSolverInput
    deliverables?: DeliverableCreateNestedManyWithoutSolverInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    givenReviews?: ReviewCreateNestedManyWithoutReviewerInput
    receivedReviews?: ReviewCreateNestedManyWithoutRevieweeInput
    initiatedDisputes?: DisputeCreateNestedManyWithoutInitiatorInput
  }

  export type UserUncheckedCreateWithoutPostedTasksInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    rating?: number
    completedTasks?: number
    totalEarnings?: number
    onTimeRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    bids?: BidUncheckedCreateNestedManyWithoutSolverInput
    deliverables?: DeliverableUncheckedCreateNestedManyWithoutSolverInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    givenReviews?: ReviewUncheckedCreateNestedManyWithoutReviewerInput
    receivedReviews?: ReviewUncheckedCreateNestedManyWithoutRevieweeInput
    initiatedDisputes?: DisputeUncheckedCreateNestedManyWithoutInitiatorInput
  }

  export type UserCreateOrConnectWithoutPostedTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostedTasksInput, UserUncheckedCreateWithoutPostedTasksInput>
  }

  export type BidCreateWithoutAcceptedTaskInput = {
    id?: string
    proposedPrice: number
    deliveryDays: number
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    task: TaskCreateNestedOneWithoutBidsInput
    solver: UserCreateNestedOneWithoutBidsInput
  }

  export type BidUncheckedCreateWithoutAcceptedTaskInput = {
    id?: string
    taskId: string
    solverId: string
    proposedPrice: number
    deliveryDays: number
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BidCreateOrConnectWithoutAcceptedTaskInput = {
    where: BidWhereUniqueInput
    create: XOR<BidCreateWithoutAcceptedTaskInput, BidUncheckedCreateWithoutAcceptedTaskInput>
  }

  export type BidCreateWithoutTaskInput = {
    id?: string
    proposedPrice: number
    deliveryDays: number
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    solver: UserCreateNestedOneWithoutBidsInput
    acceptedTask?: TaskCreateNestedOneWithoutAcceptedBidInput
  }

  export type BidUncheckedCreateWithoutTaskInput = {
    id?: string
    solverId: string
    proposedPrice: number
    deliveryDays: number
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    acceptedTask?: TaskUncheckedCreateNestedOneWithoutAcceptedBidInput
  }

  export type BidCreateOrConnectWithoutTaskInput = {
    where: BidWhereUniqueInput
    create: XOR<BidCreateWithoutTaskInput, BidUncheckedCreateWithoutTaskInput>
  }

  export type BidCreateManyTaskInputEnvelope = {
    data: BidCreateManyTaskInput | BidCreateManyTaskInput[]
  }

  export type DeliverableCreateWithoutTaskInput = {
    id?: string
    content: string
    version?: number
    status?: string
    createdAt?: Date | string
    solver: UserCreateNestedOneWithoutDeliverablesInput
  }

  export type DeliverableUncheckedCreateWithoutTaskInput = {
    id?: string
    solverId: string
    content: string
    version?: number
    status?: string
    createdAt?: Date | string
  }

  export type DeliverableCreateOrConnectWithoutTaskInput = {
    where: DeliverableWhereUniqueInput
    create: XOR<DeliverableCreateWithoutTaskInput, DeliverableUncheckedCreateWithoutTaskInput>
  }

  export type DeliverableCreateManyTaskInputEnvelope = {
    data: DeliverableCreateManyTaskInput | DeliverableCreateManyTaskInput[]
  }

  export type ReviewCreateWithoutTaskInput = {
    id?: string
    rating: number
    comment: string
    createdAt?: Date | string
    reviewer: UserCreateNestedOneWithoutGivenReviewsInput
    reviewee: UserCreateNestedOneWithoutReceivedReviewsInput
  }

  export type ReviewUncheckedCreateWithoutTaskInput = {
    id?: string
    reviewerId: string
    revieweeId: string
    rating: number
    comment: string
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutTaskInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutTaskInput, ReviewUncheckedCreateWithoutTaskInput>
  }

  export type ReviewCreateManyTaskInputEnvelope = {
    data: ReviewCreateManyTaskInput | ReviewCreateManyTaskInput[]
  }

  export type DisputeCreateWithoutTaskInput = {
    id?: string
    reason: string
    status?: string
    resolution?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    initiator: UserCreateNestedOneWithoutInitiatedDisputesInput
  }

  export type DisputeUncheckedCreateWithoutTaskInput = {
    id?: string
    initiatorId: string
    reason: string
    status?: string
    resolution?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DisputeCreateOrConnectWithoutTaskInput = {
    where: DisputeWhereUniqueInput
    create: XOR<DisputeCreateWithoutTaskInput, DisputeUncheckedCreateWithoutTaskInput>
  }

  export type DisputeCreateManyTaskInputEnvelope = {
    data: DisputeCreateManyTaskInput | DisputeCreateManyTaskInput[]
  }

  export type MessageCreateWithoutTaskInput = {
    id?: string
    content: string
    createdAt?: Date | string
    sender: UserCreateNestedOneWithoutSentMessagesInput
  }

  export type MessageUncheckedCreateWithoutTaskInput = {
    id?: string
    senderId: string
    content: string
    createdAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutTaskInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutTaskInput, MessageUncheckedCreateWithoutTaskInput>
  }

  export type MessageCreateManyTaskInputEnvelope = {
    data: MessageCreateManyTaskInput | MessageCreateManyTaskInput[]
  }

  export type UserUpsertWithoutPostedTasksInput = {
    update: XOR<UserUpdateWithoutPostedTasksInput, UserUncheckedUpdateWithoutPostedTasksInput>
    create: XOR<UserCreateWithoutPostedTasksInput, UserUncheckedCreateWithoutPostedTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPostedTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPostedTasksInput, UserUncheckedUpdateWithoutPostedTasksInput>
  }

  export type UserUpdateWithoutPostedTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    completedTasks?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    onTimeRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bids?: BidUpdateManyWithoutSolverNestedInput
    deliverables?: DeliverableUpdateManyWithoutSolverNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    givenReviews?: ReviewUpdateManyWithoutReviewerNestedInput
    receivedReviews?: ReviewUpdateManyWithoutRevieweeNestedInput
    initiatedDisputes?: DisputeUpdateManyWithoutInitiatorNestedInput
  }

  export type UserUncheckedUpdateWithoutPostedTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    completedTasks?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    onTimeRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bids?: BidUncheckedUpdateManyWithoutSolverNestedInput
    deliverables?: DeliverableUncheckedUpdateManyWithoutSolverNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    givenReviews?: ReviewUncheckedUpdateManyWithoutReviewerNestedInput
    receivedReviews?: ReviewUncheckedUpdateManyWithoutRevieweeNestedInput
    initiatedDisputes?: DisputeUncheckedUpdateManyWithoutInitiatorNestedInput
  }

  export type BidUpsertWithoutAcceptedTaskInput = {
    update: XOR<BidUpdateWithoutAcceptedTaskInput, BidUncheckedUpdateWithoutAcceptedTaskInput>
    create: XOR<BidCreateWithoutAcceptedTaskInput, BidUncheckedCreateWithoutAcceptedTaskInput>
    where?: BidWhereInput
  }

  export type BidUpdateToOneWithWhereWithoutAcceptedTaskInput = {
    where?: BidWhereInput
    data: XOR<BidUpdateWithoutAcceptedTaskInput, BidUncheckedUpdateWithoutAcceptedTaskInput>
  }

  export type BidUpdateWithoutAcceptedTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    proposedPrice?: FloatFieldUpdateOperationsInput | number
    deliveryDays?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutBidsNestedInput
    solver?: UserUpdateOneRequiredWithoutBidsNestedInput
  }

  export type BidUncheckedUpdateWithoutAcceptedTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    solverId?: StringFieldUpdateOperationsInput | string
    proposedPrice?: FloatFieldUpdateOperationsInput | number
    deliveryDays?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BidUpsertWithWhereUniqueWithoutTaskInput = {
    where: BidWhereUniqueInput
    update: XOR<BidUpdateWithoutTaskInput, BidUncheckedUpdateWithoutTaskInput>
    create: XOR<BidCreateWithoutTaskInput, BidUncheckedCreateWithoutTaskInput>
  }

  export type BidUpdateWithWhereUniqueWithoutTaskInput = {
    where: BidWhereUniqueInput
    data: XOR<BidUpdateWithoutTaskInput, BidUncheckedUpdateWithoutTaskInput>
  }

  export type BidUpdateManyWithWhereWithoutTaskInput = {
    where: BidScalarWhereInput
    data: XOR<BidUpdateManyMutationInput, BidUncheckedUpdateManyWithoutTaskInput>
  }

  export type DeliverableUpsertWithWhereUniqueWithoutTaskInput = {
    where: DeliverableWhereUniqueInput
    update: XOR<DeliverableUpdateWithoutTaskInput, DeliverableUncheckedUpdateWithoutTaskInput>
    create: XOR<DeliverableCreateWithoutTaskInput, DeliverableUncheckedCreateWithoutTaskInput>
  }

  export type DeliverableUpdateWithWhereUniqueWithoutTaskInput = {
    where: DeliverableWhereUniqueInput
    data: XOR<DeliverableUpdateWithoutTaskInput, DeliverableUncheckedUpdateWithoutTaskInput>
  }

  export type DeliverableUpdateManyWithWhereWithoutTaskInput = {
    where: DeliverableScalarWhereInput
    data: XOR<DeliverableUpdateManyMutationInput, DeliverableUncheckedUpdateManyWithoutTaskInput>
  }

  export type ReviewUpsertWithWhereUniqueWithoutTaskInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutTaskInput, ReviewUncheckedUpdateWithoutTaskInput>
    create: XOR<ReviewCreateWithoutTaskInput, ReviewUncheckedCreateWithoutTaskInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutTaskInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutTaskInput, ReviewUncheckedUpdateWithoutTaskInput>
  }

  export type ReviewUpdateManyWithWhereWithoutTaskInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutTaskInput>
  }

  export type DisputeUpsertWithWhereUniqueWithoutTaskInput = {
    where: DisputeWhereUniqueInput
    update: XOR<DisputeUpdateWithoutTaskInput, DisputeUncheckedUpdateWithoutTaskInput>
    create: XOR<DisputeCreateWithoutTaskInput, DisputeUncheckedCreateWithoutTaskInput>
  }

  export type DisputeUpdateWithWhereUniqueWithoutTaskInput = {
    where: DisputeWhereUniqueInput
    data: XOR<DisputeUpdateWithoutTaskInput, DisputeUncheckedUpdateWithoutTaskInput>
  }

  export type DisputeUpdateManyWithWhereWithoutTaskInput = {
    where: DisputeScalarWhereInput
    data: XOR<DisputeUpdateManyMutationInput, DisputeUncheckedUpdateManyWithoutTaskInput>
  }

  export type MessageUpsertWithWhereUniqueWithoutTaskInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutTaskInput, MessageUncheckedUpdateWithoutTaskInput>
    create: XOR<MessageCreateWithoutTaskInput, MessageUncheckedCreateWithoutTaskInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutTaskInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutTaskInput, MessageUncheckedUpdateWithoutTaskInput>
  }

  export type MessageUpdateManyWithWhereWithoutTaskInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutTaskInput>
  }

  export type TaskCreateWithoutBidsInput = {
    id?: string
    title: string
    description: string
    category: string
    academicLevel: string
    budgetMin: number
    budgetMax: number
    deadline: Date | string
    status?: string
    revisionCount?: number
    platformFee?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    poster: UserCreateNestedOneWithoutPostedTasksInput
    acceptedBid?: BidCreateNestedOneWithoutAcceptedTaskInput
    deliverables?: DeliverableCreateNestedManyWithoutTaskInput
    reviews?: ReviewCreateNestedManyWithoutTaskInput
    disputes?: DisputeCreateNestedManyWithoutTaskInput
    messages?: MessageCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutBidsInput = {
    id?: string
    posterId: string
    title: string
    description: string
    category: string
    academicLevel: string
    budgetMin: number
    budgetMax: number
    deadline: Date | string
    status?: string
    acceptedBidId?: string | null
    revisionCount?: number
    platformFee?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deliverables?: DeliverableUncheckedCreateNestedManyWithoutTaskInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutTaskInput
    disputes?: DisputeUncheckedCreateNestedManyWithoutTaskInput
    messages?: MessageUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutBidsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutBidsInput, TaskUncheckedCreateWithoutBidsInput>
  }

  export type UserCreateWithoutBidsInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    rating?: number
    completedTasks?: number
    totalEarnings?: number
    onTimeRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    postedTasks?: TaskCreateNestedManyWithoutPosterInput
    deliverables?: DeliverableCreateNestedManyWithoutSolverInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    givenReviews?: ReviewCreateNestedManyWithoutReviewerInput
    receivedReviews?: ReviewCreateNestedManyWithoutRevieweeInput
    initiatedDisputes?: DisputeCreateNestedManyWithoutInitiatorInput
  }

  export type UserUncheckedCreateWithoutBidsInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    rating?: number
    completedTasks?: number
    totalEarnings?: number
    onTimeRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    postedTasks?: TaskUncheckedCreateNestedManyWithoutPosterInput
    deliverables?: DeliverableUncheckedCreateNestedManyWithoutSolverInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    givenReviews?: ReviewUncheckedCreateNestedManyWithoutReviewerInput
    receivedReviews?: ReviewUncheckedCreateNestedManyWithoutRevieweeInput
    initiatedDisputes?: DisputeUncheckedCreateNestedManyWithoutInitiatorInput
  }

  export type UserCreateOrConnectWithoutBidsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBidsInput, UserUncheckedCreateWithoutBidsInput>
  }

  export type TaskCreateWithoutAcceptedBidInput = {
    id?: string
    title: string
    description: string
    category: string
    academicLevel: string
    budgetMin: number
    budgetMax: number
    deadline: Date | string
    status?: string
    revisionCount?: number
    platformFee?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    poster: UserCreateNestedOneWithoutPostedTasksInput
    bids?: BidCreateNestedManyWithoutTaskInput
    deliverables?: DeliverableCreateNestedManyWithoutTaskInput
    reviews?: ReviewCreateNestedManyWithoutTaskInput
    disputes?: DisputeCreateNestedManyWithoutTaskInput
    messages?: MessageCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutAcceptedBidInput = {
    id?: string
    posterId: string
    title: string
    description: string
    category: string
    academicLevel: string
    budgetMin: number
    budgetMax: number
    deadline: Date | string
    status?: string
    revisionCount?: number
    platformFee?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    bids?: BidUncheckedCreateNestedManyWithoutTaskInput
    deliverables?: DeliverableUncheckedCreateNestedManyWithoutTaskInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutTaskInput
    disputes?: DisputeUncheckedCreateNestedManyWithoutTaskInput
    messages?: MessageUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutAcceptedBidInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutAcceptedBidInput, TaskUncheckedCreateWithoutAcceptedBidInput>
  }

  export type TaskUpsertWithoutBidsInput = {
    update: XOR<TaskUpdateWithoutBidsInput, TaskUncheckedUpdateWithoutBidsInput>
    create: XOR<TaskCreateWithoutBidsInput, TaskUncheckedCreateWithoutBidsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutBidsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutBidsInput, TaskUncheckedUpdateWithoutBidsInput>
  }

  export type TaskUpdateWithoutBidsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    academicLevel?: StringFieldUpdateOperationsInput | string
    budgetMin?: FloatFieldUpdateOperationsInput | number
    budgetMax?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    revisionCount?: IntFieldUpdateOperationsInput | number
    platformFee?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poster?: UserUpdateOneRequiredWithoutPostedTasksNestedInput
    acceptedBid?: BidUpdateOneWithoutAcceptedTaskNestedInput
    deliverables?: DeliverableUpdateManyWithoutTaskNestedInput
    reviews?: ReviewUpdateManyWithoutTaskNestedInput
    disputes?: DisputeUpdateManyWithoutTaskNestedInput
    messages?: MessageUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutBidsInput = {
    id?: StringFieldUpdateOperationsInput | string
    posterId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    academicLevel?: StringFieldUpdateOperationsInput | string
    budgetMin?: FloatFieldUpdateOperationsInput | number
    budgetMax?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    acceptedBidId?: NullableStringFieldUpdateOperationsInput | string | null
    revisionCount?: IntFieldUpdateOperationsInput | number
    platformFee?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliverables?: DeliverableUncheckedUpdateManyWithoutTaskNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutTaskNestedInput
    disputes?: DisputeUncheckedUpdateManyWithoutTaskNestedInput
    messages?: MessageUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type UserUpsertWithoutBidsInput = {
    update: XOR<UserUpdateWithoutBidsInput, UserUncheckedUpdateWithoutBidsInput>
    create: XOR<UserCreateWithoutBidsInput, UserUncheckedCreateWithoutBidsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBidsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBidsInput, UserUncheckedUpdateWithoutBidsInput>
  }

  export type UserUpdateWithoutBidsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    completedTasks?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    onTimeRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    postedTasks?: TaskUpdateManyWithoutPosterNestedInput
    deliverables?: DeliverableUpdateManyWithoutSolverNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    givenReviews?: ReviewUpdateManyWithoutReviewerNestedInput
    receivedReviews?: ReviewUpdateManyWithoutRevieweeNestedInput
    initiatedDisputes?: DisputeUpdateManyWithoutInitiatorNestedInput
  }

  export type UserUncheckedUpdateWithoutBidsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    completedTasks?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    onTimeRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    postedTasks?: TaskUncheckedUpdateManyWithoutPosterNestedInput
    deliverables?: DeliverableUncheckedUpdateManyWithoutSolverNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    givenReviews?: ReviewUncheckedUpdateManyWithoutReviewerNestedInput
    receivedReviews?: ReviewUncheckedUpdateManyWithoutRevieweeNestedInput
    initiatedDisputes?: DisputeUncheckedUpdateManyWithoutInitiatorNestedInput
  }

  export type TaskUpsertWithoutAcceptedBidInput = {
    update: XOR<TaskUpdateWithoutAcceptedBidInput, TaskUncheckedUpdateWithoutAcceptedBidInput>
    create: XOR<TaskCreateWithoutAcceptedBidInput, TaskUncheckedCreateWithoutAcceptedBidInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutAcceptedBidInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutAcceptedBidInput, TaskUncheckedUpdateWithoutAcceptedBidInput>
  }

  export type TaskUpdateWithoutAcceptedBidInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    academicLevel?: StringFieldUpdateOperationsInput | string
    budgetMin?: FloatFieldUpdateOperationsInput | number
    budgetMax?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    revisionCount?: IntFieldUpdateOperationsInput | number
    platformFee?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poster?: UserUpdateOneRequiredWithoutPostedTasksNestedInput
    bids?: BidUpdateManyWithoutTaskNestedInput
    deliverables?: DeliverableUpdateManyWithoutTaskNestedInput
    reviews?: ReviewUpdateManyWithoutTaskNestedInput
    disputes?: DisputeUpdateManyWithoutTaskNestedInput
    messages?: MessageUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutAcceptedBidInput = {
    id?: StringFieldUpdateOperationsInput | string
    posterId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    academicLevel?: StringFieldUpdateOperationsInput | string
    budgetMin?: FloatFieldUpdateOperationsInput | number
    budgetMax?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    revisionCount?: IntFieldUpdateOperationsInput | number
    platformFee?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bids?: BidUncheckedUpdateManyWithoutTaskNestedInput
    deliverables?: DeliverableUncheckedUpdateManyWithoutTaskNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutTaskNestedInput
    disputes?: DisputeUncheckedUpdateManyWithoutTaskNestedInput
    messages?: MessageUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskCreateWithoutDeliverablesInput = {
    id?: string
    title: string
    description: string
    category: string
    academicLevel: string
    budgetMin: number
    budgetMax: number
    deadline: Date | string
    status?: string
    revisionCount?: number
    platformFee?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    poster: UserCreateNestedOneWithoutPostedTasksInput
    acceptedBid?: BidCreateNestedOneWithoutAcceptedTaskInput
    bids?: BidCreateNestedManyWithoutTaskInput
    reviews?: ReviewCreateNestedManyWithoutTaskInput
    disputes?: DisputeCreateNestedManyWithoutTaskInput
    messages?: MessageCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutDeliverablesInput = {
    id?: string
    posterId: string
    title: string
    description: string
    category: string
    academicLevel: string
    budgetMin: number
    budgetMax: number
    deadline: Date | string
    status?: string
    acceptedBidId?: string | null
    revisionCount?: number
    platformFee?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    bids?: BidUncheckedCreateNestedManyWithoutTaskInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutTaskInput
    disputes?: DisputeUncheckedCreateNestedManyWithoutTaskInput
    messages?: MessageUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutDeliverablesInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutDeliverablesInput, TaskUncheckedCreateWithoutDeliverablesInput>
  }

  export type UserCreateWithoutDeliverablesInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    rating?: number
    completedTasks?: number
    totalEarnings?: number
    onTimeRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    postedTasks?: TaskCreateNestedManyWithoutPosterInput
    bids?: BidCreateNestedManyWithoutSolverInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    givenReviews?: ReviewCreateNestedManyWithoutReviewerInput
    receivedReviews?: ReviewCreateNestedManyWithoutRevieweeInput
    initiatedDisputes?: DisputeCreateNestedManyWithoutInitiatorInput
  }

  export type UserUncheckedCreateWithoutDeliverablesInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    rating?: number
    completedTasks?: number
    totalEarnings?: number
    onTimeRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    postedTasks?: TaskUncheckedCreateNestedManyWithoutPosterInput
    bids?: BidUncheckedCreateNestedManyWithoutSolverInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    givenReviews?: ReviewUncheckedCreateNestedManyWithoutReviewerInput
    receivedReviews?: ReviewUncheckedCreateNestedManyWithoutRevieweeInput
    initiatedDisputes?: DisputeUncheckedCreateNestedManyWithoutInitiatorInput
  }

  export type UserCreateOrConnectWithoutDeliverablesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDeliverablesInput, UserUncheckedCreateWithoutDeliverablesInput>
  }

  export type TaskUpsertWithoutDeliverablesInput = {
    update: XOR<TaskUpdateWithoutDeliverablesInput, TaskUncheckedUpdateWithoutDeliverablesInput>
    create: XOR<TaskCreateWithoutDeliverablesInput, TaskUncheckedCreateWithoutDeliverablesInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutDeliverablesInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutDeliverablesInput, TaskUncheckedUpdateWithoutDeliverablesInput>
  }

  export type TaskUpdateWithoutDeliverablesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    academicLevel?: StringFieldUpdateOperationsInput | string
    budgetMin?: FloatFieldUpdateOperationsInput | number
    budgetMax?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    revisionCount?: IntFieldUpdateOperationsInput | number
    platformFee?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poster?: UserUpdateOneRequiredWithoutPostedTasksNestedInput
    acceptedBid?: BidUpdateOneWithoutAcceptedTaskNestedInput
    bids?: BidUpdateManyWithoutTaskNestedInput
    reviews?: ReviewUpdateManyWithoutTaskNestedInput
    disputes?: DisputeUpdateManyWithoutTaskNestedInput
    messages?: MessageUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutDeliverablesInput = {
    id?: StringFieldUpdateOperationsInput | string
    posterId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    academicLevel?: StringFieldUpdateOperationsInput | string
    budgetMin?: FloatFieldUpdateOperationsInput | number
    budgetMax?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    acceptedBidId?: NullableStringFieldUpdateOperationsInput | string | null
    revisionCount?: IntFieldUpdateOperationsInput | number
    platformFee?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bids?: BidUncheckedUpdateManyWithoutTaskNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutTaskNestedInput
    disputes?: DisputeUncheckedUpdateManyWithoutTaskNestedInput
    messages?: MessageUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type UserUpsertWithoutDeliverablesInput = {
    update: XOR<UserUpdateWithoutDeliverablesInput, UserUncheckedUpdateWithoutDeliverablesInput>
    create: XOR<UserCreateWithoutDeliverablesInput, UserUncheckedCreateWithoutDeliverablesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDeliverablesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDeliverablesInput, UserUncheckedUpdateWithoutDeliverablesInput>
  }

  export type UserUpdateWithoutDeliverablesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    completedTasks?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    onTimeRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    postedTasks?: TaskUpdateManyWithoutPosterNestedInput
    bids?: BidUpdateManyWithoutSolverNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    givenReviews?: ReviewUpdateManyWithoutReviewerNestedInput
    receivedReviews?: ReviewUpdateManyWithoutRevieweeNestedInput
    initiatedDisputes?: DisputeUpdateManyWithoutInitiatorNestedInput
  }

  export type UserUncheckedUpdateWithoutDeliverablesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    completedTasks?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    onTimeRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    postedTasks?: TaskUncheckedUpdateManyWithoutPosterNestedInput
    bids?: BidUncheckedUpdateManyWithoutSolverNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    givenReviews?: ReviewUncheckedUpdateManyWithoutReviewerNestedInput
    receivedReviews?: ReviewUncheckedUpdateManyWithoutRevieweeNestedInput
    initiatedDisputes?: DisputeUncheckedUpdateManyWithoutInitiatorNestedInput
  }

  export type TaskCreateWithoutReviewsInput = {
    id?: string
    title: string
    description: string
    category: string
    academicLevel: string
    budgetMin: number
    budgetMax: number
    deadline: Date | string
    status?: string
    revisionCount?: number
    platformFee?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    poster: UserCreateNestedOneWithoutPostedTasksInput
    acceptedBid?: BidCreateNestedOneWithoutAcceptedTaskInput
    bids?: BidCreateNestedManyWithoutTaskInput
    deliverables?: DeliverableCreateNestedManyWithoutTaskInput
    disputes?: DisputeCreateNestedManyWithoutTaskInput
    messages?: MessageCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutReviewsInput = {
    id?: string
    posterId: string
    title: string
    description: string
    category: string
    academicLevel: string
    budgetMin: number
    budgetMax: number
    deadline: Date | string
    status?: string
    acceptedBidId?: string | null
    revisionCount?: number
    platformFee?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    bids?: BidUncheckedCreateNestedManyWithoutTaskInput
    deliverables?: DeliverableUncheckedCreateNestedManyWithoutTaskInput
    disputes?: DisputeUncheckedCreateNestedManyWithoutTaskInput
    messages?: MessageUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutReviewsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutReviewsInput, TaskUncheckedCreateWithoutReviewsInput>
  }

  export type UserCreateWithoutGivenReviewsInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    rating?: number
    completedTasks?: number
    totalEarnings?: number
    onTimeRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    postedTasks?: TaskCreateNestedManyWithoutPosterInput
    bids?: BidCreateNestedManyWithoutSolverInput
    deliverables?: DeliverableCreateNestedManyWithoutSolverInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    receivedReviews?: ReviewCreateNestedManyWithoutRevieweeInput
    initiatedDisputes?: DisputeCreateNestedManyWithoutInitiatorInput
  }

  export type UserUncheckedCreateWithoutGivenReviewsInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    rating?: number
    completedTasks?: number
    totalEarnings?: number
    onTimeRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    postedTasks?: TaskUncheckedCreateNestedManyWithoutPosterInput
    bids?: BidUncheckedCreateNestedManyWithoutSolverInput
    deliverables?: DeliverableUncheckedCreateNestedManyWithoutSolverInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedReviews?: ReviewUncheckedCreateNestedManyWithoutRevieweeInput
    initiatedDisputes?: DisputeUncheckedCreateNestedManyWithoutInitiatorInput
  }

  export type UserCreateOrConnectWithoutGivenReviewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGivenReviewsInput, UserUncheckedCreateWithoutGivenReviewsInput>
  }

  export type UserCreateWithoutReceivedReviewsInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    rating?: number
    completedTasks?: number
    totalEarnings?: number
    onTimeRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    postedTasks?: TaskCreateNestedManyWithoutPosterInput
    bids?: BidCreateNestedManyWithoutSolverInput
    deliverables?: DeliverableCreateNestedManyWithoutSolverInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    givenReviews?: ReviewCreateNestedManyWithoutReviewerInput
    initiatedDisputes?: DisputeCreateNestedManyWithoutInitiatorInput
  }

  export type UserUncheckedCreateWithoutReceivedReviewsInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    rating?: number
    completedTasks?: number
    totalEarnings?: number
    onTimeRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    postedTasks?: TaskUncheckedCreateNestedManyWithoutPosterInput
    bids?: BidUncheckedCreateNestedManyWithoutSolverInput
    deliverables?: DeliverableUncheckedCreateNestedManyWithoutSolverInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    givenReviews?: ReviewUncheckedCreateNestedManyWithoutReviewerInput
    initiatedDisputes?: DisputeUncheckedCreateNestedManyWithoutInitiatorInput
  }

  export type UserCreateOrConnectWithoutReceivedReviewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceivedReviewsInput, UserUncheckedCreateWithoutReceivedReviewsInput>
  }

  export type TaskUpsertWithoutReviewsInput = {
    update: XOR<TaskUpdateWithoutReviewsInput, TaskUncheckedUpdateWithoutReviewsInput>
    create: XOR<TaskCreateWithoutReviewsInput, TaskUncheckedCreateWithoutReviewsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutReviewsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutReviewsInput, TaskUncheckedUpdateWithoutReviewsInput>
  }

  export type TaskUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    academicLevel?: StringFieldUpdateOperationsInput | string
    budgetMin?: FloatFieldUpdateOperationsInput | number
    budgetMax?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    revisionCount?: IntFieldUpdateOperationsInput | number
    platformFee?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poster?: UserUpdateOneRequiredWithoutPostedTasksNestedInput
    acceptedBid?: BidUpdateOneWithoutAcceptedTaskNestedInput
    bids?: BidUpdateManyWithoutTaskNestedInput
    deliverables?: DeliverableUpdateManyWithoutTaskNestedInput
    disputes?: DisputeUpdateManyWithoutTaskNestedInput
    messages?: MessageUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    posterId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    academicLevel?: StringFieldUpdateOperationsInput | string
    budgetMin?: FloatFieldUpdateOperationsInput | number
    budgetMax?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    acceptedBidId?: NullableStringFieldUpdateOperationsInput | string | null
    revisionCount?: IntFieldUpdateOperationsInput | number
    platformFee?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bids?: BidUncheckedUpdateManyWithoutTaskNestedInput
    deliverables?: DeliverableUncheckedUpdateManyWithoutTaskNestedInput
    disputes?: DisputeUncheckedUpdateManyWithoutTaskNestedInput
    messages?: MessageUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type UserUpsertWithoutGivenReviewsInput = {
    update: XOR<UserUpdateWithoutGivenReviewsInput, UserUncheckedUpdateWithoutGivenReviewsInput>
    create: XOR<UserCreateWithoutGivenReviewsInput, UserUncheckedCreateWithoutGivenReviewsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGivenReviewsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGivenReviewsInput, UserUncheckedUpdateWithoutGivenReviewsInput>
  }

  export type UserUpdateWithoutGivenReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    completedTasks?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    onTimeRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    postedTasks?: TaskUpdateManyWithoutPosterNestedInput
    bids?: BidUpdateManyWithoutSolverNestedInput
    deliverables?: DeliverableUpdateManyWithoutSolverNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    receivedReviews?: ReviewUpdateManyWithoutRevieweeNestedInput
    initiatedDisputes?: DisputeUpdateManyWithoutInitiatorNestedInput
  }

  export type UserUncheckedUpdateWithoutGivenReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    completedTasks?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    onTimeRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    postedTasks?: TaskUncheckedUpdateManyWithoutPosterNestedInput
    bids?: BidUncheckedUpdateManyWithoutSolverNestedInput
    deliverables?: DeliverableUncheckedUpdateManyWithoutSolverNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedReviews?: ReviewUncheckedUpdateManyWithoutRevieweeNestedInput
    initiatedDisputes?: DisputeUncheckedUpdateManyWithoutInitiatorNestedInput
  }

  export type UserUpsertWithoutReceivedReviewsInput = {
    update: XOR<UserUpdateWithoutReceivedReviewsInput, UserUncheckedUpdateWithoutReceivedReviewsInput>
    create: XOR<UserCreateWithoutReceivedReviewsInput, UserUncheckedCreateWithoutReceivedReviewsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceivedReviewsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceivedReviewsInput, UserUncheckedUpdateWithoutReceivedReviewsInput>
  }

  export type UserUpdateWithoutReceivedReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    completedTasks?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    onTimeRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    postedTasks?: TaskUpdateManyWithoutPosterNestedInput
    bids?: BidUpdateManyWithoutSolverNestedInput
    deliverables?: DeliverableUpdateManyWithoutSolverNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    givenReviews?: ReviewUpdateManyWithoutReviewerNestedInput
    initiatedDisputes?: DisputeUpdateManyWithoutInitiatorNestedInput
  }

  export type UserUncheckedUpdateWithoutReceivedReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    completedTasks?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    onTimeRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    postedTasks?: TaskUncheckedUpdateManyWithoutPosterNestedInput
    bids?: BidUncheckedUpdateManyWithoutSolverNestedInput
    deliverables?: DeliverableUncheckedUpdateManyWithoutSolverNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    givenReviews?: ReviewUncheckedUpdateManyWithoutReviewerNestedInput
    initiatedDisputes?: DisputeUncheckedUpdateManyWithoutInitiatorNestedInput
  }

  export type TaskCreateWithoutDisputesInput = {
    id?: string
    title: string
    description: string
    category: string
    academicLevel: string
    budgetMin: number
    budgetMax: number
    deadline: Date | string
    status?: string
    revisionCount?: number
    platformFee?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    poster: UserCreateNestedOneWithoutPostedTasksInput
    acceptedBid?: BidCreateNestedOneWithoutAcceptedTaskInput
    bids?: BidCreateNestedManyWithoutTaskInput
    deliverables?: DeliverableCreateNestedManyWithoutTaskInput
    reviews?: ReviewCreateNestedManyWithoutTaskInput
    messages?: MessageCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutDisputesInput = {
    id?: string
    posterId: string
    title: string
    description: string
    category: string
    academicLevel: string
    budgetMin: number
    budgetMax: number
    deadline: Date | string
    status?: string
    acceptedBidId?: string | null
    revisionCount?: number
    platformFee?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    bids?: BidUncheckedCreateNestedManyWithoutTaskInput
    deliverables?: DeliverableUncheckedCreateNestedManyWithoutTaskInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutTaskInput
    messages?: MessageUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutDisputesInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutDisputesInput, TaskUncheckedCreateWithoutDisputesInput>
  }

  export type UserCreateWithoutInitiatedDisputesInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    rating?: number
    completedTasks?: number
    totalEarnings?: number
    onTimeRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    postedTasks?: TaskCreateNestedManyWithoutPosterInput
    bids?: BidCreateNestedManyWithoutSolverInput
    deliverables?: DeliverableCreateNestedManyWithoutSolverInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    givenReviews?: ReviewCreateNestedManyWithoutReviewerInput
    receivedReviews?: ReviewCreateNestedManyWithoutRevieweeInput
  }

  export type UserUncheckedCreateWithoutInitiatedDisputesInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    rating?: number
    completedTasks?: number
    totalEarnings?: number
    onTimeRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    postedTasks?: TaskUncheckedCreateNestedManyWithoutPosterInput
    bids?: BidUncheckedCreateNestedManyWithoutSolverInput
    deliverables?: DeliverableUncheckedCreateNestedManyWithoutSolverInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    givenReviews?: ReviewUncheckedCreateNestedManyWithoutReviewerInput
    receivedReviews?: ReviewUncheckedCreateNestedManyWithoutRevieweeInput
  }

  export type UserCreateOrConnectWithoutInitiatedDisputesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInitiatedDisputesInput, UserUncheckedCreateWithoutInitiatedDisputesInput>
  }

  export type TaskUpsertWithoutDisputesInput = {
    update: XOR<TaskUpdateWithoutDisputesInput, TaskUncheckedUpdateWithoutDisputesInput>
    create: XOR<TaskCreateWithoutDisputesInput, TaskUncheckedCreateWithoutDisputesInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutDisputesInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutDisputesInput, TaskUncheckedUpdateWithoutDisputesInput>
  }

  export type TaskUpdateWithoutDisputesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    academicLevel?: StringFieldUpdateOperationsInput | string
    budgetMin?: FloatFieldUpdateOperationsInput | number
    budgetMax?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    revisionCount?: IntFieldUpdateOperationsInput | number
    platformFee?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poster?: UserUpdateOneRequiredWithoutPostedTasksNestedInput
    acceptedBid?: BidUpdateOneWithoutAcceptedTaskNestedInput
    bids?: BidUpdateManyWithoutTaskNestedInput
    deliverables?: DeliverableUpdateManyWithoutTaskNestedInput
    reviews?: ReviewUpdateManyWithoutTaskNestedInput
    messages?: MessageUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutDisputesInput = {
    id?: StringFieldUpdateOperationsInput | string
    posterId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    academicLevel?: StringFieldUpdateOperationsInput | string
    budgetMin?: FloatFieldUpdateOperationsInput | number
    budgetMax?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    acceptedBidId?: NullableStringFieldUpdateOperationsInput | string | null
    revisionCount?: IntFieldUpdateOperationsInput | number
    platformFee?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bids?: BidUncheckedUpdateManyWithoutTaskNestedInput
    deliverables?: DeliverableUncheckedUpdateManyWithoutTaskNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutTaskNestedInput
    messages?: MessageUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type UserUpsertWithoutInitiatedDisputesInput = {
    update: XOR<UserUpdateWithoutInitiatedDisputesInput, UserUncheckedUpdateWithoutInitiatedDisputesInput>
    create: XOR<UserCreateWithoutInitiatedDisputesInput, UserUncheckedCreateWithoutInitiatedDisputesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInitiatedDisputesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInitiatedDisputesInput, UserUncheckedUpdateWithoutInitiatedDisputesInput>
  }

  export type UserUpdateWithoutInitiatedDisputesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    completedTasks?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    onTimeRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    postedTasks?: TaskUpdateManyWithoutPosterNestedInput
    bids?: BidUpdateManyWithoutSolverNestedInput
    deliverables?: DeliverableUpdateManyWithoutSolverNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    givenReviews?: ReviewUpdateManyWithoutReviewerNestedInput
    receivedReviews?: ReviewUpdateManyWithoutRevieweeNestedInput
  }

  export type UserUncheckedUpdateWithoutInitiatedDisputesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    completedTasks?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    onTimeRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    postedTasks?: TaskUncheckedUpdateManyWithoutPosterNestedInput
    bids?: BidUncheckedUpdateManyWithoutSolverNestedInput
    deliverables?: DeliverableUncheckedUpdateManyWithoutSolverNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    givenReviews?: ReviewUncheckedUpdateManyWithoutReviewerNestedInput
    receivedReviews?: ReviewUncheckedUpdateManyWithoutRevieweeNestedInput
  }

  export type TaskCreateWithoutMessagesInput = {
    id?: string
    title: string
    description: string
    category: string
    academicLevel: string
    budgetMin: number
    budgetMax: number
    deadline: Date | string
    status?: string
    revisionCount?: number
    platformFee?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    poster: UserCreateNestedOneWithoutPostedTasksInput
    acceptedBid?: BidCreateNestedOneWithoutAcceptedTaskInput
    bids?: BidCreateNestedManyWithoutTaskInput
    deliverables?: DeliverableCreateNestedManyWithoutTaskInput
    reviews?: ReviewCreateNestedManyWithoutTaskInput
    disputes?: DisputeCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutMessagesInput = {
    id?: string
    posterId: string
    title: string
    description: string
    category: string
    academicLevel: string
    budgetMin: number
    budgetMax: number
    deadline: Date | string
    status?: string
    acceptedBidId?: string | null
    revisionCount?: number
    platformFee?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    bids?: BidUncheckedCreateNestedManyWithoutTaskInput
    deliverables?: DeliverableUncheckedCreateNestedManyWithoutTaskInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutTaskInput
    disputes?: DisputeUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutMessagesInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutMessagesInput, TaskUncheckedCreateWithoutMessagesInput>
  }

  export type UserCreateWithoutSentMessagesInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    rating?: number
    completedTasks?: number
    totalEarnings?: number
    onTimeRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    postedTasks?: TaskCreateNestedManyWithoutPosterInput
    bids?: BidCreateNestedManyWithoutSolverInput
    deliverables?: DeliverableCreateNestedManyWithoutSolverInput
    givenReviews?: ReviewCreateNestedManyWithoutReviewerInput
    receivedReviews?: ReviewCreateNestedManyWithoutRevieweeInput
    initiatedDisputes?: DisputeCreateNestedManyWithoutInitiatorInput
  }

  export type UserUncheckedCreateWithoutSentMessagesInput = {
    id?: string
    email: string
    name: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    rating?: number
    completedTasks?: number
    totalEarnings?: number
    onTimeRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    postedTasks?: TaskUncheckedCreateNestedManyWithoutPosterInput
    bids?: BidUncheckedCreateNestedManyWithoutSolverInput
    deliverables?: DeliverableUncheckedCreateNestedManyWithoutSolverInput
    givenReviews?: ReviewUncheckedCreateNestedManyWithoutReviewerInput
    receivedReviews?: ReviewUncheckedCreateNestedManyWithoutRevieweeInput
    initiatedDisputes?: DisputeUncheckedCreateNestedManyWithoutInitiatorInput
  }

  export type UserCreateOrConnectWithoutSentMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
  }

  export type TaskUpsertWithoutMessagesInput = {
    update: XOR<TaskUpdateWithoutMessagesInput, TaskUncheckedUpdateWithoutMessagesInput>
    create: XOR<TaskCreateWithoutMessagesInput, TaskUncheckedCreateWithoutMessagesInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutMessagesInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutMessagesInput, TaskUncheckedUpdateWithoutMessagesInput>
  }

  export type TaskUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    academicLevel?: StringFieldUpdateOperationsInput | string
    budgetMin?: FloatFieldUpdateOperationsInput | number
    budgetMax?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    revisionCount?: IntFieldUpdateOperationsInput | number
    platformFee?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poster?: UserUpdateOneRequiredWithoutPostedTasksNestedInput
    acceptedBid?: BidUpdateOneWithoutAcceptedTaskNestedInput
    bids?: BidUpdateManyWithoutTaskNestedInput
    deliverables?: DeliverableUpdateManyWithoutTaskNestedInput
    reviews?: ReviewUpdateManyWithoutTaskNestedInput
    disputes?: DisputeUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    posterId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    academicLevel?: StringFieldUpdateOperationsInput | string
    budgetMin?: FloatFieldUpdateOperationsInput | number
    budgetMax?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    acceptedBidId?: NullableStringFieldUpdateOperationsInput | string | null
    revisionCount?: IntFieldUpdateOperationsInput | number
    platformFee?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bids?: BidUncheckedUpdateManyWithoutTaskNestedInput
    deliverables?: DeliverableUncheckedUpdateManyWithoutTaskNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutTaskNestedInput
    disputes?: DisputeUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type UserUpsertWithoutSentMessagesInput = {
    update: XOR<UserUpdateWithoutSentMessagesInput, UserUncheckedUpdateWithoutSentMessagesInput>
    create: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentMessagesInput, UserUncheckedUpdateWithoutSentMessagesInput>
  }

  export type UserUpdateWithoutSentMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    completedTasks?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    onTimeRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    postedTasks?: TaskUpdateManyWithoutPosterNestedInput
    bids?: BidUpdateManyWithoutSolverNestedInput
    deliverables?: DeliverableUpdateManyWithoutSolverNestedInput
    givenReviews?: ReviewUpdateManyWithoutReviewerNestedInput
    receivedReviews?: ReviewUpdateManyWithoutRevieweeNestedInput
    initiatedDisputes?: DisputeUpdateManyWithoutInitiatorNestedInput
  }

  export type UserUncheckedUpdateWithoutSentMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    completedTasks?: IntFieldUpdateOperationsInput | number
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    onTimeRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    postedTasks?: TaskUncheckedUpdateManyWithoutPosterNestedInput
    bids?: BidUncheckedUpdateManyWithoutSolverNestedInput
    deliverables?: DeliverableUncheckedUpdateManyWithoutSolverNestedInput
    givenReviews?: ReviewUncheckedUpdateManyWithoutReviewerNestedInput
    receivedReviews?: ReviewUncheckedUpdateManyWithoutRevieweeNestedInput
    initiatedDisputes?: DisputeUncheckedUpdateManyWithoutInitiatorNestedInput
  }

  export type TaskCreateManyPosterInput = {
    id?: string
    title: string
    description: string
    category: string
    academicLevel: string
    budgetMin: number
    budgetMax: number
    deadline: Date | string
    status?: string
    acceptedBidId?: string | null
    revisionCount?: number
    platformFee?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BidCreateManySolverInput = {
    id?: string
    taskId: string
    proposedPrice: number
    deliveryDays: number
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliverableCreateManySolverInput = {
    id?: string
    taskId: string
    content: string
    version?: number
    status?: string
    createdAt?: Date | string
  }

  export type MessageCreateManySenderInput = {
    id?: string
    taskId: string
    content: string
    createdAt?: Date | string
  }

  export type ReviewCreateManyReviewerInput = {
    id?: string
    taskId: string
    revieweeId: string
    rating: number
    comment: string
    createdAt?: Date | string
  }

  export type ReviewCreateManyRevieweeInput = {
    id?: string
    taskId: string
    reviewerId: string
    rating: number
    comment: string
    createdAt?: Date | string
  }

  export type DisputeCreateManyInitiatorInput = {
    id?: string
    taskId: string
    reason: string
    status?: string
    resolution?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateWithoutPosterInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    academicLevel?: StringFieldUpdateOperationsInput | string
    budgetMin?: FloatFieldUpdateOperationsInput | number
    budgetMax?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    revisionCount?: IntFieldUpdateOperationsInput | number
    platformFee?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedBid?: BidUpdateOneWithoutAcceptedTaskNestedInput
    bids?: BidUpdateManyWithoutTaskNestedInput
    deliverables?: DeliverableUpdateManyWithoutTaskNestedInput
    reviews?: ReviewUpdateManyWithoutTaskNestedInput
    disputes?: DisputeUpdateManyWithoutTaskNestedInput
    messages?: MessageUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutPosterInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    academicLevel?: StringFieldUpdateOperationsInput | string
    budgetMin?: FloatFieldUpdateOperationsInput | number
    budgetMax?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    acceptedBidId?: NullableStringFieldUpdateOperationsInput | string | null
    revisionCount?: IntFieldUpdateOperationsInput | number
    platformFee?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bids?: BidUncheckedUpdateManyWithoutTaskNestedInput
    deliverables?: DeliverableUncheckedUpdateManyWithoutTaskNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutTaskNestedInput
    disputes?: DisputeUncheckedUpdateManyWithoutTaskNestedInput
    messages?: MessageUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutPosterInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    academicLevel?: StringFieldUpdateOperationsInput | string
    budgetMin?: FloatFieldUpdateOperationsInput | number
    budgetMax?: FloatFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    acceptedBidId?: NullableStringFieldUpdateOperationsInput | string | null
    revisionCount?: IntFieldUpdateOperationsInput | number
    platformFee?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BidUpdateWithoutSolverInput = {
    id?: StringFieldUpdateOperationsInput | string
    proposedPrice?: FloatFieldUpdateOperationsInput | number
    deliveryDays?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutBidsNestedInput
    acceptedTask?: TaskUpdateOneWithoutAcceptedBidNestedInput
  }

  export type BidUncheckedUpdateWithoutSolverInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    proposedPrice?: FloatFieldUpdateOperationsInput | number
    deliveryDays?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedTask?: TaskUncheckedUpdateOneWithoutAcceptedBidNestedInput
  }

  export type BidUncheckedUpdateManyWithoutSolverInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    proposedPrice?: FloatFieldUpdateOperationsInput | number
    deliveryDays?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliverableUpdateWithoutSolverInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutDeliverablesNestedInput
  }

  export type DeliverableUncheckedUpdateWithoutSolverInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliverableUncheckedUpdateManyWithoutSolverInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutReviewerInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutReviewsNestedInput
    reviewee?: UserUpdateOneRequiredWithoutReceivedReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutReviewerInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    revieweeId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutReviewerInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    revieweeId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutRevieweeInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutReviewsNestedInput
    reviewer?: UserUpdateOneRequiredWithoutGivenReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutRevieweeInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutRevieweeInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisputeUpdateWithoutInitiatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutDisputesNestedInput
  }

  export type DisputeUncheckedUpdateWithoutInitiatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisputeUncheckedUpdateManyWithoutInitiatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BidCreateManyTaskInput = {
    id?: string
    solverId: string
    proposedPrice: number
    deliveryDays: number
    message: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliverableCreateManyTaskInput = {
    id?: string
    solverId: string
    content: string
    version?: number
    status?: string
    createdAt?: Date | string
  }

  export type ReviewCreateManyTaskInput = {
    id?: string
    reviewerId: string
    revieweeId: string
    rating: number
    comment: string
    createdAt?: Date | string
  }

  export type DisputeCreateManyTaskInput = {
    id?: string
    initiatorId: string
    reason: string
    status?: string
    resolution?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageCreateManyTaskInput = {
    id?: string
    senderId: string
    content: string
    createdAt?: Date | string
  }

  export type BidUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    proposedPrice?: FloatFieldUpdateOperationsInput | number
    deliveryDays?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    solver?: UserUpdateOneRequiredWithoutBidsNestedInput
    acceptedTask?: TaskUpdateOneWithoutAcceptedBidNestedInput
  }

  export type BidUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    solverId?: StringFieldUpdateOperationsInput | string
    proposedPrice?: FloatFieldUpdateOperationsInput | number
    deliveryDays?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedTask?: TaskUncheckedUpdateOneWithoutAcceptedBidNestedInput
  }

  export type BidUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    solverId?: StringFieldUpdateOperationsInput | string
    proposedPrice?: FloatFieldUpdateOperationsInput | number
    deliveryDays?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliverableUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    solver?: UserUpdateOneRequiredWithoutDeliverablesNestedInput
  }

  export type DeliverableUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    solverId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliverableUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    solverId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewer?: UserUpdateOneRequiredWithoutGivenReviewsNestedInput
    reviewee?: UserUpdateOneRequiredWithoutReceivedReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    revieweeId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    revieweeId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisputeUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    initiator?: UserUpdateOneRequiredWithoutInitiatedDisputesNestedInput
  }

  export type DisputeUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    initiatorId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisputeUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    initiatorId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutSentMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}