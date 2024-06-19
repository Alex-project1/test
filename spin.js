export default function spin(params) {
    // PARAMS
    // { elementId: 'rotor', angle: 1200, duration: 10000, arm: true, armAngle: 100, armDuration: 500, beautyStop: true, beautyStopAngle: 5, beautyStopDuration: 1000 }

    // Вот так импортировать в основной файл    
    // import spin from './spin.js'

    // elementId | string - Айди элемента который должен крутиться

    // angle | int - угол, на который повернётся элемент в конечном итоге
    // положительный по часовой стрелке, отрицательный против часовой стрелки. 
    // Делайте несколько оборотов (360*количество оборотов) + угол поворота на ту секцию которая нам нужна

    // duration | int - длительность вращения в миллисекундах, если вы используете arm, то лучше поставить побольше, т.к. время которое производиться arm включено в общий duration

    // arm | boolean  - параметр отвечает за "взвод" колеса. Мы немного отклоняем его в другую сторону, это даёт эффект как буд-то мы крутим колесо рукой.

    // armAngle | int - параметр отвечает за то насколько взводится колесо

    // armDuration | int - длительность взвода колеса в миллисекундах, это значение вычитается из общего времени прокутки, т.е. если у нас общее время 1 секунда, а взвод 200мс, то взвод будет 200мс, а крутилка 800мс

    // beautyStop | boolean  - параметр отвечает за "красивую остановку" колеса. Колесо прокручивается дальше чем задано, а потом немного откатывается назад

    // beautyStopAngle | int - параметр отвечает за то насколько колесо закатиться дальше чем нужно перед обратным откатом

    // beautyStopDuration | int - длительность обратного отката, тоже  не влияет на общее время работы, оно входит в общее время работы анимации


    // Служебная функция, которая вычисляет на сколько градусов картинка повёрнута, это нужно для органичной работы в ситуациях когда за один плейбл есть несколько спинов
    function getRotateValue(element) {
        var transform = element.style.transform;
        var rotateMatch = transform.match(/rotate\((-?\d+\.?\d*)(deg|rad)?\)/);
        if (rotateMatch) {
            var angle = parseFloat(rotateMatch[1]);
            var unit = rotateMatch[2];
            if (unit === "rad") {
                angle = angle * (180 / Math.PI);
            }
            return angle;
        } else {
            return null;
        }
    }

    const element = document.getElementById(params.elementId)
    const startDegCount = getRotateValue(element)
    let armAngle = params.arm ? params.armAngle : 0
    let armDuration = params.arm ? params.armDuration : 0
    let beautyStopAngle = params.beautyStop ? params.beautyStopAngle : 0
    let beautyStopDuration = params.beautyStop ? params.beautyStopDuration : 0;

    if (params.arm) {
        element.style.transition = `transform ${armDuration}ms cubic-bezier(.11,.58,.42,1.05)`;
        element.style.transform = `rotate(${startDegCount - armAngle}deg)`
    }

    setTimeout(() => {
        element.style.transition = `transform ${params.duration - armDuration - beautyStopDuration}ms cubic-bezier(.1,.6,.05,1)`;
        element.style.transform = `rotate(${startDegCount + params.angle + beautyStopAngle}deg)`
    }, armDuration);


    if (params.beautyStop) {
        setTimeout(() => {
            element.style.transition = `transform ${beautyStopDuration}ms ease-in-out`;
            element.style.transform = `rotate(${startDegCount + params.angle}deg)`
        }, params.duration - beautyStopDuration);
    }

}
