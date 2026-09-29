import type { FilmEnglishItem, KnowledgePoint, MathQuestion, Resource, VocabularyWord } from "@/lib/types";

const mathResource = (resource: Resource): Resource => resource;

const makeQuestion = (
  knowledgePoint: string,
  id: string,
  question: string,
  type: MathQuestion["type"],
  correctAnswer: string | number,
  explanation: string,
  typeExplanation: string,
  difficulty: MathQuestion["difficulty"] = "基础",
  options?: string[],
): MathQuestion => ({ id, question, type, knowledgePoint, difficulty, options, correctAnswer, explanation, typeExplanation });

export const mathPath = {
  title: "高等数学入门路径",
  description: "从函数开始，逐步理解变化、极限和面积，为后续微积分学习建立连接。",
  pointIds: ["function-basics", "limits-intro", "derivative-intro", "integral-intro"],
};

export const mathKnowledgePoints: KnowledgePoint[] = [
  {
    id: "function-basics",
    title: "函数基础",
    summary: "理解输入、输出和对应关系，读懂最基本的函数表达式。",
    whyLearn: "函数是描述变量之间关系的语言。后面的极限、导数和积分，都需要先能读懂函数。",
    learningGoals: ["说清楚函数的输入、输出和定义域", "根据表达式计算简单的函数值", "用表格或图像描述对应关系"],
    prerequisites: [],
    nextKnowledgePointId: "limits-intro",
    resources: [
      mathResource({ id: "function-bilibili", title: "函数基础！一课搞定！", type: "video", url: "https://www.bilibili.com/video/BV1uP4uzdE43/", source: "Bilibili · 一数", knowledgePoint: "function-basics", difficulty: "入门", description: "中文讲解，从函数概念和表示方式开始，适合第一次系统理解函数。", availability: "available", relatedNextStep: "limits-intro" }),
    ],
    content: ["函数可以理解为一种规则：每个允许的输入值，都对应唯一的输出值。", "常见写法是 f(x)，其中 x 是输入，f(x) 是输出。", "例如 f(x)=x+2，当 x=3 时，f(3)=5。"],
    exercises: [
      makeQuestion("function-basics", "function-1", "若 f(x)=x+2，则 f(3) 等于多少？", "numeric", 5, "把 x=3 代入表达式，得到 3+2=5。", "函数求值时，先找到输入值，再把它代入表达式计算。", "入门"),
      makeQuestion("function-basics", "function-2", "函数的定义要求每个允许的输入对应几个输出？", "choice", "B", "函数的核心是一对一地给每个输入确定唯一输出。", "判断函数关系时，检查同一个输入是否对应多个输出；如果是，就不满足函数定义。", "入门", ["A. 0 个", "B. 恰好 1 个", "C. 至少 2 个", "D. 任意多个"]),
      makeQuestion("function-basics", "function-3", "f(x)=2x-1 中，当 x=4 时，f(x) 等于多少？", "numeric", 7, "代入 x=4：2×4-1=7。", "线性表达式求值可以按乘法、加法的顺序直接代入。", "入门"),
      makeQuestion("function-basics", "function-4", "下列哪一种图像可以表示函数关系？", "choice", "B", "竖线测试要求同一个 x 最多对应一个 y。", "图像判断函数关系时使用竖线测试：一条竖线不能与图像交于两个或更多点。", "基础", ["A. 被同一条竖线穿过两次的图像", "B. 每条竖线最多交一次的图像", "C. 任意闭合曲线", "D. 只有横线"]),
      makeQuestion("function-basics", "function-5", "若 f(x)=2x+1，则 f(-2) 等于多少？", "numeric", -3, "2×(-2)+1=-4+1=-3。", "代入负数时要把负号和括号写清楚，避免把减法符号误看成正号。"),
      makeQuestion("function-basics", "function-6", "函数 y=3x-2 在 x=2 时的 y 值是多少？", "fill", 4, "3×2-2=4。", "先计算含 x 的乘法，再进行常数加减。", "入门"),
      makeQuestion("function-basics", "function-7", "若 f(x)=x²，则 f(-3) 等于多少？", "numeric", 9, "(-3)²=9，平方会让负号消失。", "幂运算代入负数时必须使用括号，平方指数作用于整个负数。"),
      makeQuestion("function-basics", "function-8", "已知 f(1)=3，f(2)=5。下列说法正确的是？", "choice", "C", "题目已经给出 f(1)=3，它直接表示输入 1 的输出是 3。", "读函数记号时，括号里的数是输入，等号右边是对应输出。", "基础", ["A. 输入 1 对应输出 5", "B. 输入 2 对应输出 3", "C. 输入 1 对应输出 3", "D. 无法知道 f(1)"]),
      makeQuestion("function-basics", "function-9", "关系 {(1,2),(2,3),(1,4)} 是否是函数？请回答“是”或“否”。", "text", "否", "输入 1 同时对应 2 和 4，不满足唯一输出。", "列举有序对时，检查是否存在相同第一坐标却对应不同第二坐标。", "进阶"),
      makeQuestion("function-basics", "function-10", "函数 f(x)=2x+1 的图像与 y 轴交点的纵坐标是多少？", "numeric", 1, "与 y 轴相交时 x=0，所以 f(0)=1。", "求 y 轴截距时令 x=0；求 x 轴截距时令 y=0。"),
    ],
  },
  {
    id: "limits-intro",
    title: "极限入门",
    summary: "观察函数在某个位置附近如何接近一个确定的值。",
    whyLearn: "极限让我们可以严谨地描述“越来越接近”，是理解瞬时变化和导数的桥梁。",
    learningGoals: ["用直观语言解释极限", "从表格和图像判断函数趋势", "区分函数值与附近的趋近值"],
    prerequisites: ["function-basics"],
    nextKnowledgePointId: "derivative-intro",
    resources: [
      mathResource({ id: "limit-bilibili", title: "数列极限学懵了？万能模板来了！30min 从入门到精通", type: "video", url: "https://www.bilibili.com/video/BV1fpxLeYEmX/", source: "Bilibili · 一高数", knowledgePoint: "limits-intro", difficulty: "基础", description: "中文讲解，用直观例子梳理极限的接近思想，适合作为极限入门。", availability: "available", relatedNextStep: "derivative-intro" }),
    ],
    content: ["当 x 越来越接近某个数时，函数值可能越来越接近另一个数，这个“接近的目标”就是极限。", "先用数值表和图像观察趋势，再用符号表达式写出极限。"],
    exercises: [
      makeQuestion("limits-intro", "limit-1", "当 x 趋近 2 时，f(x)=x+1 的极限是多少？", "numeric", 3, "这是连续的一次函数，直接把 x=2 代入得到 3。", "连续函数的极限通常可以直接代入趋近点计算。", "入门"),
      makeQuestion("limits-intro", "limit-2", "极限主要描述什么？", "choice", "B", "极限关注自变量接近某值时函数值的变化趋势。", "先区分函数在点上的值和函数值在附近的趋势，极限描述后者。", "入门", ["A. 函数在某点的颜色", "B. 函数值在附近的趋近趋势", "C. 方程的未知数个数", "D. 图像的面积单位"]),
      makeQuestion("limits-intro", "limit-3", "当 x 趋近 0 时，5x 的极限是多少？", "numeric", 0, "5x 是连续函数，代入 x=0 得 0。", "对于多项式，直接代入通常是最简洁可靠的方法。", "入门"),
      makeQuestion("limits-intro", "limit-4", "数列 aₙ=1/n 当 n 趋向无穷时的极限是？", "fill", 0, "分母越来越大，整体越来越接近 0。", "判断数列极限时观察 n 变大后的趋势，而不是只计算前几项。"),
      makeQuestion("limits-intro", "limit-5", "lim(x→3)(x²) 等于多少？", "numeric", 9, "平方函数连续，直接代入 3 得 9。", "连续运算组成的函数可以逐项代入，注意括号和指数。", "入门"),
      makeQuestion("limits-intro", "limit-6", "如果左极限和右极限不相等，整体极限存在吗？", "choice", "C", "两侧靠近的目标不同，无法得到唯一的趋近值。", "判断分段函数极限时，要分别求左、右极限并比较。", "基础", ["A. 存在且等于左极限", "B. 存在且等于右极限", "C. 不存在", "D. 一定等于 0"]),
      makeQuestion("limits-intro", "limit-7", "常数函数 f(x)=7 的极限是多少？", "numeric", 7, "无论 x 如何接近某点，函数值始终是 7。", "常数的极限仍是这个常数，不需要额外变形。", "入门"),
      makeQuestion("limits-intro", "limit-8", "当 x 趋近 0 时，x²+1 的极限是多少？", "numeric", 1, "代入 x=0：0²+1=1。", "先判断表达式在该点是否有定义；有定义且连续时可直接代入。"),
      makeQuestion("limits-intro", "limit-9", "若 lim(x→a)f(x)=L，这里的 L 表示什么？", "choice", "B", "L 是函数值在 x 接近 a 时趋近的目标。", "记号中 x→a 是趋近条件，L 是输出端的趋近结果。", "基础", ["A. x 的初始值", "B. f(x) 接近的目标值", "C. 函数的最大值", "D. 定义域端点"]),
      makeQuestion("limits-intro", "limit-10", "当 x 趋近 1 时，2x+3 的极限是多少？", "numeric", 5, "2×1+3=5。", "一次函数极限直接代入，计算时先乘后加。", "入门"),
    ],
  },
  {
    id: "derivative-intro",
    title: "导数入门",
    summary: "用导数描述函数在某一点附近的瞬时变化快慢。",
    whyLearn: "导数把“变化快慢”变成可计算的量，可以帮助我们分析斜率、增长和下降。",
    learningGoals: ["理解导数与切线斜率的关系", "用差商直观理解瞬时变化", "识别简单函数的变化趋势"],
    prerequisites: ["function-basics", "limits-intro"],
    nextKnowledgePointId: "integral-intro",
    resources: [
      mathResource({ id: "derivative-bilibili", title: "“导数”一课通！1h 零基础上手", type: "video", url: "https://www.bilibili.com/video/BV1iZ421y71z/", source: "Bilibili", knowledgePoint: "derivative-intro", difficulty: "基础", description: "中文零基础讲解，从导数概念和变化率入手，再连接到后续求导。", availability: "available", relatedNextStep: "integral-intro" }),
    ],
    content: ["平均变化率描述一段区间的整体变化，导数则把区间缩小到一个点，描述瞬时变化。", "在图像上，导数可以理解为该点切线的斜率。"],
    exercises: [
      makeQuestion("derivative-intro", "derivative-1", "直线 y=2x+1 的斜率是多少？", "numeric", 2, "一次函数 y=kx+b 的斜率就是 x 的系数 k。", "先识别函数形式，再用导数或斜率定义判断变化快慢。", "入门"),
      makeQuestion("derivative-intro", "derivative-2", "导数在几何上最接近什么？", "choice", "A", "导数描述曲线在某点切线的斜率。", "把瞬时变化率和切线斜率联系起来，是理解导数的关键。", "入门", ["A. 该点切线的斜率", "B. 曲线围成的面积", "C. 函数的定义域", "D. y 轴截距"]),
      makeQuestion("derivative-intro", "derivative-3", "函数 f(x)=x² 在 x=3 处的导数是多少？", "numeric", 6, "f'(x)=2x，所以 f'(3)=6。", "先求导得到一般表达式，再代入指定的 x 值。"),
      makeQuestion("derivative-intro", "derivative-4", "函数 f(x)=3x+1 的导数是多少？", "fill", 3, "直线的导数等于它的斜率 3。", "常数倍 x 的导数保留该系数，常数项导数为 0。", "入门"),
      makeQuestion("derivative-intro", "derivative-5", "常数函数 f(x)=5 的导数是多少？", "numeric", 0, "常数没有变化，瞬时变化率为 0。", "任何常数的导数都是 0，先检查表达式中是否含有自变量。", "入门"),
      makeQuestion("derivative-intro", "derivative-6", "函数 f(x)=x³ 在 x=2 处的导数是多少？", "numeric", 12, "f'(x)=3x²，代入 2 得 12。", "幂函数求导时指数前移并减 1，再代入点值。"),
      makeQuestion("derivative-intro", "derivative-7", "在一个区间内，如果 f'(x)>0，通常表示函数怎样变化？", "choice", "A", "正导数表示局部变化方向向上，区间内通常对应增加。", "用导数符号判断单调性时，先找临界点，再分区间判断正负。", "基础", ["A. 单调增加", "B. 单调减少", "C. 恒等于 0", "D. 没有定义"]),
      makeQuestion("derivative-intro", "derivative-8", "函数 f(x)=2x² 在 x=1 处的导数是多少？", "numeric", 4, "f'(x)=4x，f'(1)=4。", "系数乘在幂函数导数前面，最后再代入目标点。"),
      makeQuestion("derivative-intro", "derivative-9", "直线 y=4x-1 的切线斜率是多少？", "fill", 4, "直线各点斜率相同，等于 x 的系数 4。", "直线的导数是常数，切线斜率不随位置改变。", "入门"),
      makeQuestion("derivative-intro", "derivative-10", "函数 f(x)=x 的导数是多少？", "numeric", 1, "y=x 的斜率为 1，因此导数为 1。", "记住基本导数 d(x)/dx=1，并用线性规则处理更复杂表达式。", "入门"),
    ],
  },
  {
    id: "integral-intro",
    title: "积分入门",
    summary: "从累加和面积的角度理解积分与导数的联系。",
    whyLearn: "积分可以把许多微小的量累加起来，是计算面积、总量和累计变化的工具。",
    learningGoals: ["理解积分与面积的直观联系", "区分定积分和不定积分的用途", "说出积分与导数之间的基本联系"],
    prerequisites: ["derivative-intro"],
    nextKnowledgePointId: null,
    resources: [
      mathResource({ id: "integral-bilibili", title: "数学老师不讲的微积分：5. 积分怎么算？", type: "video", url: "https://www.bilibili.com/video/BV1Yj411W7DE/", source: "Bilibili · ITI 学院", knowledgePoint: "integral-intro", difficulty: "基础", description: "中文具体视频，用直观方式解释积分如何计算，适合建立第一印象。", availability: "available", relatedNextStep: null }),
    ],
    content: ["把一个区域切成许多窄条，再把这些小面积相加，可以逐渐逼近真实面积。", "积分是这种累加过程的数学表达，也与求导形成互相联系的两种操作。"],
    exercises: [
      makeQuestion("integral-intro", "integral-1", "∫1 dx 的一个简单原函数可以写成什么？", "text", "x", "x 的导数是 1，所以 x 是 1 的一个原函数。", "不定积分可以看作反向求导，最后通常要加任意常数 C。", "入门"),
      makeQuestion("integral-intro", "integral-2", "∫₀² 1 dx 的值是多少？", "numeric", 2, "函数值为 1，区间长度为 2，面积就是 2。", "定积分可以先找原函数，再用上限值减下限值。", "入门"),
      makeQuestion("integral-intro", "integral-3", "定积分在几何上常用来表示什么？", "choice", "A", "定积分把区间内的微小面积累加起来。", "先确定积分区间和图像位置，再判断面积符号与方向。", "入门", ["A. 曲线与坐标轴围成的有向面积", "B. 函数的定义域", "C. 切线斜率", "D. 方程根的个数"]),
      makeQuestion("integral-intro", "integral-4", "若 F(x)=x²/2，则 F'(x) 等于多少？", "fill", "x", "x²/2 求导后得到 x，因此它是 x 的一个原函数。", "验证原函数时直接求导，看是否回到被积函数。", "基础"),
      makeQuestion("integral-intro", "integral-5", "∫₀³ 2 dx 的值是多少？", "numeric", 6, "常数 2 在长度为 3 的区间上累加，得到 2×3=6。", "常数定积分等于常数乘区间长度。", "入门"),
      makeQuestion("integral-intro", "integral-6", "xⁿ（n≠-1）的不定积分规则是？", "choice", "B", "幂函数积分指数加 1，再除以新指数。", "使用幂函数积分公式时先检查 n 是否等于 -1，最后不要漏写 C。", "基础", ["A. xⁿ⁻¹/(n-1)+C", "B. xⁿ⁺¹/(n+1)+C", "C. nxⁿ+C", "D. xⁿ+C"]),
      makeQuestion("integral-intro", "integral-7", "∫₀¹ x dx 的值是多少？", "numeric", 0.5, "原函数为 x²/2，代入 1 和 0 得 1/2。", "定积分结果可能是小数，数值比较应按数值而不是字符串判断。", "基础"),
      makeQuestion("integral-intro", "integral-8", "不定积分的结果通常为什么要加 C？", "choice", "A", "任意常数的导数都是 0，所以原函数不唯一。", "区分定积分和不定积分：不定积分表示原函数族，定积分有明确数值。", "基础", ["A. 因为原函数有一族相差常数的函数", "B. 因为积分一定为负", "C. 因为区间长度未知", "D. 因为导数不存在"]),
      makeQuestion("integral-intro", "integral-9", "∫₀³ 2x dx 的值是多少？", "numeric", 9, "原函数为 x²，代入上限 3 得 9。", "先应用基本积分规则得到原函数，再执行上限减下限。", "基础"),
      makeQuestion("integral-intro", "integral-10", "积分和导数之间最基本的关系是什么？", "text", "互为逆运算", "在满足条件时，积分可以看作求导的逆过程。", "遇到积分先想反导数，遇到导数则关注变化率和切线斜率。", "基础"),
    ],
  },
];

