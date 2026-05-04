/**
 * --- howler.js 音频管理 ---
 * 
 * Howler.js 是一个现代化的 JavaScript 音频库，它简化了 Web Audio API 的复杂性。
 * 
 * 使用步骤说明：
 * 1. 实例化 Howl 对象：通过 `new Howl({...})` 创建一个音频实例。
 * 2. 配置参数：
 *    - src: 音频资源的路径（建议使用数组，可以包含多种格式如 ['sound.mp3', 'sound.ogg'] 以提高兼容性）。
 *    - volume: 设置音量，范围从 0.0 到 1.0。
 *    - onload: 音频加载完成后的回调函数。
 *    - onplay: 音频开始播放时的回调函数。
 * 3. 常用方法：
 *    - .play(): 播放音频。
 *    - .pause(): 暂停音频。
 *    - .stop(): 停止音频并重置播放进度。
 *    - .fade(from, to, duration): 在指定时间内平滑改变音量（淡入淡出）。
 */
const BGM0 = new Howl({
    src: ['./res/sounds/0/iwashiro_amamichi_no_nioi.ogg'], // 音频文件路径
    volume: 0.6, // 默认音量大小
    loop: true,
    onplay: function(){
        console.log('主页面BGM播放')
    }
});
//STAGE1
const BGM1 = new Howl({
    src: ['./res/sounds/page1/iwashiro_cook_lu_no_chousenjo.ogg'], // 音频文件路径
    volume: 0.6, // 默认音量大小
    loop: true,
    onplay: function(){
        console.log('第一幕BGM播放')
    }
});
const SE1_1 = new Howl({
    src:['./res/sounds/page1/garagara.ogg'],
    volume: 0.7,
    onplay: function(){
        console.log('第一幕-发车')
    }
});
const SE1_2 = new Howl({
    src:['./res/sounds/page1/gacha.ogg'],
    volume: 0.6,

})
//STAGE2
const BGM2 = new Howl({
    src: ['./res/sounds/page2/iwashiro_fullbit_menkyo.ogg'], // 音频文件路径
    volume: 0.6, // 默认音量大小
    loop: true,
    onplay: function(){
        console.log('第二幕BGM播放')
    }
});
const SE2_2 = new Howl({
    src:['./res/sounds/page2/会話3_単音.mp3'],
    volume: 0.5,
});
const SE2_1 = new Howl({
    src:['./res/sounds/page2/cursor_9.ogg'],
    volume: 0.4,
})
const SE2_3 = new Howl({
    src:['./res/sounds/page2/battle_start.ogg'],
    volume: 0.6,
})
//Stage2.5
const SE2_5 = new Howl({
    src:['./res/sounds/page2.5/fire.ogg'],
    volume: 0.5,
})
//Stage3
const BGM3 = new Howl({
    src: ['./res/sounds/page3/iwashiro_ame_no_hazama_waltz.ogg'], // 音频文件路径
    volume: 0.3, // 默认音量大小
    loop: true,
    onplay: function(){
        console.log('第三幕BGM播放')
    }
});
//stage4
const BGM4 = new Howl({
    src: ['./res/sounds/page4/iwashiro_niwashi1.ogg'], // 音频文件路径
    volume: 0.3, // 默认音量大小
    loop: true,
    onplay: function(){
        console.log('第四幕BGM播放')
    }
});
const SE4_1 = new Howl({
    src:['./res/sounds/page4/会話1_単音.mp3'],
    volume:0.4,
})
const SE4_2 = new Howl({
    src:['./res/sounds/page4/会話4_単音.mp3'],
    volume: 0.6,
})
//stage5
const BGM5 = new Howl({
    src: ['./res/sounds/page5/iwashiro_sei_mokuyobi.ogg'], // 音频文件路径
    volume: 0.6, // 默认音量大小
    loop: true,
    onplay: function(){
        console.log('第五幕BGM播放')
    }
});

let currentBGM = null;
let isFading = false; // 淡入淡出状态锁
let audioUnlocked = false; // 音频解锁标记

// BGM 默认音量映射表，用于淡入时恢复各自设置的音量
const BGM_VOLUMES = new Map([
    [BGM0, 0.6],
    [BGM1, 0.6],
    [BGM2, 0.6],
    [BGM3, 0.4],
    [BGM4, 0.4],
    [BGM5, 0.6]
]);

