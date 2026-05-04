function stage2_5() {
    stage = 2.5;
    gsap.set("#page2_5", {
        x: 0,
    })
    gsap.to("#page2_5", {
        opacity: 1,
    })
    gsap.set(['#so2_5', '#Answering'], {
        opacity: 0,
    })
    gsap.set("#so2_5", {
        x: 700,
    })
    gsap.set(['#talking1', '#talkingT'], {
        scaleY: 0,
    })
    let currentTween = null;
    let currentTextIndex = 0;
    const talkingTexts = [
        "*你听见了某个人的声音在说话。",
        "“我明白……这是一个很艰难的决定。”",
        "“毕竟，这是你们的心血。但是……”"
    ];

    const talkingTextElement = document.getElementById("takingtext");

    // 打字机效果配置
    function createTextSequence_25(text) {
        let lastCharIndex = -1;
        const duration = text.length * 0.1; // 匀速打字，每个字符0.1s
        return {
            text: text,
            duration: duration,
            ease: "none",
            onStart: function () { lastCharIndex = -1; },
            onUpdate: function () {
                const currentStr = talkingTextElement.innerText || talkingTextElement.textContent;
                const currentIndex = currentStr.length - 1;
                if (currentIndex > lastCharIndex) {
                    const newChar = currentStr[currentIndex];
                    // 使用 sounds.js 中定义的 playTypewriterSE 和 SE4_1
                    if (typeof playTypewriterSE === 'function' && typeof SE4_1 !== 'undefined') {
                        playTypewriterSE(newChar, SE4_1);
                    }
                    lastCharIndex = currentIndex;
                }
            }
        };
    }

    function showNextTalkingText_25() {
        if (currentTextIndex < talkingTexts.length) {
            talkingTextElement.innerText = "";
            currentTween = gsap.to(talkingTextElement, createTextSequence_25(talkingTexts[currentTextIndex]));
            currentTextIndex++;
        } else {
            // 文本播放完毕，清空并收起对话框
            talkingTextElement.innerText = "";
            gsap.to(['#talking1', '#talkingT'], {
                scaleY: 0,
                duration: 0.5,
                onComplete: () => {
                    // 动画结束后 50ms 将相关元素设置为不可见
                    gsap.delayedCall(0.05, () => {
                        gsap.set(['#talking1', '#talkingT', ], {
                            display: "none",
                            x:1000,
                        });
                    });
                    showAnswering_25();
                }
            });
            // 移除全局点击监听
            document.removeEventListener('click', handleTalkingClick_25);
        }
    }

    function handleTalkingClick_25(e) {
        if (currentTween && currentTween.isActive()) {
            // 如果正在打字，直接显示全段文本
            currentTween.progress(1);
        } else {
            // 否则播放下一段
            showNextTalkingText_25();
        }
    }

    // 延迟显示对话框并开始第一段文本
    gsap.delayedCall(0.5, () => {
        gsap.to(['#talking1', '#talkingT'], {
            scaleY: 1,
            duration: 0.5,
            onComplete: () => {
                showNextTalkingText_25();
                document.addEventListener('click', handleTalkingClick_25);
            }
        })
    })

    let answeringIndex = 0;
    const answeringTexts = [
        "我会做的。",
        "这也是……为了一切的将来。",
        "（*点火）"
    ];
    const yourAnswerElement = document.getElementById("YourAnswer");
    const answeringGroup = document.getElementById("Answering");

    function showAnswering_25() {
        if (answeringIndex < answeringTexts.length) {
            yourAnswerElement.innerText = answeringTexts[answeringIndex];
            gsap.to(answeringGroup, {
                opacity: 1,
                duration: 0.5,
                onComplete: () => {
                    answeringGroup.style.pointerEvents = "auto";
                }
            });
            
            // 为 Answering 添加点击事件
            answeringGroup.onclick = handleAnsweringClick_25;
        }
    }

    function handleAnsweringClick_25() {
        answeringGroup.style.pointerEvents = "none";
        answeringIndex++;

        switch (answeringIndex) {
            case 1:
            case 2:
                // 第一次和第二次点击后的切换逻辑
                if (typeof SE4_2 !== 'undefined') {
                    SE4_2.play();
                }
                gsap.to(answeringGroup, {
                    opacity: 0,
                    duration: 0.1, // 短暂消失
                    onComplete: () => {
                        yourAnswerElement.innerText = "";
                        gsap.delayedCall(0.1, () => {
                            showAnswering_25();
                        });
                    }
                });
                break;
            case 3:
                // 第三次文本：*点火
                if (typeof SE2_5 !== 'undefined') {
                    SE2_5.play();
                    // 播放音效后让 Answering 消失
                    gsap.to(answeringGroup, {
                        opacity: 0,
                        duration: 0.5,
                        delay: 0.05, // 稍微延迟一下，确保音效先起头
                        onComplete: () => {
                            // 白幕渐显
                            gsap.set("#so2_5", {
                                x: 0,
                            })
                            gsap.to("#so2_5", {
                                opacity: 1,
                                duration: 1.5,
                                onComplete: () => {
                                    stage = 3;
                                    initPuzzle();
                                }
                            });
                        }
                    });
                }
                break;
        }
    }
}