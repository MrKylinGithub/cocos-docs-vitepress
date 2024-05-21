"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCredential = void 0;
const core = __importStar(require("@actions/core"));
const HUAWEI_ClOUD_CREDENTIALS_ENVIRONMENT_VARIABLE_MAP = new Map([
    ['access_key', 'HUAWEI_CLOUD_ACCESS_KEY_ID'],
    ['secret_key', 'HUAWEI_CLOUD_SECRET_ACCESS_KEY'],
    ['region', 'HUAWEI_CLOUD_REGION'],
    ['project_id', 'HUAWEI_CLOUD_PROJECT_ID'],
]);
function getCredential(param, isRequired) {
    const environmentVariable = HUAWEI_ClOUD_CREDENTIALS_ENVIRONMENT_VARIABLE_MAP.get(param) || '';
    const credFromEnv = process.env[environmentVariable];
    const cred = credFromEnv !== null && credFromEnv !== void 0 ? credFromEnv : core.getInput(param, { required: false });
    if (isRequired && !cred) {
        core.setFailed(`The Huawei Cloud credential input ${param} is not correct. Please switch to using huaweicloud/auth-action which supports authenticating to Huawei Cloud.`);
    }
    return cred;
}
exports.getCredential = getCredential;
