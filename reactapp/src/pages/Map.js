import React from "react";
import { BACKEND_ROOT_URL, BACKEND_DOMAIN } from "../setting";
import { getCookie, request, deleteCookie, getAccessToken} from "../functions";
import skver_img from '../images/skver_Karamzin.jpg';
import { Container, Nav, ListGroup, Tab, TabContent, Form, Spinner } from "react-bootstrap";
import jquery from "jquery";
import { useState } from "react";
import parseHtml from 'html-react-parser';
import { useAsync } from 'react-async';
import dayjs from "dayjs";

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

function showPointDescription({title, desc}) {
    jquery('#point-description-title').text(title) ;
    jquery('#point-description-content').html(desc);
    jquery('#point-description-content').find('img').each((ind, el)=>{
        let splitted = el.src.split('/').slice(3).join('/');
        let newSrc = BACKEND_DOMAIN + '/' + splitted;
        console.log({src: newSrc})
        el.src = newSrc;
    })
    document.location.hash = "";
    document.location.hash = "point-description-section";
}

function PointsSelect({pathId, points, htmlId}) {
    const handleSelectPoint = (e) => {
        let point = points.find((val, ind) => val.id == e.target.value);
        let title = point.point.title;
        let desc = point.point.description;
        showPointDescription({title, desc});
    };

    return (
        <Form.Select className="d-none points-select map-options-select" id={htmlId} htmlSize={10} onChange={handleSelectPoint}>
            {points.map((el, ind) => {return <Point key={ind} value={el.id} title={el.point.title}/>})}
        </Form.Select>
    )
}

async function loadPathsList(options) {
    let headers = {'Authorization': getAccessToken()};
    let url = `${BACKEND_ROOT_URL}paths/`;
    const res = await request('GET', url, {}, headers, {signal: options.signal})
    console.log({res})
    return res;
}



function drawPoint({point, pathId, desc, lat, long, img, hint, title, visited}) {
    console.log({visited});

    window.handleClickMarkVisited = function(e) {
        console.log('handleClickMarkVisited');
        let point = e.getAttribute('point-id');
        console.log({point});
    }
    
    window.handleClickShowDesc = function(e) {
        console.log('handleClickShowDesc');
        console.log(e);
        let pointId = e.getAttribute('data-point-id');
        let pathId = e.getAttribute('data-path-id');

        let path = window.pathsList.find((val, ind) => val.id == pathId);
        let point = path.points.find((val, ind) => val.id == pointId);
        console.log({point: point.point})
        showPointDescription({title: point.point.title, desc: point.point.description});
    }

    let visitLink = `<br><button data-point-id="${point.point.id}" class="btn btn-success py-0 px-1 m-0 mt-1" onclick="window.handleClickMarkVisited(this)">отметить как "посещенное"</button>`
    let standartDesc = `${title} <br><button data-path-id="${pathId}" data-point-id="${point.id}" class="btn btn-primary py-0 px-1 m-0" onclick="window.handleClickShowDesc(this)">посмотреть описание</button>`

    var myPlacemark = new window.ymaps.Placemark(
        [lat, long], 
        // ${visited ? dayjs(visited.updated_at).format('YYYY-MM-DD HH:mm') : ''}
        {
            hintContent: hint,
            balloonContent: `${standartDesc} ${(visited && visited.point) ? ' - посещено '+ dayjs(visited.updated_at).format('YYYY-MM-DD HH:mm') : visitLink}`,
            iconContent: (visited && visited.point) ? '<span style="font-size: 190%; color: green; text-shadow: 0 0 3px green;">✓</span>' : '' 
        }, 
        {
            iconLayout: 'default#imageWithContent',
            iconImageHref: img,
            iconImageSize: [25, 25],
            iconImageOffset: [-3, -2]
        }
    );
    window.myMap.geoObjects.add(myPlacemark);
}

export default function Map() {
    

    const handleSelectPath = (e) => {
        let pointsListId = `points-list-${e.target.value}`;
        console.log({pointsListId});
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
        window.pathsList = pathsList;

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

                        if (point.point.lat && point.point.long) {
                            drawPoint({
                                point,
                                pathId: path.id,
                                desc: point.point.description,
                                lat: point.point.lat, 
                                long: point.point.long, 
                                img: point.point.category.icon,
                                hint: point.point.category.title,
                                title: point.point.title,
                                visited: point.point.visited
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
                        Здесь представлена интерактивная карта. На ней отмечены значимые места и достопримечательности связанные с писателями жившими на территории Ульяновской области.
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
                                    return <PointsSelect key={ind} pathId={el.id} points={el.points} htmlId={`points-list-${el.id}`}/>
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
