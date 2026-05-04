gsap.registerPlugin(TextPlugin);
let stage=0;
window.loadOver = false;
const svg = document.getElementById('stage');
const whiteElement = document.querySelector("#white");
    const sora1Element = document.querySelector("#sora1");
    const kumoElement = document.querySelector("#kumo");
    const kumo1Element = document.querySelector("#kumo1");
    const cloudElement = document.querySelector("#cloud");
    const tElement = document.querySelector("#T");
    const DHK1Element = document.querySelector("#DHK1");
    const DHKElement = document.querySelector("#DHK");
    const cxElement = document.querySelector("#cx");
    const cx1Element = document.querySelector("#cx1");
    const cx2Element = document.querySelector("#cx2");
    const cx3Element = document.querySelector("#cx3");
    const EKIElement = document.querySelector("#EKI");
    const stElement = document.querySelector("#st");
    const st1Element = document.querySelector("#st1");
    const tip1Element = document.querySelector("#tip1");
    const tip2Element = document.querySelector("#tip2");
    const countElement = document.querySelector("#count");
    const counterElement = document.getElementById('counter');
const so1Element = document.querySelector('#so1')

// 资源加载监测
function preloadResources() {
    // 1. 提取图片资源
    const images = Array.from(document.querySelectorAll('image, svg, div, foreignObject'))
        .map(el => {
            const style = window.getComputedStyle(el);
            const bg = style.backgroundImage;
            if (bg && bg !== 'none') {
                const match = bg.match(/url\((['"]?)(.*?)\1\)/);
                return match ? match[2] : null;
            }
            return el.src || el.getAttribute('href');
        })
        .filter(src => src && (src.endsWith('.png') || src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.webp') || src.endsWith('.svg')));

    const manualImages = [
        './res/page1/铲子.png',
        './res/page3/塌桥.png'
    ];
    
    // 2. 提取音频资源 (从 sounds.js 中的定义手动列出，因为 Howl 对象在 sounds.js 加载时才创建)
    const audioResources = [
        './res/sounds/0/iwashiro_amamichi_no_nioi.ogg',
        './res/sounds/page1/iwashiro_cook_lu_no_chousenjo.ogg',
        './res/sounds/page1/garagara.ogg',
        './res/sounds/page1/gacha.ogg',
        './res/sounds/page2/iwashiro_fullbit_menkyo.ogg',
        './res/sounds/page2/会話3_単音.mp3',
        './res/sounds/page2/cursor_9.ogg',
        './res/sounds/page2/battle_start.ogg',
        './res/sounds/page2.5/fire.ogg',
        './res/sounds/page3/iwashiro_ame_no_hazama_waltz.ogg',
        './res/sounds/page4/iwashiro_niwashi1.ogg',
        './res/sounds/page4/会話1_単音.mp3',
        './res/sounds/page4/会話4_単音.mp3',
        './res/sounds/page5/iwashiro_sei_mokuyobi.ogg'
    ];

    const allResources = [...new Set([...images, ...manualImages, ...audioResources])];
    let loadedCount = 0;
    const totalCount = allResources.length;
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingBar = document.getElementById('loading-bar');
    const progressText = document.getElementById('loading-progress');
    const svgContainer = document.querySelector('.svg');

    // 加载开始：禁用所有点击交互
    if (svgContainer) {
        svgContainer.style.pointerEvents = 'none';
    }

    if (totalCount === 0) {
        if (loadingScreen) loadingScreen.style.display = 'none';
        if (svgContainer) svgContainer.style.pointerEvents = 'auto';
        return;
    }

    const updateProgress = () => {
        loadedCount++;
        const percent = Math.floor((loadedCount / totalCount) * 100);
        
        if (progressText) {
            progressText.innerText = `${percent}%`;
        }
        
        if (loadingBar) {
            const barLength = 50;
            const currentLength = Math.max(1, Math.floor((percent / 100) * barLength));
            loadingBar.innerText = "/".repeat(currentLength);
        }

        if (loadedCount >= totalCount) {
            setTimeout(() => {
                if (loadingScreen) {
                    // 加载完成，提示用户点击开始（以满足浏览器音频自动播放策略）
                    const loadingText = loadingScreen.querySelector('p:first-child');
                    if (loadingText) loadingText.innerText = "加载完成！";
                    if (progressText) progressText.innerText = "点击屏幕进入";
                    if (loadingBar) loadingBar.innerText = "/".repeat(50);

                    const startEnter = (e) => {
                        if (e) {
                            e.stopPropagation();
                            e.stopImmediatePropagation();
                            e.preventDefault();
                        }
                        
                        // 手动解锁音频
                        if (typeof window.unlockAudio === 'function') {
                            window.unlockAudio();
                        }

                        window.loadOver = true; // 加载完毕

                        gsap.to(loadingScreen, {
                            opacity: 0,
                            duration: 0.5,
                            onComplete: () => {
                                loadingScreen.style.display = 'none';
                                // 加载完毕：重新启用点击交互
                                if (svgContainer) {
                                    svgContainer.style.pointerEvents = 'auto';
                                }
                            }
                        });
                        loadingScreen.removeEventListener('click', startEnter);
                        loadingScreen.removeEventListener('touchstart', startEnter);
                    };

                    loadingScreen.addEventListener('click', startEnter);
                    loadingScreen.addEventListener('touchstart', startEnter);
                    loadingScreen.style.cursor = 'pointer'; // 增加鼠标手势提示
                }
            }, 500);
        }
    };

    allResources.forEach(src => {
        if (src.endsWith('.ogg') || src.endsWith('.mp3')) {
            // 使用 Howl 预加载音频
            const sound = new Howl({
                src: [src],
                onload: updateProgress,
                onloaderror: updateProgress // 即使加载失败也继续
            });
        } else {
            // 预加载图片
            const img = new Image();
            img.onload = updateProgress;
            img.onerror = updateProgress;
            img.src = src;
        }
    });
}

// 在页面加载完成后执行
window.addEventListener('load', () => {
    handleOrientation();
    preloadResources();
});

function handleOrientation() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // 检测横竖屏
        const checkOrientation = () => {
            // 使用 matchMedia 检测屏幕方向
            const isPortrait = window.matchMedia("(orientation: portrait)").matches;
            const orientationTip = document.querySelector('.orientation-tip');
            const svgElement = document.querySelector('.svg');

            if (isPortrait) {
                // 竖屏
                orientationTip.style.display = 'flex';
                svgElement.style.pointerEvents = 'none';
                svgElement.style.opacity = '0.5';
            } else {
                // 横屏
                orientationTip.style.display = 'none';
                svgElement.style.pointerEvents = 'auto';
                svgElement.style.opacity = '1';
            }
        };

        // 初始检查
        checkOrientation();

        // 使用 matchMedia 监听屏幕方向变化
        window.matchMedia("(orientation: portrait)").addEventListener('change', checkOrientation);
    }
}