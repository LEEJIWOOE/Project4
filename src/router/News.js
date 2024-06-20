import React, { useState, useEffect } from 'react';
import '../css/News.css';

import GreenBtn from "./GreenBtn";

function News() {
    return (
        <div className="App">

            <div id="news-container">
                <div className="news-header">
                    <h1>에리헙 최신 소식</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                <div className="news-latest">
                    <div className="news">
                        <div className="news-img"></div>
                        <div className="news-txt">
                            <h2>Why do we use it</h2>
                            <p>It is a long established fact that a reader will be distracted by the readable content of
                                a
                                page when looking at its layout. The point of using Lorem Ipsum is that it has a
                                more-or-less normal distribution of letters, as opposed to using 'Content here, content
                                here', making it look like readable English.</p>
                            <GreenBtn />
                        </div>
                    </div>
                    <div className="news">
                        <div className="news-img"></div>
                        <div className="news-txt">
                            <h2>Why do we use it</h2>
                            <p>It is a long established fact that a reader will be distracted by the readable content of
                                a
                                page when looking at its layout. The point of using Lorem Ipsum is that it has a
                                more-or-less normal distribution of letters, as opposed to using 'Content here, content
                                here', making it look like readable English.</p>
                            <GreenBtn />
                        </div>
                    </div>
                    <div className="news">
                        <div className="news-img"></div>
                        <div className="news-txt">
                            <h2>Why do we use it</h2>
                            <p>It is a long established fact that a reader will be distracted by the readable content of
                                a
                                page when looking at its layout. The point of using Lorem Ipsum is that it has a
                                more-or-less normal distribution of letters, as opposed to using 'Content here, content
                                here', making it look like readable English.</p>
                            <GreenBtn />
                        </div>
                    </div>
                    <div className="news">
                        <div className="news-img"></div>
                        <div className="news-txt">
                            <h2>Why do we use it</h2>
                            <p>It is a long established fact that a reader will be distracted by the readable content of
                                a
                                page when looking at its layout. The point of using Lorem Ipsum is that it has a
                                more-or-less normal distribution of letters, as opposed to using 'Content here, content
                                here', making it look like readable English.</p>
                            <GreenBtn />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default News;