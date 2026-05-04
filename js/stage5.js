function stage5(){
const pencil = document.getElementById("Pencil");
const CRH1= document.getElementById("CRH1");
let animalStart = 0;

stage = 5 ;
let isDrawing = false; // 添加绘制状态标志
gsap.set("#page5",{
    x:0,
})
gsap.to("#page5",{
    opacity:1,
    duration:1,
})
gsap.set("#blackCRH", { drawSVG: "0%" });
gsap.set(["#drawed","#so5"],{

  x:-700,

})

gsap.set(["#CRH2","#city","#citybc","#eleB","#bridge","#eleA","#so5"],{

  opacity:0

})
gsap.set("#CRHmessage",{
    text:""
})
gsap.set("#CRHt",{
    scaleY:0,
})

function pencilmove() {
    Draggable.create(pencil, {
        type: "x,y",
        // 添加触摸事件支持
        allowContextMenu: true,
        onDrag: function(e) {
            updatePosition(e);
        },
        onDragStart: function(e) {
            updatePosition(e);
        },
        onDragEnd: function(e) {
            updatePosition(e);
        }
    });

    function updatePosition(e) {
        const pt = svg.createSVGPoint();
        
        // 判断事件类型并获取相应的坐标
        if (e.type.startsWith('touch')) {
            // 触摸事件
            const touch = e.touches ? e.touches[0] : e.changedTouches[0];
            pt.x = touch.clientX;
            pt.y = touch.clientY;
        } else {
            // 鼠标事件
            pt.x = e.clientX;
            pt.y = e.clientY;
        }

        const cursorPt = pt.matrixTransform(svg.getScreenCTM().inverse());

        gsap.to(pencil, {
            duration: 0,
            ease: "power1.out",
            attr: {
                transform: `translate(${cursorPt.x - 440}, ${cursorPt.y - 147})`
            }
        });
    }

    // 添加事件监听器
    svg.addEventListener('mousemove', updatePosition);
    svg.addEventListener('touchmove', updatePosition, { passive: false });
    svg.addEventListener('touchstart', updatePosition, { passive: false });
    svg.addEventListener('touchend', updatePosition, { passive: false });

    // 阻止默认的触摸行为（如滚动）
    svg.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });
}



// 扩展 scrollConfig
const scrollConfig = {
    eleA: {
        duration: 5,
        speed: 1
    },
    eleB: {
        duration: 7,
        speed: 1
    },
    bridge: {
        duration: 3,
        speed: 1
    },
    city1: {
        duration: 30,  // 最慢
        speed: 1
    },
    city2: {
        duration: 20,
        speed: 1
    },
    city3: {
        duration: 15,
        speed: 1
    },
    city4: {
        duration: 13,  // 比 eleA 稍慢
        speed: 1
    }
};

// 修改 createInfiniteScroll 函数以支持速度控制
function createInfiniteScroll(elementId, duration = 15, insertBeforeRef = null, overlap = 0) {
    const originalEle = document.querySelector(`#${elementId}`);
    if (!originalEle) return;
    
    const cloneEle = originalEle.cloneNode(true);
    cloneEle.id = `${elementId}-clone`;
    
    // 根据元素ID设置不同的插入逻辑
    switch(elementId) {
        case 'city1':
            // city1克隆插入到city2前
            const city2 = document.querySelector('#city2');
            if (city2) {
                city2.parentNode.insertBefore(cloneEle, city2);
            }
            break;
        case 'city2':
            // city2克隆插入到city3前
            const city3 = document.querySelector('#city3');
            if (city3) {
                city3.parentNode.insertBefore(cloneEle, city3);
            }
            break;
        case 'city3':
            // city3克隆插入到city4前
            const city4 = document.querySelector('#city4');
            if (city4) {
                city4.parentNode.insertBefore(cloneEle, city4);
            }
            break;
        case 'city4':
            // city4克隆添加到末尾
            originalEle.parentNode.appendChild(cloneEle);
            break;
        case 'bridge':
            // 保持bridge的特殊处理
            const eleA = document.querySelector('#eleA');
            if (eleA) {
                eleA.parentNode.insertBefore(cloneEle, eleA);
            }
            break;
        default:
            // 其他元素使用默认的插入逻辑
            if (insertBeforeRef) {
                const referenceEle = document.querySelector(insertBeforeRef);
                referenceEle.parentNode.insertBefore(cloneEle, referenceEle);
            } else {
                originalEle.parentNode.appendChild(cloneEle);
            }
    }

    // 根据是否需要重叠来设置克隆元素的初始位置
    gsap.set(cloneEle, {
        x: `${100 - overlap}%`
    });

    const tl = gsap.timeline({
        repeat: -1,
        defaults: {
            ease: "none",
            duration: duration
        }
    });

    // 创建动画并返回时间轴实例
    tl.to([originalEle, cloneEle], {
        x: `-=${100 - overlap}%`,
        duration: duration / scrollConfig[elementId].speed
    })
    .call(() => {
        gsap.set([originalEle, cloneEle], {
            x: function(i) {
                return i * (100 - overlap) + "%";
            }
        });
    });

    return tl;
}

// 添加控制速度的函数
function setScrollSpeed(elementId, speed) {
    if (scrollConfig[elementId]) {
        scrollConfig[elementId].speed = speed;
        // 获取当前时间轴实例并更新速度
        const timeline = scrollTimelines[elementId];
        if (timeline) {
            timeline.timeScale(speed);
        }
    }
}

// 存储时间轴实例的对象
const scrollTimelines = {};

