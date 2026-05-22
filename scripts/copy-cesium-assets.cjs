const fs = require('fs')
const path = require('path')

const pkgRoot = path.resolve(__dirname, '..')
const cesiumBuild = path.join(pkgRoot, 'node_modules', 'cesium', 'Build', 'Cesium')
const dest = path.join(pkgRoot, 'public', 'cesium')

function copyDir(src, destDir) {
  if (!fs.existsSync(src)) return
  fs.mkdirSync(destDir, { recursive: true })
  for (const item of fs.readdirSync(src)) {
    const s = path.join(src, item)
    const d = path.join(destDir, item)
    const stat = fs.statSync(s)
    if (stat.isDirectory()) copyDir(s, d)
    else fs.copyFileSync(s, d)
  }
}

try {
  console.log('Copying Cesium static assets...')
  copyDir(path.join(cesiumBuild, 'Widgets'), path.join(dest, 'Widgets'))
  copyDir(path.join(cesiumBuild, 'Workers'), path.join(dest, 'Workers'))
  copyDir(path.join(cesiumBuild, 'Assets'), path.join(dest, 'Assets'))
  console.log('Cesium assets copied to public/cesium')
} catch (e) {
  console.error('Failed to copy Cesium assets:', e)
  process.exit(1)
}
