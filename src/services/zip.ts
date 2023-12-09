import VaultRequest from '../interfaces/req';
import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import resetTempDir from '../utils/reset_temp';

const createVaultReplica = (vaultRequest :VaultRequest[], defaultPath :string) => {
    for (const vaultFile of vaultRequest) {
        const filePath = vaultFile.path;
        let dir = '';
        filePath.split('/').forEach(filePath => {
            if(!filePath.includes('.')) {
                dir += filePath + '/';
            }
        });
        console.log(path.resolve(defaultPath + dir));
        fs.mkdirSync(path.resolve(defaultPath + dir), {recursive: true});


        fs.writeFileSync(path.resolve(`${defaultPath}/${vaultFile.path}`), Buffer.from(vaultFile.file));   
    }
};



const compactVault = async (vaultRequest :VaultRequest[]) => {
    const Zip = new AdmZip();
    const defaultPath = `${__dirname}/../../temp/vault`;
    const tempPath = `${__dirname}/../../temp`;

    
    createVaultReplica(vaultRequest, defaultPath);
    const outputFile = 'temp/output.zip';
    Zip.addLocalFolder(path.resolve(defaultPath));
    Zip.writeZip(outputFile);


    const zipFile = fs.readFileSync('temp/output.zip');
    resetTempDir(tempPath);
    return zipFile;
};



const unzip = async (vaultName :string, vaultBuffer :Buffer) => {
    const tempPath = `${__dirname}/../../temp`;
    const defaultPath = tempPath + '/' + vaultName;
    const filePath = tempPath + `/${vaultName}.zip`;
    fs.mkdirSync(defaultPath, {recursive: true});
    fs.writeFileSync(filePath, vaultBuffer);

    const zip = new AdmZip(filePath);
    zip.extractAllTo(defaultPath);
};

export {
    compactVault,
    unzip
};