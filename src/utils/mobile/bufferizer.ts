import VaultRequest from '../../interfaces/req';
import yaml from 'js-yaml';

type fileDataType = {
    fileData :string
    path :string
};

type filesType = {
    files :fileDataType[]
}

export const bufferizer = async (file :string) => {
    return Buffer.from(file, 'base64');
};

export const genFiles = async (fileData :string) => {
    const jsonFileData = yaml.load(fileData, {json: true}) as filesType;

    const bufferedFileData : VaultRequest[] = [];

    for (const fileData of jsonFileData.files) {
        bufferedFileData.push({
            path: fileData.path,
            file: await bufferizer(fileData.fileData)
        });
    }

    return bufferedFileData;
};