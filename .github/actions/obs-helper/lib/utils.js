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
exports.isExistSameNameFile = exports.isExistSameNameFolder = exports.isFileOverSize = exports.getStringDelLastSlash = exports.isEndWithSlash = exports.createFolder = exports.getPathWithoutRootPath = exports.replaceSlash = exports.checkBucketInputs = exports.checkObjectInputs = exports.checkCommonInputs = exports.getStorageClass = exports.checkDownloadFilePath = exports.checkUploadFilePath = exports.getOperationCategory = exports.checkBucketName = exports.checkRegion = exports.checkAkSk = exports.PART_MAX_SIZE = void 0;
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs"));
/**
 * 目前支持obs功能的region列表
 * LA-Santiago	la-south-2
 * 非洲-约翰内斯堡	af-south-1
 * 华北-北京四	cn-north-4
 * 华北-北京一	cn-north-1
 * 华东-上海二	cn-east-2
 * 华东-上海一	cn-east-3
 * 华南-广州	cn-south-1
 * 拉美-墨西哥城二	la-north-2
 * 拉美-墨西哥城一	na-mexico-1
 * 拉美-圣保罗一	sa-brazil-1
 * 亚太-曼谷	ap-southeast-2
 * 亚太-新加坡	ap-southeast-3
 * 中国-香港	ap-southeast-1
 */
const regionArray = [
    'la-south-2',
    'af-south-1',
    'cn-north-4',
    'cn-north-1',
    'cn-east-2',
    'cn-east-3',
    'cn-south-1',
    'la-north-2',
    'na-mexico-1',
    'sa-brazil-1',
    'ap-southeast-2',
    'ap-southeast-3',
    'ap-southeast-1',
];
/**
 * 目前支持的存储类型
 * 标准存储 StorageClassStandard
 * 低频访问存储 StorageClassWarm
 * 归档存储 StorageClassCold
 */
const storageClassList = {
    standard: 'StorageClassStandard',
    infrequent: 'StorageClassWarm',
    archive: 'StorageClassCold',
};
/**
 * 目前支持的操作类型
 * 对象操作 upload  download
 * 桶操作 createbucket  deletebucket
 */
const OPERATION_TYPE = {
    object: ['upload', 'download'],
    bucket: ['createbucket', 'deletebucket'],
};
/**
 * 允许上传的最大文件大小（单位：B）
 */
const FILE_MAX_SIZE = 5 * 1024 * 1024 * 1024;
/**
 * 分段上传的段大小（单位：B）
 */
exports.PART_MAX_SIZE = 1024 * 1024;
/**
 * 用于验证输入参数的正则表达式
 */
