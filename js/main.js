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
    // Проверяем, мобильное ли устройство
    const isMobile = window.innerWidth <= 768;

    // Анимация для всех элементов
    gsap.utils.toArray('.title, .content-item, .composition__title, .composition__text, .composition__inner-text, .choose-color__list, .case__title main__title, .energy__title main__title, .audio__box').forEach((item) => {
        let startTrigger = 'top 167%';
        let endTrigger = 'top 15%';

        // Если мобильная версия, убираем анимацию для первой секции и кнопок выбора наушников
        if (isMobile) {
            if (item.classList.contains('header__content') || item.classList.contains('choose-color__list')) {
                return; // Пропускаем анимацию для этих элементов
            }
        }

        // Для картинок наушников (чтобы они не исчезали сразу)
        if (item.classList.contains('choose-color__list')) {
            startTrigger = 'top 137%'; // Убедимся, что анимация будет начинаться только когда элемент войдёт в поле зрения
            endTrigger = 'top 30%'; // Анимация продолжится до того, как элемент почти покинет экран
        }

        // Стандартная анимация для остальных элементов
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
                    toggleActions: 'play reverse play reverse', // Появление и исчезновение на скролле
                },
            }
        );
    });
});