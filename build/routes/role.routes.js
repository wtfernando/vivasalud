"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controller_1 = __importDefault(require("../controllers/role.controller"));
class RoleRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.roleController = new role_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/roles', this.roleController.createRole);
        this.router.get('/roles', this.roleController.createRole);
    }
}
exports.default = new RoleRoutes().router;
