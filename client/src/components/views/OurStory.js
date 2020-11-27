import React from 'react'
import MERN from './Upload/MERN.png'
import RecoPage from './LandingPage/RecoPage'
import AreaBox from './LandingPage/Section/AreaBox';
import StateBox from './LandingPage/Section/StateBox';
import { areaCont, stateCont } from './LandingPage/Section/Datas';
import {Button, Col, Card, Row, Typography } from 'antd';
import SearchFeatures from './LandingPage/Section/SearchFeatures'
import ChannelService from './LandingPage/Section/ChannelService'

    //채널 톡 고유키, 로그인 하지 않아도 이용할 수 있도록 설정
    ChannelService.boot({
        "pluginKey": "93635d68-761c-4d5a-8cde-d63b06cf017c" 
    });
    // 채널톡 닫음
    //ChannelService.shutdown();

function OurStory() {
    return (
        <div>
            <h1>개발 소개</h1>
            <div style={{width:'70%',marginTop: '50px', textAlign:"center", display:'inline-block'}}>
                <h3><b>사용한 프레임워크</b></h3>
                <img src={MERN} style={{width:'600px', height:'150px', marginTop:'30px', marginBottom:'30px'}}/>
                <h3>MERN STACK</h3>
                <p>1. <b>MongoDB</b> : Cross platform Doc DB</p>
                <p>2. <b>Exoress</b> : Back-end web application framework</p>
                <p>3. <b>React</b> : JavaScript libary for building user interfaces</p>
                <p>4. <b>Node js</b> : A cross-platform JavaScript runtime environment</p>
            </div>
            <div style={{width:'70%',marginTop: '50px', textAlign:"center", display:'inline-block'}}>
                <h3><b>개발 목표</b></h3>
                <h3>한 번에, 한 눈에, 다 함께</h3>
                <p>1. <b>한 번에</b> : 단, 한 번의 개인정보 입력으로 맞춤형 장학 추천까지!</p>
                <p>2. <b>한 눈에</b> : PC환경이든, 모바일 환경이든 직관적인 UI로!</p>
                <p>3. <b>다 함께</b> : 장학금 정보 소통이 가능한 커뮤니티 구현!</p>
            </div>
            <div style={{width:'70%',marginTop: '50px', textAlign:"center", display:'inline-block'}}>
                <h3><b>한 번에</b></h3>
                <h3>단 한 번의 개인정보 입력, 회원가입</h3>
                <p><b>수집하고자 하는 정보</b></p>
                <p>이름, 이메일, 관심사, 지원계열, 학교, 학적, 학점, 소득분위, 특수정보</p>           
                <p><b>추가적으로 사용된 기술</b></p>
                <p>1. <b>axios</b> :  Promise based HTTP client for the browser and node.js</p>
                <p>2. <b>Antd</b> : React Design Template Language</p>
                <a href="/register">보러 가기</a>
            </div>
            <div style={{width:'70%',marginTop: '30px', textAlign:"center", display:'inline-block'}}>
                <p><b>잠깐,</b></p>
                <p>로그인 여부는? <b>'cookie'</b>로 사용자 브라우저에게 저장</p>
                <p><b>추가적으로 사용된 기술</b></p>
                <p>Using <b>jsonwebtoken</b></p>
                <p>그러면 보안은? <b>암호화</b>되어 사용자에게 저장! 우리도 몰라요 ㅠㅠ</p>
                <p><b>추가적으로 사용된 기술</b></p>
                <b>Using <b>cookie-parser</b></b>        
            </div>
            <div style={{width:'70%',marginTop: '50px', textAlign:"center", display:'inline-block'}}>
                <h3><b>한 눈에</b></h3>
                <h3>개인정보를 가지고, 한 눈에 맞춤 정보 해결!</h3>
                <div style={{marginTop:'30px', marginBottom:'30px'}}>
                    <RecoPage/>
                </div> 
                <p>눈치 채셨나요? 쿠키 여부를 통해 로그인 여부를 판단합니다!</p>
                <div style={{marginBottom:'14px'}}>
                    <a href="/login">그러면 로그인해볼까요?</a>
                </div>
                <p >이렇게 메인페이지에도 있는 정보를 재사용할 수 있는 것이 React의 장점!</p>
                <p><a href="/">메인페이지</a>도 구경해볼까요?</p>
            </div>

            <div style={{width:'70%',marginTop: '30px', textAlign:"center", display:'inline-block'}}>
                <p>메인페이지는 어땠나요?</p>
                <p>4개의 맞춤 추천과 8개 단위의 장학 정보를 로딩해줍니다!</p>
                <p>8개의 상품이 넘어가면요? '더보기' 버튼을 클릭해서 확인할 수 있어요!</p>
                <div style={{marginBottom:'14px'}}>
                    <p>직접 상품을 <a href="/product/upload">업로드</a>하고, '더보기' 버튼을 클릭해보세요!</p>
                </div>
                <p><b>추가적으로 사용된 기술</b></p>
                <p>Using <b>Dropzone</b> : Simple React hook drag'n'drop</p>
                <p>Using <b>ImageGallery</b> : React component for building image galleries and carousels</p>
                <br/>
                <p><b>잠깐,</b></p>
                <p>어떻게 사용자 정보를 가져오나요?</p>
                <p><b>추가적으로 사용된 기술</b></p>
                <p>Using <b>Moongoose</b> : MongoDB ODM Library</p>
                <p>User DB와 Product(장학) DB를 쿼리문으로 비교하여 가장 높은 점수를 추천하고 있죠!</p>
                <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/* Area */}
                    <AreaBox list={areaCont}/>
                </Col>
                <Col lg={12} xs={24}>
                    {/* State */}
                    <StateBox  list={stateCont}/>
                </Col>
                </Row>
                <div style={{display:'flex', justifyContent:'flex-end', margin: '1rem auto'}}>
                    <SearchFeatures/>
                </div>
                <p>이런 필터들은 Product(장학) DB만 가지고 해결할 수 있겠죠?</p>
            </div>
            
            <div style={{width:'70%',marginTop: '50px', textAlign:"center", display:'inline-block'}}>
                <h3><b>다 함께</b></h3>
                <h3>유저들에게 놀이터같은 커뮤니티</h3>
                <p>커뮤니티 구현을 위해 2개의 DB를 더 만들었어요!</p>
                <p>커뮤니티 글을 보관하는 DB와, 댓글을 보관하는 DB입니다.</p>
                <p>댓글을 보관하는 DB는 커뮤니티 글 DB의 ID에 <b>종속</b>되어있어요.</p>
                <p>RDBMS를 사용하셨다면 익숙하시죠? (네! 바로 Join기능이에요.)</p>
                <br/>
                <p>하지만 저희는 NoSQL을 사용하고 있기에.. 조금의 쿼리문이 필요했네요!</p>
                <p>프로토타입이라, 구현에 초점이 맞춰져 있어서 아직 U(Update)D(Delete)는 구현되지 않았어요.</p>
                <p>진짜로 못해서 그런거 아님..! <a href="/community">보러 갈까요?</a></p>
            </div>

            <div style={{width:'70%',marginTop: '50px', textAlign:"center", display:'inline-block'}}>
                <h3><b>끝마치며..</b></h3>
                <h3>8조 개발자들의 마음가짐</h3>
                <p>1. 이해하지 못한 코드는 사용하지 않는다.</p>
                <p>2. 우리의 목표는 프로토타입, 완벽한 '기능구현'에 최선을 다 한다.</p>
                <p>3. 누가 우리의 코드를 사용하더라도, 불편함이 없도록</p>
                <p>다양한 경우를 고려하여 코딩한다</p>
                <p>(사실 3번때문에 쓴 코드가 많은데.. 너무 아쉽지만 시간관계상 패스!)</p>
                <br/>
                <p>스크립트 언어만 다뤄봤던 웹 개린이 세명이서 서버를 독립시키느라 힘들었습니다..</p>
                <p>사실, 욕심으로는 MSA 아키텍처 실습을 위해 다양한 서버를 돌려보고 싶었는데,</p>
                <p>API Gateway를 만드는게 너무 어렵더라고요.....ㅎㅎㅎㅎㅎㅎ;;</p>
                <p>8조 기획이들.. 만들어달라한 거 다 못만들어줘서 미안해</p>
                <p>그러면 모두들 학술제 준비하느라 고생하셨습니다!</p>
            </div>

            <div style={{display:'flex', justifyContent:'flex-end', margin: '1rem auto'}}>
            <p>아! 나가기 전에 이 친구도 한 번 구경하고 가세요 :) </p>        
            </div>
        </div>
    )
}

export default OurStory
