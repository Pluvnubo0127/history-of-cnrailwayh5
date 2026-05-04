function stage2(){
        stage = 2;
gsap.set("#page2", {
    x: 0,
})
gsap.to("#page2", {
            opacity: 1,
        })

const fightElement = document.querySelector("#fight");
const actElement = document.querySelector("#act");
const runElement = document.querySelector("#run");

//初始化 stage2 音效
Stage2SE(fightElement, actElement, runElement);
let haveAct = 0;
let haveFight = 0;
let haveRun = 0;
let SPact = false;
let canClick = false;
gsap.set("#yama3", {
    opacity: 0,
})

gsap.set(["#souku", "#action", "#fight", "#act", "#run"], {
    scaleY: 0,

})
gsap.delayedCall(0.5, () => {
    gsap.to("#souku", {
        scaleY: 1,
        duration: 0.5,
        ease: "power1.inOut",
    })
    
})
gsap.delayedCall(1, () => {
    SE2_3.play();
    gsap.to("#soukutext", {
        text: "*遭遇了「群山」！",
        duration: 0.8,
        ease: "power1.inOut",
        onComplete: () => {
            canClick = true;
            document.addEventListener('click', actionstart, { once: true });
        }
    })

})

function actionstart() {
    if (!canClick) return;
    canClick = false;
    gsap.set([fightElement, actElement, runElement], { pointerEvents: 'none' })
    gsap.to("#soukutext", {
        scaleY: 0,
        duration: 0.1,
        transformOrigin: "50% 50%",
        ease: "power1.inOut",
        onComplete: () => {
            gsap.set("#soukutext", {
                text: "",
            })
        }
    })

    gsap.delayedCall(0.2, () => {
        gsap.to("#souku", {
            scaleY: 0,
            duration: 0.5,
            transformOrigin: "50% 50%",
            ease: "power1.inOut",
        })

    })
    gsap.delayedCall(0.2, () => {
        gsap.set("#actionText", {
            scaleY: 1,
        })
        gsap.to(["#action", "#fight", "#act", "#run"], {
            scaleY: 1,
            duration: 0.5,
            ease: "power1.inOut",
            onComplete: () => {

                ActionStarting();
            }
        })
    })

}
function ActionStarting(){
    gsap.to("#actionText", {
                    text: "*要怎么做？",
                    duration: 1,
                    ease: "power1.inOut",
                    onComplete: () => {
                        let elementsToEnable = [fightElement, actElement];
                        if (haveRun === 0) {
                            elementsToEnable.push(runElement);
                        }
                        gsap.set(elementsToEnable, { pointerEvents: 'auto' })
                    }
                })
}
function otherAction() {

    gsap.to("#soukutext", {
        scaleY: 0,
        duration: 0.1,
        transformOrigin: "50% 50%",
        ease: "power1.inOut",
        onComplete: () => {

            gsap.set("#soukutext", {
                text: "",
            })
        }
    })

    gsap.delayedCall(0.2, () => {
        gsap.to("#souku", {
            scaleY: 0,
            duration: 0.5,
            transformOrigin: "50% 50%",
            ease: "power1.inOut",
        })
    })
    gsap.delayedCall(0.2, () => {
        gsap.set([fightElement, actElement, runElement], { pointerEvents: 'none' })
        gsap.to(["#souku", "#soukutext"], {
            scaleY: 1,
            duration: 0.5,
            ease: "power1.inOut",
        })
        gsap.set("#soukutext", {
            text: " "
        })
        gsap.to("#soukutext", {
            text: "*想到了「别的方法」！<br>要执行的「行动」改变了！",
            duration: 2,
            onComplete: () => {

                SPact = true;
                gsap.delayedCall(0.5, () => {
                    gsap.to("#soukutext", {
                        scaleY: 0,
                        duration: 0.1,
                        transformOrigin: "50% 50%",
                        ease: "power1.inOut",
                        onComplete: () => {
                            gsap.set("#soukutext", {
                                text: "",
                            })
                        }
                    })

                    gsap.delayedCall(0.1, () => {
                        gsap.to("#souku", {
                            scaleY: 0,
                            duration: 0.2,
                            transformOrigin: "50% 50%",
                            ease: "power1.inOut",
                            onComplete: () => {
                                let elementsToEnable = [fightElement, actElement];
                                if (haveRun === 0) {
                                    elementsToEnable.push(runElement);
                                }
                                gsap.set(elementsToEnable, { pointerEvents: 'auto' })
                                gsap.set("#actionText", {
            scaleY: 1,
        })
        gsap.to(["#action", "#fight", "#act", "#run"], {
            scaleY: 1,
            duration: 0.5,
            ease: "power1.inOut",
            onComplete: () => {

                ActionStarting();
            }
        })
                            }
                        })
                    })

                })

            }
        })


    })

}

// 修改检查函数
function checkAllActions() {
    if (haveAct === 1 && haveFight === 1 && haveRun === 1) {
        canClick = true;
        // 添加一次性点击事件监听器
        document.addEventListener('click', () => {
            canClick = false;
            otherAction();
            // 延迟 1 秒后添加 actionstart 事件监听器
            gsap.delayedCall(1, () => {
                document.addEventListener('click', actionstart, { once: true });
            });
        }, { once: true });
        return true;
    }
    return false;
}

// 修改 fightElement 监听器中的相关部分
fightElement.addEventListener('click', () => {
    gsap.set(["#action", "#fight", "#act", "#run", "#actionText"], {
        scaleY: 0,
    });
    gsap.set(["#soukutext", "#actionText"], {
        text: "",
    })
    gsap.to(["#souku", "#soukutext"], {
        scaleY: 1,
        duration: 0.5,
        ease: "power1.inOut",
    })
    gsap.to("#soukutext", {
        text: "*选择了「正面战斗」，直接在山上修铁路！",
        duration: 1.5,
        ease: "power1.inOut",
        onComplete: () => {
            haveFight = 1; // 修改为 haveFight
            document.addEventListener('click', () => {
                gsap.set("#soukutext", {
                    text: "",
                })
                gsap.to("#soukutext", {
                    text: "*但是「山」太「峭」了！即便修了路，「车」也无法前进！",
                    duration: 3,
                    onComplete: () => {

                        if (!checkAllActions()) {
                            canClick = true;// 如果不是全部完成，则添加 actionstart 监听器
                            document.addEventListener('click', actionstart, { once: true });
                        }
                    }
                })

            }, { once: true })

        }
    })
})

// 修改 actElement 监听器中的相关部分
actElement.addEventListener('click', () => {
    if (!SPact) {
        gsap.set(["#action", "#fight", "#act", "#run", "#actionText"], {
            scaleY: 0,
        });
        gsap.set(["#soukutext", "#actionText"], {
            text: "",
        })
        gsap.to(["#souku", "#soukutext"], {
            scaleY: 1,
            duration: 0.5,
            ease: "power1.inOut",
        })
        gsap.to("#soukutext", {
            text: "*选择了「其他行动」，试着挖隧道修路！",
            duration: 1.5,
            ease: "power1.inOut",
            onComplete: () => {
                haveAct = 1;
                document.addEventListener('click', () => {
                    gsap.set("#soukutext", {
                        text: "",
                    })
                    gsap.to("#soukutext", {
                        text: "*但是「时间」和「预算」都不够！无法使用「挖隧道」！",
                        duration: 3,
                        onComplete: () => {
                            canClick = true;
                            if (!checkAllActions()) {
                                document.addEventListener('click', actionstart, { once: true });
                            }
                        }
                    })

                }, { once: true })

            }
        })
    }
    else {
        gsap.set(["#action", "#fight", "#act", "#run", "#actionText"], {
            scaleY: 0,
        });
        gsap.set(["#soukutext", "#actionText"], {
            text: "",
        })
        gsap.to(["#souku", "#soukutext"], {
            scaleY: 1,
            duration: 0.5,
            ease: "power1.inOut",
        })
        gsap.delayedCall(0.5, () => {
            gsap.to("#soukutext", {
                text: "*找到了适合的地形！",
                duration: 1.5,
            })
        })
        gsap.delayedCall(2, () => {
            gsap.to("#soukutext", {
                scaleY: 0,
                duration: 0.5,
                transformOrigin: "50% 50%",
                ease: "power1.inOut",
                onComplete: () => {
                    gsap.delayedCall(0.2, () => {
                        gsap.set("#soukutext", {
                            text: "",
                        })
                        gsap.to("#souku", {
                            scaleY: 0,
                            duration: 0.5,
                            transformOrigin: "50% 50%",
                            ease: "power1.inOut",
                            onComplete: () => {
                                gsap.to(["#yama1", "#yama2", "#yama3"], {
                                    x: -220,
                                    duration: 4,
                                    onComplete: () => {
                                        gsap.to(["#souku", "#soukutext"], {
                                            scaleY: 1,
                                            duration: 0.5,
                                            ease: "power1.inOut",
                                        })
                                        gsap.delayedCall(0.5, () => {
                                            gsap.to("#soukutext", {
                                                text: "*在「群山」中较为平缓的沟壑中修建了「人字形」铁路！",
                                                duration: 2,
                                            })
                                            gsap.delayedCall(2.5, () => {
                                                gsap.to("#soukutext", {
                                                    scaleY: 0,
                                                    duration: 0.3,
                                                    transformOrigin: "50% 50%",
                                                    ease: "power1.inOut",
                                                    onComplete: () => {
                                                        gsap.delayedCall(2, () => {
                                                            gsap.set("#soukutext", {
                                                                text: "",
                                                                scale: 1,
                                                            }
                                                            )

                                                        })

                                                        gsap.delayedCall(0.3, () => {
                                                            gsap.to("#souku", {
                                                                scaleY: 0,
                                                                duration: 0.3,
                                                                transformOrigin: "50% 50%",
                                                                ease: "power1.inOut",
                                                                onComplete: () => {
                                                                    gsap.to("#yama3", {
                                                                        opacity: 1,
                                                                        duration: 3,
                                                                        onComplete: () => {
                                                                            gsap.to("#souku", {
                                                                                scaleY: 0,
                                                                                duration: 0.5,
                                                                                ease: "power1.inOut",
                                                                                oncomplete: () => {

                                                                                    gsap.set("#soukutext", {
                                                                                        scale: 1,
                                                                                        text: ""
                                                                                    })
                                                                                    gsap.delayedCall(0.5, () => {
                                                                                        gsap.to("#soukutext", {
                                                                                            text: "京张铁路<br>中国人自行设计和施工的第一条铁路干线<br>通过设计人字形的铁路，解决了山多、坡度大的问题,<br>节约了工期和打通隧道的成本。<br>--点击继续--",
                                                                                            duration: 4,
                                                                                            onComplete: () => {
                                                                                                document.addEventListener('click',function handler() {
                                                                                                document.removeEventListener('click', handler);
                                                                                                gsap.set("#so2", {
                                                                                                    x: 0,
                                                                                                })                                                                                                    
                                                                                                    gsap.to("#so2",{
                                                                                                        opacity:1,
                                                                                                        duration:1.5,
                                                                                                        ease: "power2.inOut",
                                                                                                        onComplete:()=>{
                                                                                                            
                                                                                                            stage2_5();

                                                                                                        }
                                                                                                    })
                                                                                                
                                                                                                })
                                                                                                

                                                                                            }

                                                                                        })
                                                                                    })

                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        })

                                                    }
                                                })
                                            })

                                        })


                                    }
                                })
                            }
                        })

                    })
                }
            })



        })

    }
})

// 修改 runElement 监听器中的相关部分
runElement.addEventListener('click', () => {
    gsap.set(["#action", "#fight", "#act", "#run", "#actionText"], {
        scaleY: 0,
    });
    gsap.set(["#soukutext", "#actionText"], {
        text: "",
    })
    gsap.to(["#souku", "#soukutext"], {
        scaleY: 1,
        duration: 0.5,
        ease: "power1.inOut",
    })
    gsap.to("#soukutext", {
        text: "*选择了「逃跑」，这班我不上了！",
        duration: 1,
        ease: "power1.inOut",
        onComplete: () => {

            document.addEventListener('click', () => {
                gsap.set("#soukutext", {
                    text: "",
                })
                gsap.to("#soukutext", {
                    text: "*身边传来了「声音」！<br>「逃不掉的啊老大！」",
                    duration: 2.5,
                    onComplete: () => {
                        haveRun = 1;
                        document.addEventListener('click', () => {
                            gsap.set("#soukutext", {
                                text: "",
                            })
                            gsap.to("#soukutext", {
                                text: "*「逃跑」被「禁用」了！",
                                duration: 2,
                                onComplete: () => {
                                    if (!checkAllActions()) {
                                        canClick = true;
                                        document.addEventListener('click', actionstart, { once: true });
                                    }
                                }
                            })
                        }, { once: true })
                    }
                })

            }, { once: true })
        }
    })

})



    }