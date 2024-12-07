const chooseColor = document.querySelectorAll('.choose-color__btn');
const contentItem = document.querySelectorAll('.content-item');


chooseColor.forEach(function (element) {
    element.addEventListener('click', open)
})

function open(evt) {
    const target = evt.currentTarget;
    const button = target.dataset.button;
    const contentActive = document.querySelectorAll(`.${button}`);


    chooseColor.forEach(function (item) {
        item.classList.remove('choose-color__btn--active');
    })
    target.classList.add('choose-color__btn--active')

    contentItem.forEach(function (item) {
        item.classList.remove('content-item__active');
    });

    contentActive.forEach(function (item) {
        item.classList.add('content-item__active');
    })
}

document.addEventListener("DOMContentLoaded", () => {
    const numberElement = document.querySelector(".energy__num");

    if (numberElement) {
        const targetValue = 20;
        const duration = 2;


        const startCounting = () => {
            const valueObj = { value: 0 };

            gsap.to(valueObj, {
                value: targetValue,
                duration: duration,
                ease: "power1.out",
                onUpdate: function () {

                    numberElement.textContent = Math.floor(valueObj.value);
                },
            });
        };

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        startCounting();
                        observerInstance.unobserve(numberElement);
                    }
                });
            },
            { threshold: 0.2 }
        );

        observer.observe(numberElement);
    } else {
        console.error("Element with class 'energy__num' not found.");
    }
});


document.addEventListener("DOMContentLoaded", () => {
    gsap.utils.toArray('.title, .content-item, .composition__title, .composition__text, .composition__inner-text, .choose-color__list,.choose-color__title, .choose-color__text, .case__title main__title, .energy__title main__title, .audio__box').forEach((item) => {
        let startTrigger = 'top 127%';
        let endTrigger = 'top 15%';


        if (window.innerWidth <= 768) {
            startTrigger = 'top 300%';
            endTrigger = 'top 50%';
        }


        const isHeadphonesSelector = item.classList.contains('choose-color__list');
        if (isHeadphonesSelector) {
            startTrigger = 'top 150%';
            endTrigger = 'bottom 30%';


            gsap.fromTo(
                item,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: item,
                        start: startTrigger,
                        end: endTrigger,
                        toggleActions: 'play reverse play reverse',
                    },
                }
            );
        } else {

            gsap.fromTo(
                item,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: item,
                        start: startTrigger,
                        end: endTrigger,
                        toggleActions: 'play reverse play reverse',
                    },
                }
            );
        }
    });

    const colorButtons = document.querySelectorAll(".choose-color__btn");
    const headerButton = document.querySelector(".header__button");
    const images = document.querySelectorAll(".content-item");

    colorButtons.forEach((button) => {
        button.addEventListener("click", () => {

            colorButtons.forEach((btn) => btn.classList.remove("choose-color__btn--active"));


            button.classList.add("choose-color__btn--active");


            const selectedColor = button.dataset.button;


            if (headerButton) {
                headerButton.className = `header__button ${selectedColor}`;
            }


            images.forEach((image) => {
                if (image.classList.contains(selectedColor)) {
                    image.classList.add("content-item__active");
                } else {
                    image.classList.remove("content-item__active");
                }
            });
        });
    });
});