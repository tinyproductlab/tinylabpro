export type ToolDetail = {
  slug: string;
  name: string;
  title: string;
  description: string;
  href: string;
  category: string;
  status: string;
  logo: string;
  tone: string;
  tags: string[];
  summary: string;
  audience: string[];
  features: string[];
  steps: string[];
  privacy: string;
  notes: string[];
};

export const tools: ToolDetail[] = [
{"slug": "instantqr", "name": "INSTANTQR", "title": "秒变二维码", "href": "https://qr.tinylabpro.com/", "description": "选中文字或网页链接，右键一秒生成二维码；支持图片识码、WiFi 分享、批量生成和短链。", "category": "浏览器插件", "status": "已上线", "logo": "/instantqr-logo.png", "tone": "blue", "tags": ["浏览器插件", "二维码"], "summary": "把网页文字和链接快速变成手机可扫描的二维码。", "audience": ["需要在电脑和手机间分享信息的用户"], "features": ["右键生成二维码", "图片识码与批量生成", "WiFi 分享与短链"], "steps": ["打开官网插件介绍", "选择浏览器对应的安装入口", "选中文字或链接，右键生成二维码"], "privacy": "二维码生成和图片识码在本地处理；主动使用短链时网址会发送至短链服务。", "notes": ["浏览器支持和安装方式以官网为准。"]},
{"slug": "2wx", "name": "2WX", "title": "Mac 双账号助手", "href": "https://2.tinylabpro.com/", "description": "在 Mac 上准备和维护第二个微信副本，方便使用两个账号，并检测原版更新。", "category": "Mac 软件", "status": "已上线", "logo": "/2wx-logo.svg", "tone": "green", "tags": ["macOS", "双账号"], "summary": "为 Mac 上的第二个微信账号准备独立窗口。", "audience": ["需要在 Mac 上使用两个微信账号的用户"], "features": ["自动准备本机微信副本", "独立图标区分账号", "检测原版更新并按需重建"], "steps": ["查看官网安装说明", "通过公众号领取安装包", "安装助手并扫码登录第二个账号"], "privacy": "数据处理方式以产品官网说明为准。", "notes": ["支持 macOS 13 及以上、Apple Silicon 与 Intel。", "非腾讯官方项目，使用前请阅读官网说明。"]},
{"slug": "qigugu", "name": "QIGUGU", "title": "棋咕咕", "href": "https://qi.gugujoy.com/", "description": "经典棋类小游戏合集，支持离线 AI 人机对战；前往官网了解玩法和微信小游戏入口。", "category": "经典棋类", "tone": "amber", "tags": ["棋类游戏", "微信小游戏"], "features": ["五子棋、黑白棋与跳棋", "中国象棋与国际象棋", "离线 AI 人机对战"], "status": "已上线", "logo": "/qigugu-logo.png", "summary": "经典棋类小游戏合集，支持离线 AI 人机对战；前往官网了解玩法和微信小游戏入口。", "audience": ["喜欢轻量休闲与益智游戏的玩家"], "steps": ["打开游戏官网", "选择玩法或按官网提示进入小游戏", "根据游戏说明开始体验"], "privacy": "游戏的数据处理方式请查看对应官网的隐私说明。", "notes": ["可用平台与玩法以游戏官网为准。"]},
{"slug": "numgugu", "name": "NUMGUGU", "title": "数咕咕", "href": "https://num.gugujoy.com/", "description": "18 款数字益智小游戏，数独、2048 等打开就玩，也可添加到手机主屏幕。", "category": "数字益智", "tone": "blue", "tags": ["18 款游戏", "网页可玩"], "features": ["数字益智小游戏合集", "数独与 2048 等玩法", "支持添加到主屏幕"], "status": "已上线", "logo": "/numgugu-logo.png", "summary": "18 款数字益智小游戏，数独、2048 等打开就玩，也可添加到手机主屏幕。", "audience": ["喜欢轻量休闲与益智游戏的玩家"], "steps": ["打开游戏官网", "选择玩法或按官网提示进入小游戏", "根据游戏说明开始体验"], "privacy": "游戏的数据处理方式请查看对应官网的隐私说明。", "notes": ["可用平台与玩法以游戏官网为准。"]},
{"slug": "catbox", "name": "CATBOX", "title": "Catbox 猫猫纸箱", "href": "https://catbox.gugujoy.com/", "description": "为猫咪把纸箱放到合适的位置，挑战 600 关轻松可爱的逻辑益智谜题。", "category": "逻辑益智", "tone": "rose", "tags": ["600 关", "网页可玩"], "features": ["猫咪与纸箱主题逻辑谜题", "600 个关卡", "浏览器打开即可体验"], "status": "已上线", "logo": "/catbox-logo.webp", "summary": "为猫咪把纸箱放到合适的位置，挑战 600 关轻松可爱的逻辑益智谜题。", "audience": ["喜欢轻量休闲与益智游戏的玩家"], "steps": ["打开游戏官网", "选择玩法或按官网提示进入小游戏", "根据游戏说明开始体验"], "privacy": "游戏的数据处理方式请查看对应官网的隐私说明。", "notes": ["可用平台与玩法以游戏官网为准。"]},
{"slug": "nconvo", "name": "NCONVO", "title": "NConvo 网络会话", "description": "SSH 终端、RDP 远程桌面、局域网互传与网络诊断，随身使用的网络运维工具箱。", "href": "https://nconvo.tinylabpro.com/", "category": "网络工具", "status": "已上线", "logo": "/nconvo-logo.png", "tone": "blue", "tags": ["SSH / RDP", "网络诊断", "移动端"], "summary": "把远程连接、局域网互传与常用网络工具集中在移动设备上。", "audience": ["开发者与网络运维人员"], "features": ["SSH 终端", "RDP 远程桌面", "局域网互传与网络诊断"], "steps": ["前往官网下载适合设备的版本", "添加自己的连接并核对服务器身份", "选择远程连接或网络工具"], "privacy": "连接与凭证保存在设备本地，支持 WebDAV 加密备份。", "notes": ["各平台功能与版本以官网为准。"]},
{"slug": "moonsprout", "name": "MOONSPROUT", "title": "月牙故事岛", "description": "儿童原创绘本与有声故事，支持语音朗读和家长录音，陪伴孩子的睡前阅读时光。", "href": "https://moonsprout.tinylabpro.com/", "category": "儿童阅读", "status": "已上线", "logo": "/moonsprout-logo.png", "tone": "violet", "tags": ["儿童绘本", "有声故事", "iOS"], "summary": "以原创绘本、语音朗读和家长录音提供亲子阅读体验。", "audience": ["希望和孩子一起阅读绘本的家长"], "features": ["原创绘本", "有声朗读", "家长录音"], "steps": ["前往官网浏览绘本或下载 App", "选择喜欢的故事", "阅读绘本、收听朗读或录制家长声音"], "privacy": "数据处理方式请参阅官网链接的隐私政策。", "notes": ["设备要求与可用版本请查看 App Store。"]},
  {
    slug: 'unmark', name: 'UNMARK', title: 'NotebookLM 去水印',
    description: '批量清理 PDF / PPTX 水印，导出后还可添加自己的 Logo 或文字标识。',
    href: 'https://unmark.tinylabpro.com/', category: '文档处理', status: 'NEW', logo: '/unmark-logo-128.webp', tone: 'blue', tags: ['文档处理', '手机可用'],
    summary: '用于整理自己有权处理的 NotebookLM 导出文件，减少逐页修改的重复工作，并可重新添加自己的标识。',
    audience: ['需要整理 NotebookLM 导出资料的用户', '需要批量处理 PDF 或 PPTX 页面标识的教师与内容创作者', '希望在手机或电脑浏览器中快速完成文档处理的人'],
    features: ['支持 PDF 与 PPTX 文件', '批量清理页面中的指定水印元素', '导出前可添加自己的 Logo 或文字标识', '提供适合手机和电脑使用的网页界面'],
    steps: ['打开工具并选择需要处理的文件', '按照页面提示确认处理选项', '预览结果，必要时添加自己的标识', '下载处理后的文件并自行核对内容'],
    privacy: '文件处理方式以工具页面的实时说明为准。请仅处理你拥有合法使用和修改权限的文档。',
    notes: ['处理后建议抽查关键页面，确认正文、图片和排版完整。', '复杂模板或特殊字体可能需要在原软件中再次检查。'],
  },
  {
    slug: 'teach', name: 'TEACH', title: '教师工具箱',
    description: '备课、课堂与日常教学轻量工具合集，减少重复操作。',
    href: 'https://teach.tinylabpro.com/', category: '教师工具', status: '已上线', logo: '/teach-logo-128.webp', tone: 'green', tags: ['教师工具', '打开即用'],
    summary: '把点名、分组、转盘、计分、座位表等课堂常用功能放在一个页面中，帮助教师减少重复录入和临时切换软件。',
    audience: ['中小学教师、培训讲师和班主任', '需要课堂随机点名、分组或计分的使用者', '希望在投影、平板和手机上快速打开课堂工具的人'],
    features: ['建立并切换多个班级名单', '多个课堂工具共用当前班级数据', '支持电脑、平板、手机与课堂投影', '无需注册，主要课堂数据保存在当前浏览器'],
    steps: ['创建班级并录入或粘贴学生名单', '在顶部选择当前班级', '打开点名、分组、计分等需要的工具', '需要换设备时先在设置中导出备份'],
    privacy: '班级和课堂数据默认保存在当前设备的浏览器中，不会因为打开网页而自动上传。清理浏览器数据或更换设备前请先导出备份。',
    notes: ['建议不要在学生姓名中记录不必要的敏感信息。', '无痕模式可能在关闭窗口后清除本地数据。'],
  },
  {
    slug: 'study', name: 'STUDY', title: '学生工具箱',
    description: '面向自主学习、练习与备考的轻量工具集合，让学习任务更好开始。',
    href: 'https://study.tinylabpro.com/', category: '学生工具', status: '已上线', logo: '/study-logo-128.webp', tone: 'violet', tags: ['学生工具', '自主学习'],
    summary: '按小学、初高中、大学等学习阶段整理常用小工具，让计算、练习、复习和语言学习可以从一个入口开始。',
    audience: ['需要日常学习辅助工具的学生', '希望为孩子准备简单学习入口的家长', '需要课堂练习与演示工具的教师'],
    features: ['按照学习阶段和用途浏览工具', '支持搜索全部学习工具', '覆盖计算、语文、语言与学习效率场景', '无需账号即可打开使用'],
    steps: ['选择学习阶段或进入全部工具', '搜索当前需要解决的问题', '打开对应工具并按页面提示操作', '学习记录类功能使用前先阅读数据保存说明'],
    privacy: '多数基础功能可直接在浏览器中完成。涉及学习记录的功能默认以页面说明为准，清理浏览器数据前请先确认是否需要备份。',
    notes: ['工具用于辅助理解和练习，不能替代教材、教师指导或正式考试要求。', '计算结果和参考答案应结合题目条件再次核对。'],
  },
  {
    slug: 'keyscan', name: 'KEYSCAN', title: '本地安全工具箱',
    description: '密码、OTP、加密备份与本地安全工具，重要数据尽量留在自己手里。',
    href: 'https://keyscan.tinylabpro.com/', category: '隐私安全', status: '开源', logo: '/keyscan-logo-128.webp', tone: 'amber', tags: ['隐私安全', '本地优先', '开源'],
    summary: '面向日常安全运维和开发检查，把密钥识别、密码与 OTP 辅助能力集中在一个强调本地处理的工具箱中。',
    audience: ['需要检查文本中是否误含密钥的开发者', '接触服务器、云平台和网络设备的运维人员', '重视敏感数据本地处理的个人用户'],
    features: ['帮助识别文本中的常见密钥和敏感字段', '提供密码与 OTP 相关辅助工具', '支持加密备份场景', '项目代码公开，便于检查实现方式'],
    steps: ['选择需要使用的安全工具', '阅读该功能的数据处理提示', '粘贴测试内容或在本地选择文件', '查看结果并人工确认，不直接据此删除或更换密钥'],
    privacy: '安全类数据应尽量使用脱敏样本。即使页面标注本地处理，也不建议在不受信任的设备中输入生产环境完整密钥或私钥。',
    notes: ['扫描结果可能存在漏报或误报，必须人工复核。', '如果真实密钥已经泄露，应立即撤销并轮换，而不是只删除文本。'],
  },
  {
    slug: 'otp', name: 'TINY OTP', title: 'OTP 动态验证码',
    description: '无需登录即可管理动态验证码，支持加密备份和 WebDAV 同步。',
    href: 'https://otp.tinylabpro.com/', category: '隐私安全', status: '已上线', logo: '/otp-logo-128.webp', tone: 'blue', tags: ['微信小程序', '无需登录', 'WebDAV'],
    summary: '无需注册账号即可管理常用 OTP 动态验证码，并通过用户自己的 WebDAV 空间完成加密备份和多设备同步。',
    audience: ['使用二次验证登录服务器、云平台和管理后台的人', '不希望为 OTP 工具再注册一个云端账号的用户', '拥有坚果云或其他 WebDAV 存储的用户'],
    features: ['支持常见 TOTP 动态验证码', '无需注册小产品实验室账号', '提供加密备份与恢复能力', '可连接用户自己的 WebDAV 完成同步'],
    steps: ['在微信中打开小程序并添加 OTP', '设置并妥善保存备份密码', '如需跨设备使用，在设置中配置自己的 WebDAV', '在新设备上连接同一存储并使用密码恢复'],
    privacy: '同步文件保存在用户自行选择的 WebDAV 空间中。备份密码用于保护数据，请勿与 WebDAV 密码混用，也不要把恢复信息放在同一位置。',
    notes: ['首次添加前应保存平台提供的恢复代码。', '迁移完成前不要删除旧验证器中的账户。'],
  },
  {
    slug: 'survey', name: 'SECURE SURVEY', title: '加密调查问卷',
    description: '提交前完成加密的隐私问卷工具，为敏感信息多留一层保护。',
    href: 'https://survey.tinylabpro.com/', category: '隐私安全', status: '已上线', logo: '/survey-logo-128.webp', tone: 'violet', tags: ['隐私安全', '无需安装'],
    summary: '用于需要额外保护的问卷收集场景，让填写内容在提交前完成加密，降低明文信息直接暴露的风险。',
    audience: ['需要收集较敏感反馈的个人或小团队', '希望减少问卷明文传输风险的组织者', '不想要求填写者安装专用软件的使用者'],
    features: ['填写者无需安装应用', '内容在提交前完成加密', '为问卷创建和回收提供简洁流程', '适合小范围、明确授权的信息收集'],
    steps: ['创建问卷并明确收集目的', '把填写链接发送给已经知情的参与者', '参与者填写并提交加密内容', '管理者在受信任设备中查看和妥善处理结果'],
    privacy: '加密不能替代合规告知和最少收集原则。请只收集完成目的所必需的信息，并设置合理的保留时间。',
    notes: ['不要使用问卷收集密码、短信验证码或完整私钥。', '涉及医疗、财务等高敏感数据时，应先确认适用法规和组织要求。'],
  },
  {
    slug: 'image', name: 'IMAGE', title: '图片工坊',
    description: '证件照、压缩、改尺寸、去背景等 9 个图片工具，照片默认不离开你的浏览器。',
    href: 'https://image.tinylabpro.com/', category: '图片处理', status: '已上线', logo: '/image-toolbox-logo-128.webp', tone: 'rose', tags: ['图片处理', '浏览器本地处理'],
    summary: '把压缩、尺寸调整、格式转换、证件照和排版等常用图片处理集中到一个浏览器工具箱中。',
    audience: ['临时需要处理图片但不想安装大型软件的人', '需要制作证件照或六寸排版照的用户', '需要快速压缩、裁剪或转换格式的内容创作者'],
    features: ['图片压缩与尺寸调整', '常用图片格式转换', '证件照背景和尺寸处理', '六寸照片排版与尺寸标尺预览'],
    steps: ['选择需要的图片处理工具', '从设备中选择图片', '调整尺寸、质量、背景或排版参数', '确认预览后下载结果'],
    privacy: '基础图片处理优先在当前浏览器本地完成。需要在线模型的功能会在页面中单独说明，并让用户选择是否使用。',
    notes: ['重要原图请自行保留备份。', '打印证件照前应核对办证机构的尺寸和背景要求。'],
  },
  {
    slug: 'address', name: 'ADDRESS GEN', title: '全球地址与人物资料生成器',
    description: '按 249 个国家 / 地区的本地格式生成地址与人物资料，浏览器本地生成，可批量导出。',
    href: 'https://addressgen.tinylabpro.com/', category: '实用工具', status: '已上线', logo: '/address-generator-logo-128.webp', tone: 'green', tags: ['249 国', '16 种语言', '可离线'],
    summary: '为软件开发、演示和表单测试生成结构完整的示例地址，避免在测试环境中反复使用真实个人资料。',
    audience: ['测试地址表单和国际化功能的开发者', '制作产品演示和界面样例的设计人员', '需要非真实示例资料的测试人员'],
    features: ['生成多个国家和地区的地址样例', '提供适合表单测试的结构化字段', '可批量生成并复制结果', '数据在浏览器中生成'],
    steps: ['选择国家或地区', '设置需要生成的数量和选项', '生成并复制测试数据', '仅在开发、演示和测试环境中使用'],
    privacy: '生成结果是测试用途的示例资料，不代表真实个人身份，也不应被用于身份验证、收件、开户或其他真实业务。',
    notes: ['示例地址不保证真实存在或可以接收邮件。', '使用时应遵守目标网站规则和当地法律。'],
  },
];

export const toolBySlug = Object.fromEntries(tools.map((tool) => [tool.slug, tool])) as Record<string, ToolDetail>;
