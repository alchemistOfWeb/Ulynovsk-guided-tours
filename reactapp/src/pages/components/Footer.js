import { Link } from "react-router-dom"
import { crdRequest, getCookie, deleteCookie } from "../../functions";
import { BACKEND_ROOT_URL } from "../../setting";
import React from "react";
import { ListGroup } from "react-bootstrap";
import telegram_icon from "../../images/social_icons/telegram.ico";
import vk_icon from "../../images/social_icons/vk.ico";
import whatsapp_icon from '../../images/social_icons/whatsapp.ico';


export default function Footer() {

    let telStr = "79626330000";
    let emailStr = "nikitakzntcv@gmail.com";
    return (
        <footer id="footer">
            <div className="footer-inner container-fluid">
                <div className="col-4">
                    <h5>Контакты:</h5>
                    <ListGroup variant="flush" className="list-unstyled contacts-list">
                        <ListGroup.Item>
                            <a href={`tel:+${telStr}`}>+{telStr}</a>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <a href={`mailto:${emailStr}`}>{emailStr}</a>
                        </ListGroup.Item>
                    </ListGroup>
                    <h5>Соцсети:</h5>
                    <ListGroup horizontal className="list-unstyled social-icons">
                        <ListGroup.Item>
                            <a 
                                target="_blank" 
                                rel="nofollow noopener" 
                                href={`whatsapp://send?text=${window.location.href}`}
                                className="social-whatsapp"
                                >
                                    <img src={whatsapp_icon} alt="[x]"/>
                            </a>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <a 
                                href={`https://t.me/share/url?url=${window.location.href}&amp;text=seehowicool`}
                            >
                                <img src={telegram_icon} alt="[x]"/>
                            </a>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <a 
                                href={`https://vkontakte.ru/share.php?url=${window.location.href}`} 
                                target='_blank'
                            >
                                <img src={vk_icon} alt="[x]"/>
                            </a>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </div> 
        </footer>
    )
}