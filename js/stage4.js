 function stage4(){
const imgUrl = './res/1.png';
const preloadImg = new Image();
preloadImg.src = imgUrl;
const CwElement = document.querySelector("#checkW")
const CeElement = document.querySelector("#checkE")
const CTLElement = document.querySelector("#checkT-L")
const CnElement = document.querySelector("#checkNumber")
const A1Element = document.querySelector("#A1")
const A2Element = document.querySelector("#A2")
const A3Element = document.querySelector("#A3")
let checkWin = false;
let checkEl = false;
let checkTl = false;
let checkNum = false;
let Know1 = 0;
let Know2 = 0;
let Know3 = 0;
let Know4 = 0;
let CA1 = false;
let CA3 = false;
let introComplete = false;
stage = 3.5;
let currentTween = null; // 全局追踪文字动画

// 捕获阶段监听点击事件，用于补全当前正在显示的文字
const textCompleter = (e) => {
    if (currentTween && currentTween.isActive()) {
        currentTween.progress(1);
        e.stopImmediatePropagation(); // 阻止其他点击事件触发（即不立即进入下一段）
    }
};
document.addEventListener('click', textCompleter, true);

const tl = gsap.timeline();
gsap.set("#page4",{
    x:0
})
gsap.to("#page4",{
    opacity:1,
})
function createClickEffect(e) {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.style.backgroundImage = `url('${imgUrl}')`;
    effect.style.left = `${e.pageX}px`;
    effect.style.top = `${e.pageY}px`;
    document.body.appendChild(effect);
    effect.addEventListener('animationend', function () {
        effect.remove();
    });
}

// 替换原有的事件监听器
document.addEventListener('click', createClickEffect);


gsap.set(["#A1", "#A2", "#A3", "#so4"], {
    x: -700,
    opacity: 0,
})
gsap.set(["#windows", "#Tlogo", "#Number"], {
    x: -700,
    scaleY: 0,
})
gsap.set("#ss1008", {
    opacity: 0,
})
gsap.set("#checking", {
    scaleY: 0,
})
gsap.set([CwElement, CeElement, CTLElement, CnElement], { pointerEvents: 'none' })
gsap.delayedCall(0.5, () => {
    gsap.to("#checking", {
        scaleY: 1,
        duration: 0.5,
        onComplete: () => {
            function startIntroSequence() {
                    function createTextSequenceLocal(text, duration = null) {
                        let lastCharIndex = -1;
                        // 如果未指定时长，则按每字符 0.08秒 计算，实现真正的匀速
                        const finalDuration = duration || (text.length * 0.1);
                        return {
                            text: text,
                            duration: finalDuration,
                            ease: "none",
                            onStart: function() { lastCharIndex = -1; },
                            onUpdate: function() {
                                const currentText = this.targets()[0].innerText || this.targets()[0].textContent;
                                const currentIndex = currentText.length - 1;
                                if (currentIndex > lastCharIndex) {
                                    const newChar = currentText[currentIndex];
                                    playTypewriterSE(newChar, SE4_1);
                                    lastCharIndex = currentIndex;
                                }
                            }
                        };
                    }

                const sequences = [
                    createTextSequenceLocal("你以为一阵白光闪过后会看见什么景象，却没想到黑暗接踵而至。"),
                    createTextSequenceLocal("在突然的黑暗中原地不动才是上策。一小段时间后，你的眼睛适应了黑暗，看见了一辆「列车」……"),
                    createTextSequenceLocal("啊，不，这并不是一辆列车，只是一个列车的「模型」而已，不然你怎么可能近距离直接看到列车的全貌呢？"),
                    createTextSequenceLocal("你有些疑惑，不明白这个模型到底是出现在了你眼前，还是一开始就在这片黑暗中，总之，你决定调查一下这个模型。"),
                    createTextSequenceLocal("<br>(点击调查模型)")
                ];

                let currentIndex = 0;
                let isTransitioning = false; // 避免在过渡期间重复点击

                function handleClick() {
                    if (isTransitioning) return;

                    if (currentIndex >= sequences.length) {
                        document.removeEventListener('click', handleClick);
                        introComplete = true;
                        gsap.to("#checking", {
                            scaleY: 1,
                            duration: 0.5,
                            onComplete: () => {
                                // 在检查界面显示完成后调用 checkingOver
                                checkingOver();
                            }
                        });
                        return;
                    }

                    if (currentIndex === 2) {
                        // 第一段文本结束后，先显示 ss1008
                        isTransitioning = true;
                        stage = 4 ;
                        gsap.to("#ss1008", {
                            opacity: 1,
                            duration: 1,
                            onComplete: () => {
                                // ss1008 显示完成后显示第二段文本
                                isTransitioning = false;
                                gsap.set("#checkingText", { text: "" });
                                currentTween = gsap.to("#checkingText", sequences[currentIndex]);
                                currentIndex++;
                            }
                        });
                    } else {
                        gsap.set("#checkingText", { text: "" });
                        currentTween = gsap.to("#checkingText", sequences[currentIndex]);
                        currentIndex++;
                    }
                }

                // 显示第一段文本
                currentTween = gsap.to("#checkingText", sequences[0]);
                currentIndex++;

                // 添加点击事件监听
                document.addEventListener('click', handleClick);
            }

            // 修改原有的延迟调用部分
            gsap.delayedCall(0.5, () => {
                startIntroSequence();
            });

        }
    })
})


function createTextSequence(text, duration = null) {
    let lastCharIndex = -1;
    // 如果未指定时长，则按每字符 0.08秒 计算，实现真正的匀速
    const finalDuration = duration || (text.length * 0.1);
    return {
        text: text,
        duration: finalDuration,
        ease: "none",
        onStart: function() { lastCharIndex = -1; }, // 重置索引
        onUpdate: function() {
            const currentText = this.targets()[0].innerText || this.targets()[0].textContent;
            const currentIndex = currentText.length - 1;
            if (currentIndex > lastCharIndex) {
                const newChar = currentText[currentIndex];
                playTypewriterSE(newChar, SE4_1);
                lastCharIndex = currentIndex;
            }
        }
    };
}

function checkingOver() {
    gsap.set("#checkingText", {
        text: ""
    })
    checkWin = false;
    checkEl = false;
    checkTl = false;
    checkNum = false;
    gsap.to(["#windows", "#Tlogo", "#Number"], {
        scaleY: 0,
        duration: 0.5,
        ease: "power1.inOut",
        onComplete: () => {
            gsap.set([CwElement, CeElement, CTLElement, CnElement], { pointerEvents: 'auto' })


        }
    })
    if (Know1 >= 1 && Know2 >= 1 && Know3 >= 1 && Know4 >= 1) {
        currentTween = gsap.to("#checkingText", createTextSequence("到提问时间了！答对了就可以离开这里哦！"));
        currentTween.vars.onComplete = () => {
            document.addEventListener("click", () => {
                gsap.set(["#A1", "#A2", "#A3"], {
                    pointerEvents: 'none',
                    x: 0,
                })
                gsap.set("#checkingText", {
                    text: ""
                })
                currentTween = gsap.to("#checkingText", createTextSequence("那么，这个模型的原型车的车号是？"));
                currentTween.vars.onComplete = () => {
                    gsap.set(["#A1", "#A2", "#A3"], { pointerEvents: 'auto' })
                };

                gsap.to(["#A1", "#A2", "#A3"], {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power1.inOut",
                })
            }, { once: true });
        };
    }
}

function checkWindows() {
    
    gsap.set("#windows", {
        x: 0,
    })
    gsap.to("#windows", {
        scaleY: 1,
        duration: 0.5,
    })
}

function checkTLogo() {
    
    gsap.set("#Tlogo", {
        x: 0,
    })
    gsap.to("#Tlogo", {
        scaleY: 1,
        duration: 0.5,


    })
}

function checkNumber() {
    
    gsap.set("#Number", {
        x: 0
    })
    gsap.to("#Number", {
        scaleY: 1,
        duration: 0.5,
    })
}

function checkText() {
    gsap.set([CwElement, CeElement, CTLElement, CnElement], { pointerEvents: 'none' });
    
    if (checkWin === true) {
        Know1++;
        currentTween = gsap.to("#checkingText", createTextSequence("嗯，有很普通的窗户，还有……"));
        currentTween.vars.onComplete = () => {
            // 使用命名函数便于移除
            function firstClickHandler() {
                gsap.set("#checkingText", {
                    text: ""
                })
                checkWindows();
                currentTween = gsap.to("#checkingText", createTextSequence("很多百叶窗，比正常的玻璃窗户多得多。<br>应该是做成了百叶窗样式的通风口。"));
                currentTween.vars.onComplete = () => {
                    // 使用命名函数便于移除
                    function secondClickHandler() {
                        document.removeEventListener("click", secondClickHandler);
                        checkingOver();
                    }
                    document.addEventListener("click", secondClickHandler, { once: true });
                }
                // 移除第一个点击事件监听器
                document.removeEventListener("click", firstClickHandler);
            }
            // 添加第一个点击事件监听器
            document.addEventListener("click", firstClickHandler, { once: true });
        }
    }
    if (checkEl === true) {
        Know2++;
        currentTween = gsap.to("#checkingText", createTextSequence("模型顶部似乎分布着受电弓，看来这个模型的原型车是以电为动力的「电力机车」。"));
        currentTween.vars.onComplete = () => {
            document.addEventListener("click", () => {
                checkingOver();
            }, { once: true });
        }
    }
    if (checkTl === true) {
        Know3++;
        Know4++;
        currentTween = gsap.to("#checkingText", createTextSequence("窗户……车灯……"));
        currentTween.vars.onComplete = () => {
            function firstTlClickHandler() {
                gsap.set("#checkingText", {
                    text: ""
                })
                checkTLogo();
                currentTween = gsap.to("#checkingText", createTextSequence("噢，这是中国铁路路徽，<br>不过你也没怀疑过这不是国产车，毕竟它看着就是绿皮火车那类的。"));
                currentTween.vars.onComplete = () => {
                    function secondTlClickHandler() {
                        gsap.set("#checkingText", {
                            text: ""
                        })
                        gsap.to("#Tlogo", {
                            scaleY: 0,
                            duration: 0.5,
                            ease: "power1.inOut",
                            onComplete: () => {
                                checkNumber();
                                currentTween = gsap.to("#checkingText", createTextSequence("「韶山1008」，车的正面不会缺少车号。"));
                                currentTween.vars.onComplete = () => {
                                    function finalTlClickHandler() {
                                        document.removeEventListener("click", finalTlClickHandler);
                                        checkingOver();
                                    }
                                    document.addEventListener("click", finalTlClickHandler, { once: true });
                                }
                            }
                        })
                        document.removeEventListener("click", secondTlClickHandler);
                    }
                    document.addEventListener("click", secondTlClickHandler, { once: true });
                }
                document.removeEventListener("click", firstTlClickHandler);
            }
            document.addEventListener("click", firstTlClickHandler, { once: true });
        }
    }
    if (checkNum === true) {
        Know3++;
        checkNumber();
        currentTween = gsap.to("#checkingText", createTextSequence("模型的侧面有个红色的小牌子，上面写着韶山1008，应该是原型车的车号。"));
        currentTween.vars.onComplete = () => {
            document.addEventListener("click", () => {
                checkingOver();
            }, { once: true });
        }
    }
    if (CA1 === true) {
        CA1 = false;
        gsap.set("#checkingText", {
            text: "",
        })
        currentTween = gsap.to("#checkingText", createTextSequence("那是早期型号啦！"));
        currentTween.vars.onComplete = () => {
            document.addEventListener('click', () => {

                gsap.set("#checkingText", {
                    text: ""
                })
            })
        }
    }
    if (CA3 === true) {
        gsap.set("#checkingText", {
            text: "",
        })
        CA3 = false;
        currentTween = gsap.to("#checkingText", createTextSequence("模型不会在这里的型号！"));
        currentTween.vars.onComplete = () => {
            document.addEventListener('click', () => {

                gsap.set("#checkingText", {
                    text: ""
                })
            })
        }
    }
}

function CA2choose() {
    gsap.set([CwElement, CeElement, CTLElement, CnElement], { pointerEvents: 'none' })
    gsap.set("#checkingText", {
        text: ""
    }
    )
    gsap.to(["#A1", "#A2", "#A3",], {
        scaleY: 0,
        duration: 0.5,
        ease: "power1.inOut",
    })
    currentTween = gsap.to("#checkingText", createTextSequence("韶山1型电力机车<br>原称6Y1型电力机车，经过技术改进后更名为韶山1型，从编号008开始。<br>是中国铁路的第一代国产客、货两用干线电力机车，也是现在绿皮火车的原型。<br>(点击可离开）"));
    currentTween.vars.onComplete = () => {
        document.addEventListener('click', () => {
                // 离开 stage4 时移除捕获监听器
                document.removeEventListener('click', textCompleter, true);
                document.removeEventListener('click', createClickEffect);
                gsap.set("#so4", {
                    x: 0
                })
                gsap.to("#so4", {
                    opacity: 1,
                    duration: 1.5,
                    ease: "power2.inOut",
                    onComplete:()=>{
                        stage = 5;
                        stage5()
                    }
                })
            }, { once: true })
        }
}

CwElement.addEventListener("click", () => {
    SE4_2.play();
    checkWin = true;
    checkText();
})
CeElement.addEventListener("click", () => {
    checkEl = true;
    SE4_2.play();
    checkText();
})
CTLElement.addEventListener("click", () => {
    SE4_2.play();
    checkTl = true;
    checkText();
})
CnElement.addEventListener("click", () => {
    SE4_2.play();
    checkNum = true;
    checkText();
})
A1Element.addEventListener("click", () => {
    
    CA1 = true;
    checkText();
})
A2Element.addEventListener("click", () => {
    SE4_2.play();
    CA2choose();

})
A3Element.addEventListener("click", () => {
    CA3 = true;
    checkText();
})
    }