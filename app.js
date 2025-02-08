const express = require('express');
const os = require('os');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

function getSystemInfo() {
  const cpus = os.cpus();
  const cpuModel = cpus[0] ? cpus[0].model : 'Bilinmiyor';

  return {
    hostname: os.hostname(),
    osType: os.type(),
    release: os.release(),
    platform: os.platform(),
    architecture: os.arch(),
    totalMemory: (os.totalmem() / 1024 / 1024).toFixed(2) + ' MB',
    freeMemory: (os.freemem() / 1024 / 1024).toFixed(2) + ' MB',
    uptime: `${Math.floor(os.uptime() / 3600)} saat ${(os.uptime() % 3600) / 60} dakika`,
    cpuCount: cpus.length,
    cpuModel: cpuModel,
    cpuSpeed: cpus[0] ? cpus[0].speed + ' MHz' : 'Bilinmiyor',
    loadAverage: os.loadavg().map(avg => avg.toFixed(2)),
    networkInterfaces: os.networkInterfaces(),
    nodeVersion: process.version,
    processUptime: `${Math.floor(process.uptime() / 60)} dakika ${Math.floor(process.uptime() % 60)} saniye`,
    processMemoryUsage: (process.memoryUsage().rss / 1024 / 1024).toFixed(2) + ' MB',
    userInfo: os.userInfo(),
    environmentVariables: process.env,
    homeDir: os.homedir(),
    activeProcesses: process.pid,
    currentDirectory: process.cwd()
  };
}

app.get('/system', (req, res) => {
  const systemInfo = getSystemInfo();
  res.render('system', { systemInfo });
});

app.listen(3000, () => {
  console.log('Sunucu çalışıyor...');
});
