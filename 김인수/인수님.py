from flask import Flask, jsonify, send_from_directory
from flask_restful import Resource, Api
from flask_cors import CORS
import requests
import pandas as pd
import json
import xml.etree.ElementTree as ET

app = Flask(__name__)
api = Api(app)
CORS(app)
app.debug = True

class home(Resource):
    def get(self):
            zero = pd.read_csv(
                'C:\\insu\\Project\\3_DataScience\\projact_test\\DB\\생활폐기물_통계\\2020~2022.csv',

                encoding='utf-8')
            zero_json = zero.to_json(orient='records')  # 'records' 형식으로 JSON 변환
            zero_dict = json.loads(zero_json)  # JSON 문자열을 Python 리스트(딕셔너리의 리스트)로 변환
            return jsonify(zero_dict)  # 리스트를 jsonify로 반환


api.add_resource(home, '/home')

class home1(Resource):
    def get(self):
            zero = pd.read_csv(
                'C:\\insu\\Project\\3_DataScience\\projact_test\\DB\\생활폐기물_통계\\2015~2019.csv',

                encoding='cp949')
            zero_json = zero.to_json(orient='records')  # 'records' 형식으로 JSON 변환
            zero_dict = json.loads(zero_json)  # JSON 문자열을 Python 리스트(딕셔너리의 리스트)로 변환
            return jsonify(zero_dict)  # 리스트를 jsonify로 반환


api.add_resource(home1, '/home1')


if __name__ == '__main__':
    app.run(host='localhost')
