const os = require('os');
const { exec } = require('child_process');

exports.getSysInfo = () => {
    const osFreeMem = os.freemem();
    const allFreeMem = (osFreeMem / (1024 * 1024));
    console.log(`Total free memory: ${Math.floor(allFreeMem)} MB`);

    const osTotalMem = os.totalmem();
    const avbMem = (osTotalMem / (1024 * 1024));
    console.log(`Total available RAM: ${Math.floor(avbMem)} MB`);

    const osUsageRam = avbMem - allFreeMem;
    console.log(`Used memory: ${Math.floor(osUsageRam)} MB`);

    const cpuCores = os.cpus();
    const cpuModels = cpuCores.map(core => core.model);
    console.log(`CPU Model: ${cpuModels[0]}`);



    function bytesToGb(bytes) {
        return (bytes / (1024 * 1024 * 1024)).toFixed(1) + 'GB';
    }


    exec('wmic logicaldisk get caption,freespace,size', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }

        const lines = stdout.trim().split('\n').slice(1);
        const disks = lines.map(line => {
            const [caption, freeSpace, size] = line.trim().split(/\s+/);
            return {
                caption,
                freeSpace: freeSpace ? bytesToGb(parseInt(freeSpace, 10)) : 'N/A',
                size: size ? bytesToGb(parseInt(size, 10)) : 'N/A'
            };
        });

        console.log('Caption  FreeSpace  Size');
        disks.forEach(disk => {
            console.log(`${disk.caption.padEnd(8)}${disk.freeSpace.padStart(10)}${disk.size.padStart(10)}`);
        });
    });
}