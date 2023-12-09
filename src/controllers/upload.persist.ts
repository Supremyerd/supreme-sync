import { Request, Response } from 'express';
import VaultRequest from '../interfaces/req';
import { compactVault } from '../services/zip';
import uploadVault from '../services/upload';
import { genFiles } from '../utils/mobile/bufferizer';

const uploadController = async (req :Request, res :Response) => {
    try {
        const {platform} = req.query;
        if (platform != 'MOBILE'){
            const {name} = req.params;
            const files :VaultRequest[] = req.body;
            console.log(files);
            const compactedVault = await compactVault(files);
            console.log(compactedVault);
            uploadVault(compactedVault, name);
        } else {
            const {name} = req.params;
            const fileData :string = req.body;
            
            const bufferedFileData = await genFiles(fileData);
            const compactedVault = await compactVault(bufferedFileData);
            console.log(compactedVault);
            uploadVault(compactedVault, name);
        }
        res.send('ok');
    } catch (e) {
        console.error(e);
        res.status(500).send('error 500 - ' + e);
    }
};

export default uploadController;