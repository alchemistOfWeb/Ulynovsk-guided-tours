import React from 'react';
import { crdRequest, getCookie, setCookie, getAccessToken } from "../functions";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { useAsync } from "react-async";
import { BACKEND_ROOT_URL } from "../setting";
import { Form } from 'react-bootstrap';


async function reportResponse(params={}) {
    let url = `${BACKEND_ROOT_URL}reports/`;
    let headers = {
        "Authorization": getAccessToken()
    }
    const res = await crdRequest('POST', url, params, headers);    
    return res;
}

export default function SendReport() {
    // if (getCookie('access_token')) window.location.href = '/';
    if (!window.user) {
        alert("Прежде чем оставлять отзывы вам необходимо зарегистрироваться");
        window.location.href = '/';
    }
    const [reportBody, setReportBody] = useState("");

    const handleReport = (e) => {
        e.preventDefault();
        if (!reportBody) {
            alert("Поле текста не может быть пустым");
            return;
        }
        reportResponse({content: reportBody})
            .then((res)=>{
                console.log(res);
                alert("Отзыв успешно отправлен");
            })
            .catch((err) => {
                console.log({err});
            });
    }

    return (
        <main className="container mt-3 d-flex justify-content-center">


            <Form className="col-12 col-md-8 col-sm-9 col-lg-6 col-xl-4 bg-dark rounded p-3" onSubmit={handleReport}>
                <h1 className="h3 mb-3 font-weight-normal text-center">Оставить отзыв</h1>
                
                <Form.Group className="mb-3">
                    <Form.Control 
                        as="textarea" 
                        rows={5}
                        id="inputReportBody" 
                        className="" 
                        placeholder="Введить текст отзыва сюда" 
                        required autofocus=""
                        onChange={(e)=>{setReportBody(e.target.value)}}
                    />
                    <div className="error-list  d-flex flex-column"></div>
                </Form.Group>
                
                <p>
                    * максимальная длина сообщения 1000 символов.
                </p>
                <div className="d-flex justify-content-center">
                    <button
                        className="btn btn-lg btn-primary btn-block"
                        type="submit"
                    >
                        Отправить
                    </button>
                </div>
                <p className="mt-5 mb-3 text-muted">© 2022</p>
            </Form>  
        </main>
    )
}