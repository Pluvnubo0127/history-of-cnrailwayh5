function initPuzzle() {
        stage = 3 ;
        gsap.set("#page3", {
            x:0,
            opacity: 1,
        })
        gsap.set(["#fixed", "#qtj", "#so3"], {
            x: -700,
            opacity: 0,
        })

        let vangogh = new Image();
        vangogh.src = './res/page3/塌桥.png';
        vangogh.onload = () => {
            const background = new headbreaker.Canvas('puzzle', {
                width: 576, height: 324,
                pieceSize: 100, proximity: 20,
                borderFill: 10, strokeWidth: 2,
                lineSoftness: 0.12, image: vangogh,
                maxPiecesCount: { x: 4, y: 2 }
            });
            gsap.to(["#break", "#puzzle"], {
                opacity: 1,
                duration: 2,
                ease: "power2.inOut",
            })
            background.adjustImagesToPuzzleHeight();

            // 随机打乱拼图初始位置
            const randomPosition = () => ({
                x: Math.random() * (576 - 150) + 50,
                y: Math.random() * (324 - 150) + 50
            });

            background.sketchPiece({
                structure: 'TT--',
                metadata: { id: 'a', targetPosition: { x: 100, y: 100 }, currentPosition: randomPosition() },
            });
            background.sketchPiece({
                structure: 'SSS-',
                metadata: { id: 'b', targetPosition: { x: 200, y: 100 }, currentPosition: randomPosition() },
            });
            background.sketchPiece({
                structure: 'TTT-',
                metadata: { id: 'c', targetPosition: { x: 300, y: 100 }, currentPosition: randomPosition() },
            });
            background.sketchPiece({
                structure: '-SS-',
                metadata: { id: 'd', targetPosition: { x: 400, y: 100 }, currentPosition: randomPosition() },
            });
            background.sketchPiece({
                structure: 'T--S',
                metadata: { id: 'e', targetPosition: { x: 100, y: 200 }, currentPosition: randomPosition() },
            });
            background.sketchPiece({
                structure: 'S-ST',
                metadata: { id: 'f', targetPosition: { x: 200, y: 200 }, currentPosition: randomPosition() },
            });
            background.sketchPiece({
                structure: 'T-TS',
                metadata: { id: 'g', targetPosition: { x: 300, y: 200 }, currentPosition: randomPosition() },
            });
            background.sketchPiece({
                structure: '--ST',
                metadata: { id: 'h', targetPosition: { x: 400, y: 200 }, currentPosition: randomPosition() },
            });


            background.draw();

            // 添加验证器
            background.attachSolvedValidator();

            // 添加完成验证事件
            background.onValid(() => {
                console.log("拼图完成！");
                setTimeout(() => {
                    gsap.set(["#fixed", "#qtj"], {
                        x: 0,
                    })
                    gsap.delayedCall(1, () => {
                        gsap.to(["#fixed", "#qtj"], {
                            opacity: 1,
                            duration: 1,
                            onCompleted: () => {
                                gsap.delayedCall(1.5, () => {
                                    gsap.to("#qtjText", {
                                        text: "钱塘江大桥<br>中国自行设计、建造的第一座双层铁路、公路两用桥。<br>在抗战中，为阻止敌军过江而被炸毁，<br>建国后被重新修建，沿用至今。<br><br>--点击继续--",
                                        duration: 8,
                                        ease: "power9.inOut",
                                        onComplete: () => {
                                            gsap.set("#so3", {
                                                x: 0,
                                            })
                                            document.addEventListener('click', function handler() {
                                                document.removeEventListener('click', handler);
                                                gsap.to("#so3", {
                                                    opacity: 1,
                                                    duration: 1.5,
                                                    ease: "power2.inOut",
                                                    onComplete:()=>{
                                                        stage = 4;
                                                        stage4();
                                                    }
                                                })
                                            })
                                        }
                                    })

                                })

                            }
                        });

                    })

                }, 1000);
            });
        }
    }