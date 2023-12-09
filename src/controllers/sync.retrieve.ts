import { Request, Response } from 'express';
import { getVault, sync } from '../services/sync';
import { unzip } from '../services/zip';
import resetTempDir from '../utils/reset_temp';
import VaultRequest, { MobileVaultRequest } from '../interfaces/req';
import YAML from 'yaml';

const syncController =async (req :Request, res :Response) => {
    const tempPath = `${__dirname}/../../temp`;
    try {
        const {platform} = req.query;

        const {name} = req.params;
        const zipFileBuffer = await getVault(name);
        if (!zipFileBuffer) return res.status(404).send({status: 'not found'});
        await unzip(name, zipFileBuffer.file);
        let vault :VaultRequest[] | MobileVaultRequest[] = await sync(name);
        if (platform == 'MOBILE') {
            vault = vault.map(v => {
                return {
                    path: v.path.replaceAll('\\', '/').replace(name, '').substring(1, v.path.length),
                    file: v.file.toString('base64')
                };
            });
            const vaultYaml = new YAML.Document();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            vaultYaml.contents = vault as any;
            return res.send(vaultYaml.toString());

        }
        res.send(vault);
        await resetTempDir(tempPath);
    } catch (e) {
        console.error(e);
        res.status(500).send('error 500 - ' + e);
        await resetTempDir(tempPath);
    }
};

export default syncController;