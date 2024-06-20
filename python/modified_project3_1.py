import cx_Oracle
from flask import Flask, jsonify, request, send_from_directory
from flask_restful import Resource, Api
from flask_cors import CORS
import requests
import pandas as pd
import json
import geopandas as gpd
import xml.etree.ElementTree as ET

# -*- coding: utf-8 -*-


app = Flask(__name__)
api = Api(app)
CORS(app)
app.debug = True

@app.route('/')
def home():
    return "미세먼지 시각화"

# API Key(은지님)
# access_key = 'BjziMs2j8QwD1JAtzP7oQ5KCJmP/xDfhiJ2fn7Zev9geBe37W238GnmAyuSM6YTFbTFuyUEAveKWYItWTmKvWQ=='
# access_key = 'BjziMs2j8QwD1JAtzP7oQ5KCJmP%2FxDfhiJ2fn7Zev9geBe37W238GnmAyuSM6YTFbTFuyUEAveKWYItWTmKvWQ%3D%3D'
#API Key(강연배)
access_key = 'y+MUXWRZdywDBDs64HplB3XAbAYdvxWcQ54m88FRrpMBgZAm1tcqkUc8xkXrtl4eRgFiJLN2Tmi/2iJp8tQX9A=='


@app.route('/location', methods=['GET', 'POST'])
def receive_location():
    if request.method == 'GET':
        return jsonify({'message': 'GET 요청을 성공적으로 처리했습니다.'}), 200
    elif request.method == 'POST':
        data = request.get_json()
        print('Received POST data:', data)
        current_latitude = data['currentLatitude']
        current_longitude = data['currentLongitude']
        clicked_latitude = data['clickedLatitude']
        clicked_longitude = data['clickedLongitude']

        # API 호출을 위한 부분
        response = get_request_url(current_latitude, current_longitude, clicked_latitude, clicked_longitude)

        return jsonify(
            {
                'message': f'Received current latitude: {current_latitude}, current longitude: {current_longitude}, clicked latitude: {clicked_latitude}, clicked longitude: {clicked_longitude}',
                'busRouteInfo': response}), 200
    else:
        return jsonify({'error': 'Method Not Allowed'}), 405


def get_request_url(current_latitude, current_longitude, clicked_latitude, clicked_longitude):
    # url = "http://ws.bus.go.kr/api/rest/pathinfo/getPathInfoByBus"
    url = "http://ws.bus.go.kr/api/rest/pathinfo/getPathInfoByBusNSub"
    params = {
        'serviceKey': access_key,
        'resultType': 'json',
        'startX': current_longitude,
        'startY': current_latitude,
        'endX': clicked_longitude,
        'endY': clicked_latitude
    }
    response = requests.get(url, params=params)
    print('API Request URL:', response.url)
    print('API Response Status:', response.status_code)
    if response.status_code != 200:
        print('API Response Error:', response.text)

    print("Raw API Response:", response.text)  # 원본 응답 로깅
    return response.text




class City(Resource):
    def get(self):  # 메서드 이름을 get으로 변경하고 self 추가
        # SHP 파일 로드
        kor = gpd.read_file('C:\\KYB\\Project\\2_WepProject\\3_React\\React_clone_test\\kyb_study\\server\\python\\seoul_EPSG5179.shp', encoding='utf-8')

        kor.rename(columns={'nm': '시군구명'}, inplace=True)

        # 필요한 데이터만 선택 (예: 시군구명, 경계선 좌표)
        kor_data = kor[['시군구명', 'geometry']]

        # GeoJSON 형식으로 변환 후 반환
        kor_geojson = kor_data.set_crs("EPSG:4326", allow_override=True).to_json()

        return jsonify(kor_geojson)

api.add_resource(City, '/city')


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