const akReg = /^[a-zA-Z0-9]{10,30}$/;
const skReg = /^[a-zA-Z0-9]{30,50}$/;
const legalReg = /^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/;
const symbolReg = /([.]+[.-]+)|([-]+[.]+)/;
const ipReg = /(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/;
/**
 * 检查ak/sk是否合法
 * @param ak
 * @param sk
 * @returns
 */
function checkAkSk(ak, sk) {
    return akReg.test(ak) && skReg.test(sk);
}
exports.checkAkSk = checkAkSk;
/**
 * 检查region是否合法
 * @param region
 * @returns
 */
function checkRegion(region) {
    return regionArray.includes(region);
}
exports.checkRegion = checkRegion;
/**
 * 检查桶名，规则如下
 * 3～63个字符，数字或字母开头，支持小写字母、数字、“-”、“.”
 * 禁止以“-”或“.”开头及结尾，禁止两个“.”相邻，禁止“.”和“-”相邻
 * 禁止类IP地址
 * @param bucketName
 * @returns
 */
function checkBucketName(bucketName) {
    return legalReg.test(bucketName) && !symbolReg.test(bucketName) && !ipReg.test(bucketName);
}
exports.checkBucketName = checkBucketName;
/**
 * 获得操作类型
 * @param operation_type
 * @returns
 */
function getOperationCategory(operationType) {
    if (OPERATION_TYPE.object.includes(operationType.toLowerCase())) {
        return 'object';
    }
    if (OPERATION_TYPE.bucket.includes(operationType.toLowerCase())) {
        return 'bucket';
    }
    return '';
}
exports.getOperationCategory = getOperationCategory;
/**
 * 检查上传时的input_file_path和参数obs_file_path是否合法
 * @param inputs
 * @returns
 */
function checkUploadFilePath(inputs) {
    if (inputs.localFilePath.length === 0) {
        core.setFailed('please input localFilePath.');
        return false;
    }
    if (inputs.localFilePath.length > 10) {
        core.setFailed('you should input no more than 10 local_file_path.');
        return false;
    }
    for (const path of inputs.localFilePath) {
        if (path === '') {
            core.setFailed('you should not input a empty string as local_file_path.');
            return false;
        }
        if (!fs.existsSync(path)) {
            core.setFailed(`local file or directory not exist, please check your input path.`);
            return false;
        }
    }
    return true;
}
exports.checkUploadFilePath = checkUploadFilePath;
/**
 * 检查下载时的input_file_path和obs_file_path是否合法
 * @param inputs
 * @returns
 */
function checkDownloadFilePath(inputs) {
    if (inputs.localFilePath.length !== 1) {
        core.setFailed('you should input one local_file_path.');
        return false;
    }
    if (inputs.localFilePath[0] === '') {
        core.setFailed('you should not input a empty string as local_file_path.');
        return false;
    }
    if (!inputs.obsFilePath) {
        core.setFailed('you should input one obs_file_path.');
        return false;
    }
    return true;
}
exports.checkDownloadFilePath = checkDownloadFilePath;
/**
 * 获得存储类型
 * @param storageClass
 * @returns
 */
function getStorageClass(storageClass) {
    for (const key in storageClassList) {
        if (storageClass === key) {
            return storageClassList[key];
        }
    }
    return '';
}
exports.getStorageClass = getStorageClass;
/**
 * 检查公共属性(ak,sk,region,bucketName)是否合法
 * @param inputs
 * @returns
 */
function checkCommonInputs(inputs) {
    if (!checkAkSk(inputs.accessKey, inputs.secretKey)) {
        core.setFailed('ak or sk is not correct.');
        return false;
    }
    if (!checkRegion(inputs.region)) {
        core.setFailed('region is not correct.');
        return false;
    }
    if (!checkBucketName(inputs.bucketName)) {
        core.setFailed('bucket name is not correct.');
        return false;
    }
    return true;
}
exports.checkCommonInputs = checkCommonInputs;
/**
 * 检查操作对象时输入的参数(localFilePath,obsFilePath)是否合法
 * @param inputs
 * @returns
 */
function checkObjectInputs(inputs) {
    const checkFilePath = inputs.operationType.toLowerCase() === 'upload'
        ? checkUploadFilePath(inputs)
        : checkDownloadFilePath(inputs);
    if (!checkFilePath) {
        return false;
    }
    return true;
}
exports.checkObjectInputs = checkObjectInputs;
/**
 * 检查操作桶时输入的参数(storageClass)是否合法
 * @param inputs
 * @returns
 */
function checkBucketInputs(inputs) {
    if (inputs.storageClass) {
        if (getStorageClass(inputs.storageClass) === '') {
            core.setFailed('storageClass is not correct.');
            return false;
        }
    }
    return true;
}
exports.checkBucketInputs = checkBucketInputs;
/**
 * 将传入的路径中的'\'替换为'/'
 * @param path
 * @returns
 */
function replaceSlash(path) {
    return path.replace(/\\/g, '/');
}
exports.replaceSlash = replaceSlash;
/**
 * 获得以rootPath开头， 并删除rootPath的path
 * 用于获得从obs下载对象时，对象应下载在本地的相对路径
 * @param rootPath
 * @param path
 * @returns
 */
function getPathWithoutRootPath(rootPath, path) {
    try {
        const aimPath = path.match(`^${rootPath}`);
        if (aimPath) {
            return path.replace(aimPath[0], '');
        }
        else {
            return path;
        }
    }
    catch (error) {
        core.info('rootPath not start with path.');
        return path;
    }
}
exports.getPathWithoutRootPath = getPathWithoutRootPath;
/**
 * 创建文件夹
 * @param path
 */
function createFolder(path) {
    if (fs.existsSync(path)) {
        return true;
    }
    try {
        fs.mkdirSync(path);
    }
    catch (error) {
        return false;
    }
    return fs.existsSync(path);
}
exports.createFolder = createFolder;
/**
 * 判断路径是否以'/'结尾
 * @param path
 * @returns
 */
function isEndWithSlash(path) {
    try {
        return path.slice(-1) === '/';
    }
    catch (error) {
        return false;
    }
}
exports.isEndWithSlash = isEndWithSlash;
/**
 * 删除字符串末尾的字符'/'
 * @param str
 * @returns
 */
function getStringDelLastSlash(str) {
    if (str) {
        return isEndWithSlash(str) ? str.substring(0, str.length - 1) : str;
    }
    return str;
}
exports.getStringDelLastSlash = getStringDelLastSlash;
/**
 * 检查文件是否超过5GB
 * @param filepath
 * @returns
 */
function isFileOverSize(filepath) {
    return fs.lstatSync(filepath).size > FILE_MAX_SIZE;
}
exports.isFileOverSize = isFileOverSize;
/**
 * 检查本地是否存在同名文件夹
 * @param localPath
 * @returns
 */
function isExistSameNameFolder(localPath) {
    return fs.existsSync(localPath) && fs.statSync(localPath).isDirectory();
}
exports.isExistSameNameFolder = isExistSameNameFolder;
/**
 * 检查本地是否存在同名文件
 *
 * @param localPath
 * @returns
 */
function isExistSameNameFile(localPath) {
    return (fs.existsSync(getStringDelLastSlash(localPath)) &&
        fs.statSync(getStringDelLastSlash(localPath)).isFile());
}
exports.isExistSameNameFile = isExistSameNameFile;
