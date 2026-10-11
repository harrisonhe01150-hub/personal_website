// EN / 中文 toggle for harrisonhe.com
// English is what is written in index.html; Chinese strings live here, keyed by data-i18n.
// Attributes: data-i18n (innerHTML), data-i18n-title (title), data-i18n-aria (aria-label).
(function () {
    'use strict';
    const ZH = {
    "meta.title": "Harrison He - 数学与 AI",
    "lang.label": "EN",
    "lang.aria": "Switch to English",
    "nav.about": "关于",
    "nav.experience": "经历",
    "nav.education": "教育",
    "nav.achievements": "成就",
    "nav.talk": "联系我",
    "hero.title": "你好，我是 <span class=\"gradient-text\">Harrison He</span>。",
    "hero.subtitle": "UIUC 数学系 2030 届 · 数学奥林匹克获奖者",
    "hero.cta1": "查看我的经历",
    "hero.cta2": "下载简历",
    "about.title": "关于我",
    "about.p1": "我是 Harrison He（何雨辰）。我的学业方向是<strong>伊利诺伊大学厄巴纳-香槟分校（UIUC）</strong>的数学与计算机科学，但我的身份远不止于课堂。作为一个 <strong>INTJ</strong>，我习惯用分析和客观的逻辑面对挑战，同时也有很强的好奇心，想从不同角度去体验生活。",
    "about.p2": "我喜欢保持运动、探索新环境——攀岩、徒步、打羽毛球，或者在密室里解谜。放松的时候，我多半在听音乐、泡功夫茶、看网文，或者来一局<em>《英雄联盟》</em>。",
    "about.stat1": "数学与进阶数学",
    "about.stat2": "小时社区服务",
    "exp.title": "经历",
    "exp.dxl.role": "创始人 &amp; 开发者",
    "exp.dxl.company": "<a href=\"dianxiaoli.html\" title=\"技术说明\" style=\"border-bottom: 1px solid rgba(205,213,220,0.35);\">店小力 · Dianxiaoli — AI 数字店员</a> <span style=\"font-size: 0.9em; opacity: 0.7; font-weight: normal; margin-left: 10px;\">| 2026 年 4 月 – 至今</span>",
    "exp.dxl.desc": "做了一个住在微信客服和 WhatsApp 里的 AI 店员，服务批发商、工厂和零售商：全天候用买家的语言答疑，按店铺自己的价目表报价，确认订单后交回老板。目前在中国和南非有三家付费客户在用；一个人开发上线，带 21 套测试、1,458 项检查的自动化质量门禁（2026 年 5 月以来 23 个版本），模型在 DeepSeek、Anthropic、OpenAI 之间路由；2026 年 9 月起支持多租户、员工角色和四个行业包。<a href=\"dianxiaoli.html\" style=\"color: var(--accent-mist); border-bottom: 1px solid rgba(205,213,220,0.35); white-space: nowrap;\">阅读技术说明 →</a>",
    "exp.dxm.role": "外部 AI 产品合作 — AI 人才计划（小满摘星计划）",
    "exp.dxm.company": "度小满金融（百度旗下金融科技公司） <span style=\"font-size: 0.9em; opacity: 0.7; font-weight: normal; margin-left: 10px;\">| 2026 年 9 月 – 至今</span>",
    "exp.dxm.desc": "在 2026 AI 先锋未来人才大赛的度小满命题入围之后（见「成就」），入选度小满 AI 人才计划，以外部合作的形式为其小微商户开发标准化、多租户版本的店小力——负责产品和工程，带两位计划分配的协作者，并与对方团队一起设计经商户授权的数据接口。产品达到规模后计划成立合资公司。",
    "exp.shadow.role": "精算实习观摩",
    "exp.disc.company": "Discovery <span style=\"font-size: 0.9em; opacity: 0.7; font-weight: normal; margin-left: 10px;\">| 2024 年 4 月</span>",
    "exp.disc.desc": "跟随执业精算师工作，第一手了解南非最大金融服务集团之一的风险评估、定价模型和日常工作。",
    "exp.argen.company": "Argen Actuarial Solution <span style=\"font-size: 0.9em; opacity: 0.7; font-weight: normal; margin-left: 10px;\">| 2024 年 5 月</span>",
    "exp.argen.desc": "在一家专业精算咨询公司观摩精算咨询实务，了解精算估值、财务建模和客户咨询服务。",
    "edu.title": "教育",
    "edu.uiuc.name": "伊利诺伊大学厄巴纳-香槟分校",
    "edu.uiuc.date": "预计 2030 年毕业",
    "edu.uiuc.degree": "数学学士",
    "edu.uiuc.note": "转入数学与计算机科学专业",
    "edu.sjc.name": "St John's College（约翰内斯堡）",
    "edu.sjc.date": "已毕业 — A Level",
    "edu.sjc.degree": "剑桥 A-Level 课程",
    "edu.sjc.note": "在 Crawford College Sandton 就读四年后转入 St John's College 完成 A-Level。",
    "edu.chip.maths": "A* 数学",
    "edu.chip.fm": "A* 进阶数学",
    "edu.chip.chinese": "A 中文",
    "edu.chip.physics": "A 物理",
    "edu.chip.chem": "B 化学",
    "ach.title": "项目与成就",
    "ach.proj.title": "🖥️ 项目",
    "ach.proj.dxl": "店小力 · Dianxiaoli — 小商家价格、库存、订单的唯一事实来源，买家、员工和老板都通过已经在用的聊天软件查询。报价、议价、记录订单、处理付款截图，安全规则写在代码里而不是提示词里。一个人开发；两大洲三家付费商户在用。<a href=\"dianxiaoli.html\" style=\"color: var(--accent-mist); border-bottom: 1px solid rgba(205,213,220,0.35); white-space: nowrap;\">技术说明 →</a>",
    "ach.proj.tutor": "做了一个 AI 学习助教：读取学生手写的真题答案，按逻辑判分（接受任何正确方法），逐步讲解错误，并当场生成新的练习题。",
    "ach.proj.web": "从零用 HTML、CSS 和 JavaScript 搭建了这个个人网站——包括 AI 土地公「青」的聊天。",
    "ach.ai.title": "🤖 AI 与创业",
    "badge.inprogress": "进行中",
    "ach.ai.feishu": "2026 AI 先锋未来人才大赛（飞书 / 字节跳动联合北大、复旦、中大、西交共建；109 道企业命题）——以店小力单人参赛，入围度小满和钛动两道企业命题，并在企业教练指导下分别完成部署和演示（2026 年 7–8 月）。",
    "ach.ai.loreal": "欧莱雅第二届美妆科技黑客松（阿里天池）——组队参赛，内容真实性赛道；负责裁决流程、Agent、网页端和图像取证。",
    "ach.ai.unity": "2026 Unity 开发挑战赛（Codely+ 赛道）——团队游戏《余数 / REMAINDER》；负责游戏运行平台和各模块整合。",
    "ach.ai.gosim": "GOSIM 智能体巡天黑客松 2026 —— 作品进行中。",
    "ach.math.title": "🏆 数学竞赛",
    "ach.math.samo": "南非数学奥林匹克 — 第 4 名（2021）、第 7 名（2022）、前 50（2023）、前 20（2024）、前 20（2025）",
    "ach.math.wits": "威特沃特斯兰德大学数学竞赛前 10 — 2023 至 2025（洲际级别）",
    "ach.math.team": "南非团体数学竞赛第 2 名 — 2021 至 2024；2025 年第 4 名",
    "ach.math.emo": "爱沙尼亚数学公开赛南非区前 20–50 名",
    "ach.math.imo": "参加南非 IMO 选拔集训营（斯泰伦博斯大学）— 2021 至 2024",
    "ach.info.title": "💻 信息学",
    "ach.info.saio": "通过南非信息学奥林匹克第一轮 — 2023 和 2024",
    "ach.info.eio": "参加爱沙尼亚信息学公开赛 — 南非区前 15",
    "ach.sport.title": "🥋 体育与其他",
    "ach.sport.swim": "南非二级游泳运动员",
    "ach.sport.go": "中国围棋职业初段",
    "ach.sport.tkd": "跆拳道黑带",
    "ach.sport.lol": "UIUC Illini 电竞《英雄联盟》三队打野",
    "contact.title": "联系我",
    "contact.text": "我对精算、AI、机器学习工程、量化金融、数学和科技方向的新机会都持开放态度。有问题，或者只是想打个招呼，都欢迎联系！",
    "contact.location": "南非约翰内斯堡",
    "contact.phone": "+1 (217) 202-6283",
    "contact.cta": "打个招呼",
    "qing.title": "和青聊聊（AI）",
    "qing.aria": "和 AI 土地公「青」聊天",
    "qing.tooltip": "我是这里的土地公，需要帮忙吗？",
    "qing.close": "关闭聊天",
    "footer.text": "&copy; <span id=\"footer-year\">2026</span> Harrison He. 保留所有权利。"
};

    const STORAGE_KEY = 'lang';
    let saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* storage blocked: stay in memory */ }
    const browserZh = (navigator.language || '').toLowerCase().startsWith('zh');
    let lang = saved || (browserZh ? 'zh' : 'en');

    function cacheEnglish() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
        });
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            if (el.dataset.enTitle === undefined) el.dataset.enTitle = el.getAttribute('title') || '';
        });
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            if (el.dataset.enAria === undefined) el.dataset.enAria = el.getAttribute('aria-label') || '';
        });
    }

    function apply(next) {
        lang = next;
        const zh = lang === 'zh';
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (zh) { if (ZH[key] !== undefined) el.innerHTML = ZH[key]; }
            else if (el.dataset.en !== undefined) el.innerHTML = el.dataset.en;
        });
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.dataset.i18nTitle;
            el.setAttribute('title', zh && ZH[key] !== undefined ? ZH[key] : el.dataset.enTitle);
        });
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.dataset.i18nAria;
            el.setAttribute('aria-label', zh && ZH[key] !== undefined ? ZH[key] : el.dataset.enAria);
        });
        document.documentElement.setAttribute('lang', zh ? 'zh-CN' : 'en');
        // footer year is re-created by innerHTML above; keep it current
        const yearEl = document.getElementById('footer-year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    }

    function init() {
        cacheEnglish();
        if (lang === 'zh') apply('zh');
        const btn = document.getElementById('lang-toggle');
        if (btn) btn.addEventListener('click', () => apply(lang === 'zh' ? 'en' : 'zh'));
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
