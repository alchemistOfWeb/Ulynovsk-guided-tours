import React from 'react';
import ReportList from './components/ReportList';
import { BACKEND_ROOT_URL } from '../setting';
import { request, getCookie } from '../functions';
import { useAsync } from 'react-async';
import { Spinner } from 'react-bootstrap';


const defaultImg = 'https://thunderbird-mozilla.ru/images/big-images/kak-dobavit-uchetnuyu-zapis-v-mozilla-thunderbird/kak-dobavit-uchetnuyu-zapis-v-mozilla-thunderbird.jpg';
// const reports = [
//     {
//         id: 2,
//         content: "Добрый день. Как родительница одного из учеников, которая сопровождала класс на экскурсию, была приятно удивлена тем, что все прошло занимательно и интересно, а возможность выбирать маршрут уже из готового списка очень обрадовала", 
//         user: {profile: {fio: "Скворцова А.К."}},
//         img: defaultImg
//     },
//     {
//         id: 3,
//         content: "Приложение работает корректно. Удобно, что не надо ничего скачивать, и все можно просмотреть прямо через браузер", 
//         user: {profile: {fio: "Классный руководитель 1Б-Класса Боков П.П."}},
//         img: defaultImg
//     },
//     {
//         id: 4,
//         content: "Удобное, легкое в использовании приложение. Приятный для восприятия интерфейс. Благодаря возможности выбора нужных литературных мест, а также последующего построенного маршрута, экскурсия для первоклассников прошла быстро и занимательно. Дети были очень заинтересованы и остались довольными", 
//         user: {profile: {fio: "Кто-то ещё"}},
//         img: defaultImg
//     },
// ];

async function loadReportsList(options) {
    // let headers = {'Authorization': getCookie('access_token')};
    let url = `${BACKEND_ROOT_URL}reports/`;
    const res = await request('GET', url, {}, {}, {signal: options.signal})
    console.log({res})
    return res;
}


const Home = () => {
    const { data, error, isPending } 
        = useAsync({ promiseFn: loadReportsList });

    if (isPending) {
        return (
            <div className="d-flex align-items-center justify-content-center pt-5">
                <Spinner animation="border" variant="info" size="xl"/>
            </div>
        )
    }
    if (error) {
        console.log({error})
        return <h1 className="text-danger text-center">Ошибка загрузки отзывов.</h1>
    }    
    if (data) {
        let reports = data.reports;
        return (
            <>
                {/* <p>
                    Информация про удобное приложение. Информация про удобное приложение.Информация про удобное приложение.Информация про удобное приложение.Информация про удобное приложение.Информация про удобное приложение.Информация про удобное приложение.Информация про удобное приложение.Информация про удобное приложение.Информация про удобное приложение.Информация про удобное приложение.
                </p> */}
                <h3 className='text-center'>Отзывы</h3>
                <div className="d-flex justify-content-center">
                    <ReportList reports={reports} />
                </div>
            </>
        );
    }
};

export default Home;