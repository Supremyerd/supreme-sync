import prismadb from '../database';
import fs from 'fs';
import path from 'path';
import VaultRequest from '../interfaces/req';
import resetTempDir from '../utils/reset_temp';

const getVault = async (vault :string) => {
    return await prismadb.sVault.findFirst({where: {name: vault}});
};

const sync = async (vaultName :string) => {
    const tempPath = `${__dirname}/../../temp`;
    const defaultPathString= tempPath + '/' + vaultName;
    const defaultPath = path.resolve(defaultPathString);

    const files :VaultRequest[]= [];
    
    pathReader(defaultPath, files);
    resetTempDir(`${__dirname}/../../temp/vault`);
    return files;
};

const pathReader = (defaultPath :string, files :VaultRequest[]) => {
    fs.readdirSync(defaultPath).forEach(readResult => {
        const isFile = readResult.includes('.');
        if (isFile) {
            const filePath = path.resolve(`${defaultPath}/${readResult}`);
            const file = fs.readFileSync(filePath);
            files.push({
                file,
                path: filePath.split('temp')[1]
            });
        } else {
            pathReader(path.resolve(`${defaultPath}/${readResult}`), files);
        }
    });
};

export { 
    getVault,
    sync
};