const memoryVideo = (id: string, title: string, url: string, wordId: string): Resource => ({ id, title, type: "video", url, source: "Bilibili", knowledgePoint: wordId, difficulty: "基础", description: "具体单词记忆视频，帮助建立词义或发音联想。", availability: "available", relatedNextStep: null });

const makeVocabularyWord = (word: Omit<VocabularyWord, "memoryVideo"> & { memoryVideo?: Resource }): VocabularyWord => word;

export const vocabulary: VocabularyWord[] = [
  makeVocabularyWord({ id: "environment", word: "environment", ipa: "/ɪnˈvaɪrənmənt/", partOfSpeech: "noun", meaning: "环境", englishDefinition: "the natural world and the conditions around people", example: "We need to protect the environment.", exampleTranslation: "我们需要保护环境。", collocations: ["protect the environment", "natural environment"], memoryVideo: memoryVideo("memory-environment", "Environment 的不同发音", "https://www.bilibili.com/video/BV1n14y1Q7br/", "environment") }),
  makeVocabularyWord({ id: "achieve", word: "achieve", ipa: "/əˈtʃiːv/", partOfSpeech: "verb", meaning: "实现；达到", englishDefinition: "to succeed in doing or getting something", example: "Small steps help us achieve big goals.", exampleTranslation: "小步前进能帮助我们实现大目标。", collocations: ["achieve a goal", "achieve success"], memoryVideo: memoryVideo("memory-achieve", "achieve 的音标拼读记忆方法", "https://www.bilibili.com/video/BV1feQTYWEv3/", "achieve") }),
  makeVocabularyWord({ id: "adapt", word: "adapt", ipa: "/əˈdæpt/", partOfSpeech: "verb", meaning: "适应；改编", englishDefinition: "to change so that you can fit a new situation", example: "We must adapt to new tools.", exampleTranslation: "我们必须适应新工具。", collocations: ["adapt to change", "adapt a story"] }),
  makeVocabularyWord({ id: "approach", word: "approach", ipa: "/əˈprəʊtʃ/", partOfSpeech: "noun/verb", meaning: "方法；接近", englishDefinition: "a way of dealing with something; to come near", example: "This approach makes the problem easier.", exampleTranslation: "这个方法让问题更容易。", collocations: ["a practical approach", "approach a problem"] }),
  makeVocabularyWord({ id: "assume", word: "assume", ipa: "/əˈsjuːm/", partOfSpeech: "verb", meaning: "假设；认为", englishDefinition: "to accept something as true without proof", example: "Do not assume that every answer is obvious.", exampleTranslation: "不要想当然地认为每个答案都很明显。", collocations: ["assume that", "make an assumption"] }),
  makeVocabularyWord({ id: "benefit", word: "benefit", ipa: "/ˈbenɪfɪt/", partOfSpeech: "noun/verb", meaning: "益处；受益", englishDefinition: "an advantage or good result", example: "Regular review has a long-term benefit.", exampleTranslation: "定期复习有长期益处。", collocations: ["health benefit", "benefit from"] }),
  makeVocabularyWord({ id: "challenge", word: "challenge", ipa: "/ˈtʃælɪndʒ/", partOfSpeech: "noun/verb", meaning: "挑战", englishDefinition: "a difficult task or situation", example: "A hard question can be a useful challenge.", exampleTranslation: "难题可以成为有用的挑战。", collocations: ["face a challenge", "challenge yourself"] }),
  makeVocabularyWord({ id: "communicate", word: "communicate", ipa: "/kəˈmjuːnɪkeɪt/", partOfSpeech: "verb", meaning: "交流；传达", englishDefinition: "to share information, ideas, or feelings", example: "Clear words help us communicate.", exampleTranslation: "清晰的语言帮助我们交流。", collocations: ["communicate clearly", "communicate with"] }),
  makeVocabularyWord({ id: "community", word: "community", ipa: "/kəˈmjuːnəti/", partOfSpeech: "noun", meaning: "社区；群体", englishDefinition: "a group of people who share a place or interest", example: "The learning community shares useful ideas.", exampleTranslation: "学习群体会分享有用的想法。", collocations: ["local community", "online community"] }),
  makeVocabularyWord({ id: "consume", word: "consume", ipa: "/kənˈsjuːm/", partOfSpeech: "verb", meaning: "消耗；消费", englishDefinition: "to use, eat, or drink something", example: "Reading takes time but does not consume much data.", exampleTranslation: "阅读需要时间，但不会消耗太多数据。", collocations: ["consume energy", "consumer goods"] }),
  makeVocabularyWord({ id: "contribute", word: "contribute", ipa: "/kənˈtrɪbjuːt/", partOfSpeech: "verb", meaning: "贡献；促成", englishDefinition: "to help to cause something or give something", example: "Each example can contribute to our understanding.", exampleTranslation: "每个例子都能帮助我们加深理解。", collocations: ["contribute to", "make a contribution"] }),
  makeVocabularyWord({ id: "convenient", word: "convenient", ipa: "/kənˈviːniənt/", partOfSpeech: "adjective", meaning: "方便的", englishDefinition: "easy to use or suitable for a situation", example: "A short review is convenient on a busy day.", exampleTranslation: "忙碌的一天里，短时间复习很方便。", collocations: ["convenient time", "convenient for"] }),
  makeVocabularyWord({ id: "creative", word: "creative", ipa: "/kriˈeɪtɪv/", partOfSpeech: "adjective", meaning: "有创造力的", englishDefinition: "having the ability to make new ideas or things", example: "A creative example can make a concept memorable.", exampleTranslation: "有创意的例子能让概念更容易记住。", collocations: ["creative idea", "creative thinking"] }),
  makeVocabularyWord({ id: "critical", word: "critical", ipa: "/ˈkrɪtɪkəl/", partOfSpeech: "adjective", meaning: "批判性的；关键的", englishDefinition: "involving careful judgment; extremely important", example: "Critical thinking helps us check an argument.", exampleTranslation: "批判性思维帮助我们检查论证。", collocations: ["critical thinking", "critical point"] }),
  makeVocabularyWord({ id: "curious", word: "curious", ipa: "/ˈkjʊəriəs/", partOfSpeech: "adjective", meaning: "好奇的", englishDefinition: "wanting to know or learn more", example: "Stay curious when you meet a new idea.", exampleTranslation: "遇到新想法时保持好奇。", collocations: ["curious about", "curious mind"] }),
  makeVocabularyWord({ id: "determine", word: "determine", ipa: "/dɪˈtɜːmɪn/", partOfSpeech: "verb", meaning: "决定；确定", englishDefinition: "to find out or decide something", example: "The evidence can determine the result.", exampleTranslation: "证据可以确定结果。", collocations: ["determine whether", "determine a cause"] }),
  makeVocabularyWord({ id: "efficient", word: "efficient", ipa: "/ɪˈfɪʃənt/", partOfSpeech: "adjective", meaning: "高效的", englishDefinition: "working well without wasting time or energy", example: "A focused session is more efficient.", exampleTranslation: "专注的学习时段更高效。", collocations: ["efficient method", "energy-efficient"] }),
  makeVocabularyWord({ id: "emerge", word: "emerge", ipa: "/ɪˈmɜːdʒ/", partOfSpeech: "verb", meaning: "出现；显现", englishDefinition: "to become known or visible", example: "A clear pattern will emerge after practice.", exampleTranslation: "练习之后清晰的规律会显现出来。", collocations: ["emerge from", "new pattern emerges"] }),
  makeVocabularyWord({ id: "encourage", word: "encourage", ipa: "/ɪnˈkʌrɪdʒ/", partOfSpeech: "verb", meaning: "鼓励；促进", englishDefinition: "to give someone support or confidence", example: "Small successes encourage further study.", exampleTranslation: "小小的成功会鼓励继续学习。", collocations: ["encourage someone to", "encourage learning"] }),
  makeVocabularyWord({ id: "essential", word: "essential", ipa: "/ɪˈsenʃəl/", partOfSpeech: "adjective", meaning: "必要的；本质的", englishDefinition: "completely necessary or very important", example: "Practice is essential for recall.", exampleTranslation: "练习对记忆非常必要。", collocations: ["essential skill", "essential for"] }),
  makeVocabularyWord({ id: "evidence", word: "evidence", ipa: "/ˈevɪdəns/", partOfSpeech: "noun", meaning: "证据", englishDefinition: "facts or information showing that something is true", example: "Use evidence to support your answer.", exampleTranslation: "用证据支持你的答案。", collocations: ["strong evidence", "evidence of"] }),
  makeVocabularyWord({ id: "familiar", word: "familiar", ipa: "/fəˈmɪliə/", partOfSpeech: "adjective", meaning: "熟悉的", englishDefinition: "well known from experience", example: "The second example feels more familiar.", exampleTranslation: "第二个例子感觉更熟悉。", collocations: ["familiar with", "familiar face"] }),
  makeVocabularyWord({ id: "feature", word: "feature", ipa: "/ˈfiːtʃə/", partOfSpeech: "noun/verb", meaning: "特点；以……为特色", englishDefinition: "an important or noticeable part of something", example: "The dictionary feature shows useful phrases.", exampleTranslation: "词典功能会展示有用短语。", collocations: ["key feature", "feature a section"] }),
  makeVocabularyWord({ id: "flexible", word: "flexible", ipa: "/ˈfleksəbəl/", partOfSpeech: "adjective", meaning: "灵活的", englishDefinition: "able to change or adapt easily", example: "A flexible plan leaves room for review.", exampleTranslation: "灵活的计划会为复习留出空间。", collocations: ["flexible schedule", "flexible approach"] }),
  makeVocabularyWord({ id: "impact", word: "impact", ipa: "/ˈɪmpækt/", partOfSpeech: "noun/verb", meaning: "影响；冲击", englishDefinition: "a strong effect on someone or something", example: "Feedback can have a positive impact.", exampleTranslation: "反馈可以产生积极影响。", collocations: ["have an impact on", "major impact"] }),
  makeVocabularyWord({ id: "improve", word: "improve", ipa: "/ɪmˈpruːv/", partOfSpeech: "verb", meaning: "改善；提高", englishDefinition: "to become or make better", example: "Regular testing can improve recall.", exampleTranslation: "定期测试可以提高回忆能力。", collocations: ["improve skills", "improve gradually"] }),
  makeVocabularyWord({ id: "individual", word: "individual", ipa: "/ˌɪndɪˈvɪdʒuəl/", partOfSpeech: "adjective/noun", meaning: "个人的；个体", englishDefinition: "belonging to one person or a single thing", example: "Each individual has a different starting point.", exampleTranslation: "每个人的起点都不同。", collocations: ["individual difference", "individual learner"] }),
  makeVocabularyWord({ id: "influence", word: "influence", ipa: "/ˈɪnfluəns/", partOfSpeech: "noun/verb", meaning: "影响", englishDefinition: "the power to change someone or something", example: "Examples influence how we understand a rule.", exampleTranslation: "例子会影响我们理解规则的方式。", collocations: ["influence behavior", "under the influence of"] }),
  makeVocabularyWord({ id: "maintain", word: "maintain", ipa: "/meɪnˈteɪn/", partOfSpeech: "verb", meaning: "维持；保养", englishDefinition: "to keep something at the same level or condition", example: "Maintain a clear record of your mistakes.", exampleTranslation: "清楚地维护错题记录。", collocations: ["maintain quality", "maintain a balance"] }),
  makeVocabularyWord({ id: "measure", word: "measure", ipa: "/ˈmeʒə/", partOfSpeech: "verb/noun", meaning: "测量；措施", englishDefinition: "to find the size or amount of something", example: "A test can measure what you remember.", exampleTranslation: "测试可以衡量你记住了什么。", collocations: ["measure progress", "take measures"] }),
  makeVocabularyWord({ id: "motivate", word: "motivate", ipa: "/ˈməʊtɪveɪt/", partOfSpeech: "verb", meaning: "激励；促使", englishDefinition: "to make someone want to do something", example: "A clear next step can motivate study.", exampleTranslation: "清晰的下一步能促使人学习。", collocations: ["motivate someone", "highly motivated"] }),
  makeVocabularyWord({ id: "participate", word: "participate", ipa: "/pɑːˈtɪsɪpeɪt/", partOfSpeech: "verb", meaning: "参加；参与", englishDefinition: "to take part in an activity", example: "Everyone can participate in the practice.", exampleTranslation: "每个人都可以参与练习。", collocations: ["participate in", "active participation"] }),
  makeVocabularyWord({ id: "prevent", word: "prevent", ipa: "/prɪˈvent/", partOfSpeech: "verb", meaning: "预防；阻止", englishDefinition: "to stop something from happening", example: "Review can prevent the same mistake.", exampleTranslation: "复习可以防止犯同样的错误。", collocations: ["prevent mistakes", "prevent someone from"] }),
  makeVocabularyWord({ id: "process", word: "process", ipa: "/ˈprəʊses/", partOfSpeech: "noun/verb", meaning: "过程；处理", englishDefinition: "a series of actions that produce a result", example: "Learning is a process, not a single event.", exampleTranslation: "学习是一个过程，而不是一次事件。", collocations: ["learning process", "process information"] }),
  makeVocabularyWord({ id: "reduce", word: "reduce", ipa: "/rɪˈdjuːs/", partOfSpeech: "verb", meaning: "减少；降低", englishDefinition: "to make something smaller or less", example: "Clear notes reduce review time.", exampleTranslation: "清晰的笔记能减少复习时间。", collocations: ["reduce risk", "reduce costs"] }),
  makeVocabularyWord({ id: "reflect", word: "reflect", ipa: "/rɪˈflekt/", partOfSpeech: "verb", meaning: "反思；反映", englishDefinition: "to think carefully or show an image or quality", example: "Reflect on why the answer was wrong.", exampleTranslation: "反思答案为什么错。", collocations: ["reflect on", "reflect a change"] }),
  makeVocabularyWord({ id: "require", word: "require", ipa: "/rɪˈkwaɪə/", partOfSpeech: "verb", meaning: "需要；要求", englishDefinition: "to need something or make something necessary", example: "This question requires careful reading.", exampleTranslation: "这道题需要仔细阅读。", collocations: ["require attention", "be required to"] }),
  makeVocabularyWord({ id: "resource", word: "resource", ipa: "/rɪˈsɔːs/", partOfSpeech: "noun", meaning: "资源；资料", englishDefinition: "a useful supply of something", example: "Choose one reliable learning resource.", exampleTranslation: "选择一个可靠的学习资源。", collocations: ["learning resource", "natural resources"] }),
  makeVocabularyWord({ id: "significant", word: "significant", ipa: "/sɪɡˈnɪfɪkənt/", partOfSpeech: "adjective", meaning: "重要的；显著的", englishDefinition: "important or large enough to be noticed", example: "The result shows a significant improvement.", exampleTranslation: "结果显示出明显的进步。", collocations: ["significant change", "statistically significant"] }),
  makeVocabularyWord({ id: "strategy", word: "strategy", ipa: "/ˈstrætədʒi/", partOfSpeech: "noun", meaning: "策略；方法", englishDefinition: "a plan for achieving a goal", example: "Spaced review is a useful study strategy.", exampleTranslation: "间隔复习是一种有用的学习策略。", collocations: ["study strategy", "develop a strategy"] }),
  makeVocabularyWord({ id: "structure", word: "structure", ipa: "/ˈstrʌktʃə/", partOfSpeech: "noun/verb", meaning: "结构；组织", englishDefinition: "the way parts are arranged or organized", example: "A clear structure makes a lesson easier to follow.", exampleTranslation: "清晰的结构让课程更容易跟上。", collocations: ["sentence structure", "well-structured"] }),
  makeVocabularyWord({ id: "sufficient", word: "sufficient", ipa: "/səˈfɪʃənt/", partOfSpeech: "adjective", meaning: "足够的", englishDefinition: "enough for a particular purpose", example: "Ten minutes is sufficient for this review.", exampleTranslation: "十分钟足够完成这次复习。", collocations: ["sufficient evidence", "sufficient time"] }),
  makeVocabularyWord({ id: "theory", word: "theory", ipa: "/ˈθɪəri/", partOfSpeech: "noun", meaning: "理论；原理", englishDefinition: "a set of ideas that explains something", example: "The example connects theory with practice.", exampleTranslation: "这个例子把理论和实践联系起来。", collocations: ["in theory", "scientific theory"] }),
  makeVocabularyWord({ id: "typical", word: "typical", ipa: "/ˈtɪpɪkəl/", partOfSpeech: "adjective", meaning: "典型的；通常的", englishDefinition: "having the usual qualities of a particular group", example: "This is a typical beginner mistake.", exampleTranslation: "这是初学者常见的错误。", collocations: ["typical example", "typical of"] }),
  makeVocabularyWord({ id: "various", word: "various", ipa: "/ˈveəriəs/", partOfSpeech: "adjective", meaning: "各种各样的", englishDefinition: "several different", example: "The quiz uses various question types.", exampleTranslation: "测验使用各种题型。", collocations: ["various reasons", "various kinds of"] }),
  makeVocabularyWord({ id: "access", word: "access", ipa: "/ˈækses/", partOfSpeech: "noun/verb", meaning: "进入；使用权", englishDefinition: "the right or ability to use or reach something", example: "You can access the lesson from your phone.", exampleTranslation: "你可以用手机访问课程。", collocations: ["access information", "have access to"] }),
  makeVocabularyWord({ id: "aware", word: "aware", ipa: "/əˈweə/", partOfSpeech: "adjective", meaning: "意识到的", englishDefinition: "knowing about a situation or fact", example: "Be aware of the sign in a formula.", exampleTranslation: "注意公式中的符号。", collocations: ["be aware of", "raise awareness"] }),
  makeVocabularyWord({ id: "conduct", word: "conduct", ipa: "/kənˈdʌkt/", partOfSpeech: "verb/noun", meaning: "进行；行为", englishDefinition: "to organize and carry out an activity", example: "The class will conduct a short experiment.", exampleTranslation: "课堂将进行一个简短实验。", collocations: ["conduct research", "code of conduct"] }),
  makeVocabularyWord({ id: "distinct", word: "distinct", ipa: "/dɪˈstɪŋkt/", partOfSpeech: "adjective", meaning: "明显不同的", englishDefinition: "clearly different or separate", example: "The two meanings are distinct.", exampleTranslation: "这两个含义明显不同。", collocations: ["distinct feature", "distinct from"] }),
  makeVocabularyWord({ id: "expand", word: "expand", ipa: "/ɪkˈspænd/", partOfSpeech: "verb", meaning: "扩大；扩展", englishDefinition: "to become larger or make something larger", example: "We can expand the course later.", exampleTranslation: "我们之后可以扩展课程。", collocations: ["expand knowledge", "expand into"] }),
  makeVocabularyWord({ id: "factor", word: "factor", ipa: "/ˈfæktə/", partOfSpeech: "noun", meaning: "因素；因子", englishDefinition: "a fact or condition that contributes to a result", example: "Time is an important factor in learning.", exampleTranslation: "时间是学习中的重要因素。", collocations: ["key factor", "risk factor"] }),
  makeVocabularyWord({ id: "focus", word: "focus", ipa: "/ˈfəʊkəs/", partOfSpeech: "noun/verb", meaning: "专注；焦点", englishDefinition: "special attention or the main center of interest", example: "A quiet desk helps me focus.", exampleTranslation: "安静的书桌帮助我专注。", collocations: ["focus on", "main focus"], memoryVideo: memoryVideo("memory-focus", "高频单词：focus", "https://www.bilibili.com/video/BV19b15YJEoB/", "focus") }),
  makeVocabularyWord({ id: "generate", word: "generate", ipa: "/ˈdʒenəreɪt/", partOfSpeech: "verb", meaning: "产生；生成", englishDefinition: "to produce or create something", example: "Practice can generate useful questions.", exampleTranslation: "练习可以产生有用的问题。", collocations: ["generate ideas", "generate income"] }),
];

