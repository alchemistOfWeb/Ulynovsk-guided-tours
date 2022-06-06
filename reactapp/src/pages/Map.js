import React from "react";
import skver_img from '../images/skver_Karamzin.jpg';
import { Nav } from "react-bootstrap";



export default function Map() {

    <p>
        Здесь представленная интерактивная карта. На ней отмечены значимые места и достопримечательности связанные с писателями жившими на территории Ульяновской области.
    </p>

    return (
        <div id="paths-section">
            <div className="row col-12">
                <div className="col-2">
                    <h3>Маршруты</h3>
                    <ul className="list-group">
                        <li className="list-group-item active">По центру города</li>
                        <li className="list-group-item">До Винновки</li>
                        <li className="list-group-item">Тестовый маршрут 3</li>
                        <li className="list-group-item">Тестовый маршрут 4</li>
                        <li className="list-group-item">Тестовый маршрут 5</li>
                    </ul>
                </div>
                <div className="col-8" id="map" style={{height: '400px'}}></div>
                <div className="col-2">
                    <h3>Точки</h3>
                    <ul className="list-group">
                        <li className="list-group-item">Точка 1</li>
                        <li className="list-group-item active">Точка 2</li>
                        <li className="list-group-item">Точка 3</li>
                        <li className="list-group-item">Точка 4</li>
                        <li className="list-group-item">Точка 5</li>
                        <li className="list-group-item">Точка 6</li>
                    </ul>
                </div>
            </div>
            <h3 className='text-center mt-3'>Описание достопримечательности:</h3>
            <h4 className='text-center mt-3'>Точка 2</h4>
            <img src={skver_img} alt="no img" style={{float: 'left', paddingRight: '30px'}}/>
            <p>
                В 1866-1869 гг. по проекту архитектора Н.А. Любимого вокруг памятника Н.М. Карамзину в Симбирске был разбит сквер, который окружала живая изгородь из жёлтой акации и сирени – любимого кустарника Н.М. Карамзина. Вдоль аллей были высажены берёзы, вязы, рябины, вишни, дикие груши. В 1868 г. сквер был обнесён чугунной оградой, спроектированной Н.А. Любимовым, в 1867 г. она была отлита в мастерской Н.В. Голубкова и установлена на цоколь из ташлинского камня, а ещё через год в сквере поставили скамейки, построили беседку. Карамзинский сквер – единственный парковый комплекс в исторической части города, в котором сохранились древесные насаждения 1860-1880-х гг.  Первоначальная площадь сквера – 0, 74 га. В 30-е годы 20 века ограда по восточной стороне сквера была разобрана, и площадь сквера увеличилась до 1,16 га.
            </p>
        </div>
    )
}
