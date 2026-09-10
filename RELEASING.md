# Release checklist

Desktop Items 的每个正式 GitHub Release 同时发布两个内容完全相同的 ZIP：

- `RightMenu-DesktopItems-<VERSION>.zip`：保留版本号，便于归档和校验。
- `RightMenu-DesktopItems.zip`：固定名称，供 README、官网和自动化永久引用。

## 1. 准备版本

确认 `package.json`、`package-lock.json` 根包、`plugin/manifest.base.json`、
`README.md` 与 `CHANGELOG.md` 中的版本一致，并完成发布提交。

## 2. 构建发布附件

```bash
npm run release:prepare
```

该命令会运行完整的 `npm run verify`，重建签名插件包，并在 `dist/` 生成版本号
附件和固定名附件。固定名附件直接复制自版本号附件，因此两者 SHA-256 必须一致。

## 3. 创建并上传 Release

创建与插件版本一致的注释标签，然后将两个 ZIP 一起上传到同一个正式 Release。

```bash
git tag -a v<VERSION> -m "发布 RightMenu Desktop Items <VERSION>"
git push origin main v<VERSION>
gh release create v<VERSION> \
  dist/RightMenu-DesktopItems-<VERSION>.zip \
  dist/RightMenu-DesktopItems.zip \
  --repo Superoutman/RightMenu-DesktopItems \
  --title "RightMenu Desktop Items <VERSION>" \
  --notes-file <RELEASE_NOTES_FILE>
```

更新已有 Release 时使用 `gh release upload v<VERSION> ...`，不得删除版本号附件。

## 4. 发布后验证

确认 Release 为非草稿、非预发布，两个附件均存在且摘要一致。随后从稳定地址实际下载，
并运行 ZIP 完整性检查：

```bash
curl -fL \
  https://github.com/Superoutman/RightMenu-DesktopItems/releases/latest/download/RightMenu-DesktopItems.zip \
  -o /tmp/RightMenu-DesktopItems.zip
unzip -t /tmp/RightMenu-DesktopItems.zip
```

稳定下载地址：

<https://github.com/Superoutman/RightMenu-DesktopItems/releases/latest/download/RightMenu-DesktopItems.zip>

该地址始终解析到最新的正式、非预发布 Release；因此每个正式 Release 都必须上传固定名附件。