export const reading = {
  title: "Small steps, lasting progress",
  body: "Learning does not need to be perfect every day. A short session can still move an idea from unfamiliar to familiar. When you return, look at your last record and choose one small next step.",
  questions: ["What can a short session do?", "What should you look at when you return?"],
};

export const listening = {
  title: "A gentle listening practice",
  body: "Listen for the main idea first. You do not need to understand every word. Try again, notice one useful phrase, and write down what you heard.",
  audioUrl: "https://www.bilibili.com/video/BV1sbhdzfEqf/",
  resource: { id: "bbc-six-minute-bilibili", title: "BBC 六分钟英语 - 6 Minute English - 中英字幕", type: "video", url: "https://www.bilibili.com/video/BV1sbhdzfEqf/", source: "Bilibili", knowledgePoint: "english-listening", difficulty: "基础", description: "具体听力视频页，带中英字幕，适合先听大意再精听短语。", availability: "available", relatedNextStep: "the-intern-introduction" } satisfies Resource,
};

export const filmEnglish: FilmEnglishItem[] = [
  {
    id: "the-intern-introduction",
    work: "The Intern",
    clipTitle: "The Intern 面试片段",
    clipDescription: "围绕第一次面试和职场自我介绍的具体片段，适合练习礼貌表达和听取关键信息。",
    learningGoal: "精听面试场景，识别自我介绍中的关键信息，并练习自然跟读。",
    vocabulary: ["experience", "introduce", "work with", "pleasure"],
    tasks: ["先阅读片段目标，预测会听到的表达", "精听并记下两句完整表达", "跟读一遍，关注重音和停顿"],
    resource: { id: "film-intern-clip", title: "The Intern 面试片段", type: "clip", url: "https://www.bilibili.com/video/BV1qt411W7eu/", source: "Bilibili", knowledgePoint: "the-intern-introduction", difficulty: "基础", description: "已验证具体视频页面可访问；观看后练习面试场景中的听力和表达。", availability: "available", relatedNextStep: null },
  },
];

