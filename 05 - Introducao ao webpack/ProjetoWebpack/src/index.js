import _ from 'lodash';
import './styles.css';

import icon from './images/icon.svg';

function component() {
    var element = document.createElement('div');
    // Lodash é utilizado como variável global por meio da declaração do <script> no index.html
    element.innerHTML = _.join(['Olá', 'webpack', '!!'], ' ');
    element.classList.add('hello');

    var image = new Image();
    image.src = icon;

    element.appendChild(image);

    return element;
}

var div = component()

document.body.appendChild(div);