function ChangeBGM() {
    if (isFading || !audioUnlocked) return; // 如果正在切换或音频未解锁，则不执行

    let nextBGM;
    let currentStage = (typeof stage !== 'undefined') ? stage : 0;

    switch (currentStage) {
        case 0: nextBGM = BGM0; break;
        case 1: nextBGM = BGM1; break;
        case 2: nextBGM = BGM2; break;
        case 2.5: nextBGM = null; break; // 特殊案例：静音阶段
        case 3: nextBGM = BGM3; break;
        case 3.5: nextBGM = null; break; // 特殊案例：静音阶段
        case 4: nextBGM = BGM4; break;
        case 5: nextBGM = BGM5; break;
        default: return;
    }

    if (currentBGM !== nextBGM) {
        isFading = true; // 加锁

        if (currentBGM) {
            // 先淡出当前 BGM
            let fadeOutBGM = currentBGM;
            fadeOutBGM.fade(fadeOutBGM.volume(), 0, 500);
            fadeOutBGM.once('fade', () => {
                fadeOutBGM.stop();
                
                // 淡出彻底结束后，开始淡入下一个 BGM
                startFadeIn(nextBGM);
            });
        } else {
            // 如果没有当前播放的 BGM，直接淡入
            startFadeIn(nextBGM);
        }

        currentBGM = nextBGM;
    }
}

function startFadeIn(nextBGM) {
    // 如果没有下一个 BGM（如 stage 3.5 阶段），直接解锁并结束
    if (!nextBGM) {
        isFading = false;
        return;
    }

    // 获取 BGM 映射表中的目标音量，默认为 0.6
    const targetVol = BGM_VOLUMES.get(nextBGM) || 0.6;
    
    nextBGM.volume(0);
    nextBGM.play();
    // 这里的参数说明: fade(起始音量, 目标音量, 持续时间ms)
    // 目标音量现在使用各自设置的默认值
    nextBGM.fade(0, targetVol, 800);
    nextBGM.once('fade', () => {
        isFading = false; // 淡入完成后解锁
    });
}

/**
 * 播放打字机音效，避开标点符号
 * @param {string} char 当前显示的字符
 * @param {Howl} soundObj 要播放的音效对象
 */
function playTypewriterSE(char, soundObj) {
    // 匹配中文标点、英文标点、空格、换行符
    const punctuationRegex = /[\s\p{P}\p{S}]/u;
    if (char && !punctuationRegex.test(char)) {
        // 如果不是标点符号，则播放音效
        // 停止之前的播放以支持快速连续触发（可选，取决于音效长短）
        soundObj.stop();
        soundObj.play();
    }
}

// 每 200ms 自动检测一次 stage 变化
setInterval(ChangeBGM, 200);

// 监听首次用户交互以解锁音频上下文
function unlockAudio() {
    if (audioUnlocked) return;
    
    // 恢复 Howler 的音频上下文
    if (Howler.ctx && Howler.ctx.state === 'suspended') {
        Howler.ctx.resume().then(() => {
            console.log('音频上下文已解锁');
            audioUnlocked = true;
            ChangeBGM(); // 立即尝试更新 BGM
        });
    } else {
        audioUnlocked = true;
        ChangeBGM();
    }

    // 移除监听器
    window.removeEventListener('click', unlockAudio);
    window.removeEventListener('touchstart', unlockAudio);
}

// 公开给全局使用，方便 before.js 手动触发
window.unlockAudio = unlockAudio;

window.addEventListener('click', unlockAudio);
window.addEventListener('touchstart', unlockAudio);

//stage2音效
function Stage2SE(fight, act, run){
    // 战斗按钮
    fight.addEventListener('mouseenter',()=>{
        SE2_2.play();
    });
    fight.addEventListener('click',()=>{
        SE2_1.play();
    });

    // 行动按钮
    act.addEventListener('mouseenter',()=>{
        SE2_2.play();
    });
    act.addEventListener('click',()=>{
        SE2_1.play();
    });

    // 逃跑按钮
    run.addEventListener('mouseenter',()=>{
        SE2_2.play();
    });
    run.addEventListener('click',()=>{
        SE2_1.play();
    });
}
