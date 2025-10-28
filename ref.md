# Claude Code 私有网关配置指南（Markdown 版）

适用于 Windows / macOS / Linux，一次配置，终端与 IDE 均可使用。以下示例将网关地址指向 `https://code.tslaai.com`，并设置 Anthropic API Key。

> 说明：为最大兼容性，settings.json 中同时设置 `ANTHROPIC_API_KEY` 与 `ANTHROPIC_AUTH_TOKEN`（两者值相同）。

---

## Windows

### 方法一：配置 settings.json（推荐，持久生效）
1) 新建文件：`%USERPROFILE%\.claude\settings.json`
2) 填入内容：

```json
{
  "env": {
    "ANTHROPIC_API_KEY": "替换为您的API Key",
    "ANTHROPIC_AUTH_TOKEN": "替换为您的API Key",
    "ANTHROPIC_BASE_URL": "https://code.tslaai.com",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1
  },
  "permissions": {
    "allow": [],
    "deny": []
  }
}
```

### 方法二：临时设置（仅当前终端有效）
- PowerShell：

```powershell
$env:ANTHROPIC_BASE_URL = "https://code.tslaai.com"
$env:ANTHROPIC_API_KEY  = "替换为您的API Key"
```

- CMD：

```cmd
set ANTHROPIC_BASE_URL=https://code.tslaai.com
set ANTHROPIC_API_KEY=替换为您的API Key
```

### 方法三：永久环境变量（图形界面或 PowerShell）
- 图形界面：此电脑 → 属性 → 高级系统设置 → 环境变量
  - 新建用户变量：`ANTHROPIC_BASE_URL` = `https://code.tslaai.com`
  - 新建用户变量：`ANTHROPIC_API_KEY` = `您的API Key`

- PowerShell 永久设置：

```powershell
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_BASE_URL','https://code.tslaai.com','User')
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY','替换为您的API Key','User')
```

重启终端后生效。

---

## macOS

### 方法一：配置 settings.json（推荐）
新建文件：`~/.claude/settings.json`

```json
{
  "env": {
    "ANTHROPIC_API_KEY": "替换为您的API Key",
    "ANTHROPIC_AUTH_TOKEN": "替换为您的API Key",
    "ANTHROPIC_BASE_URL": "https://code.tslaai.com",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1
  },
  "permissions": {
    "allow": [],
    "deny": []
  }
}
```

### 方法二：临时设置（仅当前终端有效）

```bash
export ANTHROPIC_BASE_URL="https://code.tslaai.com"
export ANTHROPIC_API_KEY="替换为您的API Key"
```

### 方法三：永久设置（写入 shell 配置文件）
- bash（默认）：

```bash
echo 'export ANTHROPIC_BASE_URL="https://code.tslaai.com"' >> ~/.bash_profile
echo 'export ANTHROPIC_API_KEY="替换为您的API Key"'       >> ~/.bash_profile
source ~/.bash_profile
```

- zsh：

```zsh
echo 'export ANTHROPIC_BASE_URL="https://code.tslaai.com"' >> ~/.zshrc
echo 'export ANTHROPIC_API_KEY="替换为您的API Key"'       >> ~/.zshrc
source ~/.zshrc
```

---

## Linux

### 方法一：临时设置（仅当前终端有效）

```bash
export ANTHROPIC_BASE_URL="https://code.tslaai.com"
export ANTHROPIC_API_KEY="替换为您的API Key"
```

### 方法二：永久设置（写入 shell 配置文件）
- bash：

```bash
echo 'export ANTHROPIC_BASE_URL="https://code.tslaai.com"' >> ~/.bashrc
echo 'export ANTHROPIC_API_KEY="替换为您的API Key"'       >> ~/.bashrc
source ~/.bashrc
```

- zsh：

```zsh
echo 'export ANTHROPIC_BASE_URL="https://code.tslaai.com"' >> ~/.zshrc
echo 'export ANTHROPIC_API_KEY="替换为您的API Key"'       >> ~/.zshrc
source ~/.zshrc
```

### 方法三：配置 settings.json
新建文件：`~/.claude/settings.json`

```json
{
  "env": {
    "ANTHROPIC_API_KEY": "替换为您的API Key",
    "ANTHROPIC_AUTH_TOKEN": "替换为您的API Key",
    "ANTHROPIC_BASE_URL": "https://code.tslaai.com",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1
  },
  "permissions": {
    "allow": [],
    "deny": []
  }
}
```

---

## 快速校验

```bash
# 查看变量（macOS/Linux）
echo $ANTHROPIC_BASE_URL
echo $ANTHROPIC_API_KEY | sed 's/.\{6\}$/******/'

# 查看变量（Windows PowerShell）
echo $env:ANTHROPIC_BASE_URL
echo $env:ANTHROPIC_API_KEY
```

可选：验证网关连通性（需已安装 curl）：

```bash
curl -s https://code.tslaai.com/v1/models | head -n 1
```

---

## 常见问题

- 终端不生效：重启终端/VS Code，再试一次。
- Key 无法识别：确认未包含空格或换行；必要时重新复制。
- 持久配置优先：建议优先使用 settings.json，跨 IDE/终端更稳定。
- 安全建议：不要把 API Key 提交到仓库；settings.json 位于用户目录，注意备份与权限。

---

## 变量说明

- `ANTHROPIC_BASE_URL`：私有网关地址（此处为 `https://code.tslaai.com`）。
- `ANTHROPIC_API_KEY` / `ANTHROPIC_AUTH_TOKEN`：Anthropic API Key（两者任选其一，建议同时设置）。
- `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`：禁用非必要网络流量，值为 `1` 时开启。
