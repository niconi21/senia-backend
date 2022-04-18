import { modelOptions } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    _id: false,
    timestamps: {createdAt: true}
  },
})
export class Image {
  path: string;
  createAt: Date;
}
