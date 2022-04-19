import {
  getModelForClass,
  modelOptions,
  plugin,
  prop,
} from "@typegoose/typegoose";

enum Roles {
  USER = "USER",
  ADMIN = "ADMIN",
}

@modelOptions({
  schemaOptions: { timestamps: true },
})
export class User {
  @prop({ required: true, unique: true })
  nombre: string;

  @prop({ required: true, unique: true })
  correo: string;

  @prop({ default: "USER", enum: Roles })
  role: string;

  @prop({ default: false })
  isGoogle: boolean;

  createdAt: Date;
  updatedAt: Date;
  _id: string;

}

const UserSchema = getModelForClass(User);
export default UserSchema;


