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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const context = __importStar(require("./context"));
const utils = __importStar(require("./utils"));
const upload = __importStar(require("./obs/upload"));
const download = __importStar(require("./obs/download"));
const bucket = __importStar(require("./obs/bucket"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const commonInputs = context.getCommonInputs();
        if (!utils.checkCommonInputs(commonInputs)) {
            return;
        }
        // 初始化OBS客户端
        const obs = context.getObsClient(commonInputs.accessKey, commonInputs.secretKey, `https://obs.${commonInputs.region}.myhuaweicloud.com`);
        const operationCategory = utils.getOperationCategory(context.getOperationType());
        if (operationCategory === 'object') {
            handleObject(obs);
        }
        else if (operationCategory === 'bucket') {
            handleBucket(obs);
        }
        else {
            core.setFailed(`please check your operation_type. you can use 'download', 'upload', 'createbucket' or 'deletebucket'.`);
        }
    });
}
/**
 * 处理对象，目前支持上传对象，下载对象
 * @param obs OBS客户端
 * @returns
 */
function handleObject(obs) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputs = context.getObjectInputs();
        if (!utils.checkObjectInputs(inputs)) {
            return;
        }
        // 若桶不存在，退出
        if (!(yield bucket.hasBucket(obs, inputs.bucketName))) {
            core.setFailed(`The bucket: ${inputs.bucketName} does not exists.`);
            return;
        }
        // 执行上传/下载操作
        if (inputs.operationType === 'upload') {
            yield upload.uploadFileOrFolder(obs, inputs);
        }
        if (inputs.operationType === 'download') {
            yield download.downloadFileOrFolder(obs, inputs);
        }
    });
}
/**
 * 处理桶，目前支持新增桶，删除桶
 * @param obs OBS客户端
 * @returns
 */
function handleBucket(obs) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const inputs = context.getBucketInputs();
        if (!utils.checkBucketInputs(inputs)) {
            return;
        }
        if (inputs.operationType.toLowerCase() === 'createbucket') {
            bucket.createBucket(obs, inputs.bucketName, inputs.region, inputs.publicRead, utils.getStorageClass((_a = inputs.storageClass) !== null && _a !== void 0 ? _a : ''));
        }
        if (inputs.operationType.toLowerCase() === 'deletebucket') {
            yield bucket.deleteBucket(obs, inputs.bucketName, inputs.clearBucket);
        }
    });
}
run();
