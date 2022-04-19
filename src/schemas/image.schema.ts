import { modelOptions, prop } from "@typegoose/typegoose";
import { Letter } from './letter.schema';

export const EXTENSIONS_IMAGE = ["png", "jpg"];

@modelOptions({
  schemaOptions: {
    timestamps: { createdAt: true, updatedAt: false },
  },
})
export class Image {
  @prop({ required: true, default: "png", enum: EXTENSIONS_IMAGE })
  extension: string;

  _id: string;
  createdAt: Date;
  
  public getPathImage(letter: Letter) {
    return `${letter.getPathLetter()}/${this._id}.${this.extension}`;
  }
}
