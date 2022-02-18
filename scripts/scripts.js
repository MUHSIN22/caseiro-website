let bannerSlideIndex = 0,
    homeProductSlideActive = 0;
// For product mobile slide
let posX1,posX2;
let slideInterval;

$(document).ready(() => {
    slideInterval = setInterval(autoSlider,5000);
    bannerDotClickSlider();
    productDotClickSlider();
    if($(window).innerWidth() <= 768){
        productTouchSlider()
    }
})

// Banner slide functions
const autoSlider = () => {
    let direction = 'forward';
    if( bannerSlideIndex === 2){
        direction = 'backward'
    }else if( bannerSlideIndex === 0){
        direction = 'forward'
    }
    
    direction === "forward" ? bannerSlideIndex++: bannerSlideIndex--;
    
    $(".carousel").css("margin-left",`-${ bannerSlideIndex*100}%`)
    $(".dot__active").removeClass("dot__active")
    $(".dot").eq(bannerSlideIndex).addClass("dot__active");
}

const bannerDotClickSlider = () => {
    $(".dot").click( (event) => { 
        event.preventDefault();
        var index = $(".dot").index(event.target)
        bannerSlideIndex = index;
        
        clearInterval(slideInterval);
        
        $(".carousel").css("margin-left",`-${ bannerSlideIndex*100}%`)
        $(".dot__active").removeClass("dot__active")
        $(".dot").eq(bannerSlideIndex).addClass("dot__active");
        
        slideInterval = setInterval(autoSlider,5000);
    });
}


// home product slide
const slideHomeProducts = (direction) =>{
    if(direction === 'forward' && homeProductSlideActive<2){
        homeProductSlideActive++; 
    }else if(direction === 'back' && homeProductSlideActive > 0){
        homeProductSlideActive--;
    }

    setNavigationButton();

    $('.products--slider').css("margin-left",`-${homeProductSlideActive*100}%`)
    setTimeout(() => {
        $(".product--dot__active").removeClass("product--dot__active")
        $(".product--dot").eq(homeProductSlideActive).addClass("product--dot__active");
    },1000)
}

const productDotClickSlider = () => {
    $(".product--dot").click( (event) => { 
        event.preventDefault();
        var index = $(".product--dot").index(event.target)
        homeProductSlideActive = index;
        
        setNavigationButton();

        $(".products--slider").css("margin-left",`-${ homeProductSlideActive*100}%`)
        setTimeout(() => {
            $(".product--dot__active").removeClass("product--dot__active")
            $(".product--dot").eq(homeProductSlideActive).addClass("product--dot__active");
        },1000)
    });
}

const setNavigationButton = () => {
    if(homeProductSlideActive === 2){
        $('.forward-navigation').css("opacity",0)
    }else{
        $('.forward-navigation').css("opacity",1)
    }

    if(homeProductSlideActive === 0){
        $('.backward-navigation').css("opacity",0)
    }else{
        $('.backward-navigation').css("opacity",1)
    }
}

const productTouchSlider = () => {
    let flag = 0
    $(".products--slider").on('touchstart',(event) => {
        event = event || window.event;
        if(event.type === 'touchstart'){
            posX1 = event.touches[0].clientX
        }else{
            posX1 = event.clientX;
        }
        flag = 1
    })
    $(".products--slider").on('touchend',(event) => {
        event = event || window.event;
        let touch = event.touches[0] || event.changedTouches[0]
        posX2 = touch.pageX 
        if(flag === 1){
            console.log("End");
            productSlide();
        }
    })
    
}

const productSlide = () => {
    if(posX1 > posX2 && posX1 - posX2 > 60) {
        slideHomeProducts("forward");
    }else if(posX1 < posX2 && posX2 - posX1 > 60){
        slideHomeProducts("back")
    }
}


// Search opening
const openSearch = () => {
    $('.search-icon--link').animate({'font-size':0},300,() => {
        $(".search-container").css({display:'block'})
        $(".search-wrapper").css({display:'flex'})
        $(".search-container").animate({
            height: '100%'
        },100,() => {
            $(".search-wrapper").animate({opacity:1},300)
        })
    })
    $(".search-icon-wrapper").animate({width:0,margin:0})
}

const closeSearch = () => {
    $('.search-wrapper').animate({opacity:0},100,()=>{
        $(".search-container").animate({height: 0},100,()=>{
            $(".search-container").css({display:'none'})
            $(".search-wrapper").css({display:'none'})
            $(".search-icon-wrapper").animate({width:'1.5rem',margin:'0 1rem'})
            $(".search-icon--link").animate({'font-size':'1.5rem'},300)
        })
    })
}