import fs from 'fs';
import path from 'path';

const resetTempDir = (dirPath :string) => {
    fs.rmSync(path.resolve(dirPath), {force: true, recursive: true});
};

export default resetTempDir;