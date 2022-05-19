import React from 'react';

const Home = () => {
    window.ymaps.ready(()=>{
        console.log('hello world!');
        var myMap = new window.ymaps.Map("map", {
            center: [54.318542, 48.397557],
            zoom: 12,
        });
    })
    return (
        <>
        <div className="d-flex justify-content-center">
            <h1>Home</h1>
        </div>
        <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores voluptates saepe hic sapiente soluta quidem amet ratione, deserunt ad laboriosam nobis veniam similique sequi velit exercitationem esse dolor doloribus totam quos illo. Iste facilis earum iusto omnis optio nobis sed necessitatibus amet vel repellendus quod ut aliquam, ad dolore blanditiis.
        </p>
        <div className="row">
            <div className="col-2">
                <h3>Маршруты</h3>
                <ul className="list-group">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Morbi leo risus</li>
                    <li className="list-group-item">Porta ac consectetur ac</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
            </div>
            <div className="col-8" id="map" style={{width: '600px', height: '400px'}}></div>
            <div className="col-2">
                <h3>Точки</h3>
                <ul className="list-group">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Morbi leo risus</li>
                    <li className="list-group-item">Porta ac consectetur ac</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
            </div>
        </div>
        <h3 className='text-center mt-3'>Описание достопримечательности</h3>
        <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores voluptates saepe hic sapiente soluta quidem amet ratione, deserunt ad laboriosam nobis veniam similique sequi velit exercitationem esse dolor doloribus totam quos illo. Iste facilis earum iusto omnis optio nobis sed necessitatibus amet vel repellendus quod ut aliquam, ad dolore blanditiis.
        </p>
        </>
    );
};
  
export default Home;