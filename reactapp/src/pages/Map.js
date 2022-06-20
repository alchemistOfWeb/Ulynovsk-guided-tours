import React from "react";
import { BACKEND_ROOT_URL, BACKEND_DOMAIN } from "../setting";
import { getCookie, request, deleteCookie} from "../functions";
import skver_img from '../images/skver_Karamzin.jpg';
import { Container, Nav, ListGroup, Tab, TabContent, Form, Spinner } from "react-bootstrap";
import jquery from "jquery";
import { useState } from "react";
import parseHtml from 'html-react-parser';
import { useAsync } from 'react-async';

// function PointDescription({point}) {
//     return (
//         <div className="point-description" id="point-description-section">
//             <h4 className="point-description__title text-center">{point.title}</h4>
//             <div className="point-description__content">{parseHtml(point.description)}</div>
//         </div>
//     )
// }

function Point({value, title}) {
    return (
        <option value={value}>{title}</option>
    )
}

function PointsSelect({pathId, points, htmlId}) {
    const handleSelectPoint = (e) => {
        console.log(e.target.value);
        let point = points.find((val, ind) => val.id == e.target.value);
        let title = point.title;
        let desc = point.description;
        console.log({point})

        jquery('#point-description-title').text(title) ;
        jquery('#point-description-content').html(desc);
    };

    return (
        <Form.Select className="d-none points-select map-options-select" id={htmlId} htmlSize={10} onChange={handleSelectPoint}>
            {points.map((el, ind) => {return <Point value={el.id} title={el.title}/>})}
        </Form.Select>
    )
}

async function loadPathsList(options) {
    // let headers = {'Authorization': getCookie('access_token')};
    let url = `${BACKEND_ROOT_URL}paths/`;
    const res = await request('GET', url, {}, {}, {signal: options.signal})
    console.log({res})
    return res;
}

function drawPoint({lat, long, img, title}) {
    console.log({img, BACKEND_DOMAIN})
    var myPlacemark = new window.ymaps.Placemark(
        [lat, long], 
        {
            hintContent: title,
            balloonContent: 'Посещено',
            iconContent: '12'
        }, 
        {
            iconLayout: 'default#image',
            iconImageHref: img,
            iconImageSize: [25, 25],
            // iconImageOffset: [-3, -42]
        }
    );
    window.myMap.geoObjects.add(myPlacemark);
}

export default function Map() {
    

    const handleSelectPath = (e) => {
        console.log(e.target.value)
        let pointsListId = `points-list-${e.target.value}`;
        jquery('#point-selects-list .points-select').removeClass(['show', 'active']).addClass('d-none');
        jquery(`#${pointsListId}`).addClass(['show', 'active']).removeClass('d-none');
    }

    const { data, error, isPending } 
        = useAsync({ promiseFn: loadPathsList });

    if (isPending) {
        return (
            <div className="d-flex align-items-center justify-content-center pt-5">
                <Spinner animation="border" variant="info" size="xl"/>
            </div>
        )
    }
    if (error) {
        console.log({error})
        return <h1 className="text-danger">Ошибка загрузки достопримечательностей.</h1>
    }    
    if (data) {
        let pathsList = data.paths;

        if (!window.myMap) {
            window.ymaps.ready(()=>{
                console.log('hello map!');
    
                window.myMap = new window.ymaps.Map("map", {
                    center: [54.318542, 48.397557],
                    zoom: 12,
                });
    
                for (let path of pathsList) {
                    console.log({path})
                    for (let point of path.points) {
                        console.log({point});
                        if (point.lat && point.long) {
                            drawPoint({
                                lat: point.lat, 
                                long: point.long, 
                                img: point.category.icon,
                                title: point.category.title
                            });
                        }
                    }
                }
                
            });
        }
        
        // window.ymaps.ready(()=>{
        //     var myPlacemark = new window.ymaps.Placemark([54.316835, 48.406997]);
        //     window.myMap.geoObjects.add(myPlacemark);
        // });
    
        return (
            <div id="paths-section overflow-auto">
                <Container>
                    <h3 className="text-center">Карта достопримечательностей</h3>
                    <p>
                        Здесь представленна интерактивная карта. На ней отмечены значимые места и достопримечательности связанные с писателями жившими на территории Ульяновской области.
                    </p>
                    <hr />
                    <div className="row map-options">
                        <div className="col-12 col-md-3 map-options__select-section">
                            <div className="text-center map-options-select-header h5">Маршруты</div>
                            <Form.Select className="map-options-select" htmlSize={10} onChange={handleSelectPath}>
                                {pathsList.map((el, ind) => {
                                    return <option value={el.id}>{el.title}</option>
                                })}
                            </Form.Select>
                        </div>
                        <div className="col-12 col-md-6 py-3 py-md-0 px-0 px-md-3">
                            <div className="border rounded overflow-hidden w-100" id="map" style={{height: '400px'}}></div>
                        </div>
                        <div className="col-12 col-md-3 map-options__select-section" id="points-list">
                            <div className="text-center map-options-select-header h5">достопримечательности</div>
                            <div className="point-selects-list" id="point-selects-list">
                                {pathsList.map((el, ind) => {
                                    return <PointsSelect pathId={el.id} points={el.points} htmlId={`points-list-${el.id}`}/>
                                })}
                            </div>
                        </div>
                    </div>
                </Container>
                <Container id="attraction-description" className="attraction-description my-3 border border-solid rounded overflow-auto">
                    <h3 className='text-center'>Описание достопримечательности:</h3>
                    {/* {<PointDescription/>} */}                
                    <div className="point-description" id="point-description-section">
                        <h4 className="point-description__title text-center" id="point-description-title"></h4>
                        <div className="point-description__content" id="point-description-content">
                            Выберите любой маршрут (слева - на пк, сверху - на устройстве с маленьким экраном), а затем нажмите на достопримечательность (справа - на пк, снизу - на устройстве с маленьким экраном)
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}
