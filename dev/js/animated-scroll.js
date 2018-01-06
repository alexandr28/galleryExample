

const getInitialScroll= () => document.body.scrollTop;
const getFinalScroll= element =>  Math.floor(element.getBoundingClientRect().top + getInitialScroll());

const animatedScrollTo= () => (targetElement,time) => {
    let initialPosition = getInitialScroll(),
        finalPosition= getFinalScroll(targetElement),
        distanceToScroll = finalPosition - initialPosition,
        scrollFragment = distanceToScroll / time;
    animateScroll(scrollFragment, finalPosition);


};

const animateScroll = (scrollFragment, finalPosition) => {
    let animatedScroll = setInterval(function(){
        document.body.scrollTop += scrollFragment;
        if(scrollFragment >0){
            if(document.body.scrollTop > finalPosition - (scrollFragment/2))
                clearInterval(animatedScroll)
        }else{
            if(document.body.scrollTop < finalPosition - (scrollFragment/2))
                clearInterval(animatedScroll)
        }

    },1);
};

const animatedScrollEvenet = (origenElement , time)=>{
    if(origenElement.tagName === 'A' && origenElement.hash !== ''){

        let targeElement = document.getElementById(origenElement.hash.slice(1));
        origenElement.addEventListener('click',e =>{
            e.preventDefault();
            animatedScrollTo(targeElement,time);
        });

    }

};

const animatedScrollAllLinks = time => {
    let links= document.links;
    for (let link of links){
        animatedScrollEvenet(link,time);
    }
};

animatedScrollAllLinks(200);

//animatedScrollTo(document.getElementById('cap2'),500);


