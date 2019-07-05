# -*- coding:utf-8 -*-
import argparse
import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
import mysql.connector
import numpy as np
import cgi
import sys
import io


class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        query = parse_qs(parsed_path.query)
        # print(parsed_path.path)
        if "/history" in parsed_path.path:
            response = {}
            host, port = importargs()
            text = parsed_path.path.split("/")
            cname = text[2] 
            # ここにhistory呼び出し
            url = urlparse('mysql://student:eteam1@localhost:3306/acahara')
            conn = mysql.connector.connect(
            host = url.hostname or 'localhost',
            port = url.port or 3306,
            user = url.username or 'student',
            password = url.password or '',
            database = url.path[1:],
            )
            conn.is_connected()
            cur = conn.cursor()
            cur.execute('SELECT * FROM history where name = "'+cname+'"')
            result = cur.fetchall()
            cnt = 0
            for i in result:
                cnt = cnt + 1
                res = {
                    cnt: {
                        'id': i[0],
                        'name': i[1],
                        'nokori': i[2],
                        'shiyou': i[3],
                        'koushin': i[4],
                        'rireki': i[5]
                    }
                }
                response.update(res)
        elif "/login" in parsed_path.path:
            response = {}
            host, port = importargs()
            # ここにhistory呼び出し
            text = parsed_path.path.split("/")
            usname = text[2]
            url = urlparse('mysql://student:eteam1@localhost:3306/acahara')
            conn = mysql.connector.connect(
                host=url.hostname or 'localhost',
                port=url.port or 3306,
                user=url.username or 'student',
                password=url.password or '',
                database=url.path[1:],
            )
            conn.is_connected()
            cur = conn.cursor()
            cur.execute('SELECT pass FROM user where name = '+'"'+usname+'"')
            result = cur.fetchall()
            cnt = 0
            for i in result:
                cnt = cnt + 1
                res = {
                    cnt: {
                        'pass': i[0]
                    }
                }
                response.update(res)
        elif "/choumiryou/all_name" in parsed_path.path:
            response = {}
            host, port = importargs()
            # ここにhistory呼び出し
            url = urlparse('mysql://student:eteam1@localhost:3306/acahara')
            conn = mysql.connector.connect(
                host=url.hostname or 'localhost',
                port=url.port or 3306,
                user=url.username or 'student',
                password=url.password or '',
                database=url.path[1:],
            )
            conn.is_connected()
            cur = conn.cursor()
            cur.execute('SELECT name FROM choumiryou')
            result = cur.fetchall()
            cnt = 0
            for i in result:
                cnt = cnt + 1
                res = {
                    cnt: {
                        'name': i[0]
                    }
                }
                response.update(res)
        elif "/choumiryou" in parsed_path.path:
            response = {}
            host, port = importargs()
            # ここにhistory呼び出し
            url = urlparse('mysql://student:eteam1@localhost:3306/acahara')
            conn = mysql.connector.connect(
                host=url.hostname or 'localhost',
                port=url.port or 3306,
                user=url.username or 'student',
                password=url.password or '',
                database=url.path[1:],
            )
            conn.is_connected()
            cur = conn.cursor()
            cur.execute('SELECT * FROM choumiryou')
            result = cur.fetchall()
            cnt = 0
            for i in result:
                cnt = cnt + 1
                res = {
                    cnt: {
                        'id': i[0],
                        'name': i[1],
                        'nokori': i[2],
                        'shiyou': i[3],
                        'koushin': i[4],
                        'rireki': i[5]
                    }
                }
                response.update(res)

        else:
            response = {}
            url = urlparse('mysql://student:eteam1@localhost:3306/acahara')
            conn = mysql.connector.connect(
            host = url.hostname or 'localhost',
            port = url.port or 3306,
            user = url.username or 'student',
            password = url.password or '',
            database = url.path[1:],
            )
            conn.is_connected()
            cur.execute('SELECT * FROM choumiryou')
            result = cur.fetchall()
            cnt = 0
            for i in result:
                cnt = cnt + 1
                res = {
                    cnt: {
                        'id': i[0],
                        'name': i[1],
                        'nokori': i[2],
                        'shiyou': i[3],
                        'koushin': i[4],
                        'rireki': i[5]
                    }
                }
                response.update(res)

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        responseBody = json.dumps(response)
        self.wfile.write(responseBody.encode('utf-8'))

    def do_POST(self):
        try:
            parsed_path = urlparse(self.path)
            content_len = int(self.headers.get('content-length'))
            requestBody = json.loads(self.rfile.read(content_len).decode('utf-8'))
            print(requestBody)
            response = {'result': True}
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            responseBody = json.dumps(response)
            # ここにPOSTの処理を加える
            url = urlparse('mysql://student:eteam1@localhost:3306/acahara')
            conn = mysql.connector.connect(
            host = url.hostname or 'localhost',
            port = url.port or 3306,
            user = url.username or 'student',
            password = url.password or '',
            database = url.path[1:],
            )
            if "/user" in parsed_path.path:
                #user point add
                cur = conn.cursor()
                text =parsed_path.path.split("/")
                uname = text[2]
                upoint = text[3]
                cur.execute('update user set point ="'+upoint+'" where name = "'+uname+'"')
                conn.commit()

            elif "/choumiryou" in parsed_path.path:
                cur = conn.cursor()
                cur.execute('SELECT * FROM choumiryou WHERE name = "shouyu"')
                result = cur.fetchall()
                cur.execute('insert into history(name, nokori, shiyou, koushin, rireki) values("'+result[0][1]+'","'+result[0][2]+'","'+result[0][3]+'","'+result[0][4]+'","'+result[0][5]+'")')
                sql = 'update choumiryou set nokori ="'+requestBody['nokori']+'",koushin = "'+requestBody['koushin']+'",shiyou ="'+requestBody['shiyou']+'" where name = "shouyu"'
                print(sql)
                cur.execute(sql)
                conn.commit()



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
    parser.add_argument('--port', '-P', required=False, type=int, default=8000)


    args = parser.parse_args()

    return args.host, args.port


def run(server_class=HTTPServer, handler_class=MyHandler, server_name='localhost', port=8000):
    server = server_class((server_name, port), handler_class)
    server.serve_forever()


def main():
    host, port = importargs()
    run(server_name=host, port=port)


if __name__ == '__main__':
    main()
