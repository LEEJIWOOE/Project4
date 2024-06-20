import cx_Oracle
import xml.etree.ElementTree as ET

# Load the KML file
kml_file_path = 'C:\\KYB\\Project\\2_WepProject\\3_React\\React_clone_test\\kyb_study\\server\\public\\csv\\zero.kml'
tree = ET.parse(kml_file_path)
root = tree.getroot()

# KML files have a specific namespace, we need to handle this to access elements properly
namespace = {'kml': 'http://www.opengis.net/kml/2.2'}

# Let's extract some initial data to understand the structure
# We typically look for Placemark elements which contain the geographic data
placemarks = root.findall('.//kml:Placemark', namespaces=namespace)
extracted_data = []

for placemark in placemarks:
    name = placemark.find('kml:name', namespace)
    coordinates = placemark.find('.//kml:coordinates', namespace)
    if name is not None and coordinates is not None:
        coords = coordinates.text.strip().split(',')
        longitude, latitude = coords[0], coords[1]  # assuming "longitude,latitude,altitude" format
        extracted_data.append({'name': name.text, 'latitude': latitude, 'longitude': longitude})


def get_db_connection():
    # 데이터베이스 연결을 설정하고, 커서를 생성
    conn = cx_Oracle.connect('kyb/1111@localhost:1521/xe')
    cur = conn.cursor()
    return conn, cur

# 데이터베이스 연결 및 커서 획득
connection, cursor = get_db_connection()

# 데이터베이스에 데이터 삽입
for data in extracted_data:
    query = """
        INSERT INTO ZERO (name, latitude, longitude)
        VALUES (:name, :latitude, :longitude)
    """
    cursor.execute(query, data)

# 변경사항 커밋 및 연결 종료
connection.commit()
cursor.close()
connection.close()