// 修改滚动函数以存储时间轴实例
function scrollBridge() {
    const onePixelPercent = (1 / 576) * 100;
    scrollTimelines.bridge = createInfiniteScroll('bridge', scrollConfig.bridge.duration, null, onePixelPercent);
    return scrollTimelines.bridge;
}

function scrollEleA() {
    const onePixelPercent = (1 / 576) * 100;
    scrollTimelines.eleA = createInfiniteScroll('eleA', scrollConfig.eleA.duration, null, onePixelPercent);
    return scrollTimelines.eleA;
}

function scrollEleB() {
    const onePixelPercent = (1 / 576) * 100;
    scrollTimelines.eleB = createInfiniteScroll('eleB', scrollConfig.eleB.duration, '#CRH2', onePixelPercent);
    return scrollTimelines.eleB;
}

// bridge 保持不变
function scrollBridge() {
    const onePixelPercent = (1 / 576) * 100;
    return createInfiniteScroll('bridge', 25, null, onePixelPercent);
}
function scrollCity1() {
    const onePixelPercent = (1 / 576) * 100;
    scrollTimelines.city1 = createInfiniteScroll('city1', scrollConfig.city1.duration, null, onePixelPercent);
    return scrollTimelines.city1;
}

function scrollCity2() {
    const onePixelPercent = (1 / 576) * 100;
    scrollTimelines.city2 = createInfiniteScroll('city2', scrollConfig.city2.duration, null, onePixelPercent);
    return scrollTimelines.city2;
}

function scrollCity3() {
    const onePixelPercent = (1 / 576) * 100;
    scrollTimelines.city3 = createInfiniteScroll('city3', scrollConfig.city3.duration, null, onePixelPercent);
    return scrollTimelines.city3;
}

function scrollCity4() {
    const onePixelPercent = (1 / 576) * 100;
    scrollTimelines.city4 = createInfiniteScroll('city4', scrollConfig.city4.duration, null, onePixelPercent);
    return scrollTimelines.city4;
}

let isInitialized = false; // 添加初始化标志
function initCRHDrag() {
    if (isInitialized) return;
    
    const CRH1 = document.querySelector("#CRH1");
    let isDragging = false;
    
    // 鼠标事件
    CRH1.addEventListener("mousedown", (e) => {
        if (!isDrawing) {
            isDragging = true;
            e.preventDefault();
        }
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging && !isDrawing) {
            isDrawing = true;
            drawCRH();
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });

    document.addEventListener("mouseleave", () => {
        isDragging = false;
    });

    // 触摸事件
    CRH1.addEventListener("touchstart", (e) => {
        if (!isDrawing) {
            isDragging = true;
            e.preventDefault();
        }
    }, { passive: false });

    document.addEventListener("touchmove", (e) => {
        if (isDragging && !isDrawing) {
            isDrawing = true;
            drawCRH();
        }
        e.preventDefault(); // 防止页面滚动
    }, { passive: false });

    document.addEventListener("touchend", () => {
        isDragging = false;
    }, { passive: false });

    document.addEventListener("touchcancel", () => {
        isDragging = false;
    }, { passive: false });

    isInitialized = true;
}

function Cc(){
    
    gsap.set("#drawed",{
        x:0,
    },
    gsap.to(["#Pencil","#CRH","#CRH1","#tip5"],{
        opacity:0,
        duration:1,
    }),
    gsap.to("#CRH2",{
        opacity:1,
        duration:1.5,
        onComplete:()=>{
        gsap.to(["#eleB","#eleA","#bridge",], {
        opacity: 1,
        duration: 2,
        onComplete: () => {
                gsap.to("#CRH2",{
                    x:170,
                    duration:1.5,                    
                })
                gsap.to(["#city","#citybc"],{
                    opacity:1,
                    duration:1.5,
                    
                    onComplete:()=>{
                        scrollAnimal();
                        animalStart++;
                        console.log(animalStart)
                       gsap.delayedCall(1,()=>{
                            messageOn()
                        })

                    }
                })
        }
    })

        }
    }),


    )
}
function drawCRH() {
    const path = document.getElementById('blackCRH');
    if (!path) return;
    
    gsap.set(path, { drawSVG: "0%" });   
    gsap.to(path, {
        drawSVG: "100%",
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
            Cc();
            isDrawing = false;  // 重置绘制状态
        }
    });
}

function scrollAnimal(){

    scrollEleB();
    scrollBridge(); 
    scrollEleA();   
    scrollCity4();
    scrollCity3();
    scrollCity2();
    scrollCity1();

}

function messageOn(){
    gsap.to(["#TB","#city"],{
        y:50,
        duration:1.5,
        ease:"power1.inOut",
        onComplete:()=>{
            gsap.to("#CRHt",{
                scaleY:1,
                duration:0.5,
            })
            const crhMsgText = "我国不断消化吸收多国技术后，<br>通过创新生产的高速动车組列车。<br>2010年，我国自研自建的新一代高速动车組<br>最高时速刷新了世界纪录。<br>现在，我国是世界上高铁商业运营「时速最快」的国家。<br><br>--点击结束--";
            gsap.to("#CRHmessage",{
                text: crhMsgText,
                duration: crhMsgText.length * 0.08, // 每个字符 0.08 秒
                ease: "none", // 匀速出现
                onComplete:()=>{
                        document.addEventListener('click', function handler() {
                        document.removeEventListener('click', handler);
                        gsap.set("#so5",{
                            x:0
                        })
                        gsap.to("#so5",{
                            opacity:1,
                            duration:1.5,
                            onComplete:()=>{
                                Ending();
                            }
                        })
                
                    })
                }
            })

        }
    })
}
// 初始化时调用
initCRHDrag();
pencilmove()
initCRH2Drag();
    }