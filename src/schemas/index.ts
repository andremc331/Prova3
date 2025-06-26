import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;

// define os schemas

const dddsValidos = [

  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99
];

const MilitarSchema = new Schema({
  nome: {
    type: String,
    maxlength: [50, "O nome do militar pode ter no máximo 50 caracteres"],
    required: [true, "O nome do militar é obrigatório"],
  },
  email: {
    type: String,
    maxlength: [100, "o email deve conter no máximo 100 caracteres"],
    required: true,
    unique: true,
    lowercase: true,
    validate: [
      {
        validator: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        message: 'O e-mail precisa conter pelo menos um "@" e um ponto.',
      },
      {
        validator: (email: string) => /@(eb|marinha|fab).*\.mil\.br$/.test(email),
        message: 'O e-mail deve ser institucional das Forças Armadas e terminar com ".mil.br" (ex: nome@fab.mil.br).',
      },
    ],
  },
  idade: {
    type: Number,
    maxlength: [3, "A idade deve conter no máximo 3 caracteres"],
    required: true,
    validate: {
      validator: function (valor: number) {
        return valor > 18;
      },
      message: (props: any) =>
        `A idade deve ser maior que 18`,
    },
  },
  fone: {
    type: String,
    required: true,
    validate: [
      {
        validator: (valor: string) => /^[0-9]{10,11}$/.test(valor),
        message: 'O número de telefone deve ter entre 10 e 11 dígitos numéricos.',
      },
      {
        validator: (valor: string) => {
          const ddd = parseInt(valor.substring(0, 2));
          return dddsValidos.includes(ddd);
        },
        message: 'O DDD informado não é válido no Brasil.',
      },
    ],
  }


});

const SoldadoSchema = new Schema({
  cim: {
    type: Number,
    maxlength: [10, "O cim do militar pode ter no máximo 10 caracteres"],
    required: [true, "O cim do militar é obrigatório"],
    unique: [true]
  },
  altura: {
    type: Number,
    validate: {
      validator: function (v: number) {
        return v >= 1.62;
      },
      message: "Altura deve ser maior ou igual a 1.62m",
    },
    required: [true, "Altura é obrigatória"],
  },
  militar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Militar',
    required: true,
    validate: {
      validator: async function (id: Types.ObjectId) {
        const existe = await Militar.exists({ _id: id });
        return !!existe;
      },
      message: 'O ID fornecido não corresponde a um militar cadastrado.',
    },
  },
});

const PatenteSchema = new mongoose.Schema({
  codigo: { type: Number, required: true, min: 1, max: 20 },
  descricao: { type: String, required: true }
});

const Militar = mongoose.model("Militar", MilitarSchema, "militares");
const Soldado = mongoose.model("Soldado", SoldadoSchema);
const Patente = mongoose.model("Patente", PatenteSchema);



export { Militar, Soldado, Patente };