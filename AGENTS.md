# RightMenu Desktop Items project instructions

- 本仓库只维护 Desktop Items 插件；RightMenu 宿主和其他插件属于独立仓库。
- 插件拥有菜单、文案、图标、权限声明、测试、签名和版本；桌面文件标志、恢复日志与退出恢复由宿主受控能力实现。
- 只有缺少或损坏通用宿主 API、能力、生命周期、安装、安全或兼容机制时才修改宿主；不得要求宿主加入本插件 ID 专用逻辑。
- 插件版本以 `package.json` 为维护入口，并同步 `package-lock.json` 根包版本、`plugin/manifest.base.json`、README 与 CHANGELOG。
- 未指定版本时，可分发改动默认递增补丁版本；宿主版本变化不自动改变本插件版本。
- 私钥、`dist/` 和 `node_modules/` 永不提交；提交前至少运行 `npm test`，涉及签名或宿主契约时运行 `npm run verify`。
