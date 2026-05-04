window.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined') {
        console.log('GSAP 已成功加载');
    }


// 初始化元素
    gsap.set(["#page2","#page2_5", "#page3","#page4","#page5","#Ending"], {
        opacity: 0,
        x: -700,
    })

//封面及第一幕
    function stage1(){
    
    gsap.set([whiteElement, sora1Element, cloudElement, kumoElement, kumo1Element, DHKElement, st1Element, tip1Element, tip2Element, countElement, so1Element], {
        opacity: 0
    });
    gsap.set([so1Element, "#so2"], {
        x: -700,
        opacity: 0,
    });

    gsap.set(DHK1Element, {
        opacity: 0,
    });
    gsap.set(tElement, {
        opacity: 0,
        y: 100
    });
    gsap.set([cxElement], {
        opacity: 0,
        x: 200 // 从右侧屏幕外开始
    });
    gsap.set(cx2Element, {
        opacity: 0,
        x: 200
    });
    gsap.set(cx1Element, {
        opacity: 0 // 初始隐藏，不移动
    });
    gsap.set(cx3Element, {
        opacity: 0,
        x: 100
    });
    gsap.set([EKIElement, stElement, st1Element], {
        x: -700
    })
        document.addEventListener('click', function handler() {
        if (!window.loadOver) return; // 如果加载未完成，则不触发
        document.removeEventListener('click', handler); // 防止重复触发
        stage = 1;
        

        // white 元素渐显
        gsap.to(whiteElement, {
            opacity: 1,
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
                // sora1 渐显
                gsap.to([sora1Element, cloudElement, kumoElement, kumo1Element], {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.inOut",
                    onComplete: () => {
                        // T 元素上移并渐显
                        gsap.to(tElement, {
                            opacity: 1,
                            y: 0,
                            duration: 1.2,
                            ease: "power2.out",
                            onComplete: () => {
                                let animationCount = 0;
                                let count = 0;
                                const maxCount = 4;
                                counterElement.textContent = `${count}/${maxCount}`;

                                function playAnimation() {
                                    gsap.set(cxElement, { pointerEvents: 'none' });
                                    // T动画完成后，cx 从右侧滑入
                                    gsap.to(countElement, {
                                        opacity: 1,
                                        duration: 0.5,
                                    })
                                    gsap.to(cxElement, {
                                        opacity: 1,
                                        x: 0,
                                        duration: 2,
                                        ease: "power3.out",
                                        onComplete: () => {
                                            // 动画完成后再允许点击
                                            gsap.set(cxElement, { pointerEvents: 'auto' });
                                            gsap.to(tip1Element, {
                                                opacity: 1,
                                                duration: 0.5,
                                            })
                                        }
                                    });


                                    cxElement.addEventListener('click', function handler() {
                                        if (count < 4) {
                                            count++;
                                            SE1_2.play();
                                        };
                                        counterElement.textContent = `${count}/${maxCount}`;
                                        cxElement.removeEventListener('click', handler);
                                        gsap.set(tip1Element, {
                                            opacity: 0,
                                            x: -700,
                                        })

                                        gsap.set(cx1Element, {
                                            x: 0,
                                        });
                                        gsap.to(cx1Element, {
                                            opacity: 1,
                                            duration: 0.5,
                                            ease: "power2.inOut"
                                        });
                                        gsap.delayedCall(0.5, () => {
                                            gsap.set(cxElement, {
                                                opacity: 0,
                                                x: 600,
                                            });
                                            gsap.delayedCall(0.5, () => {
                                                gsap.to(cx1Element, {
                                                    opacity: 0,
                                                    x: -210,
                                                    duration: 1,
                                                    ease: "power3.out",
                                                    onComplete: () => {

                                                        animationCount++;
                                                        if (animationCount < 3) {
                                                            playAnimation();
                                                        } else {
                                                            gsap.set(cx2Element, { pointerEvents: 'none' });
                                                            // 开始第二组动画
                                                            gsap.to(cx2Element, {
                                                                opacity: 1,
                                                                x: 0,
                                                                duration: 2,
                                                                ease: "power3.out",
                                                                onComplete: () => {

                                                                    gsap.set(cx2Element, { pointerEvents: 'auto' });
                                                                }
                                                            });

                                                            cx2Element.addEventListener('click', function () {
                                                                if (count < 4) {
                                                                    count++;
                                                                    SE1_2.play();
                                                                };
                                                                counterElement.textContent = `${count}/${maxCount}`;

                                                                gsap.set(cx3Element, {
                                                                    x: 0,
                                                                });
                                                                gsap.to(cx3Element, {
                                                                    opacity: 1,
                                                                    duration: 0.5,
                                                                    ease: "power2.inOut"
                                                                });
                                                                gsap.delayedCall(0.5, () => {
                                                                    gsap.set(cx2Element, {
                                                                        opacity: 0,
                                                                        x: 400,
                                                                    });
                                                                    gsap.delayedCall(0.5, () => {
                                                                        gsap.to(cx3Element, {
                                                                            opacity: 0,
                                                                            x: -210,
                                                                            duration: 1,
                                                                            ease: "power3.out",
                                                                            onComplete: () => {
                                                                                
                                                                                gsap.to(countElement, {
                                                                                    opacity: 0,
                                                                                    duration: 0.5,
                                                                                })
                                                                                // DHK 渐显 -> 停留 -> 渐隐
                                                                                gsap.to(DHKElement, {
                                                                                    opacity: 1,
                                                                                    duration: 0.3,
                                                                                    ease: "power2.inOut",
                                                                                    onComplete: () => {
                                                                                        gsap.to(DHKElement, {
                                                                                            opacity: 0,
                                                                                            duration: 0.5,
                                                                                            display: "none",
                                                                                            delay: 1,
                                                                                            ease: "power2.inOut"
                                                                                        });

                                                                                        gsap.delayedCall(1, () => {
                                                                                            gsap.to(kumoElement, {
                                                                                                x: 210,
                                                                                                duration: 6,
                                                                                                ease: "power2.out",
                                                                                            })
                                                                                            gsap.delayedCall(0.5, () => {
                                                                                                gsap.to(kumo1Element, {
                                                                                                    x: 150,
                                                                                                    duration: 4,
                                                                                                    ease: "power2.out",
                                                                                                })
                                                                                            })
                                                                                            gsap.set(stElement, { pointerEvents: 'none' });
                                                                                            gsap.to([EKIElement, stElement], {
                                                                                                x: 0,
                                                                                                duration: 7,
                                                                                                ease: "power2.out",
                                                                                                onComplete: () => {
                                                                                                    gsap.to(tip2Element, { opacity: 1 });
                                                                                                    gsap.set(stElement, { pointerEvents: 'auto' });
                                                                                                }

                                                                                            })
                                                                                        })

                                                                                    }
                                                                                });
                                                                            }
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        }
                                                    }
                                                });
                                            })
                                        })
                                    });
                                }

                                playAnimation();
                            }
                        });

                        // DHK1 渐显 -> 停留 -> 渐隐
                        gsap.to(DHK1Element, {
                            opacity: 1,
                            duration: 0.3,
                            ease: "power2.inOut",
                            onComplete: () => {
                                gsap.to(DHK1Element, {
                                    opacity: 0,
                                    duration: 0.1,
                                    delay: 1,
                                    display:"none",
                                    ease: "power2.inOut"
                                });
                            }
                        });
                        stElement.addEventListener('click', function handler() {
                            SE1_1.play();
                            stElement.removeEventListener('click', handler);
                            gsap.to(tip2Element, { opacity: 0 });
                            gsap.set(st1Element, {
                                x: 0,
                                pointerEvents: 'none',
                            });
                            gsap.to(st1Element, {
                                opacity: 1,
                                duration: 0.5,

                            })
                                ;
                            gsap.delayedCall(0.5, () => {
                                gsap.set(stElement, {
                                    opacity: 0,
                                    x: -700,
                                });
                                gsap.to(st1Element, {
                                    x: -700,
                                    duration: 7,
                                });
                                
                                gsap.delayedCall(1.3, () => {
                                    gsap.delayedCall(1, () => {
                                        gsap.to("#tangxu", {
                                            text: "唐胥铁路",
                                            duration: 1,
                                            ease: "none",
                                            onComplete: () => {
                                                gsap.to("#tx", {
                                                    text: "唐山站←---→胥各庄站<br>1881年，中国第一条自主修建的铁路，<br>线路以运输煤炭为主。<br><br>--点击继续--",
                                                    duration: 3,
                                                    ease: "none",
                                                    onComplete: () => {
                                                        gsap.set(so1Element, {
                                                            x: 0,
                                                        })
                                                        document.addEventListener('click', function handler() {
                                                            document.removeEventListener('click', handler);

                                                            gsap.to(so1Element, {
                                                                opacity: 1,
                                                                duration: 1.5,
                                                                ease: "power2.inOut",
                                                                onComplete:()=>{
                                                                    stage = 2;
                                                                    stage2();
                                                                }


                                                            })
                                                        })

                                                    }
                                                })
                                            }
                                        })

                                    })
                                })


                            })

                        });

                    }
                });
            }
        });
    });
    }
    




    stage1();


});


