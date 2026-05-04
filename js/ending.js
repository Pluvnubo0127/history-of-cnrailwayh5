    function Ending(){
        stage = 6 ;
    gsap.set("#Ending",{
    x:0,
    opacity:1,
})
gsap.set(["#EndBC","#EndT1","#EndT2"],{
    opacity:0,
})
gsap.to("#EndBC",{
    opacity:1,
    duration:1,
    onComplete:()=>{
        gsap.to("#EndT1",{
            opacity:1,
            duration:1,
            onComplete:()=>{
                gsap.delayedCall(0.5,()=>{
                    gsap.to("#EndT2",{
                        opacity:1,
                        duration:1
                    })
                })
            }
        })
    }
})
}