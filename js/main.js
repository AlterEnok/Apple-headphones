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
            { threshold: 0.5 }
        );

        observer.observe(numberElement);
    } else {
        console.error("Element with class 'energy__num' not found.");
    }
});







gsap.utils.toArray(' .title, .content-item, .composition__title, .composition__text, .composition__inner-text,.choose-color__list, .case__title main__title, .energy__title main__title, .audio__box').forEach((item) => {
    gsap.fromTo(
        item,
        { y: 100, opacity: 0, zIndex: 1 },
        {
            y: 0,
            opacity: 2,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 127%',
                end: 'top 15%',
                toggleActions: 'play reverse play reverse',
            },
        }
    );
});




document.addEventListener("DOMContentLoaded", () => {
    const colorButtons = document.querySelectorAll(".choose-color__btn");
    const headerButton = document.querySelector(".header__button");  // Предположим, что этот элемент есть в хедере
    const images = document.querySelectorAll(".content-item"); // Все картинки на странице, которые нужно изменить

    colorButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // Убираем класс активности со всех кнопок
            colorButtons.forEach((btn) => btn.classList.remove("choose-color__btn--active"));

            // Добавляем класс активности выбранной кнопке
            button.classList.add("choose-color__btn--active");

            // Получаем цвет, который выбран
            const selectedColor = button.dataset.button;

            // Меняем цвет кнопки в хедере
            if (headerButton) {
                headerButton.className = `header__button ${selectedColor}`;
            }

            // Обновляем картинки на соответствующие
            images.forEach((image) => {
                if (image.classList.contains(selectedColor)) {
                    image.classList.add("content-item__active");  // Показываем картинку
                } else {
                    image.classList.remove("content-item__active");  // Скрываем картинку
                }
            });
        });
    });
});

