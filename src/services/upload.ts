import prismadb from '../database';

const uploadVault = async (vaultBuffer :Buffer, vaultName :string) => {
    const alreadyExistentVault = await prismadb.sVault.findFirst({where: {name: vaultName}});
    if (!alreadyExistentVault){
        console.log('2');
        await prismadb.sVault.create({
            data: {
                file: vaultBuffer,
                name: vaultName
            }
        });
    }
    else{ 
        console.log('1');
        await prismadb.sVault.update({
            where: {id: alreadyExistentVault.id},
            data: {
                file: vaultBuffer
            }
        });
    }
};

export default uploadVault;