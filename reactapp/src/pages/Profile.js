import React from "react";
import { BACKEND_ROOT_URL, BACKEND_DOMAIN } from "../setting";
import { getCookie, request, deleteCookie, getAccessToken, patchRequest} from "../functions";
import skver_img from '../images/skver_Karamzin.jpg';
import { Container, Nav, ListGroup, Tab, TabContent, Form, Spinner, Table, Row, Col } from "react-bootstrap";
import jquery from "jquery";
import { useState } from "react";
import parseHtml from 'html-react-parser';
import { useAsync } from 'react-async';
import DayJS from 'react-dayjs';


async function loadProfileData(options) {
    let url = `${BACKEND_ROOT_URL}detailprofile/`;
    let headers = {
        "Authorization": getAccessToken()
    }
    const res = await request('GET', url, {}, headers, options);
    return res;
}

function UserDataLoader() {
    const { data, error, isPending } 
        = useAsync({ promiseFn: loadProfileData });

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
        let visitedPlaces = data.visited_places;

        function VisitedPlaceRow({place, index}) {
            return (
                <tr>
                    <td>{index}</td>
                    <td>{place.point.title}</td>
                    <td>{place.point.address}</td>
                    <td><DayJS format="MM-DD-YYYY HH:mm">{place.updated_at}</DayJS></td>
                </tr>
            )
        }

        return (
            <>
                <Table striped bordered hover variant="primary">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Название</th>
                            <th>Адрес</th>
                            <th>Последнее посещение</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visitedPlaces.map((el, ind) => {
                            return (
                                <VisitedPlaceRow key={ind} place={el} index={ind}/>
                            )
                        })}
                    </tbody>
                </Table>
            </>
        )
    }
}

export default function Profile() {
    if (!window.user) {
        alert('Войдите в систему для того чтобы просматривать данные профиля.');
        window.history.back();
    }

    const user = window.user;
    const profile = user.profile;

    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
    const [fio, setFIO] = useState(profile.fio);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleEditProfile(e) {
        e.preventDefault();
        // console.log({email, firstName, lastName});
        patchRequest('edit_user/', {email, username: username, fio: fio})
            .then((res)=>{
                window.location.reload();
            })
            .catch((err)=>{
                console.log(err)
                alert("Some error!")
            })            
        
    }

    function handleChangePassword(e) {
        e.preventDefault();
        console.log({password});
        alert('Unfortunately this feature has not been implemented yet')
    }    

    return (
        
        <Container className="rounded mt-5 mb-5 profile-section">
            <Row className="bg-dark-opacity border rounded">
                <Col xs="12" md="3" className="border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img 
                            className="rounded-circle mt-5" 
                            width="150px" 
                            src={`${BACKEND_DOMAIN}${profile.image_sm}`}
                        />
                        <span className="font-weight-bold">{user.username}</span>
                        <span className="text-secondary">{user.email}</span>
                        <span> </span>
                    </div>
                </Col>
                <Col xs="12" md="5" className="border-right">
                    <Form className="p-3 py-5" onSubmit={handleEditProfile}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Настройка профиля</h4>
                        </div>
                        <Row className="mt-2">
                            <div className="col-md-6">
                                <label className="labels">Имя пользователя</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="nikname" 
                                    value={username} 
                                    onChange={(e)=>setUsername(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="labels">ФИО</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Иванов Иван Иванович"
                                    value={fio} 
                                    onChange={(e)=>setFIO(e.target.value)}
                                />
                            </div>
                        </Row>
                        <Row className="mt-3">
                            <div className="col-md-12">
                                <label className="labels">Мобильный телефон</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="введите ваш телефон сюда" 
                                    value=""
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="enter email"                                     
                                    value={email} 
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>
                        </Row>
                        <div className="mt-3 text-center">
                            <button className="btn btn-primary profile-button" type="submit">
                                Сохранить данные
                            </button>
                        </div>
                    </Form>
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Изменить пароль</h4>
                        </div>
                        <form className="row mt-2" onSubmit={handleChangePassword}>
                            <div className="col-md-6">
                                <label className="labels">новый пароль</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="введите пароль" 
                                    value={password} 
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="labels">подтвердите новый пароль</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="введите пароль повторно"
                                    value={confirmPassword} 
                                    onChange={(e)=>setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div className="mt-3 text-center">
                                <button className="btn btn-primary profile-button" type="submit">
                                    Сохранить пароль
                                </button>
                            </div>
                        </form>
                    </div>
                </Col>
            </Row>
            <Row className="mt-5">
                <h3 className="text-center">Посещенные места</h3>
                <UserDataLoader/>
            </Row>
        </Container>
    )
}
