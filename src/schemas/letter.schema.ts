import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
  DocumentType,
} from "@typegoose/typegoose";
import { Image } from "./image.schema";
import { User } from "./user.schema";

export const HANDS_LETTER: string[] = ["Izquierda", "Derecha"];
export const TYPES_LETTERS: string[] = ["Entrenamiento", "Validación"];

export const NAME_LETTERS: string[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "LL",
  "M",
  "N",
  "Ñ",
  "O",
  "P",
  "Q",
  "R",
  "RR",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

@modelOptions({
  schemaOptions: {
    timestamps: { createdAt: true, updatedAt:false },
  },
})
export class Letter {
  @prop({ requied: true, enum: NAME_LETTERS })
  name: string;
  @prop({ required: true, enum: TYPES_LETTERS })
  type: string;
  @prop({ required: true, enum: HANDS_LETTER })
  hand: string;
  @prop({ default: 0 })
  percentage: number;
  @prop()
  createAt: Date;
  @prop({ type: () => [Image] })
  images: Image[] ;
  @prop({ ref: () => User })
  user: Ref<User>;

  _id: string;

  types: Map<string, Letter> | Letter[];
  hands: Map<string, Letter> | Letter[];

  

  public getPathLetter(): string {
    return `../public/${this.user?.toString()}/${this.name}/${this.hand}/${
      this.type
    }`;
  }
}

const LetterSchema = getModelForClass(Letter);
export default LetterSchema;
