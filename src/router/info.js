import '../css/info.css';
import React, { useState, useEffect } from "react";
import {Route, Router, Routes, Link, useNavigate, NavLink, Outlet} from 'react-router-dom'

import RealtimeLineChart from "./realtimechart";

function Info() {
    let navigate = useNavigate();
    // 로그인 상태를 localStorage에서 로드
    const loadAuthData = () => {
        const storedIsLogin = localStorage.getItem('isLogin');
        const storedLogin = localStorage.getItem('login');
        if (storedIsLogin && storedLogin) {
            return { isLogin: storedIsLogin === 'true', login: JSON.parse(storedLogin) };
        }
        return { isLogin: false, login: { userid: '', nickname: '' } };
    };

    const [isLogin, setIsLogin] = useState(loadAuthData().isLogin);
    const [login, setLogin] = useState(loadAuthData().login);

    // 로그인 상태 변경시 localStorage에 저장
    useEffect(() => {
        localStorage.setItem('isLogin', isLogin);
        localStorage.setItem('login', JSON.stringify(login));
    }, [isLogin, login]);

    // 로그아웃 로직 구현
    const logout = () => {
        setIsLogin(false);
        setLogin({ userid: '', nickname: '' });
        localStorage.removeItem('isLogin');
        localStorage.removeItem('login');
        navigate("/logout");
    };

    return (
        <div className="info">
            <div className="info_nav"></div>
            <section className="main-con">
                        <div className = "Info_main">
                            <div className="Info_content">

                                <h1>Echo Recycling Hub</h1>
                                <h2> 환영합니다! </h2>
                                <p> '에리허브'의 목표는 지구와 함께 지속 가능한 생활을 위하여 모두에게 유용한 정보와 도구를 제공하는 것입니다.</p>
                                <p> 지도 기능을 활용하여 주변 재활용 센터, 페트병 수거 자판기, 제로 웨이스트 샵과 같은 환경 관련 시설을 쉽게 찾을 수 있도록 도와줍니다.</p>
                                <p> 더불어, 사용자의 위치를 기준으로 가장 가까운 제로 웨이스트 샵까지의 길찾기 기능을 제공하여 지속 가능한 소비를 장려합니다.</p>
                                <p> 또한 폐기물 배출량과 미세먼지 농도와 같은 환경 지표를 시각적으로 제공하여 사용자들이 지역의 환경 상태를 쉽게 파악할 수 있습니다.</p>
                                <p> 이를 통해 우리는 각자의 일상 속에서 환경을 생각하고 실천할 수 있는 기회를 제공하고자 합니다.</p>

                                <p> 우리는 지구를 위한 작은 변화가 모여 큰 변화를 이끌어낼 수 있다고 믿습니다. 함께하는 모든 분들의 작은 노력이 우리의 환경을 더욱</p>
                                <p> 건강하고 지속 가능하게 만들어갈 것입니다.</p>
                                <p> 지금 바로 우리의 환경을 위한 첫걸음을 내딛어보세요. 함께라면 가능합니다!</p>
                            </div>
                            <RealtimeLineChart/>
                        </div>
            </section>

        </div>
    );
}


function WeatherStatus() {

    return (
        <div className="model">
            <img
                style={{width: "43%", height: "auto", float: "right"}}
                alt="초미세먼지 모델 한반도"
                src="https://www.airkorea.or.kr/file/proxyImage?fileName=2024/04/16/AQFv1_09h.20240414.KNU_09_01.PM2P5.2days.ani.gif"
            />
        </div>
    );
}


export default Info;
