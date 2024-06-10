"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const model_role_1 = __importDefault(require("../models/model.role"));
dotenv_1.default.config();
// const uri = process.env.URI as string
// const connectDB = async (): Promise<void> => {
//   try {
//     await mongoose.connect(uri);
//     console.log('Conectado a MongoDB Atlas');
//   } catch (error) {
//     console.error('Error de conexión a MongoDB Atlas:', error);
//     process.exit(1); // Salir del proceso con error
//   }
// };
class Database {
    constructor(uri, options) {
        this.uri = uri;
        this.options = options || {};
        this.connection = mongoose_1.default.connection;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(this.uri, this.options);
                console.log('conectado a mongo atlas');
                // Crear y guardar un nuevo role
                const newRole = new model_role_1.default({ id: 1, name: 'Admin' });
                yield newRole.save();
                console.log('Nuevo rol creado:', newRole);
                // Verificar si el rol se guardó en la base de datos
                const savedRole = yield model_role_1.default.findOne({ id: 1 });
                console.log('Rol guardado:', savedRole);
                this.connection.on('connected', () => {
                    console.log('Mongoose connected to DB');
                });
                this.connection.on('error', (err) => {
                    console.error('Mongoose connection error:', err);
                });
                this.connection.on('disconnected', () => {
                    console.log('Mongoose disconnected from DB');
                });
            }
            catch (error) {
                console.error('Error de conexión a MongoDB Atlas:', error);
                process.exit(1); // Salir del proceso con error
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.disconnect();
                console.log('Desconectado de MongoDB Atlas');
            }
            catch (error) {
                console.error('Error al desconectar de MongoDB Atlas:', error);
            }
        });
    }
    getConnection() {
        return this.connection;
    }
}
const database = new Database(process.env.URI);
exports.default = database;
