import process from 'process';
import fs from 'fs';
import { exec } from 'child_process';

let spawnCommand = (command, args) => {
    return new Promise((resolve, reject) => {
        const child = exec(command, args);

        child.stdout.on('data', (data) => {
            process.stdout.write(`building: ${data}`);
        });

        child.stderr.on('data', (data) => {
            process.stderr.write(`building: ${data}`);
        });

        child.on('close', (code) => {
            if (code === 0) {
                resolve(code);
            } else {
                reject(new Error(`子进程退出码: ${code}`));
            }
        });

        child.on('error', (err) => {
            reject(err);
        });
    });
};

(async () => {
    const args = process.argv.slice(2);

    // 打印所有参数
    console.log('命令行参数:', args);

    const cmds = {};
    args.forEach((arg, index) => {
        const arr = arg.split('=');
        cmds[arr[0]] = arr[1];
    });

    const targetVersion = cmds['--version'];
    if (!targetVersion) {
        console.log('--version could\'t be null');
        return;
    }

    let bExist = fs.existsSync(targetVersion);
    if (!bExist) {
        console.log(targetVersion, 'does not exist.');
        return;
    }

    console.log('Generating SUMMARY.md -> summary.json');
    await spawnCommand(`node ./scripts/create-sidebar.js ${targetVersion}/en/SUMMARY.md`);
    await spawnCommand(`node ./scripts/create-sidebar.js ${targetVersion}/zh/SUMMARY.md`);
    console.log('Generating SUMMARY.md -> summary.json Complete');
    await spawnCommand(`npx vitepress build ${targetVersion}`);
})();
