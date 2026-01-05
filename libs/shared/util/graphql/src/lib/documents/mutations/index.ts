import fs from 'fs'
import path from 'path'

/** Upload */
export const uploadFiles = fs.readFileSync(
  path.join(__dirname, 'upload/upload.gql'),
  'utf8'
)
export const assignUpload = fs.readFileSync(
  path.join(__dirname, 'upload/assignUpload.gql'),
  'utf8'
)

/** User */
export const addUser = fs.readFileSync(
  path.join(__dirname, 'admin/addUser.gql'),
  'utf8'
)
export const userUpdate = fs.readFileSync(
  path.join(__dirname, 'admin/userUpdate.gql'),
  'utf8'
)
export const removeUser = fs.readFileSync(
  path.join(__dirname, 'admin/removeUser.gql'),
  'utf8'
)
export const resetPwd = fs.readFileSync(
  path.join(__dirname, 'admin/resetPwd.gql'),
  'utf8'
)
export const changePwd = fs.readFileSync(
  path.join(__dirname, 'admin/changePwd.gql'),
  'utf8'
)

/** Article */
export const articleImport = fs.readFileSync(
  path.join(__dirname, 'article/articleImport.gql'),
  'utf8'
)
export const articleSetCasuistry = fs.readFileSync(
  path.join(__dirname, 'article/articleSetCasuistry.gql'),
  'utf8'
)
export const articleRemoveCasuistry = fs.readFileSync(
  path.join(__dirname, 'article/articleRemoveCasuistry.gql'),
  'utf8'
)
export const articleUpdateCategory = fs.readFileSync(
  path.join(__dirname, 'article/articleUpdateCategory.gql'),
  'utf8'
)
export const articleSetGuideline = fs.readFileSync(
  path.join(__dirname, 'article/articleSetGuideline.gql'),
  'utf8'
)
export const articleRemoveGuideline = fs.readFileSync(
  path.join(__dirname, 'article/articleRemoveGuideline.gql'),
  'utf8'
)
export const articleLinkItem = fs.readFileSync(
  path.join(__dirname, 'article/articleLinkItem.gql'),
  'utf8'
)
export const articleLinkLabel = fs.readFileSync(
  path.join(__dirname, 'article/articleLinkLabel.gql'),
  'utf8'
)
export const articleUpdateSynonym = fs.readFileSync(
  path.join(__dirname, 'article/articleUpdateSynonym.gql'),
  'utf8'
)
export const articleCreateTable = fs.readFileSync(
  path.join(__dirname, 'article/articleCreateTable.gql'),
  'utf8'
)
export const articleToggleTableColRow = fs.readFileSync(
  path.join(__dirname, 'article/articleToggleTableColRow.gql'),
  'utf8'
)
export const articleUpdateTable = fs.readFileSync(
  path.join(__dirname, 'article/articleUpdateTable.gql'),
  'utf8'
)
export const articleModifyTable = fs.readFileSync(
  path.join(__dirname, 'article/articleModifyTable.gql'),
  'utf8'
)
export const articleUpdateIntro = fs.readFileSync(
  path.join(__dirname, 'article/articleUpdateIntro.gql'),
  'utf8'
)
export const articleInsertItem = fs.readFileSync(
  path.join(__dirname, 'article/articleInsertItem.gql'),
  'utf8'
)
export const articleGroupItem = fs.readFileSync(
  path.join(__dirname, 'article/articleGroupItem.gql'),
  'utf8'
)
export const articleUpdateOrder = fs.readFileSync(
  path.join(__dirname, 'article/articleUpdateOrder.gql'),
  'utf8'
)
export const articleUpdateContent = fs.readFileSync(
  path.join(__dirname, 'article/articleUpdateContent.gql'),
  'utf8'
)
export const articleRemoveItem = fs.readFileSync(
  path.join(__dirname, 'article/articleRemoveItem.gql'),
  'utf8'
)
export const articleUpdateContext = fs.readFileSync(
  path.join(__dirname, 'article/articleUpdateContext.gql'),
  'utf8'
)
export const articleUpdateType = fs.readFileSync(
  path.join(__dirname, 'article/articleUpdateType.gql'),
  'utf8'
)
