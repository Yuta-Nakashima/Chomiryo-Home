# -*- coding:utf-8 -*-
import argparse
import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
import mysql.connector

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        query = parse_qs(parsed_path.query)
        # print(parsed_path.path)
        if "/choumiryou/history" in parsed_path.path:
            host, port = importargs()
            # ここにhistory呼び出し
            response = {}
        elif "/choumiryou/all_name" in parsed_path.path:
            host, port = importargs()
            # ここは全ての名前
            response = {}
        elif "/choumiryou" in parsed_path.path:
            host, port = importargs()
            # choumiryou table の情報
            response = {}
        else:
            url = urlparse('mysql://root:eteam1206@localhost:3306/acahara')
            conn = mysql.connector.connect(
            host = url.hostname or 'localhost',
            port = url.port or 3306,
            user = url.username or 'root',
            password = url.password or '',
            database = url.path[1:],
            )
            conn.is_connected()

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        responseBody = json.dumps(response)
        self.wfile.write(responseBody.encode('utf-8'))

    def do_POST(self):
        try:
            content_len = int(self.headers.get('content-length'))
            requestBody = json.loads(self.rfile.read(content_len).decode('utf-8'))
            print(requestBody)

            response = {'result': True}
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            responseBody = json.dumps(response)
            # ここにPOSTの処理を加える

            self.wfile.write(responseBody.encode('utf-8'))
        except Exception as e:
            print("An error occured")
            print("The information of error is as following")
            print(type(e))
            print(e.args)
            print(e)
            response = {'status': 500,
                        'msg': 'An error occured'}

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            responseBody = json.dumps(response)

            self.wfile.write(responseBody.encode('utf-8'))



def importargs():
    parser = argparse.ArgumentParser("This is the simple server")

    parser.add_argument('--host', '-H', required=False, default='0.0.0.0')
    parser.add_argument('--port', '-P', required=False, type=int, default=8080)

    args = parser.parse_args()

    return args.host, args.port


def run(server_class=HTTPServer, handler_class=MyHandler, server_name='localhost', port=8080):
    server = server_class((server_name, port), handler_class)
    server.serve_forever()


def main():
    host, port = importargs()
    run(server_name=host, port=port)


if __name__ == '__main__':
    main()
