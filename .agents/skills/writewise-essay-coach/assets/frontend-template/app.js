(() => {
  "use strict";

  const SAMPLE_ESSAY = `Should We Use AI in Education?

Nowadays, the development of artificial intelligence have changed the way we live and study. Students can easily to access a large amount of information on the Internet, and teachers may use intelligent tools to prepare their lessons. There have many advantages of this trend. For example, AI can help us answer questions quickly and make our daily life more easier.

However, some people is worried that students will depend on AI too much. Although technology bring us convenience, but it may also weaken our ability to think independently. In my opinion, we should learning to use AI as a useful tool, and we must keep thinking by ourselves.`;

  const SAMPLE_POLISHED = `Should We Use AI in Education?

Nowadays, the development of artificial intelligence has changed the way we live and study. Students can easily access a large amount of information on the Internet, and teachers can use intelligent tools to prepare their lessons. This trend offers many advantages. For example, AI can help us answer questions quickly and make our daily lives easier.

However, some people are worried that students will depend on AI too much. Although technology brings us convenience, it may also weaken our ability to think independently. In my opinion, we should learn to use AI as a useful tool while continuing to think for ourselves.`;

  const SAMPLE_RESULT = {
    errors: [
      {
        position: "第 2 段 · 第 1 句",
        original: "the development ... have changed",
        corrected: "the development ... has changed",
        reason: "主语中心词 development 是单数，现在完成时的谓语应使用 has。",
        label: "主谓一致"
      },
      {
        position: "第 2 段 · 第 2 句",
        original: "can easily to access",
        corrected: "can easily access",
        reason: "情态动词 can 后应直接接动词原形，不需要加 to。",
        label: "动词形式"
      },
      {
        position: "第 2 段 · 第 3 句",
        original: "There have many advantages",
        corrected: "There are many advantages",
        reason: "表示“存在”时使用 There be 结构，复数名词搭配 are。",
        label: "固定结构"
      },
      {
        position: "第 2 段 · 第 4 句",
        original: "more easier",
        corrected: "much easier",
        reason: "easier 本身已是比较级，不能用 more 重复修饰。",
        label: "比较级"
      },
      {
        position: "第 3 段 · 第 2 句",
        original: "Although ... , but ...",
        corrected: "Although ..., ...",
        reason: "Although 和 but 不能在同一个主从复合句中同时使用。",
        label: "句子结构"
      },
      {
        position: "第 3 段 · 第 1 句",
        original: "some people is worried",
        corrected: "some people are worried",
        reason: "people 是复数名词，谓语动词应使用 are。",
        label: "主谓一致"
      },
      {
        position: "第 3 段 · 第 3 句",
        original: "should learning",
        corrected: "should learn",
        reason: "情态动词 should 后应使用动词原形。",
        label: "动词形式"
      }
    ],
    polished: SAMPLE_POLISHED,
    score: {
      total: 15,
      grammar: 3,
      vocabulary: 3,
      sentence: 3,
      logic: 3
    },
    suggestions: [
      {
        title: "减少基础语法错误",
        body: "重点关注主谓一致、情态动词后的动词形式，以及 Although 与 but 的搭配。"
      },
      {
        title: "让论证更有层次",
        body: "在“优点—担忧—个人观点”之间加入具体例子，可以增强文章的说服力。"
      },
      {
        title: "丰富表达方式",
        body: "尝试用 while、whereas 等连接词呈现对比，避免过多使用简单并列句。"
      }
    ],
    summary:
      "观点明确，结构完整，已经具备清晰的“现象—优点—担忧—结论”框架。修正基础语法后，文章会更流畅，也更容易获得高分。",
    status: "稳步提升"
  };

  const STANDARDS = {
    四级: {
      name: "四级 · CET-4",
      target: 150,
      minWords: 120,
      maxWords: 180,
      range: "120–180 词",
      scale: "15 分制",
      focus: "重点看基础语法、常用词汇和清晰结构，表达准确比追求难词更重要。",
      scoreMode: "sum",
      criteria: [
        { key: "grammar", label: "语言准确性", max: 4 },
        { key: "vocabulary", label: "词汇丰富度", max: 4 },
        { key: "sentence", label: "句式多样性", max: 4 },
        { key: "logic", label: "逻辑连贯性", max: 3 }
      ]
    },
    六级: {
      name: "六级 · CET-6",
      target: 175,
      minWords: 150,
      maxWords: 200,
      range: "150–200 词",
      scale: "15 分制",
      focus: "在准确表达之上，关注词汇层次、句式变化和段落间的论证衔接。",
      scoreMode: "sum",
      criteria: [
        { key: "grammar", label: "语言准确性", max: 4 },
        { key: "vocabulary", label: "词汇丰富度", max: 4 },
        { key: "sentence", label: "句式多样性", max: 4 },
        { key: "logic", label: "论证连贯性", max: 3 }
      ]
    },
    考研: {
      name: "考研英语 · 大作文",
      target: 180,
      minWords: 160,
      maxWords: 200,
      range: "160–200 词",
      scale: "20 分制",
      focus: "强调内容要点、论证深度、学术表达与篇章组织，减少口语化表达。",
      scoreMode: "sum",
      criteria: [
        { key: "grammar", label: "语言准确性", max: 5 },
        { key: "vocabulary", label: "词汇与搭配", max: 5 },
        { key: "sentence", label: "句式复杂度", max: 5 },
        { key: "logic", label: "篇章逻辑", max: 5 }
      ]
    },
    雅思小作文: {
      name: "IELTS · Task 1",
      target: 175,
      minWords: 150,
      maxWords: null,
      range: "至少 150 词",
      scale: "Band 1–9",
      focus: "描述图表或流程的关键特征，按任务完成度、连贯衔接、词汇资源和语法范围各 0–9 分评估。",
      scoreMode: "ielts",
      criteria: [
        { key: "sentence", label: "任务完成度", max: 9 },
        { key: "logic", label: "连贯与衔接", max: 9 },
        { key: "vocabulary", label: "词汇资源", max: 9 },
        { key: "grammar", label: "语法范围与准确性", max: 9 }
      ]
    },
    雅思大作文: {
      name: "IELTS · Task 2",
      target: 275,
      minWords: 250,
      maxWords: null,
      range: "至少 250 词",
      scale: "Band 1–9",
      focus: "完整回应题目并展开论证，按任务回应、连贯衔接、词汇资源和语法范围各 0–9 分评估。",
      scoreMode: "ielts",
      criteria: [
        { key: "sentence", label: "任务回应", max: 9 },
        { key: "logic", label: "连贯与衔接", max: 9 },
        { key: "vocabulary", label: "词汇资源", max: 9 },
        { key: "grammar", label: "语法范围与准确性", max: 9 }
      ]
    }
  };

  const correctionPatterns = [
    {
      pattern: /\bthere (?:have|has) (many|some|several|two|three|a few)\b/gi,
      replace: "There are $1",
      reason: "表示“存在”时使用 There be 结构；复数名词搭配 are。",
      label: "固定结构"
    },
    {
      pattern: /\b(technology|education|information|pollution|development) have\b/gi,
      replace: "$1 has",
      reason: "单数抽象名词作主语时，现在完成时的谓语应使用 has。",
      label: "主谓一致"
    },
    {
      pattern: /\bcan (easily |also |still |often )?to (\w+)\b/gi,
      replace: (_, adverb, verb) => `can ${adverb || ""}${verb}`,
      reason: "情态动词后直接使用动词原形，不需要 to。",
      label: "动词形式"
    },
    {
      pattern: /\b(should|must|can|could|may|might|will|would) (learning|going|doing|making|taking|using|thinking)\b/gi,
      replace: (_, modal, verb) => {
        const baseForms = {
          learning: "learn",
          going: "go",
          doing: "do",
          making: "make",
          taking: "take",
          using: "use",
          thinking: "think"
        };
        return `${modal} ${baseForms[verb.toLowerCase()] || verb}`;
      },
      reason: "情态动词后应使用动词原形。",
      label: "动词形式"
    },
    {
      pattern: /\bmore (easier|better|worse|faster|slower|bigger|smaller)\b/gi,
      replace: "much $1",
      reason: "该词本身已经是比较级，不能用 more 重复修饰。",
      label: "比较级"
    },
    {
      pattern: /\b(people|students|children|teachers) (is|was|has)\b/gi,
      replace: (_, subject, verb) => {
        const map = { is: "are", was: "were", has: "have" };
        return `${subject} ${map[verb.toLowerCase()] || verb}`;
      },
      reason: "复数主语需要搭配复数形式的谓语动词。",
      label: "主谓一致"
    },
    {
      pattern: /\bAlthough ([^,.!?]+), but\b/gi,
      replace: (_, clause) => `Although ${clause},`,
      reason: "Although 和 but 不能在同一个主从复合句中同时使用。",
      label: "句子结构"
    },
    {
      pattern: /\bIn nowadays\b/gi,
      replace: "Nowadays",
      reason: "nowadays 本身是副词，前面不需要加 in。",
      label: "搭配错误"
    },
    {
      pattern: /\bdiscuss about\b/gi,
      replace: "discuss",
      reason: "discuss 是及物动词，后面直接接讨论对象。",
      label: "搭配错误"
    },
    {
      pattern: /\bAccording to me\b/gi,
      replace: "In my opinion",
      reason: "According to 通常用于引用他人或资料，表达个人观点用 In my opinion。",
      label: "地道表达"
    },
    {
      pattern: /\bthe reason is because\b/gi,
      replace: "the reason is that",
      reason: "the reason is 后使用 that 引导表语从句更自然。",
      label: "句子结构"
    },
    {
      pattern: /\bI very (like|enjoy|want|need)\b/gi,
      replace: "I really $1",
      reason: "副词 really 比 very 更适合直接修饰动词。",
      label: "词序"
    },
    {
      pattern: /\bvery unique\b/gi,
      replace: "unique",
      reason: "unique 表示“独一无二”，不能用 very 修饰。",
      label: "用词"
    },
    {
      pattern: /\binformations\b/gi,
      replace: "information",
      reason: "information 是不可数名词，没有复数形式。",
      label: "名词单复数"
    },
    {
      pattern: /\badvices\b/gi,
      replace: "advice",
      reason: "advice 是不可数名词，没有复数形式。",
      label: "名词单复数"
    },
    {
      pattern: /\bMy English journey was started\s+with\b/gi,
      replace: "My English journey began with",
      reason: "journey 与 begin 搭配更自然，无需使用被动语态。",
      label: "动词搭配"
    },
    {
      pattern: /\bwho was the guide belong the way\b/gi,
      replace: "who guided me along the way",
      reason: "guide 与 belong 的连接方式不符合英语语法；who guided me along the way 才能表达“在旅途中引导我”。",
      label: "语法 / 中式英语"
    },
    {
      pattern: /\btelent\b/gi,
      replace: "talent",
      reason: "此处应使用 talent，表示“天赋”。",
      label: "拼写错误"
    },
    {
      pattern: /\bAfter which,/gi,
      replace: "After that,",
      reason: "After which 在这里单独成句会造成句子不完整，使用 After that 更清楚。",
      label: "句子结构"
    },
    {
      pattern: /\bwas simulated by\b/gi,
      replace: "was inspired by",
      reason: "simulate 表示“模拟”；表达“受到激励”应使用 inspire 或 motivate。",
      label: "用词错误"
    },
    {
      pattern: /\bmy primary school\s*,and\b/gi,
      replace: "my primary school teacher, and",
      reason: "这里介绍的是老师身份，需要补全 teacher。",
      label: "成分缺失"
    },
    {
      pattern: /\bmy junior high school\s*\.(?=\s*\r?\nIn my childhood)/gi,
      replace: "my junior high school teacher.",
      reason: "这里介绍的是老师身份，需要补全 teacher。",
      label: "成分缺失"
    },
    {
      pattern: /\bopened the door to English for me and let me into the world of English\b/gi,
      replace: "introduced me to English and inspired my interest in the language",
      reason: "“为我打开英语的大门、让我进入英语世界”是中文比喻直译；英文更常说 introduce somebody to a subject。",
      label: "中式英语"
    },
    {
      pattern: /\bShe taught me the first word was Apple\./gi,
      replace: "She taught me that my first word was “apple”.",
      reason: "补全宾语从句结构，并使普通名词 apple 使用小写。",
      label: "句子表达"
    },
    {
      pattern: /\bA single word occurred at the beginning\b/gi,
      replace: "That simple word marked the beginning",
      reason: "occurred 不能准确表达“开启学习旅程”的含义。",
      label: "中式英语"
    },
    {
      pattern: /\bIt was this simple word that let me know a language differing from Chinese in the world\b/gi,
      replace: "That one word showed me that English was a language quite different from Chinese",
      reason: "“let me know a language”按中文思维直译，语义不完整；应改为 show somebody that...。",
      label: "中式英语"
    },
    {
      pattern: /\bmotivate my enthusiasm to English\b/gi,
      replace: "spark my enthusiasm for English",
      reason: "enthusiasm 后使用介词 for；“激发热情”搭配 spark enthusiasm。",
      label: "固定搭配"
    },
    {
      pattern: /\bShe taught us English by using cartoon cars which appealed children's attention to the class\b/gi,
      replace: "The teacher used cartoon cards to make English lessons more engaging",
      reason: "课堂教具应为 cards（卡片），“吸引注意力”应使用 attract；改写后也能避免指代不一致。",
      label: "用词与表达"
    },
    {
      pattern: /\bgot the knowledge when their eyes fell upon the card\b/gi,
      replace: "gained knowledge by looking at the cards",
      reason: "该表达冗长且不够自然，可改为 gain knowledge by doing。",
      label: "中式英语"
    },
    {
      pattern: /\bgood score\b/gi,
      replace: "good grades",
      reason: "表示多门或多次成绩通常使用可数复数 grades/scores。",
      label: "名词单复数"
    },
    {
      pattern: /\bsense of accomplishments\b/gi,
      replace: "sense of accomplishment",
      reason: "固定表达 a sense of accomplishment 中 accomplishment 使用单数。",
      label: "固定搭配"
    },
    {
      pattern: /\bJunior high School\b/gi,
      replace: "junior high school",
      reason: "普通名词作学校类型时通常使用小写。",
      label: "大小写"
    },
    {
      pattern: /\bMr Tom acting as an encourager who keeps\b/gi,
      replace: "Mr Tom acted as an encourager who kept",
      reason: "主句缺少谓语，且整段叙述使用过去时，应保持时态一致；acting as an encourager 也偏中文式表达。",
      label: "语法 / 中式英语"
    },
    {
      pattern: /\bOnce upon a time\b/gi,
      replace: "At one point",
      reason: "Once upon a time 常用于童话；回忆真实学习经历时 At one point 更自然。",
      label: "语体不当"
    },
    {
      pattern: /\bseveral best score of English which disappointed me deeply\b/gi,
      replace: "an English score that was lower than usual, which disappointed me deeply",
      reason: "several 与单数 score 不一致，且“几次最好成绩”与“失望”在语义上冲突。",
      label: "逻辑与语法"
    },
    {
      pattern: /\bdampended\b/gi,
      replace: "dampened",
      reason: "dampen 的过去式是 dampened，不能重复添加 d。",
      label: "拼写错误"
    },
    {
      pattern: /\bencourage me to regain\b/gi,
      replace: "encouraged me to regain",
      reason: "并列谓语应保持时态一致。",
      label: "时态错误"
    },
    {
      pattern: /\bmany people and humans influenced\b/gi,
      replace: "Many people influenced",
      reason: "people 与 humans 语义重复，且句首需要大写。",
      label: "中式英语"
    },
    {
      pattern: /\bmany people and humans make effort on my English journey\b/gi,
      replace: "Many people contributed to my English journey",
      reason: "“make effort on a journey”是中文搭配直译；表达“对某段经历作出贡献”可用 contribute to。people 与 humans 也语义重复。",
      label: "中式英语"
    },
    {
      pattern: /\benthusiasm to English\b/gi,
      replace: "enthusiasm for English",
      reason: "enthusiasm 后固定搭配介词 for。",
      label: "固定搭配"
    },
    {
      pattern: /\bMr Huang utilised her distinctive and intriguing\s+teaching method\b/gi,
      replace: "Mr Huang used a distinctive and engaging teaching method",
      reason: "utilise 在这里过于正式，her 与 Mr Huang 的指代不一致，可改写为更自然的表达。",
      label: "用词与指代"
    },
    {
      pattern: /[ \t]*([,.!?;:])(?=[A-Za-z]|\s)/g,
      replace: "$1",
      reason: "英文标点前不应留空格。",
      label: "标点格式",
      silent: true
    },
    {
      pattern: /([.!?])(?=[A-Za-z])/g,
      replace: "$1 ",
      reason: "英文句末标点后需要留一个空格。",
      label: "标点格式",
      silent: true
    },
    {
      pattern: /([,;:])(?=[A-Za-z])/g,
      replace: "$1 ",
      reason: "英文逗号、分号或冒号后需要留一个空格。",
      label: "标点格式",
      silent: true
    },
    {
      pattern: /[ \t]{2,}/g,
      replace: " ",
      reason: "单词之间只保留一个空格，能让排版更整洁。",
      label: "格式规范",
      silent: true
    }
  ];

  const stylePatterns = [
    [/\bdepend on\b/gi, "rely on"],
    [/\bmake our daily life\b/gi, "improve our daily lives"],
    [/\bthink about\b/gi, "consider"]
  ];

  const levelStylePatterns = {
    四级: [
      [/\bIn my opinion\b/gi, "I believe"],
      [/\bvery important\b/gi, "important"],
      [/\ba lot of\b/gi, "many"],
      [/\bIn my childhood\b/gi, "When I was a child"],
      [/\bAround that time\b/gi, "At that time"],
      [/\bnever stop my English journey\b/gi, "continue learning English"],
      [/\bMy English journey began with\b/gi, "My English journey started with"],
      [/\bI genuinely appreciated him from the bottom of my heart\b/gi, "I sincerely thanked him from the bottom of my heart"]
    ],
    六级: [
      [/\bIn my opinion\b/gi, "From my perspective"],
      [/\bvery important\b/gi, "essential"],
      [/\ba lot of\b/gi, "a considerable number of"],
      [/\bIn my childhood\b/gi, "During my childhood"],
      [/\bAround that time\b/gi, "During that period"],
      [/\bnever stop my English journey\b/gi, "continue to develop my English skills"],
      [/\bMy English journey began with\b/gi, "My introduction to English began with"],
      [/\bI genuinely appreciated him from the bottom of my heart\b/gi, "I remain sincerely grateful to him"]
    ],
    考研: [
      [/\band I think that\b/gi, "and it is reasonable to argue that"],
      [/\bI think\b/gi, "It is reasonable to argue that"],
      [/\bIn my opinion\b/gi, "In my view"],
      [/\bvery important\b/gi, "crucial"],
      [/\ba lot of\b/gi, "numerous"],
      [/\bIn my childhood\b/gi, "Early in my childhood"],
      [/\bAround that time\b/gi, "During that challenging period"],
      [/\bnever stop my English journey\b/gi, "remain committed to improving my English proficiency"],
      [/\bMy English journey began with\b/gi, "My engagement with English began with"],
      [/\bI genuinely appreciated him from the bottom of my heart\b/gi, "I remain deeply grateful to him for his guidance"]
    ],
    雅思小作文: [
      [/\bIn my opinion\b/gi, "Overall, the chart shows that"],
      [/\bI think\b/gi, "The data suggest that"],
      [/\bvery important\b/gi, "a key feature"],
      [/\ba lot of\b/gi, "a substantial proportion of"],
      [/\bIn conclusion\b/gi, "Overall"]
    ],
    雅思大作文: [
      [/\band I think that\b/gi, "and it is often argued that"],
      [/\bI think\b/gi, "It is often argued that"],
      [/\bIn my opinion\b/gi, "From my perspective"],
      [/\bvery important\b/gi, "of considerable importance"],
      [/\ba lot of\b/gi, "a substantial number of"],
      [/\bIn my childhood\b/gi, "In my early years"],
      [/\bAround that time\b/gi, "During this challenging period"],
      [/\bnever stop my English journey\b/gi, "remain committed to deepening my English proficiency"],
      [/\bMy English journey began with\b/gi, "My relationship with English began with"],
      [/\bI genuinely appreciated him from the bottom of my heart\b/gi, "I remain profoundly grateful for his guidance and encouragement"]
    ]
  };

  const els = {
    essay: document.getElementById("essay-input"),
    wordCount: document.getElementById("word-count"),
    charCount: document.getElementById("char-count"),
    savedState: document.getElementById("saved-state"),
    correctButton: document.getElementById("correct-button"),
    correctLabel: document.getElementById("correct-button-label"),
    inlineCorrection: document.getElementById("inline-correction"),
    inlineCorrectionLabel: document.getElementById("inline-correction-label"),
    inlineCorrectionDiff: document.getElementById("inline-correction-diff"),
    inlineCorrectionReason: document.getElementById("inline-correction-reason"),
    applyCorrectionButton: document.getElementById("apply-correction-button"),
    closeCorrectionButton: document.getElementById("close-correction-button"),
    annotationLegend: document.getElementById("editor-annotation-legend"),
    sampleButton: document.getElementById("sample-button"),
    pasteButton: document.getElementById("paste-button"),
    clearButton: document.getElementById("clear-button"),
    copyReportButton: document.getElementById("copy-report-button"),
    reportBody: document.getElementById("report-body"),
    reportSubtitle: document.getElementById("report-subtitle"),
    reportStatus: document.querySelector(".report-status"),
    reportLoading: document.getElementById("report-loading"),
    loadingCopy: document.getElementById("loading-copy"),
    editBadge: document.getElementById("edit-count-badge"),
    standardName: document.getElementById("standard-name"),
    standardMeta: document.getElementById("standard-meta"),
    standardFocus: document.getElementById("standard-focus"),
    tabs: [...document.querySelectorAll(".report-tab")],
    levelChips: [...document.querySelectorAll(".level-chip")],
    historyButton: document.getElementById("history-button"),
    avatarButton: document.querySelector(".avatar-button"),
    toast: document.getElementById("toast")
  };

  let currentResult = SAMPLE_RESULT;
  let currentLevel = "四级";
  let activeTab = "overview";
  let isEmptyReport = false;
  let saveTimer;
  let toastTimer;
  let loadingTimer;
  let isCorrecting = false;
  let correctionVersion = 0;
  let activeAnnotation = null;

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatEssay(value) {
    return escapeHtml(value).replace(/\n/g, "<br>");
  }

  function getEssayText() {
    return String(els.essay.innerText || "")
      .replace(/\r/g, "")
      .replace(/\u00a0/g, " ")
      .trim();
  }

  function setEssayText(text) {
    els.essay.textContent = text;
  }

  function hideInlineCorrection() {
    activeAnnotation?.mark?.classList.remove("is-active");
    activeAnnotation = null;
    els.inlineCorrection.hidden = true;
  }

  function showEditorAnnotations(errors, text = getEssayText()) {
    const { html, counts } = buildAnnotatedEssay(text, errors);
    els.essay.innerHTML = html;
    const markedCount = Object.values(counts).reduce((sum, count) => sum + count, 0);
    els.annotationLegend.hidden = markedCount === 0;
    updateCounts();
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, Number(value) || 0));
  }

  function countWords(text) {
    const match = text.trim().match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g);
    return match ? match.length : 0;
  }

  function countCharacters(text) {
    return text.replace(/\s/g, "").length;
  }

  function formatNumber(value) {
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
  }

  function getTimeLabel() {
    return new Intl.DateTimeFormat("zh-CN", {
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date());
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add("visible");
    toastTimer = setTimeout(() => els.toast.classList.remove("visible"), 2400);
  }

  function updateCounts() {
    const content = getEssayText();
    els.wordCount.textContent = countWords(content);
    els.charCount.textContent = countCharacters(content);
  }

  function scheduleDraftSave() {
    clearTimeout(saveTimer);
    els.savedState.classList.remove("visible");
    saveTimer = setTimeout(() => {
      try {
        localStorage.setItem("writewise-draft", getEssayText());
        els.savedState.textContent = "已自动保存";
        els.savedState.classList.add("visible");
      } catch {
        els.savedState.textContent = "未启用自动保存";
        els.savedState.classList.add("visible");
      }
    }, 650);
  }

  function setLevel(level) {
    currentLevel = level;
    const standard = STANDARDS[level];
    els.levelChips.forEach((chip) => {
      const selected = chip.dataset.level === level;
      chip.classList.toggle("active", selected);
      chip.setAttribute("aria-pressed", String(selected));
    });
    els.standardName.textContent = standard.name;
    els.standardMeta.textContent = `${standard.range} · ${standard.scale}`;
    els.standardFocus.textContent = standard.focus;
    try {
      localStorage.setItem("writewise-level", level);
    } catch {
      // The selected level is a convenience; analysis does not depend on storage.
    }
  }

  function setTab(tabName) {
    activeTab = tabName;
    els.tabs.forEach((tab) => {
      const active = tab.dataset.tab === tabName;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    renderReport();
  }

  function setReportState({ result, subtitle, status, empty = false, tab = "overview" }) {
    currentResult = result;
    isEmptyReport = empty;
    activeTab = tab;
    els.reportSubtitle.textContent = subtitle;
    els.reportStatus.textContent = status;
    els.reportStatus.classList.toggle("is-live", status !== "示例");
    els.editBadge.textContent = empty ? "0" : String(result?.errors?.length || 0);
    els.tabs.forEach((button) => {
      const active = button.dataset.tab === activeTab;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
    renderReport();
  }

  function renderReport() {
    if (isEmptyReport || !currentResult) {
      els.reportBody.innerHTML = `
        <div class="report-pane">
          <div class="empty-state">
            <span class="empty-illustration">
              <svg aria-hidden="true"><use href="#icon-sparkles"></use></svg>
            </span>
            <h4>等待你的新草稿</h4>
            <p>点击“检查作文”，我会先结合完整句子和上下文分析，再进行批注。</p>
          </div>
        </div>`;
      return;
    }

    const renderers = {
      overview: renderOverview,
      edits: renderEdits,
      compare: renderCompare,
      tips: renderTips
    };

    els.reportBody.innerHTML = `<div class="report-pane">${renderers[activeTab]()}</div>`;
  }

  function getScoreView(result) {
    const level = result.level || currentLevel;
    const standard = STANDARDS[level];
    const raw = result.score || {};
    const grammar = clamp(raw.grammar, 0, standard.scoreMode === "ielts" ? 9 : standard.criteria.find((item) => item.key === "grammar").max);
    const vocabulary = clamp(raw.vocabulary, 0, standard.scoreMode === "ielts" ? 9 : standard.criteria.find((item) => item.key === "vocabulary").max);
    const sentence = clamp(raw.sentence, 0, standard.scoreMode === "ielts" ? 9 : standard.criteria.find((item) => item.key === "sentence").max);
    const logic = clamp(raw.logic, 0, standard.scoreMode === "ielts" ? 9 : standard.criteria.find((item) => item.key === "logic").max);
    const total = standard.scoreMode === "ielts" ? 9 : clamp(raw.total || standard.criteria.reduce((sum, item) => sum + item.max, 0), 1, 50);
    const actual =
      standard.scoreMode === "ielts"
        ? Math.round(((grammar + vocabulary + sentence + logic) / 4) * 2) / 2
        : grammar + vocabulary + sentence + logic;
    const percentage = total ? Math.round((actual / total) * 100) : 0;
    const status =
      result.status ||
      (percentage >= 87
        ? "表现出色"
        : percentage >= 73
          ? "稳步提升"
          : percentage >= 60
            ? "基础扎实"
            : "继续打磨");
    return { grammar, vocabulary, sentence, logic, total, actual, percentage, status, standard };
  }

  function renderOverview() {
    const score = getScoreView(currentResult);
    const errors = currentResult.errors || [];
    const grammarCount = errors.filter((item) => /语法|动词|主谓|结构|比较级|名词/.test(item.label || "")).length;
    return `
      <div class="overview-top">
        <div class="score-summary">
          <div class="score-ring" style="--score: ${score.percentage}%">
            <div class="score-value">
              <strong>${formatNumber(score.actual)}</strong>
              <small>/ ${score.total}</small>
            </div>
          </div>
          <span class="score-caption">${score.standard.scoreMode === "ielts" ? "IELTS 总分" : "综合写作得分"}</span>
        </div>
        <div class="feedback-copy">
          <p class="feedback-label">
            <svg aria-hidden="true"><use href="#icon-sparkles"></use></svg>
            ${escapeHtml(score.status)}
          </p>
          <h4>${
            errors.length >= 8
              ? "基础问题较多，建议优先逐项修正"
              : errors.length
                ? "表达清楚，还有提升空间"
                : "本地初筛未发现明显基础错误"
          }</h4>
          <p>${escapeHtml(currentResult.summary || "你的文章结构完整，修正细节后会更加自然流畅。")}</p>
          <div class="feedback-meta">
            <span>${currentResult.totalErrors || errors.length} 处修改</span>
            <span>${grammarCount || errors.length} 个语法点</span>
            <span>${escapeHtml(score.standard.name)}</span>
          </div>
        </div>
      </div>

      <div class="metric-grid">
        ${score.standard.criteria
          .map((criterion) => metricCard(criterion.label, score[criterion.key], criterion.max))
          .join("")}
      </div>

      <div class="overview-note">
        <strong>本次最值得关注：</strong>
        ${escapeHtml(errors[0]?.reason || "本地规则没有发现明显基础错误，但仍建议复核语义和地道表达。")}
      </div>

      <div class="quick-nav">
        <button type="button" data-report-action="tab" data-target-tab="edits">
          查看全部修改
          <svg aria-hidden="true"><use href="#icon-arrow-up-right"></use></svg>
        </button>
        <button type="button" data-report-action="tab" data-target-tab="tips">
          获取提升建议
          <svg aria-hidden="true"><use href="#icon-arrow-up-right"></use></svg>
        </button>
      </div>`;
  }

  function metricCard(label, value, max) {
    const percentage = Math.round((value / max) * 100);
    const valueLabel = max === 9 ? Number(value).toFixed(1) : formatNumber(value);
    return `
      <div class="metric-card">
        <div class="metric-head">
          <span>${label}</span>
          <strong>${valueLabel}/${max}</strong>
        </div>
        <div class="metric-track" aria-label="${label} ${percentage}%">
          <span style="--value: ${percentage}%"></span>
        </div>
      </div>`;
  }

  function renderEdits() {
    const errors = currentResult.errors || [];
    const standardName = STANDARDS[currentResult.level || currentLevel].name;
    if (!errors.length) {
      return `
        <div class="report-pane-heading">
          <div>
            <h4>逐句检查</h4>
            <p>没有发现明显的语法或搭配问题</p>
          </div>
        </div>
        <div class="empty-state">
          <span class="empty-illustration">
            <svg aria-hidden="true"><use href="#icon-check"></use></svg>
          </span>
            <h4>本地规则未发现明显错误</h4>
            <p>这只代表常见拼写和语法规则没有触发，并不等于文章完全正确。复杂搭配、时态和语义衔接仍建议接入 AI 服务复核。</p>
        </div>`;
    }

    return `
      <div class="report-pane-heading">
        <div>
          <h4>逐句检查</h4>
          <p>${escapeHtml(standardName)} · 按当前标准的修改优先级展示</p>
        </div>
        <span class="count-label">${errors.length} 处待优化</span>
      </div>
      <div class="edit-list">
        ${errors
          .map(
            (error, index) => `
          <article class="edit-card">
            <div class="edit-top">
              <span class="edit-index">${String(index + 1).padStart(2, "0")}</span>
              <strong>${escapeHtml(error.label || "表达优化")}</strong>
              <time>${escapeHtml(error.position || `第 ${index + 1} 处`)}</time>
            </div>
            <div class="edit-diff">
              <span class="diff-old">${escapeHtml(error.original)}</span>
              <span aria-hidden="true">→</span>
              <span class="diff-new">${escapeHtml(error.corrected)}</span>
            </div>
            <p>${escapeHtml(error.reason)}</p>
          </article>`
          )
          .join("")}
      </div>`;
  }

  function getAnnotationKind(error) {
    const label = error.label || "";
    if (label.includes("中式英语") && /语法/.test(label)) return "both";
    if (label.includes("中式英语")) return "chinglish";
    if (/标准适配|语体不当|表达优化|句子表达|用词与表达|用词与指代/.test(label)) {
      return "improve";
    }
    return "grammar";
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function buildAnnotatedEssay(text, errors) {
    const ranges = [];
    errors.forEach((error, errorIndex) => {
      const phrase = String(error.original || "").trim();
      if (!phrase) return;
      const pattern = new RegExp(phrase.split(/\s+/).map(escapeRegExp).join("\\s+"), "gi");
      for (const match of text.matchAll(pattern)) {
        ranges.push({
          start: match.index,
          end: match.index + match[0].length,
          kind: getAnnotationKind(error),
          errorIndex,
          error
        });
      }
    });

    ranges.sort((a, b) => a.start - b.start || b.end - a.end);
    const selected = [];
    ranges.forEach((range) => {
      const previous = selected[selected.length - 1];
      if (previous && range.start < previous.end) {
        if (range.start === previous.start && range.end > previous.end) selected[selected.length - 1] = range;
        return;
      }
      selected.push(range);
    });

    let html = "";
    let cursor = 0;
    const counts = { grammar: 0, chinglish: 0, improve: 0, both: 0 };
    selected.forEach((range) => {
      counts[range.kind] += 1;
      html += formatEssay(text.slice(cursor, range.start));
      const classes =
        range.kind === "both"
          ? "annotation-grammar annotation-chinglish-border"
          : `annotation-${range.kind}`;
      const label = range.kind === "both" ? "语法和中式英语" : range.kind === "grammar" ? "语法或单词错误" : range.kind === "chinglish" ? "中式英语" : "可优化表达";
      const description = `${label}：${range.error.original} → ${range.error.corrected}。${range.error.reason}`;
      html += `<mark class="${classes}" data-error-index="${range.errorIndex}" tabindex="0" title="${escapeHtml(description)}" aria-label="${escapeHtml(description)}">${escapeHtml(text.slice(range.start, range.end))}</mark>`;
      cursor = range.end;
    });
    html += formatEssay(text.slice(cursor));
    return { html, counts };
  }

  function renderCompare() {
    const original = currentResult.originalText || getEssayText();
    const polished = currentResult.polished || original;
    const standardName = STANDARDS[currentResult.level || currentLevel].name;
    return `
      <div class="report-pane-heading">
        <div>
          <h4>润色对比</h4>
          <p>${escapeHtml(standardName)} · 对比点击“检查作文”时保存的首版原文</p>
        </div>
        <span class="count-label">${countWords(polished)} words</span>
      </div>
      <div class="diff-columns">
        <section class="diff-box">
          <header>
            <strong>首版原文</strong>
            <span>${countWords(original)} words</span>
          </header>
          <p class="diff-text">${formatEssay(original)}</p>
        </section>
        <section class="diff-box improved">
          <header>
            <strong>润色版本</strong>
            <span>${countWords(polished)} words</span>
          </header>
          <p class="diff-text">${formatEssay(polished)}</p>
        </section>
      </div>
      <button class="inline-copy" type="button" data-report-action="copy">复制润色后的作文</button>`;
  }

  function renderTips() {
    const suggestions = currentResult.suggestions || [];
    const normalized = suggestions.length
      ? suggestions.map((item) =>
          typeof item === "string" ? { title: "写作建议", body: item } : item
        )
      : [
          {
            title: "继续保持",
            body: "当前表达已经较为清楚，下一次可以尝试加入更有说服力的细节。"
          }
        ];

    return `
      <div class="report-pane-heading">
        <div>
          <h4>下一步怎么练</h4>
          <p>把这次反馈变成下一次写作的方法</p>
        </div>
      </div>
      <div class="tip-list">
        ${normalized
          .map(
            (tip) => `
          <article class="tip-card">
            <span class="tip-icon">
              <svg aria-hidden="true"><use href="#icon-bulb"></use></svg>
            </span>
            <div>
              <h5>${escapeHtml(tip.title || "写作建议")}</h5>
              <p>${escapeHtml(tip.body || tip)}</p>
            </div>
          </article>`
          )
          .join("")}
      </div>`;
  }

  function locatePosition(originalText, index, fullText) {
    const before = fullText.slice(0, index);
    const paragraphs = before.split(/\r?\n+/);
    const paragraphNumber = Math.max(1, paragraphs.length);
    const currentParagraph = paragraphs[paragraphs.length - 1];
    const sentenceBreaks = currentParagraph.match(/[.!?]+(?=\s|$)/g) || [];
    const sentenceNumber = sentenceBreaks.length + 1;
    return `第 ${paragraphNumber} 段 · 第 ${sentenceNumber} 句`;
  }

  function applyRuleReplacement(rule, groups) {
    if (typeof rule.replace === "function") {
      return rule.replace(...groups);
    }
    return String(rule.replace).replace(/\$(\d+)/g, (_, groupIndex) => groups[Number(groupIndex)] || "");
  }

  function buildStructureAdvice(text, level, paragraphs, connectors) {
    const sentences = text.split(/(?<=[.!?])\s+/).filter((sentence) => sentence.trim());
    const firstSentence = (sentences[0] || "").trim().replace(/\s+/g, " ");
    const lastSentence = (sentences[sentences.length - 1] || "").trim().replace(/\s+/g, " ");
    const shortQuote = (value, limit = 92) =>
      value.length > limit ? `${value.slice(0, limit).trim()}…` : value;
    const people = [
      ...new Set(text.match(/\b(?:Mr|Ms|Mrs|Miss)\s+[A-Z][a-z]+/g) || [])
    ];
    const isNarrative =
      /\b(my|I|we)\b/i.test(text) &&
      /\b(childhood|journey|remember|teacher|experience|learned|appreciate)\b/i.test(text);
    const hasEmotion = /\b(appreciate|grateful|love|worried|disappointed|encouraged|confidence|heart)\b/i.test(text);
    const advice = [];

    if (level === "雅思小作文") {
      advice.push({
        title: "Task 1：重做开头与 Overview",
        body: `当前开头是“${shortQuote(firstSentence)}”。建议第一句直接改写图表主题，第二句用 Overall 概括最显著趋势，再在正文分段比较数据；不要像议论文一样先讲个人经历。`
      });
      advice.push({
        title: "Task 1：数据段要成组比较",
        body: "把相似项目放在同一段、突出最高值/最低值和变化方向。只罗列数字不会提高 Task Achievement，必须说明这些数字共同说明了什么。"
      });
      return advice;
    }

    if (level === "雅思大作文") {
      advice.push({
        title: "Task 2：开头先改写题目并亮明立场",
        body: `当前首句是“${shortQuote(firstSentence)}”。更稳妥的开头是两句话：第一句改写题目争议，第二句直接回答 Whether/To what extent，并预告两个主体段。`
      });
      advice.push({
        title: "Task 2：主体段采用“观点—解释—例子”",
        body: `全文目前 ${paragraphs.length} 段、连接词约 ${connectors} 处。每个主体段只放一个中心论点，再用原因、具体例子和结果支撑；结尾回应立场，不要加入新观点。`
      });
      return advice;
    }

    if (isNarrative) {
      const peopleLine = people.length
        ? people.slice(0, 3).join("、")
        : "姐姐和不同阶段的英语老师";
      advice.push({
        title: "开头：先建立一条清晰的人物主线",
        body: `目前开头是“${shortQuote(firstSentence)}”。建议先写一句总起，如 “My English journey has been shaped by my sister and by teachers such as ${peopleLine}.”，下一段再按人物或时间逐一展开，读者会更容易理解文章结构。`
      });
      advice.push({
        title: "事件阐述：按时间或人物分段",
        body: `全文共 ${paragraphs.length} 段，但第二段同时写了姐姐、Mr Huang 和初中阶段，事件密度较高。建议每人一个主体段，并按“背景—老师做了什么—我的变化”展开，避免把多个阶段挤在同一段。`
      });
      if (hasEmotion) {
        advice.push({
          title: "情感表达：用细节代替直接评价",
          body: "像 “I genuinely appreciated him” 这样的句子只告诉读者“我很感激”。可以补一句老师具体说了什么、做了什么，以及你当时如何回应，让感激通过事件自然表现出来。"
        });
      }
      advice.push({
        title: "结尾：回扣三个人物带来的变化",
        body: `当前结尾是“${shortQuote(lastSentence)}”。建议改成回扣式结尾，例如：“Looking back, I realize that my sister gave me curiosity, Mr Huang gave me confidence, and Mr Tom helped me regain resilience.”，让结尾与前文人物形成对应。`
      });
      return advice;
    }

    advice.push({
      title: "开头：背景之后必须出现中心观点",
      body: `当前首句是“${shortQuote(firstSentence)}”。建议在开头段最后补一句明确的中心论点，让读者马上知道你支持什么、反对什么，以及下文从哪两个角度论证。`
    });
    advice.push({
      title: "主体结构：一段只解决一个问题",
      body: `全文目前 ${paragraphs.length} 段、连接词约 ${connectors} 处。主体段可使用“主题句—解释—例子—回扣”的结构，并检查每段是否只承担一个论证任务。`
    });
    advice.push({
      title: "结尾：总结观点而不是重复原句",
      body: `当前结尾是“${shortQuote(lastSentence)}”。结尾应概括两个主体段的结论并回应开头立场，避免只写 “In conclusion” 后重复第一段。`
    });
    return advice;
  }

  function localAnalyze(text, level = currentLevel) {
    const standard = STANDARDS[level];
    if (text.trim() === SAMPLE_ESSAY.trim() && level === "四级") {
      return { ...structuredClone(SAMPLE_RESULT), level };
    }

    const errors = [];
    const seen = new Set();

    correctionPatterns.forEach((rule) => {
      rule.pattern.lastIndex = 0;
      text.replace(rule.pattern, (...args) => {
        const groups = args.slice(0, -2);
        const offset = args[args.length - 2];
        const preserveSpacing = rule.label === "标点格式" || rule.label === "格式规范";
        const normalize = (value) =>
          preserveSpacing
            ? String(value).replace(/[\r\n]+/g, " ")
            : String(value).replace(/\s+/g, " ").trim();
        const original = normalize(args[0]);
        const corrected = normalize(applyRuleReplacement(rule, groups));
        const key = `${rule.label}:${original.toLowerCase()}=>${corrected.toLowerCase()}`;
        const repeatsExistingIssue = errors.some((existing) => {
          const existingOriginal = existing.original.toLowerCase();
          const currentOriginal = original.toLowerCase();
          return (
            currentOriginal.length >= 5 &&
            (existingOriginal.includes(currentOriginal) || currentOriginal.includes(existingOriginal))
          );
        });
        if (
          !rule.silent &&
          !seen.has(key) &&
          !repeatsExistingIssue &&
          original.toLowerCase() !== corrected.toLowerCase()
        ) {
          seen.add(key);
          errors.push({
            position: locatePosition(original, offset, text),
            original,
            corrected,
            reason: rule.reason,
            label: rule.label
          });
        }
        return args[0];
      });
    });

    let polished = text;
    correctionPatterns.forEach((rule) => {
      rule.pattern.lastIndex = 0;
      polished = polished.replace(rule.pattern, (match, ...args) => {
        const groups = [match, ...args.slice(0, -2)];
        const offset = args[args.length - 2];
        const preserveSpacing = rule.label === "标点格式" || rule.label === "格式规范";
        const corrected = preserveSpacing
          ? String(applyRuleReplacement(rule, groups)).replace(/[\r\n]+/g, " ")
          : String(applyRuleReplacement(rule, groups)).replace(/\s+/g, " ").trim();
        const beforeMatch = polished.slice(Math.max(0, offset - 3), offset);
        const startsSentence =
          offset === 0 || /(^|[.!?]\s*|\n\s*)$/.test(beforeMatch);
        return startsSentence
          ? corrected.charAt(0).toUpperCase() + corrected.slice(1)
          : corrected.charAt(0).toLowerCase() + corrected.slice(1);
      });
    });

    const applyStyle = (patterns, detect = false) => {
      patterns.forEach(([pattern, replacement]) => {
        pattern.lastIndex = 0;
        polished = polished.replace(pattern, (match, ...args) => {
          const replacementText =
            match === match.toUpperCase() ? replacement.toUpperCase() : replacement;
          const key = `${level}标准适配:${match.toLowerCase()}=>${replacementText.toLowerCase()}`;
          if (detect && !seen.has(key) && match.toLowerCase() !== replacementText.toLowerCase()) {
            seen.add(key);
            errors.push({
              position: locatePosition(match, args[args.length - 2], text),
              original: match,
              corrected: replacementText,
              reason: `按${standard.name}的要求，此处在保持原意的前提下改为更贴合该标准的表达。`,
              label: `${level}标准适配`
            });
          }
          return replacementText;
        });
      });
    };

    applyStyle(stylePatterns);
    applyStyle(levelStylePatterns[level] || [], true);
    polished = polished.replace(/[ \t]+$/gm, "").replace(/\n{3,}/g, "\n\n").trim();

    const words = countWords(text);
    const sentenceParts = text.split(/[.!?]+(?=\s|$)/).filter((sentence) => sentence.trim());
    const paragraphs = text.split(/\r?\n+/).filter((paragraph) => paragraph.trim());
    const uniqueWords = new Set(
      (text.toLowerCase().match(/[a-z]+(?:['’-][a-z]+)*/g) || []).filter(
        (word) => word.length > 3
      )
    );
    const advancedWords = (
      text.match(/\b(consequently|nevertheless|whereas|furthermore|substantial|perspective|proficiency|intriguing|accomplishment|independently|simultaneously)\b/gi) ||
      []
    ).length;
    const connectors = (
      text.match(/\b(however|therefore|moreover|although|while|whereas|because|furthermore|consequently|after that|simultaneously|at the same time|as a result|on the other hand|in addition|meanwhile|around that time)\b/gi) ||
      []
    ).length;
    const averageSentence = sentenceParts.length ? words / sentenceParts.length : words;
    const uniqueRatio = uniqueWords.size / Math.max(words, 1);
    const errorRate = errors.length / Math.max(words / 100, 1);
    const withinRange = words >= standard.minWords && (!standard.maxWords || words <= standard.maxWords);
    const isTask1 = level === "雅思小作文";

    if (words < standard.minWords) {
      errors.push({
        position: "全文 · 篇幅",
        original: `${words} words`,
        corrected: standard.range,
        reason: `${standard.name}通常要求 ${standard.range}。篇幅不足会影响内容展开和评分。`,
        label: "篇幅要求"
      });
    } else if (standard.maxWords && words > standard.maxWords * 1.25) {
      errors.push({
        position: "全文 · 篇幅",
        original: `${words} words`,
        corrected: standard.range,
        reason: `${standard.name}建议控制在 ${standard.range}，当前篇幅明显超出，可能造成重点不够集中。`,
        label: "篇幅要求"
      });
    }

    if (isTask1 && /\b(I think|In my opinion|From my perspective)\b/i.test(text)) {
      errors.push({
        position: "全文 · 任务完成度",
        original: text.match(/\b(I think|In my opinion|From my perspective)\b/i)[1],
        corrected: "改为客观描述图表趋势",
        reason: "IELTS Task 1 要求客观描述图表信息，不应加入个人观点。",
        label: "任务完成度"
      });
    }

    let grammar;
    let vocabulary;
    let sentence;
    let logic;

    if (standard.scoreMode === "ielts") {
      const accuracyBand = errorRate <= 0.6 ? 8 : errorRate <= 1.2 ? 7 : errorRate <= 2.2 ? 6 : errorRate <= 4 ? 5 : errorRate <= 6 ? 4 : 3.5;
      const rangeBand = averageSentence >= 14 && averageSentence <= 25 ? 7.5 : averageSentence >= 10 ? 6.5 : 5.5;
      grammar = Math.round(((accuracyBand + rangeBand) / 2) * 2) / 2;
      const lexicalBand = uniqueRatio >= 0.52 ? 7.5 : uniqueRatio >= 0.45 ? 6.5 : uniqueRatio >= 0.36 ? 5.5 : 4.5;
      const spellingPenalty = errors.filter((error) => error.label === "拼写错误").length * 0.5;
      vocabulary = Math.max(3.5, Math.min(8, Math.round((lexicalBand - spellingPenalty) * 2) / 2));
      if (isTask1) {
        const task1Markers = (
          text.match(/\b(overall|increase|decrease|rise|fall|remain|respectively|whereas|while|per cent|percent|percentage|figure|proportion|compared with)\b/gi) ||
          []
        ).length;
        sentence =
          words < 100
            ? 4
            : words < standard.minWords
              ? 5
              : task1Markers >= 4
                ? 7
                : task1Markers >= 2
                  ? 6
                  : 5.5;
      } else {
        sentence =
          words < 150 ? 4 : words < standard.minWords ? 5 : paragraphs.length >= 3 && words >= 260 ? 6.5 : 6;
      }
      logic =
        connectors >= 5 && paragraphs.length >= 4
          ? 7
          : connectors >= 3 && paragraphs.length >= 3
            ? 6
            : connectors >= 1
              ? 5
              : 4;
    } else {
      const strict = level === "四级";
      grammar = strict
        ? errorRate <= 1.5 ? 4 : errorRate <= 3 ? 3 : errorRate <= 6 ? 2 : 1
        : level === "六级"
          ? errorRate <= 0.8 ? 4 : errorRate <= 2 ? 3 : errorRate <= 4 ? 2 : 1
          : errorRate <= 0.7 ? 5 : errorRate <= 1.5 ? 4 : errorRate <= 3 ? 3 : errorRate <= 5 ? 2 : 1;

      const vocabMax = level === "考研" ? 5 : 4;
      const lexicalBand = uniqueRatio >= 0.5 && advancedWords >= 3 ? vocabMax : uniqueRatio >= 0.4 ? vocabMax - 1 : uniqueRatio >= 0.28 ? vocabMax - 2 : 1;
      vocabulary = lexicalBand;

      if (level === "考研") {
        sentence = averageSentence >= 13 && averageSentence <= 27 && sentenceParts.length >= 7 ? 5 : averageSentence >= 9 && sentenceParts.length >= 5 ? 4 : 3;
        logic = paragraphs.length >= 3 && connectors >= 3 && withinRange ? 5 : connectors >= 1 ? 3 : 2;
      } else if (level === "六级") {
        sentence = averageSentence >= 12 && averageSentence <= 24 && sentenceParts.length >= 5 ? 4 : sentenceParts.length >= 3 ? 3 : 2;
        logic = paragraphs.length >= 3 && connectors >= 3 && withinRange ? 3 : connectors >= 1 ? 2 : 1;
      } else {
        sentence = averageSentence >= 10 && averageSentence <= 23 && sentenceParts.length >= 4 ? 4 : sentenceParts.length >= 3 ? 3 : 2;
        logic = paragraphs.length >= 3 && connectors >= 2 && withinRange ? 3 : connectors >= 1 ? 2 : 1;
      }
    }

    if (standard.scoreMode !== "ielts") {
      const spellingErrors = errors.filter((error) => error.label === "拼写错误").length;
      const structuralErrors = errors.filter((error) => /句子结构|成分缺失/.test(error.label)).length;
      const spellingPenalty =
        spellingErrors >= 2 ? (level === "六级" ? 2 : 1) : 0;
      vocabulary = Math.max(1, vocabulary - spellingPenalty);
      sentence = Math.max(1, sentence - (structuralErrors >= 2 ? 1 : 0));
    }

    if (words < 30) {
      grammar = Math.min(grammar, level === "考研" ? 3 : standard.scoreMode === "ielts" ? 4 : 2);
      vocabulary = Math.min(vocabulary, standard.scoreMode === "ielts" ? 4 : 2);
      sentence = Math.min(sentence, standard.scoreMode === "ielts" ? 4 : 2);
      logic = Math.min(logic, standard.scoreMode === "ielts" ? 4 : 2);
    }

    const priorities = {
      四级: ["篇幅要求", "拼写错误", "主谓一致", "动词形式", "时态错误", "固定结构", "语法 / 中式英语", "中式英语", "成分缺失", "句子结构", "固定搭配"],
      六级: ["篇幅要求", "主谓一致", "固定搭配", "时态错误", "语法 / 中式英语", "中式英语", "用词错误", "句子结构", "六级标准适配", "逻辑与语法"],
      考研: ["篇幅要求", "逻辑与语法", "语法 / 中式英语", "中式英语", "用词与指代", "句子结构", "考研标准适配", "用词错误", "固定搭配", "时态错误"],
      雅思小作文: ["篇幅要求", "任务完成度", "语法 / 中式英语", "中式英语", "雅思小作文标准适配", "逻辑与语法", "用词与表达", "固定搭配", "拼写错误", "时态错误"],
      雅思大作文: ["篇幅要求", "任务回应", "语法 / 中式英语", "中式英语", "雅思大作文标准适配", "逻辑与语法", "用词与表达", "固定搭配", "拼写错误", "时态错误"]
    };
    const priority = priorities[level];
    const rank = (label) => {
      const index = priority.findIndex((item) => label.includes(item.replace("标准适配", "")));
      return index === -1 ? 99 : index;
    };
    errors.sort((a, b) => rank(a.label) - rank(b.label));

    const visibleErrors = errors;
    const suggestions = [];

    if (!withinRange) {
      suggestions.push({
        title: "先对齐篇幅要求",
        body: `当前约 ${words} 词。${standard.name}建议 ${standard.range}；增加或删减时，优先保留论点、例子和段落衔接。`
      });
    }
    if (errors.some((error) => /拼写|主谓|动词|时态/.test(error.label))) {
      suggestions.push({
        title: "优先修正基础错误",
        body: `先集中处理拼写、主谓一致、动词形式和时态，这些错误会直接影响${standard.name}的语言准确性得分。`
      });
    }

    const levelAdvice = {
      四级: {
        title: "四级：准确清楚优先",
        body: "避免为了使用难词而牺牲准确性。用清晰的主题句、两个具体例子和简洁结尾完成观点表达。"
      },
      六级: {
        title: "六级：提高语言层次",
        body: "在准确的基础上增加自然的连接词、同义替换和复杂句，但每个长句都要保持主谓结构清楚。"
      },
      考研: {
        title: "考研：强化论证与正式表达",
        body: "确保内容要点完整，增加因果、让步和总结层次；减少口语化表达，使语言更符合书面议论文。"
      },
      雅思小作文: {
        title: "Task 1：描述关键趋势与对比",
        body: "先写 Overview，再分组描述主要变化和差异；避免加入个人观点，并准确使用数据、年份和比较表达。"
      },
      雅思大作文: {
        title: "IELTS：对齐四项评分标准",
        body: "Task 2 需要回应完整题目、形成清楚段落并使用多样句法。四项分数取平均得到总分，单靠难词不会显著提分。"
      }
    };
    suggestions.push(levelAdvice[level]);

    if (connectors < 2) {
      suggestions.push({
        title: "加强段落衔接",
        body: `${standard.name}重视篇章连贯。可用 however、therefore、whereas、as a result 等连接词明确逻辑关系。`
      });
    } else if (averageSentence > 27) {
      suggestions.push({
        title: "拆分过长句子",
        body: "部分句子信息过密。把一个复杂句拆成两个逻辑清楚的句子，能同时提升可读性和语法准确度。"
      });
    }

    const sharedErrorText =
      errors.length > 0
        ? `本次按${standard.name}初筛，共发现 ${errors.length} 处可优化表达${errors.length > visibleErrors.length ? `，下方优先展示 ${visibleErrors.length} 处` : ""}。`
        : `本次按${standard.name}初筛，没有触发本地规则中的常见错误。`;
    const summary = `${sharedErrorText}${standard.focus}`;
    const total = standard.scoreMode === "ielts" ? 9 : standard.criteria.reduce((sum, criterion) => sum + criterion.max, 0);
    suggestions.unshift(
      ...buildStructureAdvice(text, level, paragraphs, connectors)
    );

    return {
      errors: visibleErrors,
      totalErrors: errors.length,
      polished,
      score: { total, grammar, vocabulary, sentence, logic },
      suggestions: suggestions.slice(0, 8),
      summary,
      status: "本地初筛",
      level
    };
  }

  function normalizeApiResult(result, originalText, level) {
    if (!result || typeof result !== "object" || result.error) {
      throw new Error(result?.error || "服务返回了无效结果");
    }
    return {
      errors: Array.isArray(result.errors) ? result.errors : [],
      totalErrors: Array.isArray(result.errors) ? result.errors.length : 0,
      polished: typeof result.polished === "string" ? result.polished : originalText,
      score: result.score && typeof result.score === "object" ? result.score : {},
      suggestions: Array.isArray(result.suggestions) ? result.suggestions : [],
      summary: typeof result.summary === "string" ? result.summary : "批改完成。查看具体修改和提升建议。",
      status: "AI 检查",
      level
    };
  }

  async function requestCorrection(text, level) {
    const endpoint = window.WRITEWISE_API_URL;
    if (!endpoint) {
      await new Promise((resolve) => setTimeout(resolve, 1250));
      return localAnalyze(text, level);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: text,
          level
        }),
        signal: controller.signal
      });
      if (!response.ok) {
        throw new Error(`服务请求失败（${response.status}）`);
      }
      return normalizeApiResult(await response.json(), text, level);
    } catch (error) {
      console.warn("API correction failed, using local demo analyzer.", error);
      showToast("AI 服务暂不可用，已切换到本地演示分析");
      return localAnalyze(text, level);
    } finally {
      clearTimeout(timeout);
    }
  }

  async function runCorrection() {
    const thisVersion = ++correctionVersion;
    if (isCorrecting) return;
    const requestedLevel = currentLevel;
    const content = getEssayText();
    const wordTotal = countWords(content);

    if (wordTotal < 20) {
      showToast(wordTotal ? "作文太短，至少输入 20 个英文单词" : "请先输入英语作文");
      els.essay.focus();
      return;
    }

    isCorrecting = true;
    els.correctButton.disabled = true;
    els.correctLabel.textContent = "正在检查…";
    els.reportLoading.hidden = false;
    els.reportLoading.setAttribute("aria-busy", "true");

    const loadingMessages = ["分析语法与表达…", "检查词汇与句式…", "整理修改建议…"];
    let messageIndex = 0;
    els.loadingCopy.textContent = loadingMessages[0];
    clearInterval(loadingTimer);
    loadingTimer = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      els.loadingCopy.textContent = loadingMessages[messageIndex];
    }, 520);

    try {
      const result = await requestCorrection(content, requestedLevel);
      if (thisVersion !== correctionVersion || currentLevel !== requestedLevel) return;
      result.originalText = content;
      setReportState({
        result,
        subtitle: `${STANDARDS[requestedLevel].name} · ${getTimeLabel()} 完成`,
        status: result.status === "本地初筛" ? "本地初筛" : "已检查",
        tab: "overview"
      });
      showEditorAnnotations(result.errors, content);
      try {
        localStorage.setItem(
          "writewise-last-review",
          JSON.stringify({
            time: getTimeLabel(),
            score: getScoreView(result).actual,
            total: getScoreView(result).total,
            level: STANDARDS[requestedLevel].name
          })
        );
      } catch {
        // History is an optional convenience.
      }
      showToast(
        result.status === "本地初筛"
          ? `本地初筛完成，发现 ${result.totalErrors || result.errors.length} 处可优化表达`
          : `检查完成，发现 ${result.errors.length} 处提升点`
      );
      if (window.innerWidth < 900) {
        setTimeout(
          () => document.getElementById("report").scrollIntoView({ behavior: "smooth", block: "start" }),
          80
        );
      }
    } catch (error) {
      showToast(error instanceof Error ? error.message : "检查失败，请稍后重试");
    } finally {
      clearInterval(loadingTimer);
      els.reportLoading.hidden = true;
      els.reportLoading.removeAttribute("aria-busy");
      els.correctButton.disabled = false;
      els.correctLabel.textContent = "检查作文";
      isCorrecting = false;
    }
  }

  function loadSample() {
    setEssayText(SAMPLE_ESSAY);
    updateCounts();
    els.savedState.textContent = "示例已载入";
    els.savedState.classList.add("visible");
    const result = localAnalyze(SAMPLE_ESSAY, currentLevel);
    result.originalText = SAMPLE_ESSAY;
    setReportState({
      result,
      subtitle: `${STANDARDS[currentLevel].name} · 示例反馈`,
      status: "示例",
      tab: "overview"
    });
    showEditorAnnotations(result.errors, SAMPLE_ESSAY);
    els.correctLabel.textContent = "检查作文";
  }

  function resetReportAfterEdit() {
    if (isEmptyReport || !currentResult) return;
    els.reportStatus.textContent = "待更新";
    els.reportSubtitle.textContent = "草稿已修改，点击“检查作文”更新报告";
  }

  async function copyText(text, successMessage) {
    if (!text) {
      showToast("当前没有可复制的内容");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      showToast(successMessage);
    } catch {
      const helper = document.createElement("textarea");
      helper.value = text;
      helper.style.position = "fixed";
      helper.style.opacity = "0";
      document.body.appendChild(helper);
      helper.select();
      const copied = document.execCommand("copy");
      helper.remove();
      showToast(copied ? successMessage : "复制失败，请手动选择文本");
    }
  }

  function copyPolished() {
    const text = currentResult?.polished || "";
    copyText(text, "润色稿已复制");
  }

  els.essay.addEventListener("input", () => {
    const selection = window.getSelection();
    const anchor =
      selection?.anchorNode?.nodeType === Node.ELEMENT_NODE
        ? selection.anchorNode
        : selection?.anchorNode?.parentElement;
    const editedMark = anchor?.closest?.("mark[data-error-index]");
    if (editedMark) editedMark.replaceWith(document.createTextNode(editedMark.textContent));

    hideInlineCorrection();
    updateCounts();
    resetReportAfterEdit();
    scheduleDraftSave();
  });

  els.essay.addEventListener("paste", (event) => {
    event.preventDefault();
    const text = event.clipboardData?.getData("text/plain") || "";
    document.execCommand("insertText", false, text);
  });

  els.essay.addEventListener("keydown", (event) => {
    const mark = event.target.closest?.("mark[data-error-index]");
    if (mark && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      mark.click();
    }
  });

  els.essay.addEventListener("click", (event) => {
    const mark = event.target.closest("mark[data-error-index]");
    if (!mark || !currentResult) return;
    const error = currentResult.errors[Number(mark.dataset.errorIndex)];
    if (!error) return;

    activeAnnotation = { mark, error };
    els.essay
      .querySelectorAll("mark.is-active")
      .forEach((item) => item.classList.remove("is-active"));
    mark.classList.add("is-active");
    const kind = getAnnotationKind(error);
    const palette = {
      grammar: ["#f9dfda", "#8e4c45"],
      chinglish: ["#fff0d4", "#8b621d"],
      improve: ["#e7f1f4", "#426b7c"],
      both: ["linear-gradient(90deg,#f9dfda 50%,#fff0d4 50%)", "#7f5145"]
    }[kind];
    els.inlineCorrectionLabel.textContent = error.label || "修改建议";
    els.inlineCorrectionLabel.style.background = palette[0];
    els.inlineCorrectionLabel.style.color = palette[1];
    els.inlineCorrectionDiff.textContent = `${error.original} → ${error.corrected}`;
    els.inlineCorrectionReason.textContent = error.reason;
    els.inlineCorrection.hidden = false;
    els.inlineCorrection.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  els.applyCorrectionButton.addEventListener("click", () => {
    if (!activeAnnotation?.mark?.isConnected) return;
    const replacement = document.createTextNode(activeAnnotation.error.corrected);
    activeAnnotation.mark.replaceWith(replacement);
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStartAfter(replacement);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    hideInlineCorrection();
    updateCounts();
    resetReportAfterEdit();
    scheduleDraftSave();
    els.essay.focus();
  });

  els.closeCorrectionButton.addEventListener("click", hideInlineCorrection);

  els.correctButton.addEventListener("click", () => {
    runCorrection();
  });

  els.sampleButton.addEventListener("click", () => {
    loadSample();
    showToast("已载入示例作文");
  });

  els.clearButton.addEventListener("click", () => {
    if (!getEssayText()) {
      showToast("草稿已经是空的");
      return;
    }
    setEssayText("");
    hideInlineCorrection();
    els.annotationLegend.hidden = true;
    updateCounts();
    setReportState({
      result: null,
      subtitle: "输入作文后即可生成检查报告",
      status: "待检查",
      empty: true
    });
    els.correctLabel.textContent = "检查作文";
    els.essay.focus();
    scheduleDraftSave();
  });

  els.pasteButton.addEventListener("click", async () => {
    try {
      const content = await navigator.clipboard.readText();
      if (!content.trim()) {
        showToast("剪贴板中没有文本");
        return;
      }
      setEssayText(content);
      els.essay.dispatchEvent(new Event("input"));
      els.essay.focus();
      showToast("已从剪贴板粘贴");
    } catch {
      showToast("浏览器未允许读取剪贴板，请使用 Ctrl + V");
      els.essay.focus();
    }
  });

  els.tabs.forEach((tab) => {
    tab.addEventListener("click", () => setTab(tab.dataset.tab));
  });

  els.levelChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const level = chip.dataset.level;
      const changed = currentLevel !== level;
      setLevel(level);
      if (!changed) return;
      const draft = getEssayText();
      setEssayText(draft);
      hideInlineCorrection();
      els.annotationLegend.hidden = true;
      setReportState({
        result: null,
        subtitle: `已切换为${STANDARDS[level].name}，点击“检查作文”后开始分析`,
        status: "待检查",
        empty: true
      });
      els.correctLabel.textContent = "检查作文";
      showToast(`已切换为${STANDARDS[level].name}，不会自动检查`);
    });
  });

  els.reportBody.addEventListener("click", (event) => {
    const target = event.target.closest("[data-report-action]");
    if (!target) return;
    if (target.dataset.reportAction === "tab") {
      setTab(target.dataset.targetTab);
    }
    if (target.dataset.reportAction === "copy") {
      copyPolished();
    }
  });

  els.copyReportButton.addEventListener("click", copyPolished);

  els.historyButton.addEventListener("click", () => {
    try {
      const lastReview = JSON.parse(localStorage.getItem("writewise-last-review") || "null");
      if (lastReview) {
        showToast(
          `上次检查：${lastReview.time} · ${lastReview.level} · ${lastReview.score}/${lastReview.total || 15}`
        );
      } else {
        showToast("这是你的第一篇练习，开始写下新的草稿吧");
      }
    } catch {
      showToast("暂无检查历史");
    }
  });

  els.avatarButton.addEventListener("click", () => {
    showToast("当前为本地规则初筛工作台，无需登录");
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      runCorrection();
    }
  });

  function init() {
    Object.values(STANDARDS).forEach((standard) => {
      if (!standard.criteria.length) {
        throw new Error("评分标准必须包含评分维度");
      }
      if (standard.scoreMode !== "ielts") {
        const total = standard.criteria.reduce((sum, item) => sum + item.max, 0);
        for (const criterion of standard.criteria) {
          if (!Number.isInteger(criterion.max) || criterion.max <= 0) {
            throw new Error(`${standard.name} 的评分上限无效`);
          }
        }
        const expectedTotal = standard.scale.startsWith("20") ? 20 : 15;
        if (total !== expectedTotal) {
          throw new Error(`${standard.name} 的评分总和应为 ${expectedTotal}`);
        }
      } else if (standard.criteria.some((item) => item.max !== 9)) {
        throw new Error("IELTS 四项评分上限必须均为 9");
      }
    });

    try {
      const savedLevel = localStorage.getItem("writewise-level");
      if (savedLevel && STANDARDS[savedLevel]) currentLevel = savedLevel;
    } catch {
      // Use the default standard when storage is unavailable.
    }
    setLevel(currentLevel);
    let savedDraft = "";
    try {
      savedDraft = localStorage.getItem("writewise-draft") || "";
    } catch {
      // Storage can be unavailable in restricted browsing modes.
    }

    if (savedDraft.trim() && savedDraft.trim() !== SAMPLE_ESSAY.trim()) {
      setEssayText(savedDraft);
      updateCounts();
      setReportState({
        result: null,
        subtitle: "已恢复上次草稿，点击“检查作文”获取反馈",
        status: "待检查",
        empty: true
      });
      els.savedState.textContent = "已恢复草稿";
      els.savedState.classList.add("visible");
    } else {
      loadSample();
      updateCounts();
    }

  }

  init();
})();
