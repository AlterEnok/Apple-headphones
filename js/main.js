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
    gsap.utils.toArray('.title, .content-item, .composition__title, .composition__text, .composition__inner-text, .choose-color__list, .case__title main__title, .energy__title main__title, .audio__box').forEach((item) => {
        let startTrigger = 'top 100%';
        let endTrigger = 'top 15%';

        // Проверяем, мобильное ли устройство
        if (window.innerWidth <= 768) { // 768px - стандарт для мобильных устройств
            startTrigger = 'top 100%'; // Появление с верхней части экрана
            endTrigger = 'top 50%'; // Останется видимым чуть дольше
        }

        // Для блока с выбором наушников НЕ даем исчезать
        const isHeadphonesSelector = item.classList.contains('choose-color__list');
        const isHeadphonesText = item.classList.contains('choose-color__text'); // Проверка для текста наушников на первом экране
        const isHeaderContent = item.classList.contains('header__content'); // Для первой секции (header__content)

        if (isHeadphonesSelector || isHeadphonesText) {
            // Появление наушников с верхней части экрана, но не исчезают
            startTrigger = 'top 100%'; // Элемент появляется с верхней части экрана
            endTrigger = 'top 50%'; // Останется видимым дольше
        } else if (isHeaderContent) {
            // Для первой секции, чтобы она не исчезала, но появлялась, когда автор поднимет страницу
            startTrigger = 'top 100%'; // Появление с верхней части экрана
            endTrigger = 'top 100%';  // Останется на экране при прокрутке вверх
        }

        gsap.fromTo(
            item,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.5, // Уменьшаем длительность анимации для улучшения быстродействия
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: item,
                    start: startTrigger,
                    end: endTrigger,
                    toggleActions: isHeaderContent ? 'play none none none' : 'play reverse play reverse', // Для header__content элемент не исчезает
                },
            }
        );
    });
});