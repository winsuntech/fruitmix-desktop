import fs from 'original-fs'
import i18n from 'i18n'
import path from 'path'
import { dialog, ipcMain } from 'electron'
import { getMainWindow } from './window'
import { boxUploadAsync } from './server'
import hashFileAsync from './filehash'

Promise.promisifyAll(fs) // babel would transform Promise to bluebird

/* only read files */
const readAsync = async (entries, args) => {
  const files = []
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    const filename = path.parse(entry).base
    const stat = await fs.lstatAsync(path.resolve(entry))
    if (!stat.isFile()) continue

    const size = stat.size
    const parts = await hashFileAsync(entry, size, 1024 * 1024 * 1024)
    const sha256 = parts.slice(-1)[0].fingerprint
    files.push({ entry, filename, size, sha256 })
  }

  await boxUploadAsync(files, args)
}

/* handler */
const uploadHandle = (event, args) => {
	const { session, box } = args
	const boxUUID = box.uuid
	// only allow upload single File
  // const dialogType = type === 'directory' ? 'openDirectory' : 'openFile'
	// dialog.showOpenDialog(getMainWindow(), { properties: [dialogType, 'multiSelections'] }, (entries) => {
	dialog.showOpenDialog(getMainWindow(), { properties: ['openFile'] }, (entries) => {
    if (!entries || !entries.length) return
    readAsync(entries, args).then(() => {
      getMainWindow().webContents.send('BOX_UPLOAD_RESULT', { session, boxUUID, success: true })
    }).catch((err) => {
      const body = err && err.response && err.response.body
      console.log('box upload error', body || err)
      getMainWindow().webContents.send('BOX_UPLOAD_RESULT', { session, boxUUID, success: false })
    })
  })
}

/* ipc listener */
ipcMain.on('BOX_UPLOAD', uploadHandle)
