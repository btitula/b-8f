import { z } from 'zod'
import { ObjectId } from 'mongodb'

// enum UserVerifyStatus {
//   Unverified, // Not yet verified: 0
//   Verified, // Verified: 1
//   Banned // Banned: 2
// }

// interface IUser {
//   _id: ObjectId
//   name: string
//   email: string
//   dayOfBirth: Date
//   password: string
//   createdAt: Date
//   updatedAt: Date
//   emailVerifiedToken: string
//   forgotPasswordToken: string
//   verifyStatus: UserVerifyStatus
//   bio: string
//   location: string
//   username: string
//   avatar: string
//   coverPhoto: string
// }

export const UserSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  // name: z.string(),
  email: z.string(),
  // dayOfBirth: z.date(),
  password: z.string().min(6)
  // createdAt: z.date(),
  // updatedAt: z.date(),
  // emailVerifiedToken: z.string(),
  // forgotPasswordToken: z.string(),
  // verifyStatus: z.nativeEnum(UserVerifyStatus),
  // bio: z.string(),
  // location: z.string(),
  // username: z.string(),
  // avatar: z.string(),
  // coverPhoto: z.string()
})

type IUser = z.infer<typeof UserSchema>

export default class User implements IUser {
  _id: ObjectId
  // name: string
  email: string
  // dayOfBirth: Date
  password: string
  // createdAt: Date
  // updatedAt: Date
  // emailVerifiedToken: string
  // forgotPasswordToken: string
  // verifyStatus: UserVerifyStatus
  // bio: string
  // location: string
  // username: string
  // avatar: string
  // coverPhoto: string

  constructor(user: IUser) {
    // const currentDatetime: Date = new Date()

    this._id = user._id || new ObjectId()
    // this.name = user.name
    this.email = user.email
    // this.dayOfBirth = user.dayOfBirth
    this.password = user.password
    //   this.createdAt = user.createdAt || currentDatetime
    //   this.updatedAt = user.updatedAt || currentDatetime
    //   this.emailVerifiedToken = user.emailVerifiedToken
    //   this.forgotPasswordToken = user.forgotPasswordToken
    //   this.verifyStatus = user.verifyStatus
    //   this.bio = user.bio
    //   this.location = user.location
    //   this.username = user.username
    //   this.avatar = user.avatar
    //   this.coverPhoto = user.coverPhoto
    // }
  }
}

// const userSchema = UserSchema.parse({ email: 'test@test.com', password: '123' })
// console.log(userSchema)
