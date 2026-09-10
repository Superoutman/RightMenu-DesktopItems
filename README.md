# RightMenu Desktop Items

RightMenu 的独立“桌面文件”插件。它在桌面背景和 Finder 的桌面文件夹中提供动态菜单：桌面文件可见时显示“隐藏桌面文件”，隐藏后显示“显示桌面文件”，并通过宿主受控的可恢复能力切换可见性。

## 版本

- 插件：`1.0.2`
- 最低宿主插件 API：`1.3`

## 当前架构与设计意图

插件拥有菜单、七种语言文案、图标、权限声明和动作入口。JavaScript 不接触文件路径、Finder、AppKit、shell 或文件系统，只调用公开的 `desktopItems.toggleVisibility`。

宿主保留桌面文件标志修改、事务日志、新项目监听、异常恢复和退出恢复。这些是需要受信任 macOS 权限的通用机制，不包含插件 ID、插件文案或插件专用分支。插件被停用或卸载后，Finder 菜单立即消失；若当前仍有隐藏项目，宿主生命周期仍负责安全恢复。

Finder 菜单使用 API v1.3 的通用布尔状态标题契约。插件拥有隐藏和显示两套文案；宿主只提供能力当前状态，并在切换成功后重新发布 Finder 投影。能力返回 `{ "hidden": boolean }`，表示动作完成后的真实状态。

```text
plugin/manifest.base.json          插件 ID、API v1.3、菜单、本地化与权限
src/main.ts                        唯一入口，只识别 toggle-visibility
types/                             冻结的宿主 TypeScript 契约
assets/icon.svg                    插件自有图标
scripts/build.mjs                  打包、闭包哈希与 Ed25519 签名
scripts/verify-host.mjs            真实宿主签名、安装和 capability 验证
tests/                             动作边界与失败关闭测试
dist/DesktopItems.rightmenuplugin  可重复生成、不提交 Git 的安装包
```

## 构建与验证

```bash
npm install
npm run keygen
npm run verify
```

私钥仅保存在被 Git 忽略的 `.keys/`，不要提交或分享。

准备 GitHub Release 时运行 `npm run release:prepare`。它会完成签名验证，并同时生成
带版本号和固定名称的两个相同 ZIP；完整流程见 [RELEASING.md](RELEASING.md)。

## 安装

构建后双击 `dist/DesktopItems.rightmenuplugin`，或在 RightMenu 的插件设置页导入。签名安装后能力默认授权，菜单可立即使用；用户可随时停用或删除插件。

最新正式版本也可从固定地址下载：
[RightMenu-DesktopItems.zip](https://github.com/Superoutman/RightMenu-DesktopItems/releases/latest/download/RightMenu-DesktopItems.zip)。
