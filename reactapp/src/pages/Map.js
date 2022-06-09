import React from "react";
import skver_img from '../images/skver_Karamzin.jpg';
import { Container, Nav, ListGroup, Tab, TabContent } from "react-bootstrap";
import jquery from "jquery";

export default function Map() {

    window.ymaps.ready(()=>{
        console.log('hello world!');
        var myMap = new window.ymaps.Map("map", {
            center: [54.318542, 48.397557],
            zoom: 12,
        });
        var myPlacemark = new window.ymaps.Placemark([54.316835, 48.402997]);
        myMap.geoObjects.add(myPlacemark);
    })

    return (
        <div id="paths-section overflow-auto">
            <Container>
                <h3 className="text-center">Карта достопримечательностей</h3>
                <p>
                    Здесь представленна интерактивная карта. На ней отмечены значимые места и достопримечательности связанные с писателями жившими на территории Ульяновской области.
                </p>
                <hr />
                <div className="row">
                    <div className="col-12 col-md-3 pb-3 pb-md-0">
                        <h3 className="text-center">Маршруты</h3>
                        <Tab.Container onSelect={(eventKey, e)=>{
                            e.preventDefault();
                            console.log(e)
                            jquery('#points-list .tab-pane').removeClass(['show', 'active']);
                            const el = jquery(eventKey);
                            console.log({el});
                            el.addClass(['show', 'active']);
                            
                        }}>
                        <ListGroup>
                            <ListGroup.Item action href="#path_1" on>
                                По центру города
                            </ListGroup.Item>
                            <ListGroup.Item action href="#path_2">
                                До Винновки
                            </ListGroup.Item>
                            <ListGroup.Item action href="#path_3">
                                Тестовый маршрут 3
                            </ListGroup.Item>
                        </ListGroup>
                        </Tab.Container>
                        {/* <ul className="list-group">
                            <li className="list-group-item active">По центру города</li>
                            <li className="list-group-item">До Винновки</li>
                            <li className="list-group-item">Тестовый маршрут 3</li>
                            <li className="list-group-item">Тестовый маршрут 4</li>
                            <li className="list-group-item">Тестовый маршрут 5</li>
                        </ul> */}
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="border rounded overflow-hidden" id="map" style={{height: '400px'}}></div>
                    </div>
                    <div className="col-12 col-md-3" id="points-list">
                        <h3 className="text-center">Точки</h3>
                        {/* <Tab.Container onSelect={(eventKey, e)=>{
                            e.preventDefault();
                            console.log(e)
                            jquery('#points-list .tab-pane').removeClass(['show', 'active']);
                            const el = jquery(eventKey);
                            console.log({el});
                            el.addClass(['show', 'active']);
                            
                        }}> */}
                            <Tab.Content>
                            <Tab.Pane eventKey="#path1" id={`path_${1}`}>
                                <ListGroup>
                                    <ListGroup.Item action href="#point1">
                                        Сквер Карамзина
                                    </ListGroup.Item>
                                    <ListGroup.Item action href="#point2">
                                        Дом Карамзина
                                    </ListGroup.Item>
                                    <ListGroup.Item action href="#point3">
                                        Парк Горького
                                    </ListGroup.Item>
                                </ListGroup>
                            </Tab.Pane>
                            <Tab.Pane eventKey="#path2" id={`path_${2}`}>
                                <ListGroup>
                                    <ListGroup.Item action href="#point4">
                                        Сквер Карамзина
                                    </ListGroup.Item>
                                    <ListGroup.Item action href="#point3">
                                        Парк Горького
                                    </ListGroup.Item>
                                </ListGroup>
                            </Tab.Pane>
                            <Tab.Pane eventKey="#path3" id={`path_${3}`}>
                                <ListGroup>
                                    <ListGroup.Item action href="#point1">
                                        Сквер Карамзина
                                    </ListGroup.Item>
                                    <ListGroup.Item action href="#point2">
                                        Дом Карамзина
                                    </ListGroup.Item>
                                    <ListGroup.Item action href="#point3">
                                        Парк Горького
                                    </ListGroup.Item>
                                </ListGroup>
                            </Tab.Pane>
                            </Tab.Content>
                        {/* </Tab.Container> */}
                    </div>
                </div>
            </Container>
            <Container id="attraction-description" className="attraction-description my-3 border border-solid rounded overflow-auto">
                <h3 className='text-center'>Описание достопримечательности:</h3>
                <Tab.Content>
                    <Tab.Pane eventKey="#point1">
                        <h4 className='text-center'>Сквер Карамзина</h4>
                        <img src={skver_img} alt="no img" style={{float: 'left', paddingRight: '30px'}}/>
                        <p>
                            В 1866-1869 гг. по проекту архитектора Н.А. Любимого вокруг памятника Н.М. Карамзину в Симбирске был разбит сквер, который окружала живая изгородь из жёлтой акации и сирени – любимого кустарника Н.М. Карамзина. Вдоль аллей были высажены берёзы, вязы, рябины, вишни, дикие груши. В 1868 г. сквер был обнесён чугунной оградой, спроектированной Н.А. Любимовым, в 1867 г. она была отлита в мастерской Н.В. Голубкова и установлена на цоколь из ташлинского камня, а ещё через год в сквере поставили скамейки, построили беседку. Карамзинский сквер – единственный парковый комплекс в исторической части города, в котором сохранились древесные насаждения 1860-1880-х гг.  Первоначальная площадь сквера – 0, 74 га. В 30-е годы 20 века ограда по восточной стороне сквера была разобрана, и площадь сквера увеличилась до 1,16 га.
                        </p>
                        <p>
                            В 1866-1869 гг. по проекту архитектора Н.А. Любимого вокруг памятника Н.М. Карамзину в Симбирске был разбит сквер, который окружала живая изгородь из жёлтой акации и сирени – любимого кустарника Н.М. Карамзина. Вдоль аллей были высажены берёзы, вязы, рябины, вишни, дикие груши. В 1868 г. сквер был обнесён чугунной оградой, спроектированной Н.А. Любимовым, в 1867 г. она была отлита в мастерской Н.В. Голубкова и установлена на цоколь из ташлинского камня, а ещё через год в сквере поставили скамейки, построили беседку. Карамзинский сквер – единственный парковый комплекс в исторической части города, в котором сохранились древесные насаждения 1860-1880-х гг.  Первоначальная площадь сквера – 0, 74 га. В 30-е годы 20 века ограда по восточной стороне сквера была разобрана, и площадь сквера увеличилась до 1,16 га.
                        </p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="#point2">
                        <h4 className='text-center'>Дом Карамзина</h4>
                        <img src={skver_img} alt="no img" style={{float: 'left', paddingRight: '30px'}}/>
                        <p>
                            В 1866-1869 гг. по проекту архитектора Н.А. Любимого вокруг памятника Н.М. Карамзину в Симбирске был разбит сквер, который окружала живая изгородь из жёлтой акации и сирени – любимого кустарника Н.М. Карамзина. Вдоль аллей были высажены берёзы, вязы, рябины, вишни, дикие груши. В 1868 г. сквер был обнесён чугунной огр
                        </p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="#point3">
                        <h4 className='text-center'>Парк Горького</h4>
                        <img src={skver_img} alt="no img" style={{float: 'left', paddingRight: '30px'}}/>
                        <p>
                            В 1866-1869 гг. по проекту архитектора Н.А. Любимого вокруг памятника Н.М. Карамзину в Симбирске был разбит сквер, который окружала живая изгородь из жёлтой акации и сирени – любимого кустарника Н.М. Карамзина. Вдоль аллей были высажены берёзы, вязы, рябины, вишни, дикие груши. В 1868 г. сквер был обнесён ч
                        </p>
                    </Tab.Pane>
                </Tab.Content>
            </Container>
        </div>
    )
}
