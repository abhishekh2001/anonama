"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofStatusSchema = void 0;
var mongoose_1 = require("mongoose");
var ProofStatusSchema = new mongoose_1.Schema({
    callbackId: { type: String, required: true },
    claim: { type: mongoose_1.Schema.ObjectId },
    status: { type: String, enum: ['pending', 'success'], required: true },
});
exports.ProofStatusSchema = ProofStatusSchema;
exports.default = (0, mongoose_1.model)('ProofStatus', ProofStatusSchema);
